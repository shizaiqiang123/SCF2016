package com.ut.scf.core.para;

import java.util.HashMap;
import java.util.Map;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

public class ParaQueryFactory {
	
	
	private static final String QUERY_IMPL_AP="ap";
	private static final String QUERY_IMPL_AP_SYST="apsyst";
	private static final String QUERY_IMPL_SYST="sys";
	private static final String QUERY_IMPL_ESB="esb";
	private static final String QUERY_IMPL_ACCOUNT="syst";
	
	private static Map<String,String> paraQueryImplMap = new HashMap<String,String>();
	static {
		paraQueryImplMap.put(QUERY_IMPL_AP, "apParaQueryImpl");
		paraQueryImplMap.put(QUERY_IMPL_AP_SYST, "apSystParaQueryImpl");
		paraQueryImplMap.put(QUERY_IMPL_SYST, "sysParaQueryImpl");
		paraQueryImplMap.put(QUERY_IMPL_ESB, "esbParaQueryImpl");
		paraQueryImplMap.put(QUERY_IMPL_ACCOUNT, "accountParseToXmlImpl");
	}
	public static IParaManager getParaQueryImpl(String paraPath) throws Exception{
		if(StringUtil.isTrimEmpty(paraPath)){
			throw new Exception("Missing query para path in request.");
		}
		String implName= "";
		if(paraPath.contains(QUERY_IMPL_AP_SYST)){
			implName = paraQueryImplMap.get(QUERY_IMPL_AP_SYST);
		}else if(paraPath.contains(QUERY_IMPL_SYST) && !paraPath.equals(QUERY_IMPL_ACCOUNT)){
			implName = paraQueryImplMap.get(QUERY_IMPL_SYST);
		}else if(paraPath.contains(QUERY_IMPL_ESB)){
			implName = paraQueryImplMap.get(QUERY_IMPL_ESB);
		}else if(paraPath.equals(QUERY_IMPL_ACCOUNT)){
			implName = paraQueryImplMap.get(QUERY_IMPL_ACCOUNT);
		}else{
			implName = paraQueryImplMap.get(QUERY_IMPL_AP);
		}
		
		return ClassLoadHelper.getComponentClass(implName);
	}
}
