package com.ut.scf.web.actions;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.servlet.AbsServletRequestAware;
import com.ut.scf.web.session.PageSessionObj;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebUtils;

import net.sf.json.JSONObject;

public class WSPageManagerAction extends AbsServletRequestAware{
private static final long serialVersionUID = 1L;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Resource(name="aPQueryProcessor")  
	IAPProcessor process;
	
	private String reqOpType;
	
	protected void beforeAction() {
		reqOpType = getValueFromRequest("reqPageType");
		reqOpType = StringUtil.isTrimNotEmpty(reqOpType)?reqOpType:"next";
		logger.debug("Request page type is:"+reqOpType);
		SessionManager.setSessionAttribute(request, "reqPageType", reqOpType);
		
		String entryType = getValueFromRequest("entryType");
		entryType = StringUtil.isTrimNotEmpty(entryType)?entryType:"normal";
		logger.debug("Request entry type is:"+entryType);
		SessionManager.setSessionAttribute(request, "entryType", entryType);
		
		if(reqOpType.equalsIgnoreCase("initlize")){
			String sessionFunctionId = getValueFromRequest("sysFuncId");
			SessionManager.clearFunctionSession(request);
			SessionManager.setPageIndexToSession(request, -1);
			SessionManager.setFunctionIdToSession(request, sessionFunctionId);
			dataDom = WebUtils.generateDomByRequest(request);//更新function info 节点值
		}else{
			
		}
	}

	@Override
	protected String executeAction() {
		PageSessionObj pageSession = SessionManager.getPageInfoFromSession(request);
		if(pageSession!=null){
			int currentPage = pageSession.getIndex();
			int totalPage = pageSession.getTotal();
			
			if(reqOpType.equalsIgnoreCase("pre")){
				if(currentPage-1<0){
					super.dataMap.clear();
					super.dataMap.put("success", false);
					super.dataMap.put("message", "当前页面为首页，请退出当前功能。");
					return SUCCESS;
				}
					
			}else if(reqOpType.equalsIgnoreCase("next")){
				if(currentPage+1<totalPage){
					
					super.dataMap.put("success", false);
					super.dataMap.put("message", "当前页面为末页，请退出当前功能。");
					return SUCCESS;
				}
			}else if(reqOpType.equalsIgnoreCase("preCancel")){
				super.dataMap.clear();
				String pageType = pageSession.getPageType();
				if(pageSession.isTransaction()&&!"View".equalsIgnoreCase(pageType)){
					super.dataMap.put("message", "当前页面有未保存信息，请确认退出当前功能?");
				}else if("RS".equalsIgnoreCase(pageType)){
					super.dataMap.put("message", "当前页面有未保存信息，请确认退出当前功能?");
				}else{
					
				}
				super.dataMap.put("success", true);
				return SUCCESS;
			}else if(reqOpType.equalsIgnoreCase("entry")){
				JSONObject trxJson = JsonHelper.getTrxObject(dataDom);
				SessionManager.setTrxDataToSession(request, JsonUtil.getJSONString(trxJson));
			}
			
		}else if(!reqOpType.equalsIgnoreCase("initlize")){
			super.dataMap.clear();
			super.dataMap.put("success", true);
			return SUCCESS;
		}
		
		String sessKey = generateRequestKey();
		if(StringUtil.isTrimNotEmpty(sessKey)){
//			ICache cache = WebCacheManager.getDefaultCache();
			String cachKey = WebCacheManager.getCacheKey(SessionManager.getSessionId(request), sessKey);
			if(webCache.getData(cachKey)!=null){
//				super.dataMap = (Map<String, Object>) cache.get(sessKey);
				processResult = webCache.getData(cachKey);
				super.dataMap = super.getRetMap(processResult);
				logger.info("get page 查询结果 from cache key:"+sessKey);
				cacheData = true;
				return SUCCESS;
			}
		}
		
		JsonUtil.getChildJson(dataDom, "trxDom").put("reqType", "WebPageManager");
			
		processResult = process.run(dataDom.toString());
		super.dataMap = super.getRetMap(processResult);
		JsonUtil.getChildJson(dataDom, "trxDom").remove("reqType");
		return SUCCESS;
	}
	
	protected void afterAction() {
		if(!cacheData&&!reqOpType.equalsIgnoreCase("initlize")){
			String sessKey = generateRequestKey();
			String cachKey = WebCacheManager.getCacheKey(SessionManager.getSessionId(request), sessKey);
			if(StringUtil.isTrimNotEmpty(sessKey)&&null!=processResult){
//				ICache cache = WebCacheManager.getDefaultCache();
//				cache.put(sessKey, super.dataMap);
				try {
					webCache.createData(cachKey, processResult);
					logger.info("put page 查询结果 into cache key:"+sessKey);
				} catch (Exception e) {
					logger.error("put page 查询结果 into cache key error:"+sessKey);
				}
			}
		}
		if("continue".equalsIgnoreCase(reqOpType)||reqOpType.equalsIgnoreCase("initlize")){
			String strFuncId = SessionManager.getFunctionIdFromSession(request);
			WebCacheManager.chearFunctionCache(request, strFuncId);
		}
	}

	@Override
	protected String getReqType() {
		return "Page Manager";
	}
	
//	@Override
//	public String generateRequestKey(){
//		String preFix = super.generateRequestKey();
//		FuncSessionObj funcObj =SessionManager.getFuncInfoFromSession(request);
//		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
//		String strFuncId =SessionManager.getFunctionIdFromSession(request);
//		int strPageIndex = pageObj == null?-1:pageObj.getIndex();
//		
//		return generateRequestKey(preFix,strFuncId,strPageIndex+"",reqOpType);
//	}
}
