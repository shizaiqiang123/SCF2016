package com.ut.scf.core.component.batch;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.batch.AbsRunableTask;

@Component("batchPrintProcessor")
@Scope("prototype")
public class BatchPrintProcessor extends AbsRunableTask{

	@Override
	public void execute() {
		TaskPara tp = (TaskPara) currentTask.getParam();
		getLogger().info(tp.getId());
	}

}
