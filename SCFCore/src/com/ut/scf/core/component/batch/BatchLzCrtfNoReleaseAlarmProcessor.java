package com.ut.scf.core.component.batch;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

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
 * 将到期应收账款预警
 * @author zhangyilei
 * @since  2016-01-11
 */
@Component("batchLzCrtfNoReleaseAlarmProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzCrtfNoReleaseAlarmProcessor extends AbsRunableTask {

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
			billAddMap    = new HashMap<String, Map<String, Object>>();
			billUpdateMap = new HashMap<String, Map<String, Object>>(); 
			msgAddList    = new ArrayList<String>();
			msgUpdateList = new ArrayList<String>();
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
		
		getBillMap();
		getList();
	
		if(null != msgAddList && msgAddList.size() > 0) {
			generator.generatePoint2PointMsg4CrtfNoAdd(msgAddList);
		}
		if(null != msgUpdateList && msgUpdateList.size() > 0) {
			generator.generatePoint2PointMsg4CrtfNoUpdate(msgUpdateList);
		}
	}
	
	private Map<String, String> adviceLinkMap;
	private void getAdviceLinkMap(){
		/*
		SELECT CNTRCT_NO,BILL_NO,CRTF_NO, REC_ID, MSG_ID, MESSAGE_TYPE  
		FROM ADVICE_LINK WHERE MESSAGE_TYPE = AdviceConstants.MESSAGE_TYPE_CRTFNORELEASE 
		*/
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT CNTRCT_NO,BILL_NO,CRTF_NO, REC_ID, MSG_ID, MESSAGE_TYPE   ");
		xBuff.append(" FROM STD.ADVICE_LINK WHERE MESSAGE_TYPE = " + AdviceConstants.MESSAGE_TYPE_CRTFNORELEASE);
		String cols = "CNTRCT_NO,BILL_NO,CRTF_NO,REC_ID,MSG_ID"; 
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		
		Iterator<Map<String, Object>> in = back.iterator();
		if(null != back && back.size() > 0) {
			String cntrct_no   = null;
			String bill_no     = null;
			String crtf_no     = null;
			String rec_id      = null;
			String msg_id      = null;
			
			StringBuffer yBuff = null;
			
			Map<String, Object> inner = null;
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if(null != inner.get("CNTRCT_NO") && 
				   null != inner.get("BILL_NO") && 
				   null != inner.get("CRTF_NO") &&
				   null != inner.get("REC_ID") &&
				   null != inner.get("MSG_ID")) {
					
					cntrct_no = (String)inner.get("CNTRCT_NO");
					bill_no   = (String)inner.get("BILL_NO");
					crtf_no   = (String)inner.get("CRTF_NO");
					rec_id    = (String)inner.get("REC_ID");
					msg_id    = (String)inner.get("MSG_ID");
					
					yBuff = new StringBuffer("");
					yBuff.append(cntrct_no);
					yBuff.append(";");
					yBuff.append(bill_no);
					yBuff.append(";");
					yBuff.append(crtf_no);
					yBuff.append(";");
					yBuff.append(rec_id);
					//yBuff已经能够确定唯一的一条记录了，做KEY
					adviceLinkMap.put(yBuff.toString(), msg_id);
					
				}
			}
		}
		
	}
	
	
	private Map<String, Map<String, Object>> billAddMap;
	private Map<String, Map<String, Object>> billUpdateMap;
	private void getBillMap() {
		  /*	
		  SELECT A.* FROM 
		  (
		  SELECT B.SYS_OP_ID, B.BILL_NO, B.CNTRCT_NO, B.BILL_DUE_DT, TRUNC(B.BILL_DUE_DT)-TRUNC(SYSDATE) AS DAYOFF,
		  C.CRTF_WAR_PRD
		  FROM TRX.BILL_M B LEFT JOIN CNTRCT_M C 
		  ON  ( B.CNTRCT_NO = C.CNTRCT_NO AND C.BUSI_TP = 2)
	
		  ) A WHERE A.DAYOFF <= A.CRTF_WAR_PRD
			*/
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT A.* FROM  ");
		xBuff.append("( ");
		xBuff.append(" SELECT B.SYS_OP_ID, B.BILL_NO, B.CNTRCT_NO, B.BILL_DUE_DT, ");
		xBuff.append("        TRUNC(B.BILL_DUE_DT)-TRUNC(SYSDATE) AS DAYOFF, ");
		xBuff.append("        C.CRTF_WAR_PRD ");
		xBuff.append("  FROM TRX.BILL_M B LEFT JOIN TRX.CNTRCT_M C ");
		xBuff.append("  ON  ( B.CNTRCT_NO = C.CNTRCT_NO AND C.BUSI_TP = ");
		xBuff.append(                                                   AdviceConstants.CONTRACT_BUSI_TP_THIRD_PARTY);
		xBuff.append("      ) ");
		xBuff.append(") ");
		xBuff.append(" A WHERE A.DAYOFF <= A.CRTF_WAR_PRD ");
		
		
		String cols = "SYS_OP_ID,BILL_NO,CNTRCT_NO,DAYOFF,CRTF_WAR_PRD"; 
		
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		
		if(null != back && back.size() > 0) {
			
			System.out.println("-------------batchLzCrtfNoReleaseAlarmProcessor.getBillMap.back.size()---" + back.size());
			
			int dayoff = 0;
			int crtf_war_prd = 0;
			String bill_no = null;
			
			Map<String, Object> inner = null;
			Iterator<Map<String, Object>> in = back.iterator();
			while(in.hasNext()) {
				inner = (Map<String, Object>) in.next();
				if(null != inner.get("DAYOFF") && null != inner.get("CRTF_WAR_PRD")) {
					dayoff = ((java.math.BigDecimal)inner.get("DAYOFF")).intValue();
					crtf_war_prd = ((java.math.BigDecimal)inner.get("CRTF_WAR_PRD")).intValue();
					if(dayoff == crtf_war_prd) {
						if(null != inner.get("BILL_NO")) {
							bill_no = (String)inner.get("BILL_NO");
							//预警极限=当前和截至时间差， 说明是第一次去处理票据下的合格证
							billAddMap.put(bill_no, inner);
						}
					} else {
						if(null != inner.get("BILL_NO")) {
							bill_no = (String)inner.get("BILL_NO");
							//预警极限=当前和截至时间差， 说明不是第一去处理下面的合格证了，
							billUpdateMap.put(bill_no, inner);
						}
					}
				}
			}
		}
		
	}
	
	private List<String> msgAddList;
	private List<String> msgUpdateList;
	private void getList() {
	  /*
	  SELECT CRTF_NO, BILL_NO,CNTRCT_NO,BILL_DUE_DT,TRUNC(BILL_DUE_DT)-TRUNC(SYSDATE) AS DAYOFF  
	  FROM CRTF_M WHERE 
	  RELEASE_DT IS NULL 
	  */
      String cols = "CRTF_NO,BILL_NO";
	  StringBuffer xBuff = new StringBuffer("");
	  xBuff.append(" SELECT CRTF_NO, BILL_NO,CNTRCT_NO,BILL_DUE_DT,TRUNC(BILL_DUE_DT)-TRUNC(SYSDATE) AS DAYOFF ");
	  xBuff.append(" FROM TRX.CRTF_M WHERE RELEASE_DT IS NULL ");
	  
	  List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
	  
	  if(null != back && back.size() > 0) {
		  
		  System.out.println("-------------batchLzCrtfNoReleaseAlarmProcessor.getList.back.size()---" + back.size());
		  
		  String bill_no   = null;
		  String cntrct_no = null;
		  int dayoff       = 0;
		  String sys_op_id = null;
		  String crtf_no   = null;
		  /*
		  dayoff = ((java.math.BigDecimal)inner.get("DAYOFF")).intValue();
			crtf_war_prd = ((java.math.BigDecimal)inner.get("CRTF_WAR_PRD")).intValue();
		  */
		  StringBuffer yBuff = null;
		  
		  Map<String, Object> inner = null;
		  Map<String,Object>  xMap  = null;
		  Iterator<Map<String, Object>> in = back.iterator();
		  while(in.hasNext()) {
			  
			inner = (Map<String, Object>) in.next();
			
			if(null != inner.get("BILL_NO")) {
				bill_no = (String)inner.get("BILL_NO");
				if(null != billAddMap.get(bill_no)) {
					xMap = billAddMap.get(bill_no);
					//"SYS_OP_ID,BILL_NO,CNTRCT_NO,DAYOFF,CRTF_WAR_PRD"; 
					//"CRTF_NO,BILL_NO"
					cntrct_no = (String)xMap.get("CNTRCT_NO");
					//dayoff    = (String)xMap.get("DAYOFF");
					dayoff   =  ((java.math.BigDecimal)xMap.get("DAYOFF")).intValue();
					sys_op_id = (String)xMap.get("SYS_OP_ID");
					crtf_no   = (String)inner.get("CRTF_NO");
					
					yBuff = new StringBuffer("");
					yBuff.append(cntrct_no);
					yBuff.append(";");
					yBuff.append(bill_no);
					yBuff.append(";");
					yBuff.append(crtf_no);
					yBuff.append(";");
					yBuff.append(dayoff);
					yBuff.append(";");
					yBuff.append(sys_op_id);
					
					msgAddList.add(yBuff.toString());
					
				} else if(null != billUpdateMap.get(bill_no)) {
					xMap = billUpdateMap.get(bill_no);
					cntrct_no = (String)xMap.get("CNTRCT_NO");
					//dayoff    = (String)xMap.get("DAYOFF");
					dayoff   =  ((java.math.BigDecimal)xMap.get("DAYOFF")).intValue();
					sys_op_id = (String)xMap.get("SYS_OP_ID");
					crtf_no   = (String)inner.get("CRTF_NO");
					
					yBuff = new StringBuffer("");
					yBuff.append(cntrct_no);
					yBuff.append(";");
					yBuff.append(bill_no);
					yBuff.append(";");
					yBuff.append(crtf_no);
					yBuff.append(";");
					yBuff.append(sys_op_id);
					
					if(null != adviceLinkMap.get(yBuff.toString())) {
						String msgid = (String)adviceLinkMap.get(yBuff.toString());
						yBuff.append(";");
						yBuff.append(dayoff);
						yBuff.append(";");
						yBuff.append(msgid);
						msgUpdateList.add(yBuff.toString());
					} else {
						yBuff.append(";");
						yBuff.append(dayoff);
						msgAddList.add(yBuff.toString());
					}
					
					
				} else {
					System.out.println("-------------------others------------" + bill_no);
				}
			} 
		 }
	  }
	  
	}		

	

	

}
