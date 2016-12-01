package com.ut.scf.core.services.cms.impl;

import com.ut.scf.core.data.FuncDataObj;

public interface ICmsService {
	/**
	 * input : key
	 * para : verifyPara
	 * @return code
	 * @throws Exception 
	 */
	public Object getCustNo(FuncDataObj data) throws Exception;
	
}
