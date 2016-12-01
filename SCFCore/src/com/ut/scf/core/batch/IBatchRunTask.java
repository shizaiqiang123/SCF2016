package com.ut.scf.core.batch;

import java.util.List;

import com.ut.scf.core.task.ITaskRunningInfo;

public interface IBatchRunTask {
	public List<ITaskRunningInfo> getBeforeTask();
	
	public List<ITaskRunningInfo> getAfterTask();
	
	public void appendBeforeTask(ITaskRunningInfo task);

	public void appendAfterTask(ITaskRunningInfo task);

	public void setTask(ITaskRunningInfo task);

	public ITaskRunningInfo getTask();
	
	public int getTotal();
}
