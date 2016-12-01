package com.ut.scf.core.services.edi.impl;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.edi.EDIPara;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.ref.RefPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.js.AbsServerSideJs;
import com.ut.scf.core.js.ScriptManager;
import com.ut.scf.core.ref.IReferenceNo;

@Service("ediJsEngine")
@Scope("prototype")
public class EDIJsEngine extends AbsServerSideJs {

	private final String BEANNAME = "$";

	protected Object reqData;

	protected JSONObject commData;

	protected JSONObject funcData;

	protected JSONObject userData;

	private Date sysDate;

	private EDIPara ediPara;

	@Override
	public void initTrxData(Object trxData) {
		if (scriptMgr == null) {
			scriptMgr = new ScriptManager(BEANNAME, this);
		}

		Assert.isTrue(JSONObject.class.isAssignableFrom(trxData.getClass()), "Currenttly doesn't support others data type but [JSONObject].");
		this.orgnData = (JSONObject) trxData;
		
		this.reqData = JsonUtil.clone((JSONObject) trxData);

		JSONObject reqJson = (JSONObject) this.reqData;

		commData = JsonHelper.getConnObject(reqJson);
		funcData = JsonHelper.getFuncObject(reqJson);
		userData = JsonHelper.getUserObject(reqJson);
		this.trxData = JsonHelper.getTrxObject(reqJson);

		sysDate = DateTimeUtil.getSysDate();
	}

	@Override
	public Object getTrxData() {
		return this.trxData;
	}

	@Override
	public void initTrxPara(Object trxPara) {
		ediPara = (EDIPara) trxPara;
	}

	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("edi", fileName));
		if (scriptFile.exists() && scriptFile.canRead()) {
			scriptMgr.exec(scriptFile);
		} else
			throw new IOException("File not found or cannt read.");
	}

	@Override
	public void executeJsContent(String jsContent) throws Exception {
		scriptMgr.exec(jsContent);
	}

	public void assignFunc(String funcId) throws Exception {
		if(StringUtil.isTrimEmpty(funcId)){
			throw new Exception("Assign Function failed, missing function id.");
		}
		//get real bu
		FunctionPara para = XMLParaParseHelper.parseFuncPara(funcId,"");
		
		funcData.put("sysFuncId", funcId);
		funcData.put("name", para.getName());
		funcData.put("funcType", para.getFunctype());
		funcData.put("module", para.getModule());
		funcData.put("sysEventTimes", 1);
		funcData.put("sysPageIndex", para.getPagesSize()-1);
	}
	
	public void setFunctionEventTimes(int event){
		funcData.put("sysEventTimes", event);
	}
	
	@Resource(name="refNoManager")
	IReferenceNo refNoGenerator;
	
	public String getRefNo(String refName,String bu) throws Exception{
		
		FuncDataObj object = new FuncDataObj();
		RefPara para = new RefPara();
		para.setBu(bu);
		para.setRefname(refName);
		object.setReqData((JSONObject) this.reqData);
		
		FuncDataObj retData = (FuncDataObj) refNoGenerator.generateNo(object);
		List listRef = (List) retData.getData().get(retData.getDoName());
		if(listRef!=null&&!listRef.isEmpty()){
			return (String) ((Map) listRef.get(0)).get("sysRefNo");
		}
		return "";
	}
}
