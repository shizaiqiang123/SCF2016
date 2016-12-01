package com.ut.scf.core.component.logic.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.ILogicComp;
import com.ut.scf.core.component.logic.ILogicFlowComponent;
import com.ut.scf.core.data.FuncDataObj;
@Component("paraResetRecord")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ParaResetRecord implements ILogicFlowComponent{

	@Resource(name="paraResetRecordBean")
	ILogicComp paraResetRecordBean;

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		return paraResetRecordBean.postMasterData(logicObj);
	}
}