package com.ut.scf.mule.message;

import org.mule.api.MuleContext;

import com.ut.scf.core.gapi.IFrameworkProtocol;
import com.ut.scf.core.gapi.IGAPIMsgRequest;

public class MuleMessageProcessor implements IMuleMessageProcessor{
	private IFrameworkProtocol protocolEntity;
	
	private IGAPIMsgRequest messageData;
	
	private IMuleConfigProcessor processor;
	
	private MuleContext context;
	
	public final String PROTOCOL_MODULE_SYNC = "sync";
	public final String PROTOCOL_MODULE_ASYN = "async";
	
	@Override
	public String sendMessage(MuleContext context, IFrameworkProtocol protocol, IGAPIMsgRequest message){
		String regMsg = "";
		this.protocolEntity = protocol;
		this.messageData = message;
		this.context=context;
		
		processor = MuleMessageProcessFactory.createProcessor(protocol);
		
		if(PROTOCOL_MODULE_SYNC.equalsIgnoreCase(protocolEntity.getHeader().getMode())){
			regMsg = sendMessageBySync();
		}else{
			sendMessageByAsync();
		}
		return regMsg;
	}

	public String sendMessageByAsync(){
		String mappingID = processor.sendMessage(context,protocolEntity,messageData);
		
		return "";
	}
	
	public String sendMessageBySync(){
		String mappingID = processor.sendMessage(context,protocolEntity,messageData);
//		String timeout = protocolEntity.getTimeout();
		String reveiceMessage="";
		//while(Long.parseLong(timeout)>0){
			reveiceMessage = processor.receiveMessage(context,mappingID); 
		//}
		
		return reveiceMessage;
	}


}
