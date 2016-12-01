package com.ut.scf.core.esb;

import java.io.Serializable;

import com.ut.comm.xml.AbsObject;

public interface IESBServiceRequest extends Serializable{
	public String REQUEST_TYPE_QUERY = "queryData";
	
	public String REQUEST_TYPE_POST = "submitData";
	
	public void setRequestType(String requestType);
	
	public String getRequestType();
	
	public void setRequestData(Object data);
	
	public Object getRequestData();
	
	public void setRequestPara(AbsObject para);
	
	public AbsObject getRequestPara();
	
	public void setRequestTarget(IESBServiceEntity target);
	
	public IESBServiceEntity getRequestTarget();
	
	public void setRequestSource(IESBServiceEntity source);
	
	public IESBServiceEntity getRequestSource();
	
	public String getRequestId();
	
	public void setRequestId(String id);
	
	public void merageResponse(IESBServiceResponse response);
	
	public void setMethodName(String methodName);
	
	public String getMethodName();
	
}
