package com.ut.scf.core.batch;

import java.util.ArrayList;
import java.util.List;

import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.slf4j.Logger;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.batch.run.BatchTaskRunInfo;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.task.ITaskExcute;
import com.ut.scf.core.task.ITaskRunningInfo;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;

public abstract class AbsRunableTask implements IAutoRunableTask {
	protected Logger getLogger() {
		return APLogUtil.getBatchLogger();
	}
	
	private long processId;
	
	protected String formatLogger(String ... msg){
		StringBuffer buff = new StringBuffer();
		buff.append("process id:").append(processId).append(",");
		for (String string : msg) {
			buff.append(string).append(" ");
		}
		return buff.toString();
	}
	
//	@Resource(name = "logicFactory")
	protected ILogicFactory logicFactory ;
	
//	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	
//	@Resource(name = "queryFactory")
	protected IQueryFactory queryFactory;	

	protected List<ITaskRunningInfo> beforTask = new ArrayList<ITaskRunningInfo>();

	protected List<ITaskRunningInfo> afterTask = new ArrayList<ITaskRunningInfo>();

	protected ITaskRunningInfo currentTask;

//	@Resource(name = "taskProcessor")
	protected ITaskExcute taskProcess;

	@Override
	public void appendBeforeTask(ITaskRunningInfo task) {
		beforTask.add(task);
	}

	@Override
	public void appendAfterTask(ITaskRunningInfo task) {
		afterTask.add(task);
	}

	/**
	 * for auto process task
	 */
	public void setTaskInfo(ITaskRunningInfo taskInfo) {
		currentTask = taskInfo;
	}

	public void execute(JobExecutionContext context) {
		setProcessId(System.currentTimeMillis());
		JobDataMap map = context.getJobDetail().getJobDataMap();
		BatchTaskRunInfo info = (BatchTaskRunInfo) map.get("_taskInfo");
		currentTask = info.getTask();
		getLogger().debug("run task begin:" + currentTask.getTaskId());
		try {
			daoHelper = ClassLoadHelper.getComponentClass("daoHelper");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			logicFactory = ClassLoadHelper.getComponentClass("logicFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			queryFactory = ClassLoadHelper.getComponentClass("queryFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			taskProcess = ClassLoadHelper.getComponentClass("taskProcessor");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			jsEngine = ClassLoadHelper.getComponentClass("taskJsEngine");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		IBatchRunTask taskInfo = (IBatchRunTask) context.getJobDetail().getJobDataMap().get("_taskInfo");

		beforTask = taskInfo.getBeforeTask();

		afterTask = taskInfo.getAfterTask();

		currentTask = taskInfo.getTask();

		excuteTask(currentTask);
		
		getLogger().debug("run task end:" + currentTask.getTaskId());
	}

	@Override
	public Object excuteTask(ITaskRunningInfo taskInfo) {
		getLogger().debug("run task :" + taskInfo.getTaskId());
		
		try {
			daoHelper = ClassLoadHelper.getComponentClass("daoHelper");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			logicFactory = ClassLoadHelper.getComponentClass("logicFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			queryFactory = ClassLoadHelper.getComponentClass("queryFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			taskProcess = ClassLoadHelper.getComponentClass("taskProcessor");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			jsEngine = ClassLoadHelper.getComponentClass("taskJsEngine");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		if (beforTask != null) {
			for (ITaskRunningInfo iTaskInfo : beforTask) {
				if (taskProcess == null) {
					try {
						taskProcess = ClassLoadHelper.getComponentClass("taskProcessor");
					} catch (ClassNotFoundException e) {
						getLogger().error(e.toString());
						break;
					} catch (Exception e) {
						getLogger().error(e.toString());
						break;
					}
				}
				getLogger().debug("run beforTask begin:" + iTaskInfo.getTaskId());
				taskProcess.excuteTask(iTaskInfo);
				getLogger().debug("run beforTask end:" + iTaskInfo.getTaskId());
			}
		}

		setTaskInfo(taskInfo);

		getLogger().debug("run taskProcess begin:" + taskInfo.getTaskId());
		execute();
		getLogger().debug("run taskProcess end:" + taskInfo.getTaskId());

		if (afterTask != null) {
			for (ITaskRunningInfo iTaskInfo : afterTask) {
				if (taskProcess == null) {
					try {
						taskProcess = ClassLoadHelper.getComponentClass("taskProcessor");
					} catch (ClassNotFoundException e) {
						getLogger().error(e.toString());
						break;
					} catch (Exception e) {
						getLogger().error(e.toString());
						break;
					}
				}
				getLogger().debug("run afterTask begin:" + iTaskInfo.getTaskId());
				taskProcess.excuteTask(iTaskInfo);
				getLogger().debug("run afterTask end:" + iTaskInfo.getTaskId());
			}
		}
		return null;
	}

	public abstract void execute();
	
	public void print(Object msg){
		if(getLogger()!=null){
			getLogger().debug(msg.toString());
		}
	}
	
	public void printError(Object msg){
		if(getLogger()!=null){
			getLogger().error(msg.toString());
		}
	}
	
	public void printWarning(Object msg){
		if(getLogger()!=null){
			getLogger().warn(msg.toString());
		}
	}
	
//	@Resource(name = "taskJsEngine")
	protected IServerSideJs jsEngine;
	
	protected Object runTaskJsEnginee(TaskPara tPara ,Object msg){
		String jsFile = tPara.getJs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			jsEngine.initTrxData(msg);
			jsEngine.initTrxPara(tPara);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				getLogger().error(ErrorUtil.getErrorStackTrace(e));
				return null;
			}
			
			return jsEngine.getTrxData();
		}
		return msg;
	}

	public void setProcessId(long processId) {
		this.processId = processId;
	}
}
