package com.ut.scf.core.component.main.impl.beans;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.ref.RefPara;
import com.ut.scf.core.component.AbsMainCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.ILogicComp;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ClassLoadHelper;

@Component("paraManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASEParameterManager extends AbsMainCompManager{

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	private final String strParaQueryImpl = "paraQuery";
	
	@Resource(name="refNoManager")  
	IReferenceNo refNoManager;
	
	@Resource(name = "paraLock")
	private ILogicComp paraLocker;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		
		parseParameters(paraDom);
		
		context.setStrTrxStatus("M");
		
		callLogic();
		
		daoHelper.execUpdate(logicDataObj);
		
		unLockParameter();
		
		releaseRefNumber();
		
		Object response = logicDataObj.buildReturnRespose();
		
		clearRequestData();
		
		return response;
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		
		parseParameters(paraDom);
		
		FuncDataObj mainFile = queryUnLockFile();
		
		if(mainFile.hasRecord()){
			lockParameter(mainFile.getReturnObj());
		}
		
		Object response = mainFile.buildReturnRespose();
		
		clearRequestData();
		
		return response;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		
		parseParameters(paraDom);
		
		return cancelAll();
	}
	
	private FuncDataObj queryUnLockFile() {
		PagePara currentPagePara = pageManager.getMainPage();
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		QueryNode fileQuery = new QueryNode();
		fileQuery.setType("C");
		fileQuery.setTablename(currentPagePara.getMaintable());//参数路径名（如/para/%bu%/batch）
		fileQuery.setComponent(strParaQueryImpl);//
		dataObj.setReqParaObj(fileQuery);
		FuncDataObj mainRecord = queryFactory.getProcessor(fileQuery).queryData(dataObj);
		return mainRecord;
	}

	protected void callLogic() throws Exception{
		Assert.isTrue(funcObj!=null);
		for (int i = this.context.getSysPageIndex(); i > -1; i--) {
			PagePara pagePara = pageManager.getCurrentPage(i);
			if (pagePara.isTransaction()) {
				callPrePageLogic(pagePara);
				callPrePageMainLogic(pagePara);
			}
		}
	}
	
	public void callPrePageLogic(PagePara pagePara) throws Exception {
		if (StringUtil.isTrimEmpty(pagePara.getLogicid())) {
			return;
		}
		LogicFlowPara logicFlows =  XMLParaParseHelper.parseFuncLogicFlow(pagePara.getLogicid(),super.context.getSysBusiUnit());
		for (int i = 0, len = logicFlows.getNodeSize(); i < len; i++) {
			LogicNode logicFlow = logicFlows.getLnode(i);
			String component = logicFlow.getComponent();
			ILogicComp t = null;
			try {
				FuncDataObj dataObj = new FuncDataObj();
				dataObj.setFuncType( this.logicDataObj.getFuncType());
				dataObj.setReqParaObj(logicFlow);
				t = ClassLoadHelper.getComponentClass(component);
				dataObj.setReqData(this.logicDataObj.getReqData());
				FuncDataObj processResult=t.postMasterData(dataObj);
				if (hasThrowableError(processResult)) {
					throw new SCFThrowableException(processResult.getRetInfo());
				}
				logicDataObj.mergeResponse(processResult);
			} catch (SCFThrowableException se) {
				throw se;
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}
		}
	}
	
	protected void callPrePageMainLogic(PagePara pagePara) throws Exception{
		if(!ComponentDefine.isDefinedComponent(pagePara.getPagetype())){
			return ;
		}
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setFuncType( this.logicDataObj.getFuncType());
		dataObj.setReqData(this.logicDataObj.getReqData());
		
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename(pagePara.getMaintable());
		mainLogic.setCascadeevent(pagePara.getCascadeevent());
		mainLogic.setDoname( pagePara.getDoname());
		mainLogic.setNodejs(pagePara.getPagejs());
		mainLogic.setType("E");

		dataObj.setReqParaObj(mainLogic);
		String component =ComponentDefine.getDefinedComponent(pagePara.getPagetype());
		ILogicComp t = ClassLoadHelper.getComponentClass(component);
		
		FuncDataObj processResult=t.postMasterData(dataObj);
		if (hasThrowableError(processResult)) {
			throw new SCFThrowableException(processResult.getRetInfo());
		}
		logicDataObj.mergeResponse(processResult);
	}
	
	public Object cancelAll() throws Exception {
		JSONObject funcJson = JsonHelper.getFuncObject(reqData);
		int index = funcJson.getInt("sysPageIndex");
		PagePara pagePara = pageManager.getCurrentPage(index);
		
		cancelRefNumber();
		
		unLockParameter();
		
		logicDataObj.buildRespose();
		
		clearRequestData();
		
		Object response = logicDataObj.buildReturnRespose();
		
		if(--index>-1){
			if(pagePara.isTransaction()){
				int trxIndex = funcJson.getInt("sysTrxPageIndex");
				funcJson.put("sysTrxPageIndex", --trxIndex);
			}
			pagePara = pageManager.getCurrentPage(index);
			funcJson.put("sysPageIndex", index);
			
			IMainComponent t = getMainComponent(reqData,pagePara);
			t.cancelData(reqData);
		}
		return response;
	}
	
	protected void cancelRefNumber() {
		if(!isLastTrxPage()){
			return;
		}
		FuncDataObj dataObj = new FuncDataObj(); 
		RefPara refPara = new RefPara();
		dataObj.setReqParaObj(refPara );
		dataObj.setReqData(reqData);
		try {
//			dataObj = refNoProcessor.cancelData(dataObj);
			dataObj = (FuncDataObj) refNoManager.cancelNo(dataObj);
			this.logicDataObj.mergeResponse(dataObj);
		} catch (Exception e) {
			this.logger.error("Cancel Ref Number Exception:"+e.toString());
		}
	}
	
	protected boolean isLastTrxPage(){
		int trxPage = context.getSysTrxPageIndex();
		trxPage++;
		int trxPageTotal =context.getSysTrxTotalPage();
		return trxPage==trxPageTotal;
	}
	
	protected void unLockParameter() throws Exception {
		String pageType = super.pagePara.getPagetype();
		if(ComponentConst.COMP_PAGE_TYPE_PARA_ADD.equalsIgnoreCase(pageType)){
			return;
		}
		
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		JSONObject logicData = (JSONObject) dataObj.getReqData();
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename(pagePara.getMaintable());
		
		dataObj.setReqParaObj(mainLogic);
		logicData.put("sysLockFlag",  "F");
		logicData.put("sysLockBy", "");
		paraLocker.postMasterData(dataObj);
	}
	
	protected void lockParameter(Object paraObj) throws Exception {
		String pageType = super.pagePara.getPagetype();
		if(ComponentConst.COMP_PAGE_TYPE_VIEW.equalsIgnoreCase(pageType)){
			return;
		}
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		JSONObject logicData = (JSONObject) dataObj.getReqData();
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename(pagePara.getMaintable());

		dataObj.setReqParaObj(mainLogic);
		logicData.put("sysLockFlag",  "T");
		logicData.put("sysLockBy", context.getSysUserRef());
		logicData.putAll(BeanUtils.toMap(paraObj));
		dataObj = paraLocker.postMasterData(dataObj);
	}
	
	protected void releaseRefNumber() {
		FuncDataObj dataObj = new FuncDataObj(); 
		RefPara refPara = new RefPara();
		dataObj.setReqParaObj(refPara );
		dataObj.setReqData(reqData);
		try {
			dataObj = (FuncDataObj) refNoManager.releaseNo(dataObj);
			this.logicDataObj.mergeResponse(dataObj);
		} catch (Exception e) {
			this.logger.error("Release Ref Number Exception:"+e.toString());
			e.printStackTrace();
		}
	}
}
