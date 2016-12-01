package com.ut.scf.core.component.gapi;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.GAPIManager;
import com.ut.scf.core.gapi.GAPIUtil;
import com.ut.scf.core.gapi.IGAPIMsgManager;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.gapi.MessageSendResponse;
import com.ut.scf.core.gapi.reformat.GAPIMsgFormatorFactory;
import com.ut.scf.core.gapi.reformat.IGAPIMsgReformat;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.dao.IDaoReformat;
import com.ut.scf.dao.QueryForDaoEntity;
import com.ut.scf.orm.std.GapiMsg;

@Component("gapiMsgServer")
public class GapiMsgServerImpl implements GapiMsgServer {
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "aSETrxAjaxManagerBean")
	protected ASETrxAjaxManagerBean ajaxManager;

	GapiMsgPara gapiPara;
	protected ApSessionContext context;
	protected IServerSideJs jsEngine;
	IServiceFactory serviceFactory;
	protected IServerSideJs serviceEngine;
	IQueryFactory queryFactory ;
	ILogicFactory logicFactory ;
	
	@Override
	public FuncDataObj postData(FuncDataObj funcDataObj) {
		try {
			serviceEngine = ClassLoadHelper
					.getComponentClass("serviceJsEngine");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			logicFactory = ClassLoadHelper
					.getComponentClass("logicFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			queryFactory = ClassLoadHelper
					.getComponentClass("queryFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			serviceFactory = ClassLoadHelper
					.getComponentClass("serviceFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			jsEngine = ClassLoadHelper
					.getComponentClass("gapiJsEngine");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		JSONObject jsonObject = funcDataObj.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(jsonObject);
		String gapiId = trxData.containsKey("gapiId") ? trxData
				.getString("gapiId") : "";
		QueryForDaoEntity entity = new QueryForDaoEntity();
		StringBuffer sqls = new StringBuffer();
		sqls.append("from STD.GapiMsg where gapiId=? and sysLockFlag=?");
		List<Object> updateParams = new ArrayList<Object>();
		updateParams.add(gapiId);
		updateParams.add("F");
		entity.setHql(sqls.toString());
		entity.setParaList(updateParams);
		entity.setLockQuery(true);
		entity.setType(QueryForDaoEntity.ENTITY_TYPE_HQL);
		entity.setReformat(new IDaoReformat() {
			@Override
			public Object reformat(Object recordData) {
				// TODO Auto-generated method stub
				if (recordData == null) {
					return null;
				} else {
					List<Object> portList = (List<Object>) recordData;
					return portList;
				}
			}
		});
		sqls.delete(0, sqls.length());
		sqls.append("update GapiMsg set sysLockFlag = ?, sysLockBy =? where gapiId=? and sysLockFlag=?");
		List<Object> updateParams2 = new ArrayList<Object>();
		updateParams2.add("T");
		updateParams2.add("sendAgain");
		updateParams2.add(gapiId);
		updateParams2.add("F");
		IDaoEntity entity2 = new ExecDaoEntity();
		entity2.setHql(sqls.toString());
		entity2.setParaList(updateParams2);
		entity2.setType(IDaoEntity.ENTITY_TYPE_HQL);
		entity.setForProcess(entity2);
		funcDataObj.addExcuteEntity(entity);
		daoHelper.execUpdate(funcDataObj);
		return funcDataObj;
	}

	@Override
	public FuncDataObj requestGapiMsg(FuncDataObj portMessage) {
		
		JSONObject reqData=portMessage.getReqData();
		IGAPIMsgResponse response = new MessageSendResponse();
		JSONObject trxDom=JsonHelper.getTrxObject(reqData);
		String gapiId= trxDom.containsKey("gapiId")?trxDom.get("gapiId").toString():"";
		gapiPara=XMLParaParseHelper.parseGapiMsgPara(gapiId, "");
		String msgType=gapiPara.getMsgtype();
		boolean needStore = "Y".equalsIgnoreCase(gapiPara.getMsgstore());
		boolean sendInterrupt = "Y".equalsIgnoreCase(gapiPara.getSendinterrupt());
		boolean receiveInterrupt = "Y".equalsIgnoreCase(gapiPara.getReceiveinterrupt());
		IGAPIMsgManager gapiMsgGenerator = null;
		try {
			gapiMsgGenerator = ClassLoadHelper.getComponentClass(gapiPara.getGenerator());
		} catch (ClassNotFoundException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
		}
		JSONObject jsonObject=new JSONObject();
		jsonObject.putAll(portMessage.getData());
		List<Map> list= (List<Map>) jsonObject.get("data");
		String gapiMsg="";
		for(Map map:list){
			gapiMsg=map.get("sendMessage").toString();
			IESBServiceResponse receiveMsg = null;
			try {
				receiveMsg = sendAndReceiveMsgByESB(gapiMsg);
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			int retCode = receiveMsg.getRespCode();
			try {
				
//				int retCode = receiveMsg.getRespCode();
//				msgEntity.setMsgSts(retCode);
				response.setRespCode(retCode);
				response.setError(receiveMsg.getError());
	
				if (IESBServiceResponse.ESB_RESP_CODE_EXCEPTION == retCode) {
					throw new Exception(receiveMsg.getError());
				} else if (IESBServiceResponse.ESB_RESP_CODE_RECEIVED == retCode) {
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
					List<Object> returnObj = gapiMsgGenerator.demerge(gapiPara, responseObj.toString());// jsons， 反向解析收到的响应，生成对应的json
					
					Map responseData = new HashMap<String,Object>();
					
					for (Object object : returnObj) {
	
						object = processGAPIJs((JSONObject) object,gapiPara.getValidatejs());//调用验证机制验证消息是否合法
						
						IGAPIMsgReformat verifier =  GAPIMsgFormatorFactory.getReformatFactory(gapiPara.getValidateclass());
						
						Object responseJson = verifier.verify(gapiPara, object);
						
						if(responseJson!=null){
							reqData.putAll((Map)responseJson);
							responseData.putAll((Map) responseJson);
						}
						
						if(checkVerifyResult((JSONObject) responseJson)){
							break;
						}
					
					}
					response.setResponseBody(responseData);
					funcData.setReqData(reqData);
				}
				funcData.setReqParaObj(gapiPara);
				
				if(checkVerifyResult(reqData)){
					//支持生成新的消息
					processCallback(funcData,gapiPara.getOnsuccess());
					//处理全部成功后，调用对应的成功响应，比如更新业务表里面的部分栏位
				}else{
					//处理全部成功后，调用对应的成功响应，比如更新业务表里面的部分栏位
					processCallback(funcData,gapiPara.getOnfailed());
				}
			}catch(Exception e){
				getLogger().error("Generate GAPI message exception:"+e);
//				msgEntity.setErrorMsg(e.toString());
//				gapiMsgGenerator.storeMsg(para, msgEntity, false);
//				try {
//					throw e;
//				} catch (Exception e1) {
//					// TODO Auto-generated catch block
//					e1.printStackTrace();
//				}
			}finally{
				IDaoEntity entity = new ExecDaoEntity();
				StringBuffer stringBuffer = new StringBuffer();
				List<Object> updateParams = new ArrayList<Object>();

				stringBuffer.append("update ").append(" GapiMsg ")
						.append(" set sysLockBy = ?,sysLockFlag=?,trxEventTimes=?,errorMsg=?,msgSts=?where sysRefNo = ?");
				updateParams.add("");
				updateParams.add("F");
				int trxEventTimes=Integer.parseInt(map.get("trxEventTimes").toString())+1;
				String trxString=String.valueOf(trxEventTimes+":typejava.lang.Integer");
				updateParams.add(trxEventTimes);
				updateParams.add(receiveMsg.getError());
				String reCo=String.valueOf(retCode+":typejava.lang.Integer");
				updateParams.add(retCode);
				updateParams.add(map.get("sysRefNo").toString());
				entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
				entity.setParaList(updateParams);
				entity.setHql(stringBuffer.toString());
				FuncDataObj funcDataObj = new FuncDataObj();
				funcDataObj.addExcuteEntity(entity);
				daoHelper.execUpdate(funcDataObj);
			}
			
		}
		return null;
	}
	private JSONObject processServiceJs(ServicePara para,JSONObject serviceData) throws Exception{
		String jsFile = para.getServicejs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			serviceEngine.initTrxData(serviceData);
			serviceEngine.initTrxPara(para);
			try {
				serviceEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
			
			return (JSONObject) serviceEngine.getTrxData();
		}
		return serviceData;
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
		
					IGAPIMsgResponse gapiResponse = new GAPIManager().processSendMsg(msgPara, gapiRequest, serviceData);
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
	public Logger getLogger() {
		return GAPIUtil.getLogger();
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

	@Override
	public FuncDataObj modifyGapiMsg(Map gapiMessage, ApResponse apResponse) {
		// TODO Auto-generated method stub
		// apResponse.setSuccess(false);
		IDaoEntity entity = new ExecDaoEntity();
		StringBuffer sqls = new StringBuffer();
		FuncDataObj funcDataObj = new FuncDataObj();
		String sysRefNo = gapiMessage.containsKey("sysRefNo") ? (String) gapiMessage
				.get("sysRefNo") : "";
		List<Object> updateParams = new ArrayList<Object>();
		if (apResponse.isSuccess()) {
			sqls.append("delete from PortMonitor where sysRefNo=?");
			updateParams.add(sysRefNo);
			entity.setHql(sqls.toString());
			entity.setParaList(updateParams);
			entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
			funcDataObj.addExcuteEntity(entity);
			daoHelper.execUpdate(funcDataObj);
			return funcDataObj;
		} else {
			int portTimes = (Integer) (gapiMessage.containsKey("portTimes") ? (Integer) gapiMessage
					.get("portTimes") : "");
			sqls.append("update PortMonitor set portTimes= " + (portTimes + 1)
					+ ",sysLockFlag = ?, sysLockBy =? where sysRefNo =?");
			// updateParams.add("1");
			updateParams.add("F");
			updateParams.add(null);
			updateParams.add(sysRefNo);
			entity.setHql(sqls.toString());
			entity.setParaList(updateParams);
			entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
			funcDataObj.addExcuteEntity(entity);
			daoHelper.execUpdate(funcDataObj);
			return funcDataObj;
		}
	}

}
