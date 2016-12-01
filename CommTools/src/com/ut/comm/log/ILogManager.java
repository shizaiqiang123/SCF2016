package com.ut.comm.log;

import com.ut.comm.log.log4j.SCFLogger;

public interface ILogManager {
	public SCFLogger getLogger(String logName,String bu,String userId);
	
	public SCFLogger getLogger(String logName,String bu);
	
	public SCFLogger getLogger(String logName);
	
	public void initlize();
	
	public void shutdown();
}
