package com.ut.scf.core.esb;

public class ESBDefauleManager implements IESBServiceManager{
	IESBServiceManager esbService;

	@Override
	public void start(IESBServiceEntity entity) {
		esbService.start(entity);		
	}

	@Override
	public void stop(IESBServiceEntity entity) {
		esbService.stop(entity);
	}

	@Override
	public void pause(IESBServiceEntity entity) {
		esbService.pause(entity);		
	}

	@Override
	public void reStart(IESBServiceEntity entity) {
		esbService.reStart(entity);
	}

	@Override
	public String getStatus(IESBServiceEntity entity) {
		return esbService.getStatus(entity);
	}
}
