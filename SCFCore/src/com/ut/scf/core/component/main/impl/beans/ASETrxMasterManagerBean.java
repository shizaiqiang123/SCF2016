package com.ut.scf.core.component.main.impl.beans;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.xml.func.AssignFunction;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.AbsTrxMainCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMasterComponent;
import com.ut.scf.core.data.FuncDataObj;

@Service("aSETrxMasterManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxMasterManagerBean extends AbsTrxMainCompManager implements IMasterComponent{

	@Override
	public void callOutputGeneration() {
		System.out.println(String.format("[%s] process rollback Outgoing.", ASETrxMasterManagerBean.class.getName()));						
	}

	@Override
	public void rollbackOutput() {
		System.out.println(String.format("[%s] process rollback Output.", ASETrxMasterManagerBean.class.getName()));						
	}

	@Override
	protected void resetEventTimes() {
		System.out.println(String.format("[%s] process reset Event Times.", ASETrxMasterManagerBean.class.getName()));	
		int event = context.getSysEventTimes();
//		String trxType = super.context.getStrTrxType();
//		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
//			//查询时event不动
//		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
//			//提交数据时，自动增加 1
//			event ++;
//			//多页面情况，Event 不能因为通功能页面提交而增加
//			event-=context.getSysTrxPageIndex();
//		}else{
//			//其他情况暂时忽略
//		}

		super.setStrCurrentEventTimes(event);
	}

	@Override
	protected FuncDataObj doProcessLogicFlow(ILogicComponent t, FuncDataObj dataObj) throws Exception {
		System.out.println(String.format("[%s] process logic flow.", ASETrxMasterManagerBean.class.getName()));
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			return t.inqData(dataObj);
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			return t.postData(dataObj);
		}else{
			return null;
		}
	}

//	@Override
//	protected Document doProcessService(IBusinessComponent t) throws Exception {
//		System.out.println(String.format("[%s] process services.", ASETrxMasterManagerBean.class.getName()));				
//		return t.getDataMaster(this.requestDom);
//	}

	@Override
//	public void callWorkflow(Object reqDom, Object resultDom) {
//		System.out.println(String.format("[%s] process call Workflow.", ASETrxMasterManagerBean.class.getName()));				
//	}
	public void callWorkflow(Object reqDom, Object resultDom) {
		workFlowProcess.callWorkflow(reqDom, resultDom);
	}

	@Override
	public void sendNoditfication(Object reqDom, Object resultDom) {
		System.out.println(String.format("[%s] process send Noditfication.", ASETrxMasterManagerBean.class.getName()));						
	}

	@Override
	protected void setFuncType() {
		this.logicDataObj.setFuncType(ComponentConst.COMP_FUNC_TYPE_MASTER);//master manager
	}

	@Override
	protected void setTrxType() {
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			this.context.setStrTrxStatus("M");
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			this.context.setStrTrxStatus("M");
		}else{
			this.context.setStrTrxStatus("M");
		}
	}

	@Override
	protected void checkQueryResult() throws Exception {
		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(this.pagePara.getPagetype())){
			return;
		}
		if(!logicDataObj.hasRecord()){
			logicDataObj.setRetStatus(FuncDataObj.FAILED);
			logicDataObj.appendRetInfo("Cannot load transaction data. please check work flow.");
		}
	}
	
	@Override
	public String setStrLockTable() {
		boolean isCascade = "Y".equalsIgnoreCase(super.pagePara.getCascadeevent());
		return isCascade?LOCK_TABLE_NAME_E:LOCK_TABLE_NAME_M;
	}

	@Override
	protected boolean isNeedLoackTransaction() {
		String strFunctionType = pagePara.getPagetype();
		String strFuncType = this.funcObj.getFunctype();
		if("VH".equalsIgnoreCase(strFuncType)){
			return false;
		}
		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(strFunctionType))
			return false;
		return true;
	}
	
	protected void setUnlockDataObj(FuncDataObj dataObj) {
		JSONObject reqData = (JSONObject) dataObj.getReqData();
		int eventTimes = super.context.getSysEventTimes();
		
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			//查询时event不动
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			//提交数据时，自动减 1
			eventTimes --;
		}else{
			//其他情况暂时忽略
		}
		reqData.put("sysEventTimes", eventTimes);
	}
	
	@Override
	protected void checkTransactionStatus(String strTrxType, String strTrxSts) throws Exception {
		if (ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(strTrxType)) {
			if(!"M".equalsIgnoreCase(strTrxSts)){
				throw new Exception("Current transaction is not in Master but :"+strTrxSts);
			}
		} else if (ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(strTrxType)) {
			if(!"M".equalsIgnoreCase(strTrxSts)){
				throw new Exception("Current transaction is not in Master but :"+strTrxSts);
			}
		} else {
			
		}
	}

	@Override
	protected boolean isNeedQueryTransaction() {
		String strFunctionType = pagePara.getPagetype();
		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(strFunctionType))
			return false;
		return true;
	}
	
	protected void generateRefNumber() throws Exception {
		String strFuncType = super.funcObj.getFunctype();
		if("MM".equalsIgnoreCase(strFuncType)){
			super.generateRefNumber();
		}
		return;
	}
	
	protected void releaseRefNumber() {
		String strFuncType = super.funcObj.getFunctype();
		if("MM".equalsIgnoreCase(strFuncType)){
			super.releaseRefNumber();
		}
		return;
	}
	
	protected void cancelRefNumber() {
		String strFuncType = super.funcObj.getFunctype();
		if("MM".equalsIgnoreCase(strFuncType)){
			super.cancelRefNumber();
		}
		return;
	}

//	@Override
//	protected FuncDataObj doProcessService(IServiceComponent t, FuncDataObj dataObj) throws Exception {
//		String trxType = super.context.getStrTrxType();
//		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
//			//return t.inqData(dataObj);
//			throw new Exception("Cannot run inqData on main component.");
//		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
//			return t.postMasterData(dataObj);
//		}else{
//			return null;
//		}
//	}
	
	protected boolean checkAssignFunc(AssignFunction assignFunc) {
		String type = assignFunc.getType();
		return "M".equalsIgnoreCase(type);
	}
	
	@Override
	protected boolean checkFuncService(ServicePara service) {
		//MM 组件，发送配置为M状态的服务
		return "M".equalsIgnoreCase(service.getTrigger());
	}
}
