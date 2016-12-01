package com.ut.scf.core.services;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.utils.ApSessionUtil;

@Component("functionServiceRunner")
@Scope("prototype")
public class FunctionServiceRunner extends AbsServiceRunner{

	@Override
	public void runService(String serviceId, FuncDataObj logicDataObj) {
		ServicePara servicepara = checkServiceIdByFunc(serviceId,logicDataObj);
		if(null==servicepara){
			return;
		}else{
			try {
				JSONObject serviceData = processServiceJs(servicepara,logicDataObj.getReqData());
				if(!checkServiceEnable(serviceData)){
					return;
				}
				
				IESBServiceRequest request = new ServiceRequestImpl();
				
				request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
				request.setRequestData(serviceData);
				request.setRequestPara(servicepara);
				request.setRequestTarget(ESBServiceUtil.generateRequestEntity(servicepara));
				request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
				
				IESBServiceResponse processResult = serviceFactory.getProcessor(servicepara).runService(request);
				if(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()){
					FuncDataObj retData = (FuncDataObj) processResult.getResponseData();
					
					JsonHelper.getTrxObject(logicDataObj.getReqData()).putAll((Map) retData.getReturnObj());
					
					String gapiMsgId = servicepara.getGapiid();
					if(StringUtil.isTrimNotEmpty(gapiMsgId)){
						callGapiProcess(gapiMsgId,retData.getReturnObj(),serviceData,logicDataObj);
					}else{
						logicDataObj.mergeResponse(retData);
					}
				}else{
					String retData = processResult.getResponseData().toString();
					logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
					logicDataObj.setRetInfo(retData);
				}
			} catch (Exception e) {
				logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
				logicDataObj.setRetInfo(e.getMessage());
			}
		}
	}
	
	public ServicePara checkServiceIdByFunc(String serviceId,FuncDataObj logicDataObj){
		ApSessionContext context = ApSessionUtil.getContext();
		FunctionPara functPara  = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		if("RE".equalsIgnoreCase(functPara.getFunctype())||"FP".equalsIgnoreCase(functPara.getFunctype())||"DP".equalsIgnoreCase(functPara.getFunctype()))
			functPara =  (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		List<ServicePara> allServices = functPara.getServiceList();
		
		if(allServices==null||allServices.size()<1){
			
			allServices = functPara.getBfServiceList();
			
			if(allServices==null||allServices.size()<1){
				logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
				logicDataObj.setRetInfo("No service find in currently function :"+functPara.getId()+" service type:"+serviceId);
				return null;
			}
		}else{
			if(functPara.getBfServiceList()!=null)
				allServices.addAll(functPara.getBfServiceList());
		}
		
		for (ServicePara servicePara : allServices) {
			if(serviceId.equalsIgnoreCase(servicePara.getId())){
				XMLParaParseHelper.parseFuncService(servicePara,context.getSysBusiUnit());
				return servicePara;
			}
		}
		logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
		logicDataObj.setRetInfo("No service find in currently function :"+functPara.getId()+" service type:"+serviceId);
		return null;		
	}

}
