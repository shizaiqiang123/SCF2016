package com.ut.scf.core.workflow;


import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sunyard.sunflow.client.SunflowClient;
import com.sunyard.sunflow.engine.context.WorkItemContextCollection;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.sys.SysPara;
import com.ut.comm.xml.workflow.WorkFlowPara;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.IWorkFlow;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.workflow.impl.SunWorkFlowImpl;
import com.ut.scf.dao.IDaoHelper;

@Service("apWorkFlowProcessor")
public class DefaultWorkflowProcessor implements IWorkFlow {

	protected Logger logger = LoggerFactory.getLogger(this.getClass());

	protected ApSessionContext context;// 当前交易基本信息

	@Resource(name = "apWorkFlow")
	private WorkFlowCtrol workFlowControl;

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	@Override
	public void callWorkflow(Object reqDom, Object resultDom) {
		context = ApSessionUtil.getContext();
		WorkFlowConnectorEntity entity = getConnectEntity();
		if (!entity.isEnable()) {
			logger.warn("Workflow Engine is turn off.");
			return;
		}
		logger.debug("Call workflow begin.");

		String strTrxType = ApSessionUtil.getContext().getStrTrxType();
		try {
			switch (strTrxType) {
			case ComponentConst.COMP_TRX_TYPE_SUBMIT:
				submitWorkflow(reqDom, resultDom);
				break;
			case ComponentConst.COMP_TRX_TYPE_QUERY:
				queryWorkflow(reqDom, resultDom);
				break;
			case ComponentConst.COMP_TRX_TYPE_CANCEL:
				cancelWorkflow(reqDom, resultDom);
				break;
			default:
				break;
			}
			logger.debug("Call workflow end.");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("Call Work Flow Error:" + e.getMessage());
		}

	}

	public void submitWorkflow(Object reqDom, Object resultDom) throws Exception {
		JSONObject reqData = (JSONObject) reqDom;
		FunctionPara funcObj = getFunctionPara(reqDom);
		String workflowId = funcObj.getWorkflow();
		if (StringUtil.isTrimEmpty(workflowId)) {
			logger.debug("No workflow defined in current function.");
			return;
		}
		WorkFlowPara para = getWorkFlowPara(reqDom, workflowId);
		JSONObject func = JsonHelper.getFuncObject(reqData);
		JSONObject trxDomConfirm = JsonHelper.getTrxObject(reqData);
		String isConfirm ="";
		if(trxDomConfirm.containsKey("isConfirm")){
			isConfirm = trxDomConfirm.getString("isConfirm");
		}
		
		
		if("RE".equalsIgnoreCase(func.getString("funcType"))||"FP".equalsIgnoreCase(func.getString("funcType"))||
				"N".equalsIgnoreCase(para.getStatus())||"0".equals(isConfirm)||"1".equals(isConfirm)){
			workFlowControl.checkIn(reqData);
//		if(JsonHelper.hasWorkflowObject(reqData)){
//			JSONObject workFlowJson = JsonHelper.getWorkflowObject(reqData);
//			WorkItem wi = (WorkItem) JsonUtil.getBean(workFlowJson, WorkItem.class);
//			String workflowId = wi.getItemId();
//			if(StringUtil.isTrimEmpty(workflowId)){
//				logger.debug("No workflow defined in current function.");
//				return;
//			}
//			// checkin
//			workflowId = funcObj.getWorkflow();
//			WorkFlowPara para = getWorkFlowPara(reqDom ,workflowId);
//			WorkFlowConnectorEntity connector = getConnectEntity();
//			try {
//				workFlowControl.connect(connector);
//				workFlowControl.checkIn(para,reqData);
//			} catch (Exception e) {
//				throw e;
//			}finally{
//				workFlowControl.disconnect();
//			}
		}else if ("DP".equalsIgnoreCase(func.getString("funcType"))) {
//			workFlowControl.checkOut(reqData);
			ApSessionContext context = ApSessionUtil.getContext();
			SysPara sysPara = XMLParaParseHelper.parseSysPara(context.getSysBusiUnit());

			SunflowClient sunflowClient = null;

			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(), Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(context.getUserId(), ""); // 用户登录

			long procinsid = queryPriIdBySysRefNo(reqData);// 根据sysRefNo查询对应的工作流ID
			WorkItemContextCollection workitems = sunflowClient.listWorkItems("WKI_PRIID="+procinsid,"1001");
			int length = workitems.size();
			long workItemId = 0;
			for(int i = 0;i < length;i++){
				if(i+1 == length){
					workItemId = workitems.get(i).getWorkItemID();
				}
			}
			try{
				sunflowClient.terminateWorkItem(workItemId);
				
				JSONObject trxDom = JsonHelper.getTrxObject(reqData);

				//则删除表flowM中对应的记录
				workFlowControl.deleteFlowM(reqData,Integer.parseInt(procinsid+""));
				//workFlowControl.create(para, reqData);//DP状态不需要重新创建工作流，根据业务来
			}catch(Exception e){
				e.printStackTrace();
			}
			
			
			
			

		}
		else {
			// non
			// create and checkout
			// WorkFlowConnectorEntity connector = getConnectEntity();

			try {
				// workFlowControl.connect(connector);
				workFlowControl.create(para, reqData);
				// workFlowControl.checkOut(para,reqData);
				// workFlowControl.checkIn(para,reqData);
			} catch (Exception e) {
				throw e;
			} finally {
				workFlowControl.disconnect();
			}
		}

	}

	private long queryPriIdBySysRefNo(JSONObject reqData) {
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.createReqJson();
		dataObj.setReqData(trxData);
		// dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  FlowM  a  where a.sysRefNo = ?";
		node.setParams(JsonHelper.getTrxObject(reqData).getString("sysRefNo"));
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			String procinsid = processResult.getInteger("procinsid").toString();
			return Long.parseLong(procinsid);
		} else {
			return 0;
		}
	}

	/**
	 * 区分新建实例还是修改在途
	 * 
	 * @param reqDom
	 * @param resultDom
	 * @throws Exception
	 */
	public void queryWorkflow(Object reqDom, Object resultDom) throws Exception {
		JSONObject reqData = (JSONObject) reqDom;
		FunctionPara funcObj = getFunctionPara(reqDom);
		// if(JsonHelper.hasWorkflowObject(reqData)){
		// Checkout
		// WorkFlowConnectorEntity connector = getConnectEntity();
		String workflowId = funcObj.getWorkflow();
		if (StringUtil.isTrimEmpty(workflowId)) {
			logger.debug("No workflow defined in current function.");
			return;
		}
		// WorkFlowPara para = getWorkFlowPara(reqDom ,workflowId);
		try {
			// workFlowControl.connect(connector);
			workFlowControl.checkOut(reqData);
		} catch (Exception e) {
			throw e;
		} finally {
			workFlowControl.disconnect();
		}
		// }else{
		// logger.debug("No workflow defined in current function.");
		// return;
		// }
	}

	public void cancelWorkflow(Object reqDom, Object resultDom) throws Exception {
		JSONObject reqData = (JSONObject) reqDom;
		FunctionPara funcObj = getFunctionPara(reqDom);
		String workflowId = funcObj.getWorkflow();
		if (StringUtil.isTrimEmpty(workflowId)) {
			logger.debug("No workflow defined in current function.");
			return;
		}
		// if(JsonHelper.hasWorkflowObject(reqData)){
		// revoke
		// WorkFlowConnectorEntity connector = getConnectEntity();
		// String workflowId = funcObj.getWorkflow();
		// WorkFlowPara para = getWorkFlowPara(reqDom ,workflowId);
		try {
			// workFlowControl.connect(connector);
			workFlowControl.cancel(reqData);
		} catch (Exception e) {
			throw e;
		} finally {
			workFlowControl.disconnect();
		}
		// }else{
		// non
		// }
	}

	protected WorkFlowConnectorEntity getConnectEntity() {
		WorkFlowConnectorEntity entity = new WorkFlowConnectorEntity();
		// 工作流引擎配置需要读取各保理商的配置信息
		ApSessionContext context = ApSessionUtil.getContext();
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context.getSysBusiUnit());
		// entity.setEnable(sysPara.getWorkflowflag());
		entity.setEnable("true".equalsIgnoreCase(sysPara.getWorkflowflag()));
		entity.setPassword(sysPara.getWorkflowpassword());
		entity.setPort(Integer.parseInt(sysPara.getWorkflowport()));
		entity.setUrl(sysPara.getWorkflowengine());
		String userName = context.getUserId();
		entity.setUserName(userName);
		return entity;
	}

	protected WorkFlowPara getWorkFlowPara(Object reqDom, String workflowId) {
		WorkFlowPara para = new WorkFlowPara();
		para.setId(workflowId);

		ApSessionContext context = ApSessionUtil.getContext();
		if (context.getUserId() == null) {
			context.setSysUserId(((JSONObject) reqDom).getJSONObject("trxDom").getString("userId"));
		}
		if (context.getSysBusiUnit() == null) {
			context.setSysBusiUnit("SYSBU00223");
		}
		para = XMLParaParseHelper.parseApPara(para, "workflow", context.getSysBusiUnit());

		JSONObject workflowData = (JSONObject) reqDom;
		JSONObject userInfo = JsonHelper.getUserObject(workflowData);
		if (userInfo.containsKey("sysBusiUnit")) {
			para.setAreacode(userInfo.getString("sysBusiUnit"));
		} else
			para.setBu(context.getSysBusiUnit());
		return para;
	}

	protected FunctionPara getFunctionPara(Object reqDom) {
		// String funcType = context.getSysFuncType();
		JSONObject reqData = (JSONObject) reqDom;
		JSONObject func = JsonHelper.getFuncObject(reqData);
		String funcType = func.getString("funcType");
		if (ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(funcType)) {
			return (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		} else if (ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(funcType)) {
			return (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		} else {
			return (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		}
	}

}
