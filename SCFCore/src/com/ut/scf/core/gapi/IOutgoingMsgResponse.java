package com.ut.scf.core.gapi;

import org.w3c.dom.Document;

public interface IOutgoingMsgResponse {
	public String getResponse();
	
	public void setResponse(String response);
	
	public String getError();
	
	public void setError(String level);
	
	public Document getExtendingAttribute();
	
	public void setExtendingAttribute(Document attribute);
}
