package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.IPendingComponent;

/**
 * 删除组件
 * @author 开发
 */
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxRejectManager")
public class TrxRejectManager implements IMainComponent{
	@Resource(name="aSETrxRejectManagerBean")  
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
		return comImpl.queryData(paraDom);
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return comImpl.cancelData(paraDom);
	}

}
