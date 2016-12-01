package com.ut.scf.core.services.advice.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.verification.impl.IVerifcationCodeService;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.dao.IDaoReformat;
import com.ut.scf.orm.std.AdviceClient;
import com.ut.scf.orm.std.AdviceDetail;
import com.ut.scf.orm.std.AdviceHeader;
import com.ut.scf.orm.std.AdviceLink;

@Component("adviceGenerator")
public class AdviceGenerator implements IAdviceGenerate{
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;	
	@Resource(name = "aSETrxAjaxManagerBean")
	protected ASETrxAjaxManagerBean ajaxManager;
	@Resource(name="verificationCodeEngine")
	IVerifcationCodeService service ;
	@Resource(name = "logicFactory")
	protected ILogicFactory logicFactory ;
	
	public void generatePoint2PointMsg(Object reqData){
		FuncDataObj logicObj = (FuncDataObj) reqData;
		JSONObject userData = JsonHelper.getUserObject(logicObj.getReqData());
		JSONObject trxObj = JsonHelper.getTrxObject(logicObj.getReqData());
		String userId = userData.getString("sysUserId");
		String userRef = userData.getString("sysUserRef");
		AdviceUtil.getLogger().debug("start to process P2P msg ...user id :"+userId);
		List<Map> pointDefineds = getMsgDefine((FuncDataObj) reqData,AdviceConstants.ADV_MSG_GROUP_TP_P2P,userRef);
		for (Map adviceHeader : pointDefineds) {
			try{
				AdviceDetail msgDetail = generateDetailByHeader(adviceHeader);
				AdviceClient msgClient = generateClientByHeader(adviceHeader);
				saveDetailMsg(msgDetail);
				saveClientMsg(msgClient);
			}catch(Exception e){
				AdviceUtil.getLogger().error("generate msg detail failed:"+e.toString());
			}
		}
		AdviceUtil.getLogger().debug("end to process P2P msg ...user id :"+userId);
	}
	
	//private Map<String, Map<String, String>> fullMap    = new HashMap<String, Map<String, String>>();
	//added by zhangyilei at 2015-12-26, liuzhou
	public void generatePoint2PointMsg4BlackList(Map<String, Map<String, String>> msgMap, Map<String, Map<String, String>> fullMap){
		
		String userid = null;
		
		Iterator<String> in = fullMap.keySet().iterator();
		while(in.hasNext()) {
			userid = in.next();
			doAdviceDetail4BlackList(fullMap.get(userid), msgMap, userid);
		}
		
	}
	//黑名单情况比较特殊，不需要更新记录，只需要在出现新增加黑名单记录时候插入即可，对于存在的记录，不需要更新记录
	private void doAdviceDetail4BlackList(Map<String, String> xMap, Map<String, Map<String, String>> msgMap, String userid) {
		
		if(null != xMap && !xMap.isEmpty()) {
			
			AdviceDetail msgDetail = null;
			AdviceClient msgClient = null;
			
			String blackid = null;
			
			Iterator<String> in = xMap.keySet().iterator();
			while(in.hasNext()) {
				
				blackid = in.next();
				
				if(null != msgMap.get(blackid)) {
					msgDetail = generateDetailByHeader4BlackList(msgMap, userid, blackid);
					saveDetailMsg(msgDetail);
					
					msgClient = generateClientByHeader4BlackList(msgMap, userid, blackid);
					saveClientMsg(msgClient);
					
					AdviceLink msgLink = getAdviceLinkForBlackList(msgClient,blackid);
					saveAdviceLink(msgLink);
				}
				
			}
			
		}
		
	}
	
	public void generatePoint2PointMsgs(Object reqData){
		FuncDataObj logicObj = (FuncDataObj) reqData;
		JSONObject userData = JsonHelper.getUserObject(logicObj.getReqData());
		JSONObject trxObj = JsonHelper.getTrxObject(logicObj.getReqData());
		String userId = userData.getString("sysUserId");
		String userRef = userData.getString("sysUserRef");
		AdviceUtil.getLogger().debug("start to process P2P msg ...user id :"+userId);
		getMsgsDefine((FuncDataObj) reqData,AdviceConstants.ADV_MSG_GROUP_TP_P2P,userRef);
	}
	private List<Map> getMsgsDefine(FuncDataObj logicObj,int msgGroupType,String msgGroup) {
		QueryNode node  = new QueryNode();
		JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
		String userId = (String)userinfo.get("sysUserRef");
		String sql = "";
		if(msgGroupType==1){
			sql ="select h.sysRefNo,h.msgText,u.mobPhone,u.sysRefNo from  AdviceHeader h , AdviceHeaderRecive r , UserInfoM u "
				+ "where h.sysRefNo = r.msgId and r.msgRecId = u.sysRefNo and h.msgSendTp = '2'  and h.msgStatue = ? and h.msgGroupTp='1' "
				+ "and h.msgInvalidDate > ? and h.msgSendDate < ?";
		}
//		}else if(msgGroupType==2){
//			sql ="select h,r.msgRecId,r.msgRecNm from AdviceHeader h , AdviceHeaderRecive r where h.sysRefNo = r.msgId"
//					+ " and h.msgSendTp = '2' and h.msgGroupTp = ? and h.msgStatue = ?"
//					+"  and r.msgRecId in (select roleId from UserRoleInfo where userId = ?)"
//					+ "and h.msgInvalidDate > ? and h.msgSendDate < ? ";
//		}
		String currentDate = DateTimeUtil.getSysTime();
		currentDate+=":typejava.sql.Timestamp";
		
		String paras = new StringBuffer()
		.append(AdviceConstants.ADV_MSG_STATUS_VALID).append(",")
		.append(currentDate).append(",").append(currentDate).toString();
		node.setParams(paras);			
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(userinfo);
		dataObj.setReqParaObj(node);
		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);
		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List<Object> obj = (List<Object>) processResult.get(processResult.getDoName());
			if (!obj.isEmpty()) {
				for (Object mod : obj) {
					JSONObject jsonObject=new JSONObject();
					JSONObject jsonObj=new JSONObject();
					Object[] modInfo = (Object[]) mod;
						jsonObject.put("reqLoginType", "noLogin");
						jsonObject.put("byFunc", "N");
						jsonObject.put("getdataId", "I_P_000089");
						jsonObject.put("sysRefNo", modInfo[3].toString());
						jsonObject.put("telphone", modInfo[2].toString());
//						String message=packMessage(modInfo[0].toString(), modInfo[1].toString());
						jsonObject.put("message" , modInfo[1].toString());
//						jsonObject.put("trxDom", jsonObj);
						jsonObj.put("trxDom", jsonObject);
					try {
						ApResponse result=(ApResponse) ajaxManager.queryData(jsonObj);
					if(!result.isSuccess()){
						String  error = ((String)result.getObj());
						sendException(jsonObj,error);
					}
					} catch (Exception e) {
						e.printStackTrace();
					}
					deleteAdviceHeader(modInfo[0].toString());
				}
			}
		}
		
		return null;
	}
	
	private void deleteAdviceHeader(String sysRefNo){
		JSONObject trxDom=new JSONObject();
		QueryNode node = new QueryNode();
		node.setTablename("STD.ADVICE_HEADER");
		// .append(" and password = ").append(password);
		node.setCondition("sysRefNo="+sysRefNo);
		node.setType("E");
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDom);
		dataObj.setReqParaObj(node);
		IQueryComponent process = queryFactory.getProcessor(node);
		FuncDataObj processResult = process.queryData(dataObj);
		daoHelper.execQuery(processResult);
		List<Map> obj = (List<Map>) (processResult.getData().get("data"));
		for(int total=0;total<obj.size();total++){
			String userRefNo=(String) obj.get(total).get("sysRefNo");
			deleteAdviceHeaderRecive(userRefNo.toString());
		}
		StringBuffer stringBuffer=new StringBuffer();
		stringBuffer.append("delete from AdviceHeader where sysRefNo=?");
		IDaoEntity entity2=new ExecDaoEntity();
		entity2.setHql(stringBuffer.toString());
		List<Object> deleteParams=new ArrayList<Object>();
		deleteParams.add(sysRefNo);
		entity2.setParaList(deleteParams);
		entity2.setType(IDaoEntity.ENTITY_TYPE_HQL);
		FuncDataObj funcDataObj=new FuncDataObj();
		funcDataObj.addExcuteEntity(entity2);
		daoHelper.execUpdate(funcDataObj);
	}
	private void deleteAdviceHeaderRecive(String sysRefNo){
		IDaoEntity entity = new ExecDaoEntity();
		StringBuffer stringBuffer=new StringBuffer();
		stringBuffer.append("delete from AdviceHeaderRecive where msgId=?");
		entity.setHql(stringBuffer.toString());
		List<Object> deleteParams=new ArrayList<Object>();
		deleteParams.add(sysRefNo);
		entity.setParaList(deleteParams);
		entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		FuncDataObj funcDataObj=new FuncDataObj();
		funcDataObj.addExcuteEntity(entity);
		daoHelper.execUpdate(funcDataObj);
	}

	private void sendException(JSONObject jsonObject,String error){
		JSONObject trxDom = jsonObject.getJSONObject("trxDom");
		LogicNode logicNode=new LogicNode();
		FuncDataObj dataObj=new FuncDataObj();
		JSONObject trxData=new JSONObject();
		logicNode.setTablename("STD.GAPI_MSG");
		logicNode.setType("E");
		trxData.put("sysLockFlag", "F");
		trxData.put("sysRefNo", UUIdGenerator.getUUId());
		trxData.put("sysEventTimes", 1);
		trxData.put("portType", "Verify");
		trxData.put("portId", trxDom.get("telphone"));
		trxData.put("portMessage", trxDom.get("message"));
		trxData.put("portExpMes", error);
		trxData.put("portTimes", 0);
		trxData.put("portRefNo", trxDom.get("getdataId"));
		trxData.put("portName", "Advice");
		dataObj.setReqData(trxData);
		dataObj.setReqParaObj(logicNode);
		try {
			dataObj=logicFactory.getProcessor(logicNode).postData(dataObj);
			daoHelper.execUpdate(dataObj);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	

	//抽象通用方法
	private void saveDetailMsg(AdviceDetail msgDetail) {
		
		IDaoEntity updateEntity = new ExecDaoEntity();
		
		msgDetail.setSysTrxSts("M");
		updateEntity.setSerializableEntity(msgDetail);
		updateEntity.setType(IDaoEntity.ENTITY_TYPE_ENTITY);
		updateEntity.setOperateName(IDaoEntity.OPERATE_NAME_ADD);
		
		FuncDataObj dataObj = new FuncDataObj(); 
		dataObj.addExcuteEntity(updateEntity);
		
		daoHelper.execUpdate(dataObj);	
		
	}
	
	//可以抽象的方法
	private void saveClientMsgForUpdate(AdviceClient msgDetail) {
		
		IDaoEntity updateEntity = new ExecDaoEntity();
		msgDetail.setSysTrxSts("M");
		//设置成未读标注
		msgDetail.setMsgStatus(String.valueOf(AdviceConstants.MSG_STATUS_UNREAD));
		updateEntity.setSerializableEntity(msgDetail);
		updateEntity.setType(IDaoEntity.ENTITY_TYPE_ENTITY);
		//设置更新标识
		updateEntity.setOperateName(IDaoEntity.OPERATE_NAME_UPDATE);
		FuncDataObj dataObj = new FuncDataObj(); 
		dataObj.addExcuteEntity(updateEntity);
		daoHelper.execUpdate(dataObj);	
	}
	
	//可以抽象的方法
	private void saveClientMsg(AdviceClient msgDetail) {
		
		IDaoEntity updateEntity = new ExecDaoEntity();
		msgDetail.setSysTrxSts("M");
		updateEntity.setSerializableEntity(msgDetail);
		updateEntity.setType(IDaoEntity.ENTITY_TYPE_ENTITY);
		updateEntity.setOperateName(IDaoEntity.OPERATE_NAME_ADD);
		FuncDataObj dataObj = new FuncDataObj(); 
		dataObj.addExcuteEntity(updateEntity);
		daoHelper.execUpdate(dataObj);	
	}
	
	private AdviceDetail generateDetailByHeader4BlackList(Map<String, Map<String, String>> msgMap, String userid,String blackid) {
		
		AdviceDetail detail = new AdviceDetail();
		
		detail.setSysEventTimes(1);
		detail.setSysRefNo(UUIdGenerator.getUUId());
		detail.setSysOpTm(DateTimeUtil.getTimestamp());
		
		detail.setRecId(userid);
		
		detail.setMsgId(msgMap.get(blackid).get("msgTextId").toString());
		detail.setMsgSendTp(msgMap.get(blackid).get("msgSendTp").toString());
		detail.setSendId(msgMap.get(blackid).get("sendId").toString());
		
		return detail;
		
	}

	private AdviceDetail generateDetailByHeader(Map adviceHeader) {
		String id = UUIdGenerator.getUUId();
		AdviceDetail detail = new AdviceDetail();
		detail.setMsgId(adviceHeader.get("msgTextId").toString());
		detail.setSysRefNo(id);
		detail.setMsgSendTp(adviceHeader.get("msgSendTp").toString());
		detail.setRecId(adviceHeader.get("msgRecId").toString());
		detail.setSendId(adviceHeader.get("sendId").toString());
		detail.setSysEventTimes(1);
		detail.setSysOpTm(DateTimeUtil.getTimestamp());
		return detail;
	}
	
	private AdviceClient generateClientByHeader4BlackList(Map<String, Map<String, String>> msgMap, String userid,String blackid) {
		
		AdviceClient client = new AdviceClient();
		
		String id = UUIdGenerator.getUUId();
		client.setMsgId(id);
		client.setSysRefNo(id);
		client.setMsgRecDate(DateTimeUtil.getTimestamp());
		client.setMsgRemaindDate(DateTimeUtil.getTimestamp());
		client.setMsgStatus(AdviceConstants.MSG_STATUS_UNREAD+"");
		
		client.setSysEventTimes(1);
		client.setSysOpTm(DateTimeUtil.getTimestamp());
		client.setMsgSendDate(DateTimeUtil.getTimestamp());
		
		client.setRecId(userid);
		client.setSysRelId(blackid);
		
		client.setSendId(msgMap.get(blackid).get("sendId").toString());
		client.setSendNm(msgMap.get(blackid).get("sendNm").toString());
		
		client.setMsgRemindTp(msgMap.get(blackid).get("msgRemindTp").toString());
		
		client.setMsgTextId(msgMap.get(blackid).get("msgTextId").toString());
		client.setMsgTitle(msgMap.get(blackid).get("msgTitle").toString());
		client.setMsgText(msgMap.get(blackid).get("msgText").toString());
		
		return client;
		
	}
	
	private AdviceClient generateClientByHeader(Map adviceHeader) {
		String id = UUIdGenerator.getUUId();
		AdviceClient client = new AdviceClient();
		client.setMsgId(id);
		client.setSysRefNo(id);
		client.setMsgRecDate(DateTimeUtil.getTimestamp());
		client.setMsgRemaindDate(null);
		client.setMsgStatus(AdviceConstants.MSG_STATUS_UNREAD+"");
		client.setMsgTextId(adviceHeader.get("msgTextId").toString());
		client.setMsgTitle(adviceHeader.get("msgTitle").toString());
		client.setRecId(adviceHeader.get("msgRecId").toString());
		client.setSendId(adviceHeader.get("sendId").toString());
		client.setMsgRemindTp(adviceHeader.get("msgRemindTp").toString());
		client.setSysEventTimes(1);
		client.setSysOpTm(DateTimeUtil.getTimestamp());
		client.setMsgSendDate((Timestamp) adviceHeader.get("msgSendDate"));
		client.setSendNm(adviceHeader.get("sendNm").toString());
		client.setMsgText(adviceHeader.get("msgText").toString());
		return client;
	}

	private List<Map> getMsgDefine(FuncDataObj logicObj,int msgGroupType,String msgGroup) {
		QueryNode node  = new QueryNode();
		JSONObject userinfo = JsonHelper.getUserObject(logicObj.getReqData());
		String userId = (String)userinfo.get("sysUserRef");
		String sql = "";
		if(msgGroupType == 1){
			sql =" select h,r.msgRecId,r.msgRecNm from AdviceHeader h , AdviceHeaderRecive r where h.sysRefNo = r.msgId"
					+ " and h.msgSendTp = '0' and h.msgGroupTp = ? and h.msgStatue = ? and r.msgRecId = ? "
					+ "and h.msgInvalidDate > ? and h.msgSendDate < ? and h.sysRefNo not in "
					+ "( select distinct msgId from AdviceDetail where recId = ?)";
		}else if(msgGroupType == 2){
			sql =" select h,r.msgRecId,r.msgRecNm from AdviceHeader h , AdviceHeaderRecive r where h.sysRefNo = r.msgId"
					+ " and h.msgSendTp = '0' and h.msgGroupTp = ? and h.msgStatue = ?"
					+"  and r.msgRecId in (select roleId from UserRoleInfo where userId = ?)"
					+ "and h.msgInvalidDate > ? and h.msgSendDate < ? and h.sysRefNo not in "
					+ "( select distinct msgId from AdviceDetail where recId = ?)";
		}
		String currentDate = DateTimeUtil.getSysTime();
		currentDate+=":typejava.sql.Timestamp";
		
		String paras = new StringBuffer().append(msgGroupType).append(",")
				.append(AdviceConstants.ADV_MSG_STATUS_VALID).append(",")
				.append(msgGroup).append(",").append(currentDate).append(",").append(currentDate)
				.append(",").append(userId).toString();
		node.setParams(paras);			
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);
		FuncDataObj dataObj = logicObj.clone();
		IQueryComponent process =queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult=process.queryData(dataObj);
		List<IDaoEntity> daoEntitys = processResult.getAllExcuteEntity();
		IDaoEntity daoEntity = daoEntitys.get(0);
		daoEntity.setSerializableEntity(AdviceHeader.class);
		
		final List<String> fieldList = new ArrayList<String>();
		fieldList.add("h");
		fieldList.add("msgRecId");
		fieldList.add("msgRecNm");
		
		daoEntity.setReformat(new IDaoReformat(){

			@Override
			public Object reformat(Object recordData) {
				List<Object> returnData = (List<Object>) recordData;
				List<Map<String, Object>> retListMap = new ArrayList<Map<String,Object>>();
				if(!returnData.isEmpty()){
					for (Object recordObj : returnData) {
						Object[] recordFields = (Object[]) recordObj;
						Map<String, Object> retMap = new HashMap<String, Object>();
						for (int i = 0; i < recordFields.length; i++) {
							Object o = recordFields[i];
							if (o == null || BeanUtils.isBaseDataType(o.getClass())) {
								retMap.put(fieldList.get(i), recordFields[i]);
							} else if (BeanUtils.isDateType(o.getClass())) {
								if (recordFields[i] != null) {
									try {
										retMap.put(fieldList.get(i), DateTimeUtil.getDateTime(recordFields[i].toString()));
									}
									catch (Exception e) {
										e.printStackTrace();
									}
								} else {
									retMap.put(fieldList.get(i), "");
								}

							} else if (BeanUtils.isBigDecimalType(o.getClass())) {
								retMap.put(fieldList.get(i), recordFields[i]);
							} else {
//								retMap.put(fieldList.get(i), BeanUtils.getProperty(o, fieldList.get(i)));
								retMap.putAll(BeanUtils.toMap(o));
							}

						}
						retListMap.add(retMap);
					}
					return retListMap;
				}
				return null;
			}
			
		});
		
		Object result = daoHelper.execQuery(daoEntity);
		if(result!=null){
			return (List<Map>) result;
		}
		List<Map> retList = new ArrayList<Map>();
		return retList;
	}

	public void generatePoint2GroupMsg(Object reqData){
		FuncDataObj logicObj = (FuncDataObj) reqData;
		JSONObject userData = JsonHelper.getUserObject(logicObj.getReqData());
		String userId = userData.getString("sysUserId");
		String userRef = userData.getString("sysUserRef");
		String userRole = userData.getString("sysUserRole");
		AdviceUtil.getLogger().debug("start to process P2G msg ...user id :"+userId);
		List<Map> pointDefineds = getMsgDefine((FuncDataObj) reqData,AdviceConstants.ADV_MSG_GROUP_TP_P2G,userRef);
 		for (Map adviceHeader : pointDefineds) {
			try{
				adviceHeader.put("msgRecId", userRef);
				AdviceDetail msgDetail = generateDetailByHeader(adviceHeader);
				AdviceClient msgClient = generateClientByHeader(adviceHeader);
				saveDetailMsg(msgDetail);
				saveClientMsg(msgClient);
			}catch(Exception e){
				AdviceUtil.getLogger().error("generate msg detail failed:"+e.toString());
			}
		}
		AdviceUtil.getLogger().debug("end to process P2G msg ...user id :"+userId);
	}
	

	@Override
	public void generateAdvice(Object reqData) {
		generatePoint2PointMsg(reqData);
		generatePoint2GroupMsg(reqData);
//		generatePoint2PointMsgs(reqData);
	}

	@Override
	public void generatePoint2PointMsg4DueARAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLink4DueARAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueARAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
			
		}
		
	}
	
	@Override
	public void generatePoint2PointMsg4OverDueARAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLink4OverDueARAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueARAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
			
		}
		
	}
	
	@Override
	public void generatePoint2PointMsg4OverDueLoanAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLink4OverDueLoanAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4OverDueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}
	
	@Override
	public void generatePoint2PointMsg4DueLoanAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLink4DueLoanAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}
	
	@Override
	public void generatePoint2PointMsg4PoolLineDownAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate) {
		// TODO Auto-generated method stub
		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLink4PoolLineDownAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
	}
	
	private AdviceLink getAdviceLink4DueARAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_DUEARALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setInvNo((String)xMap.get("INV_NO"));
		
		return link;
	}
	
	private AdviceLink getAdviceLink4DueLoanAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_DUELOANALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setLoanNo((String)xMap.get("LOAN_NO"));
		link.setBusiTp(xMap.get("busiTp").toString());
		
		return link;
	}
	
	private AdviceLink getAdviceLink4OverDueLoanAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_OVERDUELOANALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setLoanNo((String)xMap.get("LOAN_NO"));
		
		return link;
	}
	
	
	private AdviceLink getAdviceLink4OverDueARAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_OVERDUEARALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setInvNo((String)xMap.get("INV_NO"));
		
		return link;
	}
	
	private AdviceLink getAdviceLink4PoolLineDownAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_POOLLINEDOWNARALARM);//MESSAGE_TYPE_POOLLINEDOWNARALARM =10 池水位
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setLoanNo((String)xMap.get("LOAN_NO"));
		
		return link;
	}

	
	private void doAdviceDetail(Map<String, String> xMap) {
		if(null != xMap && !xMap.isEmpty()) {
			AdviceDetail msgDetail = generateDetailByHeader2(xMap);
			saveDetailMsg(msgDetail);
			AdviceClient msgClient = generateClientByHeader2(xMap);
			saveClientMsg(msgClient);
		}
	}
	
	private AdviceClient generateClientByHeader2(Map<String, String> xMap) {
		
		AdviceClient client = new AdviceClient();
		
		String id = UUIdGenerator.getUUId();
		client.setMsgId(id);
		client.setSysRefNo(id);
		client.setMsgRecDate(DateTimeUtil.getTimestamp());
		client.setMsgRemaindDate(DateTimeUtil.getTimestamp());
		client.setMsgStatus(AdviceConstants.MSG_STATUS_UNREAD+"");
		
		client.setSysEventTimes(1);
		client.setSysOpTm(DateTimeUtil.getTimestamp());
		client.setMsgSendDate(DateTimeUtil.getTimestamp());
		
		client.setRecId(xMap.get("recId").toString());
		//client.setSysRelId(xMap.get("sysRelId").toString());
		
		client.setSendId(xMap.get("sendId").toString());
		client.setSendNm(xMap.get("sendNm").toString());
		
		client.setMsgRemindTp(xMap.get("msgRemindTp").toString());
		
		client.setMsgTextId(xMap.get("msgTextId").toString());
		client.setMsgTitle(xMap.get("msgTitle").toString());
		client.setMsgText(xMap.get("msgText").toString());
		client.setBusiTp(xMap.get("busiTp").toString());
		
		return client;
		
	}
	
	private AdviceDetail generateDetailByHeader2(Map<String, String> xMap) {
		
		AdviceDetail detail = new AdviceDetail();
		
		detail.setSysEventTimes(1);
		detail.setSysRefNo(UUIdGenerator.getUUId());
		detail.setSysOpTm(DateTimeUtil.getTimestamp());
		
		detail.setRecId(xMap.get("recId").toString());
		detail.setMsgId(xMap.get("msgTextId").toString());
		detail.setMsgSendTp(xMap.get("msgSendTp").toString());
		detail.setSendId(xMap.get("sendId").toString());
		detail.setBusiTp(xMap.get("busiTp").toString());
		
		return detail;
		
	}
	
	@Override
	public void generatePoint2PointMsg4CrtfNoUpdate(List<String> msgUpdateList) {
		String msg;
		Iterator<String> in = msgUpdateList.iterator();
		while(in.hasNext()) {
			
			msg = in.next();
			
			String[] subMsg = msg.split(";");
			
			AdviceClient msgClient = generateClientByHeader4CrtfNoAdd(subMsg, subMsg[5]);
			saveClientMsgForUpdate(msgClient);
			
		}
	}

	@Override
	public void generatePoint2PointMsg4CrtfNoAdd(List<String> msgAddList) {
		String msg;
		Iterator<String> in = msgAddList.iterator();
		while(in.hasNext()) {
			
			msg = in.next();
			
			String[] subMsg = msg.split(";");
			
			AdviceDetail msgDetail = generateDetailByHeader4CrtfNoAdd(subMsg);
			saveDetailMsg(msgDetail);
			
			AdviceClient msgClient = generateClientByHeader4CrtfNoAdd(subMsg, msgDetail.getMsgId());
			saveClientMsg(msgClient);
			
			AdviceLink msgLink = getAdviceLink4CrtfNoAdd(msgClient,subMsg);
			saveAdviceLink(msgLink);
			
		}
		
	}
	
	
	
	private void doAdviceDetail(String msg) {
		
		String[] subMsg = msg.split(";");
		AdviceDetail msgDetail = generateDetailByHeader(subMsg[3]);
		saveDetailMsg(msgDetail);
		
		AdviceClient msgClient = generateClientByHeader4CrtfNoAdd(subMsg, msgDetail.getMsgId());
		saveClientMsg(msgClient);
		
		AdviceLink msgLink = getAdviceLink4CrtfNoAdd(msgClient,subMsg);
		saveAdviceLink(msgLink);
		
	}
	
	/*private void doAdviceDetail2(String msg) {
		
		String[] subMsg = msg.split(";");
		
		AdviceClient msgClient = generateClientByHeader4CrtfNoAdd(subMsg, subMsg[5]);
		saveClientMsgForUpdate(msgClient);
	}*/

	//可以抽象的方法
	private void saveAdviceLink(AdviceLink msgLink) {
		
		IDaoEntity updateEntity = new ExecDaoEntity();
		updateEntity.setSerializableEntity(msgLink);
		updateEntity.setType(IDaoEntity.ENTITY_TYPE_ENTITY);
		updateEntity.setOperateName(IDaoEntity.OPERATE_NAME_ADD);
		FuncDataObj dataObj = new FuncDataObj(); 
		dataObj.addExcuteEntity(updateEntity);
		daoHelper.execUpdate(dataObj);	
	}
	
	private AdviceLink getAdviceLinkForBlackList(AdviceClient msgClient,String cretCode) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_BLACKLIST);
		link.setCretCode(cretCode);
		
		return link;
	}

	private AdviceLink getAdviceLink4CrtfNoAdd(AdviceClient msgClient,String[] subMsg) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_CRTFNORELEASE);
		
		link.setCntrctNo(subMsg[0]);
		link.setBillNo(subMsg[1]);
		link.setCrtfNo(subMsg[2]);
		
		return link;
	}
	
	private void setAdviceLinkPart(AdviceLink link,AdviceClient msgClient){
		link.setSysRefNo(UUIdGenerator.getUUId());
		link.setSendId(msgClient.getSendId());
		link.setRecId(msgClient.getRecId());
		link.setMsgId(msgClient.getMsgId());
		link.setSendDt(DateTimeUtil.getTimestamp());
	}
	
	private AdviceDetail generateDetailByHeader4CrtfNoAdd(String[] subMsg) {
		
		AdviceDetail detail = new AdviceDetail();
		
		detail.setSysEventTimes(1);
		detail.setSysRefNo(UUIdGenerator.getUUId());
		detail.setSysOpTm(DateTimeUtil.getTimestamp());
		/*
		mapMsg.put("sendNm", ApSessionUtil.getContext().getSysUserId());
		mapMsg.put("sendId", ApSessionUtil.getContext().getSysUserRef());
		*/
		detail.setRecId(subMsg[3]);
		
		detail.setMsgId(UUIdGenerator.getUUId());
		detail.setMsgSendTp(String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
		detail.setSendId(ApSessionUtil.getContext().getSysUserRef());
		
		return detail;
		
	}
	
	private AdviceDetail generateDetailByHeader(String recId) {
		
		AdviceDetail detail = new AdviceDetail();
		
		detail.setSysEventTimes(1);
		detail.setSysRefNo(UUIdGenerator.getUUId());
		detail.setSysOpTm(DateTimeUtil.getTimestamp());
		/*
		mapMsg.put("sendNm", ApSessionUtil.getContext().getSysUserId());
		mapMsg.put("sendId", ApSessionUtil.getContext().getSysUserRef());
		*/
		detail.setRecId(recId);
		
		detail.setMsgId(UUIdGenerator.getUUId());
		detail.setMsgSendTp(String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
		detail.setSendId(ApSessionUtil.getContext().getSysUserRef());
		
		return detail;
		
	}
	

	private AdviceClient generateClientByHeader4OverDueLoanAlarm(Map<String, String> xMap) {
		return generateClientByHeader4DueARAlarm(xMap);
	}
	
	private AdviceClient generateClientByHeader4DueLoanAlarm(Map<String, String> xMap) {
		return generateClientByHeader4DueARAlarm(xMap);
	}

	private AdviceClient generateClientByHeader4DueARAlarm(Map<String, String> xMap) {
		
		AdviceClient client = new AdviceClient();
		
		client.setMsgId((String)xMap.get("MSG_ID")); 
		client.setSysRefNo((String)xMap.get("MSG_ID"));
		client.setMsgRecDate(DateTimeUtil.getTimestamp());
		client.setMsgRemaindDate(DateTimeUtil.getTimestamp());
		client.setMsgStatus(AdviceConstants.MSG_STATUS_UNREAD+"");
		
		client.setSysEventTimes(1);
		client.setSysOpTm(DateTimeUtil.getTimestamp());
		client.setMsgSendDate(DateTimeUtil.getTimestamp());
		
		client.setRecId(xMap.get("recId").toString());
		
		client.setSendId(xMap.get("sendId").toString());
		client.setSendNm(xMap.get("sendNm").toString());
		
		client.setMsgRemindTp(xMap.get("msgRemindTp").toString());
		
		client.setMsgTextId(xMap.get("msgTextId").toString());
		client.setMsgTitle(xMap.get("msgTitle").toString());
		client.setMsgText(xMap.get("msgText").toString());
		client.setBusiTp(xMap.get("busiTp").toString());
		
		return client;
		
	}
	
	private AdviceClient generateClientByHeader4CrtfNoAdd(String[] subMsg, String msgId) {
		
		AdviceClient client = new AdviceClient();
		
		//String id = UUIdGenerator.getUUId();
		client.setMsgId(msgId);
		client.setSysRefNo(msgId);
		client.setMsgRecDate(DateTimeUtil.getTimestamp());
		client.setMsgRemaindDate(DateTimeUtil.getTimestamp());
		client.setMsgStatus(AdviceConstants.MSG_STATUS_UNREAD+"");
		
		client.setSysEventTimes(1);
		client.setSysOpTm(DateTimeUtil.getTimestamp());
		client.setMsgSendDate(DateTimeUtil.getTimestamp());
		
		client.setRecId(subMsg[3]);
		//client.setSysRelId(blackid);
		
		client.setSendId(ApSessionUtil.getContext().getSysUserRef());
		client.setSendNm(ApSessionUtil.getContext().getSysUserId());
		
		client.setMsgRemindTp(String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
		
		client.setMsgTextId(UUIdGenerator.getUUId());
		client.setMsgTitle("票据[" + subMsg[1] + "]下合格证[" + subMsg[2] + "]未释放预警");
		
		int x = Integer.valueOf(subMsg[4].trim()).intValue();
		
		/*if(x >= 0) {
			client.setMsgText( "额度[" + subMsg[0] + "]下融资票据[" + subMsg[1] + "]的合格证[" + subMsg[2] + "]预警,剩余期限["+ subMsg[4] + "]天.");
		} else {
			client.setMsgText( "额度[" + subMsg[0] + "]下融资票据[" + subMsg[1] + "]的合格证[" + subMsg[2] + "]预警,逾期["+ (-x) + "]天.");
		}*/
		if(x >= 0) {
			client.setMsgText( "额度[" + subMsg[0] + "]下融资票据[" + subMsg[1] + "]还有["+ subMsg[4] + "]天到期,融资票据下的合格证[" + subMsg[2] + "]未释放");
		} else {
			client.setMsgText( "额度[" + subMsg[0] + "]下融资票据[" + subMsg[1] + "]已逾期["+ (-x) + "]天，融资票据下的合格证[" + subMsg[2] + "]未释放");
		}
		
		return client;
		
	}

	/**
	 * 预付类协议到期,质物出库预警
	 * @param msgClient
	 * @param xMap
	 * @return
	 */
	private AdviceLink getAdviceLinkCrtfOutAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_CRTFOUTALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setBusiTp(xMap.get("busiTp").toString());
		
		return link;
	}

	/**
	 * 存货类协议到期,质物出库预警
	 * @param msgClient
	 * @param xMap
	 * @return
	 */
	private AdviceLink getAdviceLinkCollatchOutAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_COLLATCHOUTALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setBusiTp(xMap.get("busiTp").toString());
		
		return link;
	}
	/**
	 * 预付类融资
	 * @param msgClient
	 * @param xMap
	 * @return
	 */
	private AdviceLink getAdviceLinkPrePayLoanDueAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_PREPAYLOANDUEALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setLoanNo((String)xMap.get("LOAN_NO"));
		link.setBusiTp(xMap.get("busiTp").toString());
		
		return link;
	}
	
	/**
	 * 存货类融资
	 * @param msgClient
	 * @param xMap
	 * @return
	 */
	private AdviceLink getAdviceLinkInventoryLoanDueAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_INVENTORYLOANDUEALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setLoanNo((String)xMap.get("LOAN_NO"));
		link.setBusiTp(xMap.get("busiTp").toString());
		
		return link;
	}

	/**
	 * 协议下库存价值总额小于最低库存价值预警
	 * @param msgClient
	 * @param xMap
	 * @return
	 */
	private AdviceLink getAdviceLinkTtlRegAmtLessRegLowestValAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_TTLREGAMTLESSREGLOWESTVALALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setBusiTp(xMap.get("busiTp").toString());
		
		return link;
	}
	
	/**
	 * 协议下库存价值总额小于协议下融资余额预警
	 * @param msgClient
	 * @param xMap
	 * @return
	 */
	private AdviceLink getAdviceLinkTtlRegAmtLessOpenLoanAmtAlarm(AdviceClient msgClient,Map<String, String> xMap) {
		
		AdviceLink link = new AdviceLink();
		
		setAdviceLinkPart(link,msgClient);
		
		link.setMessageType(AdviceConstants.MESSAGE_TYPE_TTLREGAMTLESSOPENLOANAMTALARM);
		
		link.setCntrctNo((String)xMap.get("CNTRCT_NO"));
		link.setBuyerId((String)xMap.get("BUYER_ID"));
		link.setSelId((String)xMap.get("SEL_ID"));
		link.setBusiTp(xMap.get("busiTp").toString());
		
		return link;
	}
	
	@Override
	public void generatePointPrePayLoanDueAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLinkPrePayLoanDueAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}

	@Override
	public void generatePointInventoryLoanDueAlarm(Map<String, Map<String, String>> msgMapAdd,
			Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLinkInventoryLoanDueAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}

	@Override
	public void generatePointCrtfOutAlarm(Map<String, Map<String, String>> msgMapAdd,
			Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLinkCrtfOutAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}

	@Override
	public void generatePointCollatchOutAlarm(Map<String, Map<String, String>> msgMapAdd,
			Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLinkCollatchOutAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}

	@Override
	public void generatePointTtlRegAmtLessRegLowestValAlarm(Map<String, Map<String, String>> msgMapAdd,
			Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLinkTtlRegAmtLessRegLowestValAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}

	@Override
	public void generatePointTtlRegAmtLessOpenLoanAmtAlarm(Map<String, Map<String, String>> msgMapAdd,
			Map<String, Map<String, String>> msgMapUpdate) {

		Map<String, String> xMap = null;
		
		Iterator<String> in = msgMapAdd.keySet().iterator();
		while(in.hasNext()) {
			xMap = msgMapAdd.get(in.next());
			if(null != xMap && !xMap.isEmpty()) {
				AdviceDetail msgDetail = generateDetailByHeader2(xMap);
				saveDetailMsg(msgDetail);
				AdviceClient msgClient = generateClientByHeader2(xMap);
				saveClientMsg(msgClient);
				AdviceLink msgLink = getAdviceLinkTtlRegAmtLessOpenLoanAmtAlarm(msgClient,xMap);
				saveAdviceLink(msgLink);
			}
		}
		
		Iterator<String> in2 = msgMapUpdate.keySet().iterator();
		while(in2.hasNext()) {
			xMap = msgMapUpdate.get(in2.next());
			
			AdviceClient msgClient = generateClientByHeader4DueLoanAlarm(xMap);
			saveClientMsgForUpdate(msgClient);
		}
		
	}
}
