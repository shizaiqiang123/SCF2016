package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxDeletePendingRecord")
public class TrxDeletePendingRecord implements ILogicComponent{
	
	@Resource(name="trxDeletePendingProcessor")  
	ILogicComponent trxDeletePendingProcessor;

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return trxDeletePendingProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return trxDeletePendingProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return trxDeletePendingProcessor.postMasterData(logicObj);
	}

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		return trxDeletePendingProcessor.postData(logicObj);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxDeletePendingProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxDeletePendingProcessor.releaseData(logicObj);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxDeletePendingProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxDeletePendingProcessor.rollbackData(logicObj);
	}
}
