package com.ut.scf.core.gapi;

import org.w3c.dom.Document;

public class MessageSendResponse implements IGAPIMsgResponse{
	
	private String response;
	private String error;
	private Document attribute;
	private int statusCode;
	private Object responseBody;

	@Override
	public String getResponse() {
		return response;
	}

	@Override
	public void setResponse(String response) {
		this.response = response;
	}

	@Override
	public String getError() {
		return error;
	}

	@Override
	public void setError(String level) {
		this.error = level;
	}

	@Override
	public Document getExtendingAttribute() {
		return attribute;
	}

	@Override
	public void setExtendingAttribute(Document attribute) {
		this.attribute = attribute;
	}

	@Override
	public int getRespCode() {
		return statusCode;
	}

	@Override
	public void setRespCode(int code) {
		statusCode = code;
	}

	@Override
	public void setResponseBody(Object body) {
		this.responseBody = body;		
	}

	@Override
	public Object getResponseBody() {
		return responseBody;
	}

}
