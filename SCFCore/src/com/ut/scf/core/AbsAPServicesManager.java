package com.ut.scf.core;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.ContextLoader;

public abstract class AbsAPServicesManager implements IFrameworkService{
	@Override
	public ApplicationContext getApplicationContext() {
		return ContextLoader.getCurrentWebApplicationContext();
	}
}
