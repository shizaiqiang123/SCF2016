package com.ut.scf.web.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.string.StringUtil;

public class WebLogUtil {
	public static Logger getWebLogger(String loggerName){
		if(StringUtil.isTrimEmpty(loggerName))
			loggerName = "webLog";
		return  LoggerFactory.getLogger(loggerName);
	}
	
	public static Logger getWebErrorLogger(){
		String loggerName = "errorLog";
		return  LoggerFactory.getLogger(loggerName);
	}
	
	public static Logger getWebInfoLogger(){
		String loggerName = "infoLog";
		return  LoggerFactory.getLogger(loggerName);
	}
	
	public static Logger getWebESBLogger(){
		String loggerName = "esbLog";
		return  LoggerFactory.getLogger(loggerName);
	}
}
