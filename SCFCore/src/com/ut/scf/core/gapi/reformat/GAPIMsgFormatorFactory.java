package com.ut.scf.core.gapi.reformat;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

public class GAPIMsgFormatorFactory{
	public static IGAPIMsgReformat getReformatFactory(String formatTp) throws Exception{
		String reformatClass = "";
		if(StringUtil.isTrimEmpty(formatTp)){
			reformatClass = "defaultReformator";
		}else{
			reformatClass = formatTp;
		}
		return (IGAPIMsgReformat) ClassLoadHelper.getComponentClass(reformatClass);
	}
}
