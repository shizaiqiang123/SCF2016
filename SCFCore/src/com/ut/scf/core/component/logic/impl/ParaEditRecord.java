package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComp;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("paraEdit")
public class ParaEditRecord implements ILogicComp{

	@Resource(name="paraEditRecordBean")
	ILogicComp editRecordProcess;

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return editRecordProcess.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return editRecordProcess.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return editRecordProcess.postMasterData(logicObj);
	}
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return editRecordProcess.postDeletePendingData(logicObj);
	}
}
