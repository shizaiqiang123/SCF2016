package com.ut.scf.core.task;

import net.sf.json.JSONObject;

import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.AbsObject;

public class TaskRunningInfoImpl implements ITaskRunningInfo{
	private String taskId;
	
	private JSONObject reqData;
	
	private AbsObject taskPara;

	@Override
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	@Override
	public String getTaskId() {
		return taskId;
	}

	@Override
	public void setParam(AbsObject param) {
		this.taskPara = param;
	}

	@Override
	public AbsObject getParam() {
		return this.taskPara;
	}

	@Override
	public void setData(JSONObject reqData) {
		this.reqData = reqData;
	}

	@Override
	public JSONObject getData() {
		return this.reqData;
	}
	
	public TaskRunningInfoImpl clone(){
		TaskRunningInfoImpl o = null;
		try {
			o = (TaskRunningInfoImpl) super.clone();
			JSONObject oldReq = this.getData();
			if(oldReq!=null){
				String strOld = oldReq.toString();
				JSONObject newReq = JsonUtil.getJsonObj(strOld);
				o.reqData = newReq;
			}
			AbsObject oldPara = this.getParam();
			if(oldPara!=null){
				o.setParam(oldPara.clone());
			}
			
		} catch (CloneNotSupportedException e) {
			return this;
		} 
		return o;
	}
}
