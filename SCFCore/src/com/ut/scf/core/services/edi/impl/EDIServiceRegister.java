package com.ut.scf.core.services.edi.impl;

import com.ut.scf.core.services.IServiceEntity;
import com.ut.scf.core.services.IServiceRegister;

/**
 * @see 每个服务都需要在系统中注册了才能使用
 * @see 目前不使用注册机制，待以后优化
 * @author PanHao
 *
 */
@Deprecated
public class EDIServiceRegister implements IServiceRegister{
	
	private String serviceType;
	
	private String servicePath;
	
	private String serviceName;

	@Override
	public void setServiceType(String type) {
		
	}

	@Override
	public void setServicePath(String paraPath) {
		
	}

	@Override
	public void setServiceName() {
		
	}

	@Override
	public String getServiceType() {
		return "EDI";
	}

	@Override
	public String getServicePath() {
		return "edi";
	}

	@Override
	public String getServiceName() {
		return "EDI";
	}

	@Override
	public void setServiceEntity(Class<? extends IServiceEntity> clazz) {
		
	}

	@Override
	public Class<? extends IServiceEntity> getServiceEntity() {
		return null;
	}
}
