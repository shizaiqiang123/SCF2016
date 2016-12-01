package com.ut.scf.core.component.batch;

import java.math.BigDecimal;
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

import net.sf.json.JSON;
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

@Component("batchInvcToScfProcessor")
@Scope("prototype")
public class BatchInvcToScfProcessor extends AbsRunableTask {

	protected ApSessionContext context;// 当前交易基本信息
	protected ASETrxAjaxManagerBean ajaxManager;
	IQueryFactory queryFactory;
	protected JSONObject funcData;
	IMainComponent catalogProcessor;
	protected JSONObject trxData;

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
			ajaxManager = ClassLoadHelper
					.getComponentClass("aSETrxAjaxManagerBean");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		try {
			queryFactory = ClassLoadHelper.getComponentClass("queryFactory");
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
						List<Map> catalogRecords = (List<Map>)catalogResult.getRows();
						for (Map map : catalogRecords) {
							JSONObject reqObj = JsonUtil.clone(reqData);
							trxData = new JSONObject();
							trxData.putAll(map);
							QueryNode node = new QueryNode();
							String sql = "select m from TRX.InvcM m where licenceNo=? and m.invSts=? and m.poolSts=?";
							String params = new StringBuffer().append(
									map.get("licenceNo")).append(",")
									.append(trxDataPara.getProterties().get("invSts")).append(",")
									.append(trxDataPara.getProterties().get("poolSts")).toString();
							node.setSql(sql);
							node.setParams(params);
							node.setType(LogicNode.LOGIC_TYPE_SQL);
							FuncDataObj dataObj = new FuncDataObj();
							JSONObject jsonObj = new JSONObject();
							dataObj.setReqData(jsonObj);
							dataObj.setReqParaObj(node);
							IQueryComponent process = queryFactory
									.getProcessor(node);
							dataObj.setReqParaObj(node);
							FuncDataObj processResult = process
									.queryData(dataObj);
							daoHelper.execQuery(processResult);							
							if (processResult.hasRecord()) {
								List<Map> list2 = (List<Map>) processResult
										.get(processResult.getDoName());
								BigDecimal invAmt=BigDecimal.ZERO;
								for(Map map2:list2){	
									invAmt=invAmt.add(BigDecimal.valueOf(Double.parseDouble(map2.get("invAmt").toString())));
									
									//获取发票日期和发票起算日发票结算日
									String invDt=map2.get("invDt").toString();
									String invValDt=invDt;
									String invDueDt=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(DateTimeUtil.dateAddDays(DateTimeUtil.getDate(invDt),60));
									map2.put("invDt", invDt);
									map2.put("bankId",trxData.get("bankId").toString() );
									map2.put("invValDt", invValDt);
									map2.put("invDueDt", invDueDt);
								}
								trxData.put("selId", list2.get(0).get("selId"));
								trxData.put("invAmt", String.valueOf(invAmt));
								JsonUtil.append(trxData, JsonUtil.getTrxGridData(list2,trxDataPara.getProterties().get("doname").toString()));
								JsonHelper.setTrxObject(reqObj, trxData);
								try {
									reqObj = (JSONObject) runTaskJsEnginee(
											taskPara, reqObj);
								} catch (Exception e) {
									e.printStackTrace();
								}
								postMasterData(reqObj);
							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			getLogger().error(e.toString());
		}
	}

	public void postMasterData(JSONObject dataObj) throws Exception {
		try {
			FunctionProcessor process = new FunctionProcessor();
			process.setObject(dataObj);
			FutureTask<ApResponse> task = new FutureTask<ApResponse>(process);
			Thread oneThread = new Thread(task);
			oneThread.start();
		} catch (Exception e) {
			getLogger().error(e.toString());
			throw e;
		}
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

	protected IApResponse getCatalogObj(String catalogId) throws Exception {
		try {
			JSONObject reqJson = JsonHelper.createReqJson();
			JSONObject trxJson = JsonHelper.getTrxObject(reqJson);
			trxJson.put("cataType", "loadData");
			trxJson.put("cataId", catalogId);

			IApResponse obj = (IApResponse) catalogProcessor.queryData(reqJson);
			return (IApResponse) obj;
		} catch (Exception e) {
			e.printStackTrace();
			getLogger().error(e.toString());
			return null;
		}
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
			IAPProcessor functionProcessor = ClassLoadHelper
					.getComponentClass("aPSubmitProcessor");
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
