package com.ut.scf.mule.message;

import org.mule.api.MuleContext;

import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;


/**
 * @ for �ײ�ʵ��
 * @author Aine
 *
 */
public interface IMuleConfigProcessor {
	
//	public String sendMessage(MuleContext context,IMuleSendMsgProtocol protocol, IMuleMessage message);
//	
//	public String receiveMessage(MuleContext context,String mappingID);
	
	public String sendMessage(MuleContext context,IFrameworkProtocol protocol, IGAPIMsgRequest message);
	
	public String receiveMessage(MuleContext context,String mappingID);
}
