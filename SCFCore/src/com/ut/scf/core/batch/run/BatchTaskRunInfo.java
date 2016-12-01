package com.ut.scf.core.batch.run;

import java.util.ArrayList;
import java.util.List;

import com.ut.scf.core.batch.IBatchRunTask;
import com.ut.scf.core.task.ITaskRunningInfo;

public class BatchTaskRunInfo implements IBatchRunTask{
	private List<ITaskRunningInfo> beforeTask = new ArrayList<ITaskRunningInfo>();
	private List<ITaskRunningInfo> afterTask = new ArrayList<ITaskRunningInfo>();
	private ITaskRunningInfo currTask ;
	private int total = 0;
	@Override
	public List<ITaskRunningInfo> getBeforeTask() {
		return beforeTask;
	}

	@Override
	public List<ITaskRunningInfo> getAfterTask() {
		return afterTask;
	}

	@Override
	public void appendBeforeTask(ITaskRunningInfo task) {
		beforeTask.add(task);
		total++;
	}

	@Override
	public void appendAfterTask(ITaskRunningInfo task) {
		afterTask.add(task);
		total++;
	}

	@Override
	public void setTask(ITaskRunningInfo task) {
		currTask = task;
		total++;
	}

	@Override
	public ITaskRunningInfo getTask() {
		return currTask;
	}

	@Override
	public int getTotal() {
		return total;
	}

}
