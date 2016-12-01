package com.ut.scf.core.component.batch;

import java.sql.SQLException;
import java.sql.Timestamp;
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

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.services.advice.impl.IAdviceGenerate;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.orm.std.StdInstM;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
/**
 * 同步网点信息
 * @author zhangyilei
 * @since  2015-12-24
 */
@Component("batchLzSyncInstInfoProcessor")
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BatchLzSyncInstInfoProcessor extends AbsRunableTask {
	
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
				netMapAdd    = new HashMap<String, StdInstM>(); 
				netMapUpdate = new HashMap<String, StdInstM>(); 
				netMapDelete = new HashMap<String, StdInstM>();
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
			
			getNetInfoMap();
			

			
			if(!netMapAdd.keySet().isEmpty()) {
				//generator.generatePoint2PointMsg4DueARAlarm(msgMap);
				//generator.generatePoint2PointMsg4OverDueLoanAlarm(msgMap4Add,msgMap4Update);
			}
			if(!netMapUpdate.keySet().isEmpty()) {
				//generator.generatePoint2PointMsg4DueARAlarm(msgMap);
				//generator.generatePoint2PointMsg4OverDueLoanAlarm(msgMap4Add,msgMap4Update);
			}
			if(!netMapDelete.keySet().isEmpty()) {
				//generator.generatePoint2PointMsg4DueARAlarm(msgMap);
				//generator.generatePoint2PointMsg4OverDueLoanAlarm(msgMap4Add,msgMap4Update);
			}
			
		}
		
		private Map<String, StdInstM> netMapAdd; 
		private Map<String, StdInstM> netMapUpdate; 
		private Map<String, StdInstM> netMapDelete; 
		//读取同步网点消息来源
		private void getNetInfoMap(){
			
			//读取socket数据
			//读取xml格式文件
			//netMapAdd
			//netMapUpdate
			//netMapDelete
			
		}
		
		
		

		

}
