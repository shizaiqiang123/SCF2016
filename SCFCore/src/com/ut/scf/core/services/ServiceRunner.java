package com.ut.scf.core.services;

import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.log.APLogUtil;

@Component("serviceRunner")
@Scope("prototype")
public class ServiceRunner extends AbsServiceRunner{

	@Override
	public void runService(String serviceId, FuncDataObj logicDataObj) {
		ServicePara queryPara = new ServicePara();
		queryPara.setId(serviceId);
		queryPara = XMLParaParseHelper.parseFuncService(serviceId, getBu());

		try {
			JSONObject serviceData = processServiceJs(queryPara,logicDataObj.getReqData());
			if(!checkServiceEnable(serviceData)){
				return ;
			}
			
			IESBServiceRequest request = new ServiceRequestImpl();
			request.setRequestData(serviceData);
			request.setRequestPara(queryPara);
			request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
			request.setMethodName(queryPara.getMethodname());
			request.setRequestTarget(ESBServiceUtil.generateRequestEntity(queryPara));
			request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
			
			IESBServiceResponse processResult = serviceFactory.getProcessor(queryPara).runService(request);
			
			if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()) {
				
				FuncDataObj retData = (FuncDataObj) processResult.getResponseData();
				
				Object retObj = retData.getReturnObj();
				if(null != retObj && retObj.getClass().isAssignableFrom(Map.class)){
					JsonHelper.getTrxObject(logicDataObj.getReqData()).putAll((Map)retObj);
				}else{
					
				}
				processCallback(logicDataObj,queryPara.getOnsuccess());

				String gapiMsgId = queryPara.getGapiid();
				if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
					try{
						callGapiProcess(gapiMsgId,retData.getReturnObj(),serviceData,logicDataObj);
						// 通过GAPI发送过了，是否就可以不返回到前台了，或者是否需要增加属性控制是否返回到前台
					}catch(Exception e){
						APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
						logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
						logicDataObj.setRetInfo(retData.getRetInfo());
					}
				}else{
					logicDataObj.mergeResponse(retData);
				}
			}else{
				FuncDataObj retData = (FuncDataObj) processResult.getResponseData();
				
				processCallback(retData,queryPara.getOnfailed());
				
				logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
				logicDataObj.setRetInfo(retData.getRetInfo());
			}
		} catch (Exception e1) {
			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicDataObj.setRetInfo(e1.getMessage());
		}
	}

}
