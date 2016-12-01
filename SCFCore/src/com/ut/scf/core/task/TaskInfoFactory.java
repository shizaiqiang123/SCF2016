package com.ut.scf.core.task;

import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;

public class TaskInfoFactory {
	public static ITaskRunningInfo getTaskRunningInfo(TaskPara para){
		ITaskRunningInfo taskInfo = new TaskRunningInfoImpl();
		taskInfo.setTaskId(para.getId());
		
		return taskInfo;
	}
	
	public static ITaskInfo getTaskInfo(TaskPara para){
		ApSessionContext context = ApSessionUtil.getContext();
		XMLParaParseHelper.parseTaskPara(para,context.getSysBusiUnit());
		ITaskInfo taskInfo = new TaskInfo();
		taskInfo.setTaskId(para.getId());
		taskInfo.setTaskComponent(para.getComponent());
		taskInfo.setTaskName(para.getName());
		taskInfo.setTaskStatus(ITaskInfo.TASK_STATUS_TODO);
		return taskInfo;
	}
}
