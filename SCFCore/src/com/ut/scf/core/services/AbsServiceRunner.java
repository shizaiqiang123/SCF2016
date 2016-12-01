package com.ut.scf.core.services;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.logicflow.TransforNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.dao.IDaoHelper;

public abstract class AbsServiceRunner implements IServiceRunner{
	private String currentBu="";
	
	public void setBu(String bu){
		this.currentBu = bu;
	}
	
	protected Logger getLogger() {
		return APLogUtil.getServiceLogger(getBu());
	}
	
	@Resource(name = "serviceJsEngine")
	protected IServerSideJs jsEngine;
	
	@Resource(name = "serviceFactory")
	protected IServiceFactory serviceFactory;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	
	@Resource(name = "logicFactory")
	ILogicFactory logicFactory ;
	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;

	protected JSONObject processServiceJs(ServicePara para,JSONObject serviceData) throws Exception{
		String jsFile = para.getServicejs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
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
	
	protected String getBu(){
		return this.currentBu;
	}
	
	public boolean checkServiceEnable(JSONObject currentDataObj){
		JSONObject trxData = JsonHelper.getTrxObject(currentDataObj);
		if(trxData.containsKey("ServiceEnable")){
			return !"false".equalsIgnoreCase(trxData.getString("ServiceEnable"));
		}
		return true;
	}
	
	protected void processCallback(FuncDataObj retData,String inquireDataId) throws Exception {
		if(StringUtil.isTrimNotEmpty(inquireDataId)){
			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(inquireDataId,getBu());
			String inqType = inqPara.getType();
			
			if("S".equalsIgnoreCase(inqType)){
				getServiceData(inqPara.getTarget(),retData);
			}else if("Q".equalsIgnoreCase(inqType)){
				getQueryData(inqPara.getTarget(),retData);
			}else if("L".equalsIgnoreCase(inqType)){
				getLogicData(inqPara.getTarget(),retData);
			}else{
				getQueryData(inqPara.getTarget(),retData);
			}
		}
	}
	
	/**
	 * 
	 * @param target : service type
	 * @throws Exception
	 */
	private void getServiceData(String target,FuncDataObj retData)  throws Exception{
		JSONObject trxData = JsonHelper.getTrxObject(retData.getReqData());
		
		IServiceRunner runner = ServiceRunnerFactory.getServiceRunner(trxData);
		
		runner.setBu(this.getBu());
		
		runner.runService(target, retData);
	}
	
	private void getQueryData(String queryId,FuncDataObj retData) throws SCFThrowableException{
		QueryPara queryPara = XMLParaParseHelper.parseQuery(queryId,getBu());
		for (int i = 0, len = queryPara.getNodeSize(); i < len; i++) {
			QueryNode queryNode = queryPara.getNode(i);
			try {
				retData.setReqParaObj(queryNode);
				FuncDataObj processResult = queryFactory.getProcessor(queryNode).queryData(retData);
				daoHelper.execQuery(processResult);
				retData.mergeResponse(processResult);
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
				throw e;
			}
		}
	}
	
	private void getLogicData(String logicId,FuncDataObj retData) throws Exception{
		LogicFlowPara logicFlowPara = XMLParaParseHelper.parseFuncLogicFlow(logicId,getBu());
		FuncDataObj processResult = new FuncDataObj();
		for (int i = 0, len = logicFlowPara.getNodeSize(); i < len; i++) {
			LogicNode logicNode = logicFlowPara.getLnode(i);
			try {
				retData.setReqParaObj(logicNode);
				processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(retData));
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
				throw e;
			}
		}
		for (int i = 0, len = logicFlowPara.getTransforSize(); i < len; i++) {
			TransforNode logicNode = logicFlowPara.getTransforNode(i);
			try {
				retData.setReqParaObj(logicNode);
				processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(retData));
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
				throw e;
			}
		}
		daoHelper.execQuery(processResult);
		retData.mergeResponse(processResult);
	}
	
	public void callGapiProcess(String gapiMsgId,Object reqData,JSONObject serviceData,FuncDataObj retData) throws Exception{
		FuncDataObj processResult = new FuncDataObj();
		try {
			IGAPIMsgRequest gapiRequest = new MessageSendRequest();
			gapiRequest.setMsgBody( reqData);
			GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, getBu());
			IGAPIMsgResponse gapiResponse = gapiManager.processSendMsg(msgPara, gapiRequest, serviceData);
			if (gapiResponse.getRespCode() == 4) {
				Object object = gapiResponse.getResponseBody();
				if (object instanceof Map) {
					Map map = new HashMap();
					map.putAll(JsonHelper.getTrxObject(JsonUtil.getJSON(object)));
					processResult.buildRespose(map);
				}else if(object instanceof String){
					processResult.buildRespose(object);
				}
				retData.setRetStatus(FuncDataObj.SUCCESS);
				retData.setRetInfo(gapiResponse.getResponse());
			} else {
				retData.setRetStatus(FuncDataObj.FAILED);
				retData.setRetInfo("通讯请求失败!");
			}
		} catch (Exception e) {
			retData.setRetStatus(FuncDataObj.EXCEPTION);
			retData.setRetInfo(e.getMessage());
			e.printStackTrace();
			throw e;
		}
		retData.mergeResponse(processResult);
	}
}
