package com.ut.scf.core.gapi;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;

public class GAPIUtil {
	public static Logger getLogger(){
		return APLogUtil.getLogger("GAPILogger", "","");
	}
	
	@Resource(name = "gapiJsEngine")
	protected IServerSideJs jsEngine;
	
	private Object processGAPIJs(GapiMsgPara gapiPara,JSONObject mappingData, String jsFile) {

		if (StringUtil.isTrimNotEmpty(jsFile)) {
			jsEngine.initTrxData(mappingData);
			jsEngine.initTrxPara(gapiPara);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				e.printStackTrace();
			}

			mappingData = (JSONObject) jsEngine.getTrxData();
		}
		return mappingData;
	}
}
