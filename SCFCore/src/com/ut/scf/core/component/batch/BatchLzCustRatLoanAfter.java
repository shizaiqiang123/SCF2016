package com.ut.scf.core.component.batch;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.hibernate.Session;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.orm.hibernate4.SessionFactoryUtils;
import org.springframework.stereotype.Component;

//import com.ctc.wstx.util.StringUtil;
//import com.sun.jmx.snmp.Timestamp;







import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.services.advice.impl.IAdviceGenerate;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.dao.hibernate.HibernateBaseDao;


/**
 * 客户评级
 * 贷后类型评级定时任务
 * @author JinJH
 * @since  2016-09-20
 */
@Component("batchLzCustRatLoanAfter")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzCustRatLoanAfter extends AbsRunableTask {

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
			daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			queryFactory = ClassLoadHelper.getComponentClass("hqlQuery");
			processor    = ClassLoadHelper.getComponentClass("aPSubmitProcessor");
			context      = ApSessionUtil.getContext();
			selIdList = new ArrayList<String>();
			ratClassList = new ArrayList<String>();
			updateSqlList = new ArrayList<List<String>>();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	
	@Override
	public void execute() {
		/*==========修改=========*/
		initTool();
		
//		initDayOffConfig();
		
//		getAdviceLinkMap();
		
		getAllSelId();//初始化全局变量selIdList
		
		getAllRatClass();//初始化全局变量ratClassList
		 
		try {
			updateCustRatLevel();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		if(!msgMap4Add.keySet().isEmpty() || !msgMap4Update.keySet().isEmpty()) {
//			//generator.generatePoint2PointMsg4DueARAlarm(msgMap);
//			generator.generatePoint2PointMsg4PoolLineDownAlarm(msgMap4Add,msgMap4Update);
//		}
//		
	}
	
//	private void initDayOffConfig() {
//		TaskPara taskPara = (TaskPara) currentTask.getParam();//获取Task
//		TrxDataPara trxDataPara = taskPara.getTrxdatapara();//获取Task参数
//		String paraDt = (String) trxDataPara.getProterties().get("para"); // 发票到期前设置天数
////		dayOffConfig = Integer.parseInt(paraDt);
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
	
	private List<String> selIdList;
	private List<String> ratClassList;
	private List<List<String>> updateSqlList;
	/*
	 * 1.sql:select t.sys_ref_no from cust_m t where t.cust_Tp = '1';
	 * 2.利用以上sql从custM表中得到selId并循环selId
	 * 3.sql:select a.sys_ref_no,a.rat_base_id,a.rat_name,b.class_name from trx.custrat_detail_m a Left Join trx.custrat_base_m b 
	 * 		on a.rat_base_id = b.sys_ref_no;
	 * 4.反射的得到查询到的classsName的对象，调用方法得到扣减分数  getClass().queryInvcOverDue(selId);
	 */
	/**
	 *  得到所有的卖方id
	 */
	private void getAllSelId(){
		String selIdcols = "SYS_REF_NO"; 
		
		StringBuffer selIdBuff = new StringBuffer("");
		selIdBuff.append(" SELECT SYS_REF_NO FROM TRX.CUST_M WHERE CUST_TP = 1");
		List<Map<String, Object>> allSelId = daoHelper.executeOrentSql(selIdBuff.toString(), selIdcols.split(","));
		if(null != allSelId && allSelId.size() > 0){
			Iterator<Map<String, Object>> selIdItera = allSelId.iterator();
			while(selIdItera.hasNext()) {
				Map<String, Object> selIdMap = (Map<String, Object>) selIdItera.next();
				//将selIdMap.get("selId")循环放入List集合
				selIdList.add((String)selIdMap.get("SYS_REF_NO"));
			}
		}
	}
	
	/**
	 * 得到“贷后”类型下所有的评级内容对应的className
	 */
	private void getAllRatClass(){
		String ratClasscols = "SYS_REF_NO,RAT_BASE_ID,RAT_NAME,CLASS_NAME"; 
		
		StringBuffer ratClassBuff = new StringBuffer("");
		ratClassBuff.append(" SELECT A.SYS_REF_NO,A.RAT_BASE_ID,A.RAT_NAME,B.CLASS_NAME");
		ratClassBuff.append(" from trx.custrat_detail_m A,trx.custrat_base_m B");
		ratClassBuff.append(" where A.rat_base_id = B.sys_ref_no and A.cust_rat_tp = 1");
		
		List<Map<String, Object>> allRatClass = daoHelper.executeOrentSql(ratClassBuff.toString(), ratClasscols.split(","));
		if(null != allRatClass && allRatClass.size() > 0){
			Iterator<Map<String, Object>> ratClassItera = allRatClass.iterator();
			while(ratClassItera.hasNext()) {
				Map<String, Object> ratClassMap = (Map<String, Object>) ratClassItera.next();
				//将selIdMap.get("selId")循环放入List集合
				ratClassList.add((String)ratClassMap.get("CLASS_NAME"));
			}
		}
	}
	
	/**
	 * 算出每个客户的贷后评分并进行更新
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws SecurityException 
	 * @throws NoSuchMethodException 
	 */
	private void updateCustRatLevel() throws ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException{
		//外层循环：循环 selIdList 集合
		int subScore = 0;
		String ratLevel = null;
		Iterator<String> selIdListItera = selIdList.iterator();
		while(selIdListItera.hasNext()) {
			subScore = 0;
			String selId = selIdListItera.next();//这次的selId
			Iterator<String> ratClassListItera = ratClassList.iterator();
			while(ratClassListItera.hasNext()) {
				String ratClass = ratClassListItera.next();
				Class ratcla=Class.forName(ratClass); //通过类路径
				 //获取类中的非静态方法
		        Method queryInvcOverDue = ratcla.getMethod("getScore", String.class);//反射参数类型要带上.class
		        //这是实例方法必须在一个对象上执行
		        //1.实例化
		        Object invcOverDue = ratcla.newInstance();//利用newInstance()构造对象，所构造对象的类构造函数不带参
		        //2.调用有参queryInvcOverDue 方法
		        Object scoreObj = queryInvcOverDue.invoke(invcOverDue,selId);
		        //将object类型转为int,得到每个客户每一条评级内容的分数
		        int score = Integer.parseInt(String.valueOf(scoreObj));
		        subScore = subScore + score;
			}
			//执行完上一个white，得到的subScore = 每个selId 贷后的扣减总分
			int ratScore = (100 + subScore)/10;
			switch (ratScore) {
			case 10:
				
			case 9:
				ratLevel = "A";
				break;
			case 8:
				ratLevel = "B";
				break;
			case 7:
				ratLevel = "C";
				break;
			case 6:
				ratLevel = "D";
				break;
			default:
				ratLevel = "E";
				break;
			}
			//将ratLevel 评分等级更新到custM表中
			System.out.println("客户id为"+selId+"的评分等级为"+ratLevel);
			List<String> updateCust = new ArrayList<String>();
			String updateSqlM = "update trx.Cust_M set cust_Level = '"+ratLevel+"' where sys_Ref_No = '"+selId+"'";
			updateCust.add(updateSqlM);
			updateSqlList.add(updateCust);
			updateCust = new ArrayList<String>();
			String updateSqlE = "update trx.Cust_E set cust_Level = '"+ratLevel+"' where sys_Ref_No = '"+selId+"'";
			updateCust.add(updateSqlE);
			updateSqlList.add(updateCust);
			
//			updateToCustM(selId,ratLevel);
		}
		try {
			daoHelper.execBatchUpdate(updateSqlList);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	private void updateToCustM(String selId,String custLevel){
		String updateSql = "update CustM set custLevel = ? where sysRefNo = ?";
		String[] values = {custLevel,selId};
		daoHelper.execUpdate(updateSql, values);
	}
}

