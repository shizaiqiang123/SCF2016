package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.IMainComponent;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxAccountingManager")
public class TrxAccountingManager implements IMainComponent{
	@Resource(name="trxAccountingManagerBean")  
	IMainComponent comImpl;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		return comImpl.submitData(paraDom);
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		return comImpl.queryData(paraDom);
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return comImpl.cancelData(paraDom);
	}

}
