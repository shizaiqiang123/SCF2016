package com.ut.scf.core.component.query;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;

@Service("esbServiceQueryImpl")
public class ESBQueryImpl implements IQueryComponent{
	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	@Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;

	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
//		ServicePara queryPara = XMLParaParseHelper.parseFuncService(servicePara.getId(),context.getSysBusiUnit());
		QueryNode node = (QueryNode) logicObj.getReqParaObj();
		
		ServicePara queryPara = new ServicePara();
		queryPara.setType(node.getTablename());
//		JSONObject serviceData = processServiceJs(queryPara,JsonUtil.clone(logicObj.getReqData()));
		
		IESBServiceRequest request = new ServiceRequestImpl();
		
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
		request.setRequestData(logicObj.getReqData());
		request.setRequestPara(queryPara);
		try {
			request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
			request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
			
			IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);
			if(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()){
				FuncDataObj retData = (FuncDataObj) processResult.getResponseData();
				logicObj.mergeResponse(retData);
			}else{
				String retData = processResult.getResponseData().toString();
				logicObj.setRetStatus(FuncDataObj.EXCEPTION);
				logicObj.setRetInfo(retData);
			}
		} catch (Exception e) {
			logicObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicObj.setRetInfo(e.getMessage());
		}
		return logicObj;
	}

}
