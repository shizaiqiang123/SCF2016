package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxRoleRecord")
public class TrxRoleRecord implements ILogicComponent{
	@Resource(name="trxRoleRecordProcessor")  
	ILogicComponent trxRoleRecordProcessor;

	@Override
	public FuncDataObj postData(FuncDataObj paraDom) throws Exception {
		return trxRoleRecordProcessor.postData(paraDom);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return trxRoleRecordProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return trxRoleRecordProcessor.releaseData(logicObj);
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return  trxRoleRecordProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return  trxRoleRecordProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return  trxRoleRecordProcessor.postMasterData(logicObj);
	}

//	@Override
//	public FuncDataObj deleteData(FuncDataObj logicObj) throws Exception {
//		return trxRoleRecordProcessor.deleteData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj cancelData(FuncDataObj logicObj) throws Exception {
//		return trxRoleRecordProcessor.cancelData(logicObj);
//	}
//
//	@Override
//	public FuncDataObj rollback(FuncDataObj logicObj) {
//		return trxRoleRecordProcessor.rollback(logicObj);
//	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return trxRoleRecordProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return trxRoleRecordProcessor.rollbackData(logicObj);
	}
}
