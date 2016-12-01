package com.ut.scf.core.services.advice.impl;

import java.sql.Timestamp;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.AdviceClient;

@Component("adviceMsgProcessor")
public class AdviceMsgProcessor implements IAdviceManagement{

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;	
	
	protected Logger getLogger(){
		return APLogUtil.getLogger("adviceLogger","","");
	}
	
	@Override
	public Object processAdvice(Object definition) {
		return null;
	}

	@Override
	public boolean mark2Readed(Object adviceMsg) {
		AdviceClient entity= null;;
		try {
			entity = getMsgObj(adviceMsg);
		} catch (Exception e) {
			getLogger().error(e.toString());
		}
		if("1".equals(entity.getMsgStatus())){
			entity.setMsgStatus(AdviceConstants.MSG_STATUS_READED+"");
		}
		updateMsgStatus(entity);
	
		return true;
	}

	@Override
	public boolean mark2unRead(Object adviceMsg) {
		AdviceClient entity= null;;
		try {
			entity = getMsgObj(adviceMsg);
		} catch (Exception e) {
			getLogger().error(e.toString());
		}
		
		entity.setMsgStatus(AdviceConstants.MSG_STATUS_UNREAD+"");
		updateMsgStatus(entity);
	
		return true;
	}

	@Override
	public boolean mark2Important(Object adviceMsg) {
		AdviceClient entity= null;;
		try {
			entity = getMsgObj(adviceMsg);
		} catch (Exception e) {
			getLogger().error(e.toString());
		}
		
		entity.setMsgStatus(AdviceConstants.MSG_STATUS_IMPORTANT+"");
		updateMsgStatus(entity);
	
		return true;
	}

	@Override
	public boolean mark2unImportant(Object adviceMsg) {
		AdviceClient entity= null;;
		try {
			entity = getMsgObj(adviceMsg);
		} catch (Exception e) {
			getLogger().error(e.toString());
		}
		
		entity.setMsgStatus(AdviceConstants.MSG_STATUS_READED+"");
		updateMsgStatus(entity);
	
		return true;
	}

	@Override
	public boolean deleteMsg(Object adviceMsg) {
		AdviceClient entity= null;;
		try {
			entity = getMsgObj(adviceMsg);
		} catch (Exception e) {
			getLogger().error(e.toString());
		}
		
		IDaoEntity updateEntity = new ExecDaoEntity();
		updateEntity.setSerializableEntity(entity);
		updateEntity.setType(IDaoEntity.ENTITY_TYPE_ENTITY);
		updateEntity.setOperateName(IDaoEntity.OPERATE_NAME_DELETE);
		FuncDataObj dataObj = new FuncDataObj(); 
		dataObj.addExcuteEntity(updateEntity);
		daoHelper.execUpdate(dataObj);
		return false;
	}

	@Override
	public boolean mark2Remind(Object adviceMsg, Timestamp newDateTime) {
		AdviceClient entity= null;;
		try {
			entity = getMsgObj(adviceMsg);
		} catch (Exception e) {
			getLogger().error(e.toString());
		}
		
		entity.setMsgStatus(AdviceConstants.MSG_STATUS_REMIND+"");
		entity.setMsgRemaindDate(newDateTime);
		updateMsgStatus(entity);
	
		return true;
	}
	
	public AdviceClient getMsgObj(Object adviceMsg) throws Exception{
		if(adviceMsg instanceof AdviceClient){
			return (AdviceClient) adviceMsg;
		}
		AdviceClient adviceInstance = new AdviceClient();
		BeanUtils.setBeanProperty(adviceInstance,(Map) adviceMsg);
		return adviceInstance;
	}
	
	public Object updateMsgStatus(AdviceClient instance){
		instance.setSysOpTm(DateTimeUtil.getTimestamp());
		IDaoEntity updateEntity = new ExecDaoEntity();
		updateEntity.setSerializableEntity(instance);
		updateEntity.setType(IDaoEntity.ENTITY_TYPE_ENTITY);
		updateEntity.setOperateName(IDaoEntity.OPERATE_NAME_UPDATE);
		FuncDataObj dataObj = new FuncDataObj(); 
		dataObj.addExcuteEntity(updateEntity);
		return daoHelper.execUpdate(dataObj);
	}
}
