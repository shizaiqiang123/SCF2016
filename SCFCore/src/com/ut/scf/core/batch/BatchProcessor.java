package com.ut.scf.core.batch;

import javax.annotation.Resource;





import org.springframework.stereotype.Component;

import com.ut.comm.xml.batch.BatchPara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.task.ITaskRunningInfo;

@Component("batchProcessor")
public class BatchProcessor implements IBatchComponent{
	@Resource(name = "batchFactoryImpl")
	private BatchFactoryImpl impl ;

	@Override
	public Object getBatch(Object batchInfo) {
		IBatchInfo batch = (IBatchInfo) batchInfo;
		String batchType = batch.getBatchType();
		IBatchComponent processor = impl.getBatchImpl(batchType);
		Object processResult = null ;
		if(processor!=null){
			processResult = processor.getBatch(batchInfo);
		}
		return processResult;
	}

	@Override
	public Object startBatch(Object batchInfo) {
		BatchPara batch = (BatchPara) batchInfo;
		String batchType = batch.getType();
		IBatchComponent processor = impl.getBatchImpl(batchType);
		Object processResult = null ;
		if(processor!=null){
			processResult = processor.startBatch(batchInfo);
		}
		return processResult;
	}

	@Override
	public Object stopBatch(Object batchInfo) {
		BatchPara batch = (BatchPara) batchInfo;
		String batchType = batch.getType();		
		IBatchComponent processor = impl.getBatchImpl(batchType);
		Object processResult = null ;
		if(processor!=null){
			processResult = processor.stopBatch(batchInfo);
		}
		return processResult;
	}

	@Override
	public Object initialize(Object batchInfo) {
		BatchPara batch = (BatchPara) batchInfo;
		String batchType = batch.getType();
		IBatchComponent processor = impl.getBatchImpl(batchType);
		Object processResult = null ;
		if(processor!=null){
			processResult = processor.initialize(batchInfo);
		}
		return processResult;
	}

	@Override
	public Object destroy(Object batchInfo) {
		BatchPara parm = (BatchPara) batchInfo;
		String batchType = parm.getType();
		IBatchComponent processor = impl.getBatchImpl(batchType);
		Object processResult = null ;
		if(processor!=null){
			processResult = processor.destroy(batchInfo);
		}
		return processResult;
	}

	@Override
	public Object runBatch(Object batchInfo) {
		ITaskRunningInfo tInfo = (ITaskRunningInfo) batchInfo;
		BatchPara parm = (BatchPara) tInfo.getParam();
		String batchType = parm.getType();
		IBatchComponent processor = impl.getBatchImpl(batchType);
		Object processResult = null ;
		if(processor!=null){
			processResult = processor.runBatch(batchInfo);
		}
		return processResult;
	}
}