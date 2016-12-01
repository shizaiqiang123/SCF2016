package com.ut.scf.core.services;

import com.ut.scf.core.gapi.IFrameworkProtocol;

public class ServiceEntity implements IServiceEntity {
	private String serviceType;
	private String serviceID;
	private IFrameworkProtocol protocol;

	public String getServiceType() {
		return serviceType;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public String getServiceID() {
		return serviceID;
	}

	public void setServiceID(String serviceID) {
		this.serviceID = serviceID;
	}

	@Override
	public IFrameworkProtocol getServiceProtocol() {
		return protocol;
	}

	@Override
	public void setServiceProtocol(IFrameworkProtocol serviceProtocol) {
		this.protocol = serviceProtocol;
	}

	@Override
	public String getMsgType() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setMsgType(String msgType) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getMsgName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setMsgName(String msgName) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getMsgTemplate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setMsgTemplate(String msgTemplate) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getMsgMapping() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setMsgMapping(String msgMapping) {
		// TODO Auto-generated method stub
		
	}

}
