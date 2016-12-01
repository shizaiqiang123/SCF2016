package com.ut.scf.web.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;

import com.comm.pojo.report.IReportResponse;
import com.ut.comm.cache.ICacheClient;
import com.ut.comm.tool.CompressUtil;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.SerializeUtil;
import com.ut.comm.tool.file.FileReaderUtil;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.mule.ESBServerInstence;
import com.ut.scf.mule.IESBServer;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.session.FuncSessionObj;
import com.ut.scf.web.session.PageSessionObj;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.session.UserSessionObj;

public class WebUtils {
	private static int BUFFER_SIZE  = 16*1024;

	public static JSONObject generateDomByRequest(HttpServletRequest request){
		JSONObject reqData  = JsonUtil.createJson(null);
		appendComm(reqData,request);
		appendUser(reqData,request);
		appendFunction(reqData,request);
		appendRequest(reqData,request);
		appendWorkFlow(reqData,request);
		return reqData;
	}
	
	public static JSONObject generateDomBySession(HttpSession session){
		JSONObject reqData  = JsonUtil.createJson(null);
		appendComm(reqData,session);
		appendUser(reqData,session);
		appendFunction(reqData,session);
		appendRequest(reqData,session);
		return reqData;
	}
	
	public static JSONObject generateDom(String reqType){
		JSONObject reqData  = JsonUtil.createJson("request");
		reqData.put("reqType", reqType);
		
		reqData.put("reqId", System.currentTimeMillis());
		
		reqData.put("other", "test");
		
		reqData.put("data", "test");
		return reqData;
	}
	
	private static void appendComm(JSONObject reqDom,HttpServletRequest request){
		JSONObject commRoot = JsonUtil.createJson("comm");
		
		commRoot.put("cnty", "CN");
		
		commRoot.put("bank", "BANK");
		
		commRoot.put("branch", "00001");
		
		commRoot.put("other", "test");
		
		commRoot.put("sysOpDate", DateTimeUtil.getSysDateTime());
		
		commRoot.put("sysOpTime", DateTimeUtil.getSysTime());
		JsonUtil.append(reqDom, commRoot);
	}
	

	private static void appendComm(JSONObject reqDom,HttpSession request){
		JSONObject commRoot = JsonUtil.createJson("comm");
		
		commRoot.put("cnty", "CN");
		
		commRoot.put("bank", "BANK");
		
		commRoot.put("branch", "00001");
		
		commRoot.put("other", "test");
		
		commRoot.put("sysOpDate", DateTimeUtil.getSysDateTime());
		
		commRoot.put("sysOpTime", DateTimeUtil.getSysTime());
		JsonUtil.append(reqDom, commRoot);
	}
	
	private static void appendUser(JSONObject reqDom,HttpServletRequest request){
		HttpSession session = SessionManager.getSession(request);
		appendUser(reqDom,session);
	}
	
	private static void appendUser(JSONObject reqDom,HttpSession session){
		JSONObject userRoot = JsonUtil.createJson("userInfo");
		
		UserSessionObj userSession= SessionManager.getUserInfoFromSession(session);
		if(userSession!=null){
			userRoot.put("sysUserId", userSession.getUserId());
			
			userRoot.put("custId", userSession.getCustId());
			
			userRoot.put("userGrade", userSession.getUserGrade());
			
//			userRoot.put("sysOpId", userSession.getUserId());
			
			userRoot.put("name", userSession.getUserName());
			
			userRoot.put("branch", userSession.getOwnerBrId());
			//机构号sysBUsiUnit
			userRoot.put("sysBusiUnit", userSession.getSysBusiUnit()==null?"":userSession.getSysBusiUnit());
			userRoot.put("datasource", userSession.getDatasource());
			userRoot.put("sysUserTp", userSession.getUserTp());
			userRoot.put("sysUserRef", userSession.getUserRefNo());
			userRoot.put("sysUserRole", userSession.getUserRole());
			userRoot.put("sysCurrentDate", userSession.getSysDate());
			userRoot.put("sysUserOwnerId", userSession.getUserOwnerId());
			userRoot.put("sysOrgId", userSession.getSysOrgId()==null?"":userSession.getSysOrgId());
		}
		userRoot.put("sessId",session.getId());
		
		JsonUtil.append(reqDom, userRoot);
	}
	
	private static void appendFunction(JSONObject reqDom,HttpServletRequest request){
		appendFunction(reqDom,SessionManager.getSession(request));
	}
	
	private static void appendFunction(JSONObject reqDom,HttpSession request){
		JSONObject funcRoot = JsonUtil.createJson("funcInfo");
		FuncSessionObj funcObj = SessionManager.getFuncInfoFromSession(request);
		if(funcObj!=null){
			funcRoot.put("sysFuncId", SessionManager.getFunctionIdFromSession(request));
			funcRoot.put("name", funcObj.getSysFuncName());
			funcRoot.put("funcType", funcObj.getFuncType());
			funcRoot.put("module", funcObj.getModule());
			funcRoot.put("sysEventTimes", funcObj.getSysEventTimes());
			funcRoot.put("sysOrgnFuncId", funcObj.getSysOrgnFuncId());
			funcRoot.put("sysRefNo", funcObj.getSysRefNo());
			
			PageSessionObj pageSession = SessionManager.getPageInfoFromSession(request);
			if(pageSession!=null){
				funcRoot.put("sysPageIndex", pageSession.getIndex());
				funcRoot.put("sysTotalPage", pageSession.getTotal());
				funcRoot.put("sysTrxTotalPage",pageSession.getSysTrxTotalPage());
				funcRoot.put("sysTrxPageIndex",pageSession.getSysTrxPageIndex());
			}
		}
		JsonUtil.append(reqDom, funcRoot);
	}
	
	private static void appendRequest(JSONObject reqDom,HttpServletRequest request){
		JSONObject trxRoot = JsonUtil.createJson("trxDom");
		appendTrxRequest(trxRoot,request);
		
		if(trxRoot.containsKey("workflowInfo")){
			String workflowData = trxRoot.getString("workflowInfo");
			JSONObject workflowJson =JsonUtil.getJsonObj(workflowData);
			
			reqDom.put("workflowInfo", workflowJson);
			trxRoot.remove("workflowInfo");

			SessionManager.setWorkFlowToSession(request, workflowJson.toString());
//			JSONObject trxData = JsonUtil.clone(workflowJson);
//			trxData.remove("sysFuncId");
//			SessionManager.setTrxDataToSession(request, trxData);
		}
		
		
		JsonUtil.append(reqDom, trxRoot);
	}
	
	private static void appendWorkFlow(JSONObject reqDom,HttpServletRequest request){
		if(reqDom.containsKey("workflowInfo")){
		}else{
			Object sessionWorkflow = SessionManager.getWorkFlowFromSession(request);
			if(sessionWorkflow!=null){
				reqDom.put("workflowInfo",JsonUtil.getJsonObj(sessionWorkflow.toString()));
			}
		}
	}
	
	private static void appendTrxRequest(JSONObject reqDom,HttpServletRequest request){
		JSONObject reqJson = getRequestParam(request);
		
		if(!reqJson.containsKey("byFunc")||!"N".equalsIgnoreCase(reqJson.getString("byFunc"))){
			Object trxData = SessionManager.getTrxDataFromSession(request);
			if(trxData!=null)
				reqDom.putAll((Map) trxData);
		}

		reqDom.putAll(reqJson);
	}
	
	public static JSONObject getRequestParam(HttpServletRequest request){
		JSONObject reqData  = JsonUtil.createJson(null);
		Enumeration<?> paramNames = request.getParameterNames();
		while (paramNames != null && paramNames.hasMoreElements()) {
			String paramName = (String) paramNames.nextElement();
			String value = request.getParameter(paramName);
			if("_d".equalsIgnoreCase(paramName)){
				try {
//					String jsonValue = EncryptUtil.decryptString(value);
//					JSONObject jsonObj = JsonUtil.getJsonObj(jsonValue);
					JSONObject jsonObj = JsonUtil.getJsonObj(value);

					if (null!=jsonObj&&!jsonObj.isEmpty()) {
						Iterator it = jsonObj.keys();
						while (it.hasNext()) {
							String key = it.next().toString();
							reqData.put(key, jsonObj.get(key));
						}
					}

				} catch(Exception e){
					e.printStackTrace();
				}
				
			}else{
				reqData.put(paramName, value);
			}
		}
		
		StringBuffer buff = request.getRequestURL();

		String referer = request.getHeader("referer");
		if(StringUtil.isTrimNotEmpty(referer)&&referer.contains("_entry=1")&&buff.toString().contains("query")){
			try {
				String paras = URLDecoder.decode(referer,"UTF-8");
				Map<String, Object> paraMap= parseUrl(paras);
				reqData.putAll(paraMap);
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		return reqData;
	}
	
	private static Map<String, Object> parseUrl(String urlParas) {

		Map<String, Object> mapRequest = new HashMap<String, Object>();
		if (StringUtil.isTrimEmpty(urlParas))
			return mapRequest;
		
		if(urlParas.indexOf("?")>0){
			urlParas = urlParas.substring(urlParas.indexOf("?")+1);
		}

		String[] arrSplit = null;

		arrSplit = urlParas.split("[&]");
		for (String strSplit : arrSplit) {
			String[] arrSplitEqual = null;
			arrSplitEqual = strSplit.split("[=]");

			// 解析出键值
			if (arrSplitEqual.length > 1) {
				// 正确解析
				if(StringUtil.isTrimNotEmpty(arrSplitEqual[0])){
					mapRequest.put(arrSplitEqual[0].trim(), arrSplitEqual[1]);
				}

			} else {
				if(StringUtil.isTrimNotEmpty(arrSplitEqual[0]))
					mapRequest.put(arrSplitEqual[0], "");
			}
		}
		return mapRequest;
	}
	
	private static void appendRequest(JSONObject reqDom,HttpSession request){
		JSONObject trxRoot = JsonUtil.createJson("trxDom");
		try {
			Object trxData = SessionManager.getTrxDataFromSession(request);
			if(trxData!=null){
				trxRoot.putAll((Map) trxData);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		FuncSessionObj funcObj = SessionManager.getFuncInfoFromSession(request);
		if(funcObj!=null){
			trxRoot.put("sysEventTimes", funcObj.getSysEventTimes());
			trxRoot.put("sysOrgnFuncId", funcObj.getSysOrgnFuncId());
			trxRoot.put("sysRefNo", funcObj.getSysRefNo());
		}
		JsonUtil.append(reqDom, trxRoot);
	}
	
	public static JSONObject generateAllTrxData(HttpServletRequest request){
		
//		ApplicationContext context = WebUtils.getApplicationContext(request.getServletContext());
//		SessionManager sessionManager = (SessionManager) context.getBean("sessionManager");
		
		JSONObject reqData  = JsonUtil.createJson(null);
		appendComm(reqData,request);
		appendUser(reqData,request);
		appendFunction(reqData,request);
		appendWorkFlow(reqData,request);
		
		JSONObject trxRoot = JsonUtil.createJson("trxDom");
		
		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
		int totalTrxPage = pageObj.getSysTrxTotalPage();
		String preFix = generateRequestKey(SessionManager.getSessionId(request));
		FuncSessionObj funcObj =SessionManager.getFuncInfoFromSession(request);
		String strFuncId =funcObj==null?"F":funcObj.getSysFuncId();
//		ICache cache = WebCacheManager.getDefaultCache();
		if(totalTrxPage==1){
			appendTrxRequest(trxRoot,request);
		}else{
			//page index 
			for (int i = 0; i < totalTrxPage; i++) {
				String key = generateRequestKey(preFix,strFuncId,i+"");
//				ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
				ICacheClient sessionClient = WebCacheManager.getCache();

//				Object cacheObj = cache.get(key);
				String cachKey = WebCacheManager.getCacheKey(SessionManager.getSessionId(request), key);
				Object nameKeyObj = sessionClient.getData(cachKey);
				if(nameKeyObj!=null){
					String nameKey =nameKeyObj.toString();
//					cacheObj = cache.get(nameKey);
					String strCacheObj = sessionClient.getData(nameKey).toString();
					JSONObject cacheObj = null;
					try {
						cacheObj = JsonUtil.getJsonObj(strCacheObj);
					} catch (Exception e) {
						e.printStackTrace();
					}
					if(cacheObj!=null){
//						String strDoName = nameKey.substring(nameKey.lastIndexOf("_")+1);
//						if(StringUtil.isNull(strDoName)){
//							trxRoot.putAll((JSONObject) cacheObj);
////							JsonUtil.append(trxRoot,(JSONObject) cacheObj);
//						}else{
////							JSONObject pageRoot = JsonUtil.createJson(strDoName);
////							JSONObject cacheData = (JSONObject) cacheObj;
////							cacheData.remove("_json_name");
////							pageRoot.putAll((JSONObject) cacheObj);
////							JsonUtil.append(trxRoot, pageRoot);
//							trxRoot.putAll((JSONObject) cacheObj);
//						}
						trxRoot.putAll(cacheObj);
					}
				}
					
				
			}
		}
		
		JsonUtil.append(reqData, trxRoot);
		return reqData;
	}
	
	public static String generatePageNameKey(HttpServletRequest request){
//		ApplicationContext context = WebUtils.getApplicationContext(request.getServletContext());
//		SessionManager sessionManager = (SessionManager) context.getBean("sessionManager");
		
		String preFix = generateRequestKey(SessionManager.getSessionId(request));
		FuncSessionObj funcObj =SessionManager.getFuncInfoFromSession(request);
		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
		String strFuncId =funcObj==null?"F":funcObj.getSysFuncId();
//		int strPageIndex = pageObj==null?-1:pageObj.getSysTrxPageIndex();
		String strDoName = pageObj==null?"":pageObj.getDoname();

		return generateRequestKey(preFix,strFuncId,strDoName);
	}
	
	public static String generatePageIdKey(HttpServletRequest request){
//		ApplicationContext context = WebUtils.getApplicationContext(request.getServletContext());
//		SessionManager sessionManager = (SessionManager) context.getBean("sessionManager");
		
		String preFix = generateRequestKey(SessionManager.getSessionId(request));
		FuncSessionObj funcObj =SessionManager.getFuncInfoFromSession(request);
		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
		if(pageObj==null||!pageObj.isTransaction()){
			return "";
		}
		String strFuncId =funcObj==null?"F":funcObj.getSysFuncId();
		int strPageIndex = pageObj==null?-1:pageObj.getSysTrxPageIndex();

		return generateRequestKey(preFix,strFuncId,strPageIndex+"");
	}
	
	public static void savePageTrxData(HttpServletRequest request,JSONObject trxObject){
		String strKey = generatePageIdKey(request);
		if(StringUtil.isTrimEmpty(strKey))
			return;
		String nameKey = generatePageNameKey(request);
//		ICache cache = WebCacheManager.getDefaultCache();
//		ApplicationContext context = WebUtils.getApplicationContext(request.getServletContext());
//		ICacheClient sessionClient = (ICacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();
		String cachKey = WebCacheManager.getCacheKey(request.getSession().getId(), nameKey);
		if(sessionClient.getData(cachKey)!=null){
			String strOrgnData = sessionClient.getData(cachKey).toString();
//			JSONObject orgnData = (JSONObject) sessionClient.getData(cachKey);
			JSONObject orgnData = JsonUtil.getJsonObj(strOrgnData);
//			JsonUtil.append(orgnData, trxObject);
			orgnData.putAll(trxObject);
//			sessionClient.createData(cachKey, orgnData);
			try {
				sessionClient.createData(cachKey, JsonUtil.getJSONString(orgnData));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else{
//			sessionClient.createData(cachKey, trxObject);
			try {
				sessionClient.createData(cachKey, JsonUtil.getJSONString(trxObject));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		try {
			sessionClient.createData(WebCacheManager.getCacheKey(request.getSession().getId(), strKey), cachKey);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static String generateRequestKey(String ...strings ){
		StringBuffer buffKey = new StringBuffer();
		for (String string : strings) {
			buffKey.append(string).append("_");
		}
		if(buffKey.length()>0)
			buffKey.deleteCharAt(buffKey.length()-1);
		return buffKey.toString();
	}
		
	/**
	 * 锟斤拷取源锟侥硷拷锟斤拷锟斤拷	
	 * @param src   锟侥硷拷
	 * @return  byte[]  锟侥硷拷锟斤拷锟斤拷
	 * @throws IOException
	 * @see [锟洁、锟斤拷#锟斤拷锟斤拷锟斤拷锟斤拷#锟斤拷员]
	 */	
	public static byte[] readFile(File src) throws Exception{
		byte[] bytes = null;
		BufferedInputStream in=null;
		try {
			long len = src.length();
			bytes = new byte[(int)len];
			in= new BufferedInputStream(new FileInputStream(src));
			int r = in.read(bytes);
			if(r!=len){
				throw new IOException("锟斤拷取锟侥硷拷锟斤拷锟斤拷确锟斤拷"); 
			}
			in.close();
		}
		catch (Exception e) {
			e.printStackTrace();
		}finally{
			if (null != in) {
				in.close();
			}
		}
		return bytes;
	}
		
	/**
	 * 锟侥硷拷copy
	 * @param src	锟斤拷锟斤拷锟侥硷拷
	 * @param dst	锟斤拷锟斤拷募锟�
	 * @see [锟洁、锟斤拷#锟斤拷锟斤拷锟斤拷锟斤拷#锟斤拷员]
	 */
	public static void copyFile(File src, File dst) {
		try {
			InputStream in = null;
			OutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(src), BUFFER_SIZE);
				out = new BufferedOutputStream(new FileOutputStream(dst), BUFFER_SIZE);
				byte[] buffer = new byte[BUFFER_SIZE];
				while (in.read(buffer) > 0) {
					out.write(buffer);
				}
			}
			finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public static Object callApplication(Object message){
		IESBServer server = ESBServerInstence.getESBServer();
		Object response = server.connect().sendMessage(message);
		return response;
	}
	
	public static ApplicationContext getApplicationContext(ServletContext servletContext){
		final ApplicationContext parentContext = (ApplicationContext) servletContext.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		return parentContext;
	}
	
	public static Object sendGetWebRequest(String url, Object param) {
		BufferedReader in = null;
		try {
			String urlNameString = url;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = null;
			connection = realUrl.openConnection();
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent",
					"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

//			IReportParameter paramenter = (IReportParameter) JsonUtil.getDTO(param, ReportParameter.class);

			connection.setDoOutput(true);
			OutputStream outstr = connection.getOutputStream();
			byte[] data = SerializeUtil.serialize(param);
			CompressUtil.compress(data, outstr);

			// 获取所有响应头字段
			Map<String, List<String>> map = connection.getHeaderFields();
			// 遍历所有的响应头字段
			for (String key : map.keySet()) {
				System.out.println(key + "--->" + map.get(key));
			}
			// 定义 BufferedReader输入流来读取URL的响应
			byte[] responseByte = FileReaderUtil.getByteFromRequest(connection.getInputStream());
			responseByte = CompressUtil.decompress(responseByte);
			Object obj = SerializeUtil.unSerialize(responseByte);
			
			return obj;
		} catch (Exception e) {
			System.out.println("发送GET请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return null;
	}
	
	public static void showReport(String reportType,IReportResponse rptResponse,HttpServletResponse response) throws Exception{
		String documentType = null;
		if (reportType.endsWith("pdf")) {
			response.setContentType("application/pdf");
			documentType = "pdf";
		}
		else if (reportType.endsWith("xls")) {
			response.setContentType("application/vnd.ms-excel");
			documentType = "xls";
		}
		else if (reportType.endsWith("doc")) {
			response.setContentType("application/msword"); // vnd.ms-powerpoint
			documentType = "doc";
		}
		else if (reportType.endsWith("ppt")) {
			response.setContentType("application/vnd.ms-powerpoint"); //
			documentType = "ppt";
		}
		else {
			response.setContentType("html/text");
			documentType = "html";
		}
		response.setHeader("Content-Disposition", "inline; filename=Advice." + documentType);
		String fileContent = rptResponse.getFileContent();
		byte[] data = SerializeUtil.convertString2Byte(fileContent);
		response.getOutputStream().write(data);
	}
	
	public static void showViewFile(String reportType,Object fileContent,HttpServletResponse response) throws Exception{
		String documentType = null;
		if (reportType.endsWith("pdf")) {
			response.setContentType("application/pdf;charset=UTF-8");
			documentType = "pdf";
		}
		else if (reportType.endsWith("xls")) {
			response.setContentType("application/vnd.ms-excel;charset=UTF-8");
			documentType = "xls";
		}
		else if (reportType.endsWith("doc")) {
			response.setContentType("application/msword;charset=UTF-8"); // vnd.ms-powerpoint
			documentType = "doc";
		}
		else if (reportType.endsWith("ppt")) {
			response.setContentType("application/vnd.ms-powerpoint;charset=UTF-8"); //
			documentType = "ppt";
		} else if (reportType.endsWith("xml")) {
			documentType = "xml";
			response.setContentType("text/xml");
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Pragma", "No-cache");
			response.setDateHeader("Expires", 1);
		}
		else {
			response.setContentType("html/text;charset=UTF-8");
			documentType = "html";
		}
		response.setHeader("Content-Disposition", "inline; filename=Advice." + documentType);
		
		byte[] file = SerializeUtil.convertString2Byte(fileContent.toString());
		
		response.getOutputStream().write(file);
	}
	
	private static void getBytesFromFile(String reportFile, ServletOutputStream servletOutputStream)
			throws FileNotFoundException, IOException
	{
		File file = new File(reportFile);
		BufferedInputStream inputStream = null;
		byte[] buffer = new byte[4096];
		try {
			inputStream = new BufferedInputStream(new FileInputStream(file));
			int curLen = inputStream.read(buffer);
			while (curLen > 0) {
				servletOutputStream.write(buffer, 0, curLen);
				servletOutputStream.flush();
				curLen = inputStream.read(buffer);
			}
		} finally {
			inputStream.close();
			inputStream = null;
			file = null;
			buffer = null;
		}
	}
}
