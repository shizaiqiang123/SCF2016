package com.ut.scf.core.task;

public class TaskInfo implements ITaskInfo{
	
	private String taskId;
	private String taskStatus;
	
	private String taskName;
	private String taskComponent;
	private String _parentId;
	private String id;

	@Override
	public void setTaskId(String tas) {
		this.taskId = tas;
		this.id = tas;
	}

	@Override
	public String getTaskId() {
		return taskId;
	}

	@Override
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}

	@Override
	public String getTaskStatus() {
		return taskStatus;
	}

	@Override
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	@Override
	public String getTaskName() {
		return taskName;
	}

	@Override
	public void setTaskComponent(String component) {
		taskComponent = component;
	}

	@Override
	public String getTaskComponent() {
		return taskComponent;
	}

	@Override
	public void setParentId(String pId) {
		this._parentId = pId;
	}

	public String get_parentId() {
		return _parentId;
	}

	public String getId() {
		return id;
	}
	
}
