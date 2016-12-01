package com.ut.scf.core.services;

import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;

public interface IServiceAdatper {
	public void formatRequest(IESBServiceRequest request);
	
	public void formatResponse(IESBServiceResponse response);
}
