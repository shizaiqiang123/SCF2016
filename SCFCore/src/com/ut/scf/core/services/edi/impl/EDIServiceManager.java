package com.ut.scf.core.services.edi.impl;

import com.ut.scf.core.conf.IConfig;
import com.ut.scf.core.services.IServcieManager;
import com.ut.scf.core.services.IServiceRegister;

public class EDIServiceManager implements IConfig{
	
	IServcieManager manager ;

	@Override
	public void initilize() {
		IServiceRegister register = new EDIServiceRegister();
		manager.registeService(register );
	}

	@Override
	public void destory() {
		IServiceRegister register = new EDIServiceRegister();
		manager.unRegisteService(register );
	}
	
	
}
