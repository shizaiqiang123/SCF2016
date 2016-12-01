package com.ut.scf.core.component.logic.impl;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxUpdateEventRecord")
public class TrxUpdateEventRecord implements ILogicComponent{

	@Override
	public FuncDataObj postData(FuncDataObj paraDom) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return null;
	}
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return null;
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return null;
	}
}
