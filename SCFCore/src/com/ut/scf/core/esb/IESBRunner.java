package com.ut.scf.core.esb;

/**
 * ESB提供者需要实现此接口，用来接收服务组件之间调用
 * @author PanHao
 *
 */
public interface IESBRunner {
	public IESBServiceResponse runService(IESBServiceRequest request);
}
