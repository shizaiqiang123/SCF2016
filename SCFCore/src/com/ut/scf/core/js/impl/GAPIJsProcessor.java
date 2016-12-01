package com.ut.scf.core.js.impl;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.js.IServerSideJsProcess;

public class GAPIJsProcessor implements IServerSideJsProcess{

	@Resource(name = "gapiJsEngine")
	protected IServerSideJs jsEngine;
	
	@Override
	public Object processJs(AbsObject gapiPara,JSONObject mappingData, String jsFile) {
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
