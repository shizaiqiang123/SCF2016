package com.ut.scf.core.component;

import javax.annotation.Resource;

import org.slf4j.Logger;

import net.sf.json.JSONObject;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;

public abstract class AbsParaLogicManager implements ILogicComp{
	
	protected ApSessionContext context;// AP端 session 对象

	protected FunctionPara funcObj;// 当前Function 的参数对象
	
	protected PagePara pageObj;// 当前Function Page的参数对象

	protected LogicNode currrentLogicObj; // 当前逻辑流对象
	
	protected FuncDataObj currentDataObj; // 当前请求的所有数据
	
	protected JSONObject currentTrxData;
	
	protected String strParaId;
	
	protected String strParaPath;
	
	protected String strBu;
	
	@Resource(name = "serverNodeJs")
	protected IServerSideJs jsEngine;
	
	protected Logger getLogger() {
		return APLogUtil.getUserLogger();
	}

	protected void parseParameters(FuncDataObj logicObj) {
		currentDataObj = logicObj;
		context = ApSessionUtil.getContext();
		funcObj =  (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		pageObj =  (PagePara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT);
		currentTrxData = currentDataObj.getReqData();
		currrentLogicObj = (LogicNode) currentDataObj.getReqParaObj();
		strBu = context.getSysBusiUnit();
		
		this.strParaId = getParaId(currentTrxData);
		this.strParaPath =getParaPath(currrentLogicObj);
	}

	protected String getParaId(JSONObject currentTrxData) {
		if(currentTrxData.containsKey("id"))
			return currentTrxData.getString("id");
		return null;
	}
	
	protected String getParaPath(LogicNode currentTrxData) {
		return currrentLogicObj.getTablename();
	}
	
	protected String [] getTargetBus() {
		if(currentTrxData.containsKey("bu")){
			String targetBu = currentTrxData.getString("bu");
			if(StringUtil.isTrimNotEmpty(targetBu)){
				return targetBu.split(",");
			}
		}
		return new String[]{""};
	}
	
	protected JSONObject processLogicJs(JSONObject mappingData) throws Exception{
		String jsFile = currrentLogicObj.getNodejs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			jsEngine.initTrxData(mappingData);
//			jsEngine.initReqData(reqData);
			jsEngine.initTrxPara(currrentLogicObj);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
			
			mappingData= (JSONObject) jsEngine.getTrxData();
		}
		return mappingData;
	}

}
