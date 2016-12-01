package com.ut.scf.core.component.batch;

import java.sql.SQLException;
import java.sql.Timestamp;
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
 * 逾期应收账款预警
 * @author zhangyilei
 * @since  2015-12-24
 */
@Component("batchLzOverDueARAlarmProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzOverDueARAlarmProcessor extends AbsRunableTask {

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
			msgMap4Add = new HashMap<String, Map<String, String>>();
			msgMap4Update = new HashMap<String, Map<String, String>>();
			adviceLinkMap = new HashMap<String, String>();
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
		//查找已经存在着的提醒，为后继的更新操作提供数据
		getAdviceLinkMap();
		
		getMsgMapAtALL();
		
		if(!msgMap4Add.keySet().isEmpty() || !msgMap4Update.keySet().isEmpty()) {
			//generator.generatePoint2PointMsg4DueARAlarm(msgMap);
			generator.generatePoint2PointMsg4OverDueARAlarm(msgMap4Add,msgMap4Update);
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
	private void getMsgMapAtALL(){
		
		String cols = "SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,BUYER_ID,INV_NO,DUE_DT,INV_BAL,DAYOFF"; 
		
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT ");
		xBuff.append(" SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,BUYER_ID,INV_NO,DUE_DT,INV_BAL, TRUNC(SYSDATE)-TRUNC(DUE_DT) AS DAYOFF ");
		xBuff.append(" FROM TRX.INVC_M ");
		xBuff.append(" WHERE INV_BAL > 0 AND (TRUNC(DUE_DT) <= TRUNC(SYSDATE)) ");
		xBuff.append(" ORDER BY INV_NO ASC ");
		
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		if(null != back && back.size() > 0) {
			
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String inv_no      = null;
			String rec_id      = null;
			
			String key = null;
			
			System.out.println("-------------BatchLzOverDueARAlarmProcessor.getMsgMapAtALL.back.size()---" + back.size());
			
			
			Map<String, Object> inner = null;
			
			Map<String, String> mapMsg  = null;
			Map<String, String> mapMsg2 = null;
			
			StringBuffer yBuff = null;
			
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				
				inner = (Map<String, Object>) in.next();
				
				String dateStr = null;
				try {
					TIMESTAMP rebackinner = (TIMESTAMP)inner.get("DUE_DT");  
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
					
					mapMsg.put("msgTitle", "应收账款[" + (String)inner.get("INV_NO") + "]逾期预警");
					
					yBuff = new StringBuffer("");
					yBuff.append("应收账款[" + (String)inner.get("INV_NO")     + "]逾期预警,");
					yBuff.append("逾期日期[" + dateStr + "],");
					yBuff.append("应收账款余额[" + (java.math.BigDecimal)inner.get("INV_BAL")    + "],");
					yBuff.append("逾期天数[" + (java.math.BigDecimal)inner.get("DAYOFF")     + "].");
					
					mapMsg.put("recId",    ((String)inner.get("SYS_OP_ID")).trim());
					//mapMsg.put("sysRelId", ((String)inner.get("INV_NO")).trim());
					
					mapMsg.put("msgText", yBuff.toString());
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					inv_no    = (String)inner.get("INV_NO");
					rec_id    = (String)inner.get("SYS_OP_ID");
					
					mapMsg.put("CNTRCT_NO", cntrct_no);
					mapMsg.put("SEL_ID", sel_id);
					mapMsg.put("BUYER_ID", buyer_id);
					mapMsg.put("INV_NO", inv_no);
					
					key = cntrct_no + ";" + sel_id + ";" + buyer_id + ";" + inv_no + ";" + rec_id;
					if(null != adviceLinkMap.get(key)) {
						mapMsg.put("MSG_ID", (String) adviceLinkMap.get(key));
						msgMap4Update.put(((String)inner.get("SYS_OP_ID")).trim() + "-" + (String)inner.get("INV_NO"), mapMsg);
					} else {
						   msgMap4Add.put(((String)inner.get("SYS_OP_ID")).trim() + "-" + (String)inner.get("INV_NO"), mapMsg);
					}
				}
				
				if(null != inner.get("SYS_REL_ID") && !((String)inner.get("SYS_REL_ID")).trim().equals("")) {
					
					mapMsg2 = new HashMap<String, String>();
					mapMsg2.put("msgTextId", id);
					mapMsg2.put("msgSendTp", String.valueOf(AdviceConstants.ADV_MSG_SEND_TP_MSG));
					mapMsg2.put("msgRemindTp", String.valueOf(AdviceConstants.ADV_MSG_REMIND_TP_WARNING));
					mapMsg2.put("sendNm", ApSessionUtil.getContext().getSysUserId());
					mapMsg2.put("sendId", ApSessionUtil.getContext().getSysUserRef());
					
					mapMsg2.put("msgTitle", "应收账款[" + (String)inner.get("INV_NO") + "]逾期预警");
					
					yBuff = new StringBuffer("");
					yBuff.append("应收账款[" + (String)inner.get("INV_NO")     + "]逾期预警,");
					yBuff.append("逾期日期[" + dateStr + "],");
					yBuff.append("应收账款余额[" + (java.math.BigDecimal)inner.get("INV_BAL")    + "],");
					yBuff.append("逾期天数[" + (java.math.BigDecimal)inner.get("DAYOFF")     + "].");
					
					mapMsg2.put("recId",    ((String)inner.get("SYS_REL_ID")).trim());
					//mapMsg2.put("sysRelId", ((String)inner.get("INV_NO")).trim());
					
					mapMsg2.put("msgText",yBuff.toString());
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					inv_no    = (String)inner.get("INV_NO");
					rec_id    = (String)inner.get("SYS_REL_ID");
					
					mapMsg.put("CNTRCT_NO", cntrct_no);
					mapMsg.put("SEL_ID", sel_id);
					mapMsg.put("BUYER_ID", buyer_id);
					mapMsg.put("INV_NO", inv_no);
					
					key = cntrct_no + ";" + sel_id + ";" + buyer_id + ";" + inv_no + ";" + rec_id;
					
					if(null != adviceLinkMap.get(key)) {
						mapMsg.put("MSG_ID", (String)adviceLinkMap.get(key));
						msgMap4Update.put(((String)inner.get("SYS_REL_ID")).trim() + "-" + (String)inner.get("INV_NO"), mapMsg);
					} else {
						   msgMap4Add.put(((String)inner.get("SYS_REL_ID")).trim() + "-" + (String)inner.get("INV_NO"), mapMsg);
					}
				}
				
			}
			
		}
		
	}
	
	private Map<String, String> adviceLinkMap;
	private void getAdviceLinkMap(){
		
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT CNTRCT_NO,SEL_ID,BUYER_ID,INV_NO,REC_ID,MSG_ID,MESSAGE_TYPE   ");
		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_OVERDUEARALARM);
		String cols = "CNTRCT_NO,SEL_ID,BUYER_ID,INV_NO,REC_ID,MSG_ID"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		Iterator<Map<String, Object>> in = back.iterator();
		if(null != back && back.size() > 0) {
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String inv_no      = null;
			String rec_id      = null;
			String msg_id      = null;
			
			StringBuffer yBuff = null;
			
			Map<String, Object> inner = null;
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if(null != inner.get("CNTRCT_NO") && 
				   null != inner.get("SEL_ID") && 
				   null != inner.get("BUYER_ID") &&
				   null != inner.get("INV_NO") &&
				   null != inner.get("REC_ID") &&
				   null != inner.get("MSG_ID")) {
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					inv_no    = (String)inner.get("INV_NO");
					rec_id    = (String)inner.get("REC_ID");
					msg_id    = (String)inner.get("MSG_ID");
					
					yBuff = new StringBuffer("");
					yBuff.append(cntrct_no);
					yBuff.append(";");
					yBuff.append(sel_id);
					yBuff.append(";");
					yBuff.append(buyer_id);
					yBuff.append(";");
					yBuff.append(inv_no);
					yBuff.append(";");
					yBuff.append(rec_id);
					//yBuff已经能够确定唯一的一条记录了，做KEY
					adviceLinkMap.put(yBuff.toString(), msg_id);
					
				}
			}
		}
		
	}


}
