package com.ut.scf.mule.message.webservice;

import javax.jws.WebService;

@WebService
public class MyWebService implements IWebService {

	public String sayHello(String name) {
		System.out.println("WebService sayHello " + name);
		return "Hello " + name;
	}

	public String save(String name, String pwd) {
		System.out.println("WebService save " + name + "， " + pwd);
		return "save Success";
	}

	@Override
	public String doWork(String reqData) {
		// TODO Auto-generated method stub
		return null;
	}

}
