package com.ut.scf.core.services.message;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.services.AbsESBServiceImpl;

@Service("messageServiceImpl")
public class MessageServiceImpl extends AbsESBServiceImpl{

	
	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:"+getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		super.getLogger().debug("destroy service success.");
	}


	@Override
	public String getServiceId() {
		return "Message";
	}

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception {
		// TODO Auto-generated method stub
		return super.runService(request);
	}

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		ServiceResponseImpl retObj = new ServiceResponseImpl();
		JSONObject reqData = logicObj.getReqData();
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		SMSServer server=new SMSServer();
		try{
		  server.service("号码："+trxObj.get("phone_number").toString()+";短信内容："+trxObj.getString("message_content").toString());
		  logicObj.setRetStatus("success");
		}catch(Exception e){
			logicObj.setRetStatus("exception");
			logicObj.setRetInfo(e.getMessage());
			retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_EXCEPTION);
		}
		retObj.setResponseData(logicObj);
		retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS);
		
	}
	
	public void sendContent(FuncDataObj logicObj) throws Exception {
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		JSONObject reqData = logicObj.getReqData();
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		SMSServer server=new SMSServer();
		server.service("号码："+trxObj.get("phone_number").toString()+";短信内容："+trxObj.getString("message_content").toString());
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
		ServiceResponseImpl retObj = new ServiceResponseImpl();
		JSONObject reqData = dataObj.getReqData();
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		SMSServer server=new SMSServer();
		try{
		  server.service("号码："+trxObj.get("phone_number").toString()+";短信内容："+trxObj.getString("message_content").toString());
		  dataObj.setRetStatus("success");
		}catch(Exception e){
			dataObj.setRetStatus("exception");
			dataObj.setRetInfo(e.getMessage());
			retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_EXCEPTION);
		}
		retObj.setResponseData(dataObj);
		retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS);
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
