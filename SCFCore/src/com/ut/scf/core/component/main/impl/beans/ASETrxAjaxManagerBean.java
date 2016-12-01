package com.ut.scf.core.component.main.impl.beans;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.comm.pojo.PageInfo;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.logicflow.TransforNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.logic.ILogicFlowComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoHelper;

@Service("aSETrxAjaxManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxAjaxManagerBean implements IMainComponent {

	protected PagePara pagePara;

	protected ApSessionContext context;// 当前交易基本信息

	protected JSONObject trxData;

	protected FuncDataObj logicDataObj;

	protected Logger getLogger() {
		return APLogUtil.getUserLogger();
	}

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "logicFactory")
	ILogicFactory logicFactory;

	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;

	@Override
	public Object submitData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		String logicId = JsonHelper.getTrxObject(trxData).getString("logicId");
		if (StringUtil.isTrimEmpty(logicId)) {
			Object response = logicDataObj.buildReturnRespose("Ajax");
			return response;
		}
		LogicFlowPara logicFlows = XMLParaParseHelper.parseFuncLogicFlow(logicId, this.context.getSysBusiUnit());

		FuncDataObj dataObj = logicDataObj.clone();
		for (int i = 0, len = logicFlows.getNodeSize(); i < len; i++) {
			LogicNode logicFlow = logicFlows.getLnode(i);
			ILogicFlowComponent process = logicFactory.getProcessor(logicFlow);
			dataObj.setReqParaObj(logicFlow);
			FuncDataObj processResult = process.postData(dataObj);
			logicDataObj.mergeResponse(processResult);
		}

		daoHelper.execUpdate(logicDataObj);

		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	@Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;

	@Override
	public Object queryData(Object paraDom) throws Exception {
		JSONObject dataDom = (JSONObject) paraDom;
		parseParameters(dataDom);
		Object inquireDataId = JsonHelper.getTrxObject(dataDom).get("getdataId");
		String strId = inquireDataId != null ? inquireDataId.toString() : "";
		if (StringUtil.isTrimNotEmpty(strId)) {
			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(strId, this.context.getSysBusiUnit());
			String inqType = inqPara.getType();
			if ("S".equalsIgnoreCase(inqType)) {
				getServiceData(inqPara.getTarget());
			} else if ("P".equalsIgnoreCase(inqType)) {
				return getPageData(inqPara.getTarget());
			} else if ("Q".equalsIgnoreCase(inqType)) {
				getQueryData(inqPara.getTarget());
			} else if ("L".equalsIgnoreCase(inqType)) {
				getLogicData(inqPara.getTarget());
			} else if ("PA".equalsIgnoreCase(inqType)) {
				getParameterData(inqPara.getTarget());
			} else {
				getQueryData(inqPara.getTarget());
			}
		} else {
			Object queryId = JsonHelper.getTrxObject(dataDom).get("queryId");
			if (queryId != null) {
				getQueryData(queryId.toString());
			} else {
				IApResponse obj = new ApResponse();
				obj.setTotal(1);
				return obj;
			}
		}
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	/**
	 * 
	 * @param target
	 *            : service type
	 * @throws Exception
	 */
	private void getServiceData(String target) throws Exception {
		FunctionPara functPara = (FunctionPara) context
				.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);

		if (functPara == null) {
			processOtherService(target);
		} else {
			JSONObject trxJson = JsonHelper.getTrxObject(trxData);
			Object isFunctionSerrvice = trxJson.get("byFunc");
			if (isFunctionSerrvice != null) {
				String byFunc = isFunctionSerrvice.toString();
				if ("N".equalsIgnoreCase(byFunc)) {
					processOtherService(target);
					return;
				}
			}
			processFunctionService(target);
		}
	}

	public void processFunctionService(String serviceType) throws Exception {
		FunctionPara functPara = (FunctionPara) context
				.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		if ("RE".equalsIgnoreCase(functPara.getFunctype()))
			functPara = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		List<ServicePara> allServices = functPara.getServiceList();
		if (allServices == null || allServices.size() > 1) {
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(
					"No service find in currently function :" + functPara.getId() + " service type:" + serviceType);
			return;
		}

		for (ServicePara servicePara : allServices) {
			XMLParaParseHelper.parseFuncService(servicePara, context.getSysBusiUnit());
			if (serviceType.equalsIgnoreCase(servicePara.getType())) {
				ServicePara queryPara = XMLParaParseHelper.parseFuncService(servicePara.getId(),
						context.getSysBusiUnit());
				JSONObject serviceData = processServiceJs(queryPara, logicDataObj.getReqData());

				IESBServiceRequest request = new ServiceRequestImpl();

				request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
				request.setRequestData(serviceData);
				request.setRequestPara(queryPara);
				request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
				request.setRequestSource(ESBServiceUtil.generateApRequestEntity());

				IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);
				if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()) {
					FuncDataObj retData = (FuncDataObj) processResult.getResponseData();

					String gapiMsgId = queryPara.getGapiid();
					if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
						// IGAPIMsgRequest gapiRequest = new
						// MessageSendRequest();
						// gapiRequest.setMsgBody( retData.getReturnObj());
						// GapiMsgPara msgPara =
						// XMLParaParseHelper.parseGapiMsgPara(gapiMsgId,
						// context.getSysBusiUnit());
						// IGAPIMsgResponse
						// gapiResponse=gapiManager.process(msgPara,
						// gapiRequest, serviceData);
						// logicDataObj.setRetStatus(gapiResponse.getRespCode()+"");
						// logicDataObj.setRetInfo(gapiResponse.getResponse());
						callGapiProcess(gapiMsgId, retData.getReturnObj(), serviceData);
					} else {
						logicDataObj.mergeResponse(retData);
					}
				} else {
					String retData = processResult.getResponseData().toString();
					logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
					logicDataObj.setRetInfo(retData);
				}
				return;
			}
		}
		logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
		logicDataObj.setRetInfo(
				"No service find in currently function :" + functPara.getId() + " service type:" + serviceType);
	}

	public void processOtherService(String serviceType) throws Exception {
		ServicePara queryPara = new ServicePara();
		queryPara.setId(serviceType);
		queryPara = XMLParaParseHelper.parseFuncService(serviceType, context.getSysBusiUnit());

		JSONObject serviceData = processServiceJs(queryPara, logicDataObj.getReqData());

		IESBServiceRequest request = new ServiceRequestImpl();
		request.setRequestData(serviceData);
		request.setRequestPara(queryPara);
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
		request.setMethodName(queryPara.getMethodname());
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());

		IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);

		if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()) {

			FuncDataObj retData = (FuncDataObj) processResult.getResponseData();

			processCallback(retData, queryPara.getOnsuccess());

			String gapiMsgId = queryPara.getGapiid();
			if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
				callGapiProcess(gapiMsgId, retData.getReturnObj(), serviceData);
				// 通过GAPI发送过了，是否就可以不返回到前台了，或者是否需要增加属性控制是否返回到前台
			} else {
				logicDataObj.mergeResponse(retData);
			}
		} else {
			FuncDataObj retData = (FuncDataObj) processResult.getResponseData();

			processCallback(retData, queryPara.getOnfailed());

			// String strResponse = retData.getReturnObj();
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(retData.getRetInfo());
		}
	}

	protected void processCallback(FuncDataObj retData, String inquireDataId) throws Exception {
		if (StringUtil.isTrimNotEmpty(inquireDataId)) {
			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(inquireDataId, this.context.getSysBusiUnit());
			String inqType = inqPara.getType();

			JsonHelper.getTrxObject(trxData).putAll((Map) retData.getReturnObj());

			if ("S".equalsIgnoreCase(inqType)) {
				getServiceData(inqPara.getTarget());
			} else if ("Q".equalsIgnoreCase(inqType)) {
				getQueryData(inqPara.getTarget());
			} else if ("L".equalsIgnoreCase(inqType)) {
				getLogicData(inqPara.getTarget());
			} else {
				getQueryData(inqPara.getTarget());
			}
		}
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
	}

	protected void parseParameters(Object paraDom) {
		trxData = (JSONObject) paraDom;// 保留user 信息等
		this.context = ApSessionUtil.getContext();

		logicDataObj = new FuncDataObj();
		logicDataObj.setReqData(trxData);
	}

	private void getQueryData(String queryId) throws Exception {
		QueryPara queryPara = XMLParaParseHelper.parseQuery(queryId, context.getSysBusiUnit());
		for (int i = 0, len = queryPara.getNodeSize(); i < len; i++) {
			QueryNode queryNode = queryPara.getNode(i);
			try {
				logicDataObj.setReqParaObj(queryNode);
				FuncDataObj processResult = queryFactory.getProcessor(queryNode).queryData(logicDataObj);
				daoHelper.execQuery(processResult);
				logicDataObj.mergeResponse(processResult);
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
				throw e;
			}
		}
	}

	private void getLogicData(String logicId) throws Exception{
		LogicFlowPara logicFlowPara = XMLParaParseHelper.parseFuncLogicFlow(logicId,context.getSysBusiUnit());
		FuncDataObj processResult = new FuncDataObj();
			for (int i = 0, len = logicFlowPara.getNodeSize(); i < len; i++) {
					LogicNode logicNode = logicFlowPara.getLnode(i);
				try {
					logicDataObj.setReqParaObj(logicNode);
					processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(logicDataObj));
				} catch (Exception e) {
					APLogUtil.getUserErrorLogger().error(e.toString());
					throw e;
				}
			}
			for (int i = 0, len = logicFlowPara.getTransforSize(); i < len; i++) {
					TransforNode logicNode = logicFlowPara.getTransforNode(i);
				try {
					logicDataObj.setReqParaObj(logicNode);
					processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(logicDataObj));
				} catch (Exception e) {
					APLogUtil.getUserErrorLogger().error(e.toString());
					throw e;
				}
			}
			daoHelper.execQuery(processResult);
			logicDataObj.mergeResponse(processResult);
		}
	private void getParameterData(String paraId) throws SCFThrowableException {
		FuncDataObj processResult = new FuncDataObj();
		JSONObject reqJson = logicDataObj.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(reqJson);

		String paraPath = trxData.containsKey("paraPath") ? trxData.getString("paraPath") : "";

		reqJson.put("paraId", paraId);
		if (StringUtil.isTrimEmpty(paraPath)) {
			logicDataObj.mergeResponse(null);
		} else {
			QueryNode queryPara = new QueryNode();
			queryPara.setTablename(paraPath);
			queryPara.setComponent("paraQuery");
			queryPara.setType("C");
			logicDataObj.setReqParaObj(queryPara);

			processResult.mergeResponse(queryFactory.getProcessor(queryPara).queryData(logicDataObj));
		}
		logicDataObj.mergeResponse(processResult);
	}

	private String getPropertyValue(JSONObject reqData, String name) {
		if (StringUtil.isTrimEmpty(name))
			return "";
		return reqData.containsKey(name) ? reqData.getString(name) : "";
	}

	private IApResponse getPageData(String queryId) throws SCFThrowableException {
		pagePara = new PagePara();
		pagePara.setId(queryId);
		XMLParaParseHelper.parsePage(pagePara, context.getSysBusiUnit());

		PageInfo info = new PageInfo();
		info.setIndex(0);
		info.setName(pagePara.getName());
		info.setTotal(1);
		info.setUrl(pagePara.getJspfile());
		info.setFunctionId(pagePara.getId());
		info.setQueryId(pagePara.getQueryid());
		info.setPageType("getData");
		info.setDoname(pagePara.getDoname());

		IApResponse obj = new ApResponse();
		obj.setTotal(1);
		obj.setPageInfo(info);
		return obj;
	}

	private JSONObject processServiceJs(ServicePara para, JSONObject serviceData) throws Exception {
		String jsFile = para.getServicejs();

		if (StringUtil.isTrimNotEmpty(jsFile)) {
			jsEngine.initTrxData(serviceData);
			jsEngine.initTrxPara(para);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}

			return (JSONObject) jsEngine.getTrxData();
		}
		return serviceData;
	}

	@Resource(name = "serviceJsEngine")
	protected IServerSideJs jsEngine;

	public void callGapiProcess(String gapiMsgId, Object reqData, JSONObject serviceData) throws Exception {
		FuncDataObj processResult = new FuncDataObj();
		try {

			IGAPIMsgRequest gapiRequest = new MessageSendRequest();
			gapiRequest.setMsgBody(reqData);
			GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, context.getSysBusiUnit());
			IGAPIMsgResponse gapiResponse = gapiManager.processSendMsg(msgPara, gapiRequest, serviceData);
			if (gapiResponse.getRespCode() == 4) {
				Object object = gapiResponse.getResponseBody();
				if (object instanceof Map) {
					Map map = new HashMap();
					map.putAll(JsonHelper.getTrxObject(JsonUtil.getJSON(object)));
					processResult.buildRespose(map);
				} else if (object instanceof String) {
					processResult.buildRespose(object);
				}
			} else {
				logicDataObj.setRetStatus(FuncDataObj.FAILED);
				logicDataObj.setRetInfo("通讯请求失败!");
			}
		} catch (Exception e) {
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(e.getMessage());
			e.printStackTrace();
			throw e;
		}
		logicDataObj.mergeResponse(processResult);
	}
}
