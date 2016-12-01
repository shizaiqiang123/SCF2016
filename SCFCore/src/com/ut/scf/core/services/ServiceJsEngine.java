package com.ut.scf.core.services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.product.ProductPara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.js.AbsServerSideJs;
import com.ut.scf.core.js.ScriptManager;
import com.ut.scf.core.services.loan.LoanDistribution;
import com.ut.scf.core.services.loan.LoanDistributionDouble;
import com.ut.scf.dao.IDaoHelper;

@Service("serviceJsEngine")
@Scope("prototype")
public class ServiceJsEngine extends AbsServerSideJs {

	private final String BEANNAME = "$";

	protected Object reqData;

	protected Object commData;

	protected Object funcData;

	protected Object userData;

	private Date sysDate;
	
	@Resource(name = "queryFactory")
	private IQueryFactory queryFactory;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoExecHelper;

	private String serviceType;

	private IServcieManager serviceManager;

	private ServicePara serviceObj;
	

	private List<IServiceEntity> subjectList = new ArrayList<IServiceEntity>();

	@Override
	public void initTrxData(Object trxData) {
		if (scriptMgr == null) {
			scriptMgr = new ScriptManager(BEANNAME, this);
		}
		subjectList.clear();
		Assert.isTrue(JSONObject.class.isAssignableFrom(trxData.getClass()), "Currenttly doesn't support others data type but [JSONObject].");
		this.orgnData = (JSONObject) trxData;

		this.reqData = trxData;

		JSONObject reqJson = (JSONObject) this.reqData;

		commData = JsonHelper.getConnObject(reqJson);
		funcData = JsonHelper.getFuncObject(reqJson);
		userData = JsonHelper.getUserObject(reqJson);
		this.trxData = JsonHelper.getTrxObject(reqJson);

		sysDate = DateTimeUtil.getSysDate();
	}

	@Override
	public Object getTrxData() {
		return this.reqData;
	}
	public Object getUserData(){
		return this.userData;
	}

	@Override
	public void initTrxPara(Object trxPara) {
		serviceObj = (ServicePara) trxPara;
	}
	public Object getTrxDom(Object trxData){
		JSONObject reqData=(JSONObject) trxData;
		Object trxDom=JsonHelper.getTrxObject(reqData);
		return trxDom;
	}

	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("service", fileName));
		if (scriptFile.exists() && scriptFile.canRead()) {
			scriptMgr.exec(scriptFile);
		} else
			throw new IOException("File not found or cannt read.");
	}

	@Override
	public void executeJsContent(String jsContent) throws Exception {
		scriptMgr.exec(jsContent);
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public void appendRule(String ruleName) throws Exception {
		// IServiceRegister serviceRegister =
		// serviceManager.getService(serviceType);
		// IServiceEntity entity = getEntityInstance(serviceRegister);
		// entity.set
		serviceObj.setRule(ruleName);
	}

	// public IServiceEntity getEntityInstance(IServiceRegister register) throws
	// InstantiationException, IllegalAccessException{
	// Class<? extends IServiceEntity> t = register.getServiceEntity();
	// return t.newInstance();
	// }
	public Object getProduct(String productId){
		ProductPara productPara=XMLParaParseHelper.parseProductPara(productId, "");
//		JSONObject productPara=JsonUtil.getJSON(productPara);
		return productPara;
	}
	public Object getJson(Object object){
		return JsonUtil.getJSON(object);
	}
	public Object selectGapiMsg(JSONObject json,ProductPara productPara){
		LoanDistribution loanDistribution= new LoanDistribution();
		loanDistribution.initDate(json, productPara);
		loanDistribution=(LoanDistributionDouble)loanDistribution.judgeFintp();
		loanDistribution.initDate(json, productPara);
		loanDistribution.sortProductId();	
		return loanDistribution.getFinsources();
	}
	public JSONObject queryTable(String tableName, String params, String[] values) throws Exception {
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData(JsonUtil.clone((JSONObject) this.trxData));
		QueryNode qn = new QueryNode();
//			QueryNode ld = (LogicNode) logicPara;
			qn.setTablename(tableName);
			StringBuffer hql = new StringBuffer();
			String sql = "from " + tableName;
			hql.append(sql);
			if (StringUtil.isNotEmpty(params) && values != null) {
				String[] queryParams = params.split(",");
				hql.append(" where ");
				for (int i = 0; i < queryParams.length; i++) {
					hql.append(queryParams[i] + " =? and ");
				}
				if (hql.toString().endsWith(" and ")) {
					hql.delete(hql.length() - " and ".length(), hql.length());
				}

				String queryValues = values[0];
				for (int i = 1; i < values.length; i++) {
					queryValues = queryValues + "," + values[i];
				}
				qn.setParams(queryValues);

			qn.setSql(hql.toString());
			qn.setType("S");
			qn.setCascadeevent("N");
		}
		logicObj.setReqParaObj(qn);
		FuncDataObj retData;
		try {
			retData = queryFactory.getProcessor(qn).queryData(logicObj);
			this.daoExecHelper.execQuery(retData);
			if (FuncDataObj.SUCCESS.equalsIgnoreCase(retData.getRetStatus())) {
				return JsonUtil.getJSON(retData.getData());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
