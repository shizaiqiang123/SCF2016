package com.ut.dtc.intf.data;

import com.ut.dtc.intf.IMessageBody;
import com.ut.dtc.intf.IMessageHeader;
import com.ut.dtc.intf.IMetadata;
import com.ut.dtc.intf.IValidate;

public class DTCMetadata implements IMetadata{
	private String custBu;
	private IValidate validate;
	private IMessageHeader msgHeader;
	private IMessageBody msgBody;
	private String msgTp;
	private String processor;
	private String msgId;
	private String metaMapping;

	@Override
	public String getCustBu() {
		return custBu;
	}

	@Override
	public IValidate getValidate() {
		return validate;
	}

	@Override
	public IMessageHeader getMsgHeader() {
		return msgHeader;
	}

	@Override
	public IMessageBody getMsgBody() {
		return msgBody;
	}

	public void setCustBu(String custBu) {
		this.custBu = custBu;
	}

	public void setValidate(IValidate validate) {
		this.validate = validate;
	}

	public void setMsgHeader(IMessageHeader msgHeader) {
		this.msgHeader = msgHeader;
	}

	public void setMsgBody(IMessageBody msgBody) {
		this.msgBody = msgBody;
	}

	public String getMsgTp() {
		return msgTp;
	}

	public void setMsgTp(String msgTp) {
		this.msgTp = msgTp;
	}

	public String getProcessor() {
		return processor;
	}

	public void setProcessor(String processor) {
		this.processor = processor;
	}

	public String getMsgId() {
		return msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}

	public String getMetaMapping() {
		return metaMapping;
	}

	public void setMetaMapping(String metaMapping) {
		this.metaMapping = metaMapping;
	}

}
