package com.ut.scf.core.msg.broke;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.msg.IMsgBroker;

@Service("fileMsgBroker")
public class FileSystemBroker implements IMsgBroker{
	private GapiPara gapiPara;
	
	public Logger getLogger(){
		return APLogUtil.getBatchLogger();
	}

	@Override
	public void setGapi(String gapiid) {
		gapiPara = XMLParaParseHelper.parseGapiPara(gapiid,"");
	}

	@Override
	public List<Object> runReceiveMsg() throws Exception {
//		String reveicePath = gapiPara.getReveive();
//		File filePath = new File(reveicePath);
//		if (!filePath.exists()) {
//			filePath.mkdir();
//		}
//
//		if (!filePath.canRead()) {
//			throw new Exception("Input path canot be read. Path = " + reveicePath);
//		}
//
//		String backupPath = gapiPara.getBackup();
//		boolean needBackup = false;
//		if(StringUtil.isTrimNotEmpty(backupPath)){
//			File backup = new File(backupPath);
//			if (!backup.exists()) {
//				backup.mkdir();
//			}
//
//			if (!backup.canRead()) {
//				throw new Exception("Backup path canot be read. Path = " + backupPath);
//			}
//			needBackup = true;
//		}
//		
//		String suffix = gapiPara.getSuffix();
//		if (StringUtil.isTrimEmpty(suffix)) {
//			suffix = "xml";
//		}
//		
//		int recvTime = Integer.parseInt(gapiPara.getReceivetime());
//
//		List<Object> filesContent = processFileSTP(filePath, suffix, recvTime,needBackup,backupPath);
//		return filesContent;
		return null;
	}

	private List<Object> processFileSTP(File recvPath, String suffix, int recvTime,boolean needBackup,String backupPath) throws IOException {
		BufferedInputStream fin = null;
		BufferedOutputStream fout = null;
		List<Object> retList = new ArrayList<Object>();
		try {
			File[] fileList = recvPath.listFiles();
			for (int i = 0; i < fileList.length; i++) {
				if (fileList[i].isFile()) {
					File curFile = fileList[i];
					String finName = curFile.getName();
					String newSuffix = suffix;
					String fbackFile = backupPath + File.separator + finName.substring(0, finName.lastIndexOf("."))+"_bk";
					fin = new BufferedInputStream(new FileInputStream(curFile));
					if (needBackup)
						fout = new BufferedOutputStream(new FileOutputStream(fbackFile + newSuffix));
					ByteArrayOutputStream buffer = new ByteArrayOutputStream();
					byte[] buf = new byte[1024];
					int l = 0;
					while ((l = fin.read(buf, 0, 1024)) != -1) {
						buffer.write(buf, 0, l);
						if (needBackup)
							fout.write(buf, 0, l);
					}
					fin.close();
					if (fout != null)
						fout.close();
					String msg = new String(buffer.toByteArray(), "UTF-8");
					Document strToDom = XMLManager.xmlStrToDom(msg);
					if (strToDom != null) {
						String strEncode = strToDom.getXmlEncoding();
						if(StringUtil.isTrimEmpty(strEncode)){
							strEncode = "UTF-8";
						}
						if (!"UTF-8".equals(strEncode)) {
							msg = new String(buffer.toByteArray(), strEncode);
						}
					}
					
					if (!curFile.delete()) {
						getLogger().error("Delete file failed!");
					}
					retList.add(msg);
				}
			}
		} catch (Exception e) {
			getLogger().error(e.toString());
			getLogger().error(ErrorUtil.getErrorStackTrace(e));
		}finally{
			if(fin!=null)
				fin.close();
			if(fout!=null)
				fout.close();
		}
		return retList;
	}
}
