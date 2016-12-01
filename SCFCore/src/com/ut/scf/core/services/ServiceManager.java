package com.ut.scf.core.services;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ut.scf.core.log.APLogUtil;

/**
 * @see this is function services manager
 * @author PanHao
 *
 */
@Service(value="serviceManager")
public class ServiceManager implements IServcieManager{
	
	private static Map<String,IServiceRegister> registedServices = new ConcurrentHashMap<String,IServiceRegister>();
	
	public Logger getLogger(){
		return APLogUtil.getServiceLogger("");
	}

	@Override
	public void registeService(IServiceRegister register) {
		getLogger().debug("Start to registe service ... name is"+register.getServiceName());
		
		registedServices.put(register.getServiceName(), register);
		getLogger().debug("Registe service success ... name is"+register.getServiceName());
	}

	@Override
	public void unRegisteService(IServiceRegister register) {
		getLogger().debug("Start to unregiste service ... name is"+register.getServiceName());
		
		registedServices.remove(register.getServiceName());
		getLogger().debug("Unregiste service success ... name is"+register.getServiceName());
	}

	@Override
	public IServiceRegister getService(String serviceName) {
		if(registedServices.containsKey(serviceName)){
			return registedServices.get(serviceName);
		}
		return null;
	}
	
	
}
