package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComp;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("paraDelete")
public class ParaDeleteRecord implements ILogicComp{

	@Resource(name="paraDeleteRecordBean")
	ILogicComp deleteRecordProcess;

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return deleteRecordProcess.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return deleteRecordProcess.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return deleteRecordProcess.postMasterData(logicObj);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return deleteRecordProcess.postDeletePendingData(logicObj);
	}
}
