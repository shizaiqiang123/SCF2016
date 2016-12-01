package com.ut.scf.core.batch;

public interface IBatchComponent {
	/**
	 * 获取当前Batch 状态信息
	 * @return
	 */
	public Object getBatch(Object taskInfo);
	/**
	 * 启动当前Batch task 任务
	 * Auto Task 执行一次及结束
	 * Manual Task 启动 schedule
	 * @return
	 */
	public Object startBatch(Object taskInfo);
	/**
	 * 停止当前Batch task 任务
	 * @return
	 */
	public Object stopBatch(Object taskInfo);
	
	/**
	 * 初始化当前Batch task 任务
	 * @return
	 */
	public Object initialize(Object taskInfo);
	
	/**
	 * 销毁当前Batch task 任务
	 * @return
	 */
	public Object destroy(Object taskInfo);
	
	/**
	 * 立即执行当前Batch
	 * @param taskInfo
	 * @return
	 */
	public Object runBatch(Object taskInfo);

}
