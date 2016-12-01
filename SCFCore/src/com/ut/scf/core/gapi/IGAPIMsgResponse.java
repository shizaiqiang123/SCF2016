package com.ut.scf.core.gapi;

import org.w3c.dom.Document;

public interface IGAPIMsgResponse {
	public int GAPI_RESP_CODE_FAILED_CONNECT = 0;
	public int GAPI_RESP_CODE_FAILED_SEND = 1;
	public int GAPI_RESP_CODE_SENDED = 2;
	public int GAPI_RESP_CODE_FAILED_RECEIVE = 3;
	public int GAPI_RESP_CODE_RECEIVED = 4;
	
	public int GAPI_RESP_CODE_EXCEPTION = 10;
	
	public String getResponse();
	
	public void setResponse(String response);
	
	public String getError();
	
	public void setError(String level);
	
	public Document getExtendingAttribute();
	
	public void setExtendingAttribute(Document attribute);
	
	public int getRespCode();
	
	public void setRespCode(int code);
	
	public void setResponseBody(Object body);
	
	public Object getResponseBody();
}
