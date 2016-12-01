package com.ut.scf.core.component.batch;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;

@Component("batchEmailProcessor")
@Scope("prototype")
public class BatchEmailProcessor extends AbsRunableTask {

	IQueryFactory queryFactory;
	protected ASETrxAjaxManagerBean ajaxManager;
	IReferenceNo refNoManager;
//	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;
	
//	@Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;
	
	protected IServerSideJs serverJsEngine;
	
//	InquireDataPara
	


	@Override
	public void execute() {
		try {
			serverJsEngine = ClassLoadHelper.getComponentClass("serviceJsEngine");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			refNoManager = ClassLoadHelper.getComponentClass("refNoManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			serviceFactory = ClassLoadHelper.getComponentClass("serviceFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			queryFactory = ClassLoadHelper.getComponentClass("queryFactory");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			daoHelper = ClassLoadHelper.getComponentClass("daoHelper");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			ajaxManager = ClassLoadHelper
					.getComponentClass("aSETrxAjaxManagerBean");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			gapiManager = ClassLoadHelper
					.getComponentClass("gapiManager");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		// 点对组
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		String host = (String) trxDataPara.getProterties().get("host");
		String port = (String) trxDataPara.getProterties().get("port");
		String from_email_address = (String) trxDataPara.getProterties().get("from_email_address");
		String from_email_pwd = (String) trxDataPara.getProterties().get("from_email_pwd");
		JSONObject jsonObject=new JSONObject();
		jsonObject.put("host", host);
		jsonObject.put("port", port);
		jsonObject.put("from_email_address", from_email_address);
		jsonObject.put("from_email_pwd", from_email_pwd);
		sendGroup(jsonObject);
		// 点对点
		sendTitle(jsonObject);

//		deleteAdvice("2");

	}

	private void sendGroup(JSONObject jsonObject) {
		QueryNode node = new QueryNode();
		JSONObject reqData = JsonHelper.createReqJson();
		String sql = "select ahr.msgRecId,ah.msgTitle,ah.msgText,ah.sysRefNo from STD.AdviceHeader ah,AdviceHeaderRecive ahr "
				+ " where ah.msgGroupTp='2' and ah.msgSendTp='1' and ah.msgStatue=? and ahr.msgId=ah.sysRefNo "
				+ " and ah.msgInvalidDate > ? and ah.msgSendDate < ?";
		String currentDate = DateTimeUtil.getSysTime();
		currentDate += ":typejava.sql.Timestamp";
		String paras = new StringBuffer()
				.append(AdviceConstants.ADV_MSG_STATUS_VALID).append(",")
				.append(currentDate).append(",").append(currentDate).toString();
		node.setParams(paras);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(reqData);
		dataObj.setReqParaObj(node);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Object> obj = (List<Object>) processResult.get(processResult
					.getDoName());
			if (!obj.isEmpty()) {
				for (Object mod : obj) {
					sendGroupTitle(mod,jsonObject);
					deleteAdviceHeader(((Object[])mod)[3].toString());
				}
				
			}
		}
	}

	private void sendGroupTitle(Object mod,JSONObject jsonData) {
		QueryNode node = new QueryNode();
		JSONObject reqData = JsonHelper.createReqJson();
		String roleId = ((Object[]) mod)[0].toString();
		// System.out.println(roleId);
		// String roleId=
		// String sql =
		// "select uim.userId,uim.userNm.uim.mobPhone from UserInfoM uim,UserRoleInfo uri where uri.roleId=? and uri.userId=uim.sysRefNo";
		String sql = "select sysRefNo,userNm,email from STD.UserInfoM where sysRefNo in (select uri.userId from STD.UserRoleInfo uri where uri.roleId=?)";
		String paras = new StringBuffer().append(roleId).toString();
		node.setParams(paras);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(reqData);
		dataObj.setReqParaObj(node);
		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);
		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Object> obj = (List<Object>) processResult.get(processResult
					.getDoName());
			if (!obj.isEmpty()) {
				for (Object mod2 : obj) {
					JSONObject jsonObject = new JSONObject();
					JSONObject jsonObj = new JSONObject();
					Object[] modInfo = (Object[]) mod2;
					jsonObject.put("reqLoginType", "noLogin");
					jsonObject.put("byFunc", "N");
					jsonObject.put("getdataId", "S_P_000062");
					jsonObject.put("sysRefNo", modInfo[0].toString());
					jsonObject.put("to_email_addresses", modInfo[2].toString());
					jsonObject.put("text", ((Object[]) mod)[2].toString());
					jsonObject.put("subject", ((Object[]) mod)[1].toString());
					// jsonObject.put("trxDom", jsonObj);
					jsonObject.putAll(jsonData);
					jsonObj.put("trxDom", jsonObject);
					try {
//						ApResponse result = (ApResponse) ajaxManager
//								.queryData(jsonObj);
//						if (!result.isSuccess()) {
//							String error = ((String) result.getObj());
//							// sendException(jsonObj,error);
//						}
//						callGapiProcess("b2e00083",jsonObject,jsonObj);
						callServiceProcess(jsonObject.getString("getdataId"),jsonObject,jsonObj);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	private void sendTitle(JSONObject jsonData) {
		QueryNode node = new QueryNode();
		JSONObject reqData = JsonHelper.createReqJson();
		String sql = "select h.msgText,u.email,u.sysRefNo,h.sysRefNo,h.msgTitle from  STD.AdviceHeader h , AdviceHeaderRecive r , UserInfoM u "
				+ "where h.sysRefNo = r.msgId and r.msgRecId = u.sysRefNo and h.msgSendTp = '1'  and h.msgStatue = ? and h.msgGroupTp='1' "
				+ "and h.msgInvalidDate > ? and h.msgSendDate < ?";
		String currentDate = DateTimeUtil.getSysTime();
		currentDate += ":typejava.sql.Timestamp";
		String paras = new StringBuffer()
				.append(AdviceConstants.ADV_MSG_STATUS_VALID).append(",")
				.append(currentDate).append(",").append(currentDate).toString();
		node.setParams(paras);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(reqData);
		dataObj.setReqParaObj(node);
		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);
		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Object> obj = (List<Object>) processResult.get(processResult
					.getDoName());
			if (!obj.isEmpty()) {
				for (Object mod : obj) {
					JSONObject jsonObject = new JSONObject();
					JSONObject jsonObj = new JSONObject();
					Object[] modInfo = (Object[]) mod;
					jsonObject.put("reqLoginType", "noLogin");
					jsonObject.put("byFunc", "N");
					jsonObject.put("getdataId", "S_P_000062");
					jsonObject.put("sysRefNo", modInfo[2].toString());
					jsonObject.put("to_email_addresses", modInfo[1].toString());
					jsonObject.put("text", modInfo[0].toString());
					jsonObject.put("subject", modInfo[4].toString());
					jsonObject.putAll(jsonData);
					// jsonObject.put("trxDom", jsonObj);
					jsonObj.put("trxDom", jsonObject);
					try {
//						ApResponse result = (ApResponse) ajaxManager
//								.queryData(jsonObj);
//						if (!result.isSuccess()) {
//							String error = ((String) result.getObj());
//							// sendException(jsonObj,error);
//						}
//						callGapiProcess("I_P_000106",jsonObject,jsonObj);
//					
						callServiceProcess(jsonObject.getString("getdataId"),jsonObject,jsonObj);
						deleteAdviceHeader(modInfo[3].toString());
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

//	private void sendException(JSONObject jsonObject, String error) {
//		JSONObject trxDom = jsonObject.getJSONObject("trxDom");
//		LogicNode logicNode = new LogicNode();
//		FuncDataObj dataObj = new FuncDataObj();
//		JSONObject trxData = new JSONObject();
//		logicNode.setTablename("STD.GAPI_MSG");
//		logicNode.setType("E");
//		trxData.put("sysLockFlag", "F");
//		trxData.put("sysRefNo", UUIdGenerator.getUUId());
//		trxData.put("sysEventTimes", 1);
//		trxData.put("portType", "Verify");
//		trxData.put("portId", trxDom.get("telphone"));
//		trxData.put("portMessage", trxDom.get("message"));
//		trxData.put("portExpMes", error);
//		trxData.put("portTimes", 0);
//		trxData.put("portRefNo", trxDom.get("getdataId"));
//		dataObj.setReqData(trxData);
//		dataObj.setReqParaObj(logicNode);
//		try {
//			dataObj = logicFactory.getProcessor(logicNode).postData(dataObj);
//			daoHelper.execUpdate(dataObj);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//	}

	private void deleteAdviceHeader(String advRefNo) {
		JSONObject trxDom = new JSONObject();
		QueryNode node = new QueryNode();
		node.setTablename("STD.ADVICE_HEADER");
		// .append(" and password = ").append(password);
		node.setCondition("sysRefNo=" + advRefNo);
		node.setType("E");
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDom);
		dataObj.setReqParaObj(node);
		IQueryComponent process = queryFactory.getProcessor(node);
		FuncDataObj processResult = process.queryData(dataObj);
		daoHelper.execQuery(processResult);
		List<Map> obj = (List<Map>) (processResult.getData().get("data"));
		for (int total = 0; total < obj.size(); total++) {
			String sysRefNo = (String) obj.get(total).get("sysRefNo");
			deleteAdviceHeaderRecive(sysRefNo.toString());
		}
		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append("delete from STD.AdviceHeader where sysRefNo=?");
		IDaoEntity entity2 = new ExecDaoEntity();
		entity2.setHql(stringBuffer.toString());
		List<Object> deleteParams = new ArrayList<Object>();
		deleteParams.add(advRefNo);
		entity2.setParaList(deleteParams);
		entity2.setType(IDaoEntity.ENTITY_TYPE_HQL);
		FuncDataObj funcDataObj = new FuncDataObj();
		funcDataObj.addExcuteEntity(entity2);
		daoHelper.execUpdate(funcDataObj);
	}

	private void deleteAdviceHeaderRecive(String sysRefNo) {
		IDaoEntity entity = new ExecDaoEntity();
		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append("delete from STD.AdviceHeaderRecive where msgId=?");
		entity.setHql(stringBuffer.toString());
		List<Object> deleteParams = new ArrayList<Object>();
		deleteParams.add(sysRefNo);
		entity.setParaList(deleteParams);
		entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		FuncDataObj funcDataObj = new FuncDataObj();
		funcDataObj.addExcuteEntity(entity);
		daoHelper.execUpdate(funcDataObj);
	}
	public void callServiceProcess(String serviceId,Object reqData,JSONObject serviceData) throws Exception{
//			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(serviceId,"");
//			String inqType = inqPara.getType();
			ServicePara servicePara=XMLParaParseHelper.parseFuncService(serviceId,"" );
			serviceData = processServiceJs(servicePara,serviceData);
			IESBServiceRequest request = new ServiceRequestImpl();
			
			request.setRequestType(IESBServiceRequest.REQUEST_TYPE_QUERY);
			request.setRequestData(serviceData);
			request.setRequestPara(servicePara);
			request.setRequestTarget(ESBServiceUtil.generateRequestEntity(servicePara));
			request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
			IESBServiceResponse processResult = serviceFactory.getProcessor(servicePara).runService(request);
//			JsonHelper.getTrxObject(serviceData).putAll((Map) retData.getReturnObj());
//			if("S".equalsIgnoreCase(inqType)){
//				getServiceData(inqPara.getTarget());
//			}
	}
	private JSONObject processServiceJs(ServicePara para,JSONObject serviceData) throws Exception{
		String jsFile = para.getServicejs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			serverJsEngine.initTrxData(serviceData);
			serverJsEngine.initTrxPara(para);
			try {
				serverJsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}
			
			return (JSONObject) serverJsEngine.getTrxData();
		}
		return serviceData;
	}
		
//	public void callGapiProcess(String gapiMsgId,Object reqData,JSONObject serviceData) throws Exception{
//		try {
//			IGAPIMsgRequest gapiRequest = new MessageSendRequest();
//			gapiRequest.setMsgBody( reqData);
//			
//			GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, "");
//			IGAPIMsgResponse gapiResponse = gapiManager.processSendMsg(msgPara, gapiRequest,serviceData);
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw e;
//		}
//
//	}

}
