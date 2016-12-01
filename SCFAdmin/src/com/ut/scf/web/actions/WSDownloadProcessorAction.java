package com.ut.scf.web.actions;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import org.apache.commons.lang.StringUtils;

import com.ut.scf.web.servlet.AbsServletRequestAware;

public class WSDownloadProcessorAction  extends AbsServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String fileName ;
	private String filePath;
	
	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) throws UnsupportedEncodingException {
		this.fileName = new String(fileName.getBytes("ISO8859-1"),"utf-8");
	}

	public InputStream getDownloadFile()throws Exception{	
		filePath = new String(filePath.getBytes("ISO8859-1"));   //解决下载的文件为中文问题
		File downloadFile = new File(filePath);

		//解决下载到本地保存的文件名为中文问题
		fileName = new String(filePath.substring(filePath.lastIndexOf("\\")+1).getBytes(),"ISO8859-1");
		fileName = java.net.URLEncoder.encode(fileName, "ISO8859-1");  //兼容各浏览器
		fileName = StringUtils.replace(fileName, "+", "%20");//替换空格  
		return new FileInputStream(downloadFile);
	}	
	
	public String execute() throws Exception{
		return SUCCESS;
	}
	
	@Override
	protected String getReqType() {
		return "Download";
	}

}
