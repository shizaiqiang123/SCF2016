package com.ut.scf.core.parser;

import java.io.IOException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import com.ut.comm.tool.xml.XMLManager;
import com.ut.scf.core.gapi.IFrameworkProtocol;

public class MessageProtocolParseUtil {
	public static void parseSendMessageWSProtocol(IFrameworkProtocol protocol) throws SAXException, IOException{
		String protocolID = protocol.getId();
//		Assert.isInstanceOf(MessageSendProtocol.class,protocol);
		
//		Document proDom = loadWebServiceProtocol(protocolID);
//		
//		((MessageSendProtocol)protocol).parseXml(proDom.getDocumentElement());
//		
//		WSMsgSendProDetail detail = new WSMsgSendProDetail();
//		detail.parseXml(proDom.getDocumentElement());
//		protocol.setDetail(detail);
		
		
		
	}
	
	private static Document loadWebServiceProtocol(String protocolID) throws SAXException, IOException{
		
		return loadConfigPara("E:\\workspaces\\SCF\\para\\ap\\gapi\\consumer",protocolID);
	}

	private static Document loadConfigPara(String path,String key) throws SAXException, IOException {
		String strPath = new StringBuffer(path).append("\\").append(key).append(".xml").toString();
		return XMLManager.xmlFileToDom(strPath);
	}
	
//	public static void main(String[] args){
//		System.out.println("start");
//		IFrameworkProtocol protocol = new MessageSendProtocol();
//		protocol.setId("IS000001");
//		try {
//			parseSendMessageWSProtocol(protocol);
//			System.out.print(protocol.getHeader().getReformatclass());
//			WSMsgSendProDetail detail = (WSMsgSendProDetail) protocol.getDetail();
//			System.out.println(detail.getClassname());
//			System.out.println(detail.getOperators().getOps().size());
//			System.out.println(detail.getOperators().getOp(3).getName());
//		} catch (SAXException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		System.out.println("end");
//	}
	
	
}
