package com.ut.scf.core.component.logic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IBaseDao;
import com.ut.scf.dao.IDaoEntity;

@Component("hqlLogic")
public class HQLLogicImpl implements ILogicFlowComponent {

	@Resource(name = "commDao")
	protected IBaseDao daoHelper;

	LogicNode currrentLogicObj;
	AbsDataObject currentDataObj;

	protected Logger getLogger() {
		return APLogUtil.getUserLogger();
	}

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		parseParameters(logicObj);
		JSONObject logicData = (JSONObject) logicObj.getReqData();
		JSONObject trxData = getDoTrxData(logicData, currrentLogicObj.getDoname());

		boolean isMult = isMultipleRecord(trxData);
		FuncDataObj processResult = new FuncDataObj();
		if (isMult) {
			int totalRecords = getRecordCount(trxData);
			for (int j = 0; j < totalRecords; j++) {
				JSONObject retTrxData = getTrxDom(trxData, j);
				processResult.mergeResponse(processSingleRecord(processMappingField(retTrxData)));
			}
		} else {
			trxData = processMappingField(trxData);

			processResult = processSingleRecord(processMappingField(trxData));
		}

		return processResult;
	}

	protected void parseParameters(FuncDataObj logicObj) {
		currentDataObj = logicObj;
		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();
	}

	protected FuncDataObj processSingleRecord(JSONObject recordData) {
		FuncDataObj retObj = new FuncDataObj();
		try {
			// 添加 hql语句
			StringBuffer hql = new StringBuffer();
			String sql = currrentLogicObj.getSql().trim();
			hql.append(sql);

			// 将参数配置的固定值或者需要从前台传递的值放入list里传到后台(其中list[0]是hql语句)
			String[] params = new String[0];
			if (StringUtil.isTrimNotEmpty(currrentLogicObj.getParams())) {
				params = currrentLogicObj.getParams().split(",");
			}

			List<Object> updateParams = new ArrayList<Object>();

			List<String> paramList = Arrays.asList(params);
			for (int i = 0; i < paramList.size(); i++) {
				String param = paramList.get(i).trim();
				if (param.startsWith("$") && param.endsWith("$")) {
					String newParam = param.substring(1, param.length() - 1);
					Object value = recordData.get(newParam);
					if (value == null) {
						value = currentDataObj.getReqData().get(newParam);
						if (value == null) {
							value = JsonHelper.getTrxObject(currentDataObj.getReqData()).get(newParam);
						}
					}
					updateParams.add(value);
				} else {
					updateParams.add(param);
				}
			}
			IDaoEntity entity = new ExecDaoEntity();
			entity.setHql(hql.toString());
			entity.setParaList(updateParams);
			entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
			retObj.addExcuteEntity(entity);
			// retObj.updateHql(currentDataObj.getDoName(), updateParams);

		} catch (Exception e) {
			e.printStackTrace();
			retObj.setRetStatus(AbsDataObject.EXCEPTION);
			retObj.setRetInfo(e.getMessage());
		}
		return retObj;
	}

	protected boolean isMultipleRecord(JSONObject trxObj) {
		if (trxObj != null && trxObj.containsKey("_total_rows")) {
			return true;
		}
		return false;
	}

	protected int getRecordCount(JSONObject trxObj) {
		if (trxObj != null && trxObj.containsKey("_total_rows")) {
			return trxObj.getInt("_total_rows");
		}
		return 0;
	}

	protected JSONObject getTrxDom(JSONObject rows, int recodIndex) {
		String key = "rows" + recodIndex;
		if (rows.containsKey(key)) {
			return rows.getJSONObject(key);
		}
		return null;
	}

	protected JSONObject processMappingField(JSONObject trxData) throws Exception {
		//

		if (currrentLogicObj == null) {
			return trxData;
		}
		trxData = processLogicJs(trxData);
		return trxData;
	}

	@Resource(name = "serverNodeJs")
	protected IServerSideJs jsEngine;

	private JSONObject processLogicJs(JSONObject mappingData) throws Exception {
		String jsFile = currrentLogicObj.getNodejs();

		if (StringUtil.isTrimNotEmpty(jsFile)) {
			jsEngine.initTrxData(mappingData);
			jsEngine.initReqData(this.currentDataObj.getReqData());
			jsEngine.initTrxPara(currrentLogicObj);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}

			mappingData = (JSONObject) jsEngine.getTrxData();
		}
		return mappingData;
	}

	protected JSONObject getDoTrxData(JSONObject trxData, String doName) {
		JSONObject trxJsonData = trxData.containsKey("trxDom") ? trxData.getJSONObject("trxDom") : trxData;
		if (StringUtil.isTrimEmpty(doName))
			return trxJsonData;
		if (trxJsonData.containsKey(doName))
			return JsonUtil.getChildJson(trxJsonData, doName);
		return trxJsonData;
	}
}
