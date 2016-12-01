package com.ut.scf.core.services;

import com.ut.scf.core.esb.IESBServiceRequest;

public class ServiceAdapterFactoryImpl implements IServiceAdapterFactory{

	@Override
	public IAdatperFactory getAdapter(IESBServiceRequest request) {
		String reqType = request.getRequestType();
		if(IESBServiceRequest.REQUEST_TYPE_QUERY.equalsIgnoreCase(reqType)){
			return new QueryAdapterFactory();
		}else if(IESBServiceRequest.REQUEST_TYPE_POST.equalsIgnoreCase(reqType)){
			return new PostAdapterFactory();
		}else{
			return new PostAdapterFactory();
		}
	}

}
