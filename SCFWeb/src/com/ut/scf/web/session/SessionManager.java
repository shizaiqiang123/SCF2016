package com.ut.scf.web.session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.comm.pojo.FunctionInfo;
import com.comm.pojo.PageInfo;
import com.ut.comm.cache.ICacheClient;
import com.ut.comm.log.LoggerFormator;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.utils.WebLogUtil;

public class SessionManager {
	private static Logger logger = WebLogUtil.getWebInfoLogger();
	
//	public void init(HttpServletRequest request) throws Exception {
//		String reqType = request.getParameter("reqType");
//		String sessionFunctionId = getFunctionIdFromSession(request);
//		String strType = String.valueOf(reqType);
//		setFunctionIdToSession(request, sessionFunctionId);
//	}
	
	/**
	 * @see 进入function时，加载当前function属性进session
	 * @param request
	 * @throws Exception
	 */
//	public static void initFunction(HttpServletRequest request) throws Exception {
//	}
	
	public static void updateFunction(HttpServletRequest request,Map dataMap) throws Exception {
		Object dataObj = dataMap.get("pageInfo");
		if (dataObj!=null) {
			PageInfo p = (PageInfo) dataObj;
			PageSessionObj obj = new PageSessionObj();
			BeanUtils.copy(p, obj);
			SessionManager.setPageInfoToSession(request, obj);
		}
		
		Object funcObj = dataMap.get("funcObj");
		if (funcObj!=null&&(FunctionInfo.class.isAssignableFrom(funcObj.getClass()))) {
			FunctionInfo p = (FunctionInfo) funcObj;
			FuncSessionObj obj = new FuncSessionObj();
			BeanUtils.copy(p, obj);
			SessionManager.setFuncInfoToSession(request, obj);
		}
	}
	
	/**
	 * @see User Login时，加载用户信息进session
	 * @param request
	 * @throws Exception
	 */
//	public static void initUser(HttpServletRequest request) throws Exception {
//	}
	
	/**
	 * @see 启动服务时，加载环境变量进session
	 * @param request
	 * @throws Exception
	 */
//	public static void initComm(HttpServletRequest request) throws Exception {
//		
//	}
	
	public static String getSessionId(HttpServletRequest request) {
		HttpSession session = getSession(request);

		return session.getId();
	}
	
			
	public static HttpSession getSession(HttpServletRequest request) {
		HttpSession session = request.getSession(false);

		if (session == null)
			session = request.getSession(true);
		return session;
	}

	public static Object getSessionAttribute(HttpServletRequest request, String objName) {
		HttpSession session = request.getSession(false);

		if (session == null)
			session = request.getSession(true);
		String sessionId = session.getId();
		
//		ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();

		return sessionClient.getData(SessionManager.getSessionKey(sessionId, objName));
	}
	
//	@Resource(name = "webCacheClient")
//	ICacheClient sessionClient;
	
//	public Object getSessionAttribute(HttpServletRequest request,String objName) {
//		
//		return sessionClient.getData(objName);
//		
//	}

	public static Object getSessionAttribute(HttpSession hs, String objName) {
		String sessionId = hs.getId();
		
//		ApplicationContext context = WebUtils.getApplicationContext(hs.getServletContext());
//		ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();

//		return getSessionAttribute(request,sessionId);
		return sessionClient.getData(SessionManager.getSessionKey(sessionId, objName));
	}

	public static void setSessionAttribute(HttpServletRequest request,
			String objName, Object obj) {

		HttpSession session = request.getSession(false);
		if (session == null)
			session = request.getSession(true);

		String sessionId = session.getId();

//		ApplicationContext context = WebUtils.getApplicationContext(request
//				.getServletContext());
//		ICacheClient sessionClient = (ICacheClient) context
//				.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();

		try {
			sessionClient.createData(SessionManager.getSessionKey(sessionId, objName), obj);
			session.setAttribute(objName, obj);
			LoggerFormator.debug(logger, sessionId,":session create:",objName);
		} catch (Exception e) {
			session.invalidate();
		}
	}
	
	public static boolean containsAttribute(HttpServletRequest request, String objName){
		HttpSession session = request.getSession(false);
		if (session == null)
			session = request.getSession(true);
		return containsAttribute(session,objName);
	}
	
	public static boolean containsAttribute(HttpSession session, String objName){
//		ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();
		String strSessionKey = SessionManager.getSessionKey(session.getId(), objName);
		
		return sessionClient.existData(strSessionKey);
	}

	public static void setSessionAttribute(HttpSession hs, String objName,
			Object obj) {
		hs.setAttribute(objName, obj);
	}
	
	public static void clearFunctionSession(HttpServletRequest request){
		HttpSession session = getSession(request);
		String sessionId = session.getId();
		session.removeAttribute("sysFuncInfo");
		session.removeAttribute("sysFuncId");
		session.removeAttribute("sysPageIndex");
		session.removeAttribute("sysPageInfo");
		session.removeAttribute("sysPageTotal");
		session.removeAttribute("trxData");
		session.removeAttribute("sysQueryKey");
		session.removeAttribute("reqPageType");
		session.removeAttribute("trxResult");
		session.removeAttribute("trxMessage");
		session.removeAttribute("workflowInfo");
		
//		ApplicationContext context = WebUtils.getApplicationContext(request.getServletContext());
//		ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "sysFuncInfo"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "sysFuncId"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "sysPageIndex"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "sysPageInfo"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "sysPageTotal"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "trxData"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "sysQueryKey"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "reqPageType"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "trxResult"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "trxMessage"));
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(sessionId, "workflow"));
	}
	
	public static String getFunctionIdFromSession(HttpServletRequest request){
		return getFunctionIdFromSession(getSession(request));
	}
	public static String getFunctionIdFromSession(HttpSession request){
		Object funcId = getSessionAttribute(request, "sysFuncId");
		if(funcId==null)
			return "";
		return (String) funcId;
	}
	
	public static void setFunctionIdToSession(HttpServletRequest request,String sysFuncId){
		setSessionAttribute(request, "sysFuncId", sysFuncId);
	}
	
	public static int getPageIndexFromSession(HttpServletRequest request){
		return getPageIndexFromSession(getSession(request));
	}
	
	public static int getPageIndexFromSession(HttpSession request){
		Object pageObj = getSessionAttribute(request, "sysPageIndex");
		if(pageObj==null)
			return -1;
		return (int) pageObj;
	}
	
	public static void setPageIndexToSession(HttpServletRequest request,int pageIndex){
		setSessionAttribute(request, "sysPageIndex", pageIndex);
	}
	
	public static PageSessionObj getPageInfoFromSession(HttpServletRequest request){
		HttpSession session = getSession(request);
		return (PageSessionObj) getPageInfoFromSession(session);
	}
	
	public static PageSessionObj getPageInfoFromSession(HttpSession request){
		Object pageObj = getSessionAttribute(request, "sysPageInfo");
		if(pageObj==null)
			return null;
		return (PageSessionObj) pageObj;
	}
	
	public static void setPageInfoToSession(HttpServletRequest request,PageSessionObj pageInfo){
		setPageIndexToSession(request, pageInfo.getIndex());
		setSessionAttribute(request, "sysPageInfo", pageInfo);
		setSessionAttribute(request, "sysPageTotal", pageInfo.getTotal());
	}
	
	public static FuncSessionObj getFuncInfoFromSession(HttpServletRequest request){
		Object funcInfo = getSessionAttribute(request, "sysFuncInfo");
		if(funcInfo==null)
			return null;
		return (FuncSessionObj) funcInfo;
	}
	
	public static FuncSessionObj getFuncInfoFromSession(HttpSession session){
		Object funcInfo = getSessionAttribute(session, "sysFuncInfo");
		if(funcInfo==null)
			return null;
		return (FuncSessionObj) funcInfo;
	}
	
	public static void setFuncInfoToSession(HttpServletRequest request,FuncSessionObj funcInfo){
		setFunctionIdToSession(request, funcInfo.getSysFuncId());
		setSessionAttribute(request, "sysFuncInfo", funcInfo);
	}
	public static Object getTrxDataFromSession(HttpServletRequest request){
		Object strTrxData = getSessionAttribute(request, "trxData");
		return JsonUtil.getJSON(strTrxData);
	}
	public static Object getTrxDataFromSession(HttpSession request){
		Object strTrxData = getSessionAttribute(request, "trxData");
		return JsonUtil.getJSON(strTrxData);
	}
	
	public static void setTrxDataToSession(HttpServletRequest request,Object dataMap){
		if(dataMap==null)
			return;
		Map data = null;
		if (Map.class.isAssignableFrom(dataMap.getClass())) {
			data = (Map) dataMap;
		}else if (String.class.isAssignableFrom(dataMap.getClass())){
			setSessionAttribute(request, "trxData",dataMap);
			return ;
		}else{
			data = BeanUtils.toMap(dataMap);
		}
		setTrxDataToSession(request, data);
	}
	
	public static Object getWorkFlowFromSession(HttpSession request){
		return getSessionAttribute(request, "workflowInfo");
	}
	
	public static Object getWorkFlowFromSession(HttpServletRequest request){
		return getSessionAttribute(request, "workflowInfo");
	}
	
	public static void setWorkFlowToSession(HttpSession request,Object dataMap){
		setSessionAttribute(request, "workflowInfo", dataMap);
	}
	
	public static void setWorkFlowToSession(HttpServletRequest request,Object dataMap){
		setSessionAttribute(request, "workflowInfo", dataMap);
	}
	
	public static void setTrxDataToSession(HttpServletRequest request, Map dataMap) {
		setSessionAttribute(request, "trxData",JsonUtil.getJSONString(dataMap));
	}
	
	public static void setCurrentOption(HttpServletRequest request,String strOp){
		setSessionAttribute(request, "option", strOp);
	}
	
	public static String getPreOption(HttpServletRequest request){
		Object preOption =  getSessionAttribute(request, "option");
		if(preOption==null)
			return "";
		return preOption.toString().trim();
	}
	
	public static void setUserInfoToSession(HttpServletRequest request,UserSessionObj userInfo){
		setSessionAttribute(request, "sysUserInfo", userInfo);
	}
	
	public static UserSessionObj getUserInfoFromSession(HttpServletRequest request){
//		Object sess= getSessionAttribute(request, "sysUserInfo");
//		ApplicationContext context = WebUtils.getApplicationContext(request.getServletContext());
//		ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();
		Object sess = sessionClient.getData(getSessionKey(request.getSession().getId(), "sysUserInfo"));
		if(sess == null||StringUtil.isNull(sess.toString()))
			return null;
		return (UserSessionObj) sess;
	}
	
	public static UserSessionObj getUserInfoFromSession(HttpSession request){
//		Object sess= getSessionAttribute(request, "sysUserInfo");
//		ApplicationContext context = WebUtils.getApplicationContext(request.getServletContext());
//		ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();
		Object sess = sessionClient.getData(getSessionKey(request.getId(), "sysUserInfo"));
		if(sess == null)
			return null;
		return (UserSessionObj) sess;
	}
	
	public static void setQueryKey(HttpServletRequest request, String sessKey, String keyName) {
		List<String> keys = getQueryKeys(request, keyName);
		if (!keys.contains(sessKey)) {
			keys.add(sessKey);
			updateQueryKeys(request,keyName,keys);
		}
	}
	
	public static void updateQueryKeys(HttpServletRequest request, String keyName, List<String> keys) {
		Map<String, List<String>> queryKey = containsAttribute(request, "sysQueryKey") ? (Map<String, List<String>>) getSessionAttribute(
				request, "sysQueryKey") : null;
		if (queryKey == null) {
			queryKey = new HashMap<String, List<String>>();
		}
		queryKey.put(keyName, keys);
		setSessionAttribute(request, "sysQueryKey", queryKey);
	}
	
//	public static String getQueryKey(HttpServletRequest request){
//		Object queryKey = getSessionAttribute(request, "sysQueryKey");
//		if(queryKey==null)
//			return "";
//		return queryKey.toString();
//	}

	public static List<String> getQueryKeys(HttpServletRequest request, String keyName) {
		Map<String, List<String>> queryKey = containsAttribute(request, "sysQueryKey") ? (Map<String, List<String>>) getSessionAttribute(
				request, "sysQueryKey") : null;
		List<String> keys = null;
		if (queryKey == null) {
			queryKey = new HashMap<String, List<String>>();
			keys = new ArrayList<String>();
			queryKey.put(keyName, keys);
			setSessionAttribute(request, "sysQueryKey", queryKey);
		} else {
			keys = queryKey.get(keyName);
			if (keys == null) {
				keys = new ArrayList<String>();
				queryKey.put(keyName, keys);
			}
		}

		return keys;
	}
	
	public static void updataTrxResult(HttpServletRequest request, boolean success,String message){
		if(success){
			setSessionAttribute(request,"trxResult",success);
			setSessionAttribute(request,"trxMessage","");
		}else{
			setSessionAttribute(request,"trxResult",success);
			setSessionAttribute(request,"trxMessage",message);
		}
		
	}
	
	public static String getTrxResult(HttpServletRequest request){
		Object success = getSessionAttribute(request, "trxResult");
		if(success==null){
			return "";
		}else{
			boolean isSuccess = Boolean.parseBoolean(success.toString());
			if(isSuccess){
				return "";
			}else{
				return getSessionAttribute(request, "trxMessage").toString();
			}
		}
	}
	
	public static String getSessionKey(String sessionId ,String keyName){
		StringBuffer buff = new StringBuffer();
		buff.append("/sess");
		if(StringUtil.isTrimNotEmpty(sessionId)){
			buff.append("/").append(sessionId);	
		}
		
		if(StringUtil.isTrimNotEmpty(keyName)){
			buff.append("/").append(keyName);	
		}
		return buff.toString();
	}
}
