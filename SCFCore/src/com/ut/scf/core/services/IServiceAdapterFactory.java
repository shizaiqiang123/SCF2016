package com.ut.scf.core.services;

import com.ut.scf.core.esb.IESBServiceRequest;

public interface IServiceAdapterFactory {
	public IAdatperFactory getAdapter(IESBServiceRequest service);
}
