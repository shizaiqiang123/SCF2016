package com.ut.scf.mule.message.webservice;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

@WebService(serviceName = "IWebService1")
public interface IWebService {
	@WebMethod
	@WebResult(name = "retData")
	String doWork(@WebParam(name = "reqData") String reqData);
}
