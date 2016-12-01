package com.ut.scf.mule.services;

import org.mule.api.MuleContext;
import org.springframework.stereotype.Repository;

import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.mule.web.context.MuleContextLoader;
@Repository
public class MuleServicesRequestObj implements IMuleServiceRequest,IMuleServiceRequestSet{
	private String requestType;
	private IFrameworkProtocol protocol;
	private IGAPIMsgRequest message;

	@Override
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	@Override
	public String getRequestType() {
		return this.requestType;
	}

	@Override
	public void setRequestProtocol(IFrameworkProtocol protocol) {
		this.protocol = protocol;
	}

	@Override
	public IFrameworkProtocol getRequestProtocol() {
		return this.protocol;
	}

	@Override
	public void setRequestMessageBody(IGAPIMsgRequest message) {
		this.message = message;
	}

	@Override
	public IGAPIMsgRequest getRequestMessageBody() {
		return this.message;
	}

	@Override
	public void setMuleContext(MuleContext context) {
	}

	@Override
	public MuleContext getMuleContext() {
		return MuleContextLoader.getCurrentMuleContext();
	}

}
