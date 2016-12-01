package com.ut.scf.mule;

public interface IESBServer {
	public Object regiest(Object client);
	
	public Object unregiest(Object client);
	
	public IESBChannel connect();
	
	public Object disconnect();
}
