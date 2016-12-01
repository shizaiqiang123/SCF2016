package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.data.FuncDataObj;

@Service("trxViewRecordProcessor")
@Scope("prototype")
public class ASETrxViewRecordBean extends AbsLogicCompManager {

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	protected void addFilterBeforeInqData(Map<String, Object> crMap) {
		//No special filed filter need to add.
	}
	
	@Override
	protected void addFieldsBeforeInqData(List<String> filedList) {
		//No special filed need to add.
	}

	@Override
	protected void appendOrders(List<String> orders) {
	}
	
	@Override
	protected void appendPostFields(List<String> updateList) {
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
	}
	
	@Override
	protected FuncDataObj execPostData() throws Exception {
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose();
		return obj;
	}
	
	@Override
	protected FuncDataObj afterPostData() throws Exception {
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose();
		return obj;
	}

	@Override
	protected FuncDataObj execReleaseData() throws Exception {
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose();
		return obj;
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	protected void resetEventTimes() {
		
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
