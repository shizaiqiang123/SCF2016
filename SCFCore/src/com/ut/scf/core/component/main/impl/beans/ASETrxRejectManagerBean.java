package com.ut.scf.core.component.main.impl.beans;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.AbsTrxMainCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.IAutoRelease;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.INotification;
import com.ut.scf.core.component.IPendingComponent;
import com.ut.scf.core.component.IWorkFlow;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.utils.ClassLoadHelper;

@Service("aSETrxRejectManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxRejectManagerBean extends AbsTrxMainCompManager implements IPendingComponent{
	@Resource(name = "trxEditRecord")
	protected ILogicComponent trxEditRecord;
	
	@Override
	protected void parseParameters(Object paraDom) {
		super.parseParameters(paraDom);
		funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		Assert.isTrue(funcObj!=null, "Missing Release function Id. Please check catalog setting or DB data.");
		if(funcObj!=null)
			context.setSysFuncId(funcObj.getId());//更新在表里的Function id 不能是当前reject的id，而是原始Function的id。
	}
	
	@Override
	public void callOutputGeneration() {
		System.out.println(String.format("[%s] process output generate.", "aSETrxDelPendingManagerBean"));
	}

	@Override
	protected void resetEventTimes() {
		int event = context.getSysEventTimes();
		super.setStrCurrentEventTimes(event);
	}

	@Override
	protected FuncDataObj doProcessLogicFlow(ILogicComponent t, FuncDataObj dataObj) throws Exception {
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			return t.inqData(dataObj);
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			return t.postDeletePendingData(dataObj);
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

	@Resource(name="apWorkFlowProcessor")
	private IWorkFlow workFlowProcess;
	@Override
	public void callWorkflow(Object reqDom, Object resultDom) {
		if(workFlowProcess!=null)
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
		this.logicDataObj.setFuncType("DP");//pending manager
	}

	@Override
	protected void setTrxType() {
		this.context.setStrTrxStatus("P");//主表保持P状态
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
		String pageType = this.pagePara.getPagetype();
		if("RE".equalsIgnoreCase(pageType)){
			return LOCK_TABLE_NAME_N;
		}
		boolean isCascade = "Y".equalsIgnoreCase(super.pagePara.getCascadeevent());
		return isCascade?LOCK_TABLE_NAME_E:LOCK_TABLE_NAME_M;
	}

	@Override
	protected boolean isNeedLoackTransaction() {
		return false;
	}
	@Override
	protected void setUnlockDataObj(FuncDataObj dataObj) {
		JSONObject reqData = (JSONObject) dataObj.getReqData();
		int eventTimes = super.context.getSysEventTimes();
		reqData.put("sysEventTimes", eventTimes);
	}
	
	@Override
	protected void checkTransactionStatus(String strTrxType, String strTrxSts) throws Exception {
		String strFuncType = super.strFuncType;
		if (ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(strTrxType)) {
			if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(strFuncType)) {
				Assert.isTrue("P".equalsIgnoreCase(strTrxSts), "Current transaction is not in Pending, but :"+strTrxSts);
			}
			if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(strFuncType)) {
				Assert.isTrue("M".equalsIgnoreCase(strTrxSts), "Current transaction is not in Master, but :"+strTrxSts);
			}
		} else if (ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(strTrxType)) {
			Assert.isTrue("P".equalsIgnoreCase(strTrxSts)||"S".equalsIgnoreCase(strTrxSts), "Current transaction is not in Pending, but :"+strTrxSts);
		} else {
			
		}
	}

	@Override
	protected boolean isNeedQueryTransaction() {
		String strPageType = pagePara.getPagetype();
		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(strPageType)){
			String functType = super.strFuncType;
			return !ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(functType);
		}
		return true;
	}
	
	@Override
	protected void callLogic() throws Exception{
		Assert.isTrue(funcObj!=null);
		//DP 组件本身没有逻辑需要执行，直接调用上一页面组件逻辑
		//暂时执行dp组件，由fp组件执行
//		for (int i = this.context.getSysPageIndex()-1; i > -1; i--) {
//			PagePara pagePara = pageManager.getCurrentPage(i);
//			if (pagePara.isTransaction()) {
//				callPageLogic(pagePara);
////				callMainLogic(pagePara);
//			}
//		}
		callMainLogic(pagePara);
	}
	
	protected void callMainLogic(PagePara pagePara) throws Exception{
		if(!ComponentDefine.isDefinedComponent(pagePara.getPagetype())){
			return ;
		}
//		FuncDataObj dataObj = new FuncDataObj();
//		dataObj.setFuncType( this.logicDataObj.getFuncyTpe());
//		dataObj.setReqData(this.logicDataObj.getReqData());
//		
//		LogicNode mainLogic = new LogicNode();
//		mainLogic.setTablename(pagePara.getMaintable());
//		mainLogic.setCascadeevent(pagePara.getCascadeevent());
//		mainLogic.setDoname( pagePara.getDoname());
//		mainLogic.setNodejs(pagePara.getPagejs());
//		mainLogic.setType("E");
//
//		dataObj.setReqParaObj(mainLogic);
//		String component =ComponentDefine.getDefinedComponent(pagePara.getPagetype());
//		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor(component );
//		
//		FuncDataObj processResult=doProcessLogicFlow(t, dataObj);
//		if (hasThrowableError(processResult)) {
//			throw new SCFThrowableException("");
//		}
//		logicDataObj.mergeResponse(processResult);
		
		// 仅更新主表信息，将审批意见更新至主表
		// update Event to P
		// update reason to Event
//		logicDataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(this.logicDataObj.getReqData());
		logicDataObj.setReqData(trxData);

		PagePara mainPagePara =pageManager.getMainPage();
		
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename(mainPagePara.getMaintable());
//		mainLogic.setFields("sysRelReason");
		mainLogic.setTablename(mainPagePara.getMaintable());
		mainLogic.setCascadeevent(mainPagePara.getCascadeevent());
		mainLogic.setDoname( mainPagePara.getDoname());
		mainLogic.setNodejs(mainPagePara.getPagejs());
		
		logicDataObj.setReqParaObj(mainLogic);
		
		logicDataObj.setFuncType("RJ");
	
		this.context.setStrTrxStatus("S");
		FuncDataObj obj = trxEditRecord.postData(logicDataObj);
		
		logicDataObj.mergeResponse(obj);
//		daoHelper.execUpdate(obj);	
		
//		this.unLockTransaction(mainPagePara.getMaintable());

//		Object response = logicDataObj.buildReturnRespose();
	}
	
	@Override
	protected boolean checkFuncService(ServicePara service) {
		//RJ 组件，发送配置为R状态的服务
		return "R".equalsIgnoreCase(service.getTrigger());
	}
}
