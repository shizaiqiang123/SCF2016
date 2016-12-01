package com.ut.scf.core.component.main.impl.beans;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.AbsTrxMainCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBFactory;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;

@Component("trxAccountingManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxAccountingManagerBean extends AbsTrxMainCompManager{
	@Resource(name="esbContextListener")
	IESBFactory factory;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		FuncDataObj funcData = (FuncDataObj) paraDom;
		parseParameters(funcData.getReqData());		
		
		ServicePara service  =new ServicePara();
		service.setType("Accounting");
		
		IESBServiceRequest request = new ServiceRequestImpl();
		
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_POST);
		request.setRequestData(paraDom);
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(service));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
		
		IESBServiceResponse retObj = ESBServiceUtil.getESBRunner().runService(request);
		
		return retObj.getResponseData();
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		parseParameters(paraDom);		
		ServicePara service  =new ServicePara();
		service.setName("Accounting");
		service.setType("Accounting");
		service.setId("ESBS000001");
		service.setServicejs(pagePara.getAccountingjs());
		
		IESBServiceRequest request = new ServiceRequestImpl();
		
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
		request.setRequestData(paraDom);
		request.setRequestPara(service);
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(service));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
		
		IESBServiceResponse retObj = ESBServiceUtil.getESBRunner().runService(request);
		super.logicDataObj = (FuncDataObj) retObj.getResponseData();
		
		return logicDataObj.buildReturnRespose("Ajax");
	}

	@Override
	protected void checkTransactionStatus(String strTrxType, String strTrxSts) throws Exception {
		
	}

	@Override
	protected void checkQueryResult() throws Exception {
		
	}

	@Override
	protected void setFuncType() {
		
	}

	@Override
	protected void setTrxType() {
		
	}

	@Override
	public String setStrLockTable() {
		return null;
	}

	@Override
	protected boolean isNeedLoackTransaction() {
		return false;
	}

	@Override
	protected boolean isNeedQueryTransaction() {
		return false;
	}

	@Override
	protected void resetEventTimes() {
		
	}

	@Override
	protected FuncDataObj doProcessLogicFlow(ILogicComponent t, FuncDataObj dataObj) throws Exception {
		String trxType = super.context.getStrTrxType();
		if(ComponentConst.COMP_TRX_TYPE_QUERY.equalsIgnoreCase(trxType)){
			return t.inqData(dataObj);
		}else if(ComponentConst.COMP_TRX_TYPE_SUBMIT.equalsIgnoreCase(trxType)){
			return t.postData(dataObj);
		}else{
			return null;
		}
	}

	@Override
	protected boolean checkFuncService(ServicePara service) {
		return false;
	}

}
