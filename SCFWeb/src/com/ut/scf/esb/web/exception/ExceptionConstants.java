package com.ut.scf.esb.web.exception;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ExceptionConstants {

    public static final String Code_0000 = "0000";  
    public static final String Msg_0000 = "输入参数不合法!";  
    
    public static final String Code_0001 = "0001";  
    public static final String Msg_0001 = "数据被引用,无法删除!"; 
    
    public static final String Code_0002 = "0002";  
    public static final String Msg_0002 = "当前会话中，不存在此用户信息!"; 
    
    public static final String Code_9999 = "9999";  
    public static final String Msg_9999 = "系统错误,请联系管理员!";  
    
    
    private static Map<String, String> returnCodeMap = new ConcurrentHashMap<String, String>();  
	  
    public static Map<String, String> getReturnCodeMap() {  
        if (returnCodeMap.isEmpty()) {  
            returnCodeMap.put(Code_0000, Msg_0000);  
            returnCodeMap.put(Code_0001, Msg_0001);            
            returnCodeMap.put(Code_9999, Msg_9999);  
        }  
        return returnCodeMap;  
    }
}
