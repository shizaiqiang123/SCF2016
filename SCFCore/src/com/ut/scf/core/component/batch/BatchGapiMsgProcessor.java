package com.ut.scf.core.component.batch;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.GAPIManager;
import com.ut.scf.core.gapi.IGAPIMsgManager;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.gapi.MessageSendResponse;
import com.ut.scf.core.gapi.reformat.GAPIMsgFormatorFactory;
import com.ut.scf.core.gapi.reformat.IGAPIMsgReformat;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.orm.std.GapiMsg;

@Component("batchGapiMsgProcessor")
@Scope("prototype")
public class BatchGapiMsgProcessor extends AbsRunableTask {

	IQueryFactory queryFactory;
	protected ASETrxAjaxManagerBean ajaxManager;
	IReferenceNo refNoManager;
	// @Resource(name = "gapiManager")

	// @Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;
	

	protected IServerSideJs serverJsEngine;
	private GapiMsgPara gapiPara;
	int gapiSts;
	public static final String tableName="GapiMsg";
	StringBuffer stringBuffer=new StringBuffer();

	// InquireDataPara

	@Override
	public void execute() {
		 try {
		 serverJsEngine =
		 ClassLoadHelper.getComponentClass("serviceJsEngine");
		 } catch (ClassNotFoundException e) {
		 e.printStackTrace();
		 }
		 try {
		 refNoManager = ClassLoadHelper.getComponentClass("refNoManager");
		 } catch (ClassNotFoundException e) {
		 e.printStackTrace();
		 }
		 try {
		 serviceFactory = ClassLoadHelper.getComponentClass("serviceFactory");
		 } catch (ClassNotFoundException e) {
		 e.printStackTrace();
		 }
		 try {
		 queryFactory = ClassLoadHelper.getComponentClass("queryFactory");
		 } catch (ClassNotFoundException e) {
		 e.printStackTrace();
		 }
		 try {
		 daoHelper = ClassLoadHelper.getComponentClass("daoHelper");
		 } catch (ClassNotFoundException e) {
		 e.printStackTrace();
		 }
		 try {
		 ajaxManager = ClassLoadHelper
		 .getComponentClass("aSETrxAjaxManagerBean");
		 } catch (ClassNotFoundException e) {
		 e.printStackTrace();
		 }
		 
		
		queryGapiMsg();
	}

	private void queryGapiMsg() {
		QueryNode node=new QueryNode();
		String sql="select gm from STD.GapiMsg gm where gapiSts=? and msgSts = ? and sysLockFlag='F'";
		String gapiSts=String.valueOf(GAPIManager.GAPI_STS_FORBATCH);
		gapiSts+=":typejava.lang.Integer";
		String msgSts=String.valueOf(IESBServiceResponse.ESB_RESP_CODE_FAILED_CONNECT);
		msgSts+=":typejava.lang.Integer";
		String params=new StringBuffer().append(gapiSts)
				.append(",").append(msgSts).toString();
		node.setParams(params);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		JSONObject jsonObj=JsonHelper.createReqJson();
		FuncDataObj dataObj=new FuncDataObj();
		dataObj.setReqData(jsonObj);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = queryFactory.getProcessor(node).queryData(dataObj);
		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Object> list=(List<Object>) processResult.get(processResult.getDoName());
			if(!list.isEmpty()){
				for(Object obj:list){
					if(updateGapiMsgLockFlag(obj)){
						sendGapiMsg(obj);
					}
				}		
			}
		}
	}
	/*
	 * 发送接口信息
	 */
	private void sendGapiMsg(Object obj) {
		Map<String,Object> map=(HashMap<String,Object>) obj;
		String gapiId=map.containsKey("gapiId")?map.get("gapiId").toString():"";
		JSONObject jsonObject=JsonHelper.createReqJson();
		JSONObject jsonObj=new JSONObject();
		jsonObj.put("reqLoginType", "noLogin");
		jsonObj.put("byFunc", "N");
		jsonObj.putAll(map);
		jsonObject.put("trxDom", jsonObj);
		try {
				IGAPIMsgRequest gapiRequest = new MessageSendRequest();
				gapiRequest.setMsgBody(jsonObj);
				
				GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiId, "");
				IGAPIMsgResponse gapiResponse = processSendMsg(msgPara, gapiRequest,jsonObject);
			} catch (Exception e) {
				e.printStackTrace();
				APLogUtil.getUserLogger().error("BatchCallGapiProcessExecutor: gapi接口调用gapi参数时出现异常。");
				APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
	}

	/*
	 * 锁定gapi_msg中的对应的数据
	 */
	private boolean updateGapiMsgLockFlag(Object obj) {
		try {
			Map<String,Object> map=(HashMap<String,Object>) obj;
			String sysRefNo=map.containsKey("sysRefNo")?map.get("sysRefNo").toString():"";
			
			StringBuffer stringBuffer=new StringBuffer()
									.append("update ")
									.append(tableName)
									.append(" set sysLockFlag = 'T',sysLockBy = ? where sysRefNo=?");
			
			List<Object> list=new ArrayList<Object>();
			list.add("platform");
			list.add(sysRefNo);
			
			IDaoEntity entity = new ExecDaoEntity();
			entity.setParaList(list);
			entity.setHql(stringBuffer.toString());
			entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
			FuncDataObj funcDataObj=new FuncDataObj();
			funcDataObj.addExcuteEntity(entity);
			daoHelper.execUpdate(funcDataObj);
			if(funcDataObj.hasRecord()){
				return true;
			} 
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserLogger().error("BatchGapiMsgLockExecutor: gapi在batch发送时锁表出错。");
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
		return false;
	}
	public IGAPIMsgResponse processSendMsg(GapiMsgPara para, IGAPIMsgRequest msgContent, Object trxData) throws Exception {
		this.gapiPara = para;

		String currentBu = para.getBu();// or get from context

		Object msgBody = msgContent.getMsgBody();
		Map msgData = msgBody==null?new HashMap():(Map) msgBody;
		JSONObject reqData = (JSONObject) trxData;
		JSONObject trxObject=JsonHelper.getTrxObject(reqData);
		
//		ApSessionContext context = ApSessionUtil.getContext();
		// GapiMsgPara gapiMsgPara = XMLParaParseHelper.parseGapiMsgPara(gapiId,
		// context.getSysBusiUnit());
		IGAPIMsgManager gapiMsgGenerator = ClassLoadHelper.getComponentClass(para.getGenerator());

		IGAPIMsgResponse response = new MessageSendResponse();

		boolean needStore = "Y".equalsIgnoreCase(para.getMsgstore());
		boolean sendInterrupt = "Y".equalsIgnoreCase(para.getSendinterrupt());
		boolean receiveInterrupt = "Y".equalsIgnoreCase(para.getReceiveinterrupt());
		
	
		if(para.getGapiSts()!=null){
			gapiSts=Integer.parseInt(para.getGapiSts());
		}else{
			gapiSts=GAPIManager.GAPI_STS_RESEND;
		}
		
		GapiMsg msgEntity = new GapiMsg();
		try {
			merageResponse(msgData, reqData);
			
			reqData = (JSONObject) processGAPIJs(reqData,para.getReformatjs());//json? xml

			String gapiMsg = trxObject.containsKey("sendMessage")?trxObject.get("sendMessage").toString():"";//生成目标格式
			
			IGAPIMsgReformat formator = GAPIMsgFormatorFactory.getReformatFactory(para.getReformatclass());
			
			String strGapiMsg = new String(gapiMsg.getBytes(),para.getCharacterset());//对格式经行必要的格式化，返回string格式数据待发送
			JSONObject trxDom=(JSONObject) reqData.get("trxDom");
			String trxRefNo ="";
			int trxEventTimes=0;
			if(trxDom.get("sysRefNo")!=null){
				trxRefNo=trxDom.containsKey("sysRefNo")?trxDom.getString("sysRefNo"):"";
			}
			if(trxDom.get("sysEventTimes")!=null){
				trxEventTimes=trxDom.containsKey("sysEventTimes")?trxDom.getInt("sysEventTimes"):0;
			}
			String key = UUIdGenerator.getUUId();
			List<Object> list=new ArrayList<Object>();
			StringBuffer stringBuffer=new StringBuffer()
			.append("update ").append(tableName).append(" set sysLockFlag='F' and sysLockBy='' ");
//			msgEntity.setMsgId(key);
//			msgEntity.setSysRefNo(key);
//			msgEntity.setSysEventTimes(1);
//			msgEntity.setSendMessage(gapiMsg);
//			msgEntity.setGapiName(para.getName());
//			msgEntity.setTrxRefNo(trxRefNo);
//			msgEntity.setTrxEventTimes(trxEventTimes);
//			msgEntity.setGapiType("out");
//			msgEntity.setSysBusiUnit(currentBu);
//			msgEntity.setSysLockFlag("F");
//			msgEntity.setSysTrxSts("M");
//			msgEntity.setGapiSts(gapiSts);
//			msgEntity.setGapiId(para.getId());
//			msgEntity.setSysOpTm(DateTimeUtil.getTimestamp());
			

			getLogger().debug("Generate GAPI message success. begin to store msg :" + gapiMsg);
			getLogger().debug("Generate GAPI message success. begin to store msg by key:" + key);
			getLogger().debug("trxRefNo is:"+trxRefNo);
			getLogger().debug("trxEventTimes is:"+trxEventTimes);
			if(GAPIManager.GAPI_STS_FORBATCH == gapiSts){
				IESBServiceResponse receiveMsg = sendAndReceiveMsgByESB(gapiMsg);//发送请求并根据定义同步接收响应
				int retCode = receiveMsg.getRespCode();
//				msgEntity.setMsgSts(retCode);
				response.setRespCode(retCode);
				response.setError(receiveMsg.getError());
	
				if (IESBServiceResponse.ESB_RESP_CODE_EXCEPTION == retCode) {
					throw new Exception(receiveMsg.getError());
				} else if (IESBServiceResponse.ESB_RESP_CODE_RECEIVED == retCode) {
					stringBuffer.append(" receiveMessage = ?");
					list.add(receiveMsg.getResponseData().toString());
//					msgEntity.setReceiveMessage(receiveMsg.getResponseData().toString());//业务层不关心消息原始格式，只需要json的格式
				} else if (IESBServiceResponse.ESB_RESP_CODE_FAILED_RECEIVE == retCode) {
					if (receiveInterrupt) {
						throw new Exception(receiveMsg.getError());
					}
				} else if (IESBServiceResponse.ESB_RESP_CODE_SENDED == retCode) {
	
				} else if (IESBServiceResponse.ESB_RESP_CODE_FAILED_SEND == retCode) {
					if (sendInterrupt) {
						throw new Exception(receiveMsg.getError());
					}
				} else if (IESBServiceResponse.ESB_RESP_CODE_FAILED_CONNECT == retCode) {
					if (sendInterrupt) {
						throw new Exception(receiveMsg.getError());
					}
				} else {
					throw new Exception("Unknow return code from ESB."+retCode);
				}
				
				FuncDataObj funcData = new FuncDataObj();
				
				Object responseObj = receiveMsg.getResponseData();
				if(responseObj!=null&&StringUtil.isNotEmpty(responseObj.toString())){
					List<Object> returnObj = gapiMsgGenerator.demerge(para, responseObj.toString());// jsons， 反向解析收到的响应，生成对应的json
					
					Map responseData = new HashMap<String,Object>();
					
					for (Object object : returnObj) {
	
						object = processGAPIJs((JSONObject) object,para.getValidatejs());//调用验证机制验证消息是否合法
						
						IGAPIMsgReformat verifier =  GAPIMsgFormatorFactory.getReformatFactory(para.getValidateclass());
						
						Object responseJson = verifier.verify(para, object);
						
						if(responseJson!=null){
							reqData.putAll((Map)responseJson);
							responseData.putAll((Map) responseJson);
						}
						
						if(!checkVerifyResult((JSONObject) responseJson)){
							break;
						}
					
					}
					response.setResponseBody(responseData);
					funcData.setReqData(reqData);
				}
				funcData.setReqParaObj(para);
				
				if(checkVerifyResult(reqData)){
					//支持生成新的消息
					processCallback(funcData,para.getOnsuccess());
					//处理全部成功后，调用对应的成功响应，比如更新业务表里面的部分栏位
				}else{
					//处理全部成功后，调用对应的成功响应，比如更新业务表里面的部分栏位
					processCallback(funcData,para.getOnfailed());
				}
			}
			return response;
		} catch (Exception e) {
			getLogger().error("Generate GAPI message exception:"+e);
			
//			msgEntity.setErrorMsg(e.toString());
//			gapiMsgGenerator.storeMsg(para, msgEntity, false);
			throw e;
		} finally{
			if (needStore) {
				//注意记住对应的ESB服务编号，重发时直接发送到对应的服务中
				gapiMsgGenerator.storeMsg(para, msgEntity, false);//对详细本省经行记录，用于错误重发功能
			}
		}
	}
	public void merageResponse(Map response, JSONObject reqData) {
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		trxObj.putAll(response);
	}
	
	protected void processCallback(FuncDataObj retData,String inquireDataId) throws Exception {
		if(StringUtil.isTrimNotEmpty(inquireDataId)){
			GapiMsgPara gapiPara = (GapiMsgPara) retData.getReqParaObj();
			
			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(inquireDataId,gapiPara.getBu());
			String inqType = inqPara.getType();
			
			if("S".equalsIgnoreCase(inqType)){
				retData = getServiceData(inqPara.getTarget(),gapiPara.getBu(),retData.getReqData());
			}else if("Q".equalsIgnoreCase(inqType)){
				retData = getQueryData(inqPara.getTarget(),gapiPara.getBu(),retData.getReqData());
			}else if("L".equalsIgnoreCase(inqType)){
				retData = getLogicData(inqPara.getTarget(),gapiPara.getBu(),retData.getReqData());
			}else if("F".equalsIgnoreCase(inqType)){
				retData = getFuncData(inqPara.getTarget(),gapiPara.getBu(),retData.getReqData());
			}else{
				retData.setRetStatus(FuncDataObj.FAILED);
				retData.setRetInfo("Unknow inquery data type.");
			}
		}
	}
	
	private FuncDataObj getServiceData(String target,String bu,JSONObject reqData){
		ServicePara queryPara = new ServicePara();
		queryPara = XMLParaParseHelper.parseFuncService(target, bu);
		
		FuncDataObj retData = new FuncDataObj();
		
		try {
			JSONObject serviceData = processServiceJs(queryPara,reqData);
			
			IESBServiceRequest request = new ServiceRequestImpl();
			request.setRequestData(serviceData);
			request.setRequestPara(queryPara);
			request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
			request.setMethodName(queryPara.getMethodname());
			request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
			request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
			
			IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);
			
			retData = (FuncDataObj) processResult.getResponseData();
			
			if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()) {
				
				processCallback(retData,queryPara.getOnsuccess());

				String gapiMsgId = queryPara.getGapiid();
				
				if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
					GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, bu);
					
					IGAPIMsgRequest gapiRequest = new MessageSendRequest();
					gapiRequest.setMsgBody(retData.getReturnObj());//need fix
		
					IGAPIMsgResponse gapiResponse = processSendMsg(msgPara, gapiRequest, serviceData);
					if(gapiResponse.getRespCode() == IGAPIMsgResponse.GAPI_RESP_CODE_RECEIVED){
						if(gapiResponse.getResponseBody()!=null&&StringUtil.isNotNull(gapiResponse.getResponseBody().toString())){
							retData.buildRespose(gapiResponse.getResponseBody());
						}
					}
				}
			}else{
				processCallback(retData,queryPara.getOnfailed());
			}
		} catch (Exception e) {
			APLogUtil.getUserErrorLogger().error(e.toString());
			retData.setRetStatus(AbsDataObject.FAILED);
			retData.setRetInfo(e.toString());
		}
		
		return retData;
	}
	private JSONObject processServiceJs(ServicePara para,JSONObject serviceData) throws Exception{
		String jsFile = para.getServicejs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			serverJsEngine.initTrxData(serviceData);
			serverJsEngine.initTrxPara(para);
			try {
				serverJsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
			
			return (JSONObject) serverJsEngine.getTrxData();
		}
		return serviceData;
	}
	
	private FuncDataObj getFuncData(String target, String bu, JSONObject reqData) {
		FunctionPara funcPara = XMLParaParseHelper.parseFuncPara(target, bu);
		JSONObject funcObj = JsonHelper.getFuncObject(reqData);
		funcObj.put("sysFuncId", funcPara.getId());
		funcObj.put("name",funcPara.getName());
		funcObj.put("funcType", funcPara.getFunctype());
		funcObj.put("module", funcPara.getModule());
		funcObj.put("sysEventTimes", 1);
		funcObj.put("sysPageIndex", funcPara.getPagesSize() - 1);
		FuncDataObj retData = new FuncDataObj();
		
		try{
			IAPProcessor processor = ClassLoadHelper.getComponentClass("aPSubmitProcessor");
			IApResponse response = (IApResponse) processor.run(reqData.toString());
			if(response.isSuccess()){
				retData.setRetStatus(FuncDataObj.SUCCESS);
			}else{
				retData.setRetStatus(FuncDataObj.FAILED);
				retData.setRetInfo(response.getMessage());
			}
		}catch(Exception e){
			retData.setRetStatus(FuncDataObj.FAILED);
			retData.setRetInfo(e.toString());
		}
		
		return retData;
	}
	private FuncDataObj getLogicData(String logicId,String bu,JSONObject reqDomData){
		LogicFlowPara logicFlowPara = XMLParaParseHelper.parseFuncLogicFlow(logicId,bu);
		FuncDataObj processResult = new FuncDataObj();
		for (int i = 0, len = logicFlowPara.getNodeSize(); i < len; i++) {
			LogicNode logicNode = logicFlowPara.getLnode(i);
			try {
				processResult.setReqParaObj(logicNode);
				processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(processResult));
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
//				throw e;
				processResult.setRetStatus(AbsDataObject.FAILED);
				processResult.setRetInfo(e.toString());
			}
		}
		daoHelper.execQuery(processResult);
		processResult.mergeResponse(processResult);
		return processResult;
	}
	private FuncDataObj getQueryData(String queryId,String bu,JSONObject reqDomData) {
		FuncDataObj funcObj = new FuncDataObj();
		QueryPara queryPara = XMLParaParseHelper.parseQuery(queryId,bu);
//		funcObj.setReqParaObj(queryPara);
		funcObj.setReqData(reqDomData);
		
		for (int i = 0, len = queryPara.getNodeSize(); i < len; i++) {
			QueryNode queryNode = queryPara.getNode(i);
			try {
				funcObj.setReqParaObj(queryNode);
				FuncDataObj processResult = queryFactory.getProcessor(queryNode).queryData(funcObj);
				daoHelper.execQuery(processResult);
				funcObj.mergeResponse(processResult);
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
//				throw e;
				funcObj.setRetStatus(AbsDataObject.FAILED);
				funcObj.setRetInfo(e.toString());
			}
		}
		return funcObj;
	}
	
	public boolean checkVerifyResult(JSONObject resultJson){
		return resultJson.containsKey("verifyResult")?resultJson.getBoolean("verifyResult"):false;
	}
	private Object processGAPIJs(JSONObject mappingData, String jsFile) {

		if (StringUtil.isTrimNotEmpty(jsFile)) {
			jsEngine.initTrxData(mappingData);
			jsEngine.initTrxPara(gapiPara);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error("Generate GAPI messagejs exception:"+e);
				e.printStackTrace();
			}

			mappingData = (JSONObject) jsEngine.getTrxData();
		}
		return mappingData;
	}

	
	public void callGapiProcess(String gapiMsgId,Object reqData,JSONObject serviceData) throws Exception{
		

	}
	private IESBServiceResponse sendAndReceiveMsgByESB(Object gapiMsg) throws Exception {
		ServicePara queryPara = new ServicePara();
		queryPara.setName(gapiPara.getSendservice());
		queryPara.setType(gapiPara.getSendservice());
		IESBServiceRequest request = new ServiceRequestImpl();
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_POST);
		request.setRequestData(gapiMsg);
		request.setRequestPara(gapiPara);
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());

		IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);
		return processResult;
	}

}
