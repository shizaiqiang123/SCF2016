package com.ut.scf.core.services.verification.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

public class VerificationCodeStore {
	private static Map<String, VerificationCode> codeMap = new ConcurrentHashMap<String, VerificationCode>();
	
	
	public static void storeCode(VerificationCode codeEntity){
		codeMap.put(codeEntity.getKey(), codeEntity);
	}
	public static VerificationCode getCodeMap(String key){
		if(codeMap.containsKey(key)){
			return codeMap.get(key);
		}
		return null;
	}
	
	public static String getCode(String key){
		if(codeMap.containsKey(key)){
			VerificationCode code = codeMap.get(key);
//			invalidCode(code);
			return code.getCode();
		}
		return null;
	}
	
	public static void invalidCode(VerificationCode codeEntity){
		if(codeMap.containsKey(codeEntity.getKey())){
			codeMap.remove(codeEntity.getKey());
		}
	}
	
	public static void initlize(){
		InvalidCodeProcessor processor = new InvalidCodeProcessor();
		processor.start();
	}
	
	public static void destory(){
//		codeMap.clear();
	}

	
	static class InvalidCodeProcessor extends Thread{
		public void run() {
			while (true) {
				try {
					Thread.sleep(1000);
					// 循环codeMap，清除失效的code
					Set<Map.Entry<String, VerificationCode>> entry = codeMap.entrySet();
					Iterator<Entry<String, VerificationCode>> iterator = entry.iterator();
					while (iterator.hasNext()) {
						Map.Entry<String, VerificationCode> mapEntry = iterator.next();
						Timestamp createTime = mapEntry.getValue().getCreateTime();
						String time = mapEntry.getValue().getTime();
						Timestamp currentTime = new Timestamp(new Date().getTime() - Integer.valueOf(time)*1000);
						if (createTime.before(currentTime)) {
//							iterator.remove();
							invalidCode( mapEntry.getValue());
						}
					}
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
