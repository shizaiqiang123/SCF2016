package com.ut.scf.core.services;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.IServiceComponent;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.IESBClientService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.gapi.IGAPIMessage;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.gapi.MessageSendResponse;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.trx.EdiMsgDetail;
import com.ut.scf.orm.trx.EsbServiceDetail;

/**
 * Class 类型服务的核心实现类
 * IESBClientService 是唯一请求入口
 * IServiceQuery 约定所有查询方法
 * IServiceComponent 约定所有提交方法
 * @author PanHao
 *
 */
public abstract class AbsESBServiceImpl implements IServiceQuery,IServiceComponent,IESBClientService{
	public Logger getLogger() {
		return APLogUtil.getServiceLogger(currentBu);
	}
	public final String ESB_SERVICE_TABLE_NAME = "trx.ESB_SERVICE_DETAIL";

	@Resource(name = "queryFactory")
	protected IQueryFactory queryFactory;

	@Resource(name = "logicFactory")
	protected ILogicFactory logicFactory;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoExecHelper;

	@Resource(name = "serviceJsEngine")
	protected IServerSideJs jsEngine;

	protected ServicePara serviceObj;

	protected JSONObject reqObj;

	protected JSONObject trxObj;
	
	protected String currentBu;
	
	protected FuncDataObj requestFuncData;
	
	private String serviceId;

	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}
	
	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception {
		
		parseParamenter(request);

		String reqType = request.getRequestType();
		
		IESBServiceResponse response = new ServiceResponseImpl();
		
		response.setRequestId(request.getRequestId());
		
		try{
			BeanUtils.invokeMethod(this, reqType, new Object[]{requestFuncData});
			
			response.setResponseData(requestFuncData);
			response.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS);
		}catch(Exception e){
			requestFuncData.setRetInfo(e.getMessage());
			requestFuncData.setRetStatus(FuncDataObj.EXCEPTION);
			response.setResponseData(requestFuncData);
			response.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_ERROR);
		}

		return response;
	}
	
	protected void parseParamenter(IESBServiceRequest dataObj) {
		serviceObj = (ServicePara) dataObj.getRequestPara();
		reqObj = (JSONObject) dataObj.getRequestData();
		trxObj = JsonHelper.getTrxObject(reqObj);
		ApSessionContext context = ApSessionUtil.getContext();
		currentBu = context.getSysBusiUnit();
		requestFuncData = new FuncDataObj();
		requestFuncData.setReqData(reqObj);
		requestFuncData.setReqParaObj(serviceObj);
		requestFuncData.setFuncType(context.getSysFuncType());
	}

	protected List<String> getRules(){
		return serviceObj.getRules()==null?new ArrayList<String>():serviceObj.getRules();
	}
	
	protected JSONObject processServiceJs(AbsObject para, JSONObject serviceData) throws Exception {
		String jsFile = getServiceJsFile(para);

		if (StringUtil.isTrimNotEmpty(jsFile)) {
			getJsEngine().initTrxData(serviceData);
			getJsEngine().initTrxPara(para);
			try {
				getJsEngine().executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}

			return (JSONObject)getJsEngine().getTrxData();
		}
		return serviceData;
	}

	protected String getServiceJsFile(AbsObject para) {
		return null;
	}

	protected Object callGapiProcess(Object msgContent) throws Exception {
//		String strGapiId = serviceObj.getGapiid();
//		if(StringUtil.isTrimEmpty(strGapiId))
//			return null;
//		ApSessionContext context = ApSessionUtil.getContext();
//		GapiMsgPara gapiPara = XMLParaParseHelper.parseGapiMsgPara(serviceObj.getGapiid(), context.getSysBusiUnit());
//		IGAPIMessage processor = ClassLoadHelper.getComponentClass(gapiPara.get());
//		if (processor != null) {
//			IGAPIMsgRequest message = new MessageSendRequest();
//			message.setMsgBody(msgContent);
//
//			IGAPIMsgResponse response = processor.sendMessage(gapiPara, message);
//			return response;
//		}
//		IGAPIMsgResponse response = new MessageSendResponse();
//		response.setError("Error");
//		response.setResponse("Canot get processor by name:" + gapiPara.getComponent());
//		return response;
		return null;
	}
	
	
	protected List<Object> queryServiceFromDb() {
		JSONObject funcObj = JsonHelper.getTrxObject(reqObj);
		String funcRef = funcObj.getString("sysRefNo");
		Integer funcEvent = funcObj.getInt("sysEventTimes");
		
		FuncDataObj logicDataObj = new FuncDataObj();
		
		QueryNode queryObj = new QueryNode();
		queryObj.setType("E");
		queryObj.setTablename(ESB_SERVICE_TABLE_NAME);
		//暂时不匹配event times
//		queryObj.setCondition("funcRef = "+funcRef+" and funcEventTimes = "+funcEvent);
		queryObj.setCondition("funcRef = "+funcRef+" and serviceTp = "+getServiceId());
		queryObj.setOrderby("msgIndex");
		queryObj.setAsc("Y");
		
		logicDataObj.setReqParaObj(queryObj );
		logicDataObj.setReqData(reqObj);
		
		FuncDataObj maxRecord = queryFactory.getProcessor(queryObj).queryData(logicDataObj);
		maxRecord = (FuncDataObj) this.daoExecHelper.execQuery(maxRecord);
		return (List<Object>) maxRecord.get(maxRecord.getDoName());
	}
	
	protected EsbServiceDetail generateMsgStore(String msgText,int index,String msgTp) {
		String id = UUIdGenerator.getUUId();
		JSONObject funcObj = JsonHelper.getFuncObject(reqObj);
		JSONObject trxObj = JsonHelper.getTrxObject(reqObj);
		int funcEvent = trxObj.containsKey("sysEventTimes")?funcObj.getInt("sysEventTimes"):1;
		EsbServiceDetail detail = new EsbServiceDetail();
		detail.setSysRefNo(id);
		detail.setFuncEventTimes(funcEvent);//默认是PM交易，申请时，event times 需要加1
		detail.setFuncId(funcObj.getString("sysFuncId"));
		detail.setFuncRef(funcObj.getString("sysRefNo"));
		detail.setMsgText(msgText);
		detail.setMsgIndex(index);
		detail.setMsgTp(msgTp);
		detail.setSendStatus("P");
		detail.setSysEventTimes(1);
		detail.setSysOpTm(DateTimeUtil.getTimestamp());
		detail.setMsgModle("O");
		detail.setServiceTp(getServiceId());
		return detail;
	}

	protected void storeServiceDetailIntoDb(EsbServiceDetail msgDetail,FuncDataObj dataObj) throws Exception {
		FuncDataObj logicDataObj = new FuncDataObj();
		LogicNode reqParaObj = new LogicNode();
		reqParaObj.setType("E");
		reqParaObj.setTablename(ESB_SERVICE_TABLE_NAME);
		reqParaObj.setCascadeevent("N");
		logicDataObj.setReqParaObj(reqParaObj);
		JSONObject submitObj = JsonUtil.clone(trxObj);
		submitObj.putAll(BeanUtils.toMap(msgDetail));
		logicDataObj.setReqData(submitObj);
		dataObj.mergeResponse(logicFactory.getProcessor(reqParaObj).postData(logicDataObj));
	}
	
	protected FuncDataObj updateServiceMsgStatus(String msgId) throws Exception {
		FuncDataObj logicDataObj = new FuncDataObj();
		LogicNode reqParaObj = new LogicNode();
		StringBuffer buff = new StringBuffer();
		reqParaObj.setType("E");
		reqParaObj.setTablename(ESB_SERVICE_TABLE_NAME);
		reqParaObj.setCascadeevent("N");
		buff.append("sendStatus").append(",");
		buff.append("sysTrxSts");
		reqParaObj.setFields(buff.toString());
		logicDataObj.setReqParaObj(reqParaObj );	
		JSONObject submitObj = JsonUtil.clone(trxObj);
		submitObj.put("sendStatus","M");
		submitObj.put("sysTrxSts","M");
		submitObj.put("sysRefNo",msgId);
		logicDataObj.setReqData(submitObj);
		
		return logicFactory.getProcessor(reqParaObj).postData(logicDataObj);
	}

	public IServerSideJs getJsEngine(){
		return jsEngine;
	}
}
