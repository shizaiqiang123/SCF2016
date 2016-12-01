package com.ut.scf.core.services;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.utils.ApSessionUtil;

/**
 * @see 定义service的调用接口适配器，当需要实现具体service逻辑时，实现此方法
 * @see EDI，report
 * @see 实现 系统接口 --》 客户端方法之间的耦合
 * @author PanHao
 *
 */
public abstract class AbsServicesPostAdapter implements IServiceAdatper{

	@Override
	public void formatRequest(IESBServiceRequest request) {
		String method = request.getMethodName();
		if(StringUtil.isTrimNotEmpty(method)){
			request.setRequestType(method);
			return;
		}
		
		ApSessionContext context = ApSessionUtil.getContext();
		
		String reqType = context.getSysFuncType();

		String methodName ="" ;

		if (ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(reqType)) {
			methodName = "postMasterData";
		} else if (ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(reqType)) {
			methodName = "postPendingData";
		} else if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(reqType)) {
			methodName = "postReleaseData";
		} else if(ComponentConst.COMP_FUNC_TYPE_PARAMETER.equalsIgnoreCase(reqType)){
			methodName = "postMasterData";
		}else if(ComponentConst.COMP_FUNC_TYPE_DEL_PENDING.equalsIgnoreCase(reqType)){
			methodName = "postMasterData";
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(reqType)){
			methodName = "postPendingData";
		}else {
			methodName = "error";
		}
		request.setRequestType(methodName);
	}
	
	@Override
	public void formatResponse(IESBServiceResponse response) {
		
	}
}
