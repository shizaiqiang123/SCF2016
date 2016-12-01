package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.data.FuncDataObj;

@Service("trxLockRecordProcessor")
@Scope("prototype")
public class ASETrxLockRecordBean extends AbsLogicCompManager{

	@Override
	protected void addFilterBeforeInqData(Map<String, Object> crMap) {
		JSONObject retData = (JSONObject) currentDataObj.getReqData();
		crMap.put(getHibernateName("sysLockFlag"),retData.get("sysLockFlag"));
	}
	
//	@Override
//	protected String resetQueryCondition(String condition) {
//		return "";
//	}
	
	@Override
	protected void addFieldsBeforeInqData(List<String> filedList) {
		filedList.clear();
//		filedList.add("sysLockFlag");
//		filedList.add("sysOpId");
//		filedList.add("sysTrxSts");
	}
	
	@Override
	protected void appendOrders(List<String> orders) {
		orders.clear();
	}
	
	@Override
	protected void appendPostFields(List<String> updateList) {
		updateList.clear();
		updateList.add("sysLockFlag");
		updateList.add("sysLockBy");
	}

	@Override
	protected FuncDataObj afterPostData() throws Exception {
		return null;
	}
	
	/**
	 * Cannot be deleted
	 */
	@Override
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		//remove system fields from updata list.
	}

	@Override
	protected void resetEventTimes() {
		
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
