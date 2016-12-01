package com.ut.scf.mule.control;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.mule.api.MuleContext;
import org.mule.api.MuleException;
import org.mule.api.construct.FlowConstruct;

import com.ut.scf.core.esb.IESBControlManager;
import com.ut.scf.core.esb.IESBServiceEntity;
import com.ut.scf.mule.control.entity.MuleServiceEntity;
import com.ut.scf.mule.web.context.MuleContextLoader;


public class MuleControlManger implements IESBControlManager{
	private MuleContext muleContext = MuleContextLoader.getCurrentMuleContext();

	@Override
	public void start() throws Exception {
		try {
			muleContext.initialise();
		} catch (MuleException e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void stop() throws Exception {
		muleContext.dispose();
	}

	@Override
	public void pause() throws Exception {
		try {
			muleContext.stop();
		} catch (MuleException e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void reStart() throws Exception {
		try {
			muleContext.start();
		} catch (MuleException e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public List<IESBServiceEntity> getAllServices() {
		Collection<FlowConstruct> flowList = muleContext.getRegistry().lookupFlowConstructs();
		FlowConstruct [] flows = (FlowConstruct[]) flowList.toArray();
		List<IESBServiceEntity> retList = new ArrayList<IESBServiceEntity>();
		for(int i = 0,len = flows.length;i<len;i++){
			FlowConstruct flow = flows[i];
			MuleServiceEntity entity = new MuleServiceEntity();
			loadProptiy(entity);
			retList.add(entity);
		}
		return retList;
	}

	private void loadProptiy(MuleServiceEntity entity) {
	}

	@Override
	public String getStatus() {
		//muleContext.isStarted() ? "Running" : "Stoped"
		return muleContext.getLifecycleManager().getCurrentPhase();
	}

}
