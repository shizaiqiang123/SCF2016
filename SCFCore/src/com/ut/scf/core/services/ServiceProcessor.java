package com.ut.scf.core.services;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.comm.xml.gapi.GapiPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.gapi.IGAPIMessage;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.MessageSendRequest;

@Service(value="serviceProcessor")
public class ServiceProcessor implements IServiceProcessor{

	@Resource(name = "messageSendManager")
	private IGAPIMessage outgoingProcessor;
	
	@Override
	public IGAPIMsgResponse sendMessage(GapiPara gapiObj, IGAPIMsgRequest message) throws Exception {
		return outgoingProcessor.sendMessage(gapiObj, message);
	}

	@Override
	public IGAPIMsgResponse receiveMessage(GapiPara gapiObj, String mappingID) {
		return null;
	}

	@Override
	public IGAPIMsgResponse rollback(GapiPara gapiObj, IGAPIMsgRequest message) {
		try {
			IGAPIMsgResponse rollbackRsp = outgoingProcessor.sendMessage(gapiObj, message);
			return rollbackRsp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null ;
	}

	@Override
	public IGAPIMsgRequest generateRequest(ServicePara service, Object domData) {
		IGAPIMsgRequest request  = new MessageSendRequest();
		request.setMsgBody("aine test");
		return request;
	}

	@Override
	public IGAPIMsgRequest generateRollbackRequest(ServicePara service, Object domData) {
		return null;
	}

}
