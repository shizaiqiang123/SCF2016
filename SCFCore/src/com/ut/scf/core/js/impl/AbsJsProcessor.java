package com.ut.scf.core.js.impl;

import net.sf.json.JSONObject;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.js.IServerSideJsProcess;

public abstract class AbsJsProcessor implements IServerSideJsProcess{
	
	protected abstract IServerSideJs getJsEngine();
	
	@Override
	public Object processJs(AbsObject gapiPara,JSONObject mappingData, String jsFile) {
		if (StringUtil.isTrimNotEmpty(jsFile)) {
			getJsEngine().initTrxData(mappingData);
			getJsEngine().initTrxPara(gapiPara);
			try {
				getJsEngine().executeJsFile(jsFile);
			} catch (Exception e) {
				e.printStackTrace();
			}

			mappingData = (JSONObject) getJsEngine().getTrxData();
		}
		return mappingData;
	}
}
