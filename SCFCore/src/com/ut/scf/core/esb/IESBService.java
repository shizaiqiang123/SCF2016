package com.ut.scf.core.esb;

import java.io.Serializable;

/**
 * ESB 服务注册实体类 所有需要发布到ESB上的服务，都必须实现此接口 set 方法由实现类填值 get 方法用于服务端取值
 * 
 * @author PanHao
 *
 */
public interface IESBService extends Serializable, IESBServiceStatus {
	public final String SERVICE_TYPE_RMI = "RMI";
	public final String SERVICE_TYPE_WS = "WS";
	public final String SERVICE_TYPE_MQ = "MQ";
	public final String SERVICE_TYPE_CLASS = "CLASS";
	public final String SERVICE_TYPE_SOCKET = "SOCKET";
	public final String SERVICE_TYPE_FTP = "FTP";
	public final String SERVICE_TYPE_URL = "URL";
	public final String SERVICE_TYPE_EMAIL="EMAIL";

	public String getServiceId();

	public void setServiceId(String serviceId);

	// public void initialize();
	//
	// public void destroy();

	/**
	 * 消费端凭此消费
	 * 
	 * @return
	 */
	public String getServiceType();

	public void setServiceType(String serviceType);

	/**
	 * RMI : ip+port WS: url+method MQ: jndi Class : className
	 * 
	 * @return
	 */
	public String getServiceProtocol();

	public void setServiceProtocol(String serviceProtocol);

	/**
	 * 服务对应的adapter类名
	 * 
	 * @return
	 */
	public String getServicePostAdapter();

	public void setServicePostAdapter(String serviceAdapter);

	public String getServiceQueryAdapter();

	public void setServiceQueryAdapter(String serviceAdapter);

	public String getProtocoltp();

	public void setProtocoltp(String protocoltp);

	public String getAddress();

	public void setAddress(String address);

	public String getPort();

	public void setPort(String port);

	public String getMethod();

	public void setMethod(String method);

	public String getInorout();

	public void setInorout(String inorout);

	public String getTimeout();

	public void setTimeout(String timeout);

	public String getCharacterset();

	public void setCharacterset(String characterset);

	public String getReceiveMapping();

	public void setReceiveMapping(String gapimsgId);

	public String getBu();

	public void setBu(String bu);

	/**
	 * ftp用户名
	 * 
	 * @return
	 */
	public String getUser();

	/**
	 * ftp用户名
	 * 
	 * @return
	 */
	public void setUser(String user);

	/**
	 * ftp密码
	 * 
	 * @return
	 */
	public String getPwd();

	/**
	 * ftp密码
	 * 
	 * @return
	 */
	public void setPwd(String pwd);

	/**
	 * ftp基础路径，仅服务端使用
	 * 
	 * @return
	 */
	public String getHomeDir();

	/**
	 * ftp基础路径，仅服务端使用
	 * 
	 * @return
	 */
	public void setHomeDir(String homeDir);

	/**
	 * ftp被动传输端口，仅服务端且有防火墙端口限制时使用
	 * 
	 * @return
	 */
	public String getPasssivePort();

	/**
	 * ftp被动传输端口，仅服务端且有防火墙端口限制时使用
	 * 
	 * @return
	 */
	public void setPasssivePort(String passsivePort);

	public String getInterfaceName();

	public void setInterfaceName(String interfaceName);

	public String getClassName();

	public void setClassName(String className);

	public String getWsServiceName();

	public void setWsServiceName(String wsServiceName);

	public String getWsUser();

	public void setWsUser(String wsUser);

	public String getWsPwd();

	public void setWsPwd(String wsPwd);

	public String getWsInterceptorClass();

	public void setWsInterceptorClass(String wsInterceptorClass);
}
