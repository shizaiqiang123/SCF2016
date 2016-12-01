package com.ut.scf.core.esb;

import java.util.List;

public class ESBDefaultControlManager implements IESBControlManager{
	
	IESBControlManager controlManagerImpl;

	@Override
	public void start() throws Exception {
		try {
			controlManagerImpl.start();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}		
	}

	@Override
	public void stop() throws Exception {
		try {
			controlManagerImpl.stop();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void pause() throws Exception {
		try {
			controlManagerImpl.pause();
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}		
	}

	@Override
	public void reStart() {
		try {
			controlManagerImpl.reStart();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<IESBServiceEntity> getAllServices() {
		return controlManagerImpl.getAllServices();
	}

	@Override
	public String getStatus() {
		return controlManagerImpl.getStatus();
	}

}
