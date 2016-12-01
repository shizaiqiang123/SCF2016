package com.ut.scf.core.component.service;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.esb.IESBRunner;
import com.ut.scf.core.utils.ClassLoadHelper;

@Service("serviceFactory")
public class ServiceFactoryImpl implements IServiceFactory{

	@Override
	public IESBRunner getProcessor(ServicePara serviceDefine) {
		IESBRunner runner = null;
		try {
			runner = ClassLoadHelper.getComponentClass("esbContextListener");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			Assert.isTrue(false, "Can not instance Service processor.");
		}
		return runner;
	}

}
