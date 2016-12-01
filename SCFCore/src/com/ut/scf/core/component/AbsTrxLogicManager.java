package com.ut.scf.core.component;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.hibernate.type.Type;
import org.slf4j.Logger;
import org.springframework.util.Assert;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IBaseDao;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.dao.IDaoReformat;
import com.ut.scf.dao.QueryDaoEntity;

public abstract class AbsTrxLogicManager implements ILogicComponent{
	protected String strTableName;// 当前操作的表名

	protected String strCurrentEventTimes;// Event times

	protected String strSchema;// db schema

	protected String alias = "";// 表的别名

	protected ApSessionContext context;// AP端 session 对象

	protected FunctionPara funcObj;// 当前Function 的参数对象
	
	protected PagePara pageObj;// 当前Function Page的参数对象

	protected LogicNode currrentLogicObj; // 当前逻辑流对象
	
	protected QueryNode currrentQueryObj; // 当前查询对象

	protected FuncDataObj currentDataObj; // 当前请求的所有数据
	
	protected JSONObject currentTrxData;
	
	protected JSONObject reqData;//当前请求中的交易数据（完整结构）
	
	protected int eventTimes;
	
	protected final String KEY_NAME = "key_name";
	
	protected final String KEY_VALUE = "key_value";
	
	protected Logger getLogger() {
		return APLogUtil.getUserLogger();
	}

	@Resource(name = "commDao")
	protected IBaseDao daoHelper;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoExecHelper;
	
//	@Resource(name = "trxAddEventRecord")
//	protected ILogicComponent trxAddEventRecord;
	
	@Resource(name = "queryFactory")
	protected IQueryFactory queryFactory ;
	
	protected Object getEventData() throws Exception{
		// make sure this event times is the max event times.
		JSONObject logicData = (JSONObject) currentDataObj.getReqData();
		return getEventData(logicData.getInt("sysEventTimes"));
	}
	
	protected Object getPreEventData() throws Exception{
		JSONObject logicData = (JSONObject) currentDataObj.getReqData();
		int eventTimes=logicData.getInt("sysEventTimes")-1;		
		if(eventTimes<1)
			return null;
		return getEventData(eventTimes);
	}
	
	protected Object getEventData(int eventTimes) throws Exception{
		// make sure this event times is the max event times.
		if(!"Y".equalsIgnoreCase(currrentLogicObj.getCascadeevent())){
			return getMasterData();
		}
		Object eventEntity = ClassLoadHelper.getOrmEntity(getEventTableNameWithSechema());
		Map<String, Object> eventKeyInfo = this.getKeyInfo(eventEntity);
		BeanUtils.setBeanProperty(eventEntity, eventKeyInfo);
		
		IDaoEntity daoEntity = new QueryDaoEntity();
		daoEntity.setAlias(alias);
		daoEntity.setSerializableEntity((Serializable) eventEntity);
		
		JSONObject logicData = (JSONObject) currentDataObj.getReqData();
		daoEntity.setCondition("id.sysRefNo="+logicData.getString("sysRefNo")+" and id.sysEventTimes="+eventTimes);
		daoEntity.setReformat(new IDaoReformat() {
			
			@Override
			public Object reformat(Object recordData) {
				List objList =(List) recordData;
				if(objList==null||objList.isEmpty()){
					return null;
				}
				Object eventData = objList.get(0);
				Serializable id = (Serializable) BeanUtils.getProperty(eventData, "id");
				Map retMap = new HashMap();
				Map beanMap = BeanUtils.toMap(eventData);
				retMap.putAll(beanMap);
				retMap.remove("id");
				retMap.putAll(BeanUtils.toMap(id));
				
				return retMap;
			}
		});
		Object retObj= this.daoExecHelper.execQuery(daoEntity);
		Assert.isTrue(retObj!=null, "Get Event data failed by :"+daoEntity.getCondition());
		
		return retObj;
	}

	protected Object getMasterData() throws Exception{
		Object eventEntity = ClassLoadHelper.getOrmEntity(currrentLogicObj.getTablename());
		Map<String, Object> eventKeyInfo = this.getKeyInfo(eventEntity);
		BeanUtils.setBeanProperty(eventEntity, eventKeyInfo);
		
		IDaoEntity daoEntity = new QueryDaoEntity();
		daoEntity.setAlias(alias);
		daoEntity.setSerializableEntity((Serializable) eventEntity);
		
		JSONObject logicData = (JSONObject) currentDataObj.getReqData();
		daoEntity.setCondition("sysRefNo="+logicData.getString("sysRefNo"));
		daoEntity.setReformat(new IDaoReformat() {
			
			@Override
			public Object reformat(Object recordData) {
				List objList =(List) recordData;
				if(objList.isEmpty())
					return null;
				Map retMap = new HashMap();
				Map beanMap = BeanUtils.toMap(objList.get(0));
				retMap.putAll(beanMap);
				return retMap;
			}
		});
		Object retObj= this.daoExecHelper.execQuery(daoEntity);
		Assert.isTrue(retObj!=null, "Get Master data failed by :"+daoEntity.getCondition());
		
		return retObj;
	}
	
	protected int getMaxEventTimes() {
		// select data from DB.
		// select max event times from Event table.
		try {
			QueryNode mainLogic = new QueryNode();
			FuncDataObj dataObj = new FuncDataObj();
			LogicNode logicNode = (LogicNode) currentDataObj.getReqParaObj();
			boolean cascade ="Y".equalsIgnoreCase(logicNode.getCascadeevent());
		
			JSONObject logicData = JsonUtil.clone(currentDataObj.getReqData());
//			logicData = processMappingField(logicData);
			mainLogic.setType("S");
			mainLogic.setAsc("Y");
			dataObj.setReqParaObj(mainLogic);
			dataObj.setReqData(logicData);
		
			String tableName =getEventTableNameWithSechema();
			
			if(cascade){
				tableName = ClassLoadHelper.getOrmName(tableName);
				String sql = "select max(id.sysEventTimes) from "+tableName+" where id.sysRefNo = ?"; 
				mainLogic.setOrderby("id.sysEventTimes");
				mainLogic.setTablename(tableName);
				mainLogic.setSql(sql);
			}else{
				tableName = currrentLogicObj.getTablename();
				tableName = ClassLoadHelper.getOrmName(tableName);
				String sql = "select max(sysEventTimes) from "+tableName+" where sysRefNo = ?"; 
				mainLogic.setOrderby("sysEventTimes");
				mainLogic.setTablename(tableName);
				mainLogic.setSql(sql);
			}
			
			mainLogic.setParams(logicData.getString("sysRefNo"));
			
			FuncDataObj maxRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);
			List<IDaoEntity> entityList = maxRecord.getEntityList(maxRecord.getDoName());
			for (IDaoEntity entity : entityList) {
				entity.setReformat(new IDaoReformat() {
					
					@Override
					public Object reformat(Object recordData) {
						List<Object> recordList = (List<Object>) recordData;
						if (recordList.isEmpty())
							return 0;
						else{
							Object maxId = recordList.get(0);
							if(maxId==null||StringUtil.isNull(maxId.toString())){
								return 0;
							}
							return Integer.parseInt(maxId.toString());
						}
					}
				});
			}
			int eventTimes = -1;
			maxRecord = (FuncDataObj) this.daoExecHelper.execQuery(maxRecord);
			eventTimes = Integer.parseInt(maxRecord.get(maxRecord.getDoName()).toString());
			return eventTimes;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	protected Map<String, Object> getKeyInfo(Object entity) {
		Object keyValue = null;
		Type keyType;
		String keyName = "";
		Map<String, Object> propertyValue = new HashMap<String, Object>();
		try {
			keyType = (Type) daoHelper.getIdType(entity.getClass());
			keyName = daoHelper.getIdName(entity.getClass());
			propertyValue.put(KEY_NAME, getHibernateName(keyName));
			Class<?> clazz = keyType.getReturnedClass();
			JSONObject domData = (JSONObject) currentDataObj.getReqData();

			if (!BeanUtils.isBaseJavaType(clazz)) {
				keyValue = clazz.newInstance();
				domData.remove(keyName);
				domData.remove("sysOpTm");
//				JsonUtil.setBeanProperties(domData, keyValue);
				BeanUtils.setBeanProperty(keyValue, domData);
				propertyValue.put(KEY_VALUE, keyValue);
			} else {
				keyValue = domData.get(keyName);
				propertyValue.put(KEY_VALUE, keyValue);
			}
		} catch (IllegalAccessException e1) {
			e1.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return propertyValue;
	}
	
	protected void parseParameters(FuncDataObj logicObj) {
		currentDataObj = logicObj;
		this.reqData = currentDataObj.getReqData();
		context = ApSessionUtil.getContext();
		funcObj =  (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		pageObj =  (PagePara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT);
		currentTrxData = JsonUtil.clone(currentDataObj.getReqData());
		if(currentTrxData.containsKey("sysEventTimes")){
			if(StringUtil.isTrimNotEmpty(currentTrxData.getString("sysEventTimes")))
				eventTimes = currentTrxData.getInt("sysEventTimes");
			else{
				eventTimes = 0;
			}
		}			
		else
			eventTimes = 0;
	}
	
	protected String getTableNameWithSechema() {
		if(this.strSchema!=""&&this.strSchema!=null){
			return this.strSchema + "." + this.strTableName;
		}else{
			return this.strTableName;
		}
	}
	
	protected String getEventTableNameWithSechema() {
		return this.strSchema + "." + this.getEventTableName();
	}
	
	protected String getHibernateName(String name) {
		if (StringUtil.isTrimNotEmpty(alias)) {
			return new StringBuffer().append(alias).append(".").append(name).toString();
		}
		return name;
	}
	
	protected JSONObject processMappingField(JSONObject trxData) throws Exception{
		//
		
		if(currrentLogicObj==null){
			return trxData;
		}
		trxData = processLogicJs(trxData);
		return trxData;
	}
	
	@Resource(name = "serverNodeJs")
	protected IServerSideJs jsEngine;
	
	protected JSONObject processLogicJs(JSONObject mappingData) throws Exception{
		String jsFile = currrentLogicObj.getNodejs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			jsEngine.initTrxData(mappingData);
//			jsEngine.initReqData(reqData);
			jsEngine.initAllReqData(reqData);
			jsEngine.initTrxPara(currrentLogicObj);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
			
			mappingData= (JSONObject) jsEngine.getTrxData();
		}
		return mappingData;
	}

	protected String getEventTableName() {
		/*add by chencc 2015-1-13*/
		String cascade =currrentLogicObj==null?currrentQueryObj.getCascadeevent():currrentLogicObj.getCascadeevent();
		String eventTable = this.strTableName;
		if(!"N".equalsIgnoreCase(cascade)){
			if (!eventTable.endsWith("_E")) {
				if (eventTable.endsWith("_M")) {
					eventTable = eventTable.substring(0, eventTable.length() - 1) + "E";
				}else{
					eventTable+="_E";
				}
			}
		}
		return eventTable;
	}
	
	protected boolean isMultipleRecord(JSONObject trxObj){
		if(trxObj!=null&&trxObj.containsKey("_total_rows")){
			return true;
		}
		return false;
	}
	
	protected int getRecordCount(JSONObject trxObj){
		if(trxObj!=null&&trxObj.containsKey("_total_rows")){
			return trxObj.getInt("_total_rows");
		}
		return 0;
	}
	
	protected JSONObject getTrxDom(JSONObject rows,int recodIndex){
		String key = "rows"+recodIndex;
		if(rows.containsKey(key)){
			return rows.getJSONObject(key);
		}
		return null;
	}
	
	protected String getTableNameWithoutSchema(String fullName) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(fullName), "Table name must not be null or empty.");
		if (fullName.indexOf(".") > -1) {
			return fullName.substring(fullName.indexOf(".") + 1);
		} else {
			return fullName;
		}
	}
	
	protected String getSchema(String fullName) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(fullName), "Table name must bot be null or empty.");
		if (fullName.indexOf(".") > -1) {
			return fullName.substring(0, fullName.indexOf("."));
		} 
		else {
//			return fullName;
			return "";
		}
	}
	
	protected void appendPostSystemFields(Map<String, Object> propertyValue) {
		propertyValue.put("sysTrxSts", context.getStrTrxStatus());
		propertyValue.put("sysOpTm", DateTimeUtil.getTimestamp());
		propertyValue.put("sysFuncId", context.getSysFuncId());
		propertyValue.put("sysFuncName", context.getSysFuncName());
		propertyValue.put("sysOpId", context.getSysUserRef());
		propertyValue.put("sysEventTimes", currentDataObj.getReqData().get("sysEventTimes"));
	}
	
	protected String getNameWithoutAlias(String name) {
		if (StringUtil.isTrimNotEmpty(name) && StringUtil.isTrimNotEmpty(alias) && name.startsWith(alias)) {
			return name.substring(alias.length() + 1);
		}
		return name;
	}
	
	protected Map replaceNameWithoutAlias(Map nameMap) {
		if (nameMap == null || nameMap.isEmpty())
			return nameMap;
		Map retMap = new HashMap();
		Set<Entry<String, String>> set = nameMap.entrySet();
		for (Entry<String, String> en : set) {
			retMap.put(getNameWithoutAlias(en.getKey()), en.getValue());
		}
		return retMap;
	}
	
	protected void resetFiledList(List<String> filedList) {
		if (this.strTableName.endsWith("_E")) {
			if (filedList.contains("sysRefNo")) {
				filedList.remove("sysRefNo");
				filedList.add("id");
			}
			if (filedList.contains("sysEventTimes")) {
				filedList.remove("sysEventTimes");
				if(!filedList.contains("id"))
					filedList.add("id");
			}
		}
	}
	
	protected String resetQueryCondition(String condition) {
		if (StringUtil.isTrimEmpty(condition))
			return "";
		if (this.strTableName.endsWith("_E")) {
			if (condition.contains("sysRefNo") && !condition.contains("id.sysRefNo")) {
				condition = condition.replaceAll("sysRefNo", "id.sysRefNo");
			}
			if (condition.contains("sysEventTimes") && !condition.contains("id.sysEventTimes")) {
				condition = condition.replaceAll("sysEventTimes", "id.sysEventTimes");
			}
		}
		return condition;
	}
	
	protected JSONObject getDoTrxData(JSONObject trxData, String doName){
		JSONObject trxJsonData = trxData;
		if(trxData.containsKey("trxDom")&&!JsonUtil.isEmptyJson(trxData.getJSONObject("trxDom"))){
			trxJsonData = trxData.getJSONObject("trxDom");
		}
//		JSONObject trxJsonData = trxData.containsKey("trxDom")?trxData.getJSONObject("trxDom"):trxData;
		if(StringUtil.isTrimEmpty(doName))
			return trxJsonData;
		if(trxJsonData.containsKey(doName))
			return JsonUtil.getChildJson(trxJsonData, doName);
		return trxJsonData;
	}
	
}
