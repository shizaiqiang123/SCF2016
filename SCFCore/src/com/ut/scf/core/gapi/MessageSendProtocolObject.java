package com.ut.scf.core.gapi;


@Deprecated
public class MessageSendProtocolObject implements IFrameworkProtocol {
	private IFrameworkProtocolDetail protocolDetail;
	private IFrameworkProtocolHeader protocolHeader;
	@Override
	public IFrameworkProtocolDetail getDetail() {
		return this.protocolDetail;
	}

	@Override
	public void setDetail(IFrameworkProtocolDetail protocolDetail) {
		this.protocolDetail = protocolDetail;
	}

	@Override
	public IFrameworkProtocolHeader getHeader() {
		return this.protocolHeader;
	}

	@Override
	public void setHeader(IFrameworkProtocolHeader protocolHeader) {
		this.protocolHeader = protocolHeader;
	}

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setId(String id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setName(String name) {
		// TODO Auto-generated method stub
		
	}
}
