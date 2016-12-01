package com.ut.scf.core.task;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.w3c.dom.Document;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.GAPIManager;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.js.AbsServerSideJs;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.js.ScriptManager;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.services.edi.impl.EDIUtils;

@Service("taskJsEngine")
@Scope("prototype")
public class TaskJsEngine extends AbsServerSideJs{
	
	private final String BEANNAME = "$";
	
	private Date sysDate;
	
	private TaskPara taskPara;
	
	private AbsObject retPara;
	
	private String serviceType;
	
	protected JSONObject funcData;
	
	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;
	
	protected Logger getLogger(Class<? extends AbsServerSideJs> class1) {
		return APLogUtil.getBatchLogger();
	}

	
	@Override
	public void initTrxData(Object trxData) {
		if(scriptMgr==null){
			scriptMgr =new ScriptManager(BEANNAME, this); 
		}
		Assert.isTrue(JSONObject.class.isAssignableFrom(trxData.getClass()), "Currenttly doesn't support others data type but [JSONObject].");
		this.orgnData = (JSONObject) trxData;
		super.trxData = trxData;
		JSONObject reqJson = (JSONObject) this.trxData;
		
		funcData = JsonHelper.getFuncObject(reqJson);
		
		sysDate = DateTimeUtil.getSysDate();
	}

	@Override
	public Object getTrxPara() {
		return this.taskPara;
	}
	
	@Override
	public void initTrxPara(Object trxPara) {
		taskPara = (TaskPara) trxPara;
	}

	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("task", fileName));
		if (scriptFile.exists() && scriptFile.canRead()){
			scriptMgr.exec(scriptFile);
		}
		else
			throw new IOException("File not found or cannt read.");
	}

	@Override
	public void executeJsContent(String jsContent)  throws Exception {
		scriptMgr.exec(jsContent);
	}
	
	public void setServiceType(String serviceType){
		this.serviceType = serviceType;
	}
	
	public String getEdiType() throws Exception{
		Document msgDoc =XMLManager.xmlStrToDom(super.trxData.toString());
		if(msgDoc!=null){
			return msgDoc.getDocumentElement().getNodeName();
		}
		throw new Exception("Can't parse EDI msg Type.");
	}

	@Override
	public Object getTrxData() {
		return super.trxData;
	}
	
	public Object getTrxJson(){
		return JsonHelper.getTrxObject((JSONObject) trxData);
	}
	
	public void assignFunc(String funcId) throws Exception {
		if(StringUtil.isTrimEmpty(funcId)){
			throw new Exception("Assign Function failed, missing function id.");
		}
		
		FunctionPara para = XMLParaParseHelper.parseFuncPara(funcId,"");
		
		funcData.put("sysFuncId", funcId);
		funcData.put("name", para.getName());
		funcData.put("funcType", para.getFunctype());
		funcData.put("module", para.getModule());
		funcData.put("sysEventTimes", 1);
		funcData.put("sysPageIndex", para.getPagesSize()-1);
	}
	
	public Object callESBService(String serviceType) throws Exception{
		ServicePara service  =new ServicePara();
		service.setType(serviceType);
		
		IESBServiceRequest request = new ServiceRequestImpl();
		
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_POST);
		request.setRequestData(trxData);
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(service));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
		
		IESBServiceResponse retObj = ESBServiceUtil.getESBRunner().runService(request);
		
		return retObj.getResponseData();
	}
	
	public Object callService(String serviceId) throws Exception{
		
		ServicePara servicePara = XMLParaParseHelper.parseFuncService(serviceId, taskPara.getBu());
		
		JSONObject serviceData = processServiceJs(servicePara,(JSONObject) trxData);
		
//		funcData.put("fromSTP", "Y");
		JsonHelper.mark2StpFunc(serviceData,true);
		
		IESBServiceRequest request = new ServiceRequestImpl();
		
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_POST);
		request.setRequestData(serviceData);
		request.setRequestPara(servicePara);
		request.setMethodName(servicePara.getMethodname());
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(servicePara));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
		
		IESBServiceResponse retObj = ESBServiceUtil.getESBRunner().runService(request);
		
		FuncDataObj logicDataObj = new FuncDataObj();
		
		if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == retObj.getResponseResult()) {
			
			FuncDataObj retData = (FuncDataObj) retObj.getResponseData();
			
//			processCallback(retData,servicePara.getOnsuccess());

			String gapiMsgId = servicePara.getGapiid();
			if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
//				callGapiProcess(gapiMsgId,retData.getReturnObj(),serviceData);
				// 通过GAPI发送过了，是否就可以不返回到前台了，或者是否需要增加属性控制是否返回到前台
				GapiMsgPara gapiMsgPara=XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, taskPara.getBu());
				IGAPIMsgRequest igapiMsgRequest=new MessageSendRequest();
				igapiMsgRequest.setMsgBody(retData.getReturnObj());
				IGAPIMsgResponse igapiMsgResponse=gapiManager.processSendMsg(gapiMsgPara,igapiMsgRequest,serviceData);
		//		processSendMsg()
				return igapiMsgResponse;
			}else{
				logicDataObj.mergeResponse(retData);
			}
		}else{
			FuncDataObj retData = (FuncDataObj) retObj.getResponseData();
			
//			processCallback(retData,servicePara.getOnfailed());
			
//			String strResponse = retData.getReturnObj();
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(retData.getRetInfo());
		}
		return logicDataObj;
//		if (StringUtil.isTrimNotEmpty(servicePara.getGapiid())) {
//			GapiMsgPara gapiMsgPara=XMLParaParseHelper.parseGapiMsgPara(servicePara.getGapiid(), taskPara.getBu());
//			IGAPIMsgRequest igapiMsgRequest=new MessageSendRequest();
//			igapiMsgRequest.setMsgBody(retObj.getResponseData());
//			IGAPIMsgResponse igapiMsgResponse=gapiManager.processSendMsg(gapiMsgPara,igapiMsgRequest,serviceData);
//	//		processSendMsg()
//			return igapiMsgResponse;
//		}else{
//			return retObj.getResponseData();
//		}
		
		
	}
	
	
	private JSONObject processServiceJs(ServicePara para,JSONObject serviceData) throws Exception{
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
	
	
	@Resource(name = "serviceJsEngine")
	protected IServerSideJs jsEngine;
}
