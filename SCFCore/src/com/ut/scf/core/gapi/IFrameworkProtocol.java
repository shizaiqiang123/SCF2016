package com.ut.scf.core.gapi;

/**
 * 
 * @author Aine
 * @see IFrameworkProtocol 用来封装系统提供的协议信息
 */
public interface IFrameworkProtocol {
	// 可以分成两个接口，公开给不同的用户，提供者只是用set方法，消费者只是用get方法
	
	public final String PROTOCOL_TYPE_FILE= "File";
	
	public final String PROTOCOL_TYPE_WS= "WebService";
	
	public final String PROTOCOL_TYPE_JMS= "JmsMQ";
	
	public final String PROTOCOL_MODE_SYNC= "Sync";
	
	public final String PROTOCOL_MODE_ASYNC= "Async";
	
	public IFrameworkProtocolHeader getHeader();
	
	public void setHeader(IFrameworkProtocolHeader protocolHeader);
	
	public IFrameworkProtocolDetail getDetail();
	
	public void setDetail(IFrameworkProtocolDetail protocolDetail);
	
	public String getId();

	public void setId(String id);

	public String getName();

	public void setName(String name);

}
