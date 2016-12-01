package com.ut.scf.core.ref;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.ref.RefPara;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.dao.IDaoReformat;
import com.ut.scf.dao.QueryForDaoEntity;

@Service("refNoManager")
public class ReferenceNoManager implements IReferenceNo{
	
	private FuncDataObj logicObj;
	private JSONObject reqData;
	private RefPara para;
	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	@Resource(name = "logicFactory")
	ILogicFactory logicFactory ;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Override
	public Object generateNo(Object object) throws Exception {
		parseRequest(object);
		FuncDataObj retData = new FuncDataObj();
		
		Object usingRecord = queryUsingRecord();
		if(usingRecord!=null){
			FuncDataObj usingEntity =(FuncDataObj) usingRecord; 
			if(usingEntity.hasRecord()){
				String refNo = usingEntity.getString("refNo");
				List<Object> retList = new ArrayList<Object>();
				String refFields = para.getReffield();
				String [] fieldList = refFields.split(",");
				for (int i = 0; i < fieldList.length; i++) {
					Map<String,String> retMap = new HashMap<String,String>();
					retMap.put(fieldList[i], refNo);
					retList.add(retMap);
				}
				retData.buildRespose(retList);
				
				RefEntity entity = new RefEntity(para.getRefname(),refNo,getRefKey());
				ReferenceNoContext.addRefNo(entity);
				return retData;
			}else{
				FuncDataObj newEntity = getRefNo();
				if(newEntity==null||!newEntity.hasRecord()){
					throw new Exception("System canot get new reference number.");
				}
				String refPrefix = newEntity.getString("refPrefix");
				Integer initNumber = newEntity.getInteger("initNumber");
				Integer refLength = newEntity.getInteger("refLength");
				Integer refInterval = newEntity.getInteger("refInterval");
				String refNo = buildRef(refPrefix,initNumber+refInterval,refLength);
				
				insertUsing(newEntity,refNo);
				
				List<Object> retList = new ArrayList<Object>();
				String refFields = para.getReffield();
				String [] fieldList = refFields.split(",");
				for (int i = 0; i < fieldList.length; i++) {
					Map<String,String> retMap = new HashMap<String,String>();
					retMap.put(fieldList[i], refNo);
					retList.add(retMap);
				}
				
				retData.buildRespose(retList);
				
				RefEntity entity = new RefEntity(para.getRefname(),refNo,getRefKey());
				ReferenceNoContext.addRefNo(entity);
				return retData;
			}
		}else{
			FuncDataObj newEntity = getRefNo();
			if(!newEntity.hasRecord()){
				throw new Exception("System canot get new reference number.");
			}
			String refPrefix = newEntity.getString("refPrefix");
			Integer initNumber = newEntity.getInteger("initNumber");
			Integer refLength = newEntity.getInteger("refLength");
			Integer refInterval = newEntity.getInteger("refInterval");
			String refNo = buildRef(refPrefix,initNumber+refInterval,refLength);
			insertUsing(newEntity,refNo);
			
			List<Object> retList = new ArrayList<Object>();
			
			String refFields = para.getReffield();
			String [] fieldList = refFields.split(",");
			for (int i = 0; i < fieldList.length; i++) {
				Map<String,String> retMap = new HashMap<String,String>();
				retMap.put(fieldList[i], refNo);
				retList.add(retMap);
			}
			retData.buildRespose(retList);
			return retData;
		}
	}

	@Override
	public Object releaseNo(Object object) throws Exception {
		parseRequest(object);
		RefEntity entity = new RefEntity(para.getRefname(),"",getRefKey());
		if(StringUtil.isTrimEmpty(para.getRefname())){
			Map<String,List<String>> allRef = ReferenceNoContext.getAllRef(entity);
			if(allRef==null||allRef.isEmpty())
				return null;
			Object[] keys = allRef.keySet().toArray();
			for (int i = 0; i < keys.length; i++) {
				String key = keys[i].toString();
				RefEntity newRef = new RefEntity(key, "", getRefKey());
				List<String> refList =  ReferenceNoContext.getRef(newRef);
				for (String string : refList) {
					newRef.setRefNo(string);
					deleteUsing(key,string);
					ReferenceNoContext.deleteRefNo(newRef);
				}
			}
		}else{
			List<String> retList = new ArrayList<String>();
			retList=ReferenceNoContext.getRef(entity);
			for (int i = 0; i < retList.size(); i++) {
				deleteUsing(para.getRefname(),retList.get(i));
			}
			for (int i = 0; i < retList.size(); i++) {
				entity.setRefNo(retList.get(i)); 
				ReferenceNoContext.deleteRefNo(entity);
			}
		}
		//delete record
		return null;
	}

	@Override
	public Object cancelNo(Object object) throws Exception {
		parseRequest(object);
		RefEntity entity = new RefEntity(para.getRefname(),"",getRefKey());
		if(StringUtil.isTrimEmpty(para.getRefname())){
			Map<String,List<String>> allRef = ReferenceNoContext.getAllRef(entity);
			if(allRef==null||allRef.isEmpty())
				return null;
			Object[] keys = allRef.keySet().toArray();
			for (int i = 0; i < keys.length; i++) {
				String key = keys[i].toString();
				RefEntity newRef = new RefEntity(key, "", getRefKey());
				List<String> refList = ReferenceNoContext.getRef(newRef);
				for (String string : refList) {
					newRef.setRefNo(string);
					updateUsing(key,string);
					ReferenceNoContext.deleteRefNo(newRef);
				}
			}
		}else{
			List<String> retList = new ArrayList<String>();
			
			retList=ReferenceNoContext.getRef(entity);
			for (int i = 0; i < retList.size(); i++) {
				updateUsing(para.getRefname(),retList.get(i));
			}
			for (int i = 0; i < retList.size(); i++) {
				entity.setRefNo(retList.get(i)); 
				ReferenceNoContext.deleteRefNo(entity);
			}
		}
		
		return null;
	}
	
	private void parseRequest(Object object){
		logicObj = (FuncDataObj) object;
		reqData = (JSONObject) logicObj.getReqData();
		para = (RefPara) logicObj.getReqParaObj();
	}
	
	private Object queryUsingRecord(){
		StringBuffer sqls = new StringBuffer();
		sqls.append("from RefNoUsing where refName = ? and refStatus = ? order by refNo asc");
		List<Object> updateParams = new ArrayList<Object>();
		updateParams.add(para.getRefname());
		updateParams.add("R");
		
		QueryForDaoEntity entity = new QueryForDaoEntity();
		entity.setHql(sqls.toString());
		entity.setParaList(updateParams);
		entity.setLockQuery(true);
		entity.setType(QueryForDaoEntity.ENTITY_TYPE_HQL);
		entity.setReformat(new IDaoReformat() {
			
			@Override
			public Object reformat(Object recordData) {
				if(recordData==null)
					return null;
				else{
					List<Object> reflist = (List<Object>) recordData;
					return reflist.isEmpty()?null:reflist.get(0);
				}
			}
		});
		
		sqls.delete(0, sqls.length());
		sqls.append("update RefNoUsing set createBy = 'system', refStatus = 'U' where refName = ? and refStatus = ? and refNo =?");
		List<Object> updateParams2 = new ArrayList<Object>();
		updateParams2.add(para.getRefname());
		updateParams2.add("R");
		updateParams2.add("$refNo$");

		IDaoEntity entity2 = new ExecDaoEntity();
		entity2.setHql(sqls.toString());
		entity2.setParaList(updateParams2);
		entity2.setType(IDaoEntity.ENTITY_TYPE_HQL);
		entity.setForProcess(entity2);
		
		logicObj.addExcuteEntity(entity);
		
		Object retObj = daoHelper.execQuery(logicObj);
		return retObj;
	}
	
	private FuncDataObj getRefNo(){
		StringBuffer sqls = new StringBuffer();
		sqls.append("from RefNoM where refName = ?");
		List<Object> updateParams = new ArrayList<Object>();
		updateParams.add(para.getRefname());
		
		QueryForDaoEntity entity = new QueryForDaoEntity();
		entity.setHql(sqls.toString());
		entity.setParaList(updateParams);
		entity.setLockQuery(true);
		entity.setType(QueryForDaoEntity.ENTITY_TYPE_HQL);
		entity.setReformat(new IDaoReformat() {
			
			@Override
			public Object reformat(Object recordData) {
				if(recordData==null)
					return null;
				else{
					return recordData;
				}
					
			}
		});
		
		sqls.delete(0, sqls.length());
		sqls.append("update RefNoM set init_number = init_number+ref_interval where refName = ? ");
		List<Object> updateParams2 = new ArrayList<Object>();
		updateParams2.add(para.getRefname());

		IDaoEntity entity2 = new ExecDaoEntity();
		entity2.setHql(sqls.toString());
		entity2.setParaList(updateParams2);
		entity2.setType(IDaoEntity.ENTITY_TYPE_HQL);
		entity.setForProcess(entity2);
		
		logicObj.addExcuteEntity(entity);
		
		daoHelper.execQuery(logicObj);
		if(logicObj.hasRecord()){
			Object retObj = logicObj.get(logicObj.getDoName());
			if (List.class.isAssignableFrom(retObj.getClass())) {
				List<Object> entityList = (List<Object>) retObj;
				return logicObj;
			}else if(BeanUtils.isBaseDataType(retObj.getClass())){
				
			}else{
				
			}
		}else{
			
		}
		return null;
	}
	
	private String buildRef(String preFix,int no,int len){
		String strNo = no+"";
		StringBuffer buff = new StringBuffer(preFix);
		int nlen = len-preFix.length()-strNo.length();
		for (int i = 0; i < nlen; i++) {
			buff.append("0");
		}
		buff.append(strNo);
		
		Assert.isTrue(len==buff.length(), "Format ref no error.");
		return buff.toString();
	}
	
	private void insertUsing(FuncDataObj newEntity,String refNo) throws Exception{
		FuncDataObj dataObj = (FuncDataObj) this.logicObj.clone(); 
		JSONObject logicData = (JSONObject) dataObj.getReqData();
		if(logicData==null){
			logicData = JsonUtil.createJson();
		}
			
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("std.REF_NO_USING");
		mainLogic.setType("E");

		dataObj.setReqParaObj(mainLogic);
		logicData.put("refName",para.getRefname());
		logicData.put("module", newEntity.getString("module"));
		logicData.put("refStatus", "U");
		logicData.put("refNo", refNo);
		logicData.put("createBy", "System");
		logicData.put("sysRefNo",  newEntity.getString("module")+refNo);
		logicData.put("sysEventTimes", 1);
		logicData.put("sysOpTm", DateTimeUtil.getSysDateTime());
		dataObj.setReqData(logicData);
		
		dataObj = logicFactory.getProcessor(mainLogic).postData(dataObj);
		daoHelper.execUpdate(dataObj);
	}
	
	private void deleteUsing(String refName,String refNo){
		StringBuffer sqls = new StringBuffer();
		sqls.append("delete from RefNoUsing where refName = ? and refNo = ?");
		List<Object> deleteParams = new ArrayList<Object>();
		deleteParams.add(refName);
		deleteParams.add(refNo);

		IDaoEntity entity = new ExecDaoEntity();
		entity.setHql(sqls.toString());
		entity.setParaList(deleteParams);
		entity.setType("H");
		
		logicObj.addExcuteEntity(entity);
		
		daoHelper.execUpdate(logicObj);
	}
	
	private void updateUsing(String refName,String refNo){
		StringBuffer sqls = new StringBuffer();
		sqls.append("update RefNoUsing set refStatus = 'R' where refName = ? and refNo = ?");
		List<Object> updateParams = new ArrayList<Object>();
		updateParams.add(refName);
		updateParams.add(refNo);

		IDaoEntity entity = new ExecDaoEntity();
		entity.setHql(sqls.toString());
		entity.setParaList(updateParams);
		entity.setType("H");
		
		logicObj.addExcuteEntity(entity);
		
		daoHelper.execUpdate(logicObj);
	}
	
	private String getRefKey(){
		JSONObject userInfo = JsonHelper.getUserObject(this.reqData);
		return userInfo.containsKey("sessId")?userInfo.getString("sessId"):Thread.currentThread().getId()+"";
	}
}
