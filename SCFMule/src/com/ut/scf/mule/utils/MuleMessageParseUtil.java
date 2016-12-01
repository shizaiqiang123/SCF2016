package com.ut.scf.mule.utils;

import java.io.IOException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.ut.comm.tool.xml.XMLManager;

public class MuleMessageParseUtil {
//	public static void parseSendMessageWSProtocol(IMuleSendMsgWebServiceProtocol protocol) throws SAXException, IOException{
//		String protocolID = protocol.getProtocolID();
//		Document proDom = loadWebServiceProtocol(protocolID);
//		Node addressNode = XMLManager.selectSingleNode(proDom, "interface/detail/serviceAddress");
//		protocol.setServiceAddress(XMLManager.getNodeValue(addressNode, true));
//		
//		Node serviceClassNode = XMLManager.selectSingleNode(proDom, "interface/detail/serviceClass");
//		protocol.setServiceClass(XMLManager.getNodeValue(serviceClassNode, true));
//		
//		Node servicePort = XMLManager.selectSingleNode(proDom, "interface/detail/servicePort");
//		protocol.setServicePort(XMLManager.getNodeValue(servicePort, true));
//		
//		NodeList operatorList = XMLManager.selectNodes(proDom, "interface/detail/operators/op");
//		List<String> opList = new ArrayList<String>();
//		for(int i=0;i<operatorList.getLength();i++){
//			Node node  = operatorList.item(i);
//			opList.add(XMLManager.getNodeValue(node, true));
//		}
//		protocol.setOperatorList(opList);
//		
//	}
	
	private static Document loadWebServiceProtocol(String protocolID) throws SAXException, IOException{
		
		return loadConfigPara("D:\\Work\\space\\StarUTian\\SCF\\para\\ap\\gapi\\definition\\consumer",protocolID);
	}

	private static Document loadConfigPara(String path,String key) throws SAXException, IOException {
		String strPath = new StringBuffer(path).append("\\").append(key).append(".xml").toString();
		return XMLManager.xmlFileToDom(strPath);
	}
	
	
}
