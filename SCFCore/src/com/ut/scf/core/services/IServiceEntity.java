package com.ut.scf.core.services;

import com.ut.scf.core.gapi.IFrameworkProtocol;

public interface IServiceEntity {
	public void setServiceType(String serviceType);

	public String getServiceType();

	public void setServiceID(String strviceID);

	public String getServiceID();

	public IFrameworkProtocol getServiceProtocol();
	
	public void setServiceProtocol(IFrameworkProtocol serviceProtocol);
	
	public String getMsgType() ;
	public void setMsgType(String msgType) ;
	public String getMsgName();
	public void setMsgName(String msgName);
	public String getMsgTemplate();
	public void setMsgTemplate(String msgTemplate);
	public String getMsgMapping();
	public void setMsgMapping(String msgMapping);
}
