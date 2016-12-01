package com.ut.scf.core.component.batch;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.logic.HQLLogicImpl;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.services.advice.impl.IAdviceGenerate;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

/**
 * 黑名单预警
 * @author zhangyilei
 * @since  2015-12-24
 * 作为黑名单的单位和个人， 一旦在供应链的某个交易之中，
 * 则每天都生成预警信息，提示参与这个交易的柳州银行相关人员，
 * 如客户经理，经办，复核的分支领导等，该客户已经进入黑名单，
 * 一旦提示的预警信息被阅读， 则不再重复生成新的预警提示。
 * ==>> 没有得到明确的黑名单预警处理的业务需求， 本人根据黑名单的价值发现和使用方式猜测其业务需求，可能和行方的要求并不一致， zhangyilei.
 */
@Component("batchLzBlackListProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzBlackListProcessor extends AbsRunableTask {
	
	IAPProcessor processor;
	HQLLogicImpl hqlLogicImpl;
	
	FuncDataObj  logicObj;
	///////////////////////////////////////////////////////////////////////////////////////
	protected String currentBu;
	protected JSONObject funcData;
	protected JSONObject trxData;
	//////////////////////////////////////////////////////////////////////////////////////
	@Resource(name = "adviceGenerator")
	IAdviceGenerate generator;
	
	@Override
	public void execute() {
		
		//01,初始化工具
		initTools();
		
		
		//02,查询到黑名单的单位和个人列表, 以及系统的用户表，生成所有的黑名单通知所有系统用户的记录集合
		initFullMap();
		
		//03,得到已经生成在系统中的所有通知记录集合
		//getAdviceClientListAtAll();
		//已经生成的黑名单记录
		getAdviceLinkMap();
		
		//04,生成通知记录到系统中的所有用户
		saveAdviceClientList();
		
		//05,查询所有的未完成的流程，搜索其中参与的客户和银行的系统用户，生成预警信息，TODO
		
	}
	
	private void saveAdviceClientList() {
		
		if(0 == adviceLinkMap.keySet().size()) {
			//全部的黑名单都要生成预警信息
		} else {
			
			String cret_code = null;
			String rec_id    = null;
			String[] str     = null;
			
			//看是否有的黑名单没有通知到这个系统用户
			Iterator<String> inner = adviceLinkMap.keySet().iterator();
			while(inner.hasNext()) {
				str = inner.next().split(";");
				cret_code = str[0];
				rec_id = str[1];
				//已经有的全部清除
				//如果某个人员被系统删除了, 但是之前生成过预警信息
				if(fullMap.get(rec_id).containsKey(cret_code)) {
					fullMap.get(rec_id).remove(cret_code);
				} 
			}
		}
		
		//剩下没有清除的记录全部生成预警记录
		if(!fullMap.keySet().isEmpty()) {
			generator.generatePoint2PointMsg4BlackList(msgMap, fullMap);
		}
		
	}
	
	private Map<String, Map<String, String>> fullMap;
	private Map<String, Map<String, String>> msgMap;
	/*
	private Map<String, Map<String, String>> advicedMap = new HashMap<String, Map<String, String>>();
	private void getAdviceClientListAtAll(){
		
		String cols = "MSG_ID,REC_ID,SEND_ID,MSG_STATUS,SYS_REL_ID,MSG_TITLE"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(" SELECT " + cols + " FROM STD.ADVICE_CLIENT ORDER BY REC_ID DESC ", cols.split(","));
		
		if(null != back && back.size() > 0) {
			
			Map<String, Object> inner = null;
			Map<String, String> inMap = null;
			
			String rec_id = null;
			
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				
				inner = (Map<String, Object>) in.next();
				
				if(null != inner.get("REC_ID") && 
				   !((String)inner.get("REC_ID")).trim().equals("")) {
					
					if(!((String)inner.get("REC_ID")).trim().equals(rec_id)) {
						if(null != rec_id && !inMap.keySet().isEmpty()) {
							advicedMap.put(rec_id, inMap);
						}
						//重新赋值
						rec_id = ((String)inner.get("REC_ID")).trim();
						inMap  = new HashMap<String, String>();
						
						if(null != inner.get("SYS_REL_ID") && !"".equals(((String)inner.get("SYS_REL_ID")).trim())) {
							inMap.put(((String)inner.get("SYS_REL_ID")).trim(), null);
						}
					} else {
						if(null != inner.get("SYS_REL_ID") && !"".equals(((String)inner.get("SYS_REL_ID")).trim())) {
							inMap.put(((String)inner.get("SYS_REL_ID")).trim(), null);
						}
					}
				}
			}
		}
	}*/
	

	//02,查询到黑名单的单位和个人列表, 以及系统的用户表，生成所有的黑名单通知所有系统用户的记录集合
	private void initFullMap() {
		
		//初始化我行客户，以及客户法人的存在情况
		initCustmMap();
		//查询到我行的所有用户
		List<Object> sysUserList = getUserListAtALL();
		//查询到黑名单的单位和个人列表
		Map<String, String> blackList  = getBlackListAtALL();
		Map<String, String> blackList2 = new HashMap<String, String>();
		
		//去除掉不在我行客户记录的黑名单
		if(null != blackList   && blackList.size() > 0 ) {
			String id = null;
			Iterator<String> in = blackList.keySet().iterator();
			while(in.hasNext()) {
				id = (String) in.next();
				if(custmMap4Person.keySet().contains(id)) {
					blackList2.put(id, blackList.get(id));
					in.remove();
				} else if(custmMap4Org.keySet().contains(id)) {
					blackList2.put(id, blackList.get(id));
					in.remove();
				} else {
					System.out.println("---------------BatchLzBlackListProcessor.initFullMap().others-----------------------");
				}
			}
		}
		
		
		if(null != sysUserList && sysUserList.size() > 0 && 
		   null != blackList2   && blackList2.size()   > 0 ) {
			String userid = null;
			Iterator<Object> in = sysUserList.iterator();
			while(in.hasNext()) {
				userid = (String) in.next();
				fullMap.put(userid, blackList2);
			}
		}
		
		
	}
	
	//查询到黑名单的单位和个人列表
	private Map<String, String> getBlackListAtALL(){
		
		Map<String, String> result = new HashMap<String, String>();
		
		String cols = "BUSS_TYPE,CRET_TYPE,CRET_CODE,BLACK_NAME"; 
		
		List<Map<String, Object>> back = daoHelper.executeOrentSql(" SELECT " + cols + " FROM TRX.BLACKLIST_M ORDER BY CRET_TYPE DESC ", cols.split(","));
		
		if(null != back && back.size() > 0) {
			
			Map<String, Object> inner = null;
			
			Map<String, String> mapMsg = null;
			
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				
				inner = (Map<String, Object>) in.next();
				result.put((String)inner.get("CRET_CODE"), (String)inner.get("CRET_TYPE") + ";" + (String)inner.get("BLACK_NAME")+ ";" + (String)inner.get("BUSS_TYPE"));
				
				mapMsg = new HashMap<String, String>();
				//BUSS_TYPE	String	1				业务类型(0=个人，1=企业)
				mapMsg.put("BUSS_TYPE", (String)inner.get("BUSS_TYPE"));
				//BLACK_NAME	String	35		            姓名
				//CRET_TYPE	String	1				证件类型
				//CRET_CODE	String	35				证件号码（组织机构代码）
				mapMsg.put("CRET_CODE", (String)inner.get("CRET_CODE"));
				mapMsg.put("CRET_TYPE", (String)inner.get("CRET_TYPE"));
				mapMsg.put("BLACK_NAME", (String)inner.get("BLACK_NAME"));
				//这个时候已经可以生成ID了
				mapMsg.put("msgTextId", UUIdGenerator.getUUId());
				//TODO
				mapMsg.put("msgSendTp", /*消息发送类型*/String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
				mapMsg.put("msgRemindTp", String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
				mapMsg.put("sendNm", ApSessionUtil.getContext().getSysUserId());
				mapMsg.put("sendId", ApSessionUtil.getContext().getSysUserRef());
				
				if(null != inner.get("BUSS_TYPE") && ((String)inner.get("BUSS_TYPE")).trim().equals(AdviceConstants.BLACKLIST_M_BUSS_TYPE_ENTER)) {
					if(null == inner.get("BLACK_NAME") || ((String)inner.get("BLACK_NAME")).trim().equals("")) {
						mapMsg.put("msgTitle", "单位[" + custmMap4Org.get((String)inner.get("CRET_CODE")) + "]在黑名单");
						mapMsg.put("msgText",  "单位[" + custmMap4Org.get((String)inner.get("CRET_CODE")) + "]在我行黑名单.");
					} else {
						mapMsg.put("msgTitle", "单位[" + (String)inner.get("BLACK_NAME") + "]在黑名单");
						mapMsg.put("msgText",  "单位[" + (String)inner.get("BLACK_NAME") + "]在我行黑名单.");
					}
					msgMap.put((String)inner.get("CRET_CODE"), mapMsg);
				} else if(null != inner.get("BUSS_TYPE") && ((String)inner.get("BUSS_TYPE")).trim().equals(AdviceConstants.BLACKLIST_M_BUSS_TYPE_PERSON)) {
					if(null == inner.get("BLACK_NAME") || ((String)inner.get("BLACK_NAME")).trim().equals("")) {
						mapMsg.put("msgTitle", "个人[" + custmMap4Person.get((String)inner.get("CRET_CODE")) + "]在黑名单");
						mapMsg.put("msgText",  "个人[" + custmMap4Person.get((String)inner.get("CRET_CODE")) + "]在我行黑名单.");
					} else {
						mapMsg.put("msgTitle", "个人[" + (String)inner.get("BLACK_NAME") + "]在黑名单");
						mapMsg.put("msgText",  "个人[" + (String)inner.get("BLACK_NAME") + "]在我行黑名单.");
					}
					msgMap.put((String)inner.get("CRET_CODE"), mapMsg);
				} else {
					System.out.println("---msgMap--others------");
				}
				
				
			}
			
		}
		
		return result;
		
	}
	
	private Map<String, String> custmMap4Person;
	private Map<String, String> custmMap4Org;
	
	//得到我行所有客户的两个信息，法人的id和名称， 组织机构代码和名称
	private void initCustmMap() {
		
		String cols = "CUST_NM,CUST_INST_CD,LEGAL_REP_IDNO,LEGAL_REP_NM"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(" SELECT " + cols + " FROM TRX.CUST_M ", cols.split(","));
		if(null != back && back.size() > 0) {
			
			if(!custmMap4Person.isEmpty()) custmMap4Person.clear();
			if(!custmMap4Org.isEmpty())    custmMap4Org.clear();
			
			Map<String, Object> inner = null;
			
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				//CUST_INST_CD,组织机构代码;CUST_NM,客户名称;
				if(null != inner.get("CUST_INST_CD") && 
				   null != inner.get("CUST_NM")      &&
				   !((String)inner.get("CUST_INST_CD")).trim().equals("") &&
				   !((String)inner.get("CUST_NM")).trim().equals("")
				) {
					custmMap4Org.put((String)inner.get("CUST_INST_CD"), (String)inner.get("CUST_NM"));
				}
				//LEGAL_REP_IDNO,法人证件号码;LEGAL_REP_NM,法人姓名， 目前没有考虑到证件类型的因素，没有处理，默认为身份证号码
				if(null != inner.get("LEGAL_REP_IDNO") && 
				   null != inner.get("LEGAL_REP_NM")   &&
				   !((String)inner.get("LEGAL_REP_IDNO")).trim().equals("")	&&
				   !((String)inner.get("LEGAL_REP_NM")).trim().equals("")
				) {
					custmMap4Person.put((String)inner.get("LEGAL_REP_IDNO"), (String)inner.get("LEGAL_REP_NM"));
				}
			}
			
			
			System.out.println("------custmMap4Person.keySet().size()=" + custmMap4Person.keySet().size());
		}
		
	}
	
	
	/*
	client.setRecId(msgMap.get(blackid).get("msgRecId").toString());
	client.setSendId(msgMap.get(blackid).get("sendId").toString());
	client.setSendNm(msgMap.get(blackid).get("sendNm").toString());
    */
	
	
	//查询到系统用户列表
	private List<Object> getUserListAtALL(){
		/*
		String cols = "USER_ID,SYS_REF_NO"; 
		result = daoHelper.executeForList(" SELECT USER_ID,SYS_REF_NO FROM STD.USER_INFO_M ", cols);
		*/
		return daoHelper.executeForList(" SELECT SYS_REF_NO FROM STD.USER_INFO_M ", "SYS_REF_NO");
	}
	
	//01,初始化工具
	private void initTools(){
		try {
			fullMap    = new HashMap<String, Map<String, String>>();
			msgMap = new HashMap<String, Map<String, String>>();
			custmMap4Person = new HashMap<String, String>();
			custmMap4Org    = new HashMap<String, String>();
			hqlLogicImpl = new HQLLogicImpl();
		    logicObj     = new FuncDataObj();
		    
			daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			//queryFactory = ClassLoadHelper.getComponentClass("hqlQuery");
			processor    = ClassLoadHelper.getComponentClass("aPSubmitProcessor");
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
	}
	
	private Map<String, String> adviceLinkMap ;
	private void getAdviceLinkMap(){
		adviceLinkMap = new HashMap<String, String>();
		/*
		SELECT CNTRCT_NO,BILL_NO,CRTF_NO, REC_ID, MSG_ID, MESSAGE_TYPE  
		FROM ADVICE_LINK WHERE MESSAGE_TYPE = AdviceConstants.MESSAGE_TYPE_CRTFNORELEASE 
		*/
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT CNTRCT_NO,BILL_NO,CRTF_NO, REC_ID, MSG_ID, MESSAGE_TYPE,CRET_CODE   ");
		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_BLACKLIST);
		String cols = "CNTRCT_NO,BILL_NO,CRTF_NO,REC_ID,MSG_ID,CRET_CODE"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		Iterator<Map<String, Object>> in = back.iterator();
		if(null != back && back.size() > 0) {
			String rec_id      = null;
			String msg_id      = null;
			String cret_code   = null;
			
			StringBuffer yBuff = null;
			
			Map<String, Object> inner = null;
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if(null != inner.get("CRET_CODE") && 
				   null != inner.get("REC_ID") &&
				   null != inner.get("MSG_ID")) {
				
					cret_code   = (String)inner.get("CRET_CODE");
					rec_id    = (String)inner.get("REC_ID");
					msg_id    = (String)inner.get("MSG_ID");
					
					yBuff = new StringBuffer("");
					yBuff.append(cret_code);
					yBuff.append(";");
					yBuff.append(rec_id);
					//yBuff已经能够确定唯一的一条记录了，做KEY
					adviceLinkMap.put(yBuff.toString(), msg_id);
					
				}
			}
		}
		
	}

}
