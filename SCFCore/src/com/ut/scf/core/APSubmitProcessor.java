package com.ut.scf.core;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("aPSubmitProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class APSubmitProcessor  extends AbsAPProcessor{

	@Override
	protected Object doProcess(IMainComponent instance, Object dataDom) throws Exception {
		IApResponse obj= (IApResponse) instance.submitData(dataDom);
		if(obj.isSuccess()){
			IApResponse apResponse = (ApResponse) super.goNextPage(dataDom);
			obj.setFuncObj(apResponse.getFuncObj());
			obj.setPageInfo(apResponse.getPageInfo());
		}
		
		return obj;
	}
	
	@Override
	protected void customizeContext() {
		ApSessionUtil.getContext().setStrTrxType(ComponentConst.COMP_TRX_TYPE_SUBMIT);
	}
 
}
