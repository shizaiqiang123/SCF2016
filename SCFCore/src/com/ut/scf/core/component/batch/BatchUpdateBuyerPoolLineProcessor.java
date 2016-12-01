package com.ut.scf.core.component.batch;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
 * 买方池日终池水位管理
 * @author JinJH
 * @since  2016-11-01
 */
@Component("batchUpdateBuyerPoolLineProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchUpdateBuyerPoolLineProcessor extends AbsRunableTask {

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
//			adviceLinkMap = new HashMap<String, String>();
//			msgMap4Add = new HashMap<String, Map<String, String>>();
//			msgMap4Update = new HashMap<String, Map<String, String>>();
			daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			queryFactory = ClassLoadHelper.getComponentClass("hqlQuery");
			processor    = ClassLoadHelper.getComponentClass("aPSubmitProcessor");
			updateSqlList = new ArrayList<List<String>>();
			context      = ApSessionUtil.getContext();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	
	@Override
	public void execute() {
		
		initTool();
		
//		initDayOffConfig();
		
//		getAdviceLinkMap();
		 
		getBuyerDailyPoolLineALL();
		
		updateCntrct();
		
//		if(!msgMap4Add.keySet().isEmpty() || !msgMap4Update.keySet().isEmpty()) {
//			//generator.generatePoint2PointMsg4DueARAlarm(msgMap);
//			generator.generatePoint2PointMsg4PoolLineDownAlarm(msgMap4Add,msgMap4Update);
//		}
		
	}
	
//	private void initDayOffConfig() {
//		TaskPara taskPara = (TaskPara) currentTask.getParam();//获取Task
//		TrxDataPara trxDataPara = taskPara.getTrxdatapara();//获取Task参数
//		String paraDt = (String) trxDataPara.getProterties().get("para"); // 发票到期前设置天数
//		dayOffConfig = Integer.parseInt(paraDt);
//	}
//	
//	private String formatDate(Date date){
//		if(date != null){
//			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			String strDate = df.format(date);
//			return strDate;
//		}else{
//			return "";
//		}
//	}
	
//	private int dayOffConfig = 0;
//	private Map<String, Map<String, String>> msgMap4Add;
//	private Map<String, Map<String, String>> msgMap4Update;
	private List<List<String>> updateSqlList;
	/*
	 * 1.sql:select sys_ref_no,pool_line from trx.cntrct_m where busi_tp = '6' and pool_line is not null;
	 * 2.利用以上查出的cntrctNo去查询invcM表出池应收账款总额
	 * 3.最新池水位 < 已融资敞口 后台自动预警
	 */
	private void getBuyerDailyPoolLineALL(){
		String cntrctcols = "SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,SEL_NM,BUYER_ID,SYS_REF_NO,POOL_LINE,OPEN_LOAN_AMT,LMT_CCY,BUSI_TP"; 
		
		StringBuffer cntrctxBuff = new StringBuffer("");
		cntrctxBuff.append(" SELECT ");
		cntrctxBuff.append(" SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,SEL_NM,BUYER_ID,SYS_REF_NO,POOL_LINE,OPEN_LOAN_AMT,LMT_CCY,BUSI_TP ");
		cntrctxBuff.append(" FROM TRX.CNTRCT_M ");                                             
		cntrctxBuff.append(" WHERE SYS_TRX_STS = 'M' AND SYS_LOCK_FLAG = 'F' AND BUSI_TP= 9 AND POOL_LINE IS NOT NULL");
		cntrctxBuff.append(" ORDER BY CNTRCT_NO ASC ");
		List<Map<String, Object>> cntrctInfo = daoHelper.executeOrentSql(cntrctxBuff.toString(), cntrctcols.split(","));
				
		if(null != cntrctInfo && cntrctInfo.size() > 0) {
					Iterator<Map<String, Object>> cntrctItera = cntrctInfo.iterator();
					/*
					 * 循环池融资下的协议
					 */
					while(cntrctItera.hasNext()) {
						BigDecimal newPoolLine = null;//最新池水位
						BigDecimal newArAvalLoan = null;//最新可融资额
						Map<String, Object> cntrctInfoinner = (Map<String, Object>) cntrctItera.next();
						BigDecimal poolLine = (BigDecimal)cntrctInfoinner.get("POOL_LINE");//每条协议的原池水位
						BigDecimal openLoanAmt = (BigDecimal)cntrctInfoinner.get("OPEN_LOAN_AMT");//每条协议的原已融资敞口
						BigDecimal totalInvBal = new BigDecimal("0");//即将到期的发票出池应收账款总额
						Boolean isNeedUpdate = false;//定义一个是否需要更新的变量，默认为false：不更新
						if(null != cntrctInfoinner.get("SYS_REF_NO") && !((String)cntrctInfoinner.get("SYS_REF_NO")).trim().equals("")) {//判断协议编号不为空
							//sql:select sum(t.inv_bal) from trx.invc_m t where t.cntrct_no = 'Cnt01714';
							String cols = "TOTALINVBAL"; 
							StringBuffer xBuff = new StringBuffer("");
							xBuff.append(" SELECT ");
							xBuff.append(" SUM(INV_BAL*(LOAN_PERC/100)) AS TOTALINVBAL ");
							xBuff.append(" FROM TRX.INVC_M ");
							xBuff.append(" WHERE CNTRCT_NO =  '" + cntrctInfoinner.get("SYS_REF_NO") +"' AND ((TRUNC(INV_DUE_DT)-TRUNC(SYSDATE)) = 1)");
							List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
							if(null != back && back.size() > 0) {//back中的数据为sum(invBal)
								Iterator<Map<String, Object>> in = back.iterator();
								/*==========循环即将过期的发票，计算出池应收账款总额=======*/
								while(in.hasNext()) {
									Map<String, Object> invBalinner = (Map<String, Object>) in.next();
									if(null != invBalinner.get("TOTALINVBAL")){
										totalInvBal = (BigDecimal)invBalinner.get("TOTALINVBAL");
										
										//最新池水位（POOL_LINE）=原池水位 (原POOL_LINE)- 出池应收账款总额
										//可融资金额= 最新池水位-已融资敞口
										newPoolLine = poolLine.subtract(totalInvBal);
										newArAvalLoan = newPoolLine.subtract(openLoanAmt);
										isNeedUpdate = true;
									}
								}
							}
							if(!isNeedUpdate)
								continue;//不需要更新跳出 此次循环，执行下一个条
							//执行更新操作
							List<String> updateCntrct = new ArrayList<String>();
							//update trx.cntrct_m set pool_line = 60000 where sys_ref_no = 'Cnt02049';
							String updateSqlM = "update trx.CNTRCT_M set pool_line = '"+newPoolLine+"',ar_aval_loan = '"+newArAvalLoan+"' where sys_Ref_No = '"+cntrctInfoinner.get("SYS_REF_NO")+"'";
							updateCntrct.add(updateSqlM);
							updateSqlList.add(updateCntrct);
				}
			}
		}
			
		
		
	}
	
//	private Map<String, String> adviceLinkMap;
//	private void getAdviceLinkMap(){
//		
//		StringBuffer xBuff = new StringBuffer("");
//		xBuff.append(" SELECT CNTRCT_NO,SEL_ID,REC_ID,MSG_ID,MESSAGE_TYPE   ");
//		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_POOLLINEDOWNARALARM);
//		String cols = "CNTRCT_NO,SEL_ID,REC_ID,MSG_ID"; 
//		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
//		
//		Iterator<Map<String, Object>> in = back.iterator();
//		if(null != back && back.size() > 0) {
//			String cntrct_no   = null;
//			String sel_id      = null;
//			String rec_id      = null;
//			String msg_id      = null;
//			
//			StringBuffer yBuff = null;
//			
//			Map<String, Object> inner = null;
//			while(in.hasNext()) {
//				inner = (Map<String, Object>) in.next();
//				if(null != inner.get("CNTRCT_NO") && 
//				   null != inner.get("SEL_ID") && 
//				   null != inner.get("REC_ID") &&
//				   null != inner.get("MSG_ID")) {
//					
//					cntrct_no = (String)inner.get("CNTRCT_NO");
//					sel_id    = (String)inner.get("SEL_ID");
//					rec_id    = (String)inner.get("REC_ID");
//					msg_id    = (String)inner.get("MSG_ID");
//					
//					yBuff = new StringBuffer("");
//					yBuff.append(cntrct_no);
//					yBuff.append(";");
//					yBuff.append(sel_id);
//					yBuff.append(";");
//					yBuff.append(rec_id);
//					//yBuff已经能够确定唯一的一条记录了，做KEY
//					adviceLinkMap.put(yBuff.toString(), msg_id);
//					
//				}
//			}
//		}
//		
//	}
	
	private void updateCntrct(){
		try {
			daoHelper.execBatchUpdate(updateSqlList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
