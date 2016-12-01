package com.ut.scf.core.services.accounting.impl;

public interface IAccountingManager {
	public Object getData(Object data) throws Exception;
	
	public Object postData(Object data);
	
	public Object releaseData(Object data);
	
	public Object cancelPost(Object data);
	
	public Object cancelRelease(Object data);
	
	public Object checkBanlance(Object data);
}
