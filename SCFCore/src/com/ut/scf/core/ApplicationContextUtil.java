package com.ut.scf.core;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.ut.comm.log.ILogManager;
import com.ut.scf.core.batch.IBatchManager;
import com.ut.scf.core.conf.IConfig;
import com.ut.scf.core.container.SpringContextLoader;

public class ApplicationContextUtil implements ApplicationContextAware {

	private static ApplicationContext context;// 声明一个静态变量保存

	@Override
	public void setApplicationContext(ApplicationContext contex) throws BeansException {
		ApplicationContextUtil.context = contex;
		
		if(SpringContextLoader.getCurrentContainer()==null)
			SpringContextLoader.saveSpringContainer(context);
		
		IConfig buConfig = (IConfig) context.getBean("buConfig");
		buConfig.initilize();
		
		ILogManager logManager = (ILogManager) context.getBean("loggerManager");
		logManager.initlize();
		
		IConfig cacheConfig = (IConfig) context.getBean("apCacheManager");
		cacheConfig.initilize();
		
		IBatchManager batchManager = (IBatchManager) context.getBean("batchManager");
		batchManager.initialize();
		
		IConfig paraConfig = (IConfig) context.getBean("paraConfig");
		paraConfig.initilize();
		
		IConfig accountConfig = (IConfig) context.getBean("accountConfig");
		accountConfig.initilize();
	}

	public static ApplicationContext getContext() {
		return context;
	}
}
