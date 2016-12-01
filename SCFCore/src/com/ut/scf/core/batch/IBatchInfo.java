package com.ut.scf.core.batch;

import java.util.List;

import com.ut.scf.core.task.ITaskInfo;

public interface IBatchInfo extends IBatchStatus{
//	public void appendBeforeTask(ITaskInfo task);
//
////	public List<ITaskInfo> getBeforeTask();
//	
//	public void appendAfterTask(ITaskInfo task);
//
////	public List<ITaskInfo> getAfterTask();
//	
//	public void setTask(ITaskInfo task);
//
//	public ITaskInfo getTask();
	
	public void setBatchTask(IBatchTask task);
//
//	public IBatchTask getTask();
	
}
