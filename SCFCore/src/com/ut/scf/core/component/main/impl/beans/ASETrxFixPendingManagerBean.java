package com.ut.scf.core.component.main.impl.beans;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.AbsTrxMainCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IAutoRelease;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.INotification;
import com.ut.scf.core.component.IPendingComponent;
import com.ut.scf.core.component.IWorkFlow;
import com.ut.scf.core.data.FuncDataObj;

@Service("aSETrxFixPendingManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxFixPendingManagerBean extends AbsTrxMainCompManager implements IPendingComponent{
	
	@Resource(name="trxRejectManager")
	protected IMainComponent rejectManager;
	
	@Resource(name="trxDelPendingManager")
	protected IMainComponent deletePendingManager;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		//DP组件：先delete pending 后  pending
		try{
			JSONObject rejectData = JsonUtil.clone((JSONObject) paraDom);
					
			deletePendingManager.submitData(rejectData);
		}catch(Exception e){
			getLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
		
		return super.submitData(paraDom); 
	}
	
	
	@Override
	public void callOutputGeneration() {
		System.out.println(String.format("[%s] process output generate.", "aSETrxFixPendingManagerBean"));
	}

//	@Override
//	public void callLogicFlow() throws SCFThrowableException{
//		System.out.println(String.format("[%s] process logic flow.", "aSETrxFixPendingManagerBean"));
//		super.callLogicFlow();
//	}

	@Override
	protected void resetEventTimes() {
		int event = context.getSysEventTimes();
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			//查询时event不动
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			//提交数据时，由于修改的是在途数据，所以event不变
			//event ++;
			//多页面情况，Event 不能因为通功能页面提交而增加
			//修改为多页面一次提交数据，所以不需要减交易页面序列了
//			event-=context.getSysTrxPageIndex();
		}else{
			//其他情况暂时忽略
		}
		super.setStrCurrentEventTimes(event);
	}
	
	@Override
	protected void parseParameters(Object paraDom) {
		super.parseParameters(paraDom);
		funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		Assert.isTrue(funcObj!=null, "Missing Release function Id. Please check catalog setting or DB data.");
		if(funcObj!=null)
			context.setSysFuncId(funcObj.getId());//更新在表里的Function id 不能是当前release的id，而是原始Function的id。
	}
	

	@Override
	protected FuncDataObj doProcessLogicFlow(ILogicComponent t, FuncDataObj dataObj) throws Exception {
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			return t.inqData(dataObj);
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			//dataObj.setFuncType(ComponentConst.COMP_FUNC_TYPE_PENDING);
			return t.postPendingData(dataObj);
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

//	@Override
//	public void rollbackLogicFlow() {
//		
//	}

	@Override
	public void rollbackOutput() {
		
	}

	@Override
	protected void setFuncType() {
		this.logicDataObj.setFuncType("FP");//pending manager
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
//		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(this.pagePara.getPagetype())){
//			return;
//		}
		String pageType = this.pagePara.getPagetype();
		if("FP".equalsIgnoreCase(pageType)){
			Object objData = logicDataObj.get(logicDataObj.getDoName());
			if (List.class.isAssignableFrom(objData.getClass())) {
				//一般非分页查询都是返回List对象
				List<Object> entityList = (List<Object>) objData;
				if(!entityList.isEmpty()){
					Map retData = (Map) entityList.get(0);
					retData.put("isValidCode", funcObj.getIsValidCode());
				}
			}
			return;
		}
		if(!logicDataObj.hasRecord()){
			logicDataObj.setRetStatus(FuncDataObj.FAILED);
			logicDataObj.appendRetInfo("Cannot load transaction data. please check work flow.");
		}else{
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
	}

	@Override
	public String setStrLockTable() {
		String pageType = this.pagePara.getPagetype();
		if("FP".equalsIgnoreCase(pageType)){
			return LOCK_TABLE_NAME_N;
		}
		boolean isCascade = "Y".equalsIgnoreCase(super.pagePara.getCascadeevent());
		return isCascade?LOCK_TABLE_NAME_E:LOCK_TABLE_NAME_M;
	}

	@Override
	protected boolean isNeedLoackTransaction() {
		String strPageType = pagePara.getPagetype();
		String functType = this.logicDataObj.getFuncType();
		if("VH".equalsIgnoreCase(strFuncType)){
			return false;
		}
		if("FP".equalsIgnoreCase(strFuncType)){
			return true;
		}
		if(ComponentConst.COMP_PAGE_TYPE_ADD.equalsIgnoreCase(strPageType)){
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
		String strFuncType = super.strFuncType;
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
			String functType = super.strFuncType;
			return !ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(functType);
		}
		return true;
	}
	
	protected void generateRefNumber() throws Exception {
		String strFuncType = super.strFuncType;
		if("PM".equalsIgnoreCase(strFuncType)){
			super.generateRefNumber();
		}
		return;
	}
	
	protected void releaseRefNumber() {
		String strFuncType =super.strFuncType;
		if("PM".equalsIgnoreCase(strFuncType)){
			super.releaseRefNumber();
		}
		return;
	}
	
	protected void cancelRefNumber() {
		String strFuncType =super.strFuncType;
		if("PM".equalsIgnoreCase(strFuncType)){
			super.cancelRefNumber();
		}
		return;
	}
	
	protected void cancelTempData() {
		String strFuncType =super.strFuncType;
		if("PM".equalsIgnoreCase(strFuncType)){
			super.cancelTempData();
		}
		return;
	}
	
	protected void callLogic() throws Exception{
		Assert.isTrue(funcObj!=null);
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
	protected boolean checkFuncService(ServicePara service) {
		//FP 组件，发送配置为P状态的服务
		return "P".equalsIgnoreCase(service.getTrigger());
	}
}
