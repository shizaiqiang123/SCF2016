package com.ut.scf.mule;

import com.ut.scf.core.esb.IESBService;

public interface IESBProtocolFactory {
	public IESBProtocol getProtocolImpl(IESBService service) throws Exception;
}
