package com.ut.scf.core.services.report.impl;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.w3c.dom.Element;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.js.ScriptManager;
import com.ut.scf.core.js.ServerSideJsImpl;

@Service("reportJs")
@Scope("prototype")
public class ReportJsEngine extends ServerSideJsImpl{

	private final String BEANNAME = "$";
	
	Map<String, Object> parameterValueMap=new HashMap<String, Object>();
	
	public ReportJsEngine(){
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
		try {
			updateProperty(trxData, "parameterValueMap", parameterValueMap);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void updateParameterValues(String key,Object value){
		parameterValueMap.put(key, value);
		try {
			updateProperty(this.trxData, "parameterValueMap", parameterValueMap);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public int getRecordCount(Object trxObj){
		Assert.isTrue(trxObj instanceof JSONObject,"Input parameter error.");
		JSONObject trxJson = (JSONObject) trxObj;
		if(trxObj!=null&&trxJson.containsKey("_total_rows")){
			return trxJson.getInt("_total_rows");
		}
		return 0;
	}
	
	public JSONObject getTrxRecord(Object trxObj,int recodIndex){
		Assert.isTrue(trxObj instanceof JSONObject,"Input parameter error.");
		JSONObject trxJson = (JSONObject) trxObj;
		String key = "rows"+recodIndex;
		if(trxJson.containsKey(key)){
			JSONObject record = (JSONObject) super.createObject("record");
			JSONObject obj =  trxJson.getJSONObject(key);
			record.putAll(obj);
			trxJson.remove(key);
			return record;
		}
		return null;
	}
	
	public Element getRecordElement(JSONObject jsonStr){
		return JsonUtil.convertToXmlElement(jsonStr);
	}
	
	@Override
	public void executeJsFile(String fileName) throws Exception{
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("report", fileName));
		super.executeJsFile(scriptFile.getPath());
	}
	
}
