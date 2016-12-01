package com.ut.scf.core.component;

import java.util.HashMap;
import java.util.Map;

import com.ut.comm.tool.string.StringUtil;

public class ComponentDefine {
	private static Map<String, String> componentDefineMap = new HashMap<String, String>();
	
	private static Map<String, String> serviceComponentDefineMap = new HashMap<String, String>();
	
	static{
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_ADD, "TrxAddRecord");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_EDIT, "TrxEditRecord");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_DELETE, "TrxDeleteRecord");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_VIEW, "TrxViewRecord");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_UNLOCK, "trxLockRecord");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_DELPENDING, "trxDeletePendingRecord");
		
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_PENDING, "trxPendingManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_RELEASE, "trxReleaseManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_VIEW, "trxViewManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_MASTER, "trxMasterManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING, "trxFixPendingManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING,"trxDelPendingManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_PARAMETER, "paremeterManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_UNLOCK, "trxLockManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_ROLLBACK, "trxRollbackManager");
		componentDefineMap.put(ComponentConst.COMP_FUNC_TYPE_MUTI, "trxMultipleManager");
		
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_ACCOUNTING, "accountDaoImpl");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_PARA_ADD, "paraAdd");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_PARA_DELETE, "paraDelete");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_PARA_EDIT, "paraEdit");
		componentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_PARA_LOCK, "paraLock");

		serviceComponentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_ACCOUNTING, "TrxAccountingManager");
		serviceComponentDefineMap.put(ComponentConst.COMP_PAGE_TYPE_LIMITS, "TrxLimitsManager");
	}
	
	public static String getDefinedComponent(String functionType){
		if(StringUtil.isTrimEmpty(functionType))
			return "";
		return componentDefineMap.get(functionType.toUpperCase());
	}
	
	public static boolean isDefinedComponent(String functionType){
		if(StringUtil.isTrimEmpty(functionType))
			return false;
		return componentDefineMap.containsKey(functionType.toUpperCase());
	}
	
	public static boolean isDefinedServiceComponent(String pageType){
		if(StringUtil.isTrimEmpty(pageType))
			return false;
		return serviceComponentDefineMap.containsKey(pageType.toUpperCase());
	}
	
	public static String getDefinedServiceComponent(String pageType){
		if(StringUtil.isTrimEmpty(pageType))
			return "";
		return serviceComponentDefineMap.get(pageType.toUpperCase());
	}

}
