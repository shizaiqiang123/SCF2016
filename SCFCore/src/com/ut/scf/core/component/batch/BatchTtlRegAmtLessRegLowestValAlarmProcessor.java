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
import com.ut.comm.tool.UUIdGenerator;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.services.advice.impl.IAdviceGenerate;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;


/**
 * 库存价值小于最低库存价值预警
 * @author YeQing
 * @since  2016-9-8
 */
@Component("batchTtlRegAmtLessRegLowestValAlarmProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchTtlRegAmtLessRegLowestValAlarmProcessor extends AbsRunableTask {

	// 当前交易基本信息
	protected ApSessionContext context;
	protected String     currentBu;
	protected JSONObject funcData;
	protected JSONObject trxData;
	
	DocumentFactoryImpl  documentFactory;
	IQueryComponent      queryFactory;	
	IAPProcessor         processor;
	
	@Resource(name = "adviceGenerator")
	IAdviceGenerate generator;
	
	private void initTool(){
		try {
			adviceLinkMap = new HashMap<String, String>();
			msgMap4Add = new HashMap<String, Map<String, String>>();
			msgMap4Update = new HashMap<String, Map<String, String>>();
			daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			queryFactory = ClassLoadHelper.getComponentClass("hqlQuery");
			processor    = ClassLoadHelper.getComponentClass("aPSubmitProcessor");
			context      = ApSessionUtil.getContext();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	
	@Override
	public void execute() {
		
		initTool();
		
		getAdviceLinkMap();
		 
		getMsgMapAtALL();
		
		if(!msgMap4Add.keySet().isEmpty() || !msgMap4Update.keySet().isEmpty()) {
			generator.generatePointTtlRegAmtLessRegLowestValAlarm(msgMap4Add,msgMap4Update);
		}
		
	}
	
	private Map<String, Map<String, String>> msgMap4Add;
	private Map<String, Map<String, String>> msgMap4Update;
	private void getMsgMapAtALL(){
		String cols = "SYS_OP_ID,SYS_REL_ID,SYS_AUTH_ID,CNTRCT_NO,SEL_ID,BUYER_ID,SYS_REF_NO,BUSI_TP,TTL_REG_AMT,REG_LOWEST_VAL"; 
		
		String Sql = "SELECT SYS_OP_ID,SYS_REL_ID,SYS_AUTH_ID, CNTRCT_NO,SEL_ID,BUYER_ID,SYS_REF_NO,BUSI_TP,TTL_REG_AMT,REG_LOWEST_VAL FROM CNTRCT_M  WHERE TTL_REG_AMT<REG_LOWEST_VAL AND (BUSI_TP=2 OR BUSI_TP=4 OR BUSI_TP=5)";
		
		List<Map<String, Object>> back = daoHelper.executeOrentSql(Sql, cols.split(","));
		
		if(null != back && back.size() > 0) {
			
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String rec_id      = null;
			String key = null;
			System.out.println("-------------BatchTtlRegAmtLessRegLowestValAlarmProcessor.getMsgMapAtALL.back.size()---" + back.size());
			
			
			Map<String, Object> inner = null;
			
			Map<String, String> mapMsg  = null;
			
			StringBuffer yBuff = null;
			
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				
				inner = (Map<String, Object>) in.next();
				
				String id = UUIdGenerator.getUUId();
				
				if(null != inner.get("SYS_OP_ID") && !((String)inner.get("SYS_OP_ID")).trim().equals("")) {
					mapMsg = new HashMap<String, String>();
					mapMsg.put("msgTextId", id);
					mapMsg.put("msgSendTp", String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
					mapMsg.put("msgRemindTp", String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
					mapMsg.put("sendNm", ApSessionUtil.getContext().getSysUserId());
					mapMsg.put("sendId", ApSessionUtil.getContext().getSysUserRef());
					
					
					mapMsg.put("msgTitle", "协议[" + (String)inner.get("SYS_REF_NO") + "]库存价值不足预警");
					
					yBuff = new StringBuffer("");
					yBuff.append("协议[" + (String)inner.get("SYS_REF_NO") + "]库存价值总额小于最低库存价值预警,");
					yBuff.append("库存价值总额[" + (java.math.BigDecimal)inner.get("TTL_REG_AMT")  + "],");
					yBuff.append("最低库存价值[" + (java.math.BigDecimal)inner.get("REG_LOWEST_VAL")   + "],请关注！");
					
					mapMsg.put("recId",    ((String)inner.get("SYS_OP_ID")).trim());
					
					mapMsg.put("msgText", yBuff.toString());
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					rec_id    = (String)inner.get("SYS_OP_ID");
					
					mapMsg.put("CNTRCT_NO", cntrct_no);
					mapMsg.put("SEL_ID", sel_id);
					mapMsg.put("BUYER_ID", buyer_id);
					key = cntrct_no + ";" + sel_id + ";" + buyer_id  + ";" + rec_id;
					if(null != adviceLinkMap.get(key)) {
						mapMsg.put("MSG_ID", (String) adviceLinkMap.get(key));
						msgMap4Update.put(((String)inner.get("SYS_OP_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					} else {
						   msgMap4Add.put(((String)inner.get("SYS_OP_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					}
					
				}
				
			}
			
		}
		
	}
	
	private Map<String, String> adviceLinkMap;
	private void getAdviceLinkMap(){
		
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT CNTRCT_NO,SEL_ID,BUYER_ID,LOAN_NO,REC_ID,MSG_ID,MESSAGE_TYPE   ");
		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_TTLREGAMTLESSREGLOWESTVALALARM);
		String cols = "CNTRCT_NO,SEL_ID,BUYER_ID,LOAN_NO,REC_ID,MSG_ID"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		Iterator<Map<String, Object>> in = back.iterator();
		if(null != back && back.size() > 0) {
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String rec_id      = null;
			String msg_id      = null;
			
			StringBuffer yBuff = null;
			
			Map<String, Object> inner = null;
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if(null != inner.get("CNTRCT_NO") && 
				   null != inner.get("SEL_ID") && 
				   null != inner.get("BUYER_ID") &&
				   null != inner.get("REC_ID") &&
				   null != inner.get("MSG_ID")) {
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					rec_id    = (String)inner.get("REC_ID");
					msg_id    = (String)inner.get("MSG_ID");
					
					yBuff = new StringBuffer("");
					yBuff.append(cntrct_no);
					yBuff.append(";");
					yBuff.append(sel_id);
					yBuff.append(";");
					yBuff.append(buyer_id);
					yBuff.append(";");
					yBuff.append(rec_id);
					//yBuff已经能够确定唯一的一条记录了，做KEY
					adviceLinkMap.put(yBuff.toString(), msg_id);
					
				}
			}
		}
		
	}

}
