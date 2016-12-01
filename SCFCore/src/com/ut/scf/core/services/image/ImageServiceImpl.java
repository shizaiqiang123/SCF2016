package com.ut.scf.core.services.image;

import org.springframework.stereotype.Service;

import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.AbsESBServiceImpl;

@Service("imageServiceImpl")
public class ImageServiceImpl extends AbsESBServiceImpl{
	/**
	 * 
	 */

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
	public String getServiceId() {
		return "Image";
	}

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		
	}
}
