package com.ut.test.webservices.impl;

import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

import com.ut.test.webservices.IMLoanInterface;
import com.ut.test.webservices.entity.MLoanEntity;

@WebService 
public class MLoanService implements IMLoanInterface{

	@Override
	@WebResult(name="String")
	public String takeDown(@WebParam(name="IEntity")MLoanEntity entity) {
		return entity.getName()+" takeDown success... ";
	}

	@Override
	@WebResult(name="String")
	public String amend(@WebParam(name="IEntity")MLoanEntity entity) {
		return entity.getName()+" amend success... ";
	}

	@Override
	@WebResult(name="String")
	public String pay(@WebParam(name="IEntity")MLoanEntity entity) {
		return entity.getName()+" pay success... ";
	}

	@Override
	@WebResult(name="String")
	public String query(@WebParam(name="IEntity")MLoanEntity entity) {
		return entity.getName()+" query success... ";
	}



}
