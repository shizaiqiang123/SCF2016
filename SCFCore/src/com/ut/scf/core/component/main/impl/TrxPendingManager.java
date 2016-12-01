package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.IPendingComponent;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxPendingManager")
public class TrxPendingManager implements IMainComponent{
	@Resource(name="aSETrxPendingManagerBean")  
	IPendingComponent comImpl;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		ApSessionContext context = ApSessionUtil.getContext();
		FunctionPara funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		
		String funcType = funcObj.getFunctype();
		
		if("RE".equalsIgnoreCase(funcType)||"VH".equalsIgnoreCase(funcType)){
			IApResponse obj = new ApResponse();
			return obj;
		}

		Object retDom = comImpl.submitData(paraDom);

		comImpl.autoRelease(paraDom, retDom);
		
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
