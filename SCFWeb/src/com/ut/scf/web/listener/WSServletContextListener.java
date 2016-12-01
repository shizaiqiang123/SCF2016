package com.ut.scf.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.quartz.SchedulerException;
import org.quartz.impl.StdSchedulerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.cache.ICacheClient;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebLogUtil;

public class WSServletContextListener implements ServletContextListener{
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		logger.debug("Server shutting down...");
		ICacheClient sessionClient = WebCacheManager.getCache();
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey("", ""));
		sessionClient.removeDataContainsChild(WebCacheManager.getCacheKey("", ""));
		WebCacheManager.shutdown();
		try {
			StdSchedulerFactory.getDefaultScheduler().shutdown();
		} catch (SchedulerException e) {
			e.printStackTrace();
			logger.error("Server shutted down error:"+e.toString());
		}
		logger.debug("Server shutted down...");
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		logger.debug("Server startting ...");
		
		WebCacheManager.start();
		ICacheClient sessionClient = WebCacheManager.getCache();
		try {
			sessionClient.createData(SessionManager.getSessionKey("", ""), null);
			sessionClient.createData(WebCacheManager.getCacheKey("", ""), null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		WebLogUtil.initlizeLogger();
		
		logger.debug("Server startted ...");
	}
}
