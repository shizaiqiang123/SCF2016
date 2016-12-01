package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.IReComponent;

@Component("trxReleaseManager")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TrxReleaseManager implements IMainComponent{
	@Resource(name="trxReleaseManagerBean")  
	IReComponent comImpl;

	@Override
	public Object submitData(Object paraDom) throws Exception {
		Object retDom = comImpl.submitData(paraDom);
		
		comImpl.callWorkflow(paraDom, retDom);
		
		comImpl.sendNoditfication(paraDom, retDom);
		
		return retDom;
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		Object queryData =  comImpl.queryData(paraDom);
		
		comImpl.callWorkflow(paraDom, queryData);
		
		return queryData;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		Object cancelData = comImpl.cancelData(paraDom);
		
		comImpl.callWorkflow(paraDom, cancelData);
		
		return cancelData;
	}

}
