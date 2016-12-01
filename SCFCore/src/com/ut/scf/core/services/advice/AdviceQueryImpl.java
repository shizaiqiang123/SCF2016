package com.ut.scf.core.services.advice;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.services.AbsServiceQueryAdapter;
import com.ut.scf.core.services.IServiceQuery;
import com.ut.scf.core.utils.ApSessionUtil;

@Component("queryAdvice")
public class AdviceQueryImpl extends AbsServiceQueryAdapter{
	//queryAdviceList 查询客户端list
	//queryServiceList 查询交易中Advice 定义list
	//queryAdvice 查询客户端具体某一条通知
	//viewServiceData 查询交易中advice的具体定义
	
	@Override
	public void formatRequest(IESBServiceRequest request) {
		String method = request.getMethodName();
		if(StringUtil.isTrimNotEmpty(method)){
			request.setRequestType(method);
			return;
		}
		
		JSONObject reqData = (JSONObject) request.getRequestData();
		JSONObject trxObj = JsonHelper.getTrxObject(reqData);
		String queryType = trxObj.containsKey("queryType")?trxObj.getString("queryType"):"";
		String methodName ="" ;
		
		if(StringUtil.isTrimEmpty(queryType)){
			ApSessionContext context = ApSessionUtil.getContext();
			String currentFuncTp = context.getSysFuncType();
			if(ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(currentFuncTp)){
				queryType = IServiceQuery.SERVICE_QUERY_TYPE_PREVIEW;
			}else if(ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(currentFuncTp)){
				queryType = IServiceQuery.SERVICE_QUERY_TYPE_PREVIEW;
			}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(currentFuncTp)){
				queryType = IServiceQuery.SERVICE_QUERY_TYPE_PREVIEW;
			}else{
				queryType = IServiceQuery.SERVICE_QUERY_TYPE_VIEW;
			}
		}

		if (IServiceQuery.SERVICE_QUERY_TYPE_LIST.equalsIgnoreCase(queryType)) {
			methodName = "queryServiceList";
		} else if (IServiceQuery.SERVICE_QUERY_TYPE_PREVIEW.equalsIgnoreCase(queryType)) {
			methodName = "perViewServiceData";
		} else if (IServiceQuery.SERVICE_QUERY_TYPE_VIEW.equalsIgnoreCase(queryType)) {
			methodName = "viewServiceData";
		}else if (IServiceQuery.SERVICE_QUERY_TYPE_COUNT.equalsIgnoreCase(queryType)) {
			methodName = "queryServiceCount";
		}else if ("queryAdviceList".equalsIgnoreCase(queryType)) {
			methodName = "queryAdviceList";
		}else if ("queryAdvice".equalsIgnoreCase(queryType)) {
			methodName = "queryAdvice";
		} else {
			methodName = "error";
		}
		request.setRequestType(methodName);
	}
}
