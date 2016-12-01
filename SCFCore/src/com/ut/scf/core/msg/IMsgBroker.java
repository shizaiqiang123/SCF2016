package com.ut.scf.core.msg;

import java.util.List;

public interface IMsgBroker {
	public void setGapi(String gapiid);
	public List<Object> runReceiveMsg() throws Exception;
}
