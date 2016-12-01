package com.ut.scf.web.actions;

import java.util.ArrayList;
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

public class WSQueryProcessorAction extends AbsServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	//ap server side processor
	@Resource(name="aPQueryProcessor")  
	IAPProcessor process;
	
	@Override
	protected void beforeAction() {
		
	}
	
	@Override
	protected String executeAction() throws Exception {
		String sessKey = generateRequestKey();
		if(StringUtil.isTrimNotEmpty(sessKey)){
			String pageKey = WebUtils.generatePageIdKey(request);
			String requestKey = WebCacheManager.getCacheKey(SessionManager.getSessionId(request), sessKey);
//			SessionManager.setQueryKey(request, sessKey,sessionKey);
			SessionManager.setQueryKey(request,requestKey,
					SessionManager.getSessionKey(SessionManager.getSessionId(request), pageKey));
//			ICache cache = WebCacheManager.getDefaultCache();

			if(webCache.getData(requestKey)!=null){
//				super.dataMap = (Map<String, Object>) webCache.getData(sessKey);
				processResult = webCache.getData(requestKey);
			
				super.dataMap = super.getRetMap(processResult);
				logger.info("get Query 结果 from cache key:"+sessKey);
				Object sessObj = super.dataMap.get("obj");
				JSONObject trxObj = new JSONObject();
				//此处session处理可能存在隐患
				if(Map.class.isAssignableFrom(sessObj.getClass())){
					trxObj.putAll((Map) sessObj);
				}else{
					trxObj = JsonUtil.getJSON(sessObj.toString());
				}
				
				PageSessionObj pageObj =SessionManager.getPageInfoFromSession(request);
				String pageDoName = pageObj==null?"":pageObj.getDoname();
				if(StringUtil.isTrimNotEmpty(pageDoName)){
					trxObj = trxObj.getJSONObject(pageDoName);
				}
				
				if(trxObj.containsKey("_total_rows")){
					int totalRows =trxObj.getInt("_total_rows");
					List rows = convertToRows(trxObj);
					super.dataMap.put("total", totalRows);
					super.dataMap.put("rows", rows);
				}
				return SUCCESS;
			}		
		}
		
		processResult = process.run(dataDom.toString());
		
		if(JsonHelper.hasWorkflowObject(dataDom)){
			JSONObject workflow = JsonHelper.getWorkflowObject(dataDom);
			SessionManager.setWorkFlowToSession(request, workflow.toString());
		}
			
		if(processResult==null)
			return SUCCESS;
		super.dataMap = super.getRetMap(processResult);
		return SUCCESS;
	}
	
	private List convertToRows(JSONObject trxObj) {
		int totalRows =trxObj.getInt("_total_rows");
		List<JSONObject> retList = new ArrayList<JSONObject>();
		for (int i = 0; i < totalRows; i++) {
			String key = "rows"+i;
			retList.add(trxObj.getJSONObject(key));
		}
		return retList;
	}

	protected void afterAction() {
		Object result = dataMap.get("success");
		boolean bResult = Boolean.parseBoolean(result.toString());
		if(!bResult){
			String msg =dataMap.get("message")==null?"":dataMap.get("message").toString();
			SessionManager.updataTrxResult(request, bResult,msg);
		}else{
			SessionManager.updataTrxResult(request, bResult,"");
			if(!cacheData){
				String sessKey = generateRequestKeyAnyway();
				//String sessKey = generateRequestKey();
				if(StringUtil.isTrimNotEmpty(sessKey)){
//					ICache cache = WebCacheManager.getDefaultCache();
//					cache.put(sessKey, super.dataMap);
					String cachKey = WebCacheManager.getCacheKey(SessionManager.getSessionId(request), sessKey);
					try {
						webCache.createData(cachKey, processResult);
						logger.info("put Query 结果 into cache key:"+sessKey);
					} catch (Exception e) {
						logger.error("put Query 结果 into cache key error:"+sessKey);
						e.printStackTrace();
					}
				}
			}
		}
	}

	@Override
	protected String getReqType() {
		return "Query";
	}
}
