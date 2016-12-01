package com.ut.test.webservices;

import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

@WebService
public class Loan {

	@WebResult(name="text")
	public String takeDown(@WebParam(name="text") String name){
		System.out.println(name + "takedown a loan....");
		return name + "takedown a loan....success";
	}
	
	@WebResult(name="text")
	public String payment(@WebParam(name="text")String name){
		System.out.println(name + "pay a loan....");
		return name + "pay a loan....success";
	}
	
	@WebResult(name="text")
	public String queryInterest(@WebParam(name="text")String name){
		System.out.println(name + "query a loan....");
		return name + "query a loan....120000.00";
	}
}
