package com.ut.scf.core.gapi;

import java.util.ArrayList;
import java.util.List;

import com.ut.comm.xml.gapi.GapiMsgPara;

public class MessageSendRequest implements IGAPIMsgRequest {
	private Object msgHeader;
	private Object msgBody;
	private List<Object> clientEntitys;
	private GapiMsgPara para;

	@Override
	public Object getMsgHeader() {
		return msgHeader;
	}

	@Override
	public void setMsgHeader(Object msgHeader) {
		this.msgHeader = msgHeader;
	}

	@Override
	public Object getMsgBody() {
		return msgBody;
	}

	@Override
	public void setMsgBody(Object msgBody) {
		this.msgBody = msgBody;
	}

	@Override
	public List<Object> getClientEntitys() {
		return clientEntitys;
	}

	@Override
	public void setClientEntitys(List<Object> clientEntitys) {
		this.clientEntitys = clientEntitys;
	}

	@Override
	public void addClientEntity(Object entity) {
		if (clientEntitys == null)
			clientEntitys = new ArrayList<Object>();
		clientEntitys.add(entity);
	}

	@Override
	public void removeClientEntity(Object entityKey) {
		if (clientEntitys == null)
			return;
		clientEntitys.remove(entityKey);
	}

	@Override
	public void setGapiMsgPara(GapiMsgPara para) {
		this.para = para;
	}

	@Override
	public GapiMsgPara getGapiMsgPara() {
		return para;
	}

}
