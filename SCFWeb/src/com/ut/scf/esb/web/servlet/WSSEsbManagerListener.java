package com.ut.scf.esb.web.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;

public class WSSEsbManagerListener implements ServletContextListener{
	
//	@Autowired()
	private ServletContextListener esbContextListener;

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		ServletContext context = event.getServletContext();
		final ApplicationContext parentContext = (ApplicationContext) context.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		esbContextListener = (ServletContextListener) parentContext.getBean("esbContextListener");
		if(esbContextListener==null){
			System.out.println("No ESB config for system.");
			return;
		}
		esbContextListener.contextDestroyed(event);
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		ServletContext context = event.getServletContext();
		final ApplicationContext parentContext = (ApplicationContext) context.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		esbContextListener = (ServletContextListener) parentContext.getBean("esbContextListener");
		if(esbContextListener==null){
			System.out.println("No ESB config for system.");
			return;
		}
		esbContextListener.contextInitialized(event);
	}
}
