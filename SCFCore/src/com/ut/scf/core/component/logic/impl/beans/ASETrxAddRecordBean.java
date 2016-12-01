package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoEntity;

@Service("trxAddRecordProcessor")
@Scope("prototype")
public class ASETrxAddRecordBean extends AbsLogicCompManager {

	@Override
	protected void addFilterBeforeInqData(Map<String, Object> crMap) {

	}
	
	@Override
	protected void addFieldsBeforeInqData(List<String> filedList) {
		
	}

	@Override
	protected void appendOrders(List<String> orders) {
		
	}
	
	@Override
	protected void appendPostFields(List<String> updateList) {
		//全是全表提交，只是状态不一样P或者M
		if("RE".equalsIgnoreCase(currentDataObj.getFuncType())||"RJ".equalsIgnoreCase(currentDataObj.getFuncType())){
			if(!updateList.isEmpty()){
				updateList.add("sysRelId");
				updateList.add("sysRelTm");
				updateList.add("sysLockBy");
				updateList.add("sysRelReason");
				updateList.add("sysTrxSts");
				updateList.add("sysLockFlag");
			}
			
		}
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		super.appendPostSystemFields(propertyValue);
		if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(currentDataObj.getFuncType())){ 
			propertyValue.put("sysTrxSts", "M");
		}
	}

	//任何情况都要提交数据
	//pengding : 只更新状态成P
	//Release ： 不走这个方法
	//master ： 从E表拷贝数据到M表，并且状态成M
//	@Override
//	protected FuncDataObj execPostData() throws Exception {
//		String strTrxType = this.funcObj.getFunctype();
//		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strTrxType)) {
//			if(!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())){
//				return super.execPostData();
//			}else{
//				FuncDataObj obj = new FuncDataObj();
//				obj.buildRespose();
//				return obj;
//			}
//		} else {
//			return super.execPostData();
//		}
//	}

	@Override
	protected FuncDataObj afterPostData() throws Exception {
		return this.postEventData(currentDataObj.getFuncType());
	}

	@Override
	protected FuncDataObj execReleaseData() throws Exception {
		if(!checkLogicNodeEnable()){
			return null;
		}
		String strResult = this.context.getIsAgree();
		if ("Y".equalsIgnoreCase(strResult)) {
			return super.execReleaseData();
		} else {
			FuncDataObj obj = new FuncDataObj();
			obj.buildRespose();
			return obj;
		}
	}

	protected String getOperateName() {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {
			return IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE;
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)){
			return IDaoEntity.OPERATE_NAME_NON;
		} else if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)){
			return IDaoEntity.OPERATE_NAME_DELETE;
		}else {
			return IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE;
		}
	}

	@Override
	protected void resetEventTimes() {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {
			int maxEvent = getMaxEventTimes();//===1
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)){
			int maxEvent = getMaxEventTimes();//===1\
			if(maxEvent==0)
				maxEvent=1;
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}else if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)){
			int maxEvent = getMaxEventTimes();//===1
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		} else {
//			int maxEvent = super.getMaxEventTimes();
//			maxEvent++;
			int maxEvent = 1;
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
