package com.ut.scf.core.utils;

import java.util.Date;

import org.slf4j.Logger;

import com.ut.comm.cache.util.ICacheAbleObj;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.scf.core.log.APLogUtil;

public class BuDateTimeUtil {
	
	final static String DEFAULT_FORMAT = "yyyy-MM-dd";
	
	public static Logger getLogger(){
		return APLogUtil.getBuSystemLogger();
	}
	
	public static String getCurrentBuDateString(){
		return getCurrentBuDateString(DEFAULT_FORMAT);
	}
	
	public static String getCurrentBuDateString(String format){
		Date budate = getCurrentBuDate();
		
		return DateTimeUtil.parseDate(budate, format);
	}

	public static Date getCurrentBuDate(){
		return getCurrentBuDate(DEFAULT_FORMAT);
	}
	
	public static Date getCurrentBuDate(String format){
		ICacheAbleObj cacheObj = getBuCacheObj();
		if(cacheObj== null){
			getLogger().error("No bu date config finded, return system time instead.");
			return DateTimeUtil.getSysDate();
		}else{
			try {
				Object buDate = cacheObj.getData("busiDt", null);
				if(buDate!=null){
					Date dt = DateTimeUtil.getDate(buDate.toString(), DEFAULT_FORMAT);
					return dt;
				}
				getLogger().error("No bu date finded, return system time instead.");
				return DateTimeUtil.getSysDate();
			} catch (Exception e) {
				getLogger().error("No bu date finded, return system time instead.");
				return DateTimeUtil.getSysDate();
			}
		}
	}
	
	public static ICacheAbleObj getBuCacheObj(){
		try {
			ICacheAbleObj cacheObj = ClassLoadHelper.getComponentClass("sysBuDateStore");
			if(cacheObj!=null&&cacheObj.isEnable()){
				return cacheObj;
			}else{
				cacheObj.initilize();
				return cacheObj;
			}
		} catch (ClassNotFoundException e) {
			getLogger().error(e.toString());
			return null;
		}
	}
}
