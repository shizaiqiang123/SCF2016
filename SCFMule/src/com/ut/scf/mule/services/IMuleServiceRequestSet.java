package com.ut.scf.mule.services;

import org.mule.api.MuleContext;

public interface IMuleServiceRequestSet {
	public void setRequestType(String requestType);
	public void setMuleContext(MuleContext context);
}
