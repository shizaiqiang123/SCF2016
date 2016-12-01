package com.ut.scf.core.gapi;

import java.util.List;

import com.ut.comm.xml.gapi.GapiMsgPara;

public interface IGAPIMsgRequest {
	public void setMsgHeader(Object msgHender);
	
	public void setMsgBody(Object msgBody);
	
	public void setClientEntitys(List<Object> entitySet);
	
	public Object getMsgHeader();
	
	public Object getMsgBody();
	
	//考虑是否应该使用set存储数据
	public List<Object> getClientEntitys();
	
	public void addClientEntity(Object entity);
	
	public void removeClientEntity(Object entityKey);
	
	public void setGapiMsgPara(GapiMsgPara para);
	
	public GapiMsgPara getGapiMsgPara();
}
