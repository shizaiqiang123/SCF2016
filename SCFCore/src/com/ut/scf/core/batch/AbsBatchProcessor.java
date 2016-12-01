package com.ut.scf.core.batch;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.ut.comm.xml.batch.BatchPara;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.task.TaskInfoFactory;

public abstract class AbsBatchProcessor implements IBatchComponent{
	
	protected Logger getLogger(){
		return APLogUtil.getBatchLogger();
	}
	
	@Resource(name = "batchManager")
	protected IBatchControl batchControl ;
	
	protected IBatchTask getBatchTask(BatchPara p){
		IBatchTask batchTask = new BatchTaskInfo();
		batchTask.setTask(TaskInfoFactory.getTaskInfo(p.getTask()));
		
		if(p.getAftertasks()!=null&&p.getAftertasks().size()>0){
			for (int i = 0; i < p.getAftertasks().size(); i++) {
				batchTask.appendAfterTask(TaskInfoFactory.getTaskInfo(p.getAftertasks().getTask(i)));
			}
		}
		
		if(p.getBeforetasks()!=null&&p.getBeforetasks().size()>0){
			for (int i = 0; i < p.getBeforetasks().size(); i++) {
				batchTask.appendBeforeTask(TaskInfoFactory.getTaskInfo(p.getAftertasks().getTask(i)));
			}
		}
		
		return batchTask;
	}

}
