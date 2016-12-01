package com.ut.scf.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;

import com.ut.comm.cache.ICacheClient;
import com.ut.scf.core.batch.IBatchManager;
import com.ut.scf.web.cache.WebCacheManager;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebUtils;

public class WSServletContextListener implements ServletContextListener{
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		logger.debug("Server shutting down...");
		ApplicationContext context = WebUtils.getApplicationContext(arg0.getServletContext());
		
//		ICSCacheClient sessionClient = (ICSCacheClient) context.getBean("webCacheClient");
		ICacheClient sessionClient = WebCacheManager.getCache();
		sessionClient.removeDataContainsChild(SessionManager.getSessionKey("", ""));
		sessionClient.removeDataContainsChild(WebCacheManager.getCacheKey("", ""));
//		sessionClient.close();
		WebCacheManager.getCacheManager().shutdown();
		
//		ICacheServer cacheServer = (ICacheServer)context.getBean("webCacheServer");
//		cacheServer.shutdown();
		
		IBatchManager batchManager = (IBatchManager) context.getBean("batchManager");
		batchManager.shutdown();
		
//		WebSessionImpl.shutdown();
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		logger.debug("Server startting ...");
//		ApplicationContext context = WebUtils.getApplicationContext(event.getServletContext());
		
//		ICacheServer cacheServer = (ICacheServer)context.getBean("webCacheServer");
//		cacheServer.start();
		
//		ICSCacheClient sessionClient = (ICSCacheClient) CommCacheManager.getWebCacheManager().getCache();
		ICacheClient sessionClient = WebCacheManager.getCache();
		try {
			sessionClient.createData(SessionManager.getSessionKey("", ""), null);
			sessionClient.createData(WebCacheManager.getCacheKey("", ""), null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
//		String rootPath = this.getClass().getResource("/").getPath();
//		String configFile = rootPath+"/"+"Web_Cache_Config.xml";
//		try {
//			WebSessionImpl.init(configFile);
//		} catch (Exception e) {
//			logger.error("Initialize WebCache failed");
//			logger.error(e.toString());
//		}
	}
}
