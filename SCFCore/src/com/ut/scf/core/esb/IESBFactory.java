package com.ut.scf.core.esb;

/**
 * ESB 提供商需要实现此接口，用来接收服务组件的注册
 * @author PanHao
 *
 */
public interface IESBFactory {
	/**
	 * client 可以通过这个接口，将自己注册到ESB中
	 * @param serviceProvider
	 */
	public void register(IESBService serviceProvider);
	
	/**
	 * Client 可以通过这个接口，将自己从ESB中注销
	 * @param serviceProvider
	 */
	public void unRegister(IESBService serviceProvider);
	
//	public IESBService getServiceProvider(String serviceId);
}
