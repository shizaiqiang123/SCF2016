package com.ut.scf.core.batch;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

@Component("batchFactoryImpl")
public class BatchFactoryImpl {
	
	@Resource(name = "autoBatchProcessor")
	private IBatchComponent autoProcessor;
	
	@Resource(name = "manualBatchProcessor")
	private IBatchComponent manualProcessor;
	
	protected BatchFactoryImpl(){
		
	}
	
	public IBatchComponent getBatchImpl(String type){
		if("A".equalsIgnoreCase(type)){
			return autoProcessor;
		}else if("M".equalsIgnoreCase(type)){
			return manualProcessor;
		}else{
			return null;
		}
	}
}
