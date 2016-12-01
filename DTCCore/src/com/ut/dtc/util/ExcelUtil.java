package com.ut.dtc.util;

import java.util.List;

import net.sf.json.JSONObject;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.gapi.IGAPIMsgMerge;
import com.ut.scf.core.utils.ClassLoadHelper;

public class ExcelUtil {
	public static List<Object> demerage(String mstMapping,String input) throws Exception{
				
		DocumentFactoryImpl mergerFactory = ClassLoadHelper.getComponentClass("documentFactory");
		
		if(StringUtil.isTrimNotEmpty(mstMapping)&&mstMapping.indexOf(".")>0){
			mstMapping = mstMapping.substring(0,mstMapping.indexOf("."));
		}
		TemplatePara  templatePara = XMLParaParseHelper.parseFuncTemplatePara(mstMapping,"");
		
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqParaObj(templatePara);
		
		JSONObject reqJson= JsonHelper.createReqJson();
		JSONObject trxJson = JsonHelper.getTrxObject(reqJson);
		trxJson.put("fileExtensions", ".xlsx");
		trxJson.put("filePath", input);
		logicObj.setReqData(reqJson);
		
		mergerFactory.getProcessor(templatePara).importDoc(logicObj );		
		
		List list = (List) logicObj.getData().get(logicObj.getDoName());
		
		return list;
	}
	
	public static String merage(String mstMapping,Object input) throws Exception{
		IGAPIMsgMerge merger = ClassLoadHelper.getComponentClass("documentFactory");
		
		GapiMsgPara para = new GapiMsgPara();
		para.setId(mstMapping);
		
		Object retMsg = merger.mergeMsg(para, input);
		
		return retMsg.toString();
	}
}
