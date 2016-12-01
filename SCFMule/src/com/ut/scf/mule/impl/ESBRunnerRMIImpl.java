package com.ut.scf.mule.impl;

import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.mule.IESBProtocol;

public class ESBRunnerRMIImpl implements IESBProtocol{

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception {
		return null;
	}

	@Override
	public void initlizeService(IESBService request) throws Exception {
		
	}

	@Override
	public void destoryService(IESBService request) throws Exception {
		
	}

	@Override
	public String getServiceTp() {
		// TODO Auto-generated method stub
		return null;
	}

}
