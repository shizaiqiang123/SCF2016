package com.ut.scf.core.gapi.reformat;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.gapi.GapiMsgPara;

@Service("defaultReformator")
public class DefaultReformator implements IGAPIMsgReformat{

	@Override
	public String reformat(GapiMsgPara protocol, Object message, Object trxDom) throws Exception {
		String strGapiMsg = XMLManager.convertToString((Document) message, protocol.getCharacterset());
		return strGapiMsg;
	}

	@Override
	public Object verify(GapiMsgPara protocol, Object messageJson) throws Exception {
		JSONObject retJson = (JSONObject) messageJson;
		retJson.put("verifyResult", true);
		retJson.put("verifyMsg", "success");
		return retJson;
	}
	
}
