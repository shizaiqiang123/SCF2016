package com.ut.scf.core.gapi.formattor;

import org.springframework.util.Assert;

import com.ut.comm.tool.string.StringUtil;


public class GAPIElementFormatorFactory {
	public static IGapiElementFormattor getFormattor(String formattor){
		Assert.isTrue(StringUtil.isTrimNotEmpty(formattor),"GAPI element formattor must not be empty.");
		String prefix = formattor.split(":")[0];
		if("date".equalsIgnoreCase(prefix)){
			return new GAPIElementDateFormattor();
		}else if("amt".equalsIgnoreCase(prefix)){
			return new GAPIElementNumberFormattor();
		}
		
		return new GAPIElementDefaultFormattor();
	}
}
