package com.ut.scf.core.services.advice.impl;

import java.sql.Timestamp;

/**
 * @see 通知消息管理接口，用来操作Advice Detail 表数据
 * @author PanHao
 *
 */
public interface IAdviceManagement {
	public String ADVICE_OP_TYPE_MARK = "mark";
	public String ADVICE_OP_TYPE_DELETE = "delete";
	public String ADVICE_OP_TYPE_ACTIVED = "query";
	
	Object processAdvice(Object definition);
	
	public boolean mark2Readed(Object adviceMsg);
	
	public boolean mark2unRead(Object adviceMsg);
	
	public boolean mark2Important(Object adviceMsg);
	
	public boolean mark2unImportant(Object adviceMsg);
	
	public boolean deleteMsg(Object adviceMsg);
	
	public boolean mark2Remind(Object adviceMsg,Timestamp newDateTime);
}
