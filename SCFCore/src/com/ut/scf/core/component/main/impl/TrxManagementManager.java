package com.ut.scf.core.component.main.impl;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.utils.ClassLoadHelper;
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@Component("trxManageManager")
public class TrxManagementManager implements IMainComponent{
	@Resource(name="aSETrxCatalogManagerBean")  
	IMainComponent comImpl;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		JSONObject funcData = JsonHelper.getFuncObject((JSONObject) paraDom);
		String funcType = funcData.getString("funcType");
		if(funcType.startsWith("M")){
			funcType = "MM";
		}else{
			funcType = "PM";
		}
		funcData.put("funcType", funcType);
		String conponent = ComponentDefine.getDefinedComponent(funcType);
		return ClassLoadHelper.getMainComponetProcessor(conponent).submitData(paraDom);
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		JSONObject trxData = JsonHelper.getTrxObject((JSONObject) paraDom);
		if(trxData.containsKey("funcType")&&"CA".equalsIgnoreCase(trxData.getString("funcType"))){
			return comImpl.queryData(paraDom);
		}else{
			JSONObject funcData = JsonHelper.getFuncObject((JSONObject) paraDom);
			String funcType = funcData.getString("funcType");
			if(funcType.startsWith("M")){
				funcType = "MM";
			}else{
				funcType = "PM";
			}
			funcData.put("funcType", funcType);
			String conponent = ComponentDefine.getDefinedComponent(funcType);
			return ClassLoadHelper.getMainComponetProcessor(conponent).queryData(paraDom);
		}
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return comImpl.cancelData(paraDom);
	}

}
