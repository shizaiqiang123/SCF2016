package com.ut.scf.core;

import org.springframework.context.ApplicationContext;

public interface IFrameworkService {
	public String runService(String request) throws Exception;
	
	public ApplicationContext getApplicationContext();
}
