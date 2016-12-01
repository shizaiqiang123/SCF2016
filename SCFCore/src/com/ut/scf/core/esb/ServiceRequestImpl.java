package com.ut.scf.core.esb;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.AbsObject;
import com.ut.scf.core.data.FuncDataObj;

public class ServiceRequestImpl implements IESBServiceRequest {
	private static final long serialVersionUID = -509902190227503326L;
	private String requestType;
	private Object reqData;
	private AbsObject reqPara;
	private IESBServiceEntity reqTarget;
	private IESBServiceEntity requestSource;
	private String requestId;
	private String methodName;

	@Override
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	@Override
	public String getRequestType() {
		return requestType;
	}

	@Override
	public void setRequestData(Object data) {
		this.reqData = data;
	}

	@Override
	public Object getRequestData() {
		return reqData;
	}

	@Override
	public void setRequestTarget(IESBServiceEntity para) {
		this.reqTarget = para;
	}

	@Override
	public IESBServiceEntity getRequestTarget() {
		return reqTarget;
	}

	@Override
	public void setRequestSource(IESBServiceEntity source) {
		this.requestSource = source;
	}

	@Override
	public IESBServiceEntity getRequestSource() {
		return requestSource;
	}

	@Override
	public String getRequestId() {
		return this.requestId;
	}

	@Override
	public void setRequestId(String id) {
		this.requestId = id;
	}

	@Override
	public void setRequestPara(AbsObject para) {
		this.reqPara = para;
	}

	@Override
	public AbsObject getRequestPara() {
		return reqPara;
	}

	@Override
	public void merageResponse(IESBServiceResponse response) {
//		String serviceTp = reqTarget.getServiceId();
//		int result = response.getResponseResult();
//		Map responseData = new HashMap<>();
//		if(IESBServiceResponse.ESB_SERVICE_RESULT_ERROR==result){
//			responseData.put("result", result);
//			responseData.put("ErrorMsg", response.getResponseData());
//		}else if(IESBServiceResponse.ESB_SERVICE_RESULT_EXCEPTION==result){
//			responseData.put("result", result);
//			responseData.put("ErrorMsg", response.getResponseData());
//		}else{
//			responseData.put("result", result);
//			FuncDataObj funcData = (FuncDataObj) response.getResponseData();
//			Object data=funcData.getReturnObj();
//			
//			responseData.putAll((Map) data);
//		}
//		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
//		trxObj.putAll(responseData);
	}

	@Override
	public void setMethodName(String methodName) {
		this.methodName = methodName;
	}

	@Override
	public String getMethodName() {
		return methodName;
	}
}
