package com.ut.scf.mule.config;

import com.ut.scf.mule.config.IFlowLogic;
import com.ut.scf.mule.config.IProtocol;
import com.ut.scf.mule.config.ISysEsbConfigFlowConstruct;

public class SysEsbFlowConstruct implements ISysEsbConfigFlowConstruct{
	private String strName;
	private String strProtocolType;
	private IFlowLogic flowLogic;
	private IProtocol protocol;

	public void setStrName(String strName) {
		this.strName = strName;
	}

	public void setStrProtocolType(String strProtocolType) {
		this.strProtocolType = strProtocolType;
	}

	public void setFlowLogic(IFlowLogic flowLogic) {
		this.flowLogic = flowLogic;
	}

	public void setProtocol(IProtocol protocol) {
		this.protocol = protocol;
	}

	@Override
	public String getStrName() {
		return strName;
	}

	@Override
	public String getStrProtocolType() {
		return strProtocolType;
	}

	@Override
	public IFlowLogic getFlowLogic() {
		return flowLogic;
	}

	@Override
	public IProtocol getProtocol() {
		return protocol;
	}

}
