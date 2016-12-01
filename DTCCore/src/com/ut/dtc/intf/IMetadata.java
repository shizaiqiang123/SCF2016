package com.ut.dtc.intf;


public interface IMetadata {
	
	public String getCustBu();
	
	public String getMsgTp();

	public IValidate getValidate(); 
	
	public IMessageHeader getMsgHeader();
	
	public IMessageBody getMsgBody();
	
	public String getProcessor();
	
	void setCustBu(String bu);
	
	void setMsgTp(String msgTp);

	void setValidate(IValidate validate); 
	
	void setMsgHeader(IMessageHeader header);
	
	void setMsgBody(IMessageBody body);
	
	void setProcessor(String processor);
	
	public String getMsgId() ;

	void setMsgId(String msgId) ;
	
	public String getMetaMapping();

	void setMetaMapping(String metaMapping);
	
}
