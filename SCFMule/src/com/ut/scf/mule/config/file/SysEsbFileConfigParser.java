package com.ut.scf.mule.config.file;

import org.w3c.dom.Document;

import com.ut.scf.mule.config.IFlowLogic;
import com.ut.scf.mule.config.IProtocol;
import com.ut.scf.mule.config.ISysEsbConfigFlowConstruct;
import com.ut.scf.mule.config.ISysEsbConfigParser;

public class SysEsbFileConfigParser implements ISysEsbConfigParser{
	private String strName;
	private String strProtocolType;
	private IFlowLogic flowLogic;
	private IProtocol protocol;
	private ISysEsbConfigFlowConstruct flowConstruct;
	private Document configDom;


	@Override
	public void loadConfig(Document configDom) {
		this.configDom = configDom;
	}

	@Override
	public ISysEsbConfigFlowConstruct parseCongig() {
		return null;
	}

}
