package com.ut.scf.web.actions;


import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.servlet.AbsServletRequestAware;
import com.ut.scf.web.session.PageSessionObj;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebUtils;

public class WSSubmitProcessorAction extends AbsServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Resource(name="aPSubmitProcessor")  
	IAPProcessor process;
	
	@Resource(name="aPQueryProcessor")  
	IAPProcessor pageProcess;
	
	@Override
	protected void beforeAction() {
		reqOpType = getValueFromRequest("reqPageType");
		reqOpType = StringUtil.isTrimNotEmpty(reqOpType)?reqOpType:"next";
		SessionManager.setSessionAttribute(request, "reqPageType", reqOpType);
		PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
		if("rs".equalsIgnoreCase(pageObj.getPageType())||"re".equalsIgnoreCase(pageObj.getPageType())||"dp".equalsIgnoreCase(pageObj.getPageType())||"FP".equalsIgnoreCase(pageObj.getPageType())){
			super.cacheData = false;
		}else if("finish".equalsIgnoreCase(reqOpType)){
			super.cacheData = false;
		}else{
			super.cacheData = true;
		}
	}
	
	@Override
	protected String executeAction() {
		if (super.cacheData) {
			JSONObject trxObj = JsonHelper.getTrxObject(dataDom);
//			SessionManager.setTrxDataToSession(request, trxObj);
			SessionManager.setTrxDataToSession(request, JsonUtil.getJSONString(trxObj));
			String sessionKey = WebUtils.generatePageIdKey(request);
			sessionKey = SessionManager.getSessionKey(SessionManager.getSessionId(request), sessionKey);
			List<String> keyList = SessionManager.getQueryKeys(request,sessionKey);
			for(String sessKey:keyList){
				if(StringUtil.isTrimNotEmpty(sessKey)){
//					Map cacheMap = new HashMap();
//					cacheMap.put("success", true);
//					cacheMap.put("obj", trxObj);
//					cacheMap.put("message", "");
					
					IApResponse response  = new ApResponse();
					response.setSuccess(true);
					response.setMessage("");
					response.setObj(trxObj);
					
					try {
						webCache.createData(sessKey, response);
						logger.info("put submit 结果 into cache key:"+sessKey);
					} catch (Exception e) {
						logger.error("put submit 结果 into cache key error:"+sessKey);
						e.printStackTrace();
					}
					
				}
			}
			WebUtils.savePageTrxData(request, WebUtils.getRequestParam(super.request));
			
			//本页面缓存了数据，仍需要跳转到下一个页面继续执行
			//本页面提交的数据，需要保存到下一个页面
			JsonUtil.getChildJson(dataDom, "trxDom").put("reqType", "WebPageManager");
			processResult = pageProcess.run(dataDom.toString());
			super.dataMap = super.getRetMap(processResult);
			JsonUtil.getChildJson(dataDom, "trxDom").remove("reqType");
			return SUCCESS;
		} else {
			WebUtils.savePageTrxData(request, WebUtils.getRequestParam(super.request));
			dataDom = WebUtils.generateAllTrxData(request);
			processResult = process.run(dataDom.toString());
			super.dataMap = super.getRetMap(processResult);
		}

		return SUCCESS;
	}
	private String reqOpType;
	protected void afterAction() {
		if("continue".equalsIgnoreCase(reqOpType)||"finish".equalsIgnoreCase(reqOpType)){
			String succcess = super.dataMap.get("success").toString();
			if(StringUtil.isTrimNotEmpty(succcess)&&"false".equalsIgnoreCase(succcess)){
				
			}else{
				JSONObject funcInfo = JsonHelper.getFuncObject(dataDom);
				if(!funcInfo .containsKey("sysPageIndex")){
					SessionManager.clearFunctionSession(request);
					SessionManager.setPageIndexToSession(request, -1);
					processResult = null;
					super.dataMap =  new HashMap<String,Object>();
					return ;
				}
				String strFuncId = funcInfo.getString("sysFuncId");
				webCache.removeData("caches/"+SessionManager.getSessionId(request));
				SessionManager.clearFunctionSession(request);
				SessionManager.setPageIndexToSession(request, -1);
				//清空缓存数据 modify by YeQing 2016-11-17
				WebCacheManager.chearFunctionCache(request, strFuncId);
				super.dataMap.put("pageInfo", null);
				super.dataMap.put("funcObj", null);
			}
		}
	}

	@Override
	protected String getReqType() {
		return "Submit";
	}
	@Override
	protected boolean checkTrxResult() {
		String strResult = getTrxResult();
		if(StringUtil.isTrimNotEmpty(strResult)){
			dataMap.put("success", false);
			dataMap.put("message", strResult);
			dataMap.put("level", 0);
			return false;
		}
		return true;
	}
}
