package com.ut.scf.web.servlet;


import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.ut.comm.cache.ICSCacheClient;
import com.ut.comm.cache.ICacheClient;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.esb.web.exception.AppRunTimeException;
import com.ut.scf.esb.web.exception.ExceptionConstants;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.session.FuncSessionObj;
import com.ut.scf.web.session.PageSessionObj;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebUtils;

public abstract class AbsServletRequestAware extends ActionSupport implements SessionAware, ServletRequestAware,ServletResponseAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	// Action上下文
	protected ActionContext context = ActionContext.getContext();
	// 客户端请求request
	protected HttpServletRequest request;
	// 服务端响应response
	protected HttpServletResponse response;
	// session会话
	protected SessionMap session;
	
	protected Map<String,Object> dataMap = new HashMap<String,Object>();
	
	protected Object processResult = null;
	
	protected String strResult;
	
	protected JSONObject dataDom=null;
	
	protected JSONObject reqTrxData = null;//not contains session data
	
	private Logger logger = LoggerFactory.getLogger("weblog");
	// 分页数据
	protected int page = 1;
	protected int rows = 10;
	
	protected boolean cacheData = false;
	
//	@Resource(name="sessionManager")  
//	protected SessionManager sessionManager;
	
//	@Resource(name="webCacheClient")  
	protected ICacheClient webCache = WebCacheManager.getCache();
	
	public String execute() throws Exception {
		logger.debug("Receive request, session id is:"+request.getSession().getId());
		
		boolean isTimeOut = checkTimeout();
		if(isTimeOut){
			strResult = JsonUtil.getJSONString(dataMap);
			return SUCCESS;
		}
		
		boolean isTrxError = checkTrxResult();
		if(!isTrxError){
			return SUCCESS;
		}
		
		reqTrxData = WebUtils.getRequestParam(request);
		
		dataDom = WebUtils.generateDomByRequest(request);
		
		beforeAction(); 
		
		logger.info("当前请求页面："+SessionManager.getPageIndexFromSession(request)+" "+this.getReqType());
		
		request.setAttribute("requestType", this.getReqType());
		
		String action = executeAction();
		
		afterAction();
		
		updateFunction();
		
//		webCache.close();
		
		strResult = JsonUtil.getJSONString(dataMap);
		
		return action;
	}
	
	protected void updateFunction() throws Exception{
		SessionManager.updateFunction(request,dataMap);
	}

	protected abstract String getReqType();
	
	protected void beforeAction() {
		
	}

	protected void afterAction() {
		
	}

	protected String executeAction() throws Exception{
		return SUCCESS;
	}

	/**
	 * 取当前会话用户的用户名
	 * @return
	 */
	protected String getUserName(){		
		Object obj = session.get("userName");
		if(obj!=null){
			return obj.toString();
		}else{
			throw new AppRunTimeException(ExceptionConstants.Code_0002);
		}
	}

	/**
	 * 取当前会话用户的ID
	 * @return
	 */
	protected String getUserId(){		
		Object obj = session.get("userId");
		if(obj!=null){
			return obj.toString();
		}else{
			throw new AppRunTimeException(ExceptionConstants.Code_0002);
		}
	}
	
	
	/******************** 通过IOC方式获取 request,response,session ****************/
	@Override
	public void setSession(Map map) {
		this.session = (SessionMap) map;
	}
	
	@Override
	public void setServletRequest(HttpServletRequest req) {
		this.request = req;
	}

	@Override
	public void setServletResponse(HttpServletResponse res) {
		this.response = res;
	}
	
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}
	
	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}	
	
	protected String generateRequestKey(String ...strings ){
		return WebUtils.generateRequestKey(strings);
	}
	
	public String generateRequestKey(){
		JSONObject trxObject = WebUtils.getRequestParam(request);
		Object cacheType = trxObject.get("cacheType");
		if(cacheType!=null&&"non".equalsIgnoreCase(cacheType.toString())){
			logger.debug("Non cache request.");
			return "";
		}else{
			return generateRequestKeyAnyway();
		}
	}
	
	public String generateRequestKeyAnyway(){
		JSONObject trxObject = WebUtils.getRequestParam(request);
		Object cacheType = trxObject.get("cacheType");
		String preFix = generateRequestKey(SessionManager.getSessionId(request));
		FuncSessionObj funcObj =SessionManager.getFuncInfoFromSession(request);
		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
		String strFuncId =funcObj==null?"F":funcObj.getSysFuncId();
		int strPageIndex = pageObj==null?-1:pageObj.getIndex();
//		String pageDo = pageObj==null?"":pageObj.getDoname();
		
		String strReqId = this.request.getParameter("reqid");
		String strGetDataId = this.request.getParameter("getdataId");
		String strQueryId = this.request.getParameter("queryId");

		trxObject.remove("_dc");
		trxObject.remove("reqPageType");
		trxObject.remove("cacheType");
		int code = trxObject.hashCode();
		
		if(cacheType!=null&&cacheType.toString().equalsIgnoreCase("comm")){
			return generateRequestKey(code+"",strReqId,strGetDataId,strQueryId);
		}

		return generateRequestKey(preFix,strFuncId,strPageIndex+"",code+"",strReqId,strGetDataId,strQueryId);
	}
	
	protected boolean checkTimeout(){
		Object errorMsg = request.getAttribute("message");
		if(errorMsg!=null){
			dataMap.put("success", false);
			dataMap.put("message", errorMsg.toString());
			dataMap.put("level", -1);
		}
		return errorMsg!=null;
	}
	
	
	protected String getTrxResult() {
		String result = SessionManager.getTrxResult(request);
		return result;
	}
	
	protected boolean checkTrxResult() {
		return true;
	}
	
	public String getStrResult() {
		return strResult;
	}

	public void setStrResult(String strResult) {
		this.strResult = strResult;
	}
	
	protected Map getRetMap(Object response){
		if(IApResponse.class.isAssignableFrom(response.getClass())){
			IApResponse retObj =((IApResponse)response).clone();
			retObj = (IApResponse) retObj.unSerialize();
			return BeanUtils.toMap(retObj);
		}
		return BeanUtils.toMap(response);
	}
	
	protected String getValueFromRequest(String reqName){
		
		if(this.request!=null&&StringUtil.isNotNull( request.getParameter(reqName))){
			return request.getParameter(reqName);
		}
		
		if(reqTrxData!=null&&reqTrxData.containsKey(reqName)){
			return reqTrxData.getString(reqName);
		}
		return "";
	}
}
