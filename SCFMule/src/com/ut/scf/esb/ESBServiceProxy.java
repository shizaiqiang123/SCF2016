package com.ut.scf.esb;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.mule.MuleServicesManagerControl;

@Component("esbServiceProxy")
public class ESBServiceProxy extends AbsESBServiceImpl{
	@Resource(name="muleServicesManagerControl")  
	MuleServicesManagerControl muleServicesManagerControl; 

//	@Override
//	public Object runService(Object requestData) {
//		IMuleServiceRequest sendMssageRequest = muleServicesManagerControl.createSendMessageRequest();
//		sendMssageRequest.setRequestProtocol(serviceObj.getServiceProtocol());
//		sendMssageRequest.setRequestMessageBody((IGAPIMsgRequest) requestData);
//		
//		return muleServicesManagerControl.sendMessage(sendMssageRequest);
//	}

	@Override
	public String getServiceId() {
		return null;
	}

	@Override
	public void initialize() {
		
	}

	@Override
	public void destroy() {
		
	}

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		// TODO Auto-generated method stub
		
	}


}
