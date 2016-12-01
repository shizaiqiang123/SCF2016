package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoEntity;

@Service("trxEditRecordProcessor")
@Scope("prototype")
public class ASETrxEditRecordBean extends AbsLogicCompManager {

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
		String funcType =  this.currentDataObj.getFuncType();
		//申请时，对M表只需要提交系统栏位，不需要提交业务栏位
		//业务栏位先插入在E表中，复合时，从E表搬到M表
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(funcType)) {
			//当子表更新时，需要将申请信息存到M表中,只更新以下栏位值
			String updateE = currrentLogicObj.getCascadeevent();
			if("Y".equalsIgnoreCase(updateE)){
				updateList.add("sysTrxSts");
				updateList.add("sysEventTimes");
			}else{
				updateList.clear();
			}
		} else if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(funcType)) {
			if (!updateList.isEmpty()) {
				updateList.add("sysTrxSts");
				updateList.add("sysOpTm");
				updateList.add("sysFuncId");
				updateList.add("sysOpId");
				updateList.add("sysBusiUnit");
				updateList.add("sysEventTimes");
			}
		}else if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)) {
			updateList.clear();
			String updateE = currrentLogicObj.getCascadeevent();
			if("Y".equalsIgnoreCase(updateE)){
				updateList.add("sysTrxSts");
				updateList.add("sysEventTimes");
				updateList.add("sysRelReason");
			}else{
				updateList.clear();//此处无法回滚，PM交易，没有E表，如何回滚申请？
			}
		}else if (ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(funcType)) {
			updateList.clear();
			String updateE = currrentLogicObj.getCascadeevent();
			if("Y".equalsIgnoreCase(updateE)){
				updateList.add("sysRelReason");
				updateList.add("sysTrxSts");
				updateList.add("sysEventTimes");
			}else{
				updateList.clear();//此处无法回滚，FP交易，没有E表，如何回滚申请？
			}
		}else if (ComponentConst.COMP_FUNC_TYPE_REJECT.equalsIgnoreCase(funcType)) {
			updateList.clear();
			String updateE = currrentLogicObj.getCascadeevent();
			if("Y".equalsIgnoreCase(updateE)){
				updateList.add("sysRelReason");
				updateList.add("sysTrxSts");
			}else{
				updateList.clear();//此处无法回滚，RJ交易，没有E表，如何拒绝？
			}
		}else{
			if (!updateList.isEmpty()) {
				updateList.add("sysTrxSts");
				updateList.add("sysOpTm");
				updateList.add("sysFuncId");
				updateList.add("sysOpId");
				updateList.add("sysBusiUnit");
				updateList.add("sysEventTimes");
			}
		}
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		propertyValue.put("sysLockFlag", "F");
		super.appendPostSystemFields(propertyValue);
		if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(currentDataObj.getFuncType())) {
			propertyValue.put("sysTrxSts", "M");
			propertyValue.put("sysRelReason", "");
		}
	}
	
//	@Override
//	protected FuncDataObj execPostData() throws Exception {
//		String strTrxType = currentDataObj.getFuncType();
//		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strTrxType)) {
//			if(!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())){
//				return super.execPostData();
//			}else{
//				FuncDataObj obj = new FuncDataObj();
//				obj.buildRespose();
//				return obj;
//			}
//		}else if (ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)) {
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
//		if(!checkLogicNodeEnable()){
//			return null;
//		}
		
		if (!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())) {
			return null;
		}
		
		String funcType =  this.currentDataObj.getFuncType();
		//申请时，提交pending中定义的栏位，并将release中定义的栏位提交到E表中
		if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)){
			JSONObject logicData = (JSONObject) currentDataObj.getReqData();
			int event= logicData.getInt("sysEventTimes");
			event++;//主表中--之后更新主记录了
			logicData.put("sysEventTimes", event);
		}else{
			
		}
		return this.postEventData(currentDataObj.getFuncType());
	}

	@Override
	protected FuncDataObj execReleaseData() throws Exception {
//		JSONObject dataDom = (JSONObject) currentDataObj.getReqData();
//		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);
//		int pageIndex = this.context.getSysTrxPageIndex();
//		if (trxDom.containsKey("p" + pageIndex)) {
//			trxDom = JsonUtil.getChildJson(trxDom, "p" + pageIndex);
//		}
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
	
	@Override
	protected String getOperateName() {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_REJECT.equalsIgnoreCase(strTrxType)) {
			//RJ交易，不处理M表
			return IDaoEntity.OPERATE_NAME_NON;
		}
		return IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE;
	}

	@Override
	protected void resetEventTimes() {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {
			int maxEvent = getMaxEventTimes();
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)){
			int maxEvent = getMaxEventTimes();//===1\
			maxEvent++;
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}else if(ComponentConst.COMP_FUNC_TYPE_REJECT.equalsIgnoreCase(strTrxType)){
		}else if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)){
			int maxEvent = getMaxEventTimes();
			maxEvent--;
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		} else {
			int maxEvent = super.getMaxEventTimes();
			maxEvent++;
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}	
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
