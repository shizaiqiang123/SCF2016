package com.ut.scf.mule.control.entity;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.esb.IESBServiceEntity;

@Component("esbEntity")
@Scope("prototype")
public class MuleServiceEntity implements IESBServiceEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String type;
	private String protocol;
	private String postAdapter;
	private String queryAdapter;
	private String status;

	private String protocoltp;
	private String address;
	private String port;
	private String method;
	private String inorout;
	private String characterset;
	private String timeout;
	private String user;
	private String pwd;
	private String homeDir;
	private String passsivePort;
	private String recvService;
	private String bu;
	public String getWsUser() {
		return wsUser;
	}

	public void setWsUser(String wsUser) {
		this.wsUser = wsUser;
	}

	public String getWsPwd() {
		return wsPwd;
	}

	public void setWsPwd(String wsPwd) {
		this.wsPwd = wsPwd;
	}

	public String getWsInterceptorClass() {
		return wsInterceptorClass;
	}

	public void setWsInterceptorClass(String wsInterceptorClass) {
		this.wsInterceptorClass = wsInterceptorClass;
	}

	private String wsUser;
	private String wsPwd;
	private String wsInterceptorClass;

	@Override
	public String getServiceId() {
		return id;
	}

	@Override
	public void setServiceId(String serviceId) {
		this.id = serviceId;
	}

	@Override
	public String getServiceType() {
		return type;
	}

	@Override
	public void setServiceType(String serviceType) {
		this.type = serviceType;
	}

	@Override
	public String getServiceProtocol() {
		return protocol;
	}

	@Override
	public void setServiceProtocol(String serviceProtocol) {
		this.protocol = serviceProtocol;
	}

	@Override
	public String getServicePostAdapter() {
		return postAdapter;
	}

	@Override
	public void setServicePostAdapter(String serviceAdapter) {
		this.postAdapter = serviceAdapter;
	}

	@Override
	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String getStatus() {
		return status;
	}

	@Override
	public String getServiceQueryAdapter() {
		return queryAdapter;
	}

	@Override
	public void setServiceQueryAdapter(String serviceAdapter) {
		this.queryAdapter = serviceAdapter;
	}

	public String getProtocoltp() {
		return protocoltp;
	}

	public void setProtocoltp(String protocoltp) {
		this.protocoltp = protocoltp;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getInorout() {
		return inorout;
	}

	public void setInorout(String inorout) {
		this.inorout = inorout;
	}

	public String getCharacterset() {
		return characterset;
	}

	public void setCharacterset(String characterset) {
		this.characterset = characterset;
	}

	public String getTimeout() {
		return timeout;
	}

	public void setTimeout(String timeout) {
		this.timeout = timeout;
	}

	@Override
	public String getReceiveMapping() {
		return recvService;
	}

	@Override
	public void setReceiveMapping(String gapimsgId) {
		recvService = gapimsgId;
	}

	@Override
	public String getBu() {
		return bu;
	}

	@Override
	public void setBu(String bu) {
		this.bu = bu;
	}

	/**
	 * ftp用户名
	 * 
	 * @return
	 */
	@Override
	public String getUser() {
		return user;
	}

	/**
	 * ftp用户名
	 * 
	 * @return
	 */
	@Override
	public void setUser(String ftpUser) {
		this.user = ftpUser;
	}

	/**
	 * ftp密码
	 * 
	 * @return
	 */
	@Override
	public String getPwd() {
		return pwd;
	}

	/**
	 * ftp密码
	 * 
	 * @return
	 */
	@Override
	public void setPwd(String ftpPwd) {
		this.pwd = ftpPwd;
	}

	/**
	 * ftp基础路径，仅服务端使用
	 * 
	 * @return
	 */
	@Override
	public String getHomeDir() {
		return homeDir;
	}

	/**
	 * ftp基础路径，仅服务端使用
	 * 
	 * @return
	 */
	@Override
	public void setHomeDir(String homeDir) {
		this.homeDir = homeDir;
	}

	/**
	 * ftp被动传输端口，仅服务端且有防火墙端口限制时使用
	 * 
	 * @return
	 */
	@Override
	public String getPasssivePort() {
		return passsivePort;
	}

	/**
	 * ftp被动传输端口，仅服务端且有防火墙端口限制时使用
	 * 
	 * @return
	 */
	@Override
	public void setPasssivePort(String passsivePort) {
		this.passsivePort = passsivePort;
	}

	private String interfaceName;
	private String className;
	private String wsServiceName;

	public String getInterfaceName() {
		return interfaceName;
	}

	public void setInterfaceName(String interfaceName) {
		this.interfaceName = interfaceName;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public String getWsServiceName() {
		return wsServiceName;
	}

	public void setWsServiceName(String wsServiceName) {
		this.wsServiceName = wsServiceName;
	}
}
