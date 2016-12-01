package com.ut.dtc.intf.data;

import com.ut.dtc.intf.IMessageBody;

public class BodyMsg implements IMessageBody{

	private String msgContent;
	private String formator;
	private String mapping;

	public String getMsgContent() {
		return msgContent;
	}

	public void setMsgContent(String msgContent) {
		this.msgContent = msgContent;
	}

	public String getFormator() {
		return formator;
	}

	public void setFormator(String formator) {
		this.formator = formator;
	}

	public String getMapping() {
		return mapping;
	}

	public void setMapping(String mapping) {
		this.mapping = mapping;
	}
	
}
