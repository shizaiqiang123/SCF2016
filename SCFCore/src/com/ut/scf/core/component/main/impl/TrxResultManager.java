package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.IMainComponent;

@Component("trxResutlManager")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TrxResultManager implements IMainComponent{
	@Resource(name="aSETrxResultManagerBean")  
	IMainComponent comImpl;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {

		Object retDom = comImpl.submitData(paraDom);

		return retDom;
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
