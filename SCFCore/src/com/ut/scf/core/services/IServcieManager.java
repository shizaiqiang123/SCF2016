package com.ut.scf.core.services;

public interface IServcieManager {
	/**
	 * @see 注册service
	 * @param register
	 */
	public void registeService(IServiceRegister register);
	
	/**
	 * @see 销毁Service
	 * @param unregister
	 */
	public void unRegisteService(IServiceRegister register);
	
	IServiceRegister getService(String serviceName);
}
