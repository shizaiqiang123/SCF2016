package com.ut.scf.core.container;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.ContextLoader;

public class SpringContextLoader {
	private static final Map<ClassLoader, ApplicationContext> currentContextPerThread =
			new ConcurrentHashMap<ClassLoader, ApplicationContext>(1);
	
	public static ApplicationContext getCurrentContainer(){
		ApplicationContext context = ContextLoader.getCurrentWebApplicationContext();
		
		if(context==null){
			// for Junit
			context = currentContextPerThread.get(ClassLoader.getSystemClassLoader());
		}
		return context;
	}
	
	public static void saveSpringContainer(ApplicationContext context){
		currentContextPerThread.put(ClassLoader.getSystemClassLoader(), context);
	}
}
