package com.ut.scf.mule;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.scf.mule.message.IMuleMessageProcessor;
import com.ut.scf.mule.message.MuleMessageProcessor;
import com.ut.scf.mule.services.IMuleServiceRequest;
import com.ut.scf.mule.services.MuleServicesRequestObj;

@Service(value="muleServicesManagerControl")
public class MuleServicesManagerControl {
	
	public static final String REQUEST_TYPE_SEND_MESSAGE = "send message";

	private static Map<String,Class<? extends IMuleMessageProcessor>> muleProcessorMap = new ConcurrentHashMap<String,Class<? extends IMuleMessageProcessor>>();
	
	static{
		muleProcessorMap.put(REQUEST_TYPE_SEND_MESSAGE, MuleMessageProcessor.class);
	}
	@Autowired
//	MuleServicesRequestObj request;
	
	public IMuleServiceRequest createSendMessageRequest(){
		MuleServicesRequestObj request = new MuleServicesRequestObj();
		request.setRequestType(REQUEST_TYPE_SEND_MESSAGE);
		return request;
	}
	
	public String sendMessage(IMuleServiceRequest request){
		IMuleMessageProcessor processor = createProcessor(request.getRequestType());
		Assert.notNull(processor,String.format("System can not load processor by type: %s ",request.getRequestType()));
		return processor.sendMessage(request.getMuleContext(),request.getRequestProtocol(), request.getRequestMessageBody());
	}

	private IMuleMessageProcessor createProcessor(String requestType){
		Assert.notNull(requestType);
		try{
			Class<? extends IMuleMessageProcessor> clazz = muleProcessorMap.get(requestType);
			
			return (IMuleMessageProcessor) Class.forName(clazz.getName()).newInstance();
//			return (IMuleMessageProcessor) ContextLoader.getCurrentWebApplicationContext().getBean(convertFirstCharToLowCase(clazz.getSimpleName()));
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	private String convertFirstCharToLowCase(String input){
		Assert.notNull(input);
		String first = input.substring(0, 1);
		first = first.toLowerCase();
		return first+input.substring(1);
	}
	
}
