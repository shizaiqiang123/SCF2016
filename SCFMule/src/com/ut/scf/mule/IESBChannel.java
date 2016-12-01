package com.ut.scf.mule;

public interface IESBChannel {
	
	public boolean isConnect();
	
	public Object sendMessage(Object message);
	
	public Object sendMessage(Object message,boolean sync);
	
	public Object receiveMessage();
	
}
