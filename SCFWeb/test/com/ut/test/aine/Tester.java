package com.ut.test.aine;

import javax.servlet.ServletContextListener;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class Tester {
	
	public static void main(String [] args){
		ApplicationContext ctx = new FileSystemXmlApplicationContext("WebContent/WEB-INF/spring/applicationContext.xml");

		ServletContextListener action = (ServletContextListener) ctx.getBean("esbContextListener");

		action.contextInitialized(null);
	}
}
