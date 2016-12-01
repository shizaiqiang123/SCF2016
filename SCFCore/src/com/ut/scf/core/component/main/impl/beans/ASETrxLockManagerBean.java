package com.ut.scf.core.component.main.impl.beans;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.AbsMainCompManager;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;

@Component("aSETrxLockManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxLockManagerBean extends AbsMainCompManager{
	@Resource(name = "trxLockRecord")
	private ILogicComponent trxLockRecord;
	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;

	@Override
	public Object submitData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		
//		reqData.put(key, value);
		
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		PagePara mainPagePara = pageManager.getMainPage();
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("E");
		mainLogic.setTablename(mainPagePara.getMaintable());
		mainLogic.setComponent(ComponentDefine.getDefinedComponent(mainPagePara.getPagetype()));
		mainLogic.setCascadeevent(mainPagePara.getCascadeevent());
		dataObj.setReqParaObj(mainLogic);
		
		FuncDataObj mainRecord = trxLockRecord.postMasterData(dataObj);
		
		daoHelper.execUpdate(mainRecord);
		
		Object response = mainRecord.buildReturnRespose();
		
		clearRequestData();
		
		return response;
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		
		FuncDataObj mainRecord = queryMainRecord();
		
		Object response = mainRecord.buildReturnRespose();
		
		clearRequestData();
		
		return response;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
	}

	protected FuncDataObj queryMainRecord() throws Exception {
		PagePara mainPagePara = pageManager.getMainPage();
		
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone(); 
		QueryNode mainLogic = new QueryNode();
		mainLogic.setType("E");
		mainLogic.setTablename(mainPagePara.getMaintable());
		mainLogic.setComponent(ComponentDefine.getDefinedComponent(mainPagePara.getPagetype()));
		mainLogic.setCascadeevent(mainPagePara.getCascadeevent());
		dataObj.setReqParaObj(mainLogic);
		FuncDataObj mainRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);
		this.daoHelper.execQuery(mainRecord);
		return mainRecord;
	}
}
