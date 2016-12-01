package com.ut.scf.pro.component.logic;

import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.scf.core.component.AbsTrxLogicManager;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.orm.trx.CntrctM;
import com.ut.scf.orm.trx.InvcM;

@Component("checkInvcStatus")
@Scope("prototype")
public class CheckInvcStatus extends AbsTrxLogicManager{
	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		
		checkSingleCntrct(logicObj);
		currrentLogicObj = (LogicNode) logicObj.getReqParaObj();
		JSONObject trxData = getDoTrxData(logicObj.getReqData(),currrentLogicObj.getDoname());
		if(super.isMultipleRecord(trxData)){
			int totalRecords = getRecordCount(trxData);
			for (int j = 0; j <totalRecords; j++) {
				JSONObject invoiceData = super.getTrxDom(trxData, j);
				checkSingleInvoice(invoiceData);
			}
		}else{
			checkSingleInvoice(trxData);
		}
		
		return null;
	}
	
	protected void checkSingleInvoice(JSONObject invoiceData) throws SCFThrowableException{
		String sysTrxSts="";
		String invcNo="";
		String sysRefNo = invoiceData.getString("invRef");
		Object nextOp = invoiceData.get("sysNextOp");
		if(nextOp!=null&&"delete".equalsIgnoreCase(nextOp.toString())){
			return ;
		}
		LogicNode node=(LogicNode)currentDataObj.getReqParaObj();
		String strTableName = node.getTablename();
		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName ), "Miss process table name.");
		
		//不推荐这么些
		String sql=" from InvcM where sysRefNo = '" +sysRefNo+ "'";
		List<InvcM> obj =  (List<InvcM>) daoExecHelper.execQuery(sql);
		if(!obj.isEmpty()){			
			for (InvcM per:obj) {
				sysTrxSts=per.getSysTrxSts();
				String sysLockFlag = per.getSysLockFlag();
				invcNo=per.getInvNo();
				if("P".equalsIgnoreCase(sysTrxSts)){
					SCFThrowableException e = new SCFThrowableException("应收账款编号为"+invcNo+"的应收账款已融资或还款。");
					throw e;
				}
				if(!"RE".equalsIgnoreCase(super.currentDataObj.getFuncType())){
					if("T".equalsIgnoreCase(sysLockFlag)){
						SCFThrowableException e = new SCFThrowableException("应收账款编号为"+invcNo+"的应收账款在途修改，禁止使用。");
						throw e;
					}
				}
			}
		}
	}
	
	protected void checkSingleCntrct(FuncDataObj logicObj) throws SCFThrowableException{
		String sysTrxSts="";
		String cntrctNo="";
		String sysRefNo = logicObj.getReqData().getString("cntrctNo");
		Object nextOp = logicObj.get("sysNextOp");
		if(nextOp!=null&&"delete".equalsIgnoreCase(nextOp.toString())){
			return ;
		}
//		LogicNode node=(LogicNode)currentDataObj.getReqParaObj();
//		String strTableName = node.getTablename();
//		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName ), "Miss process table name.");
		
		//不推荐这么写
		String sql=" from CntrctM where sysRefNo = '" +sysRefNo+ "'";
		List<CntrctM> obj =  (List<CntrctM>) daoExecHelper.execQuery(sql);
		if(!obj.isEmpty()){			
			for (CntrctM per:obj) {
				sysTrxSts=per.getSysTrxSts();
				String sysLockFlag = per.getSysLockFlag();
				cntrctNo=per.getCntrctNo();
				if("P".equalsIgnoreCase(sysTrxSts)){
					SCFThrowableException e = new SCFThrowableException("协议编号为"+cntrctNo+"的协议被锁定");
					throw e;
				}
				if(!"RE".equalsIgnoreCase(super.currentDataObj.getFuncType())&&!"FP".equalsIgnoreCase(super.currentDataObj.getFuncType())){
					if("T".equalsIgnoreCase(sysLockFlag)){
						SCFThrowableException e = new SCFThrowableException("协议编号为"+cntrctNo+"的协议被锁定");
						throw e;
					}
				}
			}
		}
	}
	
	protected JSONObject getDoTrxData(JSONObject trxData, String doName){
		JSONObject trxJsonData = trxData.containsKey("trxDom")?trxData.getJSONObject("trxDom"):trxData;
		if(StringUtil.isTrimEmpty(doName))
			return trxJsonData;
		if(trxJsonData.containsKey(doName))
			return JsonUtil.getChildJson(trxJsonData, doName);
		return trxJsonData;
	}
	
	@Override
	public FuncDataObj inqData(FuncDataObj logicObj) throws Exception {
		return null;
	}
	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return postData(logicObj);
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return postData(logicObj);
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return postData(logicObj);
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		return postData(logicObj);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
