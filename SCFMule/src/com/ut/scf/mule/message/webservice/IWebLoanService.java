package com.ut.scf.mule.message.webservice;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

@WebService(serviceName = "IWebLoanService")
public interface IWebLoanService {
	@WebMethod
	@WebResult(name = "retData")
	String loanApplyRt(@WebParam(name = "reqData") String reqData);
}
