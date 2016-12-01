package com.ut.scf.core.services.advice;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.services.AbsServicesPostAdapter;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("adviceAdapter")
public class AdviceServicePostImpl extends AbsServicesPostAdapter{
	
	@Override
	public void formatRequest(IESBServiceRequest request) {
		JSONObject reqData = (JSONObject) request.getRequestData();
		
		JSONObject funcData = JsonHelper.getFuncObject(reqData);
		String isFromSTP = isFromSTP(funcData);
		if("Y".equalsIgnoreCase(isFromSTP)){
			request.setRequestType("postMasterData");
		}else{
			super.formatRequest(request);
		}
	}

	private String isFromSTP(JSONObject funcData) {
		return "Y";
	}
	
}
