package com.ut.scf.core.services;

public interface IServiceRegister {
	public void setServiceType(String type);
	
	public void setServicePath(String paraPath);
	
	public void setServiceName();
	
	String getServiceType();
	
	String getServicePath();
	
	String getServiceName();
	
	public void setServiceEntity(Class<?extends IServiceEntity> clazz);
	
	Class<?extends IServiceEntity> getServiceEntity();
}	
