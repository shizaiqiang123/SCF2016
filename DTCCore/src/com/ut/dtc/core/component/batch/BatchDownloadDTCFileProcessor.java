package com.ut.dtc.core.component.batch;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.slf4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.FtpUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.services.IServiceRunner;
import com.ut.scf.core.services.ServiceRunnerFactory;
import com.ut.scf.core.utils.BuDateTimeUtil;

@Component("batchDownloadDTCFileProcessor")
@Scope("prototype")
public class BatchDownloadDTCFileProcessor extends AbsRunableTask {
	@Override
	public void execute() {
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();

		List allCommFtpCust = queryAllCommDownloadCust();

		getLogger().debug("allCommFtpCust count:" + allCommFtpCust.size());

		for (Object object : allCommFtpCust) {
			Map custInfDerfine = BeanUtils.toMap(object);
			String custId = custInfDerfine.containsKey("custId") ? custInfDerfine
					.get("custId").toString() : "";
			if (StringUtil.isTrimEmpty(custId)) {
				getLogger().warn(
						formatLogger("current object miss cust id:", JsonUtil
								.getJSON(object).toString()));
			}

			getLogger().debug(
					formatLogger("start to process download files, cust is:",
							custId));
			JSONObject msg = JsonHelper.createReqJson();
			JsonHelper.getTrxObject(msg).putAll(trxDataPara.getProterties());
			JsonHelper.getTrxObject(msg).putAll(custInfDerfine);
			try {
				getLogger().debug(
						formatLogger("process download files, request json:",
								msg.toString()));
				runService(msg);
				getLogger().debug(
						formatLogger("end to process download files, cust is:",
								custId));
			} catch (Exception e) {
				getLogger().error(
						formatLogger(
								"process download files exception, cust is:",
								custId, "exceptions:", e.toString()));
			}
		}
	}

	public void callSigleEsbService(String serviceId, FuncDataObj reqData) {
		JSONObject trxData = JsonHelper.getTrxObject(reqData.getReqData());
		trxData.put("byFunc", "N");

		try {
			IServiceRunner runner = ServiceRunnerFactory
					.getServiceRunner(trxData);

			runner.setBu(getBu());

			runner.runService(serviceId, reqData);

		} catch (ClassNotFoundException e) {
			getLogger().error(e.toString());
			reqData.setRetStatus(FuncDataObj.EXCEPTION);
			reqData.setRetInfo(e.getMessage());
		}
	}

	public String getBu() {
		return "";
	}

	private List queryAllCommDownloadCust() {
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		FuncDataObj dataObj = new FuncDataObj();
		QueryNode node = new QueryNode();
		dataObj.setReqData(trxData);
		String sql = "";
		sql = "select loanm  from  DtcCustIntf  loanm  where loanm.sysLockFlag='F' and loanm.sysTrxSts='M' and loanm.loanTermSts='1' and (loanm.finaSts='5' or loanm.finaSts='6')";
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		List queryList = new ArrayList();
		if (processResult.hasRecord()) {
			queryList = (List) processResult.get("data");
		}
		return queryList;
	}

	public void runService(JSONObject request) throws Exception {
		JSONObject jsonObject = JsonHelper.getTrxObject(request);
		String custId = jsonObject.containsKey("custId") ? jsonObject.get(
				"custId").toString() : "";
		FtpUtil ftpUtil = new FtpUtil();
		try {
			String localPath = jsonObject.containsKey("localPath") ? jsonObject
					.getString("localPath") : "";
			String validate = jsonObject.containsKey("validate") ? jsonObject
					.getString("validate") : "";
			String backupPath = jsonObject.containsKey("backupPath") ? jsonObject
					.getString("backupPath") : "";
			String deleteOnSuccess = jsonObject.containsKey("deleteOnSuccess") ? jsonObject
					.getString("deleteOnSuccess") : "";

			String ip = jsonObject.containsKey("porcAddress") ? jsonObject
					.getString("porcAddress") : "";
			int port = jsonObject.containsKey("porcPort") ? jsonObject
					.getInt("porcPort") : 23;
			String ftpUser = jsonObject.containsKey("porcUserId") ? jsonObject
					.getString("porcUserId") : "";
			String ftpPwd = jsonObject.containsKey("porcPassword") ? jsonObject
					.getString("porcPassword") : "";
			String charset = jsonObject.containsKey("charset") ? jsonObject
					.getString("charset") : "utf-8";
			String remotePath = jsonObject.containsKey("remotePath") ? jsonObject
					.getString("remotePath") : "";// 每个企业的路径在申请接口时定义

			localPath = formatPath(localPath);
			remotePath = formatPath(remotePath);
			backupPath = formatPath(backupPath);

			localPath = localPath + File.pathSeparator + custId;// 每个客户下载到本地对应的目录下

			ftpUtil.connect(ip, port, ftpUser, ftpPwd, false, charset);
			ftpUtil.setBackupPath(backupPath);

			ftpUtil.retrieve(remotePath, localPath, validate,
					"true".equalsIgnoreCase(deleteOnSuccess));

		} catch (Exception e) {
			throw e;
		} finally {
			ftpUtil.disconnect();
		}
	}

	public String formatPath(String input) {
		if (StringUtil.isNotEmpty(input))
			return "";
		if (input.contains("$")) {
			String replaseField = input.substring(input.indexOf("$") + 1,
					input.lastIndexOf("$"));
			if ("sysdate".equalsIgnoreCase(replaseField)) {
				Date buDate = BuDateTimeUtil.getCurrentBuDate();
				String strSysdate = DateTimeUtil.parseDate(buDate, "yyyyMMdd");
				input = input.replace("$sysdate$", strSysdate);
				return input;
			} else {
				return input;
			}
		} else {
			return input;
		}
	}
}
