package com.ut.scf.core.batch;

import org.quartz.Job;

import com.ut.scf.core.task.ITaskExcute;
import com.ut.scf.core.task.ITaskRunningInfo;

public interface IAutoRunableTask extends Job,ITaskExcute{
	public void appendBeforeTask(ITaskRunningInfo task);
	
	public void appendAfterTask(ITaskRunningInfo task);
	
	public void setTaskInfo(ITaskRunningInfo taskInfo);
}
