package com.ut.scf.core.services.advice;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.advice.AdvicePara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.func.FunctionProcessor;
import com.ut.scf.core.func.IFunctionProcessor;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.services.advice.impl.IAdviceGenerate;
import com.ut.scf.core.services.advice.impl.IAdviceManagement;
import com.ut.scf.core.utils.ClassLoadHelper;

@Service("adviceServiceImpl")
public class AdviceServiceImpl extends AbsESBServiceImpl {
	@Resource(name = "adviceGenerator")
	IAdviceGenerate generator;

	@Resource(name = "adviceMsgProcessor")
	IAdviceManagement adviceMsgManager;

	@Resource(name = "adviceJsEngine")
	protected IServerSideJs adviceEngine;

	/**
	 * 
	 */

	@Override
	public String getServiceId() {
		return "Advice";
	}

	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:" + getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:" + getServiceId());
		super.getLogger().debug("destroy service success.");
	}

	public int queryCount(Object definition) {

		generator.generateAdvice(definition);

		FuncDataObj logicObj = (FuncDataObj) definition;
		QueryNode node = new QueryNode();
		JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
		String userId = (String) userinfo.get("sysUserRef");
		
		JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
		String sql = "";
		String paras = "";
		if(trxData.containsKey("msgRemindTp")){
			String msgRemindTp = trxData.getString("msgRemindTp");
			if(msgRemindTp!=null&&"warning".equalsIgnoreCase(msgRemindTp)){
				sql = "select count(*) from AdviceClient where recId = ? and msgRemindTp = ?";
				paras = new StringBuffer().append(userId).append(",")
						.append(AdviceConstants.ADV_MSG_REMIND_TP_WARNING).toString();
			}
		}else{
			sql = "select count(*) from AdviceClient where recId = ? and msgStatus = ? and msgRemindTp = ?";
			paras = new StringBuffer().append(userId).append(",")
					.append(AdviceConstants.MSG_STATUS_UNREAD)
					.append(",").append(AdviceConstants.ADV_MSG_REMIND_TP_NORMAL).toString();
		}
		node.setParams(paras);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = logicObj.clone();
		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoExecHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Object> count = (List<Object>) processResult.get(processResult
					.getDoName());
			if (count != null) {
				return Integer.parseInt(count.get(0).toString());
			}
		}

		return 0;
	}

	public List<Object> queryAdviceList(Object definition) {
		FuncDataObj logicObj = (FuncDataObj) definition;
		QueryNode node = new QueryNode();
		JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
		String userId = (String) userinfo.get("sysUserRef");
		String sql = "select d from AdviceClient d where d.recId = ? and d.msgStatus = ?";
		String paras = new StringBuffer().append(userId).append(",")
				.append(AdviceConstants.MSG_STATUS_UNREAD).toString();
		node.setParams(paras);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = logicObj.clone();
		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoExecHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Object> detailList = (List<Object>) processResult
					.get(processResult.getDoName());
			return detailList;
		}

		return null;
	}

	public Object queryAdvice(Object definition) {
		FuncDataObj logicObj = (FuncDataObj) definition;
		QueryNode node = new QueryNode();
		JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
		JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
		String msgId = trxData.getString("sysRefNo");
		String userId = (String) userinfo.get("sysUserRef");
		String sql = "select d from AdviceClient d where  d.msgId =?";
		String paras = new StringBuffer().append(msgId).toString();
		node.setParams(paras);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = logicObj.clone();
		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoExecHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Map<String, Object>> count = (List<Map<String, Object>>) processResult
					.get(processResult.getDoName());
			if (count.isEmpty()) {
				return null;
			}
			List<Map> retList = new ArrayList<Map>();
			for (Map<String, Object> object : count) {

				adviceMsgManager.mark2Readed(object);
				if ("1".equals(object.get("msgStatus"))) {
					object.put("msgStatus", "2");
				}
				retList.add(object);
			}
			return retList.get(0);
		}

		return null;
	}

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		logicObj.buildRespose(queryAdvice(logicObj));
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		
		List<String> adviceRules = super.getRules();
		
		for (String adviceId : adviceRules) {
			AdvicePara advicePara = XMLParaParseHelper.parseAdvicePara(adviceId, currentBu);
			
			JSONObject trxJson = JsonHelper.getTrxObject(logicObj.getReqData());

			JSONObject serviceData = processServiceJs(advicePara,logicObj.getReqData());
			
			String content = advicePara.getContent();
			
			trxJson.put("advContent", content);

			if (StringUtil.isTrimNotEmpty(content)) {
				logicObj.buildRespose(trxJson);
			} else {
				logicObj.buildRespose("Generate Advice content failed.");
				logicObj.setRetStatus(FuncDataObj.FAILED);
			}
		}
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		List<String> ediRules = super.getRules();
		List<AdvicePara> listAdvice = new ArrayList<AdvicePara>();
		for (String rule : ediRules) {
			AdvicePara para = XMLParaParseHelper.parseAdvicePara(rule,
					currentBu);
			listAdvice.add(para);
		}
		logicObj.buildRespose(listAdvice);
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		logicObj.buildRespose(queryCount(logicObj));
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		List<String> adviceRules = super.getRules();

		for (String rule : adviceRules) {
			try {
				AdvicePara reportPara = XMLParaParseHelper.parseAdvicePara(
						rule, currentBu);
				if ("P".equalsIgnoreCase(reportPara.getType())) {
					JSONObject serviceData = processServiceJs(reportPara,reqObj);

//					FunctionProcessor process = new FunctionProcessor();
//					process.setObject(serviceData);
//					FutureTask<ApResponse> task = new FutureTask<ApResponse>(
//							process);
//					Thread oneThread = new Thread(task);
//					oneThread.start();
					IFunctionProcessor funcProcessor = new FunctionProcessor();
					funcProcessor.setLogger(APLogUtil.getAdviceLogger(currentBu));
					funcProcessor.setRequestDom(serviceData,true);
					funcProcessor.setThreadModule(true);//default
					funcProcessor.setTransactionModule(true);//default
					IApResponse response = funcProcessor.run();
				}

			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
		}

	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {

		List<String> adviceRules = super.getRules();

		for (String rule : adviceRules) {
			try {
				AdvicePara reportPara = XMLParaParseHelper.parseAdvicePara(
						rule, currentBu);

				JSONObject serviceData = processServiceJs(reportPara,reqObj);

				// processor.run(serviceData);

//				FunctionProcessor process = new FunctionProcessor();
//				process.setObject(serviceData);
//				FutureTask<ApResponse> task = new FutureTask<ApResponse>(
//						process);
//				Thread oneThread = new Thread(task);
//				oneThread.start();
				IFunctionProcessor funcProcessor = new FunctionProcessor();
				funcProcessor.setLogger(APLogUtil.getAdviceLogger(currentBu));
				funcProcessor.setRequestDom(serviceData,true);
				funcProcessor.setThreadModule(true);//default
				funcProcessor.setTransactionModule(true);//default
				IApResponse response = funcProcessor.run();
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
		}
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		List<String> adviceRules = super.getRules();

		for (String rule : adviceRules) {
			try {
				AdvicePara reportPara = XMLParaParseHelper.parseAdvicePara(
						rule, currentBu);
				if ("M".equalsIgnoreCase(reportPara.getType())) {
					JSONObject serviceData = processServiceJs(reportPara,reqObj);

//					FunctionProcessor process = new FunctionProcessor();
//					process.setObject(serviceData);
//					FutureTask<ApResponse> task = new FutureTask<ApResponse>(
//							process);
//					Thread oneThread = new Thread(task);
//					oneThread.start();
					IFunctionProcessor funcProcessor = new FunctionProcessor();
					funcProcessor.setLogger(APLogUtil.getAdviceLogger(currentBu));
					funcProcessor.setRequestDom(serviceData,true);
					funcProcessor.setThreadModule(true);//default
					funcProcessor.setTransactionModule(true);//default
					IApResponse response = funcProcessor.run();
				}

			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
		}

	}

	@Override
	public void rollback(FuncDataObj dataObj) {

	}

	private AdvicePara getAdviceDefine(JSONObject jsonObject) {
		AdvicePara para = new AdvicePara();
		para.setId(jsonObject.getString("id"));
		return XMLParaParseHelper.parseAdvicePara(para, currentBu);
	}

	private String getAdviceContent(String jspFile, JSONObject reqData) {
		return "";
	}

	@Override
	public String getServiceJsFile(AbsObject para) {
		AdvicePara reportPara = (AdvicePara) para;
		return reportPara.getJs();
	}

	@Override
	public IServerSideJs getJsEngine() {
		return adviceEngine;
	}

//	class FunctionProcessor implements Callable<ApResponse> {
//
//		private JSONObject object;
//
//		public void setObject(JSONObject object) {
//			this.object = object;
//		}
//
//		@Override
//		public ApResponse call() throws Exception {
//			ApResponse retObj = new ApResponse();
//			try {
//				IAPProcessor processor= ClassLoadHelper.getComponentClass("aPSubmitProcessor");
//				retObj = (ApResponse) processor.run(object);
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
