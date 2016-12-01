package com.ut.scf.core.batch;

import javax.annotation.Resource;

import org.quartz.JobKey;
import org.quartz.SchedulerException;
import org.quartz.TriggerKey;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.batch.BatchPara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.task.TasksPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.task.ITaskRunningInfo;
import com.ut.scf.core.task.TaskInfoFactory;
import com.ut.scf.core.task.TaskRunningInfoImpl;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

@Component("manualBatchProcessor")
public class ManualBatchProcessor extends AbsBatchProcessor{

	@Resource(name = "scheduleManager")
	protected ISchedule sechdule;
	
	@Override
	public Object getBatch(Object taskInfo) {
		IBatchInfo batch = (IBatchInfo) taskInfo;
		BatchPara p = (BatchPara) batchControl.getBatch(batch);
		IBatchStatus status = batchControl.getBatchStatus(batch);
		batch.setBatchId(p.getId());
		batch.setBatchName(p.getName());
		batch.setBatchStatus(status.getBatchStatus());
		batch.setBatchTask(getBatchTask(p));
		
		return batch;
	}

	@Override
	public Object startBatch(Object taskInfo) {		
		ITaskRunningInfo taskRunningInfo = new TaskRunningInfoImpl();
		BatchPara batch = (BatchPara) taskInfo;
		taskRunningInfo.setData(null);
		taskRunningInfo.setTaskId(batch.getId());
		taskRunningInfo.setParam(batch);
		return runBatch(taskRunningInfo);
	}

	@Override
	public Object stopBatch(Object taskInfo) {		
		return null;
	}

	@Override
	public Object initialize(Object taskInfo) {
		return null;
	}

	@Override
	public Object destroy(Object taskInfo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object runBatch(Object taskInfo) {
		ITaskRunningInfo tInfo = (ITaskRunningInfo) taskInfo;
		BatchPara parm = (BatchPara) tInfo.getParam();
		TaskPara taskPara = parm.getTask();
		ApSessionContext context = ApSessionUtil.getContext();
		XMLParaParseHelper.parseTaskPara(taskPara,context.getSysBusiUnit());
		String clazz = taskPara.getComponent();
		TasksPara bTasks = parm.getBeforetasks();
		TasksPara aTasks = parm.getAftertasks();

		if (StringUtil.isTrimNotEmpty(clazz)) {
			try {
				IAutoRunableTask task = ClassLoadHelper.getComponentClass(clazz);
				for (int i = 0;bTasks!=null && i < bTasks.size(); i++) {
					ITaskRunningInfo info = tInfo.clone();
					info.setParam(bTasks.getTask(i));
					task.appendBeforeTask(info);
				}
				for (int i = 0;aTasks!=null && i < aTasks.size(); i++) {
					ITaskRunningInfo info = tInfo.clone();
					info.setParam(aTasks.getTask(i));
					task.appendAfterTask(info);
				}
				ITaskRunningInfo info = tInfo.clone();
				info.setParam(taskPara);

				task.excuteTask(info);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

}
