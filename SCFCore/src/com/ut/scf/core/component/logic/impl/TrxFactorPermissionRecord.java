package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxFactorPermissionRecord")
public class TrxFactorPermissionRecord implements ILogicComponent{
	@Resource(name="trxFactorPermissionRecordProcessor")  
	ILogicComponent trxFactorPermissionRecordProcessor;

	@Override
	public FuncDataObj postData(FuncDataObj paraDom) throws Exception {
		return trxFactorPermissionRecordProcessor.postData(paraDom);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionRecordProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionRecordProcessor.releaseData(logicObj);
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionRecordProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionRecordProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionRecordProcessor.postMasterData(logicObj);
	}

//	@Override
//	public FuncDataObj deleteData(FuncDataObj logicObj) throws Exception {
//		return trxFactorPermissionRecordProcessor.deleteData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj cancelData(FuncDataObj logicObj) throws Exception {
//		return trxFactorPermissionRecordProcessor.cancelData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj rollback(FuncDataObj logicObj) {
//		return trxFactorPermissionRecordProcessor.rollback(logicObj);
//	}
	

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxFactorPermissionRecordProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionRecordProcessor.rollbackData(logicObj);
	}
}
