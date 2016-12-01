package com.ut.scf.core.services;

import net.sf.json.JSONObject;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.utils.ApSessionUtil;

/**
 * @see 定义service的查询接口适配器，当service需要提供查询功能时，实现此方法
 * @see EDI,Report
 * @author PanHao 待优化，从ESB接口进入查询
 *
 */
public abstract class AbsServiceQueryAdapter implements IServiceAdatper {
	
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
		}else if (IServiceQuery.SERVICE_QUERY_TYPE_SEND.equalsIgnoreCase(queryType)) {
			methodName = "viewServiceData";
		} else {
			methodName = "error";
		}
		request.setRequestType(methodName);
	}
	
	@Override
	public void formatResponse(IESBServiceResponse response) {
		
	}
}
