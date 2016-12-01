package com.ut.scf.core.component.logic.impl.beans;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.logicflow.TransforField;
import com.ut.comm.xml.logicflow.TransforNode;
import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;

@Service("trxTransForToRecordProcessor")
@Scope("prototype")
public class ASETrxTransforToBean extends AbsLogicCompManager {
	
	private final String FIELD_NAME_LOCK_FLAG = "sysLockFlag";
	private final String FIELD_NAME_LOCK_BY = "sysLockBy";
	private final String LOCKED_FLAG = "T";
	private final String UNLOCKED_FLAG = "F";
	private final String LOCKED_BY = "System";
	private final String UNLOCK_BY = "";
	
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
		TransforNode transNode = (TransforNode) currrentLogicObj;
		//申请时，提交pending中定义的栏位，并将release中定义的栏位提交到E表中
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(funcType)) {
			//复合时从E表拷贝到M表，全表更新。
			if("Y".equalsIgnoreCase(transNode.getCascadeevent())){
				updateList.clear();
			}else{
				TransforField releaseField = transNode.getRelease();
				if(releaseField!=null){
					String fields = releaseField.getFields();
					updateList.clear();
					
					if(StringUtil.isTrimNotEmpty(fields)){
						String[] filedList = fields.split(",");
						for (String string : filedList) {
							updateList.add(string);
						}
					}
					
//					if(!updateList.contains(FIELD_NAME_LOCK_FLAG)){
//						updateList.add(FIELD_NAME_LOCK_FLAG);
//					}
//					if(!updateList.contains(FIELD_NAME_LOCK_BY)){
//						updateList.add(FIELD_NAME_LOCK_BY);
//					}
				}
			}
		}else if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(funcType)) {
			updateList.clear();
			TransforField pendingField = transNode.getPending();
			if(pendingField!=null){
				String fields = pendingField.getFields();
				
				if(StringUtil.isTrimNotEmpty(fields)){
					String[] filedList = fields.split(",");
					for (String string : filedList) {
						updateList.add(string);
					}
				}
			}else{
				updateList.add("sysOpTm");
			}
			TransforField releaseField = transNode.getRelease();
			if(releaseField!=null){
				String fields = releaseField.getFields();
				
				if(StringUtil.isTrimNotEmpty(fields)){
					String[] filedList = fields.split(",");
					for (String string : filedList) {
						updateList.add(string);
					}
				}
			}
		}else if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)) {
			TransforField delePendingField = transNode.getDelepending();
			if(delePendingField!=null){
				String fields = delePendingField.getFields();
				updateList.clear();
				
				if(StringUtil.isTrimNotEmpty(fields)){
					String[] filedList = fields.split(",");
					for (String string : filedList) {
						updateList.add(string);
					}
				}else{
					updateList.add("sysOpTm");
				}
			}else{
				updateList.clear();
				updateList.add("sysOpTm");
			}
		}else if (ComponentConst.COMP_FUNC_TYPE_ROLLBACK.equalsIgnoreCase(funcType)) {
			//回滚到上一个Event状态，所以全表更新
			updateList.clear();
		}else {
			TransforField pendingField = transNode.getPending();
			if(pendingField!=null){
				String fields = pendingField.getFields();
				updateList.clear();
				
				if(StringUtil.isTrimNotEmpty(fields)){
					String[] filedList = fields.split(",");
					for (String string : filedList) {
						updateList.add(string);
					}
				}
			}else{
				updateList.add("sysOpTm");
			}
	
		}
	}
	
	protected void setPostFieldsValue(List<String> updateList,Map propertyValue) {
		if(updateList.isEmpty())
			return;
		JSONObject dataObject = this.currentDataObj.getReqData();
		
		TransforNode transNode = (TransforNode) currrentLogicObj;
		TransforField pendingField = transNode.getPending();
		String values ="";
		if(pendingField!=null){
			values = pendingField.getValues();
		}else{
			values=DateTimeUtil.getSysTime();
		}
		String funcType =  this.currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(funcType)) {
			
		}else if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(funcType)){
			TransforField releaseField = transNode.getRelease();
			if(releaseField!=null){
				if(StringUtil.isTrimNotEmpty(values))
					values+=",";
				if(StringUtil.isNull(values))
					values="";
				values += releaseField.getValues();
			}
					
			if(!updateList.contains("sysEventTimes")){
				updateList.add("sysEventTimes");
				values+=",";
				values+=currentDataObj.getReqData().getInt("sysEventTimes");
			}
		}else if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)) {
			TransforField dpField = transNode.getDelepending();
			if(dpField!=null){
				values = dpField.getValues();
			}
			if(StringUtil.isNull(values)){
				values=DateTimeUtil.getSysTime();//回滚到当前时间，实际上应该是event表中的时间
			}
			
			Object eventObj= currentDataObj.getReqData().get("sysEventTimes");
			int currentEvent = 0;
			if(eventObj != null){
				currentEvent = Integer.parseInt(eventObj.toString());
			}
			values+=",";
			values+=currentEvent;
			updateList.add("sysEventTimes");
		}else if (ComponentConst.COMP_FUNC_TYPE_ROLLBACK.equalsIgnoreCase(funcType)) {
			updateList.clear();
			return;
		}else{//pending
			if(StringUtil.isNull(values))
				values="";
			Object eventObj= currentDataObj.getReqData().get("sysEventTimes");
			int currentEvent = 0;
			if(eventObj != null){
				currentEvent = Integer.parseInt(eventObj.toString());
			}
			values+=",";
			values+=currentEvent;
			updateList.add("sysEventTimes");
		}
		
		if(StringUtil.isTrimNotEmpty(values)){
			String[] filedList = values.split(",");
			Assert.isTrue(updateList.size() == filedList.length,"Transfor to values not equals fields.");
			for (int i = 0; i < filedList.length; i++) {
				String fieldValue = filedList[i];
				if(fieldValue.startsWith("$")&&fieldValue.endsWith("$")){
					String ss = fieldValue.replace("$", "").trim();
					Object objValue = dataObject.get(ss);
					propertyValue.put(updateList.get(i),objValue);
				}else{
					propertyValue.put(updateList.get(i), filedList[i]);
				}
			}
		}
	}
	
	@Override
	protected FuncDataObj execPostData() throws Exception {
		if(!checkLogicNodeEnable()){
			return null;
		}
		String funcType =  this.currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)){
			return updatePendingData();
		}
		return super.execPostData();
	}
	
	@Override
	protected FuncDataObj afterPostData() throws Exception {
		if(!checkLogicNodeEnable()){
			return null;
		}
		
		if (!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())) {
			return null;
		}
		
		String funcType =  this.currentDataObj.getFuncType();
		//申请时，提交pending中定义的栏位，并将release中定义的栏位提交到E表中
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(funcType)||ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(funcType)) {
			
			Object eventData =super.getPreEventData();
			JSONObject dataObject = null;
			if(eventData==null){
				dataObject= this.currentDataObj.getReqData();
				if(!dataObject.containsKey("sysEventTimes"))
					dataObject.put("sysEventTimes", 1);
			}else{
				dataObject = JsonUtil.getJSON(eventData);
				int maxEvent = dataObject.getInt("sysEventTimes");
				maxEvent++;
				dataObject.put("sysEventTimes", maxEvent);
			}
			
			TransforNode transNode = (TransforNode) currrentLogicObj;
			TransforField releaseField = transNode.getRelease();
			if(releaseField!=null){
				String strFields = releaseField.getFields();
				String strValues = releaseField.getValues();
				if(StringUtil.isTrimNotEmpty(strFields)){
					String[] filedList = strFields.split(",");
					String[] valueList = strValues.split(",");
					Assert.isTrue(valueList.length == filedList.length,"Transfor to values not equals fields.");
					for (int i = 0; i < valueList.length; i++) {
						String fieldValue = valueList[i];
						if(fieldValue.startsWith("$")&&fieldValue.endsWith("$")){
							Object objValue = currentDataObj.getReqData().get(fieldValue.replace("$", "").trim());
							dataObject.put(filedList[i],objValue);
						}else{
							dataObject.put(filedList[i], valueList[i]);
						}
					}
				}
			}
			dataObject.put("sysTrxSts", "T");
			dataObject.put(FIELD_NAME_LOCK_FLAG, "T");
			dataObject.put(FIELD_NAME_LOCK_BY,getMappingFieldValue(FIELD_NAME_LOCK_BY));
			currentDataObj.setReqData(dataObject);
		}else if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(funcType)){
//			MM 组件更新E表时，从E表抓取数据，更新transfor to的栏位
			Object eventData =super.getPreEventData();
			JSONObject dataObject = null;
			if(eventData==null){
				dataObject= this.currentTrxData;
			}else{
				dataObject = JsonUtil.getJSON(eventData);
			}
			int maxEvent = dataObject.getInt("sysEventTimes");
			maxEvent++;
			dataObject.put("sysEventTimes", maxEvent);
			
			TransforNode transNode = (TransforNode) currrentLogicObj;
			TransforField releaseField = transNode.getRelease();
			if(releaseField!=null){
				String strFields = releaseField.getFields();
				String strValues = releaseField.getValues();
				if(StringUtil.isTrimNotEmpty(strFields)){
					String[] filedList = strFields.split(",");
					String[] valueList = strValues.split(",");
					Assert.isTrue(valueList.length == filedList.length,"Transfor to values not equals fields.");
					for (int i = 0; i < valueList.length; i++) {
						String fieldValue = valueList[i];
						if(fieldValue.startsWith("$")&&fieldValue.endsWith("$")){
							Object objValue = currentDataObj.getReqData().get(fieldValue.replace("$", "").trim());
							dataObject.put(filedList[i],objValue);
						}else{
							dataObject.put(filedList[i], valueList[i]);
						}
					}
				}
			}
			dataObject.put("sysTrxSts", "M");
			currentDataObj.setReqData(dataObject);
			
		}else if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)){
//			JSONObject logicData = (JSONObject) currentDataObj.getReqData();
//			int event= logicData.getInt("sysEventTimes");
//			event++;//主表中--之后更新主记录了
//			logicData.put("sysEventTimes", event);
//			Object eventData =super.getEventData(event);
//			JSONObject dataObject = null;
//			if(eventData==null){
//				dataObject=currentDataObj.getReqData();
//			}else{
//				dataObject = JsonUtil.getJSON(eventData);
//				dataObject.putAll( currentDataObj.getReqData());
//			}
//			currentDataObj.setReqData(dataObject);
			return deleteEventData();
		}else{
			
		}
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
	
	@Override
	protected String getOperateName() {
		String funcType =  this.currentDataObj.getFuncType();
		//申请时，提交pending中定义的栏位，并将release中定义的栏位提交到E表中
		if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)) {
			Object eventObj= currentDataObj.getReqData().get("sysEventTimes");
			int currentEvent = 0;
			if(eventObj != null){
				currentEvent = Integer.parseInt(eventObj.toString());
			}
			if(currentEvent<1){//如果是增加记录，直接删除当前P档数据
				return IDaoEntity.OPERATE_NAME_DELETE;
			}
		}else if(ComponentConst.COMP_FUNC_TYPE_ROLLBACK.equalsIgnoreCase(funcType)){
			return IDaoEntity.OPERATE_NAME_UPDATE;
		}
		return IDaoEntity.OPERATE_NAME_ADD_OR_UPDATE;
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strTrxType)||ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)) {
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
		}else if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)) {
			propertyValue.put("sysTrxSts", "M");
		}else if (ComponentConst.COMP_FUNC_TYPE_ROLLBACK.equalsIgnoreCase(strTrxType)) {
			propertyValue.put("sysTrxSts", "M");
		}else{
			propertyValue.put("sysTrxSts", context.getStrTrxStatus());
			
			//在不级联更新E表的情况下，复核时需要将release中配置的栏位更新到M表中
			//需要级联的情况下，也应该以配置的release节点值为主
//			if(!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())){
				TransforNode transNode = (TransforNode) currrentLogicObj;
				TransforField releaseField = transNode.getRelease();
				if(releaseField!=null){
					String strFields = releaseField.getFields();
					String strValues = releaseField.getValues();
					if(StringUtil.isTrimNotEmpty(strFields)){
						String[] filedList = strFields.split(",");
						String[] valueList = strValues.split(",");
						Assert.isTrue(valueList.length == filedList.length,"Transfor to values not equals fields.");
						
						for (int i = 0; i < valueList.length; i++) {
							String fieldValue = valueList[i];
							if(fieldValue.startsWith("$")&&fieldValue.endsWith("$")){
								Object objValue = currentDataObj.getReqData().get(fieldValue.replace("$", "").trim());
//								dataObject.put(filedList[i],objValue);
								propertyValue.put(filedList[i],objValue);
							}else{
								propertyValue.put(filedList[i], valueList[i]);
							}
						}
					}
				}
//			}
			
		}
		if(ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)&&(JsonHelper.getTrxObject(reqData).get("isAgree").equals("Y"))){
			propertyValue.put("sysTrxSts", "M");
			propertyValue.put("sysLockFlag", "F");
			propertyValue.put("sysLockBy", "");
		}
		propertyValue.put("sysOpTm", DateTimeUtil.getTimestamp());
		propertyValue.put("sysFuncId", context.getSysFuncId());
		propertyValue.put("sysFuncName", context.getSysFuncName());
		propertyValue.put("sysOpId", context.getSysUserRef());
//		propertyValue.put("sysEventTimes", context.getSysEventTimes());
		propertyValue.put("sysEventTimes", currentDataObj.getReqData().get("sysEventTimes"));
		currentDataObj.getReqData().putAll(propertyValue);
	}
	
	@Override
	protected void resetEventTimes() {
		String strTrxType = currentDataObj.getFuncType();
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strTrxType)) {
			int maxEvent = getMaxEventTimes();
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)){
			int maxEvent = getMaxEventTimes();
			maxEvent++;//同pending保持一致，rj的时候已经删除了记录，除了主表没有删
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		} else if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)){
//			int maxEvent = getMaxEventTimes();
//			maxEvent--;
//			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		} else if(ComponentConst.COMP_FUNC_TYPE_ROLLBACK.equalsIgnoreCase(strTrxType)){
			int maxEvent = getMaxEventTimes();
			try {
				Object eventEntity = getEventData(maxEvent-1);
				if(eventEntity!=null){
					super.currentDataObj.getReqData().putAll((Map)eventEntity);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			maxEvent++;
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}else if (ComponentConst.COMP_FUNC_TYPE_REFUSE.equalsIgnoreCase(strTrxType)) {
			int maxEvent = getMaxEventTimes();
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		} else {
			int maxEvent = super.getMaxEventTimes();
			maxEvent++;
			super.currentDataObj.getReqData().put("sysEventTimes", maxEvent);
		}	
	}
	
	protected void checkTransaction(JSONObject retTrxData)  throws Exception {
		String strTrxType = currentDataObj.getFuncType();
		//DP 时，对于需要transforto 多个表的情况，通过统一的条件更新：所以不用单条记录验证。
		if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)) {
			return ;
		}
		Object targetData = getMasterData();
		if(targetData!=null){
			Map masterData = (Map)targetData;
			Object sysLockFlag = masterData.get(FIELD_NAME_LOCK_FLAG);
			Object sysLockBy = masterData.get(FIELD_NAME_LOCK_BY);
			Object currentLocker = retTrxData.get(FIELD_NAME_LOCK_BY);
			if(sysLockFlag!=null&&"T".equalsIgnoreCase(sysLockFlag.toString())){
				Assert.isTrue(currentLocker!=null, "Canot get Transfor locker, please check with administrator.");
				Assert.isTrue(sysLockBy!=null&&sysLockBy.toString().equalsIgnoreCase(currentLocker.toString()), String.format("Target Transfor has locked by other locker:%s, please check with administrator.",sysLockBy.toString()));
			}
		}
	}
	
	@Override
	protected boolean isMultipleRecord(JSONObject trxObj){
		String strTrxType = currentDataObj.getFuncType();
		//DP 时，对于需要transforto 多个表的情况，通过统一的条件更新：lockby和lockflag
//		if (ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(strTrxType)) {
//			return false;
//		}
		return super.isMultipleRecord(trxObj);
	}
	
	public FuncDataObj updatePendingData(){
		FuncDataObj obj = new FuncDataObj();	
		
		String tableName = currrentLogicObj.getTablename();
		TransforNode transNode = (TransforNode) currrentLogicObj;
		
		List<String> updateList = new ArrayList<String>();
		TransforField dpField = transNode.getDelepending();
		List<Object> valueList = new ArrayList<Object>();
		if(dpField!=null){
			String updateStr = dpField.getFields();
			String values = "";
			if(StringUtil.isTrimNotEmpty(updateStr)){
				String [] updates = updateStr.split(",");
				for (String string : updates) {
					updateList.add(string);
				}
			}
			
			values = dpField.getValues();
			
			String [] valuesList = values.split(",");
			for (String string : valuesList) {
				if (string.contains("$")) {
					String newParam = string.substring(string.indexOf("$") + 1,
							string.lastIndexOf("$"));
					Object value = getMappingFieldValue(newParam);
	
					if (string.contains(":type")) {
						valueList.add(parseDateType(string));
					} else {
						valueList.add(value);
					}
				}else {
					if (string.contains(":type")) {
						valueList.add(parseDateType(string));
					} else {
						valueList.add(string);
					}
				}
			}
		}
		
		Object eventObj= currentDataObj.getReqData().get("sysEventTimes");
		int currentEvent = 0;
		if(eventObj != null){
			currentEvent = Integer.parseInt(eventObj.toString());
			currentEvent--;
		}
		if(!updateList.contains("sysEventTimes")){
			updateList.add("sysEventTimes");
			valueList.add(currentEvent);
		}
		if(!updateList.contains("sysTrxSts")){
			updateList.add("sysTrxSts");
			valueList.add("M");
		}
		
		
		StringBuffer setBuff = new StringBuffer(" set ");
		for (String object : updateList) {
			setBuff.append(object).append(" = ? , ");
		}
		setBuff.delete(setBuff.lastIndexOf(","), setBuff.length());
		
		
		StringBuffer condition = new StringBuffer(" where ");
		condition.append(FIELD_NAME_LOCK_FLAG).append(" = ? and ")
		.append(FIELD_NAME_LOCK_BY).append(" = ? and ").append(" sysTrxSts = ? ");
		valueList.add(LOCKED_FLAG);
		valueList.add(getMappingFieldValue(FIELD_NAME_LOCK_BY));
		valueList.add("M");
		
		StringBuffer sqlBuff = new StringBuffer();
		sqlBuff.append("UPDATE ").append( ClassLoadHelper.getOrmName(tableName))
		.append(setBuff).append(condition);
		
		
		IDaoEntity daoEntity = new ExecDaoEntity();	
		daoEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		daoEntity.setHql(sqlBuff.toString());

		daoEntity.setParaList(valueList);
		daoEntity.setTableName( ClassLoadHelper.getOrmName(tableName));
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_UPDATE);
		obj.addExcuteEntity(daoEntity);	
		return obj;
	}
	
	public FuncDataObj deleteEventData(){
		FuncDataObj obj = new FuncDataObj();	
		String tableName = 	getEventTableNameWithSechema();
	
		List<Object> valueList = new ArrayList<Object>();
		StringBuffer condition = new StringBuffer(" where ");
		condition.append(FIELD_NAME_LOCK_FLAG).append(" = ? and ")
		.append(FIELD_NAME_LOCK_BY).append(" = ? and ").append(" sysTrxSts = ? ");
		valueList.add(LOCKED_FLAG);
		valueList.add(getMappingFieldValue(FIELD_NAME_LOCK_BY));
		valueList.add("T");
		
		StringBuffer sqlBuff = new StringBuffer();
		sqlBuff.append("delete from ").append( ClassLoadHelper.getOrmName(tableName)).append(condition);
		IDaoEntity daoEntity = new ExecDaoEntity();	
		daoEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		daoEntity.setHql(sqlBuff.toString());
		daoEntity.setParaList(valueList);
		daoEntity.setTableName( ClassLoadHelper.getOrmName(tableName));
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_UPDATE);
		obj.addExcuteEntity(daoEntity);	
		return obj;
	}
	
	public String getMappingFieldValue(String mappingField){
		JSONObject trxObj = currentDataObj.getReqData();
		boolean isMult = isMultipleRecord(trxObj);
		if(isMult){
			int totalRecords = getRecordCount( trxObj);
			if(totalRecords==0){
				JSONObject retTrxData = JsonHelper.getTrxObject(reqData);
				try {
					retTrxData = processLogicJs(retTrxData);
				} catch (Exception e) {
					e.printStackTrace();
				}
				mappingField=currrentLogicObj.getFpParam().trim().equals("")?"":currrentLogicObj.getFpParam();
				return retTrxData.containsKey(mappingField)?retTrxData.getString(mappingField):"";
			}else{
				for (int j = 0; j <totalRecords; j++) {
					JSONObject retTrxData = getTrxDom(trxObj,j);
					try {
						retTrxData = processLogicJs(retTrxData);
					} catch (Exception e) {
						e.printStackTrace();
					}
					return retTrxData.containsKey(mappingField)?retTrxData.getString(mappingField):"";
				}
			}
		}else{
			try {
				trxObj = processLogicJs(trxObj);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return trxObj.containsKey(mappingField)?trxObj.getString(mappingField):"";
		}
		try {
			trxObj = processLogicJs(trxObj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return trxObj.containsKey(mappingField)?trxObj.getString(mappingField):"";
	}
	
	private Object parseDateType(String value) {
		String strValue = value.substring(0, value.indexOf(":type"));
		String strType = value.substring(value.indexOf(":type")
				+ ":type".length());
		if (BeanUtils.isBaseJavaType(strType)) {
			Object retObj = BeanUtils.getBaseJavaObj(strValue, strType);
			if (retObj != null)
				return retObj;
		}
		return strValue;
	}
	
	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();
		this.strTableName = getTableNameWithoutSchema(currrentLogicObj.getTablename());
		this.strSchema = getSchema(currrentLogicObj.getTablename());
		parseParameters(logicObj);
		currentTrxData = getDoTrxData(currentDataObj.getReqData(),currrentLogicObj.getDoname());
		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName), "Miss process table name.");
		FuncDataObj processResult = new FuncDataObj();
		
		currentDataObj.setReqData(currentTrxData);
		
		processResult.mergeResponse(updatePendingData());

		processResult.mergeResponse(afterPostData());
		
		return processResult;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
