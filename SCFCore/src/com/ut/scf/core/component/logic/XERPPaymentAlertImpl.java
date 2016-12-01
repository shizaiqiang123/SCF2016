package com.ut.scf.core.component.logic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.sql.Update;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoHelper;

import net.sf.json.JSONObject;

@Component("xERPPaymentAlertImpl")
public class XERPPaymentAlertImpl implements ILogicFlowComponent {

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		JSONObject reqData = logicObj.getReqData();
		Map retData = new HashMap();
		Map dataMap = new HashMap();
		FuncDataObj retFuncDataObj = new FuncDataObj();
		boolean bl = select(reqData, retFuncDataObj, dataMap);
		if (bl) {
			double amount = JsonHelper.getTrxObject(reqData).getDouble("amount");
			double arBal = (Double) dataMap.get("arBal");
			double openLoanAmt = (Double) dataMap.get("openLoanAmt");
			double loanPerc = (Double) dataMap.get("loanPerc");
			double arAvalLoan = (Double) dataMap.get("arAvalLoan");
			String cntrctNo = (String) dataMap.get("cntrctNo");
			double temp = (arBal - amount) * (loanPerc / 100);
			if (temp > openLoanAmt) {
				update(arAvalLoan, arBal, amount, loanPerc, cntrctNo);
				retData.put("retCode", "0");
				retData.put("retMsg", "");
			} else {
				retData.put("retCode", "1");
				retData.put("retMsg", "额度不足");
			}
			retFuncDataObj.buildRespose(retData);
			;
		}
		return retFuncDataObj;
	}

	void update(double arAvalLoan, double arBal, double amount, double loanPerc, String cntrctNo) {
		arBal = arBal - amount;
		arAvalLoan = arAvalLoan - amount * loanPerc / 100;
		FuncDataObj dataObj = new FuncDataObj();
		String hql = "update CntrctM set arBal=?,arAvalLoan=? where sysRefNo=?";
		QueryNode queryNode = new QueryNode();
		queryNode.setSql(hql);
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
		String paras = new StringBuffer().append(arBal).append(",").append(arAvalLoan).append(",").append(cntrctNo)
				.toString();
		queryNode.setParams(paras);
		dataObj.setReqParaObj(queryNode);
		// dataObj.setReqData(reqData);
		dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
		daoHelper.execUpdate(dataObj);
	}

	boolean select(JSONObject reqData, FuncDataObj retFuncDataObj, Map dataMap) {
		Map retData = new HashMap();
		FuncDataObj dataObj = new FuncDataObj();
		String accNo = (String) JsonHelper.getTrxObject(reqData).get("acNo");
		String buyerAcNo = (String) JsonHelper.getTrxObject(reqData).get("buyerAcNo");
		String hql = "select id.loanPerc,id.openLoanAmt,id.arAvalLoan,id.arBal,id.cntrctNo from CntrctWarning c where id.buyerAcNo=? and id.acNo=?";
		QueryNode queryNode = new QueryNode();
		queryNode.setSql(hql);
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
		String paras = new StringBuffer().append(buyerAcNo).append(",").append(accNo).toString();
		queryNode.setParams(paras);
		dataObj.setReqParaObj(queryNode);
		dataObj.setReqData(reqData);
		dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
		daoHelper.execQuery(dataObj);
		List<Object[]> obj = (List<Object[]>) dataObj.get(dataObj.getDoName());
		if (obj.size() == 1) {
			dataMap.put("loanPerc", obj.get(0)[0]);
			dataMap.put("openLoanAmt", obj.get(0)[1]);
			dataMap.put("arAvalLoan", obj.get(0)[2]);
			dataMap.put("arBal", obj.get(0)[3]);
			dataMap.put("cntrctNo", obj.get(0)[4]);
			return true;
		} else if (obj.size() == 0) {
			retData.put("retCode", "0");
			retData.put("retMsg", "协议不存在");
			retFuncDataObj.buildRespose(retData);
			return false;
		} else {
			retData.put("retCode", "1");
			retData.put("retMsg", "协议重复");
			retFuncDataObj.buildRespose(retData);
			;
			return false;
		}
	}

}
