package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoEntity;

@Service("trxAddEventProcessor")
@Scope("prototype")
public class ASETrxAddEventRecordBean extends AbsLogicCompManager {

	protected void parseParameters(FuncDataObj logicObj) {
		super.parseParameters(logicObj);
		this.strTableName = this.getEventTableName();
	}

	@Override
	protected void addFilterBeforeInqData(Map<String, Object> crMap) {
		//Non
	}

	@Override
	protected FuncDataObj afterPostData() throws Exception {
		//Non
		return null;
	}

	@Override
	protected void appendPostFields(List<String> updateList) {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {
			updateList.add("sysTrxSts");
			updateList.add("sysRelTm");
			updateList.add("sysRelId");
			updateList.add("sysLockFlag");
			updateList.add("sysRelReason");
		}else if (ComponentConst.COMP_FUNC_TYPE_REJECT.equalsIgnoreCase(strTrxType)) {
			updateList.add("sysTrxSts");
			updateList.add("sysRelTm");
			updateList.add("sysRelId");
			updateList.add("sysLockFlag");
			updateList.add("sysRelReason");
		} else {
			if(updateList.isEmpty()){
				//全表更新，全部使用页面提交值
			}else{
				try {
					Object	eventData = getPreEventData();
					JSONObject dataObject = null;
					if(eventData==null){
						//没有之前的event数据，只能使用当前提交的数据更新
						dataObject= this.currentTrxData;
					}else{
						dataObject = JsonUtil.getJSON(eventData);
						updateList.add("sysOpId");
						updateList.add("sysEventTimes");
						for (String string : updateList) {
							//只有配置的值，才使用页面的栏位值更新，其他数据保留上一步数据
							dataObject.put(string, this.currentTrxData.get(string));
						}
						dataObject.put("_json_name", "trxDom");
						currentDataObj.setReqData(dataObject);
					}
				} catch (Exception e) {
					//出错后，使用全部提交的数据更新
					e.printStackTrace();
				}
				//对E表依然是全表更新（插入）
				updateList.clear();
			}
//			updateList.clear();
		}
	}

	@Override
	protected void addFieldsBeforeInqData(List<String> filedList) {
		filedList.clear();
		//filedList.add("id");
	}

	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		String strTrxType = currentDataObj.getFuncType();
//		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {	
//		} else {
//			propertyValue.put("sysLockFlag", "F");
//		}
		super.appendPostSystemFields(propertyValue);
		Object trxStatus = super.currentTrxData.get("sysTrxSts");
		if(trxStatus!=null&&StringUtil.isNotNull(trxStatus.toString())){
			if(ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strTrxType)||ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)){
				propertyValue.put("sysLockFlag", super.currentTrxData.get("sysLockFlag"));
				propertyValue.put("sysLockBy", super.currentTrxData.get("sysLockBy"));
			}
			propertyValue.put("sysTrxSts", trxStatus.toString());
		}
	}

	@Override
	protected void appendOrders(List<String> orders) {
		
	}
	
	protected String getOperateName() {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {
			return IDaoEntity.OPERATE_NAME_UPDATE;
		}else if(ComponentConst.COMP_FUNC_TYPE_REJECT.equalsIgnoreCase(strTrxType)){
			return IDaoEntity.OPERATE_NAME_UPDATE;
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)){
			return IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE;
		}else if(ComponentConst.COMP_FUNC_TYPE_REFUSE.equalsIgnoreCase(strTrxType)){
			return IDaoEntity.OPERATE_NAME_UPDATE;
		} else if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)){
			return IDaoEntity.OPERATE_NAME_DELETE;
		}else {
			return IDaoEntity.OPERATE_NAME_ADD;
		}
	}

	protected JSONObject processMappingField(JSONObject trxData){
		//不需要重复处理Mapping对象
		return trxData;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		return null;
	}
	
	@Override
	public boolean checkLogicNodeEnable(){
		return true;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
