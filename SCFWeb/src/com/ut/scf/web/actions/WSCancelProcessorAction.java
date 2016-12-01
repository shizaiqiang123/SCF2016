package com.ut.scf.web.actions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

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

public class WSCancelProcessorAction extends AbsServletRequestAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	//ap server side processor
	@Resource(name="cancelProcessor")  
	IAPProcessor process;
	
	@Resource(name="aPQueryProcessor")  
	IAPProcessor pageProcess;
	
	@Override
	protected String executeAction() throws Exception {
		Object step = getValueFromRequest("reqPageType");
		String strStep = step==null?"":step.toString();
		SessionManager.setSessionAttribute(request, "reqPageType", strStep);
		if(!"pre".equalsIgnoreCase(strStep)){
			//兼容IE9 监听onunload事件 bug
			JSONObject funcInfo = JsonHelper.getFuncObject(dataDom);
			//cancel all
			if(!funcInfo .containsKey("sysPageIndex")){
				SessionManager.clearFunctionSession(request);
				return SUCCESS;
			}
			processResult = process.run(dataDom.toString());
			super.dataMap = super.getRetMap(processResult);
		}else{
			//cancel one step
			PageSessionObj page = SessionManager.getPageInfoFromSession(request);
			if(page.isTransaction()&&page.getSysTrxPageIndex()==0){
				JSONObject funcInfo = JsonHelper.getFuncObject(dataDom);
				//cancel all
				if(!funcInfo .containsKey("sysPageIndex")){
					SessionManager.clearFunctionSession(request);
					return SUCCESS;
				}
				process.run(dataDom.toString());
				
				SessionManager.setTrxDataToSession(request, null);
				String strFuncId = SessionManager.getFunctionIdFromSession(request);
				WebCacheManager.chearFunctionCache(request, strFuncId );
			}else{
				String hasError = getTrxResult();
				if(StringUtil.isTrimNotEmpty(hasError)){
					//有错误的页面上一步不缓存
				}else{
					JSONObject trxObj = JsonHelper.getTrxObject(dataDom);
					JSONObject trxClone = JsonUtil.clone(trxObj);
					trxClone.remove("reqPageType");
					SessionManager.setTrxDataToSession(request, trxClone);
					String sessionKey = WebUtils.generatePageIdKey(request);
					List<String> keyList = SessionManager.getQueryKeys(request,sessionKey);
					for(String sessKey:keyList){
						if(StringUtil.isTrimNotEmpty(sessKey)){
//							ICache cache = WebCacheManager.getDefaultCache();
							Map cacheMap = new HashMap();
							cacheMap.put("success", true);
							cacheMap.put("obj", trxObj);
							cacheMap.put("message", "");
//							cache.put(sessKey, cacheMap);
							webCache.createData(sessKey, cacheMap);
							logger.info("put cancel 结果 into cache key:"+sessKey);
						}
					}
				}
			}
			//本页面缓存了数据，仍需要跳转到上一个页面继续执行
			//本页面提交的数据，需要保存到上一个页面
			JsonUtil.getChildJson(dataDom, "trxDom").put("reqType", "WebPageManager");
//			JsonUtil.getChildJson(dataDom, "trxDom").put("reqPageType", "pre");
			processResult = pageProcess.run(dataDom.toString());
			super.dataMap = super.getRetMap(processResult);
			JsonUtil.getChildJson(dataDom, "trxDom").remove("reqType");
//			JsonUtil.getChildJson(dataDom, "trxDom").remove("reqPageType");
			return SUCCESS;
		}
		return SUCCESS;
	}
	
	protected void afterAction() {
		Object step = getValueFromRequest("reqPageType");
		String strStep = step==null?"":step.toString();
		if(!"pre".equalsIgnoreCase(strStep)){
			//兼容IE9 监听onunload事件 bug
			JSONObject funcInfo = JsonHelper.getFuncObject(dataDom);
			if(!funcInfo .containsKey("sysPageIndex")){
				SessionManager.clearFunctionSession(request);
				SessionManager.setPageIndexToSession(request, -1);
				processResult = null;
				super.dataMap =  new HashMap<String,Object>();
				return ;
			}
			String strFuncId = funcInfo.getString("sysFuncId");
			SessionManager.clearFunctionSession(request);
			SessionManager.setPageIndexToSession(request, -1);
			
			WebCacheManager.chearFunctionCache(request, strFuncId);
			processResult = null;
			super.dataMap = new HashMap<String,Object>();
		}else{
			
		}
		JsonUtil.getChildJson(dataDom, "trxDom").remove("reqPageType");
	}

	@Override
	protected String getReqType() {
		return "Cancel";
	}
	@Override
	protected boolean checkTimeout(){
		boolean timeout = super.checkTimeout();
		if(timeout){
			dataMap.put("success", true);
			dataMap.put("message", "");
			dataMap.put("level", -1);
		}
		return timeout;
	}
}
