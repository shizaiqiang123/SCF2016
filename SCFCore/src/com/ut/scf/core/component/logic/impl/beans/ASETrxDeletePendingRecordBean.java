package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.data.FuncDataObj;

@Service("trxDeletePendingProcessor")
@Scope("prototype")
public class ASETrxDeletePendingRecordBean extends AbsLogicCompManager {

	@Override
	protected void appendPostFields(List<String> updateList) {
		updateList.clear();
		updateList.add("sysTrxSts");
		updateList.add("sysEventTimes");
	}

	@Override
	protected void appendOrders(List<String> orders) {
		
	}

	@Override
	protected void addFilterBeforeInqData(Map<String, Object> crMap) {
		
	}

	@Override
	protected void addFieldsBeforeInqData(List<String> filedList) {
		
	}

	@Override
	protected FuncDataObj afterPostData() throws Exception {
		return this.postEventData(currentDataObj.getFuncType());
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		//只更新sysTrxSts、sysEventTimes
		propertyValue.clear();
		propertyValue.put("sysTrxSts", "M");
		propertyValue.put("sysEventTimes", eventTimes-1);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}