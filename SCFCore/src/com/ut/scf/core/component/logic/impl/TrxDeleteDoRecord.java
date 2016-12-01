package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxDeleteDoRecord")
public class TrxDeleteDoRecord implements ILogicComponent{
	
	@Resource(name="trxDeleteDoProcessor")  
	ILogicComponent trxDeleteDoProcessor;

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return trxDeleteDoProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return trxDeleteDoProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return trxDeleteDoProcessor.postMasterData(logicObj);
	}

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		return trxDeleteDoProcessor.postData(logicObj);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxDeleteDoProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxDeleteDoProcessor.releaseData(logicObj);
	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxDeleteDoProcessor.postDeletePendingData(logicObj);
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxDeleteDoProcessor.rollbackData(logicObj);
	}
}
