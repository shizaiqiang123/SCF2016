package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;

@Component("trxEditDoRecord")
@Scope("prototype")
public class TrxEditDoRecord implements ILogicComponent{
	@Resource(name="trxEditDoProcessor")  
	ILogicComponent trxEditDoProcessor;


	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return trxEditDoProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return trxEditDoProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return trxEditDoProcessor.postMasterData(logicObj);
	}

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		return trxEditDoProcessor.postData(logicObj);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxEditDoProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxEditDoProcessor.releaseData(logicObj);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxEditDoProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxEditDoProcessor.rollbackData(logicObj);
	}
}
