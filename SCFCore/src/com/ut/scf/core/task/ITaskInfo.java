package com.ut.scf.core.task;

public interface ITaskInfo extends ITaskStatus{
	public void setTaskName(String taskName);
	
	public String getTaskName();
	
	public void setTaskComponent(String component);
	
	public String getTaskComponent();
	
	public void setParentId(String pId);
}
