package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComp;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("paraAdd")
public class ParaAddRecord implements ILogicComp{
	@Resource(name="paraAddRecordBean")
	ILogicComp addRecordProcess;

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return addRecordProcess.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return addRecordProcess.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return addRecordProcess.postMasterData(logicObj);
	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return addRecordProcess.postDeletePendingData(logicObj);
	}
}
