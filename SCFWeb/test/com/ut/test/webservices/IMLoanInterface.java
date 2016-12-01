package com.ut.test.webservices;

import javax.jws.WebParam;
import javax.jws.WebService;

import com.ut.test.webservices.entity.MLoanEntity;

@WebService 
public interface IMLoanInterface {
	public String takeDown(@WebParam(name="IEntity")MLoanEntity entity);
	
	public String amend(@WebParam(name="IEntity")MLoanEntity entity);
	
	public String pay(@WebParam(name="IEntity")MLoanEntity entity);
	
	public String query(@WebParam(name="IEntity")MLoanEntity entity);
}
