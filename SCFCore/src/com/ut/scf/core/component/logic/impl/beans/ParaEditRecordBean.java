package com.ut.scf.core.component.logic.impl.beans;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.AbsParaLogicManager;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.para.ParaQueryFactory;

@Component("paraEditRecordBean")
public class ParaEditRecordBean extends AbsParaLogicManager{

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		Assert.isTrue(StringUtil.isTrimNotEmpty(strParaId), "Missing Parameter id form current request.");
		Assert.isTrue(StringUtil.isTrimNotEmpty(strParaPath), "Missing Parameter path form current request.");
		
		super.currentTrxData = super.processLogicJs(super.currentTrxData);
		if(StringUtil.isTrimNotEmpty(currrentLogicObj.getFields())){
			String [] updatePropety = currrentLogicObj.getFields().split(",");
			JSONObject reqData = new JSONObject();
			for (String string : updatePropety) {
				reqData.put(string, super.currentTrxData.get(string));
			}
			super.currentTrxData = reqData;
		}		
		
		Object obj= ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strParaId, strParaPath,super.currentTrxData, "");
		FuncDataObj retObj = new FuncDataObj();
		retObj.buildRespose(obj);
		return retObj;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
