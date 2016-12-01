package com.ut.scf.core.task;

public interface ITaskStatus {
	public final String TASK_STATUS_TODO="ToDo";
	public final String TASK_STATUS_DOING="Doing";
	public final String TASK_STATUS_DOWN="Down";

	public void setTaskId(String taskId);
	
	public String getTaskId();
	
	public void setTaskStatus(String taskStatus);
	
	/**
	 * ToDo : 未执行
	 * Doing ： 正在执行
	 * Down : 已执行
	 * @return
	 */
	public String getTaskStatus();
	
}
