package com.ut.scf.mule.config;

public interface ISysEsbConfigFlowConstruct {
	public String getStrName();

	public String getStrProtocolType();

	public IFlowLogic getFlowLogic();
	
	public IProtocol getProtocol();
}
