package com.ut.scf.core;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("cancelProcessor") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class APCancelProcessor extends AbsAPProcessor{

	@Override
	protected Object doProcess(IMainComponent instance, Object dataDom) throws Exception {
		//destroy ap session 
		IApResponse obj= (IApResponse) instance.cancelData(dataDom);
		JSONObject trxDom = JsonHelper.getTrxObject((JSONObject)dataDom);
		Object cancelStep = trxDom.get("reqPageType");
		String strStep = cancelStep==null?"":cancelStep.toString();
		if(obj.isSuccess()&&"pre".equalsIgnoreCase(strStep)){
			IApResponse apResponse = (ApResponse) super.goPrePage(dataDom);
			obj.setFuncObj(apResponse.getFuncObj());
			obj.setPageInfo(apResponse.getPageInfo());
		}
		return obj;
	}
	
	@Override
	protected void customizeContext() {
		ApSessionUtil.getContext().setStrTrxType(ComponentConst.COMP_TRX_TYPE_CANCEL);
	}
}
