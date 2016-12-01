package com.ut.scf.core.component;

import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.data.FuncServiceDataObj;
import com.ut.scf.core.exception.SCFThrowableException;

public interface IFuncServices {
	public FuncServiceDataObj callFuncServices(ServicePara servicesObj, FuncServiceDataObj domData)  throws SCFThrowableException;
	
	public void rollbackSercices(ServicePara servicesObj, FuncServiceDataObj domData);
}
