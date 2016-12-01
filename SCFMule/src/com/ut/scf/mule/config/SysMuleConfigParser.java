package com.ut.scf.mule.config;

import java.io.IOException;

import org.w3c.dom.Document;
import org.w3c.dom.Node;

import com.ut.comm.tool.xml.XMLManager;
import com.ut.scf.mule.config.impl.MuleEntityFactory;

public class SysMuleConfigParser implements ISysEsbConfigParser{
	private SysEsbFlowConstruct flowConstruct;
	private Document configDom;
	
	private String strName;
	private String strProtocolType;
	private MuleFlowLogicEntity flowLogic;
	private IProtocol protocol;

	@Override
	public void loadConfig(Document configDom) throws IOException {
		if(configDom==null||!configDom.hasChildNodes()){
			throw new IOException("Config file is empty.");
		}
		this.configDom = configDom;
		Node flowNode  = XMLManager.findChildNode(configDom.getDocumentElement(), CONFIG_ROOT);
		this.strName = XMLManager.getChildNodeValue(flowNode, CONFIG_NAME, true);
		this.strProtocolType = XMLManager.getChildNodeValue(flowNode, CONFIG_PROTOCOL_TYPE, true);
	}

	@Override
	public ISysEsbConfigFlowConstruct parseCongig() {
		Node componentNode = XMLManager.findChildNode(configDom, CONFIG_LOGIC_FLOW);
		flowLogic = MuleEntityFactory.newInstence().createFlowLogics(componentNode);
//		strProtocolType = MuleEntityFactory.newInstence().createFlowLogics(componentNode);
		
		flowConstruct.setStrName(strName);
		flowConstruct.setStrProtocolType(strProtocolType);
		flowConstruct.setFlowLogic(flowLogic);
		flowConstruct.setProtocol(protocol);
		return (ISysEsbConfigFlowConstruct)flowConstruct;
	}

}
