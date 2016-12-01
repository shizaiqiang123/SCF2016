package com.ut.scf.core.gapi;

import java.util.List;

public interface IOutgoingMsgRequest {
	public void setMsgHeader(Object msgHender);
	
	public void setMsgBody(Object msgBody);
	
	public void setClientEntitys(List<Object> entitySet);
	
	public Object getMsgHeader();
	
	public Object getMsgBody();
	
	//考虑是否应该使用set存储数据
	public List<Object> getClientEntitys();
	
	public void addClientEntity(Object entity);
	
	public void removeClientEntity(Object entityKey);
}
