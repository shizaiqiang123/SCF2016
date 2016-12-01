package com.ut.scf.core.component.logic.impl.beans;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.ILogicComp;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

@Service("commManagerImpl")
public class ASECommManagerRecordBean implements ILogicComponent{
	protected FuncDataObj currentDataObj; // 当前请求的所有数据
	
	protected JSONObject currentReqData;// 当前请求的交易数据
	
	protected JSONObject trxData;// 当前请求的交易数据
	
	protected ApSessionContext context;// AP端 session 对象

	protected FunctionPara funcObj;// 当前Function 的参数对象
	
	protected PagePara pageObj;// 当前Function Page的参数对象

	protected final String OPERATE_TYPE_NAME= "_opTp";
	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		
		ILogicComp logicCompBean = getPorcessLogicBean(logicObj);
		
		logicObj.setReqData(trxData);
		
		return logicCompBean.postPendingData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		ILogicComp logicCompBean = getPorcessLogicBean(logicObj);
		
		logicObj.setReqData(trxData);
		
		return logicCompBean.postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		ILogicComp logicCompBean = getPorcessLogicBean(logicObj);
		
		logicObj.setReqData(trxData);
		
		return logicCompBean.postMasterData(logicObj);
	}
	
	protected ILogicComp getPorcessLogicBean(FuncDataObj logicObj) throws Exception{
		
		parseParameters(logicObj);
		
		String strOpTp = getOpTp();
		if(StringUtil.isTrimEmpty(strOpTp))
			throw new Exception("Missing operat type in Comm manager component.");
		
		String logicCompImpl = ComponentDefine.getDefinedComponent(strOpTp);
		
		if(StringUtil.isTrimEmpty(logicCompImpl))
			throw new Exception("Unknow operat type in Comm manager component:"+strOpTp);
		
		ILogicComp logicCompBean = ClassLoadHelper.getComponentClass(logicCompImpl);
		return logicCompBean;
	}
	
	public void parseParameters(FuncDataObj logicObj){
		currentDataObj = logicObj;
		context = ApSessionUtil.getContext();
		funcObj =  (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		pageObj =  (PagePara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT);
		currentReqData = currentDataObj.getReqData();
		trxData = JsonHelper.getTrxObject(currentReqData);
	}
	
	protected String getOpTp(){
		String strOpTp = trxData.containsKey(OPERATE_TYPE_NAME)?trxData.getString(OPERATE_TYPE_NAME):"";
		return strOpTp;
	}
	
	protected String getFunctionType(){
		String strFuncTp = trxData.containsKey("funcType")?trxData.getString("funcType"):"";
		return strFuncTp;
	}

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		parseParameters(logicObj);
		
		String strFuncTp = getFunctionType();
		if(StringUtil.isTrimEmpty(strFuncTp))
			 strFuncTp = context.getSysFuncType();
		logicObj.setFuncType(strFuncTp);
		if(ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(strFuncTp)){
			return postMasterData(logicObj);
		}else if(ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strFuncTp)){
			return postPendingData(logicObj);
		}else if(ComponentConst.COMP_FUNC_TYPE_PARAMETER.equalsIgnoreCase(strFuncTp)){
			return postMasterData(logicObj);
		}else{
			
		}
		
		return null;
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		return null;
	}

}
