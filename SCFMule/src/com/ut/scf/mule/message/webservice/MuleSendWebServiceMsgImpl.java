package com.ut.scf.mule.message.webservice;

import java.util.List;

import com.ut.scf.mule.services.IMuleServiceRequest;

public class MuleSendWebServiceMsgImpl {
	
	public String process(IMuleServiceRequest request){
		System.out.println("test for WebService process...");
		String resMsg="";
//		try{
//			IFrameworkProtocol protocol = request.getRequestProtocol();
//			IGAPIMsgRequest message = request.getRequestMessageBody();
//			WSMsgSendProDetail protocolDetail = (WSMsgSendProDetail) protocol.getDetail();
//			Class<?> clazz = Class.forName(protocolDetail.getClassname());//ת��Spring��ʽ����
//			JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
//			factory.setServiceClass(clazz);
//			factory.setAddress(protocolDetail.getAddress());
//			
//			Object service = factory.create();
//			Class<?>[] parametersType = getParametersType(message.getClientEntitys());
//			Method  method = service.getClass().getMethod(protocolDetail.getOperators().getOp(1).getName(), parametersType);
//			resMsg = (String) method.invoke(service, message.getClientEntitys().toArray());
//			System.out.println(resMsg);
//		}catch(ClassNotFoundException e){
//			e.printStackTrace();
//		} catch (NoSuchMethodException e) {
//			e.printStackTrace();
//		} catch (SecurityException e) {
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			e.printStackTrace();
//		} catch (IllegalArgumentException e) {
//			e.printStackTrace();
//		} catch (InvocationTargetException e) {
//			e.printStackTrace();
//		}
		System.out.println("test for WebService process...end");
		return resMsg;
	}

	private Class<?>[] getParametersType(List<Object> parameters) {
		Class<?>[] retTypes = new Class[parameters.size()];
		int index = 0 ;
		for(Object clazz:parameters){
			retTypes[index++] = clazz.getClass();
		}
		return retTypes;
	}
	
}
