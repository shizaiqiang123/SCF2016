package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;

@Component("trxAddRecord")
@Scope("prototype")
public class TrxAddRecord implements ILogicComponent{
	@Resource(name="trxAddRecordProcessor")  
	ILogicComponent trxAddRecordProcessor;

	@Override
	public FuncDataObj postData(FuncDataObj paraDom) throws Exception {
		return trxAddRecordProcessor.postData(paraDom);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxAddRecordProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxAddRecordProcessor.releaseData(logicObj);
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return trxAddRecordProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return trxAddRecordProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return trxAddRecordProcessor.postMasterData(logicObj);
	}

//	@Override
//	public FuncDataObj deleteData(FuncDataObj logicObj) throws Exception {
//		return trxAddRecordProcessor.deleteData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj cancelData(FuncDataObj logicObj) throws Exception {
//		return trxAddRecordProcessor.cancelData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj rollback(FuncDataObj logicObj) {
//		return trxAddRecordProcessor.rollback(logicObj);
//	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxAddRecordProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxAddRecordProcessor.rollbackData(logicObj);
	}
}
