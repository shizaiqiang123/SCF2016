package com.ut.report.listener;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.ut.report.engine.EngineFactory;


public class ServletContextListenerImpl implements ServletContextListener {

	public void contextDestroyed(ServletContextEvent servletContextEvent) {
		EngineFactory.shutdown();
	}

	public void contextInitialized(ServletContextEvent servletContextEvent) {
		ServletContext servletContext = servletContextEvent.getServletContext();
		EngineFactory.startup(servletContext);
	}
}
