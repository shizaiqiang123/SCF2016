package com.ut.scf.web.listener;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;

import com.ut.comm.cache.ICacheClient;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebUtils;

public class SessionListener implements HttpSessionListener {
	private Logger logger = LoggerFactory.getLogger(getClass());
	@Override
	public void sessionCreated(HttpSessionEvent se) {
		HttpSession session = se.getSession();
		ICacheClient sessionClient = WebCacheManager.getCache();
		
		try {
			sessionClient.createData(SessionManager.getSessionKey(session.getId(),""),"");
			sessionClient.createData(WebCacheManager.getCacheKey(session.getId(),""),"");
		} catch (Exception e) {
			logger.error("session create error:" + session.getId());
			session.invalidate();
		}
		
		logger.debug("session create:" + session.getId());
	}
	
	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		HttpSession session = se.getSession();
		
		ServletContext ctx=se.getSession().getServletContext();  
		
		final ApplicationContext parentContext = (ApplicationContext) ctx.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		
		JSONObject dataDom = WebUtils.generateDomBySession(session);
		
		try {
			IAPProcessor cancelProcess = (IAPProcessor) parentContext.getBean("cancelProcessor");
			cancelProcess.run(dataDom.toString());
			
			dataDom = WebUtils.generateDomBySession(session);
			JSONObject userData = JsonHelper.getUserObject(dataDom);
			Object userId = userData.get("sysUserId");
			if(userId!= null&&StringUtil.isNotNull(userId.toString())){
				JsonHelper.getTrxObject(dataDom).put("reqType", "webLoginManager");
				JsonHelper.getTrxObject(dataDom).put("logType", "logoff");
				JsonHelper.getTrxObject(dataDom).put("userId", userId.toString());
				IAPProcessor process = (IAPProcessor) parentContext.getBean("aPQueryProcessor");
				process.run(dataDom.toString());
				logger.info("登出系统");
			}
		} catch (Exception e) {
			logger.error("User logout failed:"+e.toString());
		}
//		ICSCacheClient sessionClient = (ICSCacheClient) parentContext.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();

		sessionClient.removeDataContainsChild(SessionManager.getSessionKey(session.getId(),""));
		sessionClient.removeDataContainsChild(WebCacheManager.getCacheKey(session.getId(),""));
		if(SessionManager.getFuncInfoFromSession(session)==null){
			logger.debug("session destroyed:"+session.getId());
			return;
		}
		logger.debug("session destroy:"+session.getId());
	}

}
