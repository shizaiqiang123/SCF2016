package com.ut.scf.core.js;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.ref.RefPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoHelper;

@Service("serverNodeJs")
// @Scope("prototype")
public class ServerNodeJsImpl extends AbsServerSideJs {

	@Resource(name = "serviceJsEngine")
	protected IServerSideJs jsEngine;

	private final String BEANNAME = "$";

	@Resource(name = "trxAddEventProcessor")
	private ILogicComponent eventComponent;

	@Resource(name = "queryFactory")
	private IQueryFactory queryFactory;

	@Resource(name = "logicFactory")
	LogicFactoryImpl logicFactory;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	
	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;
	protected ApSessionContext context;

	@Resource(name = "refNoManager")
	IReferenceNo refNoManager;
	public ServerNodeJsImpl() {
		scriptMgr = new ScriptManager(BEANNAME, this);
	}

	public Logger getLogger() {
		return APLogUtil.getUserLogger();
	}

	private AbsObject logicPara;
	
	private String strFuncType = "";

	@Override
	public void initTrxData(Object trxData) {
		if (scriptMgr == null) {
			scriptMgr = new ScriptManager(BEANNAME, this);
		}
		Assert.isTrue(JSONObject.class.isAssignableFrom(trxData.getClass()),
				"Currenttly doesn't support others data type but [JSONObject].");
		this.orgnData = (JSONObject) trxData;

		this.trxData = JsonUtil.clone((JSONObject) trxData);
		ApSessionContext context = ApSessionUtil.getContext();
		this.strFuncType = context.getSysFuncType();
	}
	
	public void jsonDom2TrxDom(){
		this.trxData=JsonHelper.getTrxObject((JSONObject)this.trxData, "trxDom");
	}

	@Override
	public void initTrxPara(Object trxData) {
		logicPara = (AbsObject) trxData;
		this.updateList.clear();
		this.releaseUpdateList.clear();
	}
	public void setSysFundName(String sysFundName){
		this.context = ApSessionUtil.getContext();	
		context.setSysFuncName(sysFundName);
	}

	@Override
	public Object getTrxData() {
		if (!updateList.isEmpty()) {
			StringBuffer updateList = new StringBuffer();
			for (String string : this.updateList) {
				updateList.append(string).append(",");
			}
			String strList = updateList.toString();
			if (StringUtil.isTrimNotEmpty(strList) && strList.endsWith(",")) {
				strList = strList.substring(0, strList.length() - 1);
				LogicNode logic = (LogicNode) logicPara;
				logic.setFields(strList);
			}
		}
		if (!releaseUpdateList.isEmpty()) {
			StringBuffer updateList = new StringBuffer();
			for (String string : this.releaseUpdateList) {
				updateList.append(string).append(",");
			}
			String strList = updateList.toString();
			if (StringUtil.isTrimNotEmpty(strList) && strList.endsWith(",")) {
				strList = strList.substring(0, strList.length() - 1);
				LogicNode logic = (LogicNode) logicPara;
				logic.setReleaseFields(strList);
			}
		}
		return trxData;
	}

	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("logic", fileName));

		try {
			if (scriptFile.exists() && scriptFile.canRead())
				scriptMgr.exec(scriptFile);
			else
				throw new IOException("File not found or cannt read.");
		} catch (IOException e) {
			printError(ErrorUtil.getErrorStackTrace(e));
			throw e;
		}
	}

	@Override
	public void executeJsContent(String jsContent) throws Exception {
		scriptMgr.exec(jsContent);
	}

	public List<String> updateList = new ArrayList<String>();
	
	public List<String> releaseUpdateList = new ArrayList<String>();

	public void setUpdateList(List<String> updateList) {
		if(!"RE".equalsIgnoreCase(this.strFuncType))
			this.updateList = updateList;
	}

	public void addUpdateField(String fieldName) {
		if(!"RE".equalsIgnoreCase(this.strFuncType))
			updateList.add(fieldName);
	}
	
	public void addReleaseUpdateField(String fieldName,Object value) throws Exception {
		if("RE".equalsIgnoreCase(this.strFuncType)){
			releaseUpdateList.add(fieldName);
			super.updateTrxProperty(fieldName, value);
		}
	}

	@Resource(name = "daoHelper")
	protected IDaoHelper daoExecHelper;

	/**
	 * 根据当前交易数据中的event（catalog中） 取整个Event表数据
	 * 
	 * @return
	 */
	public Object getMaxEventData(int sysEventTimes) {
		FuncDataObj logicObj = new FuncDataObj();
		JSONObject logicData = JsonUtil.clone((JSONObject) this.trxData);
		logicObj.setReqData(logicData);
		try {
			super.updateProperty(logicData, "sysEventTimes", sysEventTimes);
			QueryNode qn = new QueryNode();
			if (logicPara instanceof LogicNode) {
				LogicNode ld = (LogicNode) logicPara;
				qn.setTablename(ld.getTablename());
			} else {
				qn = (QueryNode) logicPara;
			}
			logicObj.setReqParaObj(qn);
			FuncDataObj retData;
			retData = eventComponent.inqData(logicObj);
			this.daoExecHelper.execQuery(retData);
			if (FuncDataObj.SUCCESS.equalsIgnoreCase(retData.getRetStatus())) {
				return retData.get(retData.getDoName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public int getMaxEventTimes() {
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData((JSONObject) this.trxData);
		QueryNode qn = new QueryNode();
		if (logicPara instanceof LogicNode) {
			LogicNode ld = (LogicNode) logicPara;
			qn.setTablename(ld.getTablename());
		} else {
			qn = (QueryNode) logicPara;
		}
		logicObj.setReqParaObj(qn);
		FuncDataObj retData;
		try {
			retData = eventComponent.inqData(logicObj);
			this.daoExecHelper.execQuery(retData);
			if (FuncDataObj.SUCCESS.equalsIgnoreCase(retData.getRetStatus())) {
				return (int) retData.get("sysEventTimes");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @param enable
	 *            false: 不再执行 transforto 逻辑 其他值，不影响
	 * @throws Exception
	 */
	public void setLogicNodeEnable(String enable) throws Exception {
		super.updateTrxProperty("LogicNodeEnable", enable);
	}

	/**
	 * @param enable
	 * 
	 * 
	 * @throws Exception
	 */
	public String queryUserRoleInfo(String userId) throws Exception {
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData((JSONObject) this.trxData);
		QueryNode qn = new QueryNode();
		if (logicPara instanceof LogicNode) {
			LogicNode ld = (LogicNode) logicPara;
			qn.setTablename(ld.getTablename());
			String sql = "select ro.sysRefNo from UserRoleInfo ro where ro.userId=?";
			qn.setSql(sql);
			qn.setParams(userId);
			qn.setType("S");
			qn.setCascadeevent("N");
		} else {
			qn = (QueryNode) logicPara;
		}
		logicObj.setReqParaObj(qn);
		FuncDataObj retData;
		try {
			retData = queryFactory.getProcessor(qn).queryData(logicObj);
			this.daoExecHelper.execQuery(retData);
			if (FuncDataObj.SUCCESS.equalsIgnoreCase(retData.getRetStatus())) {
				return retData.getString("sysRefNo");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * @param enable
	 * 
	 * 
	 * @throws Exception
	 */
	public String queryCustImpRefNo(String licenceNo) throws Exception {
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData((JSONObject) this.trxData);
		QueryNode qn = new QueryNode();
		if (logicPara instanceof LogicNode) {
			LogicNode ld = (LogicNode) logicPara;
			qn.setTablename(ld.getTablename());
			String sql = "select ro.sysRefNo from CustImp ro where ro.licenceNo=?";
			qn.setSql(sql);
			qn.setParams(licenceNo);
			qn.setType("S");
			qn.setCascadeevent("N");
		} else {
			qn = (QueryNode) logicPara;
		}
		logicObj.setReqParaObj(qn);
		FuncDataObj retData;
		try {
			retData = queryFactory.getProcessor(qn).queryData(logicObj);
			this.daoExecHelper.execQuery(retData);
			if (FuncDataObj.SUCCESS.equalsIgnoreCase(retData.getRetStatus())) {
				return retData.getString("sysRefNo");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	public String getTrxRef(String refName) {
		return UUIdGenerator.getUUId();
	}

	/**
	 * 
	 * @param tableName
	 *            表名
	 * @param params
	 *            无条件的话填null
	 * @param values
	 *            无条件的话填null
	 * @return
	 * @return
	 * @throws Exception
	 */
	public JSONObject queryTable(String tableName, String params, String[] values) throws Exception {
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData(JsonUtil.clone((JSONObject) this.trxData));
		QueryNode qn = new QueryNode();
		if (logicPara instanceof LogicNode) {
			LogicNode ld = (LogicNode) logicPara;
			qn.setTablename(ld.getTablename());
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
			}

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
	
	/**
	 * 
	 * @param tableName
	 *            表名
	 * @param params
	 *            无条件的话填null
	 * @param values
	 *            无条件的话填null
	 * @param asc
	 * 
	 * @param orderBy
	 * @return
	 * @throws Exception
	 */
	public JSONObject queryTableSetOrderBy(String tableName, String params, String[] values,String asc,String orderBy) throws Exception {
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData(JsonUtil.clone((JSONObject) this.trxData));
		QueryNode qn = new QueryNode();
		if (logicPara instanceof LogicNode) {
			LogicNode ld = (LogicNode) logicPara;
			qn.setTablename(ld.getTablename());
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
			}

			qn.setSql(hql.toString());
			qn.setType("S");
			qn.setCascadeevent("N");
			if((asc.trim().equalsIgnoreCase("Y")||asc.trim().equalsIgnoreCase("N"))&&StringUtil.isTrimNotEmpty(orderBy)){
				qn.setAsc(asc);
				qn.setOrderby(orderBy);
			}else{
					super.throwException("查询表"+tableName+"设置的升降序有错或orderBy为空！");
				}
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

	public Object callService(String serviceId) throws Exception {

		ServicePara servicePara = XMLParaParseHelper.parseFuncService(serviceId, logicPara.getBu());

		JSONObject serviceData = processServiceJs(servicePara, (JSONObject) trxData);
		
		if(!checkServiceEnable(serviceData)){
			return null;
		}

		// funcData.put("fromSTP", "Y");

		IESBServiceRequest request = new ServiceRequestImpl();

		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_POST);
		request.setRequestData(serviceData);
		request.setRequestPara(servicePara);
		request.setMethodName(servicePara.getMethodname());
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(servicePara));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());

		IESBServiceResponse retObj = ESBServiceUtil.getESBRunner().runService(request);
		if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == retObj.getResponseResult()) {
			
			FuncDataObj retData = (FuncDataObj) retObj.getResponseData();
			
			processCallback(retData,servicePara.getOnsuccess());

			String gapiMsgId = servicePara.getGapiid();
			if (StringUtil.isTrimNotEmpty(gapiMsgId)) {
				callGapiProcess(gapiMsgId,serviceData,serviceData);
				// 通过GAPI发送过了，是否就可以不返回到前台了，或者是否需要增加属性控制是否返回到前台
			}
		}
		return retObj.getResponseData();
	}

	private JSONObject processServiceJs(ServicePara para, JSONObject serviceData) throws Exception {
		String jsFile = para.getServicejs();

		if (StringUtil.isTrimNotEmpty(jsFile)) {
			jsEngine.initTrxData(serviceData);
			jsEngine.initTrxPara(para);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				getLogger().error(e.toString());
				throw e;
			}

			return (JSONObject) jsEngine.getTrxData();
		}
		return serviceData;
	}
	public void callGapiProcess(String gapiMsgId,Object reqData,JSONObject serviceData) throws Exception{
		try {
			IGAPIMsgRequest gapiRequest = new MessageSendRequest();
			gapiRequest.setMsgBody( reqData);
			
			GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId, "");
			IGAPIMsgResponse gapiResponse = gapiManager.processSendMsg(msgPara, gapiRequest,serviceData);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
//		try {
//			IGAPIMsgRequest gapiRequest = new MessageSendRequest();
//			gapiRequest.setMsgBody( reqData);
//			GapiMsgPara msgPara = XMLParaParseHelper.parseGapiMsgPara(gapiMsgId,"");
//			IGAPIMsgResponse gapiResponse = gapiManager.processSendMsg(msgPara, gapiRequest, serviceData);
//			logicDataObj.setRetStatus(gapiResponse.getRespCode()+"");
//			logicDataObj.setRetInfo(gapiResponse.getResponse());
//		} catch (Exception e) {
//			logicDataObj.setRetStatus(FuncDataObj.EXCEPTION);
//			logicDataObj.setRetInfo(e.getMessage());
//			e.printStackTrace();
//			throw e;
//		}
	}
	protected void processCallback(FuncDataObj retData,String inquireDataId) throws Exception {
		if(StringUtil.isTrimNotEmpty(inquireDataId)){
			InquireDataPara inqPara = XMLParaParseHelper.parseInqDataPara(inquireDataId,"");
			String inqType = inqPara.getType();
			
			JsonHelper.getTrxObject((JSONObject)trxData).putAll((Map) retData.getReturnObj());
			
//			if("S".equalsIgnoreCase(inqType)){
//				getServiceData(inqPara.getTarget());
//			}else if("Q".equalsIgnoreCase(inqType)){
//				getQueryData(inqPara.getTarget());
//			}else if("L".equalsIgnoreCase(inqType)){
//				getLogicData(inqPara.getTarget());
//			}else{
//				getQueryData(inqPara.getTarget());
//			}
		
		}
	}
	

	public void formatProcessDate() throws Exception {
		String key = "processDate";
		String format = "yyyy-MM-dd";
		String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(DateTimeUtil.getDate(((JSONObject) this
				.getOrgnData().get("trxDom")).getString(key), format));
		date += ":typejava.sql.Timestamp";
		((JSONObject) this.getOrgnData().get("trxDom")).put(key, date);

		String loanApplyState = ((JSONObject) trxData).getString("loanApplyState");
		switch (loanApplyState) {
		case "2":
			((JSONObject) trxData).put("loanApplyState", "5");
			break;
		default:
			((JSONObject) trxData).put("loanApplyState", "4");
			break;
		}
	}

	public void logicTable(String tableName, String fields, JSONObject jsonObject) throws Exception {
		LogicNode mainLogic = new LogicNode();
		// JSONObject jsonObject=new JSONObject();
		FuncDataObj dataObj = new FuncDataObj();
		mainLogic.setTablename(tableName);
		mainLogic.setType("E");
		mainLogic.setFields(fields);
		dataObj.setReqParaObj(mainLogic);
		dataObj.setReqData(jsonObject);
		dataObj = logicFactory.getProcessor(mainLogic).postData(dataObj);
		daoHelper.execUpdate(dataObj);
		// dataObj.setReqParaObj(mainLogic);
	}

	public void b2e0272() throws Exception {
		// JSONObject trxDom = (JSONObject) this.getOrgnData().get("trxDom");
		// JSONObject dataInfo = (JSONObject) trxDom.get("dataInfo");
		// int _total_rows = dataInfo.getInt("_total_rows");
		// for (int i = 0; i < _total_rows; i++) {
		// JSONObject data = (JSONObject) dataInfo.get("rows" + i);
		// String repayApplyState = data.getString("repayApplyState");
		// switch (repayApplyState) {
		// case "2":
		// data.put("repayApplyState", "4");
		// break;
		// default:
		// data.put("repayApplyState", "5");
		// break;
		// }
		// }
		String repayApplyState = ((JSONObject) trxData).getString("repayApplyState");
		switch (repayApplyState) {
		case "2":
			((JSONObject) trxData).put("repayApplyState", "4");
			break;
		default:
			((JSONObject) trxData).put("repayApplyState", "5");
			break;
		}
	}
//	
//	public JSONObject queryProfitData(String paraPath, String inqType, String target) throws Exception {
//		if ("PA".equalsIgnoreCase(inqType)) {
//			FuncDataObj logicDataObj = new FuncDataObj();
//			JSONObject reqData = JsonHelper.createReqJson();
//			JSONObject trxData = JsonHelper.getTrxObject(reqData);
//			logicDataObj.setReqData((JSONObject) trxData);
//			JSONObject reqJson = logicDataObj.getReqData();
//			reqJson.put("paraId", target);
//			QueryNode queryPara = new QueryNode();
//			queryPara.setTablename(paraPath);
//			queryPara.setComponent("paraQuery");
//			queryPara.setType("C");
//			logicDataObj.setReqParaObj(queryPara);
//			FuncDataObj retData;
//			retData = queryFactory.getProcessor(queryPara).queryData(logicDataObj);
//			return retData.getReqData();
//			
//		}else
//			return null;
//	}
//	
//	public String getSysRefNo(String refName, String refField) throws Exception {
//		List refList = new ArrayList();
//
//		// 协议表中的 sys_ref_no为invc_m表的CNTRCT_NO
//		RefPara refPara = new RefPara();
//		refPara.setRefname(refName);
//		refPara.setReffield(refField);
//
//		FuncDataObj funObj = new FuncDataObj();
//		JSONObject reqData = JsonHelper.createReqJson();
//		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
//		funObj.setReqParaObj(refPara);
//		funObj.setReqData((JSONObject) trxDom);
//		FuncDataObj retData = null;
//		try {
//			retData = (FuncDataObj) refNoManager.generateNo(funObj);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		List listRef = (List) retData.getData().get(retData.getDoName());
//		String sysRefNo = (String) ((Map) listRef.get(0)).get(refField);
//		return sysRefNo;
//	}
	
	public boolean checkServiceEnable(JSONObject currentDataObj){
		JSONObject trxData = JsonHelper.getTrxObject(currentDataObj);
		if(trxData.containsKey("ServiceEnable")){
			return !"false".equalsIgnoreCase(trxData.getString("ServiceEnable"));
		}
		return true;
	}
}
