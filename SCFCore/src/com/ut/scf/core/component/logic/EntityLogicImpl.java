package com.ut.scf.core.component.logic;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.hibernate.type.Type;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.sql.ExpressionHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IBaseDao;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;

@Component("entityLogic")
public class EntityLogicImpl implements ILogicFlowComponent{

	private String strTableName;
	private String strSchema;
	private String alias;
	
	@Resource(name = "commDao")
	protected IBaseDao daoHelper;
	

	@Resource(name = "daoHelper")
	protected IDaoHelper daoExecHelper;
	protected final String KEY_NAME = "key_name";
	protected final String KEY_VALUE = "key_value";
	
	LogicNode currrentLogicObj;
	AbsDataObject currentDataObj;
	
	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		
		parseParameters(logicObj);
		LogicNode node = (LogicNode) logicObj.getReqParaObj();
		
		String componet = node.getComponent();
		FuncDataObj retObj = new FuncDataObj();
		if(ClassLoadHelper.isRegisterComponent(componet)){
			try {
				return ClassLoadHelper.getBusiComponetProcessor(componet).postData(logicObj);
			} catch (SCFThrowableException e) {
				e.printStackTrace();
				retObj.setRetStatus(AbsDataObject.EXCEPTION);
				retObj.setRetInfo(e.getMessage());
				return retObj;
			} catch (Exception e) {
				e.printStackTrace();
				retObj.setRetStatus(AbsDataObject.FAILED);
				retObj.setRetInfo(e.getMessage());
				return retObj;
			}
		}
		String strTableName = node.getTablename();
		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName ), "Miss process table name.");
		
		try {
			Object enity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());
			this.alias = this.getTableNameWithoutSchema(getTableNameWithSechema());
			Map<String, Object> keyInfo = this.getKeyInfo(enity);
			Map<String, Object> crMap = new HashMap<String, Object>();
//			crMap.put((String) keyInfo.get(this.KEY_NAME), keyInfo.get(this.KEY_VALUE));
			String queryFields = currrentLogicObj.getFields();
			List<String> filedList = ExpressionHelper.getInstence().splitToList(queryFields);

			String condition = currrentLogicObj.getCondition();

			condition = resetQueryCondition(condition);
			
			condition = ExpressionHelper.getInstence().praseMapCondition(condition,
					replaceNameWithoutAlias(crMap));
			Map<String, Object> propertyValue = new HashMap<String, Object>();
			propertyValue.putAll((JSONObject)logicObj.getReqData());
			BeanUtils.setBeanProperty(enity, propertyValue);

			IDaoEntity daoEntity = new ExecDaoEntity();
			daoEntity.setAlias(alias);
			daoEntity.setCondition(condition);
			daoEntity.setProcessList(filedList);
			daoEntity.setSerializableEntity((Serializable) enity);
			List<IDaoEntity> updateList = new ArrayList<IDaoEntity>();
			updateList.add(daoEntity);
			
			logicObj.updateEntity(currentDataObj.getDoName(), updateList);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			retObj.setRetStatus(AbsDataObject.EXCEPTION);
			retObj.setRetInfo(e.getMessage());
			return retObj;
		} catch (InstantiationException e) {
			e.printStackTrace();
			retObj.setRetStatus(AbsDataObject.EXCEPTION);
			retObj.setRetInfo(e.getMessage());
			return retObj;
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			retObj.setRetStatus(AbsDataObject.EXCEPTION);
			retObj.setRetInfo(e.getMessage());
			return retObj;
		} catch (SCFThrowableException e) {
			e.printStackTrace();
			retObj.setRetStatus(AbsDataObject.EXCEPTION);
			retObj.setRetInfo(e.getMessage());
			return retObj;
		}
		return logicObj;
	}
	
	
	protected void parseParameters(FuncDataObj logicObj) {
		currentDataObj = logicObj;
		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();

		this.strTableName = getTableNameWithoutSchema(currrentLogicObj.getTablename());
		this.strSchema = getSchema(currrentLogicObj.getTablename());
	}
	
	protected String getTableNameWithoutSchema(String fullName) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(fullName), "Table name must not be null or empty.");
		if (fullName.indexOf(".") > -1) {
			return fullName.substring(fullName.indexOf(".") + 1);
		} else {
			return fullName;
		}
	}
	
	protected String getTableNameWithSechema() {
		return this.strSchema + "." + this.strTableName;
	}
	protected String getSchema(String fullName) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(fullName), "Table name must bot be null or empty.");
		if (fullName.indexOf(".") > -1) {
			return fullName.substring(0, fullName.indexOf("."));
		} else {
			return fullName;
		}
	}
	
	protected String getHibernateName(String name) {
		if (StringUtil.isTrimNotEmpty(alias)) {
			return new StringBuffer().append(alias).append(".").append(name).toString();
		}
		return name;
	}
	
	private String getNameWithoutAlias(String name) {
		if (StringUtil.isTrimNotEmpty(name) && StringUtil.isTrimNotEmpty(alias) && name.startsWith(alias)) {
			return name.substring(alias.length() + 1);
		}
		return name;
	}
	
	private Map replaceNameWithoutAlias(Map nameMap) {
		if (nameMap == null || nameMap.isEmpty())
			return nameMap;
		Map retMap = new HashMap();
		Set<Entry<String, String>> set = nameMap.entrySet();
		for (Entry<String, String> en : set) {
			retMap.put(getNameWithoutAlias(en.getKey()), en.getValue());
		}
		return retMap;
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
				JsonUtil.setBeanProperties(domData, keyValue);
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

}
