package com.ut.scf.mule;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ESBServerInstence implements IESBServer{
	private static IESBServer server ;
	
	public static IESBServer getESBServer(){
		if(server==null){
			server = new ESBServerInstence();
		}
		return server;
	}
	
	private ESBServerInstence(){
		
	}
	
	private Map<String,Object> regiestedClient = new ConcurrentHashMap<String,Object>();

	@Override
	public Object regiest(Object client) {
		return null;
	}

	@Override
	public Object unregiest(Object client) {
		return null;
	}

	@Override
	public IESBChannel connect() {
		return null;
	}

	@Override
	public Object disconnect() {
		return null;
	}

}
