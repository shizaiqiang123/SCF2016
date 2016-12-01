package com.ut.scf.core.component;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;

public abstract class AbsMainCompManager implements IMainComponent {

	protected String functionID;

	protected FunctionPara funcObj;
	
	protected PagePara pagePara;

	protected ApSessionContext context;// 当前交易基本信息
	
	protected JSONObject trxData;
	
	protected JSONObject reqData;

//	protected FuncServiceDataObj serviceData;
	
	protected FuncDataObj logicDataObj;
	
	protected Logger logger = LoggerFactory.getLogger(this.getClass());
	
	protected String strFuncType;

	@Resource(name = "logicFactory")
	ILogicFactory logicFactory ;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	
	@Resource(name = "aSETrxPageManagerBean")
	protected IGetPage pageManager;
	
	@Resource(name="apAutoReleaseProcessor")
	IAutoRelease aotuAssignProcessor;
	

	protected Logger getLogger() {
		return APLogUtil.getUserLogger();
	}
	
	protected void parseParameters(Object paraDom) {
		reqData = (JSONObject) paraDom;
		trxData = JsonHelper.getTrxObject((JSONObject) paraDom);
		this.context = ApSessionUtil.getContext();
		pagePara = pageManager.getCurrentPage(this.context.getSysPageIndex());
		funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		functionID = funcObj.getId();
		context.setSysFuncId(functionID);
		
		logicDataObj = new FuncDataObj();
		logicDataObj.setReqData(trxData);
		JSONObject funcJson = JsonHelper.getFuncObject(reqData);
		strFuncType = funcJson.containsKey("funcType")?funcJson.getString("funcType"):funcObj.getFunctype();
	}
	
	protected void clearRequestData() {
		logicDataObj.setReqData(null);
		logicDataObj.setReqParaObj(null);
		logicDataObj.clearEntity();
	}

	protected boolean hasThrowableError(FuncDataObj processResult) {
		if (processResult == null)
			return false;
		String strResult = processResult.getRetStatus();
		return ComponentConst.BUSI_COMP_RESULT_VALUE_EXCEPTION.equalsIgnoreCase(strResult);
	}
	
	protected IMainComponent getMainComponent(JSONObject dataDom,PagePara pagePara) throws Exception{
		JSONObject funcOj = JsonHelper.getFuncObject(dataDom);
		String compClass = "";
		if(!pagePara.isTransaction()){
			compClass = pagePara.getMaincomp();
		}else if (ComponentDefine.isDefinedServiceComponent(pagePara.getPagetype())){
			compClass = pagePara.getMaincomp();
			if(StringUtil.isTrimEmpty(compClass))
				compClass =  ComponentDefine.getDefinedServiceComponent(pagePara.getMaincomp());
		}else if(funcOj.containsKey("funcType")&&ComponentDefine.isDefinedComponent(funcOj.getString("funcType"))){
			compClass =  ComponentDefine.getDefinedComponent(funcOj.getString("funcType"));
		}else if(StringUtil.isNotEmpty(pagePara.getMaincomp())){
			compClass = pagePara.getMaincomp();
		}else{
		}
		
		return ClassLoadHelper.getMainComponetProcessor(compClass);
	}
}
