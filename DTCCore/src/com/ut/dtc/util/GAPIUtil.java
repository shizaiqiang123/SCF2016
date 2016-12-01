package com.ut.dtc.util;

import java.util.List;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.gapi.IGAPIMsgDemerge;
import com.ut.scf.core.gapi.IGAPIMsgMerge;
import com.ut.scf.core.utils.ClassLoadHelper;

public class GAPIUtil {
	public static List<Object> demerage(String mstMapping,String input) throws Exception{
		//实现类需要参数化
		IGAPIMsgDemerge merger = ClassLoadHelper.getComponentClass("gapiDemerge");
		
		if(StringUtil.isTrimNotEmpty(mstMapping)&&mstMapping.indexOf(".")>0){
			mstMapping = mstMapping.substring(0,mstMapping.indexOf("."));
		}
		
		GapiMsgPara para = new GapiMsgPara();
		para.setId(mstMapping);
		XMLParaParseHelper.parseGapiMsgPara(para, "");
		
		List<Object> retMsg = merger.demerge(para, input);
		
		return retMsg;
	}
	
	public static String merage(String mstMapping,Object input) throws Exception{
		IGAPIMsgMerge merger = ClassLoadHelper.getComponentClass("gapiProcessor");
		
		GapiMsgPara para = new GapiMsgPara();
		para.setId(mstMapping);
		
		Object retMsg = merger.mergeMsg(para, input);
		
		return retMsg.toString();
	}
}
