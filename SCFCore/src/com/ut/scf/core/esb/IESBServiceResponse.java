package com.ut.scf.core.esb;

import java.io.Serializable;

public interface IESBServiceResponse extends Serializable{
	
	public int ESB_SERVICE_RESULT_SUCCESS =0;
	public int ESB_SERVICE_RESULT_ERROR =1;
	public int ESB_SERVICE_RESULT_EXCEPTION =2;
	
	public int ESB_RESP_CODE_FAILED_CONNECT = 0;
	public int ESB_RESP_CODE_CONNECTED = 5;
	public int ESB_RESP_CODE_FAILED_SEND = 1;
	public int ESB_RESP_CODE_SENDED = 2;
	public int ESB_RESP_CODE_FAILED_RECEIVE = 3;
	public int ESB_RESP_CODE_RECEIVED = 4;
	public int ESB_RESP_CODE_EXCEPTION = 10;
	public int ESB_RESP_CODE_NO_DATA = 11;
	
	
	public int ESB_SERVICE_ERROR_CODE_CONNECTION =1;
	public String ESB_SERVICE_ERROR_MSG_CONNECTION ="Unknow target host.";
	public int ESB_SERVICE_ERROR_CODE_AUTH =2;
	public String ESB_SERVICE_ERROR_MSG_AUTH ="Unable connect to target host.";
	public int ESB_SERVICE_ERROR_CODE_BUSI =3;
	public String ESB_SERVICE_ERROR_MSG_BUSI ="Business transaction Error.";
	
	public void setResponseResult(int result);
	
	public int getResponseResult();
	
	public void setResponseData(Object data);
	
	public Object getResponseData();
	
	public String getRequestId();
	
	public void setRequestId(String id);
	
	public boolean getNeedSend();
	
	public void setNeedSend(boolean need);
	
	public int getRespCode();
	
	public void setRespCode(int code);
	
	public String getError();
	
	public void setError(String level);

}
