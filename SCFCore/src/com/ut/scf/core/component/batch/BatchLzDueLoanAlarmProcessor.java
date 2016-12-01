package com.ut.scf.core.component.batch;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;
import oracle.sql.TIMESTAMP;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;









//import com.ctc.wstx.util.StringUtil;
//import com.sun.jmx.snmp.Timestamp;
import java.sql.Timestamp;

import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
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
 * 将到期融资预警
 * @author zhangyilei
 * @since  2015-12-24
 */
@Component("batchLzDueLoanAlarmProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzDueLoanAlarmProcessor extends AbsRunableTask {

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
		
		initDayOffConfig();
		
		getAdviceLinkMap();
		 
		getMsgMapAtALL();
		
		if(!msgMap4Add.keySet().isEmpty() || !msgMap4Update.keySet().isEmpty()) {
			//generator.generatePoint2PointMsg4DueARAlarm(msgMap);
			generator.generatePoint2PointMsg4DueLoanAlarm(msgMap4Add,msgMap4Update);
		}
		
	}
	
	private void initDayOffConfig() {
		TaskPara taskPara = (TaskPara) currentTask.getParam();//获取Task
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();//获取Task参数
		String paraDt = (String) trxDataPara.getProterties().get("para"); // 发票到期前设置天数
		dayOffConfig = Integer.parseInt(paraDt);
	}
	
	private String formatDate(Date date){
		if(date != null){
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String strDate = df.format(date);
			return strDate;
		}else{
			return "";
		}
	}
	
	private int dayOffConfig = 0;
	private Map<String, Map<String, String>> msgMap4Add;
	private Map<String, Map<String, String>> msgMap4Update;
	
	private  BigDecimal getNotNull(BigDecimal num){
		if(num ==  null){
			num = new BigDecimal(0);
		}
		return num;
	}
	
	private void getMsgMapAtALL(){
		String cols = "SYS_OP_ID,SYS_REL_ID,SYS_AUTH_ID,CNTRCT_NO,SEL_ID,BUYER_ID,SYS_REF_NO,LOAN_DUE_DT,TTL_LOAN_BAL,TTL_LOAN_AMT,LOAN_RT,BUSI_TP,DAYOFF"; 
		
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT ");
		xBuff.append(" SYS_OP_ID,SYS_REL_ID,SYS_AUTH_ID, CNTRCT_NO,SEL_ID,BUYER_ID,SYS_REF_NO,LOAN_DUE_DT,TTL_LOAN_BAL,TTL_LOAN_AMT,LOAN_RT,BUSI_TP,TRUNC(LOAN_DUE_DT)-TRUNC(SYSDATE) AS DAYOFF ");
		xBuff.append(" FROM TRX.LOAN_M ");                                                 //0，应该进入逾期状态
		xBuff.append(" WHERE SYS_TRX_STS = 'M' AND SYS_LOCK_FLAG = 'F' AND PAY_INT_TP=2 AND TTL_LOAN_BAL > 0 AND ((TRUNC(LOAN_DUE_DT) - TRUNC(SYSDATE)) BETWEEN 1 AND " + dayOffConfig + ") ");
		xBuff.append(" ORDER BY SYS_REF_NO ASC ");
		
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		if(null != back && back.size() > 0) {
			
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String loan_no     = null;
			String rec_id      = null;
			String busi_tp      = null;
			String key = null;
			System.out.println("-------------BatchLzDueLoanAlarmProcessor.getMsgMapAtALL.back.size()---" + back.size());
			
			
			Map<String, Object> inner = null;
			
			Map<String, String> mapMsg  = null;
			Map<String, String> mapMsg2 = null;
			Map<String, String> mapMsg3 = null;
			
			StringBuffer yBuff = null;
			
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				
				inner = (Map<String, Object>) in.next();
				
				String dateStr = null;
				try {
					TIMESTAMP rebackinner = (TIMESTAMP)inner.get("LOAN_DUE_DT");  
					Timestamp rebackiner  = rebackinner.timestampValue();
					dateStr = formatDate(new Date(rebackiner.getTime()));
				} catch (SQLException e) {
					e.printStackTrace();
				} 
				
				String id = UUIdGenerator.getUUId();
				
				if(null != inner.get("SYS_OP_ID") && !((String)inner.get("SYS_OP_ID")).trim().equals("")) {
					mapMsg = new HashMap<String, String>();
					mapMsg.put("msgTextId", id);
					mapMsg.put("msgSendTp", String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
					mapMsg.put("msgRemindTp", String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
					mapMsg.put("sendNm", ApSessionUtil.getContext().getSysUserId());
					mapMsg.put("sendId", ApSessionUtil.getContext().getSysUserRef());
					
					//"SYS_OP_ID,SYS_REL_ID,SYS_AUTH_ID,SYS_REF_NO,LOAN_DUE_DT,TTL_LOAN_BAL,DAYOFF"; 
					
					mapMsg.put("msgTitle", "融资编号[" + (String)inner.get("SYS_REF_NO") + "]即将收费");
					//mapMsg.put("msgText",  "融资[" + (String)inner.get("SYS_REF_NO") + "]将到期预警,到期日期[" + dateStr + "]将到期预警,到期日期["  );
					
					yBuff = new StringBuffer("");
					Object a=inner.get("TTL_LOAN_BAL");
					System.out.println(a);
					
					BigDecimal TTL_LOAN_AMT=getNotNull((BigDecimal) inner.get("TTL_LOAN_BAL"));
					BigDecimal DAYOFF=getNotNull((BigDecimal)inner.get("DAYOFF"));
					BigDecimal LOAN_RT=getNotNull((BigDecimal)inner.get("LOAN_RT"));
					int days=360;
					yBuff.append("融资编号[" + (String)inner.get("SYS_REF_NO")     + "]将到期预警,");
					yBuff.append("到期日期[" + dateStr + "],");
					yBuff.append("融资余额[" + (java.math.BigDecimal)inner.get("TTL_LOAN_BAL")    + "],");
					yBuff.append("预计利息金额[" + TTL_LOAN_AMT.multiply(LOAN_RT).multiply(DAYOFF).divide(new BigDecimal(days),2,BigDecimal.ROUND_FLOOR) + "],");
					yBuff.append("收费方式为利息本清,剩余天数[" + (java.math.BigDecimal)inner.get("DAYOFF")     + "].");
					
					mapMsg.put("recId",    ((String)inner.get("SYS_OP_ID")).trim());
					//mapMsg.put("sysRelId", ((String)inner.get("SYS_REF_NO")).trim());
					
					mapMsg.put("msgText", yBuff.toString());
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					loan_no   = (String)inner.get("SYS_REF_NO");
					rec_id    = (String)inner.get("SYS_OP_ID");
					busi_tp = (String)inner.get("BUSI_TP");
					
					mapMsg.put("CNTRCT_NO", cntrct_no);
					mapMsg.put("SEL_ID", sel_id);
					mapMsg.put("BUYER_ID", buyer_id);
					mapMsg.put("LOAN_NO", loan_no);
					mapMsg.put("busiTp", busi_tp);
					key = cntrct_no + ";" + sel_id + ";" + buyer_id + ";" + loan_no + ";" + rec_id;
					if(null != adviceLinkMap.get(key)) {
						mapMsg.put("MSG_ID", (String) adviceLinkMap.get(key));
						msgMap4Update.put(((String)inner.get("SYS_OP_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					} else {
						   msgMap4Add.put(((String)inner.get("SYS_OP_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					}
					
				}
				
				/*if(null != inner.get("SYS_REL_ID") && !((String)inner.get("SYS_REL_ID")).trim().equals("")) {
					
					mapMsg2 = new HashMap<String, String>();
					mapMsg2.put("msgTextId", id);
					mapMsg2.put("msgSendTp", String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
					mapMsg2.put("msgRemindTp", String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
					mapMsg2.put("sendNm", ApSessionUtil.getContext().getSysUserId());
					mapMsg2.put("sendId", ApSessionUtil.getContext().getSysUserRef());
					
					mapMsg2.put("msgTitle", "融资[" + (String)inner.get("SYS_REF_NO") + "]将到期预警");
					
					yBuff = new StringBuffer("");
					yBuff.append("融资[" + (String)inner.get("SYS_REF_NO")     + "]将到期预警,");
					yBuff.append("到期日期[" + dateStr + "],");
					yBuff.append("融资余额[" + (java.math.BigDecimal)inner.get("TTL_LOAN_BAL")    + "],");
					yBuff.append("剩余天数[" + (java.math.BigDecimal)inner.get("DAYOFF")     + "].");
					
					mapMsg2.put("recId",    ((String)inner.get("SYS_REL_ID")).trim());
					//mapMsg2.put("sysRelId", ((String)inner.get("SYS_REF_NO")).trim());
					
					mapMsg2.put("msgText",yBuff.toString());
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					loan_no   = (String)inner.get("SYS_REF_NO");
					rec_id    = (String)inner.get("SYS_REL_ID");
					
					mapMsg.put("CNTRCT_NO", cntrct_no);
					mapMsg.put("SEL_ID", sel_id);
					mapMsg.put("BUYER_ID", buyer_id);
					mapMsg.put("LOAN_NO", loan_no);
					key = cntrct_no + ";" + sel_id + ";" + buyer_id + ";" + loan_no + ";" + rec_id;
					if(null != adviceLinkMap.get(key)) {
						mapMsg.put("MSG_ID", (String) adviceLinkMap.get(key));
						msgMap4Update.put(((String)inner.get("SYS_REL_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					} else {
						   msgMap4Add.put(((String)inner.get("SYS_REL_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					}
					
				}
				
				if(null != inner.get("SYS_AUTH_ID") && !((String)inner.get("SYS_AUTH_ID")).trim().equals("")) {
					
					mapMsg3 = new HashMap<String, String>();
					mapMsg3.put("msgTextId", id);
					mapMsg3.put("msgSendTp", String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
					mapMsg3.put("msgRemindTp", String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
					mapMsg3.put("sendNm", ApSessionUtil.getContext().getSysUserId());
					mapMsg3.put("sendId", ApSessionUtil.getContext().getSysUserRef());
					
					mapMsg3.put("msgTitle", "融资[" + (String)inner.get("SYS_REF_NO") + "]将到期预警");
					
					yBuff = new StringBuffer("");
					yBuff.append("融资[" + (String)inner.get("SYS_REF_NO")     + "]将到期预警,");
					yBuff.append("到期日期[" + dateStr + "],");
					yBuff.append("融资余额[" + (java.math.BigDecimal)inner.get("TTL_LOAN_BAL")    + "],");
					yBuff.append("剩余天数[" + (java.math.BigDecimal)inner.get("DAYOFF")     + "].");
					
					mapMsg3.put("recId",    ((String)inner.get("SYS_AUTH_ID")).trim());
					//mapMsg3.put("sysRelId", ((String)inner.get("SYS_REF_NO")).trim());
					
					mapMsg3.put("msgText",yBuff.toString());
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					loan_no   = (String)inner.get("SYS_REF_NO");
					rec_id    = (String)inner.get("SYS_AUTH_ID");
					
					mapMsg.put("CNTRCT_NO", cntrct_no);
					mapMsg.put("SEL_ID", sel_id);
					mapMsg.put("BUYER_ID", buyer_id);
					mapMsg.put("LOAN_NO", loan_no);
					key = cntrct_no + ";" + sel_id + ";" + buyer_id + ";" + loan_no + ";" + rec_id;
					if(null != adviceLinkMap.get(key)) {
						mapMsg.put("MSG_ID", (String) adviceLinkMap.get(key));
						msgMap4Update.put(((String)inner.get("SYS_AUTH_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					} else {
						   msgMap4Add.put(((String)inner.get("SYS_AUTH_ID")).trim() + "-" + (String)inner.get("SYS_REF_NO"), mapMsg);
					}
				}*/
				
			}
			
		}
		
	}
	
	private Map<String, String> adviceLinkMap;
	private void getAdviceLinkMap(){
		
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT CNTRCT_NO,SEL_ID,BUYER_ID,LOAN_NO,REC_ID,MSG_ID,MESSAGE_TYPE   ");
		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_DUELOANALARM);
		String cols = "CNTRCT_NO,SEL_ID,BUYER_ID,LOAN_NO,REC_ID,MSG_ID"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		Iterator<Map<String, Object>> in = back.iterator();
		if(null != back && back.size() > 0) {
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String loan_no     = null;
			String rec_id      = null;
			String msg_id      = null;
			
			StringBuffer yBuff = null;
			
			Map<String, Object> inner = null;
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if(null != inner.get("CNTRCT_NO") && 
				   null != inner.get("SEL_ID") && 
				   null != inner.get("BUYER_ID") &&
				   null != inner.get("LOAN_NO") &&
				   null != inner.get("REC_ID") &&
				   null != inner.get("MSG_ID")) {
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					loan_no   = (String)inner.get("LOAN_NO");
					rec_id    = (String)inner.get("REC_ID");
					msg_id    = (String)inner.get("MSG_ID");
					
					yBuff = new StringBuffer("");
					yBuff.append(cntrct_no);
					yBuff.append(";");
					yBuff.append(sel_id);
					yBuff.append(";");
					yBuff.append(buyer_id);
					yBuff.append(";");
					yBuff.append(loan_no);
					yBuff.append(";");
					yBuff.append(rec_id);
					//yBuff已经能够确定唯一的一条记录了，做KEY
					adviceLinkMap.put(yBuff.toString(), msg_id);
					
				}
			}
		}
		
	}

}
