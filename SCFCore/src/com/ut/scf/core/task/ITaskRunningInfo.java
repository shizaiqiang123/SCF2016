package com.ut.scf.core.task;

import net.sf.json.JSONObject;

import com.ut.comm.xml.AbsObject;

public interface ITaskRunningInfo extends Cloneable {
	public void setTaskId(String taskId);
	
	public String getTaskId();
	
	public void setParam(AbsObject param);
	
	public AbsObject getParam();
	
	public void setData(JSONObject reqData);
	
	public JSONObject getData();
	
	public ITaskRunningInfo clone();
}
