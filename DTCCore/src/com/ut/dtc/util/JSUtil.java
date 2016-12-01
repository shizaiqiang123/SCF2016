package com.ut.dtc.util;

import net.sf.json.JSONObject;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.utils.ClassLoadHelper;

public class JSUtil {
	
	public static JSONObject formatJs(String jsFile , JSONObject reqJson) throws Exception{
		if (StringUtil.isTrimNotEmpty(jsFile)) {
	
			IServerSideJs jsEngine = ClassLoadHelper.getComponentClass("dtcJs");
			jsEngine.initTrxData(reqJson);
//			jsEngine.initTrxPara(para);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				LogUtil.error(e.toString());
				throw e;
			}

			return (JSONObject)jsEngine.getTrxData();
		}
		return reqJson;
	}
}
