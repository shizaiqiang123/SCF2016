package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.w3c.dom.Document;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.scf.core.component.AbsParaLogicManager;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.para.ParaQueryFactory;

@Component("paraAddRecordBean")
public class ParaAddRecordBean extends AbsParaLogicManager{

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
		
		Object retObj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strParaId, strParaPath,super.currentTrxData, "");
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose(retObj);
		return obj;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
