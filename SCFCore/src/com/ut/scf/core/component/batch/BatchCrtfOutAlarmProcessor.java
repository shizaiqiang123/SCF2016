package com.ut.scf.core.component.batch;

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
 * 预付类-协议过期预警：相关的协议下质物还有库存，提醒质物出库
 * @author YeQing
 * @since  2016-9-8
 */
@Component("batchCrtfOutAlarmProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchCrtfOutAlarmProcessor extends AbsRunableTask {

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
			generator.generatePointCrtfOutAlarm(msgMap4Add,msgMap4Update);
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
		//String cols = "SYS_OP_ID,SYS_REL_ID,SYS_AUTH_ID,SYS_REF_NO,CNTRCT_NO,BUYER_ID,SEL_ID,PO_IN_NUM,TTL_PO_OUT_NUM,GOODS_NM,LMT_DUE_DT"; 
		String cols = "SYS_REF_NO,SYS_OP_ID,SYS_REL_ID,BUYER_ID,SEL_ID,SEL_NM,LMT_DUE_DT,BUSI_TP,DAYOFF"; 
		
		//String Sql = "SELECT T1.SYS_OP_ID,T1.SYS_REL_ID,T1.SYS_AUTH_ID,T1.SYS_REF_NO,T1.CNTRCT_NO,T1.BUYER_ID,T1.SEL_ID,T1.PO_IN_NUM,T1.TTL_PO_OUT_NUM,T1.GOODS_NM,T2.LMT_DUE_DT FROM CRTF_M T1 LEFT JOIN CNTRCT_M T2 ON T1.CNTRCT_NO = T2.SYS_REF_NO WHERE T2.LMT_DUE_DT <= SYSDATE AND (T1.PO_IN_NUM > T1.TTL_PO_OUT_NUM OR T1.TTL_PO_OUT_NUM IS NULL)";
		String Sql ="SELECT T1.SYS_REF_NO,T2.SYS_OP_ID,T2.SYS_REL_ID,T2.BUYER_ID,T1.SEL_ID,T1.SEL_NM,T1.LMT_DUE_DT,T1.BUSI_TP,TRUNC(T1.LMT_DUE_DT)-TRUNC(SYSDATE) AS DAYOFF FROM TRX.CNTRCT_M T1 INNER JOIN TRX.CRTF_M T2 ON T1.SYS_REF_NO = T2.CNTRCT_NO WHERE (TRUNC(T1.LMT_DUE_DT) - TRUNC(SYSDATE)) BETWEEN 1 AND " + dayOffConfig + " AND (T2.PO_IN_NUM > T2.TTL_PO_OUT_NUM OR T2.TTL_PO_OUT_NUM IS NULL) GROUP BY T1.SYS_REF_NO,T2.SYS_OP_ID,T2.SYS_REL_ID,T2.SYS_AUTH_ID,T2.BUYER_ID,T1.SEL_ID,T1.SEL_NM,T1.LMT_DUE_DT,T1.BUSI_TP"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(Sql, cols.split(","));
		
		if(null != back && back.size() > 0) {
			
			String cntrct_no   = null;
			String sel_id      = null;
			String buyer_id    = null;
			String rec_id      = null;
			String busi_tp      = null;
			String busiTp = null;
			String key = null;
			System.out.println("-------------BatchCrtfOutAlarmProcessor.getMsgMapAtALL.back.size()---" + back.size());
			
			
			Map<String, Object> inner = null;
			
			Map<String, String> mapMsg  = null;
			
			StringBuffer yBuff = null;
			
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if("2".equals(inner.get("BUSI_TP"))){
					busi_tp = "先票款后货";
				}
				if("4".equals(inner.get("BUSI_TP"))){
					busi_tp = "现货动态";
				}
				if("5".equals(inner.get("BUSI_TP"))){
					busi_tp = "现货静态";
				}
				String dateStr = null;
				try {
					TIMESTAMP rebackinner = (TIMESTAMP)inner.get("LMT_DUE_DT");  
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
					
					
					mapMsg.put("msgTitle", "预付类协议[" + (String)inner.get("SYS_REF_NO") + "]即将到期");
					
					yBuff = new StringBuffer("");
					yBuff.append("预付类-协议编号[" + (String)inner.get("SYS_REF_NO") + "],");
					yBuff.append("授信客户名称[" + (String)inner.get("SEL_NM") + "],业务类别为["+ busi_tp +"],");
					yBuff.append("协议将于[" + dateStr + "]到期,剩余天数[" + (java.math.BigDecimal)inner.get("DAYOFF")+ "天],");
					yBuff.append("该协议下尚有可出库质物,请及时出库！");
					
					mapMsg.put("recId",((String)inner.get("SYS_OP_ID")).trim());
					
					mapMsg.put("msgText", yBuff.toString());
					
					cntrct_no = (String)inner.get("SYS_REF_NO");
					sel_id    = (String)inner.get("SEL_ID");
					buyer_id  = (String)inner.get("BUYER_ID");
					rec_id    = (String)inner.get("SYS_OP_ID");
					busiTp = (String)inner.get("BUSI_TP");
					
					mapMsg.put("CNTRCT_NO", cntrct_no);
					mapMsg.put("SEL_ID", sel_id);
					mapMsg.put("BUYER_ID", buyer_id);
					mapMsg.put("busiTp", busiTp);
					key = cntrct_no + ";" + sel_id + ";" + buyer_id + ";" + rec_id;
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
		xBuff.append(" SELECT CNTRCT_NO,SEL_ID,BUYER_ID,REC_ID,MSG_ID,MESSAGE_TYPE   ");
		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_CRTFOUTALARM);
		String cols = "CNTRCT_NO,SEL_ID,BUYER_ID,REC_ID,MSG_ID,MESSAGE_TYPE"; 
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
