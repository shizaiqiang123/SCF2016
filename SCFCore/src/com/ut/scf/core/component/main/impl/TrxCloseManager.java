package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.IPendingComponent;

@Component("trxCloseManager")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class TrxCloseManager implements IMainComponent{
	@Resource(name="aSETrxCloseManagerBean")  
	IPendingComponent comImpl;
	
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
