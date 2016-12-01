package com.ut.scf.core.batch;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.task.ITaskInfo;

public interface IBatchTask {
	public List<Object> getBatchTask();
	
	public void appendBeforeTask(ITaskInfo task);

	public void appendAfterTask(ITaskInfo task);

	public void setTask(ITaskInfo task);

//	public ITaskInfo getTask();
	
	public int getTotal();
}
