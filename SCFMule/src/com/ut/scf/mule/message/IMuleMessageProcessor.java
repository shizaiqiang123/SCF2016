package com.ut.scf.mule.message;

import org.mule.api.MuleContext;

import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;

/**
 * @see for �ͻ���ʹ��
 * @author Aine
 *
 */
public interface IMuleMessageProcessor{
//	public String sendMessage(MuleContext context,IMuleSendMsgProtocol protocol, IMuleMessage message);
	public String sendMessage(MuleContext context,IFrameworkProtocol protocol, IGAPIMsgRequest message);
}
