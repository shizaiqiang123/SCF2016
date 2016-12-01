package com.ut.scf.core.component.main.impl.beans;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.func.AssignFunction;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.AbsTrxMainCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.IReComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("trxReleaseManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxReleaseManagerBean extends AbsTrxMainCompManager implements
		IReComponent {
	

	@Resource(name = "trxEditRecord")
	protected ILogicComponent trxEditRecord;
	
	@Resource(name = "trxDeleteRecord")
	protected ILogicComponent trxDeleteRecord;
	
	@Resource(name="trxDelPendingManager")
	protected IMainComponent deletePendingManager;

	@Resource(name="trxRejectManager")
	protected IMainComponent rejectManager;
	@Override
	public Object submitData(Object paraDom) throws Exception {
		JSONObject dataDom = (JSONObject) paraDom;
		parseParameters(paraDom);
		
		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);
		int pageIndex = this.context.getSysTrxPageIndex();
		if (trxDom.containsKey("p" + pageIndex)) {
			trxDom = JsonUtil.getChildJson(trxDom, "p" + pageIndex);
		}
		Object result = trxDom.get("isAgree");
		String strResult = result == null ? "" : result.toString();
		if ("Y".equalsIgnoreCase(strResult)) {
			// update Event to M
			// add Master M
			return super.submitData(paraDom);
		} else if ("N".equalsIgnoreCase(strResult)) {
			// 仅更新主表信息，将审批意见更新至主表
			// update Event to P
			// update reason to Event
//			logicDataObj = new FuncDataObj();
//			JSONObject trxData = JsonHelper.getTrxObject(dataDom);
//			logicDataObj.setReqData(trxData);
//			context = ApSessionUtil.getContext();
//			funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
//
//			PagePara mainPagePara =pageManager.getMainPage();
//			
//			LogicNode mainLogic = new LogicNode();
//			mainLogic.setTablename(getStrLockTable(mainPagePara.getMaintable()));
//			
//			logicDataObj.setReqParaObj(mainLogic);
//			
//			logicDataObj.setFuncType("RE");
//		
//			this.context.setStrTrxStatus("P");
//			FuncDataObj obj = trxEditRecord.postData(logicDataObj);
//			daoHelper.execUpdate(obj);	
//			
//			this.unLockTransaction(mainPagePara.getMaintable());
//
//			Object response = logicDataObj.buildReturnRespose();
//			return response;
//			return deletePendingManager.submitData(paraDom);
			//拒绝后不做任何处理，保持原数据，由工作流推送到申请人流程中，重新发起交易
			return rejectManager.submitData(paraDom);
		} else {
			// delete pending in Event
			logicDataObj = new FuncDataObj();
			JSONObject trxData = JsonHelper.getTrxObject(dataDom);
			logicDataObj.setReqData(trxData);

			context = ApSessionUtil.getContext();
			funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);

			LogicNode mainLogic = new LogicNode();
			mainLogic.setTablename(getStrLockTable(this.pagePara.getMaintable()));
			logicDataObj.setReqParaObj(mainLogic);
			this.context.setStrTrxStatus("P");

			trxDeleteRecord.postData(logicDataObj);

			// this.unLockTransaction(this.pagePara.getMaintable());

			Object response = logicDataObj.buildReturnRespose();
			return response;
		}
	}

	@Override
	protected void parseParameters(Object paraDom) {
		super.parseParameters(paraDom);
		funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		Assert.isTrue(funcObj!=null, "Missing Release function Id. Please check catalog setting or DB data.");
		if(funcObj!=null){
			context.setSysFuncId(funcObj.getId());//更新在表里的Function id 不能是当前release的id，而是原始Function的id。
		}
	}

	@Override
	public void callWorkflow(Object reqDom, Object resultDom) {
		workFlowProcess.callWorkflow(reqDom, resultDom);
	}

	@Override
	public void sendNoditfication(Object reqDom, Object resultDom) {

	}

//	@Override
//	protected void callOutputGeneration() {
//
//	}

	@Override
	protected void resetEventTimes() {
		this.setStrCurrentEventTimes(context.getSysEventTimes());
	}

	@Override
	protected FuncDataObj doProcessLogicFlow(ILogicComponent t, FuncDataObj dataObj) throws Exception {
		String trxType = super.context.getStrTrxType();
		dataObj.setFuncType(ComponentConst.COMP_FUNC_TYPE_RELEASE);
		if (ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)) {
			return t.inqData(dataObj);
		} else if (ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)) {
			return t.releaseData(dataObj);
		} else {
			return null;
		}
	}

	@Override
	protected void setFuncType() {
		this.logicDataObj.setFuncType("RE");// release manager
	}

	@Override
	protected void setTrxType() {
		String trxType = super.context.getStrTrxType();
		if (ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)) {
			this.context.setStrTrxStatus("P");
		} else if (ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)) {
			this.context.setStrTrxStatus("M");
		} else {
			this.context.setStrTrxStatus("P");
		}
	}

	@Override
	protected void checkQueryResult() throws Exception {
		Object objData = logicDataObj.get(logicDataObj.getDoName());
		if (List.class.isAssignableFrom(objData.getClass())) {
			//一般非分页查询都是返回List对象
			List<Object> entityList = (List<Object>) objData;
			if(!entityList.isEmpty()){
				Map retData = (Map) entityList.get(0);
				retData.put("isValidCode", funcObj.getIsValidCode());
			}
		}
	}
		
	@Override
	public String setStrLockTable() {
		String pageType = this.pagePara.getPagetype();
		if("RE".equalsIgnoreCase(pageType)){
			return LOCK_TABLE_NAME_N;
		}
		String  cascade=this.pagePara.getCascadeevent();
//		String  cascade=this.pageManager.getMainPage().getCascadeevent();
		if("Y".equalsIgnoreCase(cascade)){
			
			return LOCK_TABLE_NAME_E;
		}else{
			return LOCK_TABLE_NAME_M;
		}
	}

	@Override
	protected boolean isNeedLoackTransaction() {
		return true;
	}

	@Override
	protected void checkTransactionStatus(String strTrxType, String strTrxSts) throws Exception {
		if (ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(strTrxType)) {
			if(!"p".equalsIgnoreCase(strTrxSts)){
				throw new Exception("Current transaction is not in Pending but :"+strTrxSts);
			}
		} else if (ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(strTrxType)) {
			if(!"P".equalsIgnoreCase(strTrxSts)){
				throw new Exception("Current transaction is not in Master but :"+strTrxSts);
			}
		} else {
			
		}
	}
	
	protected void callLogic() throws Exception{
		Assert.isTrue(funcObj!=null);
		Object result = trxData.get("isAgree");
		String strResult = result==null?"N":result.toString();
		this.context.setIsAgree(strResult);
		//Release 组件本身没有逻辑需要执行，直接调用上一页面组件逻辑
		for (int i = this.context.getSysPageIndex()-1; i > -1; i--) {
			PagePara pagePara = pageManager.getCurrentPage(i);
			if (pagePara.isTransaction()) {
				callPageLogic(pagePara);
				callMainLogic(pagePara);
			}
		}
	}
	
	@Override
	protected boolean isNeedQueryTransaction() {
		return true;
	}
	
	protected void generateRefNumber() throws Exception {
		return;
	}
	
	protected void releaseRefNumber() {
		return;
	}
	
	protected void cancelRefNumber() {
		return;
	}

//	@Override
//	protected FuncDataObj doProcessService(IServiceComponent t, FuncDataObj dataObj) throws Exception {
//		String trxType = super.context.getStrTrxType();
//		dataObj.setFuncType(ComponentConst.COMP_FUNC_TYPE_RELEASE);
//		if (ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)) {
////			return t.inqData(dataObj);
//			throw new Exception("Cannot run inqData on main component.");
//		} else if (ComponentConst.COMP_TRX_TYPE_SUBMIT
//				.equalsIgnoreCase(trxType)) {
//			return t.postReleaseData(dataObj);
//		} else {
//			return null;
//		}
//	}
	
	protected boolean checkAssignFunc(AssignFunction assignFunc) {
		String type = assignFunc.getType();
		return "M".equalsIgnoreCase(type)&&"Y".equalsIgnoreCase(this.context.getIsAgree());
	}
	
	@Override
	protected boolean checkFuncService(ServicePara service) {
		//RE 组件，发送配置为M状态的服务,并且是审核通过才发送
		return "M".equalsIgnoreCase(service.getTrigger())&&"Y".equalsIgnoreCase(this.context.getIsAgree());
	}
}
