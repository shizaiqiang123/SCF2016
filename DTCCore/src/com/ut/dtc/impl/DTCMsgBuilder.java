package com.ut.dtc.impl;

import com.ut.dtc.intf.IMessageHeader;
import com.ut.dtc.intf.IMetadata;
import com.ut.dtc.intf.data.DTCMetadata;

public class DTCMsgBuilder {
//	private String metaMapping = "dtc_head";//参数定义之
//	private String msgTp;
//	private MsgTypeDefine define;
//	private String bodyMapping;
	private String channel;
	private final String CHANNEL_TYPE_HTTP = "http";
	private final String CHANNEL_TYPE_FTP = "ftp";
	
	IMessageHeader msgHeader;
	
	private static DTCMsgBuilder builder ;
	
	private DTCMsgBuilder(){
	}
	
	public static DTCMsgBuilder getInstence(String channel){
		if(builder==null){
			builder = new DTCMsgBuilder();
		}
		builder.channel = channel;
		return builder;
	}
	
	public IMetadata buildMetadata() throws Exception{
		IMetadata metaData = new DTCMetadata();
		
		String process = "";
		if(CHANNEL_TYPE_HTTP.equalsIgnoreCase(builder.channel)){
			process = "xmlMessageProcess";
		}else if(CHANNEL_TYPE_FTP.equalsIgnoreCase(builder.channel)){
			process = "excelMessageProcess";
		}else{
			
		}
		metaData.setProcessor(process);
		
		return metaData;
	}
}
