package com.ut.scf.core.batch;

import java.util.ArrayList;
import java.util.List;

import com.ut.scf.core.task.ITaskInfo;
import com.ut.scf.core.task.TaskInfo;

public class BatchTaskInfo implements IBatchTask{
	private List<ITaskInfo> beforeTask = new ArrayList<ITaskInfo>();
	private List<ITaskInfo> afterTask = new ArrayList<ITaskInfo>();
	private List<ITaskInfo> currTask = new ArrayList<ITaskInfo>();

	List<Object> batchTask = new ArrayList<Object>();
	
	private int total = 0;
	private String beforeTaskId = "_bId";
	private String afterTaskId = "_aId";
	private String currTaskId = "_cId";
	
	@Override
	public void appendBeforeTask(ITaskInfo task) {
		if(beforeTask.isEmpty()){
			ITaskInfo beforeKey = new TaskInfo();
			beforeKey.setTaskId(beforeTaskId);
			beforeKey.setTaskName("Before Tasks");
			beforeTask.add(beforeKey);
			total++;
		}
		task.setParentId(beforeTaskId);
		beforeTask.add(task);
		total++;
	}


	@Override
	public void appendAfterTask(ITaskInfo task) {
		if(afterTask.isEmpty()){
			ITaskInfo afterKey = new TaskInfo();
			afterKey.setTaskId(afterTaskId);
			afterKey.setTaskName("After Tasks");
			afterTask.add(afterKey);
			total++;
		}
		task.setParentId(afterTaskId);
		afterTask.add(task);
		total++;
	}

	@Override
	public void setTask(ITaskInfo task) {
		ITaskInfo currKey = new TaskInfo();
		currKey.setTaskId(currTaskId);
		currKey.setTaskName("Currently Task");
		currTask.add(currKey);
		total++;
		task.setParentId(currTaskId);
		currTask.add(task);
		total++;
	}


	public int getTotal() {
		return total;
	}

	@Override
	public List<Object> getBatchTask() {
		batchTask.clear();
		batchTask.addAll(beforeTask);
		batchTask.addAll(currTask);
		batchTask.addAll(afterTask);
		return batchTask;
	}
}
