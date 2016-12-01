package com.ut.scf.core.services;

import com.ut.scf.core.data.FuncDataObj;

public interface IServiceRunner {

	public void runService(String serviceId,FuncDataObj reqData);
	
	public void setBu(String bu);
}
