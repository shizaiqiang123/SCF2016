package com.ut.scf.mule.impl;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.esb.IESBClientService;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceEntity;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.mule.IESBProtocol;

public class ESBRunnerClassImpl implements IESBProtocol{



	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception {
		IESBServiceEntity entity = request.getRequestTarget();
		String implClass = entity.getServiceProtocol();
		if(StringUtil.isTrimEmpty(implClass))
			throw new Exception("Missing implement protocol class name.");
		
		IESBClientService implClassInstance = ClassLoadHelper.getComponentClass(implClass);
		if(implClassInstance==null)
			throw new Exception("Unknow implement protocol class name:"+implClass);
		return implClassInstance.runService(request);
	}

	@Override
	public void initlizeService(IESBService request) throws Exception {
		String implClass = request.getServiceProtocol();
		if(StringUtil.isTrimEmpty(implClass))
			return;
		
		IESBClientService implClassInstance = ClassLoadHelper.getComponentClass(implClass);
		if(implClassInstance==null)
			return;
		implClassInstance.initialize();
	}

	@Override
	public void destoryService(IESBService request) throws Exception {
		String implClass = request.getServiceProtocol();
		if(StringUtil.isTrimEmpty(implClass))
			return;
		
		IESBClientService implClassInstance = ClassLoadHelper.getComponentClass(implClass);
		if(implClassInstance==null)
			return;
		implClassInstance.destroy();
	}

	@Override
	public String getServiceTp() {
		// TODO Auto-generated method stub
		return null;
	}

}
