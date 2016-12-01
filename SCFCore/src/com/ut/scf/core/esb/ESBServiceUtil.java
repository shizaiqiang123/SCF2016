package com.ut.scf.core.esb;

import org.slf4j.Logger;

import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

public class ESBServiceUtil {
	public static IESBServiceEntity generateRequestEntity(ServicePara service) throws Exception{
		IESBServiceEntity entity = ClassLoadHelper.getComponentClass("esbEntity");
		entity.setServiceId(service.getName());
		entity.setServiceType(service.getType());
		return entity;
	}
	
	public static IESBRunner getESBRunner() throws Exception{
		IESBRunner runner =  ClassLoadHelper.getComponentClass("esbContextListener");
		return runner;
	}
	
	public static IESBServiceEntity generateApRequestEntity() throws Exception{
		ServicePara service = new ServicePara();
		service.setId("ESBS000007");
		service.setName("Ap");
		service.setType("Class");
		return generateRequestEntity(service);
	}
	
	public static Logger getLogger(){
		return APLogUtil.getESBLogger();
	}
}
