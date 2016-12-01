package com.ut.scf.core.services.verification;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class FormatVerifyFactory {

	public static String getFormatVerify(Map<String, Object> verifyMessage,
			String objectName, String characterSet) {
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version=\"1.0\" encoding=\"" + characterSet
				+ "\"?>");
		xml.append("<" + objectName + ">");
		xml = getVerMap(verifyMessage, xml);
		xml.append("</" + objectName + ">");
		return xml.toString();
	}

	public static StringBuffer getVerMap(Map<String, Object> verifyMessage,
			StringBuffer stringBuffer) {
		Set keys = verifyMessage.keySet();
		Iterator iterator = keys.iterator();
		while (iterator.hasNext()) {
			String key = (String) iterator.next();
			if (verifyMessage.get(key) instanceof Map) {
				stringBuffer.append("<" + key + ">");
				getVerMap((Map<String, Object>) verifyMessage.get(key),
						stringBuffer);
				stringBuffer.append("</" + key + ">");
			} else if (verifyMessage.get(key) instanceof String) {
				stringBuffer.append("<" + key + ">" + verifyMessage.get(key)
						+ "</" + key + ">");

			}
		}
		return stringBuffer;
	}

	public static String getStringVerify(String messageInfo) {
		for (int total = 0; total < messageInfo.length(); total++) {
			int startVal = messageInfo.indexOf("<");
			int endVal = messageInfo.indexOf(">");
			if (startVal == -1 || endVal == -1) {
				break;
			}
			String subString = messageInfo.substring(startVal, endVal + 1);
			messageInfo = messageInfo.replaceAll(subString, "");
			// System.out.println(messageInfo);
		}
		// for(int total=0;total<messageInfo.length();total++){
		// int startVal=messageInfo.indexOf("\n");
		// if(startVal==-1){
		// break;
		// }
		// String subString=messageInfo.substring(startVal,startVal+1);
		// messageInfo=messageInfo.replaceAll(subString, "");
		// }
		// for(int total=0;total<messageInfo.length();total++){
		// int startVal=messageInfo.indexOf("&");
		// int
		// }
		messageInfo = messageInfo.replaceAll("&nbsp;", " ");
		return messageInfo;
	}
	public static String getParam(String message){
		
		return null;
	}
	/*
	 * 短信xml参数打包
	 * code验证码
	 * telphone手机号
	 * key唯一标识
	 */
	public static Object messageProcessor(String code,String telphone,String key){
		Map<String, Object> map=new HashMap<String, Object>();
		Map<String, String> mapHead=new HashMap<String, String>();
		Map<String, String> mapBody=new HashMap<String, String>();
		mapBody.put("MOBILE", telphone);		
		mapBody.put("MESSAGE", code);
		mapBody.put("TEMPLATE", "");
		mapHead.put("TRANCODE", "SMSPSEND");
		mapHead.put("TRANTIME", new SimpleDateFormat("hhmmss").format(new Date()));
		mapHead.put("TRANDATE", new SimpleDateFormat("yyyyMMdd").format(new Date()));
		mapHead.put("PACKPORP", "00");
		mapHead.put("TRANTRAC", key);
		map.put("SMSPBODY", mapBody);		
		map.put("SMSPHEAD", "");
		map.put("CSP_HEAD", mapHead);
		return map;
	}
	/*
	 *获取验证码
	 * randomType：1。纯数字
	 * 			  2.纯字母
	 * 			  3.数字加字母
	 * codeLen 验证码长度
	 */			  
	public static Object getRandomCode(String randomType,int codeLen){
		String code = "";
		String radix = "abcdefghijklmnopqrstuvwxyz";
		if ("2".equalsIgnoreCase(randomType)) {
			for (int i = 0; i < codeLen; i++) {
				char codeSize = (char) (Math.random() * 26 + 97);
				code += codeSize;
			}
		} else if ("3".equalsIgnoreCase(randomType)) {
			for (int i = 0; i < codeLen; i++) {
				int codeSize = (int) (Math.random() * 36);
				if (codeSize < 10) {
					code += codeSize;
				} else {
					char mapping = (char) (codeSize + 87);
					code += mapping;
				}
			}
		} else {
			for (int i = 0; i < codeLen; i++) {
				int codeSize = (int) (Math.random() * 9);
				code += String.valueOf(codeSize);
			}
		}
		return code;
	}
}
