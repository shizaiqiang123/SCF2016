package com.ut.scf.mule.message;

import org.mule.api.MuleContext;
import org.mule.api.MuleException;
import org.mule.api.MuleMessage;
import org.mule.api.client.MuleClient;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.ut.comm.tool.xml.XMLManager;
import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;

/**
 * @since 1.0
 * @author Aine
 * @date 2014-7-23
 * 
 */
public class MuleMessageFileProcessor implements IMuleConfigProcessor {

//	public String sendMessage(MuleContext context,IMuleSendMsgProtocol protocol, IMuleMessage message) {
//		MuleClient client = context.getClient();
//		MuleMessage response;
//		String resMsg = "";
//		try {
//			Document msgDom = XMLManager.createDocument();
//			Element element = msgDom.createElement("TestMsg");
//			element.appendChild(msgDom.createTextNode("I love you"));
//			
//			msgDom.appendChild(element);
//			String requestMsg = XMLManager.convertToString(msgDom);
//			response = client.send("vm://outgoing file", requestMsg, null);
//			resMsg = response.getPayloadAsString();
//		} catch (MuleException e) {
//			e.printStackTrace();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		System.out.println(resMsg);
//		return resMsg;
//	}

	@Override
	public String receiveMessage(MuleContext context,String mappingID) {

		return mappingID;
	}

	@Override
	public String sendMessage(MuleContext context, IFrameworkProtocol protocol, IGAPIMsgRequest message) {
		MuleClient client = context.getClient();
		MuleMessage response;
		String resMsg = "";
		try {
//			Document msgDom = XMLManager.createDocument();
//			Element element = msgDom.createElement("TestMsg");
//			element.appendChild(msgDom.createTextNode("I love you"));
//			
//			msgDom.appendChild(element);
//			String requestMsg = XMLManager.convertToString(msgDom);
			response = client.send(protocol.getHeader().getChannel(), message.getMsgBody(), null);
			resMsg = response.getPayloadAsString();
		} catch (MuleException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(resMsg);
		return resMsg;
	}

}
