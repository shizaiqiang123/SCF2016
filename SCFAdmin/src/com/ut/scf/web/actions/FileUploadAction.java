package com.ut.scf.web.actions;

import java.io.File;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.web.servlet.AbsServletRequestAware;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.utils.WebUtils;

public class FileUploadAction extends AbsServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Logger logger = LoggerFactory.getLogger(getClass());
		
	private File uploadFile;	
	private String fileName;	
	   
	public void setUploadFileFileName(String fileName){
	     this.fileName=fileName;
	}
	
	public void setUploadFile(File uploadFile){
	     this.uploadFile=uploadFile;
	}
     
	@Resource(name="aPQueryProcessor")  
	IAPProcessor process;	
	
	protected void beforeAction(){
			
	}
	
	@Override
	protected String executeAction() {	    
	    String fileObj="";
	    try {
	    	byte[] bytes = WebUtils.readFile(uploadFile);
			fileObj = new String(bytes,"ISO-8859-1");
		}
		catch (Exception e) {
			e.printStackTrace();
		}    
	    JsonUtil.getChildJson(dataDom, "trxDom").put("fileName",fileName);	    
	    //editby ccc for 单纯上传逻辑
	    JSONObject trxDom = JsonHelper.getTrxObject(dataDom);	
	    Object reqType=trxDom.get("reqType");
		if (reqType == null) {
//			reqType = reqType.toString();
			JsonUtil.getChildJson(dataDom, "trxDom").put("reqType",
					"webImportManager");
		}
	    JsonUtil.getChildJson(dataDom, "trxDom").put("fileStream",fileObj);
		processResult = process.run(dataDom.toString());
		super.dataMap = getRetMap(processResult);
	    
		return SUCCESS;
	}
	
	protected void afterAction() {
		SessionManager.setTrxDataToSession(request, dataMap.get("obj"));
	}

	@Override
	protected String getReqType() {
		return "fileUpload";
	}
}