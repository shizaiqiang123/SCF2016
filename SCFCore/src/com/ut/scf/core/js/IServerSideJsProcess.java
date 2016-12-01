package com.ut.scf.core.js;

import com.ut.comm.xml.AbsObject;

import net.sf.json.JSONObject;

public interface IServerSideJsProcess {
	public Object processJs(AbsObject para,JSONObject trxData, String jsFile);
}
