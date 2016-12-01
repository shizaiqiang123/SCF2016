package com.ut.scf.core.component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.util.Assert;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.sql.ExpressionHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoReformat;
import com.ut.scf.dao.QueryDaoEntity;

public abstract class AbsLogicCompManager extends AbsTrxLogicManager {
	
	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		currrentQueryObj = (QueryNode) logicObj.getReqParaObj();
		this.strTableName = getTableNameWithoutSchema(currrentQueryObj.getTablename());
		this.strSchema = getSchema(currrentQueryObj.getTablename());
		parseParameters(logicObj);
		
		String functType = this.currentDataObj.getFuncType();
		String trxTableFlag = "";
		if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(functType)) {
			trxTableFlag = "M";
		} else if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(functType)) {
			trxTableFlag = "M";
		} else if (ComponentConst.COMP_FUNC_TYPE_EC.equalsIgnoreCase(functType)) {
			trxTableFlag = "M";
		} else if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(functType)) {
			trxTableFlag = "E";
		} else if (ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(functType)) {
			trxTableFlag = "E";
		} else if (ComponentConst.COMP_FUNC_TYPE_AJAX.equalsIgnoreCase(functType)) {
			trxTableFlag = "M";
		} else if (ComponentConst.COMP_FUNC_TYPE_VIEW_HISTORY.equalsIgnoreCase(functType)) {
			trxTableFlag = "E";
		} else {
			trxTableFlag = "M";
		}
		if ("E".equalsIgnoreCase(trxTableFlag)) {
			this.strTableName = getEventTableName();
		}
		
		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName), "Miss process table name.");
		
		currentTrxData = processMappingField(currentTrxData);
		
		currentDataObj.setReqData(currentTrxData);
		
		Object enity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());

		this.alias = this.getTableNameWithoutSchema(getTableNameWithSechema());

		Map<String, Object> keyInfo = this.getKeyInfo(enity);
		Map<String, Object> crMap = new HashMap<String, Object>();
		crMap.put((String) keyInfo.get(this.KEY_NAME), keyInfo.get(this.KEY_VALUE));

		addFilterBeforeInqData(crMap);

		String queryFields = currrentQueryObj.getFields();
		List<String> filedList = ExpressionHelper.getInstence().splitToList(queryFields);

		addFieldsBeforeInqData(filedList);

		resetFiledList(filedList);

		String condition = currrentQueryObj.getCondition();

		condition = resetQueryCondition(condition);
		
		condition = ExpressionHelper.getInstence().praseMapCondition(condition,
				replaceNameWithoutAlias(crMap));

		String obderBy = currrentQueryObj.getOrderby();
		List<String> orderList = ExpressionHelper.getInstence().splitToList(obderBy);

		appendOrders(orderList);

		String asc = currrentQueryObj.getAsc();
		boolean ascOrder = "Y".equalsIgnoreCase(asc);
		
		IDaoEntity daoEntity = new QueryDaoEntity();
		daoEntity.setAlias(alias);
		daoEntity.setAscOrder(ascOrder);
		daoEntity.setCondition(condition);
		daoEntity.setOrderList(orderList);
		daoEntity.setProcessList(filedList);
		daoEntity.setSerializableEntity((Serializable) enity);
		daoEntity.setReformat(new IDaoReformat() {
			
			@Override
			public Object reformat(Object recordData) {
				return recordData;
			}
		});
		List<IDaoEntity> updateList = new ArrayList<IDaoEntity>();
		updateList.add(daoEntity);
		logicObj.updateEntity(currentDataObj.getDoName(), updateList);

		return logicObj;
	}

	@Override
	public FuncDataObj postData(FuncDataObj dataObj) throws Exception {
		currrentLogicObj = (LogicNode) dataObj.getReqParaObj();
		this.strTableName = getTableNameWithoutSchema(currrentLogicObj.getTablename());
		this.strSchema = getSchema(currrentLogicObj.getTablename());
		parseParameters(dataObj);
		currentTrxData = getDoTrxData(currentDataObj.getReqData(),currrentLogicObj.getDoname());
		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName), "Miss process table name.");
		
		JSONObject trxData =currentTrxData; 
		
		boolean isMult = isMultipleRecord(trxData);
		FuncDataObj processResult = new FuncDataObj();
		if(isMult){
			int totalRecords = getRecordCount( trxData);
			for (int j = 0; j <totalRecords; j++) {
				JSONObject retTrxData = getTrxDom(trxData,j);
				retTrxData=processMappingField(retTrxData);
				currentDataObj.setReqData(retTrxData);
				
				if(!checkLogicNodeEnable()){
					continue;
				}
				
				checkTransaction(retTrxData);
				
				resetEventTimes();
				
				processResult.mergeResponse(execPostData());

				processResult.mergeResponse(afterPostData());
				
			}
		}else{
			trxData = processMappingField(trxData);
			
			currentDataObj.setReqData(trxData);
			
			if(!checkLogicNodeEnable()){
				return null;
			}
			
			checkTransaction(trxData);
			
			resetEventTimes();
			
			processResult.mergeResponse(execPostData());

			processResult.mergeResponse(afterPostData());
		}
		
		return processResult;
	}

	protected void checkTransaction(JSONObject retTrxData)  throws Exception {
		
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();
		this.strTableName = getTableNameWithoutSchema(currrentLogicObj.getTablename());
		this.strSchema = getSchema(currrentLogicObj.getTablename());
		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName), "Miss process table name.");
		
		parseParameters(logicObj);
		
		currentTrxData = getDoTrxData(currentDataObj.getReqData(),currrentLogicObj.getDoname());
	
		JSONObject trxData =currentTrxData ;
		
		boolean isMult = isMultipleRecord(trxData);
		FuncDataObj processResult = new FuncDataObj();
		if(isMult){
			int totalRecords = getRecordCount(trxData);
			for (int j = 0; j <totalRecords; j++) {
				JSONObject retTrxData = getTrxDom(trxData,j);
				currentDataObj.setReqData(processMappingField(retTrxData));
				
				if(!checkLogicNodeEnable()){
					continue;
				}
				resetEventTimes();
				
				processResult.mergeResponse(execReleaseData());

				processResult.mergeResponse(afterPostData());
				
			}
		}else{
			trxData = processMappingField(trxData);
			
			currentDataObj.setReqData(trxData);
			
			if(!checkLogicNodeEnable()){
				return null;
			}
			resetEventTimes();
			
			processResult.mergeResponse(execReleaseData());

			processResult.mergeResponse(afterPostData());
		}
		return processResult;
	}
	
	protected FuncDataObj execPostData() throws Exception {
		Object entity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());
		Map<String, Object> keyInfo = this.getKeyInfo(entity);
		Map<String, Object> propertyValue = new HashMap<String, Object>();
		List<String> updateList = new ArrayList<String>();
		
		String queryFields = currrentLogicObj.getFields();
		List<String> filedList = ExpressionHelper.getInstence().splitToList(queryFields);
		updateList.addAll(filedList);
		
		appendPostFields(updateList);
		if (updateList.isEmpty()) {
			propertyValue.putAll(currentDataObj.getReqData());
		} else {
			setPostFieldsValue(updateList,propertyValue);
		}
		appendPostSystemFields(propertyValue);
		propertyValue.put(getNameWithoutAlias((String) keyInfo.get(this.KEY_NAME)), keyInfo.get(this.KEY_VALUE));
		BeanUtils.setBeanProperty(entity, propertyValue);
		
		String condition = currrentLogicObj.getCondition();

		condition = resetQueryCondition(condition);
		
		IDaoEntity daoEntity = new ExecDaoEntity();
		daoEntity.setAlias(alias);
		daoEntity.setProcessList(updateList);
		daoEntity.setSerializableEntity((Serializable) entity);
		daoEntity.setCondition(condition);
		daoEntity.setOperateName(getOperateName());
		daoEntity.setReformat(new IDaoReformat() {
			@Override
			public FuncDataObj reformat(Object recordData) {
				FuncDataObj retObj = new FuncDataObj();
				retObj.buildRespose(recordData);
				return retObj;
			}
		});

		FuncDataObj obj = new FuncDataObj();
		obj.addExcuteEntity(daoEntity);
		return obj;
	}

	protected void setPostFieldsValue(List<String> updateList,Map propertyValue) {
		JSONObject dataObject = this.currentDataObj.getReqData();
		for (String fieldName : updateList) {
			Object value = JsonUtil.getProperty(dataObject, fieldName);
			propertyValue.put(fieldName, value);
		}
	}

	protected String getOperateName() {
		return IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE;
	}

	protected FuncDataObj execReleaseData() throws Exception {
		Object entity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());
		
		Map eventEntity = (Map)getEventData();
		String queryFields = currrentLogicObj.getReleaseFields();
		List<String> filedList = ExpressionHelper.getInstence().splitToList(queryFields);
		
		if (filedList.isEmpty()) {
			//没有设置复合更新的栏位，即不用更新从E表抓出来的数据
		} else {
			setPostFieldsValue(filedList,eventEntity);
		}
		appendPostFields(filedList);
		
		appendPostSystemFields(eventEntity);
		
		Map<String, Object> keyInfo = this.getKeyInfo(entity);
		eventEntity.put(getNameWithoutAlias((String) keyInfo.get(this.KEY_NAME)), keyInfo.get(this.KEY_VALUE));
		
		BeanUtils.setBeanProperty(entity, eventEntity);
		
		IDaoEntity daoEntity = new ExecDaoEntity();
		daoEntity.setAlias(alias);
//		if (!filedList.isEmpty()) {
//			daoEntity.setProcessList(filedList);
//		}

		daoEntity.setSerializableEntity((Serializable) entity);
		daoEntity.setOperateName(getOperateName());
//		this.currentDataObj.addExcuteEntity(daoEntity);
//		return currentDataObj;
		
		FuncDataObj obj = new FuncDataObj();
		obj.addExcuteEntity(daoEntity);
		return obj;
	}
	
	protected FuncDataObj postEventData(String trxType) throws Exception {
		if (!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())) {
			FuncDataObj obj = new FuncDataObj();
			obj.buildRespose();
			return obj;
		}
		ILogicComponent trxAddEventRecord = ClassLoadHelper.getBusiComponetProcessor("trxAddEventRecord");
		if("RE".equalsIgnoreCase(currentDataObj.getFuncType())){
			return trxAddEventRecord.releaseData(currentDataObj);
		}else if("DP".equalsIgnoreCase(currentDataObj.getFuncType())){
			return trxAddEventRecord.postData(currentDataObj);
		}else{
			return trxAddEventRecord.postData(currentDataObj);
		}
 		
	}
	
	protected int getMaxEventTimes(boolean checkTrxType) {
		// select data from DB.
		// select max event times from Event table.
		try {
			String strFuncType = this.currentDataObj.getFuncType();
			if("VH".equalsIgnoreCase(strFuncType)||"RE".equalsIgnoreCase(strFuncType)){
				return context.getSysEventTimes();
			}
			if(!"Y".equalsIgnoreCase(this.currrentLogicObj.getCascadeevent())){
				return context.getSysEventTimes();
			}
			return getMaxEventTimes();
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		if("RE".equalsIgnoreCase(currentDataObj.getFuncType())||"RJ".equalsIgnoreCase(currentDataObj.getFuncType())){
			propertyValue.put("sysRelId", context.getSysUserRef());
			propertyValue.put("sysRelTm", DateTimeUtil.getTimestamp());
			propertyValue.put("sysLockBy", "");
			//propertyValue.put("sysOpTm", DateTimeUtil.getTimestamp());
			//propertyValue.put("sysOpId", context.getSysOpId());
			propertyValue.put("sysRelReason", currentDataObj.getReqData().get("sysRelReason"));
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
			propertyValue.put("sysLockFlag", "F");
		}else if("DP".equalsIgnoreCase(currentDataObj.getFuncType())){
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
			propertyValue.put("sysLockFlag", "F");
		}else if("MM".equalsIgnoreCase(currentDataObj.getFuncType())){
			propertyValue.put("sysLockFlag", "F");
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
			propertyValue.put("sysOpTm", DateTimeUtil.getTimestamp());
			propertyValue.put("sysRelTm", DateTimeUtil.getTimestamp());
			propertyValue.put("sysFuncId", context.getSysFuncId());
			propertyValue.put("sysFuncName", context.getSysFuncName());
			propertyValue.put("sysOpId", context.getSysUserRef());
			propertyValue.put("sysRelId", context.getSysUserRef());
			propertyValue.put("sysBusiUnit", context.getSysBusiUnit());
			propertyValue.put("sysEventTimes", currentDataObj.getReqData().get("sysEventTimes"));
			//add by ccc 20161107 用于登记机构信息
			if(!StringUtil.isEmpty(context.getSysOrgId())){
				propertyValue.put("sysOrgId", context.getSysOrgId());
			}
		}else if(StringUtil.isEmpty(currentDataObj.getFuncType())){
			propertyValue.put("sysOpTm", DateTimeUtil.getTimestamp());
			propertyValue.put("sysFuncId", context.getSysFuncId());
			propertyValue.put("sysFuncName", context.getSysFuncName());
			propertyValue.put("sysOpId", context.getSysUserRef());
			propertyValue.put("sysBusiUnit", context.getSysBusiUnit());
			propertyValue.put("sysEventTimes", currentDataObj.getReqData().get("sysEventTimes"));
			//add by ccc 20161107 用于登记机构信息
			if(!StringUtil.isEmpty(context.getSysOrgId())){
				propertyValue.put("sysOrgId", context.getSysOrgId());
			}
			//add by YeQing 首次登录修改密码时，sysTrxSts交易状态设置为M
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
		}else{
			propertyValue.put("sysLockFlag", "F");
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
			propertyValue.put("sysOpTm", DateTimeUtil.getTimestamp());
			propertyValue.put("sysFuncId", context.getSysFuncId());
			propertyValue.put("sysFuncName", context.getSysFuncName());
			propertyValue.put("sysOpId", context.getSysUserRef());
			propertyValue.put("sysBusiUnit", context.getSysBusiUnit());
			propertyValue.put("sysEventTimes", currentDataObj.getReqData().get("sysEventTimes"));
			//add by ccc 20161107 用于登记机构信息
			if(!StringUtil.isEmpty(context.getSysOrgId())){
				propertyValue.put("sysOrgId", context.getSysOrgId());
			}
		}
		//super.appendPostSystemFields(propertyValue);
	}
	
//	protected abstract void resetEventTimes();
	protected void resetEventTimes() {
//		int maxEvent = this.context.getSysEventTimes();
//		super.currentDataObj.getReqData().put("sysEventTimes", eventTimes);
	}
	
	protected abstract void appendPostFields(List<String> updateList);

	protected abstract void appendOrders(List<String> orders);

	protected abstract void addFilterBeforeInqData(Map<String, Object> crMap);

	protected abstract void addFieldsBeforeInqData(List<String> filedList);
	
	protected abstract FuncDataObj afterPostData() throws Exception;
	
	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return postData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return releaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return postData(logicObj);
	}
	
	public boolean checkLogicNodeEnable(){
		JSONObject trxData = currentDataObj.getReqData();
		if(trxData.containsKey("LogicNodeEnable")){
			return !"false".equalsIgnoreCase(trxData.getString("LogicNodeEnable"));
		}
		return true;
	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return this.postData(logicObj);
	}
}
