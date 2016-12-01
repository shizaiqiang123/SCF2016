package com.ut.scf.core.component.batch;

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

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.func.FunctionProcessor;
import com.ut.scf.core.func.IFunctionProcessor;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;


/**
 * 批处理隔日交易取消
 * @author 开发
 *
 */
@Component("batchNextDayToCancelProcessor")
@Scope("prototype")
public class BatchNextDayToCancelProcessor  extends AbsRunableTask{
	
	protected ApSessionContext context;// 当前交易基本信息
		
	protected String currentBu;
	
	protected JSONObject funcData;
	
	protected JSONObject trxData;
	
	@Resource(name = "documentFactory")
	DocumentFactoryImpl documentFactory;	
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;
	
	@Override
	public void execute() {
		try {
			this.context = ApSessionUtil.getContext();
			TaskPara taskPara = (TaskPara) currentTask.getParam();
			TrxDataPara trxDataPara = taskPara.getTrxdatapara();
			String functionIds="";
			try {
				functionIds = (String) trxDataPara.getProterties().get("functionIds");
			} catch (Exception e) {				
				throw new Exception("functionIds is not found in task:"+taskPara.getId());				
			}		
			String[] funs = functionIds.split(",");
			for (String functionId :funs) {
				JSONObject reqData = assignFunc(functionId);
				String catalogId = getCatalogId(functionId);
				if(StringUtils.isNotEmpty(catalogId)){
					IApResponse catalogResult = getCatalogObj(catalogId);
					if (catalogResult != null && catalogResult.getTotal() != 0 && catalogResult.isSuccess()) {
						List<Map> catalogRecords = (List<Map>) catalogResult.getRows();
						for (Map map : catalogRecords) {							
							JSONObject reqObj = JsonUtil.clone(reqData);
							trxData = JsonHelper.getTrxObject(reqObj);
							trxData.putAll(map);							
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
	
	private String getCatalogId(String functionId) {
		FunctionPara para = XMLParaParseHelper.parseFuncPara(functionId,"");
		String funcType = para.getFunctype();
		if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(funcType)){
			List<PagePara> pageList = (List<PagePara>) para.getPageList();
			for (PagePara pagePara : pageList) {
				String catalogId = pagePara.getCatalog();
				if(StringUtils.isNotEmpty(catalogId)){
					return catalogId;
				}
			}
		}		
		return "";
	}

	private JSONObject assignFunc(String funcId) throws Exception {
		if(StringUtil.isTrimEmpty(funcId)){
			throw new Exception("batchNextDayToCancelProcessor: missing function id.");
		}		
		JSONObject reqData = JsonHelper.createReqJson();		
		FunctionPara para = XMLParaParseHelper.parseFuncPara(funcId,"");		
		funcData = JsonHelper.getFuncObject(reqData);
		
		funcData.put("sysFuncId", funcId);
		funcData.put("name", para.getName());
		funcData.put("funcType", para.getFunctype());
		funcData.put("module", para.getModule());		
		funcData.put("sysEventTimes", 1);
		funcData.put("sysPageIndex", para.getPagesSize()-1);	
		return reqData;
	}	
	
	protected IApResponse getCatalogObj(String catalogId) throws Exception{
		try {
			JSONObject reqJson = JsonHelper.createReqJson();
			JSONObject trxJson = JsonHelper.getTrxObject(reqJson);
			trxJson.put("cataType", "loadData");
			trxJson.put("cataId", catalogId);

			return (IApResponse) catalogProcessor.queryData(reqJson);
		} catch (Exception e) {
			e.printStackTrace();
			getLogger().error(e.toString());
			return null;
		}
	}
	
	/**
	 * 开启线程，调用function
	 * @param dataObj
	 * @throws Exception
	 */
	public void postMasterData(JSONObject dataObj) throws Exception {
		try{
//			FunctionProcessor process = new FunctionProcessor();
//			process.setObject(dataObj);
//			FutureTask<ApResponse> task = new FutureTask<ApResponse>(
//					process);
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
//				IAPProcessor functionProcessor= ClassLoadHelper.getComponentClass("aPSubmitProcessor");
//				retObj = (ApResponse) functionProcessor.run(object);
//			} catch (Exception e) {
//				getLogger().error(e.toString());
//				getLogger().error(ErrorUtil.getErrorStackTrace(e));
//			}
//			return retObj;
//		}
//
//		protected Logger getLogger() {
//			return APLogUtil.getBatchLogger();
//		}
//	}	
}