package com.ut.scf.mule.message;

import org.mule.api.MuleContext;
import org.mule.api.MuleMessage;
import org.mule.api.client.MuleClient;

import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.mule.services.IMuleServiceRequest;
import com.ut.scf.mule.services.MuleServicesRequestObj;

/**
 * @since 1.0
 * @author Aine
 * @date 2014-7-23
 * 
 */
public class MuleMessageWebServiceProcessor implements IMuleConfigProcessor {

	@Override
	public String sendMessage(MuleContext context, IFrameworkProtocol protocol, IGAPIMsgRequest message) {
		MuleClient client = context.getClient();
		MuleMessage response;
		String resMsg = "";
		try {
//			IMuleSendMsgWebServiceProtocol protocolObj = new MuleSendMsgWebServiceProtocolObj();
//			protocolObj.setMessageBody(message);
//			protocolObj.setProtocolMode(protocol.getProtocolMode());
//			protocolObj.setProtocolType(protocol.getProtocolType());
//			protocolObj.setSecurity(protocol.isSecurity());
//			protocolObj.setTimeout(protocol.getTimeout());
//			protocolObj.setProtocolID(protocol.getProtocolID());
			
//			protocolObj.setServiceAddress("http://localhost:65082/services/mLoan");
//			protocolObj.setServiceClass("com.ut.test.webservices.IMLoanInterface");
//			protocolObj.setServiceOperator("takeDown");
//			protocolObj.setServicePort("");
//			MuleMessageParseUtil.parseSendMessageWSProtocol(protocolObj);
//			Set<Object> entitySet = message.getClientEntitys();
//			protocolObj.setClientParameters(entitySet);
//			response = client.send("vm://SendWebService", protocolObj, null);
			MuleServicesRequestObj request = new MuleServicesRequestObj();
			request.setRequestProtocol(protocol);
			request.setRequestMessageBody(message);
			response = client.send(protocol.getHeader().getChannel(), protocol, null);
			resMsg = response.getPayloadAsString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(resMsg);
		return resMsg;
	}

	@Override
	public String receiveMessage(MuleContext context, String mappingID) {

		return mappingID;
	}
}
