package com.ut.scf.core.services.advice.impl;

import java.util.List;
import java.util.Map;
/**
 * @see 通知生成接口，用来根据Advice Header表数据，生成Advice Detail 表数据
 * @author PanHao
 *
 */

public interface IAdviceGenerate {
	public void generateAdvice(Object reqData);
	
	//added by zhangyilei for 黑名单,    liuzhou at 2015-12-26 
	public void generatePoint2PointMsg4BlackList(Map<String, Map<String, String>> msgMap, Map<String, Map<String, String>> fullMap);
	//added by zhangyilei for 将到期预警, liuzhou at 2015-12-29
	public void generatePoint2PointMsg4DueARAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	public void generatePoint2PointMsg4OverDueARAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	
	
	public void generatePoint2PointMsg4DueLoanAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	public void generatePoint2PointMsg4OverDueLoanAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	
	
	//合格证预警
	public void generatePoint2PointMsg4CrtfNoAdd(List<String> msgAddList);
	public void generatePoint2PointMsg4CrtfNoUpdate(List<String> msgUpdateList);
	
	//池融资下补充池水位预警  add on 2016-09-08 by JinJH
	public void generatePoint2PointMsg4PoolLineDownAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	
	//预付类融资将到期预警
	public void generatePointCrtfOutAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	//存货类融资将到期预警
	public void generatePointCollatchOutAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
		
	//预付类融资将到期预警
	public void generatePointPrePayLoanDueAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	//存货类融资将到期预警
	public void generatePointInventoryLoanDueAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	//协议下库存价值总额小于最低库存价值预警
	public void generatePointTtlRegAmtLessRegLowestValAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
	//协议下库存价值总额小于协议下融资余额预警
	public void generatePointTtlRegAmtLessOpenLoanAmtAlarm(Map<String, Map<String, String>> msgMapAdd,Map<String, Map<String, String>> msgMapUpdate);
}
