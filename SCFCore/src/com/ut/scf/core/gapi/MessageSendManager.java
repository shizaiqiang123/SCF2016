package com.ut.scf.core.gapi;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.ut.comm.xml.gapi.GapiPara;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.gapi.reformat.IGAPIReformat;
import com.ut.scf.core.services.IServiceEntity;
import com.ut.scf.core.services.ServiceEntity;

@Component(value="messageSendManager")
public class MessageSendManager implements IGAPIMessage{
	
	private void runMessageVerify(IFrameworkProtocol protocol, IGAPIMsgResponse retMsg) {
		if(protocol.getHeader().getReformatclass()==null)
			return;
		try {
			IGAPIReformat reformatInstance = (IGAPIReformat) Class.forName(protocol.getHeader().getReformatclass()).newInstance();
			reformatInstance.verify(protocol, retMsg.getResponse());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	private void runMessageReformat(IFrameworkProtocol protocol, IGAPIMsgRequest message) {
		if(protocol.getHeader().getReformatclass()==null)
			return;
		
		if(true)
			return;
		try {
			IGAPIReformat reformatInstance = (IGAPIReformat) Class.forName(protocol.getHeader().getReformatclass()).newInstance();
			reformatInstance.reformat(protocol, message);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}
	
//	@Resource(name="outgoingMessageImpl")
//	= new OutgoingMessageServiceImpl()
	IESBService serviceProcessor ;
	
	@Override
	public IGAPIMsgResponse sendMessage(GapiPara service, IGAPIMsgRequest message) throws Exception{
		IServiceEntity entity = new ServiceEntity();
		entity.setServiceID(service.getId());
//		entity.setServiceType(IESBService.SERVICE_TYPE_INTERFACE);
		
//		IFrameworkProtocol protocol = new MessageSendProtocol();
//		protocol.setId(service.getId());//get from function service attributes(interface-id)
//		MessageProtocolParseUtil.parseSendMessageWSProtocol(protocol);
//		entity.setServiceProtocol(protocol);
//		
//		runMessageReformat(protocol,message);
//		
////		IOutgoingMsgResponse retMsg = messageProcess.sendMessage(service, message);
//		IGAPIMsgResponse retMsg = (IGAPIMsgResponse) serviceProcessor.runService(entity, message);
//		
//		runMessageVerify(protocol,retMsg);
		
//		System.out.println(retMsg);
		return null;
	}
	@Override
	public IGAPIMsgResponse receiveMessage(GapiPara gapiObj, String mappingID) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public IGAPIMsgResponse rollback(GapiPara gapiObj, IGAPIMsgRequest message) {
		// TODO Auto-generated method stub
		return null;
	}
}
