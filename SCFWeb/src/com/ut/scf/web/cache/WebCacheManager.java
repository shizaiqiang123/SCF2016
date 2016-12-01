package com.ut.scf.web.cache;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.ut.comm.cache.CommCacheManager;
import com.ut.comm.cache.ICacheClient;
import com.ut.comm.cache.ICacheManager;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.web.utils.WebLogUtil;

public class WebCacheManager {
	
	public static String getCacheKey(String sessionId ,String keyName){
		StringBuffer buff = new StringBuffer();
		buff.append("/caches");
		if(StringUtil.isTrimNotEmpty(sessionId)){
			buff.append("/").append(sessionId);	
		}
		
		if(StringUtil.isTrimNotEmpty(keyName)){
			buff.append("/").append(keyName);	
		}
		return buff.toString();
	}
	
	public static void chearFunctionCache(HttpServletRequest request,String strFuncId){
		ICacheClient sessionClient = getCache();
		
		String sessionKey = WebCacheManager.getCacheKey(request.getSession().getId(), "");
		
		List<String> childKes = sessionClient.getChildKeys(sessionKey);
		if(!childKes.isEmpty()){
			for (String childKey : childKes) {
				if(childKey.contains(strFuncId)){
					//切换缓存时需要改动
					
					//zk实现
//					sessionClient.removeDataContainsChild(sessionKey+"/"+childKey);
					
					//ehcache 实现
					sessionClient.removeDataContainsChild(childKey);
				}
			}
		}
	}

	public static ICacheClient getCache() {
		try {
			return CommCacheManager.getInstance().getCache("CACHE_WEB_SESS");
		} catch (Exception e) {
			try {
				return CommCacheManager.getInstance().getCache();
			} catch (Exception e1) {
				e1.printStackTrace();
				return null;
			}
		}
	}

	public static ICacheManager getCacheManager() {
		return CommCacheManager.getInstance();
	}
	
	public static void start() {
		String initFile = "Web_Cache_Config.xml";
		try {
			CommCacheManager.getInstance().start(initFile);
		} catch (Exception e) {
			WebLogUtil.getWebErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
	}
	
	public static void shutdown(){
		CommCacheManager.getInstance().shutdown();
	}
}
