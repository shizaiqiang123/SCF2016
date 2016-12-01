package com.ut.test.webservices.entity;


public class MLoanEntity implements IMLoanEntity{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String name;

	@Override
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String getName() {
		return this.name;
	}


}
