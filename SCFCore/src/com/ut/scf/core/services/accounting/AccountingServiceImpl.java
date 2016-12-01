package com.ut.scf.core.services.accounting;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.core.services.accounting.impl.AccountingConfiture;
import com.ut.scf.core.services.accounting.impl.IAccountingManager;

@Service("accountingServiceImpl")
public class AccountingServiceImpl extends AbsESBServiceImpl{
	/**
	 * 
	 */
	@Override
	public String getServiceId() {
		return "Accounting";
	}
	
	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:" + getServiceId());
		super.getLogger().debug("initialize service start success.");
		AccountingConfiture.loadConfiture();

	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		super.getLogger().debug("destroy service success.");
	}

	@Resource(name="accountingManager")
	IAccountingManager manager;

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		manager.getData(logicObj);
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		manager.getData(logicObj);
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		manager.postData(dataObj);
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		manager.postData(dataObj);
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		manager.postData(dataObj);
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		manager.postData(dataObj);
	}
}
