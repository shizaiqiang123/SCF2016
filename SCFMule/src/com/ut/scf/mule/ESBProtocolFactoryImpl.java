package com.ut.scf.mule;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.ut.scf.core.esb.IESBService;
import com.ut.scf.mule.impl.ESBRunnerClassImpl;
import com.ut.scf.mule.impl.ESBRunnerEmailImpl;
import com.ut.scf.mule.impl.ESBRunnerFTPImpl;
import com.ut.scf.mule.impl.ESBRunnerJMSImpl;
import com.ut.scf.mule.impl.ESBRunnerRMIImpl;
import com.ut.scf.mule.impl.ESBRunnerSocketImpl;
import com.ut.scf.mule.impl.ESBRunnerURLImpl;
import com.ut.scf.mule.impl.ESBRunnerWSImpl;

public class ESBProtocolFactoryImpl implements IESBProtocolFactory{
	
//	public final String SERVICE_TYPE_RMI = "RMI";
//	public final String SERVICE_TYPE_WS = "WS";
//	public final String SERVICE_TYPE_MQ = "MQ";
//	public final String SERVICE_TYPE_CLASS = "CLASS";
	
	private static Map<String, IESBProtocol> regestedProtocol = new ConcurrentHashMap<String, IESBProtocol>();

	@Override
	public IESBProtocol getProtocolImpl(IESBService service) throws Exception {
		IESBProtocol serviceImpl = null;
		String serviceId = service.getServiceId();
		String serviceTp = service.getProtocoltp();
		if(regestedProtocol.containsKey(serviceId))
			return regestedProtocol.get(serviceId);
		if(IESBService.SERVICE_TYPE_CLASS.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerClassImpl();
		}else if(IESBService.SERVICE_TYPE_WS.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerWSImpl();
		}else if(IESBService.SERVICE_TYPE_MQ.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerJMSImpl();
		}else if(IESBService.SERVICE_TYPE_RMI.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerRMIImpl();
		}else if(IESBService.SERVICE_TYPE_SOCKET.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerSocketImpl();
		}else if(IESBService.SERVICE_TYPE_URL.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerURLImpl();
		}else if(IESBService.SERVICE_TYPE_FTP.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerFTPImpl();
		}else if(IESBService.SERVICE_TYPE_EMAIL.equalsIgnoreCase(serviceTp)){
			serviceImpl = new ESBRunnerEmailImpl();
		}else{
			throw new Exception("UnKnow request service type:"+serviceTp);
		}
		regestedProtocol.put(serviceId, serviceImpl);
		return serviceImpl;
	}

}
