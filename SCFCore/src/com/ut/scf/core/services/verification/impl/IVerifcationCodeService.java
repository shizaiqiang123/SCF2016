package com.ut.scf.core.services.verification.impl;

import com.ut.scf.core.data.FuncDataObj;

public interface IVerifcationCodeService {
	/**
	 * input : key
	 * para : verifyPara
	 * @return code
	 * @throws Exception 
	 */
	public Object generateCode(FuncDataObj data) throws Exception;
	
	/**
	 * input : code
	 * input : key
	 * @return
	 */
	public Object verifyCode(FuncDataObj data);
}
