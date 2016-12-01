package com.ut.scf.core.services.limits;

import org.springframework.stereotype.Service;

import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.AbsESBServiceEntity;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.services.AbsESBServiceImpl;

@Service("limitsServiceImpl")
public class LimitsServiceImpl extends AbsESBServiceImpl{

	/**
	 * 
	 */

	@Override
	public String getServiceId() {
		return "Limits";
	}

	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:"+getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		super.getLogger().debug("destroy service success.");
	}

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		// TODO Auto-generated method stub
		
	}

}
