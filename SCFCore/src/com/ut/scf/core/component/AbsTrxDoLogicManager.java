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

public abstract class AbsTrxDoLogicManager extends AbsTrxLogicManager{
	
	protected void parsePostParamenter() throws Exception{
		currrentLogicObj = (LogicNode) currentDataObj.getReqParaObj();
		
		this.strTableName = getTableNameWithoutSchema(currrentLogicObj.getTablename());
		this.strSchema = getSchema(currrentLogicObj.getTablename());

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
		
		reqData = currentDataObj.getReqData();//原始完整数据
		
		currentTrxData = processMappingField(currentTrxData);
		
		currentDataObj.setReqData(currentTrxData);
		
		currentTrxData = getDoTrxData(currentDataObj.getReqData(),currrentLogicObj.getDoname());
	}
	
	protected void parseQueryParamenter(){
		currrentQueryObj = (QueryNode) currentDataObj.getReqParaObj();
		this.strTableName = getTableNameWithoutSchema(currrentQueryObj.getTablename());
		this.strSchema = getSchema(currrentQueryObj.getTablename());

		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName), "Miss process table name.");
		
	}
	
	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		String strTrxType = logicObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {
			return postReleaseData(logicObj);
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)){
			return postPendingData(logicObj);
		} else if(ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(strTrxType)){
			return postMasterData(logicObj);
		}else if(ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strTrxType)){
			return postPendingData(logicObj);
		}
		return null;
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		parseQueryParamenter();
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

		Object enity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());

		this.alias = this.getTableNameWithoutSchema(getTableNameWithSechema());

		Map<String, Object> keyInfo = this.getKeyInfo(enity);
		Map<String, Object> crMap = new HashMap<String, Object>();
		crMap.put((String) keyInfo.get(this.KEY_NAME), keyInfo.get(this.KEY_VALUE));

		String queryFields = currrentQueryObj.getFields();
		List<String> filedList = ExpressionHelper.getInstence().splitToList(queryFields);

		resetFiledList(filedList);

		String condition = currrentQueryObj.getCondition();

		condition = resetQueryCondition(condition);
		
		condition = ExpressionHelper.getInstence().praseMapCondition(condition,
				replaceNameWithoutAlias(crMap));

		String obderBy = currrentQueryObj.getOrderby();
		List<String> orderList = ExpressionHelper.getInstence().splitToList(obderBy);

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
	
	/**
	 * @see update orgi data to D(ED)
	 * @return
	 */
	public FuncDataObj updateOrgiDoData(String doStatus,String tableName){
		FuncDataObj obj = new FuncDataObj();	
		
		
		String condition = currrentLogicObj.getCondition();
		String para = currrentLogicObj.getParams();
		List<Object> paraList = new ArrayList<Object>();
		paraList.add(doStatus);
		
		if(StringUtil.isTrimNotEmpty(para)){
			String [] paraFileds = para.split(",");
			for (String string : paraFileds) {
				paraList.add(getMappingFieldValue(string));
			}
		}
		
		StringBuffer sqlBuff = new StringBuffer();
		sqlBuff.append("UPDATE ").append( ClassLoadHelper.getOrmName(tableName))
		.append(" set ").append(" sysTrxSts = ? ")
		.append(" where ").append(condition);
		
		
		IDaoEntity daoEntity = new ExecDaoEntity();	
		daoEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		daoEntity.setHql(sqlBuff.toString());

		daoEntity.setParaList(paraList);
		daoEntity.setTableName( ClassLoadHelper.getOrmName(tableName));
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE);
		obj.addExcuteEntity(daoEntity);	
		return obj;
	}
	
	
	public String getMappingFieldValue(String mappingField){
		boolean isMult = isMultipleRecord(currentTrxData);
		if(isMult){
			int totalRecords = getRecordCount( currentTrxData);
			for (int j = 0; j <totalRecords; j++) {
				JSONObject retTrxData = getTrxDom(currentTrxData,j);
				return retTrxData.containsKey(mappingField)?retTrxData.getString(mappingField):"";
			}
		}else{
			return currentTrxData.containsKey(mappingField)?currentTrxData.getString(mappingField):"";
		}
		JSONObject reqData = currentDataObj.getReqData();
		
		return reqData.containsKey(mappingField)?reqData.getString(mappingField):"";
	}
	
	/**
	 * @see delete orgi data by status
	 * @return
	 */
	public FuncDataObj deleteOrgiDoData(String doStatus,String tableName){
		FuncDataObj obj = new FuncDataObj();	
		
//		String tableName = currrentLogicObj.getTablename();
		String condition = currrentLogicObj.getCondition();
		String para = currrentLogicObj.getParams();
		List<Object> paraList = new ArrayList<Object>();
		paraList.add(doStatus);
	
		if(StringUtil.isTrimNotEmpty(para)){
			String [] paraFileds = para.split(",");
			for (String string : paraFileds) {
				paraList.add(getMappingFieldValue(string));
			}
		}
		
		StringBuffer sqlBuff = new StringBuffer();
		sqlBuff.append("DELETE FROM ").append( ClassLoadHelper.getOrmName(tableName))
		.append(" where sysTrxSts = ? and ").append(condition);
		
		
		IDaoEntity daoEntity = new ExecDaoEntity();	
		daoEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		daoEntity.setHql(sqlBuff.toString());

		daoEntity.setParaList(paraList);
		daoEntity.setTableName(tableName);
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_DELETE);
		
		obj.addExcuteEntity(daoEntity);	
		return obj;
	}
	
	/**
	 * @see add new do data by status
	 * @return
	 * @throws Exception 
	 */
	public FuncDataObj addNewDoData(String doStatus) throws Exception{
		JSONObject trxData =currentTrxData; 
		boolean isMult = isMultipleRecord(trxData);
		FuncDataObj processResult = new FuncDataObj();
		if(isMult){
			int totalRecords = getRecordCount( trxData);
			for (int j = 0; j <totalRecords; j++) {
				JSONObject retTrxData = getTrxDom(trxData,j);
				
				retTrxData.put("sysEventTimes", 1);

				currentDataObj.setReqData(processMappingField(retTrxData));
				
				processResult.mergeResponse(execPostData(doStatus));
			}
		}else{
			trxData = processMappingField(trxData);
			
			trxData.put("sysEventTimes", 1);
			
			currentDataObj.setReqData(trxData);
			
			processResult.mergeResponse(execPostData(doStatus));

		}
		
		return processResult;
	}
	
	/**
	 * @see update new do data to M
	 * @return
	 * @throws Exception 
	 */
	public FuncDataObj updateNewDoData() throws Exception{
		
		JSONObject trxData =currentTrxData; 
		boolean isMult = isMultipleRecord(trxData);
		FuncDataObj processResult = new FuncDataObj();
		if(isMult){
			int totalRecords = getRecordCount( trxData);
			for (int j = 0; j <totalRecords; j++) {
				JSONObject retTrxData = getTrxDom(trxData,j);

				retTrxData=processMappingField(retTrxData);
				
				retTrxData.put("sysEventTimes", 1);
				retTrxData.put("sysLockFlag", "F");
				retTrxData.put("sysLockBy", "");
				
				currentDataObj.setReqData(retTrxData);
				
				
				
				processResult.mergeResponse(execPostData("M"));
				
			}
		}else{
			trxData = processMappingField(trxData);
			
			trxData.put("sysEventTimes", 1);
			
			currentDataObj.setReqData(trxData);
			
			processResult.mergeResponse(execPostData("M"));
		}
		
		return processResult;
	}
	
	protected FuncDataObj execPostData(String strTrxStatus) throws Exception {
		
		Object entity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());
		Map<String, Object> keyInfo = this.getKeyInfo(entity);
		Map<String, Object> propertyValue = new HashMap<String, Object>();
		List<String> updateList = new ArrayList<String>();
		
		String updateFields = currrentLogicObj.getFields();
		List<String> filedList = ExpressionHelper.getInstence().splitToList(updateFields);
		updateList.addAll(filedList);
		
		if (updateList.isEmpty()) {
			propertyValue.putAll(currentDataObj.getReqData());
		} else {
			setPostFieldsValue(updateList,propertyValue);
		}
		appendPostSystemFields(propertyValue);
		
		propertyValue.put("sysTrxSts", strTrxStatus);
		
		propertyValue.put(getNameWithoutAlias((String) keyInfo.get(this.KEY_NAME)), keyInfo.get(this.KEY_VALUE));
		BeanUtils.setBeanProperty(entity, propertyValue);
		
		IDaoEntity daoEntity = new ExecDaoEntity();
		daoEntity.setAlias(alias);
		daoEntity.setProcessList(updateList);
		daoEntity.setSerializableEntity((Serializable) entity);
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE);
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
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		if("RE".equalsIgnoreCase(currentDataObj.getFuncType())){
			propertyValue.put("sysRelId", context.getSysUserRef());
			propertyValue.put("sysRelTm", DateTimeUtil.getTimestamp());
			//临时解决报 sysOpTm 为空的情况，有的交易为空，有的交易不为空s
			propertyValue.put("sysOpTm", DateTimeUtil.getTimestamp());
			
			/** ------解决复核时系统字段值丢失问题 add by YeQing 2016-10-24---------*/
			propertyValue.put("sysFuncId", context.getSysFuncId());
			propertyValue.put("sysFuncName", context.getSysFuncName());
			propertyValue.put("sysOpId", context.getSysUserRef());
			/** ------解决复核时系统字段值丢失问题 add by YeQing 2016-10-24---------*/
			
			propertyValue.put("sysLockBy", "");
			propertyValue.put("sysRelReason", currentDataObj.getReqData().get("sysRelReason"));
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
			//add by ccc 20161107 用于登记机构信息
			if(!StringUtil.isEmpty(context.getSysOrgId())){
				propertyValue.put("sysOrgId", context.getSysOrgId());
			}

		}else{
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
	}

	protected void setPostFieldsValue(List<String> updateList,Map propertyValue) {
		JSONObject dataObject = this.currentDataObj.getReqData();
		for (String fieldName : updateList) {
			Object value = JsonUtil.getProperty(dataObject, fieldName);
			propertyValue.put(fieldName, value);
		}
	}
	
	public boolean checkLogicNodeEnable(){
		JSONObject trxData = currentDataObj.getReqData();
		if(trxData.containsKey("LogicNodeEnable")){
			return !"false".equalsIgnoreCase(trxData.getString("LogicNodeEnable"));
		}
		return true;
	}
}
