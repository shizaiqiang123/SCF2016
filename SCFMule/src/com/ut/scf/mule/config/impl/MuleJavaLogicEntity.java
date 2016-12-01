package com.ut.scf.mule.config.impl;

import com.ut.scf.mule.config.MuleLogicEntity;

public class MuleJavaLogicEntity extends MuleLogicEntity{
	private String strClassModule;
	
	public String getStrClassModule() {
		return strClassModule;
	}

	public void setStrClassModule(String strClassModule) {
		this.strClassModule = strClassModule;
	}

	public MuleJavaLogicEntity(){
		this.setEntityType("Java");
	}
	
	

}
