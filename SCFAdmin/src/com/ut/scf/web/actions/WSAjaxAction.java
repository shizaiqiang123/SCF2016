package com.ut.scf.web.actions;

import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.cache.ICache;
import com.ut.scf.web.cache.WebCacheConst;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.servlet.AbsServletRequestAware;
import com.ut.scf.web.session.FuncSessionObj;
import com.ut.scf.web.session.PageSessionObj;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebUtils;

public class WSAjaxAction extends AbsServletRequestAware{
private static final long serialVersionUID = 1L;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Resource(name="aPQueryProcessor")  
	IAPProcessor process;
	
	protected void beforeAction() {
		
	}
	
	@Override
	protected String executeAction() {
		String sessKey = generateRequestKey();
		Object cacheType = JsonHelper.getTrxObject(dataDom).get("cacheType");
		if(cacheType!=null&&WebCacheConst.CACHETYPE_APPEND.equalsIgnoreCase(cacheType.toString())){
			logger.debug("Append cache request.");
			String cacheKey = WebUtils.generatePageIdKey(request);
			
			SessionManager.setQueryKey(request, SessionManager.getSessionKey(SessionManager.getSessionId(request), sessKey),
					WebCacheManager.getCacheKey(SessionManager.getSessionId(request), cacheKey));
		}
		if(StringUtil.isTrimNotEmpty(sessKey)){
//			ICache cache = WebCacheManager.getDefaultCache();
			String cachKey = WebCacheManager.getCacheKey(SessionManager.getSessionId(request), sessKey);
			if (webCache.existData(cachKey)) {
				if(cacheType!=null&&WebCacheConst.CACHETYPE_APPEND.equalsIgnoreCase(cacheType.toString())){
//					Map<String, Object> cacheObj = (Map<String, Object>)  webCache.getData(sessKey);
					processResult =  webCache.getData(cachKey);
					Map<String, Object> cacheObj = BeanUtils.toMap(processResult); 
					PageSessionObj pageInfo = SessionManager.getPageInfoFromSession(request);
					if(pageInfo!=null){
						String doName = pageInfo.getDoname();
						cacheObj = (Map<String, Object>) cacheObj.get("obj");
						if(StringUtil.isTrimNotEmpty(doName)&&cacheObj.containsKey(doName)){
							JSONObject doObject = (JSONObject) cacheObj.get(doName);
							super.dataMap.put("success", true);
							int totalRow = doObject.getInt("_total_rows");
							JSONObject[] rows = new JSONObject[totalRow];
							for(int i = 0;i<totalRow;i++){
								rows[i] = doObject.getJSONObject("rows"+i);
							}
							super.dataMap.put("total",totalRow);
							super.dataMap.put("rows", rows);
							super.dataMap.put("success", true);
						}else{
							JSONObject doObject = (JSONObject) cacheObj;
							super.dataMap.put("success", true);
							Object strRow = JsonUtil.getObj(doObject, "_total_rows");
							if(strRow!=null){
								int totalRow = Integer.parseInt(strRow.toString());
								JSONObject[] rows = new JSONObject[totalRow];
								for(int i = 0;i<totalRow;i++){
									rows[i] = (JSONObject) JsonUtil.getObj(doObject,"rows"+i);
								}
								super.dataMap.put("total",totalRow);
								super.dataMap.put("rows", rows);
								super.dataMap.put("success", true);
							}else{
								JSONObject[] rows = new JSONObject[1];
								rows[0] = doObject;
								super.dataMap.put("total",1);
								super.dataMap.put("rows", rows);
								super.dataMap.put("success", true);
							}
							
						}
					}
				}else{
					processResult =  webCache.getData(cachKey);
					super.dataMap = super.getRetMap(processResult);
				}
				super.cacheData = true;
				logger.info("get ajax 结果 from cache key:" + sessKey);
				return SUCCESS;
			}
		}

		JsonUtil.getChildJson(dataDom, "trxDom").put("reqType", "ajax");
		processResult = process.run(dataDom.toString());
		super.dataMap = super.getRetMap(processResult);
		logger.info("ajax查询返回结果：" + dataMap.toString());

		return SUCCESS;
	}
	
	protected void afterAction() {
		if (super.cacheData) {

		} else {
			String sessKey = generateRequestKey();
			String cachKey = WebCacheManager.getCacheKey(SessionManager.getSessionId(request), sessKey);
			if (StringUtil.isTrimNotEmpty(sessKey)) {
//				ICache cache = WebCacheManager.getDefaultCache();
//				cache.put(sessKey, super.dataMap);
				try {
					webCache.createData(cachKey, processResult);
					logger.info("put ajax查询结果 into cache key:" + sessKey);
				} catch (Exception e) {
					logger.info("put ajax查询结果 into cache key error:" + sessKey);
					e.printStackTrace();
				}
			}
		}

	}

	@Override
	protected String getReqType() {
		return "Ajax";
	}
	
	protected void updateFunction() throws Exception{
		// needn't update function information
	}
	
	public String generateRequestKey(){
//		JSONObject trxObject = WebUtils.getRequestParam(request);
//		Object cacheType = trxObject.get("cacheType");
//		if(cacheType!=null&&"non".equalsIgnoreCase(cacheType.toString())){
//			logger.debug("Non cache request.");
//			return "";
//		}
//		
//		String preFix = generateRequestKey(SessionManager.getSessionId(request));
//		FuncSessionObj funcObj =SessionManager.getFuncInfoFromSession(request);
//		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
//		String strFuncId =funcObj==null?"F":funcObj.getSysFuncId();
//		
//		String strReqId = this.request.getParameter("reqid");
//		String strGetDataId = this.request.getParameter("getdataId");
//		String strQueryId = this.request.getParameter("queryId");
		
		JSONObject trxObject = super.reqTrxData;
		Object cacheType = trxObject.get("cacheType");
		if(cacheType!=null&&"non".equalsIgnoreCase(cacheType.toString())){
			logger.debug("Non cache request.");
			return "";
		}
		
		String preFix = generateRequestKey(SessionManager.getSessionId(request));
		FuncSessionObj funcObj =SessionManager.getFuncInfoFromSession(request);
		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
		String strFuncId =funcObj==null?"F":funcObj.getSysFuncId();
		
		String strReqId = getValueFromRequest("reqid");
		String strGetDataId = getValueFromRequest("getdataId");
		String strQueryId = getValueFromRequest("queryId");

		trxObject.remove("_dc");
		trxObject.remove("reqPageType");
		int code = trxObject.hashCode();
		
		
		if(cacheType!=null&&cacheType.toString().equalsIgnoreCase("comm")){
			return generateRequestKey(code+"",strReqId,strGetDataId,strQueryId);
		}

		return generateRequestKey(preFix,strFuncId,code+"",strReqId,strGetDataId,strQueryId);
	}
}
