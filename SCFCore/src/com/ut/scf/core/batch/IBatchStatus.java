package com.ut.scf.core.batch;

public interface IBatchStatus {
	public static final String BATCH_STATUS_INITLIAZED = "initliazed";
	public static final String BATCH_STATUS_RUNNING = "running";
	public static final String BATCH_STATUS_STOPPED = "stopped";
	public static final String BATCH_STATUS_STARTED = "started";
	public static final String BATCH_STATUS_PAUSE = "pause";
	public static final String BATCH_STATUS_DESTORYED = "destroyed";
	
	public void setBatchStatus(String status);
	
	/**
	 * running, stopped, started, pause, destroyed
	 * @return
	 */
	public String getBatchStatus();
	
	public void setBatchType(String type);
	
	/**
	 * M or A
	 * @return
	 */
	public String getBatchType();
	
	public String getBatchId();
	
	public void setBatchId(String id);
	
	public String getBatchName();
	
	public void setBatchName(String name);
}
