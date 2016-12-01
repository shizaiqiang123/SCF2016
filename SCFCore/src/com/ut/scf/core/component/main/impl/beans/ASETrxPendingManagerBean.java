package com.ut.scf.core.component.main.impl.beans;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.func.AssignFunction;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.AbsTrxMainCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IAutoRelease;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.INotification;
import com.ut.scf.core.component.IPendingComponent;
import com.ut.scf.core.data.FuncDataObj;

@Service("aSETrxPendingManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxPendingManagerBean extends AbsTrxMainCompManager implements IPendingComponent{
	@Override
	public void callOutputGeneration() {
		try {
			reportManager.submitData(reqData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		logger.debug(String.format("[%s] process output generate.", "ASETrxPendingManagerBean"));
	}

//	@Override
//	public void callLogicFlow() throws SCFThrowableException{
//		logger.debug(String.format("[%s] process logic flow.", "ASETrxPendingManagerBean"));
//		super.callLogicFlow();
//	}

	@Override
	protected void resetEventTimes() {
		int event = context.getSysEventTimes();
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			//查询时event不动
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			//提交数据时，自动增加 1
			event ++;
			//多页面情况，Event 不能因为通功能页面提交而增加
			//修改为多页面一次提交数据，所以不需要减交易页面序列了
//			event-=context.getSysTrxPageIndex();
		}else{
			//其他情况暂时忽略
		}
		super.setStrCurrentEventTimes(event);
	}

	@Override
	protected FuncDataObj doProcessLogicFlow(ILogicComponent t, FuncDataObj dataObj) throws Exception {
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			return t.inqData(dataObj);
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			dataObj.setFuncType(ComponentConst.COMP_FUNC_TYPE_PENDING);
			return t.postData(dataObj);
		}else{
			return null;
		}
	}

	@Resource(name="apAutoReleaseProcessor")
	private IAutoRelease autoReleaseProcess;
	@Override
	public void autoRelease(Object reqDom, Object resultDom) {
		if(autoReleaseProcess!=null)
			autoReleaseProcess.autoRelease(reqDom, resultDom);
	}

	@Override
	public void callWorkflow(Object reqDom, Object resultDom) {
		workFlowProcess.callWorkflow(reqDom, resultDom);
	}

	@Resource(name="apNotificationProcessor")
	private INotification notificationProcess;
	@Override
	public void sendNoditfication(Object reqDom, Object resultDom) {
		if(notificationProcess!=null)
			notificationProcess.sendNoditfication(reqDom, resultDom);
	}

	@Override
	public void rollbackOutput() {
		
	}

	@Override
	protected void setFuncType() {
		this.logicDataObj.setFuncType("PM");//pending manager
	}

	@Override
	protected void setTrxType() {
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			this.context.setStrTrxStatus("M");
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			this.context.setStrTrxStatus("P");
		}else{//cancel
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
		JSONObject funcJson = JsonHelper.getFuncObject(reqData);
		int index = funcJson.getInt("sysPageIndex");
		PagePara pagePara = pageManager.getCurrentPage(index);
		
		boolean isCascade = "Y".equalsIgnoreCase(pagePara.getCascadeevent());
		return LOCK_TABLE_NAME_M;
	}

	@Override
	protected boolean isNeedLoackTransaction() {
		String strPageType = pagePara.getPagetype();
		String strFuncType = this.funcObj.getFunctype();
		if("VH".equalsIgnoreCase(strFuncType)){
			return false;
		}
		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(strPageType)){
			String functType = this.funcObj.getFunctype();
			return ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(functType);
		}
		
		return true;
	}
	@Override
	protected void setUnlockDataObj(FuncDataObj dataObj) {
		JSONObject reqData = (JSONObject) dataObj.getReqData();
		int eventTimes = super.context.getSysEventTimes();
		
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			//查询时event不动
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			//提交数据时，自动减1
			eventTimes --;
		}else{
			//其他情况暂时忽略
		}
		reqData.put("sysEventTimes", eventTimes);
	}
	
	@Override
	protected void checkTransactionStatus(String strTrxType, String strTrxSts) throws Exception {
		String strFuncType = this.funcObj.getFunctype();
		if (ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(strTrxType)) {
			if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strFuncType)) {
				Assert.isTrue("P".equalsIgnoreCase(strTrxSts), "Current transaction is not in Pending, but :"+strTrxSts);
			}
			if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strFuncType)) {
				Assert.isTrue("M".equalsIgnoreCase(strTrxSts), "Current transaction is not in Master, but :"+strTrxSts);
			}
		} else if (ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(strTrxType)) {
			if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strFuncType)) {
				Assert.isTrue("P".equalsIgnoreCase(strTrxSts), "Current transaction is not in Pending, but :"+strTrxSts);
			}
			if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strFuncType)) {
				Assert.isTrue("M".equalsIgnoreCase(strTrxSts), "Current transaction is not in Master, but :"+strTrxSts);
			}
		} else {
			
		}
	}

	@Override
	protected boolean isNeedQueryTransaction() {
		String strPageType = pagePara.getPagetype();
		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(strPageType)){
			String functType = this.funcObj.getFunctype();
			return !ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(functType);
		}
		return true;
	}
	
	protected void generateRefNumber() throws Exception {
		String strFuncType = super.funcObj.getFunctype();
		if("PM".equalsIgnoreCase(strFuncType)){
			super.generateRefNumber();
		}
		return;
	}
	
	protected void releaseRefNumber() {
		String strFuncType = super.funcObj.getFunctype();
		if("PM".equalsIgnoreCase(strFuncType)){
			super.releaseRefNumber();
		}
		return;
	}
	
	protected void cancelRefNumber() {
		String strFuncType = super.funcObj.getFunctype();
		if("PM".equalsIgnoreCase(strFuncType)){
			super.cancelRefNumber();
		}
		return;
	}
	
	protected void cancelTempData() {
		String strFuncType = super.funcObj.getFunctype();
		if("PM".equalsIgnoreCase(strFuncType)){
			super.cancelTempData();
		}
		return;
	}

//	@Override
//	protected FuncDataObj doProcessService(IServiceComponent t, FuncDataObj dataObj) throws Exception {
//		String trxType = super.context.getStrTrxType();
//		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
////			return t.inqData(dataObj);
//			throw new Exception("Cannot run inqData on main component.");
//		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
//			dataObj.setFuncType(ComponentConst.COMP_FUNC_TYPE_PENDING);
//			return t.postPendingData(dataObj);
//		}else{
//			return null;
//		}
//	}
	
	protected boolean checkAssignFunc(AssignFunction assignFunc) {
		String type = assignFunc.getType();
		return "P".equalsIgnoreCase(type);
	}
	
	@Override
	protected boolean checkFuncService(ServicePara service) {
		//PM 组件，发送配置为P状态的服务
		return "P".equalsIgnoreCase(service.getTrigger());
	}
}
