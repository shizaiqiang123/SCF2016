package com.ut.scf.core.component.main.impl.beans;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.ws.security.util.UUIDGenerator;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.opensymphony.xwork2.ActionContext;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.sys.SysPara;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.scf.core.component.AbsMainCompManager;
import com.ut.scf.core.component.ITemplateReformat;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.utils.ClassLoadHelper;

@Service("aSETrxImageImportManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxImageImportManagerBean extends AbsMainCompManager{

	@Resource(name = "documentFactory")
	DocumentFactoryImpl documentFactory ;
	
	private File file = null;
	
	@Override
	public Object queryData(Object paraDom) throws Exception {		
		try {
			JSONObject trxData = JsonHelper.getTrxObject((JSONObject) paraDom);		
			JSONObject trxDataAf =  new JSONObject();
			super.parseParameters(paraDom);
			//保存上传文件到服务器临时目录,filePath(文件路径),fileExtensions(文件后缀)写入trxData.
			saveTempFile(trxData);
			
//			JsonHelper.setTrxObject((JSONObject)paraDom, trxData);
			FuncDataObj logicObj = new FuncDataObj();
		    logicObj.setReqData((JSONObject)paraDom);
		    //解析上传文件内容,数据写入logicObj中的data中。
		    logicObj.buildRespose("fileStream");
		    trxData.remove("fileStream");
		    trxData.remove("reqType");
		    String filePath=trxData.getString("filePath");
			IApResponse retObj = new ApResponse();
			retObj.setSuccess(true);	
			retObj.setMessage("上传成功");
			retObj.setObj(trxData);
			return retObj;			
		} catch (Exception e) {			
			logger.error(e.getMessage());
			IApResponse obj = new ApResponse();
			obj.setTotal(1);
			obj.setPageInfo(null);
			obj.setFuncObj(null);
			obj.setMessage("上传文件失败："+e.getMessage());
			obj.setSuccess(false);
			return obj;
		}finally{
//			if (file.exists()) {
//				file.delete();//删除临时文件
//			}
		}
	}

	@Override
	public Object submitData(Object paraDom) throws Exception {		
		return null;	
	}
		
	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
	}

	private void releaseRefNumber() {
		
	}

	/**
	 * 保存上传文件到服务器临时目录，filePath(文件路径),fileExtensions(文件后缀)写入trxData.
	 * @param trxData
	 * @throws IOException
	 * @see [类、类#方法、类#成员]
	 */
	private void saveTempFile(JSONObject trxData) throws IOException{
		String path ="";		
		BufferedOutputStream out=null;
		try {
			String fileName = trxData.getString("fileName");		
			String fileObj = (String)trxData.get("fileStream");//获取二进制流转成的字符串
			int pos=fileName.lastIndexOf(".");
			String fileExtensions = fileName.substring(pos);//文件后缀
			String serFileName = UUIDGenerator.getUUID()+fileExtensions;//重命名上传文件
//			SysPara sysPara = XMLParaParseHelper.parseSysPara(context.getSysBusiUnit());
			ActionContext ac = ActionContext.getContext();
			ServletContext sc = (ServletContext) ac.get(ServletActionContext.SERVLET_CONTEXT);
			String x = sc.getRealPath("/");
			String dirName =x+"images\\userLcon\\";//获取临时目录路径
			File fileDir = new File(dirName);
			path = dirName+serFileName;
			String relPath="images/userLcon/"+serFileName;
			if(!fileDir.exists()){
				fileDir.mkdirs();//目录不存在则新建
			}		
		    file=new File(path);			
			out=new BufferedOutputStream(new FileOutputStream(file));
		    out.write(fileObj.getBytes("ISO-8859-1"));//字符串转成byte[]写入临时文件
		    out.close();
		    trxData.put("filePath", relPath);
		    trxData.put("fileExtensions", fileExtensions);
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if (null != out) {
				out.close();
			}			
		}		
	}
	
	
	private void parseFileContent() {
		int length = 10;
		for (int i = 0; i < length ; i++) {
			generateRefNumber();
		}
	}

	private void parseTemplate() {
		
	}

	private void generateRefNumber() {
		
	}
	
}
