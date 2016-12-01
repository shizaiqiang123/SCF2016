package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.IMainComponent;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxBatchManager")
public class TrxBatchManager implements IMainComponent{
	@Resource(name="aSETrxBatchManagerBean")
	private IMainComponent process;
	@Override
	public Object submitData(Object paraDom) throws Exception {
		return process.submitData(paraDom);
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		return process.queryData(paraDom);
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return process.cancelData(paraDom);
	}

}
