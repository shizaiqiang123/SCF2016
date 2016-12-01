package com.ut.scf.core.esb;

/**
 * @see 此接口作为ESB的客户端服务接口，即内置服务的统一实现接口（服务引擎接口）
 * 当service type是Class类型的时候，必须要有测接口的实现类
 * @see EDI，Advice
 * @author PanHao
 *
 */
public interface IESBClientService {
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception;
	
	public void initialize();
	
	public void destroy();
}
