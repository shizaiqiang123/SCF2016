package com.ut.scf.core.batch;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.quartz.SchedulerException;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.batch.BatchPara;
import com.ut.comm.xml.batch.BatchsPara;
import com.ut.scf.core.conf.SysBussinessUnitConfig;
import com.ut.scf.core.log.APLogUtil;

@Component("batchManager")
public class BatchManager implements IBatchManager,IBatchControl{
	protected Logger getLogger(){
		return APLogUtil.getBatchLogger();
	}
	
	private static IBatchManager batchManager;
	
	public static boolean frameworkStatus = true;
	
	@Resource(name = "batchProcessor")
	private IBatchComponent batchProcessor ;
	
	@Resource(name = "scheduleManager")
	protected ISchedule sechdule;
	
	//是否需要缓存所有batch job
	private Map<String,BatchPara> regiestedBatch = new ConcurrentHashMap<String,BatchPara>();
	private Map<String,Map<String,BatchPara>> regiestedBatchs = new ConcurrentHashMap<String,Map<String,BatchPara>>();//定义加载内存

	private List<IBatchStatus> allBatch = new ArrayList<IBatchStatus>();
	private Map<String,List<IBatchStatus>> allBatchs = new ConcurrentHashMap<String,List<IBatchStatus>>();
	private BatchManager(){
		
	}
	
	public static IBatchManager getBatchManager(){
		if(batchManager==null)
			batchManager = new BatchManager();
		return batchManager;
	}
	
	@Override
	public void initialize() {
		getLogger().debug("initialize batch manager...");
		boolean isOn = false;
		try {
			sechdule.getSchedule().start();
			isOn = true;
		} catch (SchedulerException e) {
			getLogger().error("Schedule start failed:"+e.toString());
		}
		
		if(isOn){
			//遍历所有保理商路径，逐个处理各保理商配置的参数
			List<String> bus = SysBussinessUnitConfig.getBuList();
			for (String bu : bus) {
				Map<String,BatchPara> buRegiestedBatch = new ConcurrentHashMap<String,BatchPara>();
				BatchsPara batchList = XMLParaParseHelper.parseBatchsPara(bu);
				List<IBatchStatus> buList = new ArrayList<IBatchStatus>();
				if(batchList.size()>0){
					for (int batchIndex = 0; batchIndex < batchList.size(); batchIndex++) {
						BatchPara batch = batchList.getBatch(batchIndex);
						IBatchStatus status = new BatchStatus();
						status.setBatchId(batch.getId());
						status.setBatchName(batch.getName());
						status.setBatchType(batch.getType());
						batchProcessor.initialize(batch);
						changeBatchStatus(batch,status);					
						regiestedBatch.put(batch.getId(), batch);
						buRegiestedBatch.put(batch.getId(), batch);
						allBatch.add(status);
						buList.add(status);
					}
				}
				allBatchs.put(bu, buList);//加载bu下任务列表
				regiestedBatchs.put(bu, buRegiestedBatch);//注册bulist加载任务
			}
			getLogger().debug("initialize batch manager success.");
		}else{
			getLogger().debug("initialize batch manager failed.");
		}
		
	}

	private void changeBatchStatus(BatchPara batch, IBatchStatus status) {
		String batchType = batch.getType();
		if("M".equalsIgnoreCase(batchType)){
			status.setBatchStatus(IBatchStatus.BATCH_STATUS_INITLIAZED);
		}
		if("A".equalsIgnoreCase(batchType)){
			String initType = batch.getSchedule().getInitialize();
			if("S".equalsIgnoreCase(initType)){
				status.setBatchStatus(IBatchStatus.BATCH_STATUS_STARTED);
			}else if("E".equalsIgnoreCase(initType)){
				status.setBatchStatus(IBatchStatus.BATCH_STATUS_STOPPED);
			}else{
				status.setBatchStatus(IBatchStatus.BATCH_STATUS_STARTED);
			}
			
		}
	}

	@Override
	public void shutdown() {
		getLogger().debug("shutdown batch manager...");
		if (!frameworkStatus) {
			return;
		}
		if (!regiestedBatch.isEmpty()) {
			for (Entry<String, BatchPara> entry : regiestedBatch.entrySet()) {
				BatchPara value = entry.getValue();
				batchProcessor.destroy(value);
			}
		}
		sechdule.shutdown();
		getLogger().debug("shutdown batch manager success.");
	}

	@Override
	public Object inqBatch() {
		getLogger().debug("inquery all batchs ...");
		return allBatch;
	}
	public Object queryBatch(String bu){
		getLogger().debug("inquery all batchs ...");
		String strBu =bu;
		return allBatchs.get(strBu);
	}
	@Override
	public Object startBatch() {
		getLogger().debug("start all batchs ...");
		if (!regiestedBatch.isEmpty()) {
			for (Entry<String, BatchPara> entry : regiestedBatch.entrySet()) {
				BatchPara value = entry.getValue();
				batchProcessor.startBatch(value);
			}
		}
		return null;
	}

	@Override
	public Object stopBatch() {
		getLogger().debug("stop all batchs ...");
		if (!regiestedBatch.isEmpty()) {
			for (Entry<String, BatchPara> entry : regiestedBatch.entrySet()) {
				BatchPara value = entry.getValue();
				batchProcessor.stopBatch(value);
			}
		}
		return null;
	}

	@Override
	public boolean containsBatch(IBatchInfo info) {
		return regiestedBatch.containsKey(info.getBatchId());
	}

	@Override
	public Object getBatch(IBatchInfo info) {
		return regiestedBatch.get(info.getBatchId());
	}

	@Override
	public IBatchStatus getBatchStatus(IBatchStatus info) {
		if(allBatch.contains(info)){
			return allBatch.get(allBatch.indexOf(info));
		}
		return null;
	}

	@Override
	public Object startBatchByBu(String bu) {
		getLogger().debug("start all batchs ...");
		if (!regiestedBatchs.get(bu).isEmpty()) {
			for (Entry<String, BatchPara> entry : regiestedBatchs.get(bu).entrySet()) {
				BatchPara value = entry.getValue();
				batchProcessor.startBatch(value);
			}
		}
		return null;
	}

	@Override
	public Object stopBatchByBu(String bu) {
		getLogger().debug("stop all batchs ...");
		if (!regiestedBatchs.get(bu).isEmpty()) {
			for (Entry<String, BatchPara> entry : regiestedBatchs.get(bu).entrySet()) {
				BatchPara value = entry.getValue();
				batchProcessor.stopBatch(value);
			}
		}
		return null;
	}

}
