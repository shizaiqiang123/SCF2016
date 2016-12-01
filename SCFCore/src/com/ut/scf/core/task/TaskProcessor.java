package com.ut.scf.core.task;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.utils.ClassLoadHelper;

@Component
public class TaskProcessor implements ITaskExcute{

	@Override
	public Object excuteTask(ITaskRunningInfo taskInfo) {
		ITaskRunningInfo tInfo = (ITaskRunningInfo) taskInfo;
		TaskPara parm = (TaskPara) tInfo.getParam();
		String clazz = parm.getComponent();
		if (StringUtil.isTrimNotEmpty(clazz)) {
			try {
				ITaskExcute task = ClassLoadHelper.getComponentClass(clazz);
				task.excuteTask(taskInfo);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

}
