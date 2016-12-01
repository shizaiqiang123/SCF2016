package com.ut.scf.core.services;

import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.gapi.IGAPIMsgRequest;

public interface IMessageGeneration {
	public IGAPIMsgRequest generateRequest(ServicePara service,Object domData);
	
	public IGAPIMsgRequest generateRollbackRequest(ServicePara service,Object domData);
}
