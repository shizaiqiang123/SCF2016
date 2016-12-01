package com.ut.scf.core.batch;

public interface IBatchControl {
	/**
	 * 查询所有batch，包括当前运行状态
	 * @return
	 */
	public Object inqBatch();
	/**
	 * 查询当前batch，包括当前运行状态
	 * @return
	 */	
	public Object queryBatch(String bu);
	
	/**
	 * 启动所有batch 但是不等于执行所有task
	 * @return
	 */
	public Object startBatch();
	/**
	 * 按bu启动所有batch 但是不等于执行所有task
	 * @return
	 */
	public Object startBatchByBu(String bu);
	/**
	 * 停止所有batch 但是基于执行所有task任务完成之后
	 * @return
	 */
	public Object stopBatch();
	
	/**
	 * 按bu停止所有batch 但是基于执行所有task任务完成之后
	 * @return
	 */
	public Object stopBatchByBu(String bu);
	public boolean containsBatch(IBatchInfo info);
	
	Object getBatch(IBatchInfo info);
	
	IBatchStatus getBatchStatus(IBatchStatus info);
}
