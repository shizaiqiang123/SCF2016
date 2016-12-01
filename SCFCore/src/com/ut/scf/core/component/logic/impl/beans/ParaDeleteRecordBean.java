package com.ut.scf.core.component.logic.impl.beans;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.AbsParaLogicManager;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.para.ParaQueryFactory;

@Component("paraDeleteRecordBean")
public class ParaDeleteRecordBean extends AbsParaLogicManager{

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
		
		ParaQueryFactory.getParaQueryImpl(strParaPath).deleteParaDefine(strParaId, strParaPath,super.currentTrxData);
		FuncDataObj obj = new FuncDataObj();
		return obj;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
