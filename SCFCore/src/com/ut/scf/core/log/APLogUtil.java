package com.ut.scf.core.log;

import javax.annotation.Resource;

import org.slf4j.Logger;

import com.ut.comm.log.ILogManager;
import com.ut.comm.log.log4j.SCFLogger;
import com.ut.scf.core.ApplicationContextUtil;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;

public class APLogUtil {
	
	@Resource(name = "loggerManager")
	private static ILogManager lm ;
	
	public static SCFLogger getLogger(String logName,String bu,String userId){
		if(lm==null)
			lm = (ILogManager) ApplicationContextUtil.getContext().getBean("loggerManager");
		return (SCFLogger) lm.getLogger(logName, bu,userId);
	}
	
	public static SCFLogger getUserLogger(String userId,String bu){
		return getLogger("userInfolog",bu,userId);
	}
	
	public static SCFLogger getUserErrorLogger(String userId,String bu){
		return getLogger("userErrorlog",bu,userId);
	}
	
	public static SCFLogger getUserSQLLogger(String userId,String bu){
		return getLogger("userSQLlog",bu,userId);
	}
	
	public static SCFLogger getBuSystemLogger(String bu){
		return getLogger("buSyslog",bu,"");
	}
	
	public static SCFLogger getUserLogger(){
		ApSessionContext context = ApSessionUtil.getContext();
		return getUserLogger(context.getUserId(),context.getSysBusiUnit());
	}
	
	public static SCFLogger getUserErrorLogger(){
		ApSessionContext context = ApSessionUtil.getContext();
		return getUserErrorLogger(context.getUserId(),context.getSysBusiUnit());
	}
	
	public static SCFLogger getUserSQLLogger(){
		ApSessionContext context = ApSessionUtil.getContext();
		return getUserSQLLogger(context.getUserId(),context.getSysBusiUnit());
	}
	
	public static Logger getBuSystemLogger(){
		ApSessionContext context = ApSessionUtil.getContext();
		return getBuSystemLogger(context.getSysBusiUnit());
	}
	
	public static SCFLogger getESBLogger(){
		return getLogger("ESBMessage","","");
	}
	
	public static SCFLogger getBatchLogger(String bu){
		return getLogger("Batch",bu,"");
	}
	
	public static SCFLogger getBatchLogger(){
		ApSessionContext context = ApSessionUtil.getContext();
		return getLogger("Batch",context.getSysBusiUnit(),"");
	}
	
	public static SCFLogger getDefaultLogger(String bu){
		return getLogger("",bu,"");
	}
	
	public static SCFLogger getServiceLogger(String bu){
		return getLogger("serviceLog",bu,"");
	}
	
	public static SCFLogger getAdviceLogger(String bu){
		return getLogger("adviceLogger",bu,"");
	}
}
