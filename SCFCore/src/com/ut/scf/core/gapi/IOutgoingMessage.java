package com.ut.scf.core.gapi;

import com.ut.comm.xml.service.ServicePara;

public interface IOutgoingMessage {
	public IOutgoingMsgResponse sendMessage(ServicePara serviceObj, IOutgoingMsgRequest message) throws Exception;

	public IOutgoingMsgResponse receiveMessage(String mappingID);
	
	public IOutgoingMsgResponse rollback(ServicePara serviceObj, IOutgoingMsgRequest message);

}
