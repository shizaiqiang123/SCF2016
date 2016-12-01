package com.ut.scf.core.js;

import java.io.File;
import java.io.IOException;




import net.sf.json.JSONObject;

import org.hibernate.internal.util.xml.XMLHelper;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.w3c.dom.Document;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.XMLParaParseHelper;

@Service("serverSideJs")
@Scope("prototype")
public class ServerSideJsImpl extends AbsServerSideJs{
	private final String BEANNAME = "$";
	
	protected Object reqData;
	
	protected Object commData;
	
	protected Object funcData;
	
	protected Object userData;
	
	public ServerSideJsImpl(){
	    scriptMgr = new ScriptManager(BEANNAME, this);	    
	}
	
	@Override
	public void initTrxData(Object reqData) {
		if(scriptMgr==null){
			scriptMgr =new ScriptManager(BEANNAME, this); 
		}
	
		Assert.isTrue(JSONObject.class.isAssignableFrom(reqData.getClass()), "Currenttly doesn't support others data type but [JSONObject].");
		this.orgnData = (JSONObject) reqData;
		this.reqData = JsonUtil.clone(orgnData);
		
		JSONObject reqJson = (JSONObject) this.reqData;
		
		commData = JsonHelper.getConnObject(reqJson);
		funcData = JsonHelper.getFuncObject(reqJson);
		userData = JsonHelper.getUserObject(reqJson);
		trxData = JsonHelper.getTrxObject(reqJson);
	}
	
	@Override
	public Object getTrxData() {
		return reqData;
	}
	
	public Object getTrxJsonData() {
		return trxData;
	}

	/**
	 * @param fileName : full path of js file
	 * @throws Exception 
	 */
	@Override
	public void executeJsFile(String fileName) throws Exception {
		if(StringUtil.isTrimEmpty(fileName))
			return;
		if(!fileName.endsWith(".js")){
			fileName+=".js";
		}
		File scriptFile = new File(fileName);
		
		try {
			if(scriptFile.exists()&&scriptFile.canRead())
				scriptMgr.exec(scriptFile);
			else
				throw new IOException("File not found or canot read.");
		} catch (IOException e) {
			printError(e.toString());
			throw e;
		}
	}

	@Override
	public void executeJsContent(String jsContent) throws Exception {
		scriptMgr.exec(jsContent);
	}
	
	public void setXmlPara(Object data,String paraId,String paraPath,String bu){
		JSONObject jsonObject=(JSONObject) data;
		Document content=(Document) JsonUtil.convertToXmlElement(jsonObject);
		try {
			XMLParaLoadHelper.writeApParaDefine(paraId, paraPath, bu, content);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			printError(e.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			printError(e.toString());
		}
	}
	
}
