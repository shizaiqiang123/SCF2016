package com.ut.scf.core.gapi;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.logicflow.TransforNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.component.logic.ILogicFactory;
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
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.func.FunctionProcessor;
import com.ut.scf.core.func.IFunctionProcessor;
import com.ut.scf.core.gapi.reformat.GAPIMsgFormatorFactory;
import com.ut.scf.core.gapi.reformat.IGAPIMsgReformat;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.GapiMsg;

@Service("gapiManager")
public class GAPIManager implements IGAPIProcessManager {
	private GapiMsgPara gapiPara;

	private String currentBu = "";
	private int gapiSts;

	public static final int GAPI_STS_RESEND = 0;
	public static final int GAPI_STS_FORBATCH = 1;
	public static final int GAPI_STS_RECEIVE = 2;

	public Logger getLogger() {
		return GAPIUtil.getLogger();
	}

	@Resource(name = "gapiJsEngine")
	protected IServerSideJs jsEngine;

	@Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "logicFactory")
	ILogicFactory logicFactory;

	@Override
	public IGAPIMsgResponse processSendMsg(GapiMsgPara para, IGAPIMsgRequest msgContent, Object trxData)
			throws Exception {
		this.gapiPara = para;

		currentBu = para.getBu();// or get from context

		Object msgBody = msgContent.getMsgBody();
		JSONObject msgData = msgBody == null ? new JSONObject() : (JSONObject) msgBody;
		JSONObject reqData = (JSONObject) trxData;

		// ApSessionContext context = ApSessionUtil.getContext();
		// GapiMsgPara gapiMsgPara = XMLParaParseHelper.parseGapiMsgPara(gapiId,
		// context.getSysBusiUnit());
		IGAPIMsgManager gapiMsgGenerator = ClassLoadHelper.getComponentClass(para.getGenerator());

		IGAPIMsgResponse response = new MessageSendResponse();

		boolean needStore = "Y".equalsIgnoreCase(para.getMsgstore());
		boolean sendInterrupt = "Y".equalsIgnoreCase(para.getSendinterrupt());
		boolean receiveInterrupt = "Y".equalsIgnoreCase(para.getReceiveinterrupt());

		if (para.getGapiSts() != null) {
			gapiSts = Integer.parseInt(para.getGapiSts());
		} else {
			gapiSts = GAPI_STS_RESEND;
		}

		GapiMsg msgEntity = new GapiMsg();
		String key = UUIdGenerator.getUUId();
		msgEntity.setMsgId(key);
		msgEntity.setSysRefNo(key);
		try {
			merageResponse(msgData, reqData);

			reqData = (JSONObject) processGAPIJs(reqData, para.getReformatjs());// json?
																				// xml

			Object gapiMsg = gapiMsgGenerator.mergeMsg(para, reqData);// 生成目标格式

			IGAPIMsgReformat formator = GAPIMsgFormatorFactory.getReformatFactory(para.getReformatclass());

			String strGapiMsg = formator.reformat(para, gapiMsg, reqData);// 对格式经行必要的格式化，返回string格式数据待发送
			JSONObject trxDom = (JSONObject) reqData.get("trxDom");
			String trxRefNo = "";
			int trxEventTimes = 1;
			if (trxDom.get("sysRefNo") != null) {
				trxRefNo = trxDom.containsKey("sysRefNo") ? trxDom.getString("sysRefNo") : "";
			}
			if (trxDom.get("sysEventTimes") != null) {
				trxEventTimes = trxDom.containsKey("sysEventTimes") ? trxDom.getInt("sysEventTimes") : 0;
			}
			msgEntity.setSysEventTimes(1);
			msgEntity.setSendMessage(strGapiMsg);
			msgEntity.setGapiName(para.getName());
			msgEntity.setTrxRefNo(trxRefNo);
			msgEntity.setTrxEventTimes(trxEventTimes);
			msgEntity.setGapiType("out");
			msgEntity.setSysBusiUnit(currentBu);
			msgEntity.setSysLockFlag("F");
			msgEntity.setSysTrxSts("M");
			msgEntity.setGapiSts(gapiSts);
			msgEntity.setSysOpTm(DateTimeUtil.getTimestamp());

			getLogger().debug("Generate GAPI message success. begin to store msg :" + strGapiMsg);
			getLogger().debug("Generate GAPI message success. begin to store msg by key:" + key);
			getLogger().debug("trxRefNo is:" + trxRefNo);
			getLogger().debug("trxEventTimes is:" + trxEventTimes);
			if (GAPI_STS_RESEND == gapiSts) {
				IESBServiceResponse receiveMsg = sendAndReceiveMsgByESB(strGapiMsg);// 发送请求并根据定义同步接收响应
				int retCode = receiveMsg.getRespCode();
				getLogger().debug(" receiveMsg:" + receiveMsg);
				msgEntity.setMsgSts(retCode);
				response.setRespCode(retCode);
				response.setError(receiveMsg.getError());

				if (IESBServiceResponse.ESB_RESP_CODE_EXCEPTION == retCode) {
					throw new Exception(receiveMsg.getError());
				} else if (IESBServiceResponse.ESB_RESP_CODE_RECEIVED == retCode) {
					msgEntity.setReceiveMessage(receiveMsg.getResponseData().toString());// 业务层不关心消息原始格式，只需要json的格式
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
					throw new Exception("Unknow return code from ESB." + retCode);
				}

				FuncDataObj funcData = new FuncDataObj();

				Object responseObj = receiveMsg.getResponseData();
				if (responseObj != null && StringUtil.isNotEmpty(responseObj.toString())) {
					List<Object> returnObj = gapiMsgGenerator.demerge(para, responseObj.toString());// jsons，
																									// 反向解析收到的响应，生成对应的json

					JSONObject responseData = new JSONObject();

					for (Object object : returnObj) {

						object = processGAPIJs((JSONObject) object, para.getValidatejs());// 调用验证机制验证消息是否合法

						IGAPIMsgReformat verifier = GAPIMsgFormatorFactory.getReformatFactory(para.getValidateclass());

						Object responseJson = verifier.verify(para, object);

						if (responseJson != null) {
							JsonHelper.getTrxObject(reqData).putAll(JsonHelper.getTrxObject((JSONObject) responseJson));
							responseData.putAll((JSONObject) responseJson);
						}

						if (!checkVerifyResult((JSONObject) responseJson)) {
							break;
						}

					}
					response.setResponseBody( responseData.toString());
					funcData.setReqData(reqData);
				}
				funcData.setReqParaObj(para);

				if (checkVerifyResult(JsonHelper.getTrxObject(reqData))) {
					// 支持生成新的消息
					processCallback(funcData, para.getOnsuccess());
					// 处理全部成功后，调用对应的成功响应，比如更新业务表里面的部分栏位
				} else {
					// 处理全部成功后，调用对应的成功响应，比如更新业务表里面的部分栏位
					// 失败后调用回调函数
					//processCallback(funcData, para.getOnfailed());
					throw new Exception("接口返回错误");
				}
			}
			return response;
		} catch (Exception e) {
			getLogger().error("Generate GAPI message exception:" + e);
			msgEntity.setErrorMsg(e.toString());
			// gapiMsgGenerator.storeMsg(para, msgEntity, false);
			throw e;
		} finally {
			if (needStore) {
				// 注意记住对应的ESB服务编号，重发时直接发送到对应的服务中
				gapiMsgGenerator.storeMsg(para, msgEntity, false);// 对详细本省经行记录，用于错误重发功能
			}
		}
	}

	private Object processGAPIJs(JSONObject mappingData, String jsFile) {

		if (StringUtil.isTrimNotEmpty(jsFile)) {
			jsEngine.initTrxData(mappingData);
			jsEngine.initTrxPara(gapiPara);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error("Generate GAPI messagejs exception:" + e);
				e.printStackTrace();
			}

			mappingData = (JSONObject) jsEngine.getTrxData();
		}
		return mappingData;
	}

	/**
	 * 
	 * @param gapiMsg
	 *            XML
	 * @return XML
	 * @throws Exception
	 */
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

	public boolean checkVerifyResult(JSONObject resultJson) {
		return resultJson.containsKey("verifyResult") ? (resultJson.getBoolean("verifyResult") ==true ? resultJson.getBoolean("verifyResult") :false ): true;
	}

	public String getVerifyMsg(JSONObject resultJson) {
		return resultJson.containsKey("verifyMsg") ? resultJson.getString("verifyMsg") : "";
	}

	public void merageResponse(JSONObject response, JSONObject reqData) {
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		trxObj.putAll(response);
	}

	@Override
	public IGAPIMsgRequest processRecvMsg(String mappingService, String msgContent, String bu) throws Exception {
		GapiMsgPara gapiPara = XMLParaParseHelper.parseGapiMsgPara(mappingService, bu);
		IGAPIMsgRequest response = new MessageSendRequest();
		response.setGapiMsgPara(gapiPara);

		String ackFlag = gapiPara.getAck();

		if ("Y".equalsIgnoreCase(ackFlag)) {
			// 直接返回ACK消息，其他结果通过线程异步处理
			Callable<IGAPIMsgRequest> process = new ReceiveProcessThread(gapiPara, msgContent, null);
			FutureTask<IGAPIMsgRequest> task = new FutureTask<IGAPIMsgRequest>(process);
			Thread oneThread = new Thread(task);
			oneThread.start();

			String ackMsgId = gapiPara.getAckMsg();
			IGAPIMsgRequest ackRequest = new MessageSendRequest();

			GapiMsgPara ackPara = XMLParaParseHelper.parseGapiMsgPara(ackMsgId, bu);

			JSONObject msgData = new JSONObject();

			ackRequest.setGapiMsgPara(ackPara);

			ackRequest.setMsgBody(msgData);

			JSONObject trxData = JsonHelper.createReqJson();

			String ackResponse = this.processReformatMsg(ackPara, ackRequest, trxData);

			response.setMsgBody(ackResponse);

			return response;
		} else {
			String gapiModle = gapiPara.getModle();
			if ("SYNC".equalsIgnoreCase(gapiModle)) {
				// 同步处理
				Callable<IGAPIMsgRequest> process = new ReceiveProcessThread(gapiPara, msgContent, null);
				response = process.call();
				return response;
			} else if ("ASYNC".equalsIgnoreCase(gapiModle)) {
				// 异步处理，启动线程处理，当前线程直接返回
				Callable<IGAPIMsgRequest> process = new ReceiveProcessThread(gapiPara, msgContent, null);
				FutureTask<IGAPIMsgRequest> task = new FutureTask<IGAPIMsgRequest>(process);
				Thread oneThread = new Thread(task);
				oneThread.start();
				response.setMsgBody("");
				return response;
			} else {
				// 不需要任何的响应
				response.setMsgBody("");
				return response;
			}

		}
	}

	class ReceiveProcessThread implements Callable<IGAPIMsgRequest> {
		private GapiMsgPara gapiPara;
		private String receiveMsg;
		private Object reqData;

		public ReceiveProcessThread(GapiMsgPara gapiPara, String responseMsg, Object reqData) {
			this.gapiPara = gapiPara;
			this.receiveMsg = responseMsg;
			this.reqData = reqData;
		}

		@Override
		public IGAPIMsgRequest call() throws Exception {
			IGAPIMsgRequest response = new MessageSendRequest();
			response.setGapiMsgPara(gapiPara);
			IGAPIMsgManager gapiMsgGenerator = ClassLoadHelper.getComponentClass(gapiPara.getGenerator());

			List<Object> returnObj = gapiMsgGenerator.demerge(gapiPara, receiveMsg);// jsons

			JSONObject responseData = new JSONObject();

			for (Object object : returnObj) {

				object = (JSONObject) processGAPIJs((JSONObject) object, gapiPara.getValidatejs());

				IGAPIMsgReformat verifier = GAPIMsgFormatorFactory.getReformatFactory(gapiPara.getValidateclass());

				Object responseJson = verifier.verify(gapiPara, object);

				FuncDataObj funcObj = new FuncDataObj();
				funcObj.setReqData((JSONObject) responseJson);
				funcObj.setReqParaObj(gapiPara);
				FuncDataObj retFuncObj = new FuncDataObj();
				retFuncObj = processCallback(funcObj, gapiPara.getOnsuccess());

				if (FuncDataObj.SUCCESS.equalsIgnoreCase(retFuncObj.getRetStatus())
						&& retFuncObj.getReturnObj() != null) {
					Object object1 = retFuncObj.getReturnObj();
					JSONObject map = new JSONObject();
					if (HashMap.class.isAssignableFrom(object1.getClass())) {
						map.putAll((JSONObject) object1);
					} else {
						map.putAll(BeanUtils.toMap(retFuncObj.getReturnObj()));
					}
					responseData.putAll(map);
				}
			}

			JSONObject reqData = JsonHelper.createReqJson();

			merageResponse(responseData, reqData);

			reqData = (JSONObject) processGAPIJs(reqData, gapiPara.getReformatjs());// json?

			Object gapiMsg = gapiMsgGenerator.mergeMsg(gapiPara, reqData);

			IGAPIMsgReformat formator = GAPIMsgFormatorFactory.getReformatFactory(gapiPara.getReformatclass());

			String strGapiMsg = formator.reformat(gapiPara, gapiMsg, reqData);

			// IESBServiceResponse receiveMsg =
			// sendAndReceiveMsgByESB(strGapiMsg);
			response.setMsgBody(strGapiMsg);
			return response;
		}
	}

	@Override
	public String processReformatMsg(GapiMsgPara para, IGAPIMsgRequest msgContent, Object trxData) throws Exception {
		this.gapiPara = para;

		currentBu = para.getBu();// or get from context

		JSONObject msgData = (JSONObject) msgContent.getMsgBody();

		JSONObject reqData = (JSONObject) trxData;

		IGAPIMsgManager gapiMsgGenerator = ClassLoadHelper.getComponentClass(para.getGenerator());

		try {
			merageResponse(msgData, reqData);

			reqData = (JSONObject) processGAPIJs(reqData, para.getReformatjs());// json?
																				// xml

			Object gapiMsg = gapiMsgGenerator.mergeMsg(para, reqData);

			IGAPIMsgReformat formator = GAPIMsgFormatorFactory.getReformatFactory(para.getReformatclass());

			String strGapiMsg = formator.reformat(para, gapiMsg, reqData);

			return strGapiMsg;

		} catch (Exception e) {
			throw e;
		}
	}

	/**
	 * 同步还是异步，后续增强
	 * 
	 * @param retData
	 * @param inquireDataId
	 * @throws Exception
	 */
	protected FuncDataObj processCallback(FuncDataObj reqData, String inquireDataId) throws Exception {
		FuncDataObj retFuncObj = reqData;
		if (StringUtil.isTrimNotEmpty(inquireDataId)) {
			GapiMsgPara gapiPara = (GapiMsgPara) reqData.getReqParaObj();

			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(inquireDataId, gapiPara.getBu());
			String inqType = inqPara.getType();

			if ("S".equalsIgnoreCase(inqType)) {
				retFuncObj = getServiceData(inqPara.getTarget(), gapiPara.getBu(), reqData.getReqData());
			} else if ("Q".equalsIgnoreCase(inqType)) {
				retFuncObj = getQueryData(inqPara.getTarget(), gapiPara.getBu(), reqData.getReqData());
			} else if ("L".equalsIgnoreCase(inqType)) {
				retFuncObj = getLogicData(inqPara.getTarget(), gapiPara.getBu(), reqData.getReqData());
			} else if ("F".equalsIgnoreCase(inqType)) {
				retFuncObj = getFuncData(inqPara.getTarget(), gapiPara.getBu(), reqData.getReqData());
			} else {
				retFuncObj.setRetStatus(FuncDataObj.FAILED);
				retFuncObj.setRetInfo("Unknow inquery data type.");
				retFuncObj = reqData;
			}
		}
		return retFuncObj;
	}

	private FuncDataObj getFuncData(String target, String bu, JSONObject reqData) {
		FunctionPara funcPara = XMLParaParseHelper.parseFuncPara(target, bu);
		JSONObject funcObj = JsonHelper.getFuncObject(reqData);
		funcObj.put("sysFuncId", funcPara.getId());
		funcObj.put("name", funcPara.getName());
		funcObj.put("funcType", funcPara.getFunctype());
		funcObj.put("module", funcPara.getModule());
		funcObj.put("sysEventTimes", 1);
		funcObj.put("sysPageIndex", funcPara.getPagesSize() - 1);
		FuncDataObj retData = new FuncDataObj();

		try {
			// IAPProcessor processor =
			// ClassLoadHelper.getComponentClass("aPSubmitProcessor");
			// IApResponse response = (IApResponse) processor.run(reqData);
			IFunctionProcessor funcProcessor = new FunctionProcessor();
			funcProcessor.setLogger(APLogUtil.getBatchLogger());
			funcProcessor.setRequestDom(reqData, true);
			funcProcessor.setThreadModule(true);// default
			funcProcessor.setTransactionModule(true);// default
			IApResponse response = funcProcessor.run();
			if (response.isSuccess()) {
				retData.setRetStatus(FuncDataObj.SUCCESS);
			} else {
				retData.setRetStatus(FuncDataObj.FAILED);
				retData.setRetInfo(response.getMessage());
			}
		} catch (Exception e) {
			retData.setRetStatus(FuncDataObj.FAILED);
			retData.setRetInfo(e.toString());
		}

		return retData;
	}

	private FuncDataObj getServiceData(String target, String bu, JSONObject reqData) {
		ServicePara queryPara = new ServicePara();
		queryPara = XMLParaParseHelper.parseFuncService(target, bu);

		FuncDataObj retData = new FuncDataObj();

		try {
			JSONObject serviceData = processServiceJs(queryPara, reqData);

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

				processCallback(retData, queryPara.getOnsuccess());

				String gapiMsgId = queryPara.getGapiid();

				if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
					GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, bu);

					IGAPIMsgRequest gapiRequest = new MessageSendRequest();
					gapiRequest.setMsgBody(retData.getReturnObj());// need fix

					IGAPIMsgResponse gapiResponse = processSendMsg(msgPara, gapiRequest, serviceData);
					if (gapiResponse.getRespCode() == IGAPIMsgResponse.GAPI_RESP_CODE_RECEIVED) {
						if (gapiResponse.getResponseBody() != null
								&& StringUtil.isNotNull(gapiResponse.getResponseBody().toString())) {
							retData.buildRespose(gapiResponse.getResponseBody());
						}
					}
				}
			} else {
				processCallback(retData, queryPara.getOnfailed());
			}
		} catch (Exception e) {
			APLogUtil.getUserErrorLogger().error(e.toString());
			retData.setRetStatus(AbsDataObject.FAILED);
			retData.setRetInfo(e.toString());
		}

		return retData;
	}

	@Resource(name = "serviceJsEngine")
	protected IServerSideJs serviceEngine;

	private JSONObject processServiceJs(ServicePara para, JSONObject serviceData) throws Exception {
		String jsFile = para.getServicejs();

		if (StringUtil.isTrimNotEmpty(jsFile)) {
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

	private FuncDataObj getQueryData(String queryId, String bu, JSONObject reqDomData) {
		FuncDataObj funcObj = new FuncDataObj();
		QueryPara queryPara = XMLParaParseHelper.parseQuery(queryId, bu);
		// funcObj.setReqParaObj(queryPara);
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
				// throw e;
				funcObj.setRetStatus(AbsDataObject.FAILED);
				funcObj.setRetInfo(e.toString());
			}
		}
		return funcObj;
	}

	
	private FuncDataObj getLogicData(String logicId, String bu, JSONObject reqDomData) {
	/*	LogicFlowPara logicFlowPara = XMLParaParseHelper.parseFuncLogicFlow(logicId, bu);
		FuncDataObj processResult = new FuncDataObj();
		for (int i = 0, len = logicFlowPara.getNodeSize(); i < len; i++) {
			LogicNode logicNode = logicFlowPara.getLnode(i);
			try {
				processResult.setReqData(reqDomData);
				processResult.setReqParaObj(logicNode);
				processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(processResult));
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
				// throw e;
				processResult.setRetStatus(AbsDataObject.FAILED);
				processResult.setRetInfo(e.toString());
			}
		}
		daoHelper.execUpdate(processResult);
		processResult.mergeResponse(processResult);
		return processResult;*/
	
	
	
	LogicFlowPara logicFlowPara = XMLParaParseHelper.parseFuncLogicFlow(logicId,bu);

	FuncDataObj processResult = new FuncDataObj();

	for (int i = 0, len = logicFlowPara.getNodeSize(); i < len; i++) {

		LogicNode logicNode = logicFlowPara.getLnode(i);

		try {
			processResult.setReqData(reqDomData);
			processResult.setReqParaObj(logicNode);

			processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(processResult));

		} catch (Exception e) {

			APLogUtil.getUserErrorLogger().error(e.toString());

//			throw e;

		}
	
	}

	for (int i = 0, len = logicFlowPara.getTransforSize(); i < len; i++) {

		TransforNode logicNode = logicFlowPara.getTransforNode(i);

		try {
			processResult.setReqData(reqDomData);
			processResult.setReqParaObj(logicNode);

			processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(processResult));

		} catch (Exception e) {

			APLogUtil.getUserErrorLogger().error(e.toString());

//			throw e;

		}
	
	}

	daoHelper.execQuery(processResult);

	processResult.mergeResponse(processResult);
	return processResult;
	}
}
