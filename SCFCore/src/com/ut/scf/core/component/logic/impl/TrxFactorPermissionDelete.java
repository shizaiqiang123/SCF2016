package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxFactorPermissionDelete")
public class TrxFactorPermissionDelete implements ILogicComponent{
	@Resource(name="trxFactorPermissionDeleteProcessor")  
	ILogicComponent trxFactorPermissionDeleteProcessor;

	@Override
	public FuncDataObj postData(FuncDataObj paraDom) throws Exception {
		return trxFactorPermissionDeleteProcessor.postData(paraDom);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionDeleteProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionDeleteProcessor.releaseData(logicObj);
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionDeleteProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionDeleteProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionDeleteProcessor.postMasterData(logicObj);
	}

//	@Override
//	public FuncDataObj deleteData(FuncDataObj logicObj) throws Exception {
//		return trxFactorPermissionDeleteProcessor.deleteData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj cancelData(FuncDataObj logicObj) throws Exception {
//		return trxFactorPermissionDeleteProcessor.cancelData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj rollback(FuncDataObj logicObj) {
//		return trxFactorPermissionDeleteProcessor.rollback(logicObj);
//	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxFactorPermissionDeleteProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxFactorPermissionDeleteProcessor.rollbackData(logicObj);
	}
}
