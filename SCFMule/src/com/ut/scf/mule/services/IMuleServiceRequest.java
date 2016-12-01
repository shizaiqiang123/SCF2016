package com.ut.scf.mule.services;

import org.mule.api.MuleContext;

import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;

public interface IMuleServiceRequest {
	
	public String getRequestType();
	
	public void setRequestProtocol(IFrameworkProtocol protocol);
	
	public IFrameworkProtocol getRequestProtocol();
	
	public void setRequestMessageBody(IGAPIMsgRequest message);
	
	public IGAPIMsgRequest getRequestMessageBody();
	
	public MuleContext getMuleContext();
}
