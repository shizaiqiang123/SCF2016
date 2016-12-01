package com.ut.scf.core.batch;

import javax.annotation.Resource;

import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.SchedulerException;
import org.quartz.TriggerKey;
import org.quartz.impl.triggers.CronTriggerImpl;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.batch.BatchPara;
import com.ut.comm.xml.batch.SchedulePara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.task.TasksPara;
import com.ut.scf.core.batch.run.BatchTaskRunInfo;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.task.ITaskRunningInfo;
import com.ut.scf.core.task.TaskInfoFactory;
import com.ut.scf.core.task.TaskRunningInfoImpl;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

@Component("autoBatchProcessor")
public class AutoBatchProcessor extends AbsBatchProcessor{

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
		BatchPara batch = (BatchPara) taskInfo;
		
		TriggerKey key = new TriggerKey(batch.getId());
		JobKey jobKey = new JobKey(batch.getId(), null);
		try {
			sechdule.getSchedule().resumeJob(jobKey);
			sechdule.getSchedule().resumeTrigger(key);
			
			IBatchStatus status = new BatchStatus();
			status.setBatchId(batch.getId());
			batchControl.getBatchStatus(status).setBatchStatus(IBatchStatus.BATCH_STATUS_STARTED);
		} catch (SchedulerException e) {
			getLogger().error("Batch ["+batch.getId()+"] destroy error:"+e.toString());
		}
		return null;
	}

	@Override
	public Object stopBatch(Object taskInfo) {
		BatchPara batch = (BatchPara) taskInfo;
		
		TriggerKey key = new TriggerKey(batch.getId());
		JobKey jobKey = new JobKey(batch.getId(), null);
		try {
			sechdule.getSchedule().pauseJob(jobKey);
			sechdule.getSchedule().pauseTrigger(key);
			
			IBatchStatus status = new BatchStatus();
			status.setBatchId(batch.getId());
			batchControl.getBatchStatus(status).setBatchStatus(IBatchStatus.BATCH_STATUS_STOPPED);
		} catch (SchedulerException e) {
			getLogger().error("Batch ["+batch.getId()+"] destroy error:"+e.toString());
		}
		return null;
	}
	@Resource(name = "scheduleManager")
	protected ISchedule sechdule;

	@Override
	public Object initialize(Object taskInfo) {
		try {
			BatchPara batch = (BatchPara) taskInfo;
			TaskPara task = batch.getTask();
			ApSessionContext context = ApSessionUtil.getContext();
			XMLParaParseHelper.parseTaskPara(task,context.getSysBusiUnit());
	
			String clazz = task.getComponent();
			if (StringUtil.isTrimNotEmpty(clazz)) {
				Object instence = ClassLoadHelper.getComponentClass(clazz);
				JobBuilder jb = JobBuilder.newJob((Class<? extends Job>) instence.getClass());
				
				IBatchRunTask runableTask = new BatchTaskRunInfo();
				TasksPara bTasks = batch.getBeforetasks();
				TasksPara aTasks = batch.getAftertasks();
				for (int i = 0; bTasks!=null && i < bTasks.size(); i++) {
					ITaskRunningInfo info = new TaskRunningInfoImpl();
					info.setParam(bTasks.getTask(i));
					info.setTaskId(bTasks.getTask(i).getId());
					runableTask.appendBeforeTask(info);
				}
				for (int i = 0;aTasks!=null && i < aTasks.size(); i++) {
					ITaskRunningInfo info = new TaskRunningInfoImpl();
					info.setParam(aTasks.getTask(i));
					info.setTaskId(aTasks.getTask(i).getId());
					runableTask.appendAfterTask(info);
				}
				ITaskRunningInfo info = new TaskRunningInfoImpl();
				info.setParam(task);
				info.setTaskId(task.getId());
				runableTask.setTask(info);
				
				SchedulePara schdule = batch.getSchedule();
				
				JobKey jobKey = new JobKey(batch.getId(), null);
				JobDetail jobDetail = jb.withDescription(batch.getDesc()).withIdentity(jobKey).build();
				jobDetail.getJobDataMap().put("_taskInfo", runableTask);
				TriggerKey key = new TriggerKey(batch.getId());
				CronTriggerImpl trigger = new CronTriggerImpl(batch.getId());
				trigger.setKey(key);
//				trigger.setCronExpression("*/10 * * * * ?");
				trigger.setCronExpression(schdule.getExpress());
				if(StringUtil.isTrimNotEmpty(schdule.getBeginfrom()))
					trigger.setStartTime(DateTimeUtil.getDateTime(schdule.getBeginfrom()));
				if(StringUtil.isTrimNotEmpty(schdule.getTerminativedate()))
					trigger.setEndTime(DateTimeUtil.getDateTime(schdule.getTerminativedate()));
				
				sechdule.getSchedule().scheduleJob(jobDetail, trigger);
				
				if(!"S".equalsIgnoreCase(schdule.getInitialize())){
					sechdule.getSchedule().pauseJob(jobKey);					
					sechdule.getSchedule().pauseTrigger(key);					
					
				}
			}
		} catch (SchedulerException e) {
//			e.printStackTrace();
			getLogger().error("Batch initialize error:"+e.toString());
		} catch (Exception e) {
//			e.printStackTrace();
			getLogger().error("Batch initialize error:"+e.toString());
		}
		return null;
	}

	@Override
	public Object destroy(Object taskInfo) {
		BatchPara batch = (BatchPara) taskInfo;
		TriggerKey key = new TriggerKey(batch.getId());
		JobKey jobKey = new JobKey(batch.getId());
		boolean resutl = false;
		try {
			resutl = sechdule.getSchedule().unscheduleJob(key);
			resutl = sechdule.getSchedule().deleteJob(jobKey);
			IBatchStatus status = new BatchStatus();
			status.setBatchId(batch.getId());
			batchControl.getBatchStatus(status).setBatchStatus(IBatchStatus.BATCH_STATUS_DESTORYED);
		} catch (SchedulerException e) {
			getLogger().error("Batch ["+batch.getId()+"] destroy error:"+e.toString());
		}
		return resutl;
	}

	@Override
	public Object runBatch(Object taskInfo) {
		ITaskRunningInfo tInfo = (ITaskRunningInfo) taskInfo;
		BatchPara parm = (BatchPara) tInfo.getParam();
		
		IBatchStatus status = new BatchStatus();
		status.setBatchId(parm.getId());
		batchControl.getBatchStatus(status).setBatchStatus(IBatchStatus.BATCH_STATUS_RUNNING);
		
		TaskPara taskPara = parm.getTask();
		ApSessionContext context = ApSessionUtil.getContext();
		XMLParaParseHelper.parseTaskPara(taskPara,context.getSysBusiUnit());
		String clazz = taskPara.getComponent();
		TasksPara bTasks = parm.getBeforetasks();
		TasksPara aTasks = parm.getAftertasks();

		if (StringUtil.isTrimNotEmpty(clazz)) {
			try {
				IAutoRunableTask task = ClassLoadHelper.getComponentClass(clazz);
				for (int i = 0; bTasks!=null && i < bTasks.size(); i++) {
					ITaskRunningInfo info = tInfo.clone();
					info.setParam(bTasks.getTask(i));
					task.appendBeforeTask(info);
				}
				for (int i = 0; aTasks!=null && i < aTasks.size(); i++) {
					ITaskRunningInfo info = tInfo.clone();
					info.setParam(aTasks.getTask(i));
					task.appendAfterTask(info);
				}
				ITaskRunningInfo info = tInfo.clone();
				info.setParam(taskPara);

				task.setTaskInfo(info);
				
				task.excuteTask(info);
			} catch (ClassNotFoundException e) {
//				e.printStackTrace();
				getLogger().error("Batch initialize error:"+e.toString());
			}
		}
		
		batchControl.getBatchStatus(status).setBatchStatus(IBatchStatus.BATCH_STATUS_STARTED);
		return null;
	}
}
