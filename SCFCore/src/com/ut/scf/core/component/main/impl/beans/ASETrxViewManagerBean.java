package com.ut.scf.core.component.main.impl.beans;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.query.QueryPara;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.query.QueryFactoryImpl;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoHelper;

@Service("aSETrxViewManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxViewManagerBean implements IMainComponent {

	protected ApSessionContext context;

	protected FuncDataObj logicDataObj;

	protected FunctionPara funcObj;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	protected PagePara pagePara;

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	private String tableName;

	/**
	 * post query request and return query result list to page.
	 */
	@Override
	public Object submitData(Object paraDom) throws Exception {
		logicDataObj = new FuncDataObj();
		JSONObject trxDom = JsonHelper.getTrxObject((JSONObject) paraDom);
		logicDataObj.setReqData(trxDom);
		Object response = logicDataObj.buildReturnRespose();
		return response;
	}

	/**
	 * load catalog parameters and show on page.
	 */
	@Override
	public Object queryData(Object paraDom) throws Exception {
		logicDataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject((JSONObject) paraDom);
		context = ApSessionUtil.getContext();
		funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		pagePara = (PagePara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT);
		logicDataObj.setReqData(trxData);

		callQuery();
		Object response = logicDataObj.buildReturnRespose();

		return response;
	}

	protected FuncDataObj queryMainRecord() throws Exception {
		QueryNode mainLogic = new QueryNode();
		mainLogic.setType("E");
		String pageType = this.pagePara.getPagetype();
		if (StringUtil.isTrimEmpty(pageType))
			pageType = "View";
		mainLogic.setComponent(ComponentDefine.getDefinedComponent(pageType));
		mainLogic.setTablename(this.pagePara.getMaintable());
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone();

		dataObj.setReqParaObj(mainLogic);

		FuncDataObj mainRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);
		this.daoHelper.execQuery(mainRecord);
		logicDataObj.mergeResponse(mainRecord);
		return logicDataObj;
	}

	/**
	 * clear session and parameter load.
	 */
	@Override
	public Object cancelData(Object paraDom) throws Exception {
		logicDataObj = new FuncDataObj();
		Object response = logicDataObj.buildReturnRespose();
		return response;
	}

	public FuncDataObj callQuery() throws Exception {
		if (StringUtil.isTrimEmpty(pagePara.getQueryid())) {
			return queryMainRecord();
		}
		QueryPara queryPara = XMLParaParseHelper.parseQuery(pagePara.getQueryid(), context.getSysBusiUnit());
		for (int i = 0, len = queryPara.getNodeSize(); i < len; i++) {
			QueryNode queryNode = queryPara.getNode(i);
			logicDataObj.setReqParaObj(queryNode);
			FuncDataObj processResult = queryFactory.getProcessor(queryNode).queryData(logicDataObj);
			daoHelper.execQuery(processResult);
			logicDataObj.mergeResponse(processResult);
		}
		return logicDataObj;
	}
}
