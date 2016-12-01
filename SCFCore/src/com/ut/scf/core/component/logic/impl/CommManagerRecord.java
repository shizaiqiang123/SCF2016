package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Service("commManagerRecord")
public class CommManagerRecord implements ILogicComponent{
	
	@Resource(name="commManagerImpl")
	ILogicComponent logicCompProcessor;

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return logicCompProcessor.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return logicCompProcessor.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return logicCompProcessor.postMasterData(logicObj);
	}

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		return logicCompProcessor.postData(logicObj);
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return logicCompProcessor.inqData(logicObj);
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return logicCompProcessor.releaseData(logicObj);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return logicCompProcessor.postDeletePendingData(logicObj);
	}
	
	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return logicCompProcessor.rollbackData(logicObj);
	}

}
