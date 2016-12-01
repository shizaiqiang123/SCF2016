package com.ut.scf.core.gapi;

import com.ut.comm.xml.gapi.GapiPara;

public interface IGAPIMessage {
	public IGAPIMsgResponse sendMessage(GapiPara gapiObj, IGAPIMsgRequest message) throws Exception;

	public IGAPIMsgResponse receiveMessage(GapiPara gapiObj, String mappingID) throws Exception;
	
	public IGAPIMsgResponse rollback(GapiPara gapiObj, IGAPIMsgRequest message) throws Exception;

}
