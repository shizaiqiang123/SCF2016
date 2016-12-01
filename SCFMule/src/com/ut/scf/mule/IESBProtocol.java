package com.ut.scf.mule;

import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;

public interface IESBProtocol {
	public String PROTOCOL_INOROUT_IN="I";
	public String PROTOCOL_INOROUT_OUT="O";
	
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception;
	
	public void initlizeService(IESBService request) throws Exception;
	
	public void destoryService(IESBService request) throws Exception;
	
	public String getServiceTp();
}
