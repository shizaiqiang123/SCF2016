package com.ut.scf.core.component.batch;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
/**
 * 同步融资余额
 * @author zhangyilei
 * @since  2015-12-24
 */
@Component("batchLzSyncLoanBalanceProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzSyncLoanBalanceProcessor extends AbsRunableTask {
	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;
	
	@Resource(name = "refNoManager")
	IReferenceNo refNoManager;
	
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;
	
	@Resource(name = "aSETrxAjaxManagerBean")
	ASETrxAjaxManagerBean ajaxManager;
	
	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;
	
	@Override
	public void execute() {
		try {
			daoHelper = ClassLoadHelper.getComponentClass("daoHelper");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			System.out.println("111111111111111111111111111111");
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
	}

	private void sendGroup() {
		QueryNode node = new QueryNode();
		JSONObject reqData = JsonHelper.createReqJson();
		String sql = "select ahr.msgRecId,ah.msgTitle,ah.msgText,ah.sysRefNo from STD.AdviceHeader ah,AdviceHeaderRecive ahr "
				+ " where ah.msgGroupTp='2' and ah.msgSendTp='2' and ah.msgStatue=? and ahr.msgId=ah.sysRefNo "
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
					sendGroupTitle(mod);
					deleteAdviceHeader(((Object[])mod)[3].toString());
				}
				
			}
		}
	}

	private void sendGroupTitle(Object mod) {
		QueryNode node = new QueryNode();
		JSONObject reqData = JsonHelper.createReqJson();
		String roleId = ((Object[]) mod)[0].toString();
		// System.out.println(roleId);
		// String roleId=
		// String sql =
		// "select uim.userId,uim.userNm.uim.mobPhone from UserInfoM uim,UserRoleInfo uri where uri.roleId=? and uri.userId=uim.sysRefNo";
		String sql = "select sysRefNo,userNm,mobPhone from STD.UserInfoM where sysRefNo in (select uri.userId from STD.UserRoleInfo uri where uri.roleId=?)";
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
					jsonObject.put("getdataId", "I_P_000089");
					jsonObject.put("sysRefNo", modInfo[0].toString());
					jsonObject.put("mobPhone", modInfo[2].toString());
					jsonObject.put("advContent", ((Object[]) mod)[2].toString());
					// jsonObject.put("trxDom", jsonObj);
					jsonObj.put("trxDom", jsonObject);
					try {
//						ApResponse result = (ApResponse) ajaxManager
//								.queryData(jsonObj);
//						if (!result.isSuccess()) {
//							String error = ((String) result.getObj());
//							// sendException(jsonObj,error);
//						}
						callGapiProcess("b2e00083",jsonObject,jsonObj);
						
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
	}

	private void sendTitle() {
		QueryNode node = new QueryNode();
		JSONObject reqData = JsonHelper.createReqJson();
		String sql = "select h.msgText,u.mobPhone,u.sysRefNo,h.sysRefNo from  STD.AdviceHeader h , AdviceHeaderRecive r , UserInfoM u "
				+ "where h.sysRefNo = r.msgId and r.msgRecId = u.sysRefNo and h.msgSendTp = '2'  and h.msgStatue = ? and h.msgGroupTp='1' "
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
					jsonObject.put("getdataId", "I_P_000089");
					jsonObject.put("sysRefNo", modInfo[2].toString());
					jsonObject.put("telphone", modInfo[1].toString());
					jsonObject.put("message", modInfo[0].toString());
					// jsonObject.put("trxDom", jsonObj);
					jsonObj.put("trxDom", jsonObject);
					try {
//						ApResponse result = (ApResponse) ajaxManager
//								.queryData(jsonObj);
//						if (!result.isSuccess()) {
//							String error = ((String) result.getObj());
//							// sendException(jsonObj,error);
//						}
						callGapiProcess("s2b00001",jsonObject,jsonObj);
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
	public void callGapiProcess(String gapiMsgId,Object reqData,JSONObject serviceData) throws Exception{
		try {
			IGAPIMsgRequest gapiRequest = new MessageSendRequest();
			gapiRequest.setMsgBody( reqData);
			
			GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, "");
			IGAPIMsgResponse gapiResponse = gapiManager.processSendMsg(msgPara, gapiRequest,serviceData);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}

}
