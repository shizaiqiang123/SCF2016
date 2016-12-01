package com.ut.scf.core.component.logic.impl.beans;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;

@Service("trxDeleteRecordProcessor")
@Scope("prototype")
public class ASETrxDeleteRecordBean extends AbsLogicCompManager {
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
		String funcType = this.currentDataObj.getFuncType();
		//申请时，对M表只需要提交系统栏位，不需要提交业务栏位
		//业务栏位先插入在E表中，复合时，从E表搬到M表
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(funcType)) {
			//当子表更新时，需要将申请信息存到M表中
//			updateList.add("sysTrxSts");
			updateList.clear();
		}else if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(funcType)) {
			if (!updateList.isEmpty()) {
				updateList.add("sysTrxSts");
				updateList.add("sysOpTm");
				updateList.add("sysFuncId");
				updateList.add("sysOpId");
				updateList.add("sysBusiUnit");
				updateList.add("sysEventTimes");
			}
		}else{
			
		}
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		propertyValue.put("sysLockFlag", "F");
		super.appendPostSystemFields(propertyValue);
		if(ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(currentDataObj.getFuncType())){
			propertyValue.put("sysTrxSts", "D");
		}else if(ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(currentDataObj.getFuncType())){ 
			
		}else if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(currentDataObj.getFuncType())){ 
			propertyValue.put("sysTrxSts", "M");
		}else{
			propertyValue.put("sysTrxSts", "D");
		}
	}
	
	protected void parseParameters(FuncDataObj logicObj) {
		super.parseParameters(logicObj);
		String funcType =  logicObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(funcType)) {
		} else {
//			context.setStrTrxStatus("D");
		}
	}
	
//	@Override
//	protected FuncDataObj execPostData() throws Exception {
//		String strTrxType = currentDataObj.getFuncType();
//		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strTrxType)) {
////			if(!"Y".equalsIgnoreCase(pageObj.getCascadeevent())){
//			if(!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())){
//				return super.execPostData();
//			}else{
//				FuncDataObj obj = new FuncDataObj();
//				obj.buildRespose();
//				return obj;
//			}
//		} else {
//			return execDeleteData();
//		}
//	}
	
	@Override
	protected FuncDataObj afterPostData() throws Exception {
		JSONObject reqData = (JSONObject) currentDataObj.getReqData();
//		JSONObject reqData = JsonHelper.getTrxObject((JSONObject)currentDataObj.getReqData());

		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strTrxType)) {
			
		} else if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(strTrxType)) {
			reqData.put("sysTrxSts", "D");
			int maxEvent = reqData.getInt("sysEventTimes");
			maxEvent++;
			reqData.put("sysEventTimes", maxEvent);
		} else{
			reqData.put("sysTrxSts", "D");
//			this.context.setStrTrxStatus("D");
		}
		return this.postEventData(currentDataObj.getFuncType());
	}

	@Override
	protected FuncDataObj execReleaseData() throws Exception {
		String strResult = this.context.getIsAgree();
		
		if ("Y".equalsIgnoreCase(strResult)) {
			return execDeleteData();
		} else {
			FuncDataObj obj = new FuncDataObj();
			obj.buildRespose();
			return obj;
		}
	}
	
	protected FuncDataObj execDeleteData() throws Exception {
		Object entity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());

		Map<String, Object> keyInfo = this.getKeyInfo(entity);
		Map<String, Object> propertyValue = new HashMap<String, Object>();
		JSONObject dataObject = (JSONObject) currentDataObj.getReqData();
		propertyValue.putAll(dataObject);
		propertyValue.put(getNameWithoutAlias((String) keyInfo.get(this.KEY_NAME)), keyInfo.get(this.KEY_VALUE));
		BeanUtils.setBeanProperty(entity, propertyValue);
		
		IDaoEntity daoEntity = new ExecDaoEntity();
		daoEntity.setAlias(alias);
		daoEntity.setSerializableEntity((Serializable) entity);
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_DELETE);

		FuncDataObj obj = new FuncDataObj();
		obj.addExcuteEntity(daoEntity);
		return obj;
	}

	@Override
	protected void resetEventTimes() {
		super.currentDataObj.getReqData().put("sysEventTimes", eventTimes);
		
	}
	
	protected String getOperateName() {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(strTrxType)) {
			return IDaoEntity.OPERATE_NAME_DELETE;
		} else {
			return IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE;
		}
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
