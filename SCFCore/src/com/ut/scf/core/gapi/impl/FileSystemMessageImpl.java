package com.ut.scf.core.gapi.impl;

import java.io.File;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.file.FileReaderUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.scf.core.gapi.IGAPIMessage;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;

@Component("fileSystemImpl")
public class FileSystemMessageImpl implements IGAPIMessage {

	@Override
	public IGAPIMsgResponse sendMessage(GapiPara gapiObj, IGAPIMsgRequest message) throws Exception {
//		String sendPath = gapiObj.getSend();
//		File filePath = new File(sendPath);
//		if (!filePath.exists()) {
//			filePath.mkdir();
//		}
//
//		if (!filePath.canWrite()) {
//			throw new Exception("Output path canot be writed. Path = " + sendPath);
//		}
//
//		String nameing = gapiObj.getNaming();
//		String suffix = nameing.substring(nameing.lastIndexOf(".") + 1);
//		Object msgContent = message.getMsgBody();
//		if (StringUtil.isTrimEmpty(suffix)) {
//			suffix = "xml";
//		}
//		if ("xml".equalsIgnoreCase(suffix)) {
//			String newFileName = sendPath + File.separator + UUIdGenerator.getUUId() + ".xml";
//			XMLManager.writeXMLtoFile(newFileName, XMLManager.xmlStrToDom(msgContent.toString()));
//		} else {
//			String newFileName = sendPath + File.separator + UUIdGenerator.getUUId() + ".txt";
//			FileReaderUtil.writeFile(newFileName, msgContent);
//		}
//
//		if ("SYNC".equalsIgnoreCase(gapiObj.getModle())) {
//			return receiveMessage(null, "");
//		}

		return null;
	}

	@Override
	public IGAPIMsgResponse receiveMessage(GapiPara gapiObj, String mappingID) throws Exception {
		return null;
	}

	@Override
	public IGAPIMsgResponse rollback(GapiPara gapiObj, IGAPIMsgRequest message) throws Exception {
		return null;
	}
}
