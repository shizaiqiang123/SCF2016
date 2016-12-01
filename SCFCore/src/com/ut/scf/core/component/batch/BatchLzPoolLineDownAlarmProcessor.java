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
 * 池融资下补充池水位预警
 * @author JinJH
 * @since  2016-09-06
 */
@Component("batchLzPoolLineDownAlarmProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzPoolLineDownAlarmProcessor extends AbsRunableTask {

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
			generator.generatePoint2PointMsg4PoolLineDownAlarm(msgMap4Add,msgMap4Update);
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
	/*
	 * 1.sql:select sys_ref_no,pool_line from trx.cntrct_m where busi_tp = '6' and pool_line is not null;
	 * 2.利用以上查出的cntrctNo去查询invcM表出池应收账款总额
	 * 3.最新池水位 < 已融资敞口 后台自动预警
	 */
	private void getMsgMapAtALL(){
		String cntrctcols = "SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,SEL_NM,BUYER_ID,SYS_REF_NO,POOL_LINE,OPEN_LOAN_AMT,LMT_CCY,BUSI_TP"; 
		
		StringBuffer cntrctxBuff = new StringBuffer("");
		cntrctxBuff.append(" SELECT ");
		cntrctxBuff.append(" SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,SEL_NM,BUYER_ID,SYS_REF_NO,POOL_LINE,OPEN_LOAN_AMT,LMT_CCY,BUSI_TP ");
		cntrctxBuff.append(" FROM TRX.CNTRCT_M ");                                             
		cntrctxBuff.append(" WHERE SYS_TRX_STS = 'M' AND SYS_LOCK_FLAG = 'F' AND BUSI_TP= 6 AND POOL_LINE IS NOT NULL");
		cntrctxBuff.append(" ORDER BY CNTRCT_NO ASC ");
		List<Map<String, Object>> cntrctInfo = daoHelper.executeOrentSql(cntrctxBuff.toString(), cntrctcols.split(","));
				
		if(null != cntrctInfo && cntrctInfo.size() > 0) {
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String rec_id      = null;
			String key = null;
			System.out.println("-------------BatchLzDueLoanAlarmProcessor.getMsgMapAtALL.back.size()---" + cntrctInfo.size());
			
			Map<String, Object> inner = null;
			Map<String, String> mapMsg  = null;
			Map<String, String> mapMsg2 = null;
			Map<String, String> mapMsg3 = null;
			StringBuffer yBuff = null;
					Iterator<Map<String, Object>> cntrctItera = cntrctInfo.iterator();
					while(cntrctItera.hasNext()) {
						BigDecimal newPoolLine = null;//最新池水位
						Map<String, Object> cntrctInfoinner = (Map<String, Object>) cntrctItera.next();
						BigDecimal poolLine = (BigDecimal)cntrctInfoinner.get("POOL_LINE");//每条协议的原池水位
						BigDecimal openLoanAmt = (BigDecimal)cntrctInfoinner.get("OPEN_LOAN_AMT");//每条协议的原池水位
						BigDecimal totalInvBal = new BigDecimal("0");//即将到期的发票出池应收账款总额
						Boolean isNeedWarning = false;//定义一个是否需要预警的变量，默认为false：不预警
						if(null != cntrctInfoinner.get("SYS_REF_NO") && !((String)cntrctInfoinner.get("SYS_REF_NO")).trim().equals("")) {//判断协议编号不为空
							//sql:select sum(t.inv_bal) from trx.invc_m t where t.cntrct_no = 'Cnt01714';
							String cols = "TOTALINVBAL"; 
							StringBuffer xBuff = new StringBuffer("");
							xBuff.append(" SELECT ");
							xBuff.append(" SUM(INV_BAL) AS TOTALINVBAL ");
							xBuff.append(" FROM TRX.INVC_M ");
							xBuff.append(" WHERE CNTRCT_NO =  '" + cntrctInfoinner.get("SYS_REF_NO") +"' AND ((TRUNC(INV_DUE_DT)-TRUNC(SYSDATE)) = 1)");
							List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
							if(null != back && back.size() > 0) {//back中的数据为sum(invBal)
								Iterator<Map<String, Object>> in = back.iterator();
								while(in.hasNext()) {
									Map<String, Object> invBalinner = (Map<String, Object>) in.next();
									if(null != invBalinner.get("TOTALINVBAL")){
										totalInvBal = (BigDecimal)invBalinner.get("TOTALINVBAL");
										
										//最新池水位（POOL_LINE）=原池水位 (原POOL_LINE)- 出池应收账款总额
										newPoolLine = poolLine.subtract(totalInvBal);
										if(newPoolLine.compareTo(openLoanAmt)<0){//最新池水位 < 已融资敞口 后台自动预警
											isNeedWarning = true;
										}
									}
								}
							}
							if(!isNeedWarning)
								continue;//不需要预警跳出 此次循环，执行下一个条
							String id = UUIdGenerator.getUUId();
							if(null != cntrctInfoinner.get("SYS_OP_ID") && !((String)cntrctInfoinner.get("SYS_OP_ID")).trim().equals("")) {
								mapMsg = new HashMap<String, String>();
								mapMsg.put("msgTextId", id);
								mapMsg.put("msgSendTp", String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
								mapMsg.put("msgRemindTp", String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
								mapMsg.put("sendNm", ApSessionUtil.getContext().getSysUserId());
								mapMsg.put("sendId", ApSessionUtil.getContext().getSysUserRef());
								
								//"SYS_OP_ID,SYS_REL_ID,SYS_AUTH_ID,SYS_REF_NO,LOAN_DUE_DT,TTL_LOAN_BAL,DAYOFF"; 
								
								mapMsg.put("msgTitle", "协议编号[" + (String)cntrctInfoinner.get("CNTRCT_NO") + "]池水位出现敞口");
								//mapMsg.put("msgText",  "融资[" + (String)inner.get("SYS_REF_NO") + "]将到期预警,到期日期[" + dateStr + "]将到期预警,到期日期["  );
								
								yBuff = new StringBuffer("");
								yBuff.append("协议编号[" + (String)cntrctInfoinner.get("CNTRCT_NO") + "],");
								yBuff.append("授信客户名称[" + (String)cntrctInfoinner.get("SEL_NM") + "],");
//								yBuff.append("协议里原池水位[" + (BigDecimal)cntrctInfoinner.get("POOL_LINE") + "],");
								yBuff.append("最新池水位线为[" + newPoolLine + "],");//需要顶一个变量计算
								yBuff.append("融资余额[" + (BigDecimal)cntrctInfoinner.get("OPEN_LOAN_AMT") + "],");
								BigDecimal needPmt = ((BigDecimal)cntrctInfoinner.get("OPEN_LOAN_AMT")).subtract(newPoolLine);
								yBuff.append("需补充保证金或还款[" + needPmt + "],");
								yBuff.append("币种[" + (String)cntrctInfoinner.get("LMT_CCY") + "],");
								
								mapMsg.put("recId",    ((String)cntrctInfoinner.get("SYS_OP_ID")).trim());
								//mapMsg.put("sysRelId", ((String)inner.get("SYS_REF_NO")).trim());
								
								mapMsg.put("msgText", yBuff.toString());
								mapMsg.put("busiTp", (String)cntrctInfoinner.get("BUSI_TP"));
								
								cntrct_no = (String)cntrctInfoinner.get("CNTRCT_NO");
								sel_id    = (String)cntrctInfoinner.get("SEL_ID");
								buyer_id  = (String)cntrctInfoinner.get("BUYER_ID");
								rec_id    = (String)cntrctInfoinner.get("SYS_REL_ID");
								
								mapMsg.put("CNTRCT_NO", cntrct_no);
								mapMsg.put("SEL_ID", sel_id);
								mapMsg.put("BUYER_ID", buyer_id);
								key = cntrct_no + ";" + sel_id + ";" + rec_id;
								if(null != adviceLinkMap.get(key)) {
									mapMsg.put("MSG_ID", (String) adviceLinkMap.get(key));
									msgMap4Update.put(((String)cntrctInfoinner.get("SYS_OP_ID")).trim() + "-" + (String)cntrctInfoinner.get("SYS_REF_NO"), mapMsg);
								} else {
									msgMap4Add.put(((String)cntrctInfoinner.get("SYS_OP_ID")).trim() + "-" + (String)cntrctInfoinner.get("SYS_REF_NO"), mapMsg);
								}
								
							}
				}
			}
		}
			
		
		
	}
	
	private Map<String, String> adviceLinkMap;
	private void getAdviceLinkMap(){
		
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT CNTRCT_NO,SEL_ID,REC_ID,MSG_ID,MESSAGE_TYPE   ");
		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_POOLLINEDOWNARALARM);
		String cols = "CNTRCT_NO,SEL_ID,REC_ID,MSG_ID"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		Iterator<Map<String, Object>> in = back.iterator();
		if(null != back && back.size() > 0) {
			String cntrct_no   = null;
			String sel_id      = null;
			String rec_id      = null;
			String msg_id      = null;
			
			StringBuffer yBuff = null;
			
			Map<String, Object> inner = null;
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if(null != inner.get("CNTRCT_NO") && 
				   null != inner.get("SEL_ID") && 
				   null != inner.get("REC_ID") &&
				   null != inner.get("MSG_ID")) {
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					rec_id    = (String)inner.get("REC_ID");
					msg_id    = (String)inner.get("MSG_ID");
					
					yBuff = new StringBuffer("");
					yBuff.append(cntrct_no);
					yBuff.append(";");
					yBuff.append(sel_id);
					yBuff.append(";");
					yBuff.append(rec_id);
					//yBuff已经能够确定唯一的一条记录了，做KEY
					adviceLinkMap.put(yBuff.toString(), msg_id);
					
				}
			}
		}
		
	}

}
