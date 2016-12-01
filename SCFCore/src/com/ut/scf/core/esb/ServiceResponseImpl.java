package com.ut.scf.core.esb;

public class ServiceResponseImpl implements IESBServiceResponse {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int result;
	private Object responseData;
	private String requestId;
	private int errorCode;
	private boolean needSend;
	private int respCode;
	
	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	private String errorMsg;

	@Override
	public void setResponseResult(int result) {
		this.result = result;
	}

	@Override
	public int getResponseResult() {
		return result;
	}

	@Override
	public void setResponseData(Object data) {
		this.responseData = data;
	}

	@Override
	public Object getResponseData() {
		return responseData;
	}

	@Override
	public String getRequestId() {
		return requestId;
	}

	@Override
	public void setRequestId(String id) {
		this.requestId = id;
	}

	@Override
	public boolean getNeedSend() {
		return needSend;
	}

	@Override
	public void setNeedSend(boolean need) {
		needSend = need;		
	}

	@Override
	public int getRespCode() {
		return respCode;
	}

	@Override
	public void setRespCode(int code) {
		respCode = code;
	}

	@Override
	public String getError() {
		return errorMsg;
	}

	@Override
	public void setError(String level) {
		this.errorMsg = level;
	}

}
