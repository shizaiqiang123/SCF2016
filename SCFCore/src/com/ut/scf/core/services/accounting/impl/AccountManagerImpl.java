package com.ut.scf.core.services.accounting.impl;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.js.IServerSideJs;

@Service("accountingManager")
public class AccountManagerImpl implements IAccountingManager{
	@Resource(name="accountingJsEngine")
	IServerSideJs jsEngine;
	
	@Override
	public Object getData(Object data) throws Exception {
		FuncDataObj reqFuncData = (FuncDataObj) data;
		
//		IESBServiceRequest requestObj = (IESBServiceRequest) data;
		
		JSONObject reqData = reqFuncData.getReqData();
		
		JSONObject funcObj = JsonHelper.getFuncObject(reqData);
		
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		
		JSONObject userObj = JsonHelper.getUserObject(reqData);
		
		ServicePara accountingPara = (ServicePara) reqFuncData.getReqParaObj();
		
		jsEngine.initTrxData(reqData);
		
		try {
			jsEngine.executeJsFile(accountingPara.getServicejs());
			Object retObj = jsEngine.getTrxData();
			reqFuncData.buildRespose(retObj);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		
		return reqFuncData;
	}
	
	@Resource(name = "accountDaoImpl")
	private AccountingDaoImpl daoImpl ;

	@Override
	public Object postData(Object data) {
		IESBServiceRequest requestObj = (IESBServiceRequest) data;
		
		FuncDataObj funcData = (FuncDataObj) requestObj.getRequestData();
		
		JSONObject reqData = funcData.getReqData();
		
		JSONObject funcObj = JsonHelper.getFuncObject(reqData);
		
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		
		JSONObject userObj = JsonHelper.getUserObject(reqData);
		
		PagePara pagePara = (PagePara) requestObj.getRequestTarget();
		
//		jsEngine.initTrxData(reqData);
//		
//		jsEngine.executeJsFile(pagePara.getAccountingjs());
//		
//		Object retObj = jsEngine.getTrxData();
		
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData(reqData);
		logicObj.setReqParaObj(pagePara);
		
		IESBServiceResponse retObj = new ServiceResponseImpl();
		try {
			logicObj = daoImpl.releaseData(logicObj);
			logicObj.buildRespose();
		} catch (Exception e) {
			e.printStackTrace();
			logicObj.setRetStatus("exception");
			logicObj.setRetInfo(ErrorUtil.getErrorStackTrace(e));
		}
		retObj.setResponseData(logicObj);
		retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS);
		return retObj;
	}

	@Override
	public Object releaseData(Object data) {
		return null;
	}

	@Override
	public Object cancelPost(Object data) {
		IESBServiceResponse retReswponse = new ServiceResponseImpl();
		retReswponse.setResponseData(null);
		retReswponse.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS);
		return retReswponse;
	}

	@Override
	public Object cancelRelease(Object data) {
		return null;
	}

	@Override
	public Object checkBanlance(Object data) {
		return null;
	}
	
	public void callLogicFlow(JSONObject trxData) throws SCFThrowableException {
//		boolean isMult = isMultipleRecord(trxData);
//		FuncDataObj processResult = new FuncDataObj();
//		if(isMult){
//			int totalRecords = trxData.getInt("_total_rows");
//			for (int j = 0; j <totalRecords; j++) {
//				JSONObject retTrxData = getTrxDom(trxData,j);
//
//				currentDataObj.setReqData(processMappingField(retTrxData));
//				
//				resetEventTimes();
//				
//				processResult.mergeResponse(execPostData());
//
//				processResult.mergeResponse(afterPostData());
//				
//			}
//		}else{
//			trxData = processMappingField(trxData);
//			currentDataObj.setReqData(trxData);
//			
//			resetEventTimes();
//			
//			processResult.mergeResponse(execPostData());
//
//			processResult.mergeResponse(afterPostData());
//		}
//		
//		return processResult;
	}
	
	public void callSingleLogic(LogicNode logicFlow) throws SCFThrowableException{

//		ILogicComponent t =null;
//		try {
//			FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
//			t = ClassLoadHelper.getBusiComponetProcessor(logicFlow.getComponent() );
//			
//			JSONObject retData = JsonHelper.getTrxObject(dataObj.getReqData(), logicFlow.getDoname());
//			dataObj.setReqParaObj(logicFlow);
//			
//			dataObj.setReqData(retData);
//			FuncDataObj processResult = doProcessLogicFlow(t, dataObj);
//			if (hasThrowableError(processResult)) {
//				throw new SCFThrowableException("");
//			}
//			logicDataObj.mergeResponse(processResult);
//		} catch (SCFThrowableException se) {
//			t.rollback(logicDataObj);
//			throw se;
//		} catch (Exception e) {
//			t.rollback(logicDataObj);
//			e.printStackTrace();
//		}
	}

}
