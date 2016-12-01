package com.ut.scf.core.workflow.impl;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.comm.pojo.Page;
import com.sunyard.sunflow.client.ISunflowClient;
import com.sunyard.sunflow.client.SunflowClient;
import com.sunyard.sunflow.engine.context.ProcessInstanceContext;
import com.sunyard.sunflow.engine.context.ProcessInstanceContextCollection;
import com.sunyard.sunflow.engine.context.WorkItemContext;
import com.sunyard.sunflow.engine.context.WorkItemContextCollection;
import com.sunyard.sunflow.engine.dataclass.WMTAttribute;
import com.sunyard.sunflow.engine.workflowexception.SunflowException;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ListSortUtil;
import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.sys.SysPara;
import com.ut.comm.xml.workflow.WorkFlowPara;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.core.workflow.ProcessInstanceData;
import com.ut.scf.core.workflow.Procinstance;
import com.ut.scf.core.workflow.WorkFlowConnectorEntity;
import com.ut.scf.core.workflow.WorkFlowConst;
import com.ut.scf.core.workflow.WorkFlowCtrol;
import com.ut.scf.core.workflow.WorkItem;
import com.ut.scf.dao.IDaoHelper;

import net.sf.json.JSONObject;

@Service("apWorkFlow")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class SunWorkFlowImpl implements WorkFlowCtrol {
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	@Resource(name = "logicFactory")
	LogicFactoryImpl logicFactory;
	private ISunflowClient workFlowClient;
	// protected Logger logger = (Logger)
	// LoggerFactory.getLogger(this.getClass());

	@Resource(name = "workflowJs")
	protected IServerSideJs jsEngine;

	@Override
	public void connect(WorkFlowConnectorEntity entity) throws SunflowException {
		try {
			if (workFlowClient == null) {
				workFlowClient = new SunflowClient(entity.getUrl(),
						entity.getPort());
			}

			workFlowClient.connect(entity.getUserName(), entity.getPassword());
		} catch (SunflowException e) {
			e.printStackTrace();
			throw e;
		}

	}

	@Override
	public void disconnect() throws SunflowException {
		if (workFlowClient != null) {
			try {
				workFlowClient.disconnect();
			} catch (SunflowException e) {
				e.printStackTrace();
				throw e;
			}
		}
	}

	@Override
	public void create(WorkFlowPara para, JSONObject instanceData) {
		// if (workFlowClient == null) {
		// return;
		// }
		createInstance(para, instanceData);
	}

	public void createInstance(WorkFlowPara para, JSONObject instanceData) {
		// JSONObject workflowData =
		// JsonUtil.getChildJsonObj(instanceData,WorkFlowConst.PROPERTY_ROOT_NM);
		// if(workflowData!=null){
		// long workItemID =
		// workflowData.containsKey(WorkFlowConst.PROPERTY_WORK_ITEM_ID)?
		// workflowData.getLong(WorkFlowConst.PROPERTY_WORK_ITEM_ID):0;
		// if(workItemID!=0){
		// //从workitem list 发起的交易，不再新建instance
		// return;
		// }
		// }
		//
		// try {
		// long defineId =
		// workFlowClient.getProcessDefinitionID(para.getWorkname());
		//
		// long proInsID = workFlowClient.createProcessInstance(defineId,
		// para.getName(), para.getDesc(),
		// para.getAreacode());
		//
		// ProcessInstanceData instance =
		// execJsFile(instanceData,para.getJspath());
		//
		// WMTAttribute[] beforeAttrs =
		// workFlowClient.getProcessRelevantData(proInsID, null,
		// para.getAreacode());
		// upateInstanceAttribute(beforeAttrs,instance);
		//
		// workFlowClient.modifyProcessInstanceRelevantData(proInsID,
		// beforeAttrs, para.getAreacode());
		// workFlowClient.startProcess(proInsID, para.getAreacode());
		//
		// WorkItem wi = new WorkItem();
		// wi.setItemCode(para.getAreacode());
		// wi.setCurrentStep(instance.getCurrentStep());
		// wi.setItemDesc( para.getDesc());
		// wi.setItemEvent(instance.getItemEvent());
		// wi.setItemName(para.getName());
		// wi.setItemRefNo(instance.getItemRefNo());
		// wi.setNextStep(instance.getNextStep());
		// wi.setPreStep(instance.getPreStep());
		// wi.setProInsId(proInsID);
		// JSONObject workitemData = JsonUtil.getJSON(wi);
		// instanceData.put(WorkFlowConst.PROPERTY_ROOT_NM, workitemData);
		//
		// } catch (SunflowException e) {
		// e.printStackTrace();
		// } catch (Exception e1) {
		// e1.printStackTrace();
		// }
		SunflowClient sunflowClient = null;
		try {
			ApSessionContext context = ApSessionUtil.getContext();
			SysPara sysPara = XMLParaParseHelper.parseSysPara(context
					.getSysBusiUnit());

			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(context.getUserId(), ""); // 用户登录
			long procInsID = 0;
			int weight = 0;
			
			JSONObject funcInfo = JsonHelper.getFuncObject(instanceData);
			String sunFlowNm;
			String creator;
			
			if("DP".equalsIgnoreCase(funcInfo.containsKey("funcType")?funcInfo.getString("funcType"):null)){
				sunFlowNm = para.getDpworkname();
				String sysRefNo = instanceData.getJSONObject("trxDom").getString("sysRefNo");
				List<Map> obj = queryFlowM(sysRefNo);
				creator = (String) obj.get(0).get("userId");
			}else{
				sunFlowNm = para.getWorkname();// 工作流名称
				creator = context.getUserId();
			}
			
			procInsID = sunflowClient.createProcessInstanceByName(sunFlowNm,
					sunFlowNm, sunFlowNm, weight, 20, "1001");
			// logger.info("======================================="+procInsID);
			System.out.println("======================================="
					+ procInsID);

			JSONObject userObj = JsonHelper.getUserObject(instanceData);
			JSONObject trxDom = JsonHelper.getTrxObject(instanceData);
			// 设置流程变量
			Map<String, String> messageMap = new HashMap<String, String>();
			messageMap.put("creator", creator);
			messageMap.put("bu", userObj.containsKey("sysBusiUnit")?userObj.getString("sysBusiUnit"):context.getSysBusiUnit());
			messageMap.put("roleId", userObj.containsKey("sysUserRole")?userObj.getString("sysUserRole"):null);
			messageMap.put("sysFuncId", context.getSysFuncId());
			messageMap.put("sysEventTimes", trxDom.containsKey("sysEventTimes")?trxDom.getString("sysEventTimes"):null);
			messageMap.put("sysOrgnFuncId", funcInfo.containsKey("sysFuncId")?funcInfo.getString("sysFuncId"):null);
			
			if(instanceData.containsKey("trxDom")){
				messageMap.put("sysRefNo", instanceData.getJSONObject("trxDom")
						.getString("sysRefNo"));
				messageMap.put("userOwnerId",instanceData.getJSONObject("trxDom")
						.containsKey("selId")?instanceData.getJSONObject("trxDom").getString("selId"):null);
			}else{
				messageMap.put("sysRefNo", instanceData.getString("sysRefNo"));
				messageMap.put("userOwnerId", instanceData.containsKey("selId")?instanceData.getString("selId"):null);
			}
			WMTAttribute[] attr = sunflowClient.getProcessRelevantData(
					procInsID, null, "1001");
			String instAttributesName = null;
			List<WMTAttribute> wmtList = new ArrayList<WMTAttribute>(
					messageMap.size());
			for (Object o : messageMap.keySet()) {
				for (int i = 0; i < attr.length; i++) {
					instAttributesName = attr[i].getAttributeName();
					// logger.info(instAttributesName+"====="+attr[i].getStringValue());
					System.out.println(instAttributesName + "====="
							+ attr[i].getStringValue());
					if (instAttributesName.equals(o)) {
						// 是否有修改流程跳转变量
						// if (!isModifyFlowVar && flowVarSet.contains(o)) {
						// isModifyFlowVar = true;
						// }
						// attr[i].setStringValue(messageMap.get(o));
						WMTAttribute wa = new WMTAttribute();
						wa.setAttributeName(instAttributesName);
						wa.setStringValue(messageMap.get(o));
						wmtList.add(wa);
						System.out.println(instAttributesName + ">>>>>>>>>>"
								+ messageMap.get(o));
						break;
					}
				}
			}

			attr = new WMTAttribute[wmtList.size()];
			for (int i = 0; i < wmtList.size(); i++) {
				attr[i] = wmtList.get(i);
			}
			sunflowClient.modifyProcessInstanceRelevantData(procInsID, attr,
					"1001");

			sunflowClient.startProcess(procInsID, "1001");
			// logger.info("==================================succ");
			System.out.println("==================================succ");
			// sunflowClient.applyWorkItem(450005);
			// sunflowClient.checkInWorkItem(450005);
			if(instanceData.containsKey("trxDom")){
				if("DP".equalsIgnoreCase(funcInfo.containsKey("funcType")?funcInfo.getString("funcType"):null)){
					editFlowM(instanceData.getJSONObject("trxDom").getString("sysRefNo"),
							procInsID, context.getUserId());
				}else{
					addFlowM(
							instanceData.getJSONObject("trxDom").getString("sysRefNo"),
							procInsID, context.getUserId());
				}
			}else{
				if("DP".equalsIgnoreCase(funcInfo.containsKey("funcType")?funcInfo.getString("funcType"):null)){
					editFlowM(
							instanceData.getJSONObject("trxDom").getString("sysRefNo"),
							procInsID, context.getUserId());
				}else
					addFlowM(
							instanceData.getString("sysRefNo"),procInsID, context.getUserId());
			}

		} catch (Exception e) {
			e.printStackTrace();
			// logger.error(e.getMessage(),e);
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}

	}

	private void addFlowM(String sysRefNo, long procInsID, String userId)
			throws Exception {

		
		
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = new JSONObject();
		trxData.put("sysRefNo", sysRefNo);
		trxData.put("procinsid", procInsID);
		trxData.put("userId", userId);

		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("C");
		mainLogic.setTablename("TRX.FLOW_M");
		mainLogic.setCascadeevent("N");
		dataObj.setReqParaObj(mainLogic);
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper
				.getBusiComponetProcessor("trxAddRecord");
		dataObj = t.postData(dataObj);
		daoHelper.execUpdate(dataObj);
	}

	private List<Map> queryFlowM(String sysRefNo){
		List<Map> obj = new ArrayList<Map>();;
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = new JSONObject();
		QueryNode queryNode = new QueryNode();
		queryNode.setSql("select c from FlowM c where  c.sysRefNo=?");
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
		queryNode.setParams(sysRefNo);		
		dataObj.setReqParaObj(queryNode);
		dataObj.setReqData(trxData);		
		dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
		daoHelper.execQuery(dataObj);
		if(dataObj.getData().size()!=0){
			obj = (List<Map>) dataObj.get(dataObj.getDoName());
			return obj;
		}
		return obj;
	} 
	
	private void editFlowM(String sysRefNo, long procInsID, String userId)
			throws Exception {
		
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = new JSONObject();
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("TRX.FLOW_M");
		mainLogic.setType("C");
		mainLogic.setCascadeevent("N");
		mainLogic.setFields("procinsid");
		dataObj.setReqParaObj(mainLogic);
		trxData.put("sysRefNo", sysRefNo);
		trxData.put("procinsid",procInsID);
		dataObj.setReqData(trxData);
		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxEditRecord");
		dataObj = t.postData(dataObj);
		daoHelper.execUpdate(dataObj);
	}

	
	@Override
	public void cancel(JSONObject instanceData) throws Exception {
		ApSessionContext context = ApSessionUtil.getContext();
		if(context.getUserId()==null)
			return;
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context
				.getSysBusiUnit());

		SunflowClient sunflowClient = null;

		try {
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(context.getUserId(), ""); // 用户登录

			long procinsid = queryPriIdBySysRefNo(instanceData);// 根据sysRefNo查询对应的工作流ID

			// 根据工作流Id查询当前节点的位置取得节点Id
			WorkItemContextCollection wcc = sunflowClient.listWorkItems(
					/*"PRI_STATE=1 AND WKI_STATE <> 6  AND WKI_PriID ="
							+ procinsid, "1001");*/
					"PRI_STATE=1 AND WKI_STATE = 4  AND WKI_PriID ="
					+ procinsid, "1001");
			if (wcc.size() < 1) {
				return;
			}
			long itemId = wcc.get(0).getWorkItemID();
			sunflowClient.releaseWorkItem(itemId);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public List<WorkItem> getAllWorkItems(int itemState, Page p) {
		return null;
	}

	@Override
	public List<WorkItem> getAllWorkItems(JSONObject reqData) {
		List<WorkItem> workItemList = new ArrayList<WorkItem>();
		workItemList.addAll(getWorkItemsByStatus(reqData));
		return workItemList;
	}

	@Override
	public void checkOut(JSONObject instanceData) throws Exception {
		
		ApSessionContext context = ApSessionUtil.getContext();
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context
				.getSysBusiUnit());
		if(context.getUserId()==null)
			return;
		SunflowClient sunflowClient = null;
		try {
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(context.getUserId(), ""); // 用户登录

			long procinsid = queryPriIdBySysRefNo(instanceData);// 根据sysRefNo查询对应的工作流ID

			// 根据工作流Id查询当前节点的位置取得节点Id
			WorkItemContextCollection wcc = sunflowClient.listWorkItems(
					"PRI_STATE=1 AND WKI_STATE in(1,2) AND WKI_PriID ="
							+ procinsid, "1001");
			if (wcc.size() < 1) {
				return;
			}
			long itemId = wcc.get(0).getWorkItemID();
			sunflowClient.applyWorkItem(itemId);

			System.out.println("==================================succ");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}

		/*
		 * JSONObject trxData = JsonHelper.getTrxObject(workItemData);
		 * JSONObject workflowData = JsonHelper.getWorkflowObject(workItemData);
		 * if (workflowData == null) { return; } WorkItem wi = (WorkItem)
		 * JsonUtil.getBean(workflowData, WorkItem.class);
		 * 
		 * String workItemID = wi.getItemId();
		 * 
		 * String areaCode = wi.getItemCode();
		 * 
		 * if (StringUtil.isTrimNotEmpty(workItemID)) { long workId =
		 * Long.parseLong(workItemID); int workState; try { workState =
		 * workFlowClient .getWorkItemStatusByWorkItemID(workId); if (workState
		 * == 1) { workFlowClient.checkOutWorkItem(workId); } else if (workState
		 * == 2) { workFlowClient.applyWorkItem(workId); } } catch
		 * (SunflowException e) { e.printStackTrace(); throw e; }
		 * 
		 * } else { WorkItemContextCollection workitems; try { long instanceID =
		 * wi.getProInsId(); workitems =
		 * workFlowClient.listWorkItemsByUserIDAndProcInsID( instanceID, 1,
		 * areaCode); if (!workitems.isEmpty()) { int size = workitems.size();
		 * 
		 * for (int i = 0; i < size; i++) { WorkItemContext wic =
		 * workitems.get(i); int state = wic.getState();
		 * 
		 * if (state == WorkItemStateType.INITIAL_STATE) { workFlowClient
		 * .checkOutWorkItem(wic.getWorkItemID()); } else if (state ==
		 * WorkItemStateType.APPLY_WAITING_STATE) {
		 * workFlowClient.applyWorkItem(wic.getWorkItemID()); }
		 * workflowData.put(WorkFlowConst.PROPERTY_WORK_ITEM_ID,
		 * wic.getWorkItemID()); } } } catch (SunflowException e) {
		 * e.printStackTrace(); throw e; } catch (Exception e) {
		 * e.printStackTrace(); throw e; } }
		 */}

	/**
	 * 根据交易流水号查询工作流Id
	 * 
	 * @param trxDate
	 * @return
	 */
	private long queryPriIdBySysRefNo(JSONObject trxDate) {
		
		if(!trxDate.getJSONObject("trxDom").containsKey("sysRefNo")){
			return 0;
		}
		
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  FlowM  a  where a.sysRefNo = ?";
		node.setParams(trxDate.getJSONObject("trxDom").getString("sysRefNo"));
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
	 * 根据工作流Id查询创建者
	 * 
	 * @param trxDate
	 * @return
	 */
	private String queryCreatorByPriId(JSONObject trxDate, int priId) {
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  FlowM  a  where a.procinsid = ?";
		node.setParams(priId + ":typejava.lang.Integer");
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			String userId = processResult.getString("userId");
			return userId;
		} else {
			return null;
		}
	}

	/**
	 * 根据用户Id查询所有的工作流Id集合
	 * 
	 * @param trxDate
	 * @param userId
	 * @return
	 */
	private List<Long> queryPriIdByUser(JSONObject trxDate, String userId) {
		QueryNode node = new QueryNode();
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDate);
		String sql = "";
		sql = "select a  from  FlowM  a  where a.userId = ?";
		node.setParams(userId);
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		if (processResult.hasRecord()) {
			List flowList = (ArrayList) processResult.getData().get("data");
			// long[] priIds = new long[flowList.size()];
			List<Long> priIds = new ArrayList<Long>();
			for (int i = 0; i < flowList.size(); i++) {
				JSONObject bbb = JsonUtil.getJSON(flowList.get(i));
				String procinsid = bbb.getString("procinsid");
				// priIds[i]=Long.parseLong(procinsid);
				priIds.add(Long.parseLong(procinsid));
			}
			return priIds;
		} else {
			return null;
		}
	}

	@Override
	public void checkIn(JSONObject workItemData) {

		ApSessionContext context = ApSessionUtil.getContext();
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context
				.getSysBusiUnit());

		SunflowClient sunflowClient = null;

		try {
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(context.getUserId(), ""); // 用户登录

			long procinsid = queryPriIdBySysRefNo(workItemData);// 根据sysRefNo查询对应的工作流ID

			// 根据工作流Id查询当前节点的位置取得节点Id
			WorkItemContextCollection wcc = sunflowClient.listWorkItems(
					"PRI_STATE=1 AND WKI_STATE = 4  AND WKI_PriID ="
							+ procinsid, "1001");
			if (wcc.size() < 1) {
				return;
			}
			long itemId = wcc.get(0).getWorkItemID();
			JSONObject trxDom = JsonHelper.getTrxObject(workItemData);
			WMTAttribute[] workAttrs = sunflowClient.getWorkItemRelevantData(
					itemId, null, "1001");// 节点所有活动变量属性
			List<WMTAttribute> workWMTAttus = new ArrayList<WMTAttribute>(
					workAttrs.length);
			
			
//			WMTAttribute[] priAttrs = sunflowClient.getProcessRelevantData(
//					procinsid, null, "1001");// 流程所有活动变量属性
//			List<WMTAttribute> priWMTAttus = new ArrayList<WMTAttribute>(workAttrs.length);
			
			for (int i = 0; i < workAttrs.length; i++) {
				WMTAttribute wmtAttu = workAttrs[i];
				String attriNm = wmtAttu.getAttributeName();
				int attributeType = wmtAttu.getAttributeType();
				WMTAttribute wa = new WMTAttribute();
				wa.setAttributeName(attriNm);
				// 如果该节点的该变量在交易数据中存在，并且"描述"=1的，则将值赋给其映射的"流程变量"
				if (trxDom.containsKey(attriNm) &&	"1".equals(wmtAttu.getDescription())) {
					if (attributeType == 1) {
						wa.setIntValue(trxDom.getInt(attriNm));
					} else if (attributeType == 2) {
						wa.setBooleanValue(trxDom.getBoolean(attriNm));
					} else if (attributeType == 3) {
						wa.setDoubleValue(trxDom.getDouble(attriNm));
					} else if (attributeType == 4) {
						wa.setStringValue(trxDom.getString(attriNm));
					} else if (attributeType == 5) {
						wa.setTimestampValue(DateTimeUtil.getDateTime(trxDom
								.getString(attriNm)));
					} else if (attributeType == 6) {
						wa.setDateValue(DateTimeUtil.getDate(trxDom
								.getString(attriNm)));
					} else {
						wa.setObjectValue(trxDom.get(attriNm));
					}
					workWMTAttus.add(wa);
				}
			}
			// 得到该工作项的上一个工作项信息
			WorkItemContextCollection preWorkItem = sunflowClient
					.listWorkItems("WKI_ID<" + (itemId)
							+ " AND WKI_PRIID = " + procinsid, "1001");
			String preExecutor = "";
			long preWorkItemID = 0;
			if (preWorkItem.size() == 0) {// 如果查不到上一个工作项，说明是由开始节点传过来的，故上一步执行人Id是创建工作流的人
				preExecutor = queryCreatorByPriId(workItemData,Integer.parseInt(procinsid + ""));
			} else {
				for (int j = 0; j < preWorkItem.size(); j++){
					if(j==0){
						preExecutor = preWorkItem.get(j).getExecutorID();
					}else if(preWorkItem.get(j).getWorkItemID()>preWorkItemID){
						preExecutor = preWorkItem.get(j).getExecutorID();
					}
				} 
			}
			WMTAttribute preExe = new WMTAttribute();
			preExe.setAttributeName("preExecutor");
			preExe.setStringValue(preExecutor);
			workWMTAttus.add(preExe);
			//得到该工作项的上一个工作项信息

			// 每个节点任务执行后，将执行人赋值给"流程变量"里的"最后一次执行人"这个变量里
			WMTAttribute priWa = new WMTAttribute();
			priWa.setAttributeName("lastExecutor");
			priWa.setStringValue(context.getUserId());
			
			JSONObject trxDomConfirm = JsonHelper.getTrxObject(workItemData);
			
			if(trxDomConfirm.containsKey("isConfirm")){
				String isConfirm = trxDomConfirm.getString("isConfirm");
				WMTAttribute confirmWa = new WMTAttribute();
				confirmWa.setAttributeName("isConfirm");
				confirmWa.setStringValue(isConfirm);
				workWMTAttus.add(confirmWa);
			}
			
			workWMTAttus.add(priWa);
			
			workAttrs = new WMTAttribute[workWMTAttus.size()];
			for (int i = 0; i < workWMTAttus.size(); i++) {
				workAttrs[i] = workWMTAttus.get(i);
			}
			sunflowClient.modifyProcessInstanceRelevantData(procinsid, workAttrs,"1001");//修改"流程变量值"
//			sunflowClient.modifyWorkItemRelevantData(itemId, workAttrs, "1001");//修改节点变量值

			//=================================================================

			/*WMTAttribute[] attrs111 = sunflowClient.getWorkItemRelevantData(
					itemId, null, "1001");// 节点所有活动变量属性
			for (int i = 0; i < attrs111.length; i++) {
				System.out.println("节点变量=="+attrs111[i].getAttributeName()+"==="+attrs111[i].getStringValue());
			}*/
			//=================================================================

			
			
			
			//=================================================================
			WMTAttribute[] attrs222 = sunflowClient.getProcessRelevantData(
					procinsid, null, "1001");// 流程所有活动变量属性
			for (int i = 0; i < attrs222.length; i++) {
				System.out.println("流程变量=="+attrs222[i].getAttributeName()+"==="+attrs222[i].getStringValue());
			}
			//=================================================================


			sunflowClient.checkInWorkItem(itemId);// 节点ID
			
			//如果整个工作流结束了，则删除表flowM中对应的记录
			ProcessInstanceContext proInstance = sunflowClient.findProcessInstance(procinsid);
			if(proInstance.getInstanceState()==5){
				deleteFlowM(trxDom,Integer.parseInt(procinsid+""));
			}


			System.out.println("==================================succ");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}

	}
	
	public void deleteFlowM(JSONObject trxDom,int procinsid) throws Exception{
		FuncDataObj obj = new FuncDataObj();
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("S");
		mainLogic.setSql("delete from FlowM  where procinsid = ?");
		mainLogic.setParams(procinsid + ":typejava.lang.Integer");
		obj.setReqParaObj(mainLogic);
		obj.setReqData(trxDom);
		obj = logicFactory.getProcessor(mainLogic).postData(obj);
		daoHelper.execUpdate(obj);
	}

	@Override
	public void terminate(WorkFlowPara para, JSONObject workItemData)
			throws Exception {
		JSONObject trxData = JsonHelper.getTrxObject(workItemData);
		JSONObject workflowData = JsonUtil.getChildJsonObj(trxData,
				WorkFlowConst.PROPERTY_ROOT_NM);
		if (workflowData == null) {
			return;
		}
		String userID = workflowData.getString(WorkFlowConst.PROPERTY_USER_ID);

		long workItemID = workItemData
				.getLong(WorkFlowConst.PROPERTY_WORK_ITEM_ID);
		try {
			workFlowClient.terminateWorkItem(workItemID);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public long getWorkItemsCount(JSONObject reqData) throws Exception {
		// JSONObject userData = JsonHelper.getUserObject(reqData);
		// String areaCode = userData.getString("sysBusiUnit");
		// if(StringUtil.isTrimEmpty(areaCode))
		// areaCode = ASPathConst.getDefaultBuName();
		// long count =
		// workFlowClient.getWorkItemsByUserIDCount(WorkItemStateType.INITIAL_STATE,
		// areaCode);
		//
		// count+=workFlowClient.getWorkItemsByUserIDCount(WorkItemStateType.APPLY_WAITING_STATE,
		// areaCode);
		// return count;

		long count = 0;
		SunflowClient sunflowClient = null;
		try {
			ApSessionContext context = ApSessionUtil.getContext();
			SysPara sysPara = XMLParaParseHelper.parseSysPara(context
					.getSysBusiUnit());

			String userId = context.getUserId();
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(userId, ""); // 用户登录

			long procInsID = 0;
			int weight = 0;

			// (查询字段可以是workitem表和procinstance表中的字段)
			WorkItemContextCollection wc = sunflowClient.listWorkItems(
					"PRI_STATE=1 AND WKI_STATE =2  AND WKA_APPLYMAN LIKE '%,"
							+ userId + ",%'", "1001"); // WKA_APPLYMAN是把所用有权限的用户放在一个字段里的,用逗号隔开的，所以用like
			WorkItemContextCollection wcc = sunflowClient.listWorkItems(
					"PRI_STATE=1 AND WKI_STATE = 1 AND WKI_USER='" + userId
							+ "'", "1001"); // 推方式的时候，状态=1时user是有值的，拉的时候。状态=1时是没有值的。
			// for (int i = 0; i < wcc.size(); i++) {
			// System.out.println(wcc.get(i).getWorkItemID()
			// + wcc.get(i).getWorkItemName());
			// System.out.println(wcc.get(i).getProInstanceID());
			// }
			System.out.println("==================================succ");
			count = (long) (wc.size() + wcc.size());
			/*System.out.println("==================================succ");
			int workitemC =0;
			int workitemCC = 0;
			try{
				if(wc!=null&&wc.size()>0){
					workitemC = wc.size();
				}
				if(wcc!=null&&wcc.size()>0){
					workitemCC = wcc.size();
				}
				
			}catch(Exception e){
				e.printStackTrace();
			}
			count = (long) (workitemC +workitemCC);*/
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}
		return count;
	}

	@Override
	public List<Procinstance> getAllPassageItems(JSONObject reqData)
			throws Exception {

		List<Procinstance> proinceList = new ArrayList<Procinstance>();
		JSONObject userData = JsonHelper.getUserObject(reqData);
		String areaCode = userData.getString("sysBusiUnit");
		SunflowClient sunflowClient = null;
		ApSessionContext context = ApSessionUtil.getContext();
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context
				.getSysBusiUnit());

		String userId = context.getUserId();
		try {
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(userId, ""); // 用户登录

			if (StringUtil.isTrimEmpty(areaCode))
				areaCode = ASPathConst.getDefaultBuName();

			List<Long> priIds = queryPriIdByUser(reqData, userId);// 根据用户id查询改用户创建的工作流
			if (priIds == null || priIds.size() < 1) {
				return null;
			}
			ProcessInstanceContextCollection pros1 = new ProcessInstanceContextCollection();
			for (int i = 0; i < priIds.size(); i++) {
				// 根据工作流实例ID查询工作流实例
				ProcessInstanceContext pp = sunflowClient
						.findProcessInstance(priIds.get(i));
				pros1.add(pp);
			}
			// 根据参与者、状态、地区代码查询工作流实例集合
			ProcessInstanceContextCollection pros2 = sunflowClient
					.listProcessInstancesByUserIDAndState(userId, 1, "1001");

			// 去掉可能重复的工作流
			List<Long> copyPriIds = priIds;
			for (int i = 0; i < pros2.size(); i++) {
				ProcessInstanceContext pros = pros2.get(i);
				long instanceID = pros.getInstanceID();
				if (!copyPriIds.contains(instanceID)) {
					copyPriIds.add(instanceID);
					pros1.add(pros);
				}
			}

			if (!pros1.isEmpty()) {
				for (int i = 0; i < pros1.size(); i++) {
					ProcessInstanceContext pro = pros1.get(i);
					long procInsID = pro.getInstanceID();
					int state = pro.getInstanceState();
					if (state == 1) {
						Procinstance proince = new Procinstance();
						proince.setPriId(procInsID + "");
						proince.setPriNm(pro.getInstanceName());
						proince.setPriState(state + "");
						proince.setPriAreacode(pro.getAreaCode());
						proince.setPriStartTm(pro.getStartTime());

						WMTAttribute[] attrs = sunflowClient
								.getProcessRelevantData(procInsID, null, "1001");
						Map<String, Object> bussinessData = new HashMap<String, Object>();
						for (WMTAttribute wmtAttribute : attrs) {
							String attrName = wmtAttribute.getAttributeName();
							int attributeType = wmtAttribute.getAttributeType();
							if (attributeType == 1) {
								bussinessData.put(attrName,
										wmtAttribute.getIntValue());
							} else if (attributeType == 2) {
								bussinessData.put(attrName,
										wmtAttribute.getBooleanValue());
							} else if (attributeType == 3) {
								bussinessData.put(attrName,
										wmtAttribute.getDoubleValue());
							} else if (attributeType == 4) {
								bussinessData.put(attrName,
										wmtAttribute.getStringValue());
							} else if (attributeType == 5) {
								bussinessData.put(attrName,
										wmtAttribute.getTimestampValue());
							} else if (attributeType == 6) {
								bussinessData.put(attrName,
										wmtAttribute.getDateValue());
							} else {
								bussinessData.put(attrName,
										wmtAttribute.getObjectValue());
							}
						}
						proince.setBussinessData(bussinessData);

						proinceList.add(proince);
					}
				}

			}
		} catch (SunflowException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}
		return proinceList;

		// JSONObject userData = JsonHelper.getUserObject(reqData);
		// String areaCode = userData.getString("sysBusiUnit");
		// if (StringUtil.isTrimEmpty(areaCode))
		// areaCode = ASPathConst.getDefaultBuName();
		// WorkItemContextCollection workitems = workFlowClient
		// .listWorkItemsByUserID(WorkItemStateType.COMPLETED_STATE,
		// areaCode);
		// List<WorkItem> workItemList = new ArrayList<WorkItem>();
		// if (!workitems.isEmpty()) {
		// int size = workitems.size();
		//
		// for (int i = 0; i < size; i++) {
		// WorkItemContext wic = workitems.get(i);
		// long actId = wic.getProInstanceID();
		// long currActivity = wic.getActivityInstanceID();
		//
		// ActivityInstanceContextCollection actIncCon = workFlowClient
		// .listActivityInstanceByProInsID(actId, areaCode);
		// int stSize = actIncCon.size();
		// for (int j = 0; j < stSize; j++) {
		// ActivityInstanceContext stCon = actIncCon.get(j);
		// long currId = stCon.getActivityInstanceID();
		//
		// if (currActivity == currId) {
		// ActivityInstanceContext nextContext = actIncCon
		// .get(j + 1);
		// long nextInsId = nextContext.getActivityInstanceID();
		// WorkItemContextCollection wiColl = workFlowClient
		// .listWorkItemsByActInsID(nextInsId, areaCode);
		// WorkItemContext wiCon = wiColl.get(0);
		// if (wiCon.getState() == WorkItemStateType.INITIAL_STATE) {
		// WorkItem item = new WorkItem();
		// item.setItemCode(wic.getAreaCode());
		// item.setItemDesc(wic.getDescription());
		// item.setItemId(wic.getWorkItemID() + "");
		// item.setItemName(wic.getWorkItemName());
		// item.setItemState(wic.getState() + "");
		// item.setStartTime(wic.getDeliverTime());
		//
		// long proInstanceID = wic.getProInstanceID();
		//
		// WMTAttribute[] attrs;
		//
		// attrs = workFlowClient.getProcessRelevantData(
		// proInstanceID, null, areaCode);
		// ProcessInstanceData instance = new ProcessInstanceData();
		// for (WMTAttribute wmtAttribute : attrs) {
		// String attrName = wmtAttribute
		// .getAttributeName();
		// int attributeType = wmtAttribute
		// .getAttributeType();
		//
		// if (BeanUtils.hasProperty(instance, attrName)) {
		// if (attributeType == 1) {
		// BeanUtils.setBeanProperty(instance,
		// attrName,
		// wmtAttribute.getIntValue());
		// } else if (attributeType == 2) {
		// BeanUtils.setBeanProperty(instance,
		// attrName,
		// wmtAttribute.getBooleanValue());
		// } else if (attributeType == 3) {
		// BeanUtils.setBeanProperty(instance,
		// attrName,
		// wmtAttribute.getDoubleValue());
		// } else if (attributeType == 4) {
		// BeanUtils.setBeanProperty(instance,
		// attrName,
		// wmtAttribute.getStringValue());
		// } else if (attributeType == 5) {
		// BeanUtils.setBeanProperty(instance,
		// attrName, wmtAttribute
		// .getTimestampValue());
		// } else if (attributeType == 6) {
		// BeanUtils.setBeanProperty(instance,
		// attrName,
		// wmtAttribute.getDateValue());
		// } else {
		// BeanUtils.setBeanProperty(instance,
		// attrName,
		// wmtAttribute.getObjectValue());
		// }
		// }
		// }
		//
		// item.setCurrentStep(instance.getCurrentStep());
		// item.setItemRefNo(instance.getItemRefNo());
		// item.setItemEvent(instance.getItemEvent());
		// item.setNextStep(instance.getNextStep());
		//
		// workItemList.add(item);
		// }
		// break;
		// }
		// }
		// }
		// }
		// return workItemList;
	}

	public long getOnPassageItemCount(JSONObject reqData) throws Exception {
		long count = 0;
		SunflowClient sunflowClient = null;
		try {
			ApSessionContext context = ApSessionUtil.getContext();
			SysPara sysPara = XMLParaParseHelper.parseSysPara(context
					.getSysBusiUnit());

			String userId = context.getUserId();
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(userId, ""); // 用户登录

			List<Long> priIds = queryPriIdByUser(reqData, userId);// 根据用户id查询改用户创建的工作流
			if (priIds == null || priIds.size() < 1) {
				return 0;
			}
			ProcessInstanceContextCollection pros1 = new ProcessInstanceContextCollection();
			for (int i = 0; i < priIds.size(); i++) {
				// 根据工作流实例ID查询工作流实例
				ProcessInstanceContext pp = sunflowClient
						.findProcessInstance(priIds.get(i));
				if (pp.getInstanceState() == 1) {
					pros1.add(pp);
				}
			}
			// 根据参与者、状态、地区代码查询工作流实例集合
			ProcessInstanceContextCollection pros2 = sunflowClient
					.listProcessInstancesByUserIDAndState(userId, 1, "1001");

			// 去掉可能重复的工作流
			List<Long> copyPriIds = priIds;
			for (int i = 0; i < pros2.size(); i++) {
				ProcessInstanceContext pros = pros2.get(i);
				long instanceID = pros.getInstanceID();
				if (!copyPriIds.contains(instanceID)) {
					copyPriIds.add(instanceID);
					pros1.add(pros);
				}
			}
			/*int prosCount =0;
			if(pros1!=null&&pros1.size()>0){
				prosCount = pros1.size();
			}
					
			count = (long) (prosCount);*/
			count = (long) (pros1.size());
			// count = (long)wcc.size();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}
		return count;
		// JSONObject userData = JsonHelper.getUserObject(reqData);
		// String areaCode = userData.getString("sysBusiUnit");
		// if (StringUtil.isTrimEmpty(areaCode))
		// areaCode = ASPathConst.getDefaultBuName();
		// WorkItemContextCollection workitems = workFlowClient
		// .listWorkItemsByUserID(WorkItemStateType.COMPLETED_STATE,
		// areaCode);
		// long countItem = 0;
		// if (!workitems.isEmpty()) {
		// int size = workitems.size();
		//
		// for (int i = 0; i < size; i++) {
		// WorkItemContext wic = workitems.get(i);
		// long actId = wic.getProInstanceID();
		// long currActivity = wic.getActivityInstanceID();
		//
		// ActivityInstanceContextCollection actIncCon = workFlowClient
		// .listActivityInstanceByProInsID(actId, areaCode);
		// int stSize = actIncCon.size();
		// for (int j = 0; j < stSize; j++) {
		// ActivityInstanceContext stCon = actIncCon.get(j);
		// long currId = stCon.getActivityInstanceID();
		// if (currActivity == currId && j + 1 < stSize) {
		// ActivityInstanceContext nextContext = actIncCon
		// .get(j + 1);
		// long nextInsId = nextContext.getActivityInstanceID();
		// WorkItemContextCollection wiColl = workFlowClient
		// .listWorkItemsByActInsID(nextInsId, areaCode);
		// WorkItemContext wiCon = wiColl.size() > 0 ? wiColl
		// .get(0) : null;
		// if (wiCon != null
		// && wiCon.getState() == WorkItemStateType.INITIAL_STATE) {
		// countItem++;
		// }
		// break;
		// }
		// }
		// }
		// }
		// return countItem;
	}

	public List<WorkItem> getWorkItemsByStatus(JSONObject reqData) {
		List<WorkItem> workItemList = new ArrayList<WorkItem>();
		List<WorkItem> workItemListInfo = new ArrayList<WorkItem>();
		JSONObject userData = JsonHelper.getUserObject(reqData);
		String areaCode = userData.getString("sysBusiUnit");
		SunflowClient sunflowClient = null;
		ApSessionContext context = ApSessionUtil.getContext();
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context
				.getSysBusiUnit());

		String userId = context.getUserId();
		try {
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(userId, ""); // 用户登录

			if (StringUtil.isTrimEmpty(areaCode))
				areaCode = ASPathConst.getDefaultBuName();
			WorkItemContextCollection workitems = sunflowClient.listWorkItems(
					"PRI_STATE=1 AND WKI_STATE =2  AND WKA_APPLYMAN LIKE '%,"
							+ userData.getString("sysUserId").toString()
							+ ",%'", "1001");
			WorkItemContextCollection wcc = sunflowClient.listWorkItems(
					"PRI_STATE=1 AND WKI_STATE =1 AND WKI_USER='"
							+ userData.getString("sysUserId").toString() + "'",
					"1001");
			for (int i = 0; i < wcc.size(); i++) {
				workitems.add(wcc.get(i));
			}

			if (!workitems.isEmpty()) {
				int size = workitems.size();

				for (int i = 0; i < size; i++) {
					WorkItemContext wic = workitems.get(i);
					int state = wic.getState();
					long workItemId = wic.getWorkItemID();
					long procInsID = wic.getProInstanceID();
					WorkItem item = new WorkItem();
					item.setItemCode(wic.getAreaCode());
					item.setItemDesc(wic.getDescription());
					item.setItemId(workItemId + "");
					item.setItemName(wic.getWorkItemName());
 					item.setItemState(state + "");
					item.setStartTime(wic.getDeliverTime());
					item.setItemExecutorId(wic.getExecutorID());// 工作项执行人Id

					// 得到该工作项的上一个工作项信息
					WorkItemContextCollection preWorkItem = sunflowClient
							.listWorkItems("WKI_ID<" + (workItemId)
									+ " AND WKI_PRIID = " + procInsID, "1001");
					String preExecutor = "";
					String preItemNm = "";
					long preWorkItemID = 0;
					if (preWorkItem.size() == 0) {// 如果查不到上一个工作项，说明是由开始节点传过来的，故上一步执行人Id是创建工作流的人
						preExecutor = queryCreatorByPriId(reqData,
								Integer.parseInt(procInsID + ""));
						preItemNm = "申请";
					} else {
						for (int j = 0; j < preWorkItem.size(); j++){
							if(j==0){
								preWorkItemID = preWorkItem.get(j).getWorkItemID();
								preExecutor = preWorkItem.get(j).getExecutorID();
								preItemNm = preWorkItem.get(j).getWorkItemName();
							}else if(preWorkItem.get(j).getWorkItemID()>preWorkItemID){
								preWorkItemID = preWorkItem.get(j).getWorkItemID();
								preExecutor = preWorkItem.get(j).getExecutorID();
								preItemNm = preWorkItem.get(j).getWorkItemName();
							}
						} 
					}
					item.setItemPreExecutorId(preExecutor);
					item.setPreItemName(preItemNm);

					// 查询工作流实例的流程变量值
					// WMTAttribute[] attrs =
					// sunflowClient.getProcessRelevantData(procInsID, null,
					// "1001");
					// 查询工作流节点的活动变量值
					WMTAttribute[] attrs = sunflowClient
							.getWorkItemRelevantData(workItemId, null, "1001");
					ProcessInstanceData instance = new ProcessInstanceData();
					Map<String, Object> bussinessData = new HashMap<String, Object>();
					for (WMTAttribute wmtAttribute : attrs) {
						String attrName = wmtAttribute.getAttributeName();
						int attributeType = wmtAttribute.getAttributeType();

						if (BeanUtils.hasProperty(instance, attrName)) {
							if (attributeType == 1) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getIntValue());
							} else if (attributeType == 2) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getBooleanValue());
							} else if (attributeType == 3) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getDoubleValue());
							} else if (attributeType == 4) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getStringValue());
							} else if (attributeType == 5) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getTimestampValue());
							} else if (attributeType == 6) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getDateValue());
							} else {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getObjectValue());
							}
						} else {
							if (attributeType == 1) {
								bussinessData.put(attrName,
										wmtAttribute.getIntValue());
							} else if (attributeType == 2) {
								bussinessData.put(attrName,
										wmtAttribute.getBooleanValue());
							} else if (attributeType == 3) {
								bussinessData.put(attrName,
										wmtAttribute.getDoubleValue());
							} else if (attributeType == 4) {
								bussinessData.put(attrName,
										wmtAttribute.getStringValue());
							} else if (attributeType == 5) {
								bussinessData.put(attrName,
										wmtAttribute.getTimestampValue());
							} else if (attributeType == 6) {
								bussinessData.put(attrName,
										wmtAttribute.getDateValue());
							} else {
								bussinessData.put(attrName,
										wmtAttribute.getObjectValue());
							}
						}
					}

					item.setCurrentStep(instance.getCurrentStep());
					item.setItemRefNo(instance.getItemRefNo());
					item.setItemEvent(instance.getItemEvent());
					item.setNextStep(instance.getNextStep());
					item.setBussinessData(bussinessData);

					workItemList.add(item);
				}

			}
		} catch (SunflowException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}
		//代办任务查询添加排序,按照创建时间排倒序 add by YeQing 2016-11-9
		ListSortUtil<WorkItem> sortList = new ListSortUtil<WorkItem>();  
		sortList.sort(workItemList, "startTime", "desc"); 
		for(WorkItem item : workItemList){
				workItemListInfo.add(item);
		}
		return workItemListInfo;
	}

	public ProcessInstanceData execJsFile(JSONObject instanceData, String jsFile) {
		try {
			jsEngine.initTrxData(instanceData);
			jsEngine.executeJsFile(jsFile);
			ProcessInstanceData instance = (ProcessInstanceData) jsEngine
					.getTrxData();
			return instance;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void upateInstanceAttribute(WMTAttribute[] beforeAttrs,
			ProcessInstanceData instance) {
		for (WMTAttribute wmtAttribute : beforeAttrs) {
			if (instance == null)
				break;
			String attributeName = wmtAttribute.getAttributeName();
			// int - 属性类型 int - 1 bool - 2 double - 3 String - 4 Timestamp - 5
			// Date - 6 Array - 7 File - 8 Object - 9 Binary - 10
			int attributeType = wmtAttribute.getAttributeType();

			if (BeanUtils.hasProperty(instance, attributeName)) {
				Object instancePropertyValue = BeanUtils.getProperty(instance,
						attributeName);

				if (attributeType == 1) {
					if (instancePropertyValue != null) {
						wmtAttribute.setIntValue(Integer
								.parseInt(instancePropertyValue.toString()));
					}
				} else if (attributeType == 2) {
					if (instancePropertyValue != null) {
						wmtAttribute
								.setBooleanValue(Boolean
										.parseBoolean(instancePropertyValue
												.toString()));
					}
				} else if (attributeType == 3) {
					if (instancePropertyValue != null) {
						wmtAttribute.setDoubleValue(Double
								.parseDouble(instancePropertyValue.toString()));
					}
				} else if (attributeType == 4) {
					if (instancePropertyValue != null) {
						wmtAttribute.setStringValue(instancePropertyValue
								.toString());
					} else {
						wmtAttribute.setStringValue("");
					}
				} else if (attributeType == 5) {
					if (instancePropertyValue != null) {
						try {
							wmtAttribute.setTimestampValue(Timestamp
									.valueOf(instancePropertyValue.toString()));
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} else if (attributeType == 6) {
					if (instancePropertyValue != null) {
						wmtAttribute.setDateValue(Date
								.valueOf(instancePropertyValue.toString()));
					}
				}
			}
		}
	}

	@Override
	public List<WorkItem> getDetailWorkItems(JSONObject reqData) {

		List<WorkItem> workItemList = new ArrayList<WorkItem>();
		JSONObject userData = JsonHelper.getUserObject(reqData);
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		String areaCode = userData.getString("sysBusiUnit");
		SunflowClient sunflowClient = null;
		ApSessionContext context = ApSessionUtil.getContext();
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context
				.getSysBusiUnit());

		String userId = context.getUserId();
		try {
			sunflowClient = new SunflowClient(sysPara.getWorkflowengine(),
					Integer.parseInt(sysPara.getWorkflowport())); // 构造一个工作流客户端对象，和引擎建立连接
			sunflowClient.connect(userId, ""); // 用户登录

			if (StringUtil.isTrimEmpty(areaCode))
				areaCode = ASPathConst.getDefaultBuName();
			long priId = Long.parseLong(trxData.getString("priId").toString());
			// WorkItemContextCollection workitems =
			// sunflowClient.listWorkItems(
			// "WKI_PRIID ='" + trxData.getString("priId").toString()
			// + "'", "1001");
			// 列出指定活动实例ID下的所有工作项
			WorkItemContextCollection workitems = sunflowClient
					.listWorkitemByProInstID(priId);
			if (!workitems.isEmpty()) {
				int size = workitems.size();

				for (int i = 0; i < size; i++) {
					WorkItemContext wic = workitems.get(i);
					int state = wic.getState();

					long procInsID = wic.getProInstanceID();
					long workItemId = wic.getWorkItemID();
					WorkItem item = new WorkItem();
					item.setItemCode(wic.getAreaCode());
					item.setItemDesc(wic.getDescription());
					item.setItemId(workItemId + "");
					item.setItemName(wic.getWorkItemName());
					item.setItemState(state + "");
					item.setStartTime(wic.getDeliverTime());
					item.setItemExecutorId(wic.getExecutorID());// 工作项执行人Id

					// 得到该工作项的上一个工作项信息
					WorkItemContextCollection preWorkItem = sunflowClient
							.listWorkItems("WKI_ID<" + (workItemId)
									+ " AND WKI_PRIID = " + procInsID, "1001");
					String preExecutor = "";
					String preItemNm = "";
					long preWorkItemID = 0;
					if (preWorkItem.size() == 0) {// 如果查不到上一个工作项，说明是由开始节点传过来的，故上一步执行人Id是创建工作流的人
						preExecutor = queryCreatorByPriId(reqData,
								Integer.parseInt(procInsID + ""));
						preItemNm = "申请";
					}else {
						for (int j = 0; j < preWorkItem.size(); j++){
							if(j==0){
								preWorkItemID = preWorkItem.get(j).getWorkItemID();
								preExecutor = preWorkItem.get(j).getExecutorID();
								preItemNm = preWorkItem.get(j).getWorkItemName();
							}else if(preWorkItem.get(j).getWorkItemID()>preWorkItemID){
								preWorkItemID = preWorkItem.get(j).getWorkItemID();
								preExecutor = preWorkItem.get(j).getExecutorID();
								preItemNm = preWorkItem.get(j).getWorkItemName();
							}
						} 
					}
					item.setItemPreExecutorId(preExecutor);
					item.setPreItemName(preItemNm);

					// 查询工作流实例的流程变量值
					// WMTAttribute[] attrs =
					// sunflowClient.getProcessRelevantData(procInsID, null,
					// "1001");
					// 查询工作流节点的活动变量值
					WMTAttribute[] attrs = sunflowClient
							.getWorkItemRelevantData(workItemId, null, "1001");
					ProcessInstanceData instance = new ProcessInstanceData();
					Map<String, Object> bussinessData = new HashMap<String, Object>();
					for (WMTAttribute wmtAttribute : attrs) {
						String attrName = wmtAttribute.getAttributeName();
						int attributeType = wmtAttribute.getAttributeType();

						if (BeanUtils.hasProperty(instance, attrName)) {
							if (attributeType == 1) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getIntValue());
							} else if (attributeType == 2) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getBooleanValue());
							} else if (attributeType == 3) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getDoubleValue());
							} else if (attributeType == 4) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getStringValue());
							} else if (attributeType == 5) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getTimestampValue());
							} else if (attributeType == 6) {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getDateValue());
							} else {
								BeanUtils.setBeanProperty(instance, attrName,
										wmtAttribute.getObjectValue());
							}
						} else {
							if (attributeType == 1) {
								bussinessData.put(attrName,
										wmtAttribute.getIntValue());
							} else if (attributeType == 2) {
								bussinessData.put(attrName,
										wmtAttribute.getBooleanValue());
							} else if (attributeType == 3) {
								bussinessData.put(attrName,
										wmtAttribute.getDoubleValue());
							} else if (attributeType == 4) {
								bussinessData.put(attrName,
										wmtAttribute.getStringValue());
							} else if (attributeType == 5) {
								bussinessData.put(attrName,
										wmtAttribute.getTimestampValue());
							} else if (attributeType == 6) {
								bussinessData.put(attrName,
										wmtAttribute.getDateValue());
							} else {
								bussinessData.put(attrName,
										wmtAttribute.getObjectValue());
							}
						}
					}

					item.setCurrentStep(instance.getCurrentStep());
					item.setItemRefNo(instance.getItemRefNo());
					item.setItemEvent(instance.getItemEvent());
					item.setNextStep(instance.getNextStep());
					item.setBussinessData(bussinessData);

					workItemList.add(item);
				}

			}
		} catch (SunflowException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (sunflowClient != null) {
				try {
					sunflowClient.disconnect();
				} catch (Exception ex) {
				}
			}
		}
		return workItemList;

	}

}
