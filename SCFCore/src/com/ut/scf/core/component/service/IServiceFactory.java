package com.ut.scf.core.component.service;

import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.esb.IESBRunner;

public interface IServiceFactory {
	public IESBRunner getProcessor(ServicePara serviceDefine);
}
