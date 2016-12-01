package com.ut.scf.core.services;

import net.sf.json.JSONObject;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

public class ServiceRunnerFactory {
	
	public static final String CLASS_NAME_DEFAULT = "serviceRunner";
	public static final String CLASS_NAME_FUNCTION = "functionServiceRunner";
	public static final String CLASS_NAME_FIELD = "serviceRunner";
	
	public static IServiceRunner getServiceRunner(JSONObject trxData) throws ClassNotFoundException{
		String implClassName = "";
		
		JSONObject trxJson = JsonHelper.getTrxObject(trxData);
		
		if(trxJson.containsKey(CLASS_NAME_FIELD)&&null!=trxJson.get(CLASS_NAME_FIELD)){
			implClassName = trxJson.getString(CLASS_NAME_FIELD);
		}else{
			Object isFunctionSerrvice =trxJson.get("byFunc");
			if(isFunctionSerrvice!=null){
				String byFunc = isFunctionSerrvice.toString();
				if("N".equalsIgnoreCase(byFunc)){
					implClassName = CLASS_NAME_DEFAULT;
				}else{
					implClassName = CLASS_NAME_FUNCTION;
				}
			}else{
				ApSessionContext context = ApSessionUtil.getContext();
				FunctionPara functPara  = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
				if(functPara==null){
					implClassName = CLASS_NAME_DEFAULT;
				}else{
					implClassName = CLASS_NAME_FUNCTION;
				}
			}
		}
		
		if(StringUtil.isTrimEmpty(implClassName)){
			implClassName = CLASS_NAME_DEFAULT;
		}
		
		return ClassLoadHelper.getComponentClass(implClassName);
	}
}
