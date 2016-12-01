package com.ut.scf.core.services.accounting.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.AbsTrxLogicManager;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoReformat;

@Service("accountDaoImpl")
public class AccountingDaoImpl extends AbsTrxLogicManager{
	
	private JSONObject reqData;
	
	ILogicComponent editRecord;
	
	private final String ACCOUNTING_TABLE_NAME = "";
	
	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose();
		return obj;
	}

	private void resetEventTimes() {
		reqData.put("sysEventTimes", "1");
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		parseParameters(logicObj);
		
		FuncDataObj processResult = new FuncDataObj();
		
		String doName = this.currrentLogicObj.getDoname();
		
		JSONObject accountingJson = StringUtil.isTrimNotEmpty(doName)?reqData.getJSONObject(doName):reqData;
		
		int subjectCount = getRecordCount(accountingJson);
		resetEventTimes();
		for (int i = 0; i < subjectCount; i++) {
			JSONObject sbjectjson = super.getTrxDom(accountingJson, i);
			processResult.mergeResponse(execPostData(sbjectjson));
		}
		return processResult;
	}

	protected void parseParameters(FuncDataObj logicObj) {
		super.parseParameters(logicObj);
		reqData = logicObj.getReqData();
		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();
	}
	
	protected FuncDataObj execPostData(Map accountingSubject) throws Exception {
		Object entity = ClassLoadHelper.getOrmEntity(currrentLogicObj.getTablename());
		Map<String, Object> propertyValue = new HashMap<String, Object>();
		propertyValue.putAll(accountingSubject);
		appendPostSystemFields(propertyValue);
		propertyValue.put("sysRefNo", UUIdGenerator.getUUId());
		BeanUtils.setBeanProperty(entity, propertyValue);
		
		IDaoEntity daoEntity = new ExecDaoEntity();
		daoEntity.setAlias(alias);
		daoEntity.setSerializableEntity((Serializable) entity);
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_ADD);
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

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		List<Object> subjects = generateAccount();
		FuncDataObj obj = storeSubjects(subjects,"P");
		return obj;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		JSONObject trxData = logicObj.getReqData();
		List<Object> subjects = getStoredSubjects(trxData);
		FuncDataObj obj = updateSubjects(subjects);
		return obj;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		List<Object> subjects = generateAccount();
		FuncDataObj obj = storeSubjects(subjects,"M");
		return obj;
	}
	
	private List<Object> generateAccount() {
		return new ArrayList<Object>();
	}
	
	private FuncDataObj storeSubjects(List<Object> subjects,String type) throws Exception {
		FuncDataObj processResult = new FuncDataObj();
		for (Object subject : subjects) {
			Map subjectMap = BeanUtils.toMap(subject);
			subjectMap.put("sysTrxSts", type);
			processResult.mergeResponse(execPostData(subjectMap));
		}
		return processResult;
	}
	
	private FuncDataObj updateSubjects(List<Object> subjects) throws Exception {
		FuncDataObj processResult = new FuncDataObj();
		for (Object subject : subjects) {
			processResult.mergeResponse(execPostData(BeanUtils.toMap(subject)));
		}
		return processResult;
	}
	
	private List<Object> getStoredSubjects(JSONObject trxData) {
		JSONObject funcObj = JsonHelper.getTrxObject(trxData);
		String funcRef = funcObj.getString("sysRefNo");
		Integer funcEvent = funcObj.getInt("sysEventTimes");
		
		FuncDataObj logicDataObj = new FuncDataObj();
		
		QueryNode queryObj = new QueryNode();
		queryObj.setType("E");

		queryObj.setTablename(ACCOUNTING_TABLE_NAME);
		//暂时不匹配event times
//		queryObj.setCondition("funcRef = "+funcRef+" and funcEventTimes = "+funcEvent);
		queryObj.setCondition("funcRef = "+funcRef);
		queryObj.setOrderby("sysRefNo");
		queryObj.setAsc("Y");
		
		logicDataObj.setReqParaObj(queryObj );
		logicDataObj.setReqData(trxData);
		
		FuncDataObj maxRecord = queryFactory.getProcessor(queryObj).queryData(logicDataObj);
		maxRecord = (FuncDataObj) this.daoExecHelper.execQuery(maxRecord);
		return (List<Object>) maxRecord.get(maxRecord.getDoName());
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		return null;
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return this.postData(logicObj);
	}
}
