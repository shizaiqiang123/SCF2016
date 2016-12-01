package com.ut.scf.pro.component.logic;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.AbsTrxLogicManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoHelper;

@Component("updateLoan")
@Scope("prototype")
public class updateLoan extends AbsTrxLogicManager {

	protected BigDecimal invBal;// 应收账款余额
	protected BigDecimal struLoanAmt;// 冲销金额
	protected BigDecimal invLoanEbal;// 最大可融资金额
	protected Map<String, JSONObject> updataLoanM = new HashMap<String, JSONObject>();
	protected String loanId;

	@Resource(name = "trxEditRecord")
	protected ILogicComponent trxEditRecord;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		super.parseParameters(logicObj);
		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();
		JSONObject trxData = getDoTrxData(logicObj.getReqData(),
				currrentLogicObj.getDoname());// 抓取页面的所有数据
		if (super.isMultipleRecord(trxData)) {
			int totalRecords = getRecordCount(trxData);// 数据的总行数
			for (int j = 0; j < totalRecords; j++) {
				JSONObject pmtData = super.getTrxDom(trxData, j);

				queryinvcLoanByinvRef(pmtData);
			}
		}

		for (Entry<String, JSONObject> entry : updataLoanM.entrySet()) {
            updateLoan(entry.getValue());
        }
		return currentDataObj;
	}

	protected JSONObject getDoTrxData(JSONObject trxData, String doName) {
		JSONObject trxJsonData = trxData.containsKey("trxDom") ? trxData
				.getJSONObject("trxDom") : trxData;
		if (StringUtil.isTrimEmpty(doName))
			return trxJsonData;
		if (trxJsonData.containsKey(doName))
			return JsonUtil.getChildJson(trxJsonData, doName);
		return trxJsonData;
	}

	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return postData(logicObj);
//		JSONObject copyData = JsonUtil.clone((JSONObject) (logicObj
//				.getReqData()));
//		super.parseParameters(logicObj);
//		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();
//		JSONObject trxData = getDoTrxData(logicObj.getReqData(),
//				currrentLogicObj.getDoname());// 抓取页面的所有数据
//		if (super.isMultipleRecord(trxData)) {
//			int totalRecords = getRecordCount(trxData);// 数据的总行数
//			for (int j = 0; j < totalRecords; j++) {
//				JSONObject pmtData = super.getTrxDom(trxData, j);
//
//				queryinvcLoanByinvRef(pmtData);
//			}
//		}
//
//		for (Entry<String, JSONObject> entry : updataLoanM.entrySet()) {
//            updateLoan(entry.getValue());
//        }
//		currentDataObj.setReqData(copyData);
//		return currentDataObj;
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	private void queryinvcLoanByinvRefRe(JSONObject trxDate) throws Exception {
		String invcNo = trxDate.getString("invRef");// 这个获取到的是table的 invref值
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  InvcLoanM  a  where a.invRef = ?"; // 根据invcM表的invRef值查询invcLoanM表中对应的记录并按到期日升序
		node.setParams(invcNo);
		node.setSql(sql);
		node.setAsc("Y");
		node.setOrderby("loanDueDt");
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {// 当查询结果有值，即融资子表有记录
			List invcLoanList = (ArrayList) processResult.getData().get("data");
			for (int i = 0; i < invcLoanList.size(); i++) {// 循环融资子表
				JSONObject dataDom = JsonUtil.getJSON(invcLoanList.get(i));// dataDom为每条融资子表记录
				updateinvcLoan(dataDom);
				loanId = dataDom.get("invcLoanId").toString();
//				if(updataLoanM.containsKey(loanId)){
//					//汇总同一笔融资下的融资余额
//					BigDecimal invLoanBal =((BigDecimal) updataLoanM.get(loanId).get("ttlLoanBalHD")).add(struLoanAmt);
//					updataLoanM.get(loanId).put("ttlLoanBal",invLoanBal);
//				}else{
//					updataLoanM.put(loanId, queryinvcByloanId(dataDom,loanId));
//				}
				queryinvcByloanIdRe(dataDom, dataDom.get("invcLoanId")
						.toString());
			}
		}
	}

	/*
	 * 查询并且更新融资子表
	 */
	private void queryinvcLoanByinvRef(JSONObject trxDate) throws Exception {
		String invcNo = trxDate.getString("invRef");// 这个获取到的是table的 invref值
		struLoanAmt = new BigDecimal(trxDate.get("struLoanAmt").toString());// 得到每笔数据的冲销金额
		invBal = new BigDecimal(trxDate.get("invBal").toString());
		invLoanEbal = new BigDecimal(trxDate.get("invLoanAval").toString()); //得到页面上的最大可融资金额
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  InvcLoanM  a  where a.invRef = ?"; // 根据invcM表的invRef值查询invcLoanM表中对应的记录并按到期日升序
		node.setParams(invcNo);
		node.setSql(sql);
		node.setAsc("Y");
		node.setOrderby("loanDueDt");
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		
		BigDecimal struLoanAmtHd = struLoanAmt;//每还一笔同发票的融资余额，就要减去该笔发票该次融资的融资余额
		if (processResult.hasRecord()) {// 当查询结果有值，即融资子表有记录(同一笔发票不同的loanid)
			List invcLoanList = (ArrayList) processResult.getData().get("data");
			for (int i = 0; i < invcLoanList.size(); i++) {// 循环融资子表
				JSONObject dataDom = JsonUtil.getJSON(invcLoanList.get(i));// dataDom为每条融资子表记录
				dataDom.put("invBal", invBal);// 将dataDom中的“应收账款余额”更新
//				dataDom.put("invLoanEbal",((new BigDecimal(dataDom.get("invLoanEbal").toString())).add(struLoanAmt)));// 更新最大融资余额直接拿页面上的。
				dataDom.put("invLoanEbal", invLoanEbal);
				BigDecimal flag = new BigDecimal(0);
				if (struLoanAmtHd.compareTo(new BigDecimal(dataDom.get("invLoanBal").toString())) > 0) {
					dataDom.put("invLoanBal", flag);
					struLoanAmtHd = struLoanAmtHd.subtract(new BigDecimal(dataDom.get("invLoanBal").toString()));
				} else {
					dataDom.put("invLoanBal",new BigDecimal(dataDom.get("invLoanBal").toString()).subtract(struLoanAmtHd));
				}
				updateinvcLoan(dataDom);
				loanId = dataDom.get("invcLoanId").toString();
				if(updataLoanM.containsKey(loanId)){
					//汇总同一笔融资下的融资余额
//					String ttlLoanBalHD = updataLoanM.get(loanId).get("ttlLoanBal").toString();
//					System.out.println(ttlLoanBalHD);
//					BigDecimal test = new BigDecimal(ttlLoanBalHD);
					BigDecimal invLoanBal = new BigDecimal(updataLoanM.get(loanId).get("ttlLoanBal").toString()).subtract(struLoanAmt);
					updataLoanM.get(loanId).put("ttlLoanBal",invLoanBal);
				}else{
					updataLoanM.put(loanId, queryinvcByloanId(dataDom,loanId));
				}
			}
		}
	}

	private void updateinvcLoan(JSONObject dataDom) throws Exception {
		context = ApSessionUtil.getContext();
		FuncDataObj logicDataObj = new FuncDataObj();
		// JSONObject trxData = JsonHelper.getTrxObject(dataDom);
		logicDataObj.setReqData(dataDom);
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("TRX.INVC_LOAN_M");// 对于TRX.INVC_LOAN_E表进行更新
		mainLogic.setCascadeevent("Y");// 设置是否级联
		logicDataObj.setReqParaObj(mainLogic);
		logicDataObj.setFuncType(context.getSysFuncType());
		FuncDataObj obj = new FuncDataObj();
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(context
				.getSysFuncType())) {
			obj = trxEditRecord.postData(logicDataObj);
		} else if (ComponentConst.COMP_FUNC_TYPE_RELEASE
				.equalsIgnoreCase(context.getSysFuncType())) {
			obj = trxEditRecord.releaseData(logicDataObj);
		}
		currentDataObj.mergeResponse(obj);
		// daoHelper.execUpdate(obj);
	}

	/*
	 * 查询融资表并更新
	 */
	private JSONObject queryinvcByloanId(JSONObject trxDate, String invcLoanId)
			throws Exception {
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  LoanM  a  where a.sysRefNo = ?"; // 根据invcloanM表融资编号值查询LoanM表中对应的记录
		node.setParams(invcLoanId);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {// 当查询结果有值，即融资表有记录
			// 融资子表对应的融资表就一条数据
			JSONObject loaninfo = JsonUtil.getJSON(processResult.getData().get("data"));
			loaninfo.put("ttlLoanBal",(new BigDecimal(processResult.get("ttlLoanBal").toString())).subtract(struLoanAmt));// 更新可融资余额
			return loaninfo;
//			updateLoan(loaninfo);
		}
		return null;
	}

	private void queryinvcByloanIdRe(JSONObject trxDate, String invcLoanId)
			throws Exception {
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  LoanM  a  where a.sysRefNo = ?"; // 根据invcloanM表融资编号值查询LoanM表中对应的记录
		node.setParams(invcLoanId);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {// 当查询结果有值，即融资表有记录
			// 融资子表对应的融资表就一条数据
			JSONObject loaninfo = JsonUtil.getJSON(processResult.getData().get(
					"data"));
			updateLoan(loaninfo);
		}
	}

	private void updateLoan(JSONObject dataDom) throws Exception {
		context = ApSessionUtil.getContext();
		FuncDataObj logicDataObj = new FuncDataObj();
		// JSONObject trxData = JsonHelper.getTrxObject(dataDom);
		logicDataObj.setReqData(dataDom);
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("TRX.LOAN_M");// 对于TRX.INVC_LOAN_E表进行更新
		mainLogic.setCascadeevent("Y");// 设置是否级联
		logicDataObj.setReqParaObj(mainLogic);
		logicDataObj.setFuncType(context.getSysFuncType());
		FuncDataObj obj = new FuncDataObj();
		if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(context
				.getSysFuncType())) {
			obj = trxEditRecord.postData(logicDataObj);
		} else if (ComponentConst.COMP_FUNC_TYPE_RELEASE
				.equalsIgnoreCase(context.getSysFuncType())) {
			obj = trxEditRecord.releaseData(logicDataObj);
		}
		currentDataObj.mergeResponse(obj);
		// daoHelper.execUpdate(obj);
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
/**
 * =======================测试验证=======================
 * 主表更新ttlLoanBal字段正确成功进入E表和复核后进入M表
 * 但是申请时E表状态直接为M并不为E。
 * 子表更新invBal字段正确，更新invLoanBal字段正确
 * 子表同时更新了invLoanEbal字段，为可融资余额字段，直接取页面上的值。
 */
