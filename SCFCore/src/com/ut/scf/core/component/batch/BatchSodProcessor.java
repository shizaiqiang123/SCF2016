package com.ut.scf.core.component.batch;


import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.GAPIManager;
import com.ut.scf.core.gapi.IGAPIMsgManager;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.gapi.MessageSendResponse;
import com.ut.scf.core.gapi.reformat.GAPIMsgFormatorFactory;
import com.ut.scf.core.gapi.reformat.IGAPIMsgReformat;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.orm.std.GapiMsg;

import freemarker.template.utility.DateUtil;

@Component("batchSodProcessor")
@Scope("prototype")
public class BatchSodProcessor extends AbsRunableTask {

	protected ApSessionContext context;// 当前交易基本信息
	IQueryFactory queryFactory;
	protected ASETrxAjaxManagerBean ajaxManager;
	IReferenceNo refNoManager;
	// @Resource(name = "gapiManager")

	// @Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;
	protected JSONObject funcData;
	protected JSONObject trxData;
	IMainComponent catalogProcessor;	

	protected IServerSideJs serverJsEngine;
	private GapiMsgPara gapiPara;
	int gapiSts;
	public static final String tableName = "GapiMsg";
	StringBuffer stringBuffer = new StringBuffer();

	// InquireDataPara

	@Override
	public void execute() {
		try {
			catalogProcessor = ClassLoadHelper
					.getComponentClass("trxCatalogManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			serverJsEngine = ClassLoadHelper
					.getComponentClass("serviceJsEngine");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			refNoManager = ClassLoadHelper.getComponentClass("refNoManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			serviceFactory = ClassLoadHelper
					.getComponentClass("serviceFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			queryFactory = ClassLoadHelper.getComponentClass("queryFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			daoHelper = ClassLoadHelper.getComponentClass("daoHelper");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			ajaxManager = ClassLoadHelper
					.getComponentClass("aSETrxAjaxManagerBean");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		try {
			this.context = ApSessionUtil.getContext();
			TaskPara taskPara = (TaskPara) currentTask.getParam();
			TrxDataPara trxDataPara = taskPara.getTrxdatapara();
			String functionIds = "";
			try {
				functionIds = (String) trxDataPara.getProterties().get(
						"functionIds");
			} catch (Exception e) {
				throw new Exception("functionIds is not found in task:"
						+ taskPara.getId());
			}
			String[] funs = functionIds.split(",");
			for (String functionId : funs) {
				JSONObject reqData = assignFunc(functionId);
				String catalogId = getCatalogId(functionId);
				if (StringUtils.isNotEmpty(catalogId)) {
					IApResponse catalogResult = getCatalogObj(catalogId);
					if (catalogResult != null && catalogResult.getTotal() != 0
							&& catalogResult.isSuccess()) {
						List<Map> catalogRecords = (List<Map>) catalogResult
								.getRows();
						for (Map map : catalogRecords) {
							JSONObject reqObj = JsonUtil.clone(reqData);
							trxData = JsonHelper.getTrxObject(reqObj);
							map=formatDate(map,taskPara);
							trxData.putAll(map);
//							setFuncParameter(trxData,functionId);
//							assignFunction(trxData);
//							runTaskJsEnginee(taskPara,reqObj);
							postMasterData(reqObj);
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			getLogger().error(e.toString());
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

	private Map formatDate(Map map,TaskPara taskPara) throws Exception {
		String formatDate="";
		try {
			formatDate=(String) taskPara.getTrxdatapara().getProterties().get("formatDate");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new Exception("formatDate is not found in task:"
					+ taskPara.getId());
		}
		String[] dates = formatDate.split(",");
		for(int i =0;i<dates.length;i++){
			String date=map.get(dates[i]).toString();
			Date date2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S").parse(date);
			String date3=new SimpleDateFormat("yyyyMMddHHmmss").format(date2);
//			map.remove(dates[i]);
			map.put("sysEventBusiDt", date3);
//			Date date2=(Date) trxData2.get(date);
//			String date2=DateTimeUtil.parseDate(DateTimeUtil.getDate(dateName,"yyyyMMdd"));
		}
		return map;
	}

	private JSONObject assignFunc(String funcId) throws Exception {
		if (StringUtil.isTrimEmpty(funcId)) {
			throw new Exception(
					"batchNextDayToCancelProcessor: missing function id.");
		}
		JSONObject reqData = JsonHelper.createReqJson();
		FunctionPara para = XMLParaParseHelper.parseFuncPara(funcId, "");
		funcData = JsonHelper.getFuncObject(reqData);

		funcData.put("sysFuncId", funcId);
		funcData.put("name", para.getName());
		funcData.put("funcType", para.getFunctype());
		funcData.put("module", para.getModule());
		funcData.put("sysEventTimes", 1);
		funcData.put("sysPageIndex", para.getPagesSize() - 1);
		return reqData;
	}

	private String getCatalogId(String functionId) {
		FunctionPara para = XMLParaParseHelper.parseFuncPara(functionId, "");
		String funcType = para.getFunctype();
		
			List<PagePara> pageList = (List<PagePara>) para.getPageList();
			for (PagePara pagePara : pageList) {
				String catalogId = pagePara.getCatalog();
				if (StringUtils.isNotEmpty(catalogId)) {
					return catalogId;
				}
			}
		return "";
	}
	
	protected IApResponse getCatalogObj(String catalogId) throws Exception{
		try {
			JSONObject reqJson = JsonHelper.createReqJson();
			JSONObject trxJson = JsonHelper.getTrxObject(reqJson);
			trxJson.put("cataType", "loadData");
			trxJson.put("cataId", catalogId);

			IApResponse obj= (IApResponse)catalogProcessor.queryData(reqJson);
			return (IApResponse) obj;
		} catch (Exception e) {
			e.printStackTrace();
			getLogger().error(e.toString());
			return null;
		}
	}
	
	public void postMasterData(JSONObject dataObj) throws Exception {
		try{
			FunctionProcessor process = new FunctionProcessor();
			process.setObject(dataObj);
			FutureTask<ApResponse> task = new FutureTask<ApResponse>(
					process);
			Thread oneThread = new Thread(task);
			oneThread.start();
		} catch (Exception e) {
			getLogger().error(e.toString());
			throw e;
		}		
	}
	
	class FunctionProcessor implements Callable<ApResponse> {

		private JSONObject object;

		public void setObject(JSONObject object) {
			this.object = object;
		}

		@Override
		public ApResponse call() throws Exception {
			ApResponse retObj = new ApResponse();
			try {
				IAPProcessor functionProcessor= ClassLoadHelper.getComponentClass("aPSubmitProcessor");
				retObj = (ApResponse) functionProcessor.run(object.toString());
			} catch (Exception e) {
				getLogger().error(e.toString());
				getLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
			return retObj;
		}

		protected Logger getLogger() {
			return APLogUtil.getBatchLogger();
		}
	}	

}
