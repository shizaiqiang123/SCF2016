package com.ut.scf.core.component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.util.Assert;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.advice.AdvicePara;
import com.ut.comm.xml.func.AssignFunction;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.logicflow.TransforNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.ref.RefPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBFactory;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.func.FunctionProcessor;
import com.ut.scf.core.func.IFunctionProcessor;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoReformat;

public abstract class AbsTrxMainCompManager extends AbsMainCompManager {

	protected final int DEFAULT_EVENT_TIMES = 1;

	private int strCurrentEventTimes;
	
	private String strOrgEventTimes;
	
	@Resource(name="apWorkFlowProcessor")
	protected IWorkFlow workFlowProcess;
	
	@Resource(name="reportManager")
	protected IMainComponent reportManager;
	
	@Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;
	
	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;
	
	@Override
	public Object queryData(Object paraDom) throws Exception {

		parseParameters(paraDom);
		
		setFuncType();
		
		setTrxType();
		
		resetEventTimes();

		context.setSysEventTimes(strCurrentEventTimes);

		generateRefNumber();
		
		FuncDataObj mainRecord = queryMainRecord();
		
		checkTransaction(mainRecord);
		
		callQuery();
		
		checkQueryResult();
		
		Object response = logicDataObj.buildReturnRespose();
		
		clearRequestData();
		return response;
	}

	@Override
	public Object submitData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		
		setFuncType();
		
		setTrxType();
		
		try {
			FuncDataObj mainRecord = queryMainRecord();
			
			checkTransaction(mainRecord);

			resetEventTimes();

			context.setSysEventTimes(strCurrentEventTimes);
			
			trxData.put("sysEventTimes", strCurrentEventTimes);

			callLogic();
			
			callFuncServices();
			
			daoHelper.execUpdate(logicDataObj);
		
			releaseRefNumber();
			
			this.unLockTransaction(pageManager.getMainPage().getMaintable());
			
			Object response = logicDataObj.buildReturnRespose();
			
			processAutoAssginFunction();
			
			return response;
		} catch (Exception e) {
			throw e;
		}finally{
			clearRequestData();
		}
	}
	
	@Resource(name = "aSETrxPageManagerBean")
	protected IGetPage pageManager;

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		
		resetEventTimes();
		
		return cancelAllStep();
	}
	
	public Object cancelOneStep() throws Exception {
		JSONObject funcJson = JsonHelper.getFuncObject(reqData);
		int index = funcJson.getInt("sysPageIndex");
		PagePara pagePara = pageManager.getCurrentPage(index);
		if(pagePara.isTransaction()){
			if(pagePara.getPagetype().equalsIgnoreCase("APPROVE")){
				
			}else{
				cancelTempData();
				
				cancelRefNumber();
				
				unLockTransaction(pageManager.getMainPage().getMaintable());
				
				logicDataObj.buildRespose();
				clearRequestData();
			}
			
		}
		Object response = logicDataObj.buildReturnRespose();
		
		return response;
	}
	
	public Object cancelAllStep() throws Exception {
		JSONObject funcJson = JsonHelper.getFuncObject(reqData);
		int index = funcJson.getInt("sysPageIndex");
		PagePara pagePara = pageManager.getCurrentPage(index);
		if("RE".equalsIgnoreCase(pagePara.getPagetype())||"FP".equalsIgnoreCase(pagePara.getPagetype())){
			
		}else if(pagePara.isTransaction()){
			cancelTempData();
			
			cancelRefNumber();
			
			unLockTransaction(pagePara.getMaintable());
			
			logicDataObj.buildRespose();
			clearRequestData();
		}
		Object response = logicDataObj.buildReturnRespose();
		
		if(--index>-1){
			if(pagePara.isTransaction()){
				int trxIndex = funcJson.getInt("sysTrxPageIndex");
				funcJson.put("sysTrxPageIndex", --trxIndex);
			}
			pagePara = pageManager.getCurrentPage(index);
			funcJson.put("sysPageIndex", index);
			
//			IMainComponent	t = ClassLoadHelper.getMainComponetProcessor(pagePara.getMaincomp());
			IMainComponent t = getMainComponent(reqData,pagePara);
			t.cancelData(reqData);
		}
		return response;
	}
	
//	@Resource(name = "aSETrxPageManagerBean")
//	protected IGetPage getPageManager;
	
	protected FuncDataObj queryMainRecord() throws Exception {
		if(!this.pagePara.isTransaction()){
			return null;
		}
		if(!ComponentDefine.isDefinedComponent(this.pagePara.getPagetype())){
			return null;
		}
			
		strProcessTable = setStrLockTable();
		if(LOCK_TABLE_NAME_N.equalsIgnoreCase(strProcessTable)||!isNeedQueryTransaction()){
			return null;
		}
		//如果用主表，不同的页面进入页面时，都会查询主表的值,对应查询功能
		//如果用当前页，复核的时候查不到对应的表名，对应提交功能
		
		PagePara mainPagePara = null;
		if("query".equalsIgnoreCase(context.getStrTrxType())){
			mainPagePara = pagePara;
		}else{
			mainPagePara = pageManager.getMainPage();
		}
		
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		int maxEvent = getMaxEventTimes();
		JSONObject reqData = (JSONObject) dataObj.getReqData();
		reqData.put("sysEventTimes", maxEvent);
		QueryNode mainLogic = new QueryNode();
		mainLogic.setType("E");
		mainLogic.setTablename(getStrLockTable(mainPagePara.getMaintable()));
		mainLogic.setComponent(ComponentDefine.getDefinedComponent(mainPagePara.getPagetype()));
		mainLogic.setCascadeevent(mainPagePara.getCascadeevent());
		dataObj.setReqParaObj(mainLogic);
		FuncDataObj mainRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);
		this.daoHelper.execQuery(mainRecord);
		return mainRecord;
	}
	
	protected void callLogic() throws Exception{
		Assert.isTrue(funcObj!=null);
		for (int i = this.context.getSysPageIndex(); i > -1; i--) {
			PagePara pagePara = pageManager.getCurrentPage(i);
			if (pagePara.isTransaction()) {
				callPageLogic(pagePara);
				callMainLogic(pagePara);
			}
		}
	}
	
	
	protected void checkTransaction(FuncDataObj mainRecord) throws Exception {
		if(mainRecord == null)
			return ;
		checkTransactionStatus(mainRecord);
		
		int lockFlag= checkLockTransaction(mainRecord);
		if(lockFlag==1)
			lockTransaction();
		
//		checkTransforToStatus();
		logicDataObj.mergeResponse(mainRecord);
	}
	

	/**
	 * @param tableName 
	 * @throws Exception 
	 * @see check if current transaction is locked by operator self, or system.
	 *      if not, reject current submit, otherwise submit transaction.
	 *      
	 * @return -1 不需要锁表 或 已经被自己锁定，无需再锁 0 已经被其他人锁定  1 没有被锁，本线程可以锁表 
	 * 
	 */
	protected int checkLockTransaction(FuncDataObj mainRecord) throws Exception {
		if(LOCK_TABLE_NAME_N.equalsIgnoreCase(strProcessTable)||!isNeedLoackTransaction()){
			return -1;
		}
		if(!mainRecord.hasRecord())
			return -1;
		String strLockFlag = (String) mainRecord.get("sysLockFlag");
		logger.debug("lock flag is:"+strLockFlag);
		if(StringUtil.isTrimEmpty(strLockFlag)||"F".equalsIgnoreCase(strLockFlag))
			return 1;
		
		String lockOp = (String) mainRecord.get("sysLockBy");
		if(StringUtil.isTrimNotEmpty(lockOp)&&!lockOp.equalsIgnoreCase(context.getSysUserRef())&&!lockOp.equalsIgnoreCase("system")){
			throw new Exception(String.format("Current transaction has been locked by [%s]",lockOp));
		}
		return -1;
	}
	
	protected void checkTransactionStatus(FuncDataObj record) throws Exception {
		if(!record.hasRecord())
			return;
		String strTrxSts = (String) record.get("sysTrxSts");
		String strTrxType = this.context.getStrTrxType();
		checkTransactionStatus(strTrxType,strTrxSts);
	}
	
	protected void checkTransforToStatus() throws Exception {
		Assert.isTrue(funcObj!=null);
		for (int i = this.context.getSysPageIndex(); i > -1; i--) {
			PagePara pagePara = pageManager.getCurrentPage(i);
			if (pagePara.isTransaction()) {
				String logicId = pagePara.getLogicid();
				LogicFlowPara logicPara = XMLParaParseHelper.parseFuncLogicFlow(logicId, context.getSysBusiUnit());
				int trans42Size = logicPara.getTransforSize();
				if(trans42Size>0){
					for (int index=0;index<trans42Size;index++) {
						TransforNode logicNode=	logicPara.getTransforNode(index);
						checkTransforToNode(logicNode);
					}
				}
	
			}
		}
	}
	
	protected void checkTransforToNode(TransforNode logicNode){
//		QueryNode mainLogic = new QueryNode();
//		mainLogic.setType("E");
//		mainLogic.setTablename(getStrLockTable(logicNode.getTablename()));
////		mainLogic.setComponent(ComponentDefine.getDefinedComponent(mainPagePara.getPagetype()));
//		mainLogic.setCascadeevent(logicNode.getCascadeevent());
//		dataObj.setReqParaObj(mainLogic);
//		FuncDataObj mainRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);
//		this.daoHelper.execQuery(mainRecord);
//		return mainRecord;
	}
	
	protected Object checkQueryBefore() {
		if (StringUtil.isTrimEmpty(pagePara.getQueryid())) {
			logger.debug("Current transaction has no Query.");
			Object response = logicDataObj.buildReturnRespose();
			return response;
		}
		return null;
	}

	
	protected abstract void checkTransactionStatus(String strTrxType,String strTrxSts) throws Exception;

	protected abstract void checkQueryResult() throws Exception;

//	protected abstract void callOutputGeneration();

	protected abstract void setFuncType();

	protected abstract void setTrxType();

	@Resource(name = "trxLockRecord")
	protected ILogicComponent trxLockRecord;
	
	private String strProcessTable;
	
	public abstract String setStrLockTable();
	
	protected String getStrLockTable(String strTableName){
		if(LOCK_TABLE_NAME_E.equalsIgnoreCase(strProcessTable)){
			StringBuffer buff= new StringBuffer(strTableName);
			buff = buff.replace(buff.length()-1, buff.length(), LOCK_TABLE_NAME_E);
			return buff.toString();
		}
		return strTableName;
	}
	
	protected static final String LOCK_TABLE_NAME_M = "M";
	protected static final String LOCK_TABLE_NAME_E = "E";
	protected static final String LOCK_TABLE_NAME_N = "N";

	protected void lockTransaction(String tableName) throws Exception {
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		JSONObject logicData = (JSONObject) dataObj.getReqData();
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename(tableName);

		dataObj.setReqParaObj(mainLogic);
		logicData.put("sysLockFlag",  "T");
		String strLockBy = context.getSysUserRef();
		if(StringUtil.isNull(strLockBy))
			strLockBy = "system";
		logicData.put("sysLockBy",strLockBy);
		dataObj = trxLockRecord.postData(dataObj);
		
		daoHelper.execUpdate(dataObj);
	}
	protected void lockTransaction() throws Exception {
		lockTransaction(getStrLockTable(pageManager.getMainPage().getMaintable()));
	}
	
	protected abstract boolean isNeedLoackTransaction();
	
	protected abstract boolean isNeedQueryTransaction();

	protected void unLockTransaction(String tableName) throws Exception {
		strProcessTable = setStrLockTable();
		if(LOCK_TABLE_NAME_N.equalsIgnoreCase(strProcessTable)){
			return;
		}
		if (!isNeedLoackTransaction()) {
			return;
		}
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		tableName = getStrLockTable(tableName);
		setUnlockDataObj(dataObj);
		JSONObject logicData = (JSONObject) dataObj.getReqData();
		JSONObject trxDom = JsonHelper.getTrxObject(logicData);
		int pageIndex = 0;
		if (trxDom.containsKey("p" + pageIndex)) {
			trxDom = JsonUtil.getChildJson(trxDom, "p" + pageIndex);
		}
		
		StringBuffer hqlBuff = new StringBuffer();
		hqlBuff.append("update ").append(ClassLoadHelper.getOrmName(tableName));
		hqlBuff.append(" set sysLockFlag = ? , sysLockBy = ?  where sysLockBy = ? ");
		
		List<Object> paraList = new ArrayList<Object>();
		paraList.add("F");
		paraList.add("");
		
		String strLockBy = context.getSysUserRef();
		if(StringUtil.isNull(strLockBy))
			strLockBy = "system";
		paraList.add(strLockBy);
		
		String strRefNo = trxDom.getString("sysRefNo");
		paraList.add(strRefNo);
		if(tableName.endsWith("_E")){
			hqlBuff.append(" and id.sysRefNo = ? and id.sysEventTimes = ?");
			paraList.add(strCurrentEventTimes);
		}else{
			hqlBuff.append(" and sysRefNo = ? ");
		}
		
		IDaoEntity updateEntity = new ExecDaoEntity();
		updateEntity.setHql(hqlBuff.toString());
		updateEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		updateEntity.setParaList(paraList);
		
		dataObj.addExcuteEntity(updateEntity);
		daoHelper.execUpdate(dataObj);	
	}
	
	protected void setUnlockDataObj(FuncDataObj dataObj) {
	}
	
//	@Resource(name = "trxRefNo")
//	private ILogicComponent refNoProcessor;
	
	@Resource(name="refNoManager")  
	IReferenceNo refNoManager;

	protected void generateRefNumber() throws Exception {
		String strPageType = pagePara.getPagetype();
		if(StringUtil.isTrimEmpty(strPageType)||!"add".equalsIgnoreCase(strPageType)){
			return;
		}
		int refSize = this.pagePara.getRefsSize();
		for (int i = 0; i <refSize; i++) {
			RefPara refPara =  this.pagePara.getRefPara(i);
			if(refPara==null||StringUtil.isTrimEmpty(refPara.getRefname())){
				continue;
			}
			FuncDataObj dataObj = new FuncDataObj(); 
			dataObj.setReqData(this.reqData);
			dataObj.setReqParaObj(refPara);
			
			try {
//				dataObj = refNoProcessor.inqData(dataObj);
				dataObj = (FuncDataObj) refNoManager.generateNo(dataObj);
				trxData.put(refPara.getReffield(),dataObj.get(refPara.getReffield()));
			} catch (Exception e) {
				throw new Exception("Generate Ref Number Exception:"+e.toString());
			}
		}
	}
	
	protected void releaseRefNumber() {
		if(!isLastTrxPage()){
			return;
		}
		
		FuncDataObj dataObj = new FuncDataObj(); 
		RefPara refPara = new RefPara();
		dataObj.setReqParaObj(refPara );
		dataObj.setReqData(reqData);
		try {
//			dataObj = refNoProcessor.releaseData(dataObj);
			dataObj = (FuncDataObj) refNoManager.releaseNo(dataObj);
			this.logicDataObj.mergeResponse(dataObj);
		} catch (Exception e) {
			this.logger.error("Release Ref Number Exception:"+e.toString());
			e.printStackTrace();
		}
	}
	
	protected void cancelRefNumber() {
		if(!isCancelAll()&&!isLastTrxPage()){
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
	
	protected void cancelTempData() {
		this.logger.debug("cancel temp data...");
	}

	protected abstract void resetEventTimes();
	
	@Resource(name="esbContextListener")
	IESBFactory factory;//从ESB提供商中选择系统集成的ESB框架
	
	public void callFuncServices() throws Exception {
		int serviceCount = this.funcObj.getServiceSize();
		for (int i = 0; i < serviceCount; i++) {
			try {
				ServicePara service  = funcObj.getService(i);
				callSingleService(service);
			} catch (Exception se) {
				se.printStackTrace();
				throw se;
			} 
		}
	}
	
	public void callSingleService(ServicePara service) throws Exception{
		if(!checkFuncService(service)){
			return;
		}
		
		JSONObject serviceData = processServiceJs(service,reqData);
		
		IESBServiceRequest request = new ServiceRequestImpl();
		request.setRequestPara(service);
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_POST);
		request.setRequestData(serviceData);
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(service));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
		
		IESBServiceResponse retObj = ESBServiceUtil.getESBRunner().runService(request);
		
		if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == retObj.getResponseResult()) {
			
			FuncDataObj retData = (FuncDataObj) retObj.getResponseData();
			
			processCallback(retData,service.getOnsuccess());

			String gapiMsgId = service.getGapiid();
			if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
				callGapiProcess(gapiMsgId,retData.getReturnObj(),serviceData);
				// 通过GAPI发送过了，是否就可以不返回到前台了，或者是否需要增加属性控制是否返回到前台
			}else{
				logicDataObj.mergeResponse(retData);
			}
		}else{
			FuncDataObj retData = (FuncDataObj) retObj.getResponseData();
			
			processCallback(retData,service.getOnfailed());
			
//			String strResponse = retData.getReturnObj();
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(retData.getRetInfo());
		}
		FuncDataObj retFuncObj = (FuncDataObj) retObj.getResponseData();
		logicDataObj.mergeResponse(retFuncObj);
	}
	
	protected void processCallback(FuncDataObj retData,String inquireDataId) throws Exception {
		if(StringUtil.isTrimNotEmpty(inquireDataId)){
			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(inquireDataId,this.context.getSysBusiUnit());
			String inqType = inqPara.getType();
			
			JsonHelper.getTrxObject(trxData).putAll((Map) retData.getReturnObj());
			
			if("S".equalsIgnoreCase(inqType)){
				getServiceData(inqPara.getTarget());
			}else if("Q".equalsIgnoreCase(inqType)){
				getQueryData(inqPara.getTarget());
			}else if("L".equalsIgnoreCase(inqType)){
				getLogicData(inqPara.getTarget());
			}else{
				getQueryData(inqPara.getTarget());
			}
		}
	}
	
	public void callGapiProcess(String gapiMsgId,Object reqData,JSONObject serviceData) throws Exception{
		try {
			IGAPIMsgRequest gapiRequest = new MessageSendRequest();
			gapiRequest.setMsgBody( reqData);
			GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, context.getSysBusiUnit());
			IGAPIMsgResponse gapiResponse = gapiManager.processSendMsg(msgPara, gapiRequest, serviceData);
			logicDataObj.setRetStatus(gapiResponse.getRespCode()+"");
			logicDataObj.setRetInfo(gapiResponse.getResponse());
		} catch (Exception e) {
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(e.getMessage());
			e.printStackTrace();
			throw e;
		}
	}
	
	private void getQueryData(String queryId) throws Exception{
		QueryPara queryPara = XMLParaParseHelper.parseQuery(queryId,context.getSysBusiUnit());
		for (int i = 0, len = queryPara.getNodeSize(); i < len; i++) {
			QueryNode queryNode = queryPara.getNode(i);
			try {
				logicDataObj.setReqParaObj(queryNode);
				FuncDataObj processResult = queryFactory.getProcessor(queryNode).queryData(logicDataObj);
				daoHelper.execQuery(processResult);
				logicDataObj.mergeResponse(processResult);
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
				throw e;
			}
		}
	}
	
	private void getLogicData(String logicId) throws Exception{
		LogicFlowPara logicFlowPara = XMLParaParseHelper.parseFuncLogicFlow(logicId,context.getSysBusiUnit());
		FuncDataObj processResult = new FuncDataObj();
		for (int i = 0, len = logicFlowPara.getNodeSize(); i < len; i++) {
			LogicNode logicNode = logicFlowPara.getLnode(i);
			try {
				logicDataObj.setReqParaObj(logicNode);
				processResult.mergeResponse(logicFactory.getProcessor(logicNode).postData(logicDataObj));
			} catch (Exception e) {
				APLogUtil.getUserErrorLogger().error(e.toString());
				throw e;
			}
		}
		daoHelper.execQuery(processResult);
		logicDataObj.mergeResponse(processResult);
	}
	
	/**
	 * 
	 * @param target : service type
	 * @throws Exception
	 */
	private void getServiceData(String target)  throws Exception{
		FunctionPara functPara  = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		
		if(functPara==null){
			processOtherService(target);
		}else{
			JSONObject trxJson = JsonHelper.getTrxObject(trxData);
			Object isFunctionSerrvice =trxJson.get("byFunc");
			if(isFunctionSerrvice!=null){
				String byFunc = isFunctionSerrvice.toString();
				if("N".equalsIgnoreCase(byFunc)){
					processOtherService(target);
					return;
				}
			}
			processFunctionService(target);
		}
	}
	
	public void processOtherService(String serviceType) throws Exception{
		ServicePara queryPara = new ServicePara();
		queryPara.setId(serviceType);
		queryPara = XMLParaParseHelper.parseFuncService(serviceType, context.getSysBusiUnit());

		JSONObject serviceData = processServiceJs(queryPara,logicDataObj.getReqData());
		
		IESBServiceRequest request = new ServiceRequestImpl();
		request.setRequestData(serviceData);
		request.setRequestPara(queryPara);
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
		request.setMethodName(queryPara.getMethodname());
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
		
		IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);
		
		if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()) {
			
			FuncDataObj retData = (FuncDataObj) processResult.getResponseData();
			
			processCallback(retData,queryPara.getOnsuccess());

			String gapiMsgId = queryPara.getGapiid();
			if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
				callGapiProcess(gapiMsgId,retData.getReturnObj(),serviceData);
			}else{
				logicDataObj.mergeResponse(retData);
			}
		}else{
			FuncDataObj retData = (FuncDataObj) processResult.getResponseData();
			
			processCallback(retData,queryPara.getOnfailed());
			
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(retData.getRetInfo());
		}
	}
	
	public void processFunctionService(String serviceType) throws Exception{
		FunctionPara functPara  = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		if("RE".equalsIgnoreCase(functPara.getFunctype()))
			functPara =  (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		List<ServicePara> allServices = functPara.getServiceList();
		if(allServices==null||allServices.size()>1){
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo("No service find in currently function :"+functPara.getId()+" service type:"+serviceType);
			return;
		}
			
		for (ServicePara servicePara : allServices) {
			XMLParaParseHelper.parseFuncService(servicePara,context.getSysBusiUnit());
			if(serviceType.equalsIgnoreCase(servicePara.getType())){
				ServicePara queryPara = XMLParaParseHelper.parseFuncService(servicePara.getId(),context.getSysBusiUnit());
				JSONObject serviceData = processServiceJs(queryPara,logicDataObj.getReqData());
				
				IESBServiceRequest request = new ServiceRequestImpl();
				
				request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
				request.setRequestData(serviceData);
				request.setRequestPara(queryPara);
				request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
				request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
				
				IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);
				if(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()){
					FuncDataObj retData = (FuncDataObj) processResult.getResponseData();
					
					String gapiMsgId = queryPara.getGapiid();
					if(StringUtil.isTrimNotEmpty(gapiMsgId)){
//						IGAPIMsgRequest gapiRequest = new MessageSendRequest();
//						gapiRequest.setMsgBody( retData.getReturnObj());
//						GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, context.getSysBusiUnit());
//						IGAPIMsgResponse gapiResponse=gapiManager.process(msgPara, gapiRequest, serviceData);
//						logicDataObj.setRetStatus(gapiResponse.getRespCode()+"");
//						logicDataObj.setRetInfo(gapiResponse.getResponse());
						callGapiProcess(gapiMsgId,retData.getReturnObj(),serviceData);
					}else{
						logicDataObj.mergeResponse(retData);
					}
				}else{
					String retData = processResult.getResponseData().toString();
					logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
					logicDataObj.setRetInfo(retData);
				}
				return;
			}
		}
		logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
		logicDataObj.setRetInfo("No service find in currently function :"+functPara.getId()+" service type:"+serviceType);
	}
	
//	protected boolean checkFuncService(ServicePara service){
//		return true;
//	}
	protected abstract boolean checkFuncService(ServicePara service);
	
	@Resource(name = "serviceJsEngine")
	protected IServerSideJs jsEngine;
	
	private JSONObject processServiceJs(ServicePara para,JSONObject serviceData) throws Exception{
		String jsFile = para.getServicejs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			jsEngine.initTrxData(serviceData);
			jsEngine.initTrxPara(para);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
			
			return (JSONObject) jsEngine.getTrxData();
		}
		return serviceData;
	}
	
	@Resource(name = "logicFactory")
	ILogicFactory logicFactory ;

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	public void callQuery() throws SCFThrowableException {
		if (StringUtil.isTrimEmpty(pagePara.getQueryid())) {
			return;
		}
		QueryPara queryPara = XMLParaParseHelper.parseQuery(pagePara.getQueryid(),super.context.getSysBusiUnit());
		for (int i = 0, len = queryPara.getNodeSize(); i < len; i++) {
			QueryNode queryNode = queryPara.getNode(i);
			try {
				if("Y".equalsIgnoreCase(queryNode.getLockcheck())){
					lockTransaction(queryNode.getTablename());
				}
				logicDataObj.setReqParaObj(queryNode);
				FuncDataObj processResult = queryFactory.getProcessor(queryNode).queryData(logicDataObj);
				if (hasThrowableError(processResult)) {
					throw new SCFThrowableException("");
				}
				daoHelper.execQuery(processResult);
				logicDataObj.mergeResponse(processResult);
			} catch (SCFThrowableException se) {
				throw se;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	protected abstract FuncDataObj doProcessLogicFlow(ILogicComponent t, FuncDataObj dataObj)
			throws Exception;
	
//	protected abstract FuncDataObj doProcessService( IESBServiceRequest request)
//			throws Exception;

	protected int getMaxEventTimes() {
		// select data from DB.
		// select max event times from Event table.
		try {
			String strFuncType = super.funcObj.getFunctype();
			if("VH".equalsIgnoreCase(strFuncType)||"RE".equalsIgnoreCase(strFuncType)||"DP".equalsIgnoreCase(strFuncType)||"FP".equalsIgnoreCase(strFuncType)){
				return this.strCurrentEventTimes;
			}
			QueryNode mainLogic = new QueryNode();
			FuncDataObj dataObj = new FuncDataObj();
			PagePara mainPagePara =pageManager.getMainPage();
			String tableName = getStrLockTable( mainPagePara.getMaintable());
			
			mainLogic.setTablename(tableName);
			JSONObject logicData = (JSONObject) logicDataObj.getReqData();
			mainLogic.setType("S");
			mainLogic.setAsc("Y");
			mainLogic.setOrderby("id.sysEventTimes");
			dataObj.setReqParaObj(mainLogic);
			dataObj.setReqData(this.logicDataObj.getReqData());
		
			tableName = ClassLoadHelper.getOrmName(tableName);
			String sql = "select Max(id.sysEventTimes) from "+tableName+" where id.sysRefNo = ?"; 
			mainLogic.setSql(sql);
			mainLogic.setParams(logicData.getString("sysRefNo"));
			
			FuncDataObj maxRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);
			List<IDaoEntity> entityList = maxRecord.getEntityList(maxRecord.getDoName());
			for (IDaoEntity entity : entityList) {
				entity.setReformat(new IDaoReformat() {
					
					@Override
					public Object reformat(Object recordData) {
						List<Object> recordList = (List<Object>) recordData;
						if (recordList.isEmpty())
							return 0;
						else{
							Object maxId = recordList.get(0);
							if(maxId==null||StringUtil.isNull(maxId.toString())){
								return 0;
							}
							return Integer.parseInt(maxId.toString());
						}
					}
				});
			}
			int eventTimes = -1;
			maxRecord = (FuncDataObj) this.daoHelper.execQuery(maxRecord);
			eventTimes = (Integer) maxRecord.get(maxRecord.getDoName());
			return eventTimes;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	public int getStrCurrentEventTimes() {
		return strCurrentEventTimes;
	}

	public void setStrCurrentEventTimes(int strCurrentEventTimes) {
		this.strCurrentEventTimes = strCurrentEventTimes;
	}

	public String getStrOrgEventTimes() {
		return strOrgEventTimes;
	}

	public void setStrOrgEventTimes(String strOrgEventTimes) {
		this.strOrgEventTimes = strOrgEventTimes;
	}
	
	protected boolean isLastTrxPage(){
		int trxPage = context.getSysTrxPageIndex();
		trxPage++;
		int trxPageTotal =context.getSysTrxTotalPage();
		return trxPage==trxPageTotal;
	}
	
	protected boolean hasPreTrxPage(){
		int trxPageTotal =context.getSysTrxTotalPage();
		return trxPageTotal>1;
	}
	
	protected void updateTrxStatus(){
//		if(!isLastTrxPage()){
//			this.context.setSysTrxSts("T");
//		}
	}
	
	protected void callPreTrxPageLogic() throws Exception{
		Assert.isTrue(funcObj!=null);
		for (int i = this.context.getSysPageIndex() - 1; i > -1; i--) {
			PagePara pagePara = pageManager.getCurrentPage(i);
			if (pagePara.isTransaction()) {
				callPageLogic(pagePara);
				callMainLogic(pagePara);
			}
		}
	}
	
	public void callPageLogic(PagePara pagePara) throws Exception {
		if (StringUtil.isTrimEmpty(pagePara.getLogicid())) {
			return;
		}
		LogicFlowPara logicFlows =  XMLParaParseHelper.parseFuncLogicFlow(pagePara.getLogicid(),super.context.getSysBusiUnit());
		for (int i = 0, len = logicFlows.getNodeSize(); i < len; i++) {
			LogicNode logicFlow = logicFlows.getLnode(i);
			String component = logicFlow.getComponent();
			ILogicComponent t = null;
			try {
				FuncDataObj dataObj = new FuncDataObj();
				dataObj.setMainPageType(pagePara.getPagetype());//对主表的操作类型
				dataObj.setFuncType( this.logicDataObj.getFuncType());
				dataObj.setReqParaObj(logicFlow);
				t = ClassLoadHelper.getBusiComponetProcessor(component);
				dataObj.setReqData(this.logicDataObj.getReqData());
				FuncDataObj processResult=doProcessLogicFlow(t, dataObj);
				if (hasThrowableError(processResult)) {
					throw new SCFThrowableException("");
				}
				logicDataObj.mergeResponse(processResult);
			} catch (SCFThrowableException se) {
				throw se;
			} catch (Exception e) {
				throw e;
			}
		}
		
		for (int i = 0, len = logicFlows.getTransforSize(); i < len; i++) {
			TransforNode logicFlow = logicFlows.getTransforNode(i);
			String component = logicFlow.getComponent();
			ILogicComponent t = null;
			try {
				FuncDataObj dataObj = new FuncDataObj();
				dataObj.setMainPageType(pagePara.getPagetype());//对主表的操作类型
				dataObj.setFuncType( this.logicDataObj.getFuncType());
				dataObj.setReqParaObj(logicFlow);
				t = ClassLoadHelper.getBusiComponetProcessor(component);
				dataObj.setReqData(this.logicDataObj.getReqData());
				FuncDataObj processResult=doProcessLogicFlow(t, dataObj);
				if (hasThrowableError(processResult)) {
					throw new SCFThrowableException("");
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
	
	protected void callMainLogic(PagePara pagePara) throws Exception{
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
		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor(component );
		
		FuncDataObj processResult=doProcessLogicFlow(t, dataObj);
		if (hasThrowableError(processResult)) {
			throw new SCFThrowableException("");
		}
		logicDataObj.mergeResponse(processResult);
	}
	
	protected boolean isCancelAll(){
		Object cancelStep = trxData.get("reqPageType");
		String strStep = cancelStep==null?"":cancelStep.toString();
		return !"pre".equalsIgnoreCase(strStep);
	}
	
	protected boolean isMultipleRecord(JSONObject trxObj){
		if(trxObj!=null&&trxObj.containsKey("_total_rows")){
			return true;
		}
		return false;
	}
	public JSONObject getTrxDom(JSONObject rows,int recodIndex){
		String key = "rows"+recodIndex;
		if(rows.containsKey(key)){
			return rows.getJSONObject(key);
		}
		return null;
	}
	
	protected void processAutoAssginFunction() {
		//default no process
		
		int assignSize= funcObj.getAutoassignSize();
		for (int i = 0; i <assignSize; i++) {
			AssignFunction assignFunc = funcObj.getAutoassign(i);
			if(checkAssignFunc(assignFunc)){
				JSONObject funcObj = JsonUtil.clone(reqData);
				String funcId = assignFunc.getId();
				try {
					setFuncParameter(funcObj,funcId);
					assignFunction(funcObj);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	public void setFuncParameter(JSONObject funcObj,String funcId) throws Exception {
		if(StringUtil.isTrimEmpty(funcId)){
			throw new Exception("Assign Function failed, missing function id.");
		}
		
		FunctionPara para = XMLParaParseHelper.parseFuncPara(funcId,"");
		
		JSONObject funcData = JsonHelper.getFuncObject(funcObj);
		funcData.put("sysFuncId", funcId);
		funcData.put("name", para.getName());
		funcData.put("funcType", para.getFunctype());
		funcData.put("module", para.getModule());
		funcData.put("sysEventTimes", 1);
		funcData.put("sysPageIndex", para.getPagesSize()-1);
	}
	
	protected boolean checkAssignFunc(AssignFunction assignFunc) {
		return false;
	}

	@Resource(name = "aPSubmitProcessor")
	IAPProcessor processor;

	public void assignFunction(JSONObject dataObj) throws Exception {
		try {
//			FunctionProcessor process = new FunctionProcessor();
//			process.setObject(dataObj);
//			FutureTask<ApResponse> task = new FutureTask<ApResponse>(process);
//			Thread oneThread = new Thread(task);
//			oneThread.start();
			IFunctionProcessor funcProcessor = new FunctionProcessor();
			funcProcessor.setLogger(APLogUtil.getBatchLogger());
			funcProcessor.setRequestDom(dataObj,true);
			funcProcessor.setThreadModule(true);//default
			funcProcessor.setTransactionModule(true);//default
			IApResponse response = funcProcessor.run();
		} catch (Exception e) {
			getLogger().error(e.toString());
			throw e;
		}
	}

//	class FunctionProcessor implements Callable<ApResponse> {
//
//		private JSONObject object;
//
//		public void setObject(JSONObject object) {
//			this.object = JsonUtil.clone(object);
//			JsonHelper.mark2StpFunc(this.object, true);
//		}
//
//		@Override
//		public ApResponse call() throws Exception {
//			ApResponse retObj = new ApResponse();
//			try {
//				retObj = (ApResponse) processor.run(object);
//			} catch (Exception e) {
//				getLogger().error(e.toString());
//				getLogger().error(ErrorUtil.getErrorStackTrace(e));
//			}
//			return retObj;
//		}
//	}

}
