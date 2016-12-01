package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComp;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("paraLock")
public class ParaLockRecord implements ILogicComp{

	@Resource(name="paraLockRecordBean")
	ILogicComp lockRecordProcess;

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return lockRecordProcess.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return lockRecordProcess.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return lockRecordProcess.postMasterData(logicObj);
	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return lockRecordProcess.postDeletePendingData(logicObj);
	}

}
