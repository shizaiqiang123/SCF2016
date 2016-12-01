package com.ut.scf.core;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import com.ut.comm.log.LoggerFormator;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.IGetPage;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.core.workflow.WorkItem;

public abstract class AbsAPProcessor implements IAPProcessor {
	
	@Override
	public Object run(String strData) {
		try{
			JSONObject dataDom =JsonUtil.getJsonObj(strData);
			
			ApSessionContext context = ApSessionUtil.initialize(dataDom);
			
			FunctionPara funcObj = getFuncPara(dataDom);
			if(funcObj!=null){
				context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT, funcObj);
				if(StringUtil.isTrimEmpty(context.getSysFuncName()))
					context.setSysFuncName(funcObj.getShortnm());
			}
			JSONObject trxData = JsonHelper.getTrxObject(dataDom);
			String funcType = funcObj==null?"":funcObj.getFunctype();
			if(trxData.containsKey("funcType")){
				funcType = trxData.getString("funcType");
			}
			context.setSysFuncType(funcType);
			
			Object reqPageType = trxData.get("reqPageType");
			
			if(reqPageType!=null&&"initlize".equalsIgnoreCase(reqPageType.toString())){
				//此时不初始化Original function
			}else{
				FunctionPara orgFuncObj = getOrinFuncObj(dataDom);
				if(orgFuncObj!=null){
					context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT, orgFuncObj);
					context.setSysOrgnFuncId(orgFuncObj.getId());
					context.setSysOrgnFuncName(orgFuncObj.getShortnm());
				}
			}
			
			Object reqType = JsonHelper.getTrxObject(dataDom).get("reqType");
			Object reqBatchType =JsonHelper.getTrxObject(dataDom).get("reqBatchType");
			
//			APLogUtil.getUserLogger().info(String.format("请求执行功能名[%s]:[%s],请求类型[%s]。",
//					funcObj==null?"非功能性操作":funcObj.getName(),funcObj==null?"******":funcObj.getId(),this.getClass().getSimpleName()));
			
			LoggerFormator.info(APLogUtil.getUserLogger(), "请求执行:"+getStringValue(trxData, "reqType"),formatReq(getStringValue(trxData, "reqType"), dataDom, funcObj, null));
			
			if(reqType!=null&&reqBatchType==null){
				IMainComponent processor = ClassLoadHelper.getMainComponetProcessor((String) reqType);
				if(processor!=null){
					Object retObj = doProcess(processor, dataDom);
//					APLogUtil.getUserLogger().info(String.format("功能名[%s]:[%s],执行完成。", 
//							funcObj==null?"非功能性操作":funcObj.getName(),this.getClass().getSimpleName()));
					LoggerFormator.info(APLogUtil.getUserLogger(), "完成执行:"+getStringValue(trxData, "reqType"),formatReq(getStringValue(trxData, "reqType"), dataDom, funcObj, null));
					return retObj;
				}
			}
			
			customizeContext();
			JSONObject funcInfo = JsonUtil.getChildJson(dataDom, "funcInfo");
			if(!funcInfo.containsKey("sysPageIndex")){
				IApResponse obj = new ApResponse();
				obj.setMessage("");
				obj.setSuccess(true);
				
				return obj;// error message
			}
			int strPageIndex = funcInfo.getInt("sysPageIndex");
			PagePara pagePara =getPageManager.getCurrentPage(strPageIndex);
			context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT, pagePara);
			
//			APLogUtil.getUserLogger().info(String.format("功能名[%s]:[%s],操作页面[%s][%s]。", 
//					funcObj==null?"非功能性操作":funcObj.getName(),this.getClass().getSimpleName(),strPageIndex,pagePara.getDesc()));
			LoggerFormator.info(APLogUtil.getUserLogger(), "执行中:"+getStringValue(trxData, "reqType"),formatReq(getStringValue(trxData, "reqType"), dataDom, funcObj, pagePara));
			
			processWorkflowData(dataDom);
			
			IMainComponent t;
			String errorMessage="";
			try {
				t = getMainComponent(dataDom,pagePara);
				Object retObj= doProcess(t, dataDom);
				
//				APLogUtil.getUserLogger().info(String.format("功能名[%s]:[%s],执行完成。", 
//						funcObj==null?"非功能性操作":funcObj.getName(),this.getClass().getSimpleName()));
				LoggerFormator.info(APLogUtil.getUserLogger(), "完成执行:"+getStringValue(trxData, "reqType"),formatReq(getStringValue(trxData, "reqType"), dataDom, funcObj, pagePara));
				
				return retObj;
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
				errorMessage = e.getMessage();
				LoggerFormator.info(APLogUtil.getUserLogger(), "执行异常:"+getStringValue(trxData, "reqType"),formatReq(getStringValue(trxData, "reqType"), dataDom, funcObj, pagePara),e.getMessage());
			}
			IApResponse obj = new ApResponse();
			obj.setMessage(errorMessage);
			obj.setSuccess(false);
			
			return obj;// error message
		}catch(Exception e){
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
			LoggerFormator.info(APLogUtil.getUserLogger(), "执行异常:",e.getMessage());
			
			return e.getMessage();
		}finally{
			ApSessionUtil.close();
		}
	}
	
	private IMainComponent getMainComponent(JSONObject dataDom,PagePara pagePara) throws Exception{
		JSONObject funcOj = JsonHelper.getFuncObject(dataDom);
		String compClass = "";
		if(!pagePara.isTransaction()){
			compClass = pagePara.getMaincomp();
		}else if (ComponentDefine.isDefinedServiceComponent(pagePara.getPagetype())){
			compClass = pagePara.getMaincomp();
			if(StringUtil.isTrimEmpty(compClass))
				compClass =  ComponentDefine.getDefinedServiceComponent(pagePara.getMaincomp());
		}else if(funcOj.containsKey("funcType")&&ComponentDefine.isDefinedComponent(funcOj.getString("funcType"))){
			compClass =  ComponentDefine.getDefinedComponent(funcOj.getString("funcType"));
		}else if(StringUtil.isNotEmpty(pagePara.getMaincomp())){
			compClass = pagePara.getMaincomp();
		}else{
		}
		
		return ClassLoadHelper.getMainComponetProcessor(compClass);
	}
	
	protected void processWorkflowData(JSONObject dataDom) {
//		JSONObject trxData = JsonHelper.getTrxObject(dataDom);
//		Object reqPageType = trxData.get("reqPageType");
//		if(reqPageType!=null&&"initlize".equalsIgnoreCase(reqPageType.toString())){
//			
//		}
		
		if(JsonHelper.hasWorkflowObject(dataDom)){
			ApSessionContext context = ApSessionUtil.getContext();
			JSONObject workflow = JsonHelper.getWorkflowObject(dataDom);
			JSONObject trxObj = JsonHelper.getTrxObject(dataDom);
			WorkItem wi = (WorkItem) JsonUtil.getBean(workflow, WorkItem.class);
			trxObj.put("sysFuncId", wi.getNextStep());
			trxObj.put("sysOrgnFuncId", wi.getCurrentStep());
			trxObj.put("sysRefNo", wi.getItemRefNo());
			trxObj.put("sysEventTimes", wi.getItemEvent());
			trxObj.put("path", wi.getItemDesc());
			context.updateTrxData(dataDom);
		}
	}
	@Resource(name="webPageManager")  
	IMainComponent pageManager;
	
	@Resource(name = "aSETrxPageManagerBean")
	IGetPage getPageManager;
	
	
	protected Object goNextPage(Object dataDom) throws Exception {
		JSONObject trxDom = JsonHelper.getTrxObject((JSONObject)dataDom);
		trxDom.put("reqPageType","next");
		return pageManager.submitData(dataDom);
	}
	
	protected Object goPrePage(Object dataDom) throws Exception {
		JSONObject trxDom = JsonHelper.getTrxObject((JSONObject)dataDom);
		trxDom.put("reqPageType","pre");
		return pageManager.submitData(dataDom);
	}

	protected void customizeContext() {
		
	}

	public FunctionPara getFuncPara(JSONObject dataDom) throws Exception {
		JSONObject funcInfo = JsonUtil.getChildJson(dataDom, "funcInfo");
		if(funcInfo==null||!funcInfo.containsKey("sysFuncId"))
			return null;
		String strFunID =funcInfo.getString("sysFuncId");

		return getFuncObj(strFunID);
	}
	
	public FunctionPara getOrinFuncObj(JSONObject dataDom) throws Exception {
		JSONObject funcInfo = JsonHelper.getFuncObject(dataDom);
		JSONObject trxInfo = JsonUtil.getChildJson(dataDom, "trxDom");
		if(trxInfo==null)
			return null;
		Object strFunID =trxInfo.get("sysFuncId");
		if(funcInfo.containsKey("entryTp")&&"entry".equalsIgnoreCase(funcInfo.getString("entryTp"))){
			
			strFunID =funcInfo.get("sysOrgnFuncId"); 
			trxInfo.put("sysFuncId", strFunID);
		}
		if(strFunID == null||StringUtil.isNull(strFunID.toString()))
			strFunID =JsonHelper.getFuncObject(dataDom).get("sysOrgnFuncId") ;
		if(strFunID == null||StringUtil.isNull((String) strFunID))
			return null;
		
		return getFuncObj((String) strFunID);
	}
	
	protected FunctionPara getFuncObj(String funcID) throws Exception {
		ApSessionContext context = ApSessionUtil.getContext();
		
		FunctionPara funcObj = XMLParaParseHelper.parseFuncPara(funcID,context.getSysBusiUnit());
		return funcObj;
	}

	
	protected abstract Object doProcess(IMainComponent instance, Object dataDom) throws Exception;
	
	protected String formatReq(String type, JSONObject trxData,FunctionPara funcObj,PagePara pagePara){
		StringBuffer output = new StringBuffer();
		
		if(StringUtil.isTrimEmpty(type)){
			String className = this.getClass().getSimpleName().toLowerCase();
			if(className.indexOf("cancel")>-1){
				type = "cancel";
			}else if(className.indexOf("submit")>-1){
				type = "submit";
			}else if(className.indexOf("query")>-1){
				type = "query";
			}else{
				return "";
			}
			output.append(type).append(" ");
		}

		switch (type.toLowerCase()) {
		case "ajax":
			String strId = getStringValue(JsonHelper.getTrxObject(trxData), "getdataId");
			if(StringUtil.isTrimNotEmpty(strId)){
				output.append("getdataId:").append(strId);
			}else{
				String queryId = getStringValue(JsonHelper.getTrxObject(trxData), "queryId");
				output.append("queryId:").append(queryId);
			}
			break;
		case "webpagemanager":
			output.append("reqPageType:").append(getStringValue(JsonHelper.getTrxObject(trxData),"reqPageType"));
			if(funcObj==null){
			}else{
				output.append("function:").append(funcObj.getName());
			}
			if(pagePara==null){
			}else{
				output.append("pagePara:").append(pagePara.getName());
			}
			break;

		case "webloginmanager":
			output.append("webLoginManager:").append(getStringValue(JsonHelper.getTrxObject(trxData), "logType"));
			break;
		case "dtcprocessmanager":
			output.append("dtcProcessManager: ******");
			break;
		case "webimportmanager":
			output.append("webImportManager:").append(getStringValue(JsonHelper.getTrxObject(trxData), "fileName"));
			break;
		case "query":
			if(funcObj==null){
			}else{
				output.append("function:").append(funcObj.getName());
			}
			if(pagePara==null){
			}else{
				output.append("pagePara:").append(pagePara.getName());
			}
			
			break;
		case "submit":
			if(funcObj==null){
			}else{
				output.append("function:").append(funcObj.getName());
			}
			if(pagePara==null){
			}else{
				output.append("pagePara:").append(pagePara.getName());
			}
			break;
		case "cancel":
			if(funcObj==null){
			}else{
				output.append("function:").append(funcObj.getName());
			}
			if(pagePara==null){
			}else{
				output.append("pagePara:").append(pagePara.getName());
			}
			break;
		default:
			break;
		}
		return output.toString();
	}
	
	private String getStringValue(JSONObject trxData, String keyName){
		Object inquireDataId = trxData.get(keyName);
		String strId = inquireDataId!=null?inquireDataId.toString():"";
		return strId;
	}
	
}
