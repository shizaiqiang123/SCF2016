package com.ut.scf.core.services;

import com.ut.scf.core.esb.IESBServiceEntity;

public interface IAdatperFactory {
	public IServiceAdatper createFormattor(IESBServiceEntity entity) throws Exception;
	
	public boolean needFormattor(IESBServiceEntity entity) throws Exception;
}
