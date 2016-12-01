package com.ut.scf.mule.control;

import org.mule.api.construct.FlowConstruct;

import com.ut.scf.core.esb.IESBServiceManager;
import com.ut.scf.core.esb.IESBServiceEntity;

public class MuleServiceManager implements IESBServiceManager{
	
	@Override
	public void start(IESBServiceEntity entity){
		FlowConstruct flow = convertEntity(entity);
		SingleServiceManager manager = new SingleServiceManager();
		manager.startFlow(flow);
	}

	private FlowConstruct convertEntity(IESBServiceEntity entity) {
		return null;
	}

	@Override
	public void stop(IESBServiceEntity entity) {
		FlowConstruct flow = convertEntity(entity);
		SingleServiceManager manager = new SingleServiceManager();
		manager.stopFlow(flow);
	}

	@Override
	public void pause(IESBServiceEntity entity) {
		FlowConstruct flow = convertEntity(entity);
		SingleServiceManager manager = new SingleServiceManager();
		manager.pauseFlow(flow);
	}

	@Override
	public void reStart(IESBServiceEntity entity) {
		FlowConstruct flow = convertEntity(entity);
		SingleServiceManager manager = new SingleServiceManager();
		//��ʵ��
	}

	@Override
	public String getStatus(IESBServiceEntity entity) {
		FlowConstruct flow = convertEntity(entity);
		return flow.getLifecycleState().isStarted()?"Running":"Stoped";
	}
}
