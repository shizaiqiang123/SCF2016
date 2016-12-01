package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Component("trxTransForToRecord")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TrxTransForToRecord implements ILogicComponent{
	@Resource(name="trxTransForToRecordProcessor")  
	ILogicComponent trxTransForToRecordProcessor;

	@Override
	public FuncDataObj postData(FuncDataObj paraDom) throws Exception {
		return trxTransForToRecordProcessor.postData(paraDom);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxTransForToRecordProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxTransForToRecordProcessor.releaseData(logicObj);
	}
//
//	@Override
//	public FuncDataObj deleteData(FuncDataObj logicObj) throws Exception {
//		return trxTransForToRecordProcessor.deleteData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj cancelData(FuncDataObj logicObj) throws Exception {
//		return trxTransForToRecordProcessor.cancelData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj rollback(FuncDataObj logicObj) {
//		return trxTransForToRecordProcessor.rollback(logicObj);
//	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return trxTransForToRecordProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return trxTransForToRecordProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return trxTransForToRecordProcessor.postMasterData(logicObj);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxTransForToRecordProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxTransForToRecordProcessor.rollbackData(logicObj);
	}
}
