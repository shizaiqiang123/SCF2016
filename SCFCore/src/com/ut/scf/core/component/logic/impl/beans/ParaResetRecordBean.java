package com.ut.scf.core.component.logic.impl.beans;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.report.ReportPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.component.AbsParaLogicManager;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.para.ParaQueryFactory;

@Component("paraResetRecordBean")
/**
 * resultType   是，否
 * functionId
 * paraId
 * resetType accounting,report,workflow,all
 * requestType save,reset
 * ServiceType accounting,report,workflow
 *implements ParaResetRecord
 */
public class ParaResetRecordBean extends AbsParaLogicManager {

	// star 复核功能
	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	// end 复核功能

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		// getXmlServiceType(reqData).toLowerCase();判断是哪个功能，可用于通用整合
		// save，reset
		super.parseParameters(logicObj);
		JSONObject reqData = logicObj.getReqData();
		String requestType = getRequestType(reqData);

		if ("save".equalsIgnoreCase(requestType)) {
			savePara(reqData);
		} else if ("reset".equalsIgnoreCase(requestType)) {
			resetPara(reqData);
		} else {

		}
		return logicObj;
	}

	private void savePara(JSONObject reqData) throws Exception {
		String resetType = getResetType(reqData);
		String strFunctionId = getFunctionId(reqData);
		String result = getSelectRessult(reqData);

		if ("accounting".equalsIgnoreCase(resetType)) {
			if ("Y".equalsIgnoreCase(result)) {
				// 看平台是否有
				PagePara accountingDefine = loadPlatforAccoutingDefine(reqData, "");

				if (accountingDefine != null) {
					updateAcountingDefineIntoBu(reqData, strFunctionId, accountingDefine);
				} else {
					// 如果平台级的相应func中没有accounting，则报错？不知是否正确-------------------------------
					currentDataObj.setRetStatus(FuncDataObj.FAILED);
					currentDataObj.setRetInfo("Current function dont support config accounting define.");
				}
			} else if ("N".equalsIgnoreCase(result)) {
				removeAccountDefineFromBu(reqData, strFunctionId);
			} else {

			}
		} else if ("report".equalsIgnoreCase(resetType)) {
			if ("Y".equalsIgnoreCase(result)) {
				// 看平台是否有
				ServicePara reportDefine = loadPlatforReportDefine(reqData, "");

				if (reportDefine != null) {
					updateReportDefineIntoBu(reqData, strFunctionId, reportDefine);
				} else {
					// 如果平台级的相应func中没有accounting，则报错？不知是否正确-------------------------------
					currentDataObj.setRetStatus(FuncDataObj.FAILED);
					currentDataObj.setRetInfo("Current function dont support config reeport define.");
				}
			} else if ("N".equalsIgnoreCase(result)) {
				removeReportDefineFromBu(reqData, strFunctionId);
			} else {

			}

		} else if ("workflow".equalsIgnoreCase(resetType)) {
			if ("Y".equalsIgnoreCase(result)) {
				String workflowDefine = loadPlatforWorkflowDefine(reqData, "");
				if (workflowDefine != null) {
					updateWorkflowDefineIntoBu(reqData, strFunctionId, workflowDefine);
				} else {
					currentDataObj.setRetStatus(FuncDataObj.FAILED);
					currentDataObj.setRetInfo("Current function dont support config accounting define.");
				}
			} else if ("N".equalsIgnoreCase(result)) {
				removeWorkflowDefineFromBu(reqData, strFunctionId);
			} else {

			}
		} else {

		}
	}

	/**
	 * 更新保理商本地workflow的公用方法
	 * 
	 * @param reqData
	 * @param strFunctionId
	 * @param workflowDefine
	 * @throws Exception
	 *             1.看保理商的func中有没有workflowId，有的话直接返回
	 *             2.如果没有，则读取保理商的func信息，并将传入的workflowDefine
	 *             （workflowId）加到其倒数第二个的位置上
	 */
	private void updateWorkflowDefineIntoBu(JSONObject reqData, String strFunctionId, String workflowDefine)
			throws Exception {
		// 看保理商的func中有没有workflowId的信息，有的话直接返回
		if (null != workflowDefine) {
			String workflowId = loadPlatforWorkflowDefine(reqData, super.strBu);
			if (workflowId != null) {
				return;
			}
			Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strFunctionId, strParaPath,
					super.strBu);
			FunctionPara functionPara = (FunctionPara) funcObj;

			functionPara.setWorkflow(workflowDefine);

			super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

			// 因为组件原因，需要将pageLit变成String类型
			List<PagePara> pageList = functionPara.getPageList();
			if(null!=pageList){
				super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));
			}
			// end

			// 因为组件原因，需要将service变成String类型
			List<ServicePara> serviceList = functionPara.getServiceList();
			if(null!=serviceList){
				super.currentTrxData.put("serviceList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));
			}
			// end
			
			// 因为组件原因，需要将reportList变成String类型
			List<ReportPara> reportList = functionPara.getReportList();
			if(null!=reportList){
				super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
			}
			// end

			Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId, strParaPath,
					super.currentTrxData, super.strBu);
		}
	}

	/**
	 * 更新保理商本地service-report(type)的公用方法
	 * 
	 * @param reqData
	 * @param strFunctionId
	 * @param serviceDefine
	 * @throws Exception
	 *             1.看保理商的func中有没有service-report(type)的信息，有的话直接返回
	 *             2.如果没有，则读取保理商的func信息
	 *             ，并将传入的serviceDefine（service-report(type)）加到其倒数第二个的位置上
	 */
	private void updateReportDefineIntoBu(JSONObject reqData, String strFunctionId, ServicePara serviceDefine)
			throws Exception {
		if (null != serviceDefine) {
			// 看保理商的func中有没有accounting-page的信息，有的话直接返回
			ServicePara service = loadPlatforReportDefine(reqData, super.strBu);
			if (service != null) {
				return;
			}
			Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strFunctionId, strParaPath,
					super.strBu);
			FunctionPara functionPara = (FunctionPara) funcObj;
			List<ServicePara> serviceList = functionPara.getServiceList();

			// 先看看有没有本地serviceList，没有新建serviceList
			if (null == serviceList) {
				serviceList = new ArrayList<ServicePara>();
			}

			// 没有则将其加在倒数第二个位置上
			if (serviceList.size() < 1) {
				serviceList.add(serviceDefine);
			} else {
				serviceList.add(serviceList.size() - 1, serviceDefine);
			}

			super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

			super.currentTrxData.put("serviceList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));

			// 因为组件原因，需要将pageLit变成String类型
			List<PagePara> pageList = functionPara.getPageList();
			if(null!=pageList){
				super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));
			}
			// end

			// 因为组件原因，需要将reportList变成String类型
			List<ReportPara> reportList = functionPara.getReportList();
			if(null!=reportList){
				super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
			}
			// end

			Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId, strParaPath,
					super.currentTrxData, super.strBu);
		}
	}

	/**
	 * 更新保理商本地accounting的公用方法
	 * 
	 * @param reqData
	 * @param strFunctionId
	 * @param accountingDefine
	 * @throws Exception
	 *             1.看保理商的func中有没有accounting-page的信息，有的话直接返回
	 *             2.如果没有，则读取保理商的func信息
	 *             ，并将传入的accountingDefine（accounting-page）加到其倒数第二个的位置上
	 */
	private void updateAcountingDefineIntoBu(JSONObject reqData, String strFunctionId, PagePara accountingDefine)
			throws Exception {
		// 看保理商的func中有没有accounting-page的信息，有的话直接返回
		if (null != accountingDefine) {
			PagePara page = loadPlatforAccoutingDefine(reqData, super.strBu);
			if (page != null) {
				return;
			}
			Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strFunctionId, strParaPath,
					super.strBu);
			FunctionPara functionPara = (FunctionPara) funcObj;
			List<PagePara> pageList = functionPara.getPageList();

			if (null == pageList) {
				pageList = new ArrayList<PagePara>();
			}
			// 没有则将其加在倒数第二个位置上
			if (pageList.size() < 1) {
				pageList.add(accountingDefine);
			} else {
				pageList.add(pageList.size() - 1, accountingDefine);
			}

			super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

			super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));


			// 因为组件原因，需要将service变成String类型
			List<ServicePara> serviceList = functionPara.getServiceList();
			if(null!=serviceList){
				super.currentTrxData.put("serviceList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));
			}
			// end
			
			// 因为组件原因，需要将reportList变成String类型
			List<ReportPara> reportList = functionPara.getReportList();
			if(null!=reportList){
				super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
			}
			// end

			Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId, strParaPath,
					super.currentTrxData, super.strBu);
		}
	}

	private void updateAllDefineIntoBu(JSONObject reqData, String strFunctionId, PagePara accountingDefine,
			ServicePara serviceDefine, String workflowId) throws Exception {
		updateAcountingDefineIntoBu(reqData, strFunctionId, accountingDefine);
		updateReportDefineIntoBu(reqData, strFunctionId, serviceDefine);
		updateWorkflowDefineIntoBu(reqData, strFunctionId, workflowId);
	}

	/**
	 * 通用读取相应bu下的accounting-page
	 * 
	 * @param reqData
	 * @param strBu
	 * @return
	 * @throws Exception
	 *             1.读取传过来的bu下的func，遍历
	 *             2.如果其中有accounting-page的标示信息，则返回accounting-page的信息
	 *             3.如果没有，再看看对应pageId的page路径下完全版的page是否有accounting
	 *             -page的信息，有则返回完全的 4.如果还没有，返回null
	 */
	private PagePara loadPlatforAccoutingDefine(JSONObject reqData, String strBu) throws Exception {
		String strFunctionId = getFunctionId(reqData);
		Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath)
				.getParaDefine(strFunctionId, strParaPath, strBu);
		FunctionPara functionPara = (FunctionPara) funcObj;
		List<PagePara> pageList = functionPara.getPageList();
		for (PagePara pagePara : pageList) {
			if (null != pagePara.getMaincomp() && pagePara.getMaincomp().equalsIgnoreCase("TrxAccountingManager")) {
				return pagePara;
			} else if (null != pagePara.getId()) {
				Object objPage = ParaQueryFactory.getParaQueryImpl("page").getParaDefine(pagePara.getId(), "page",
						strBu);
				PagePara page = (PagePara) objPage;
				if (null != page.getMaincomp() && page.getMaincomp().equalsIgnoreCase("TrxAccountingManager")) {
					return pagePara;
				}
			}
		}
		return null;
	}

	/**
	 * 通用读取相应bu下的function-service-type=report
	 * 
	 * @param reqData
	 * @param strBu
	 * @return
	 * @throws Exception
	 *             1.读取传过来的bu下的func，遍历
	 *             2.如果其中有service-type=report的标示信息，则返回service-type=report的信息
	 *             3.如果没有，再看看对应serviceId的service路径下完全版的service是否有service-type=
	 *             report的信息，有则返回完全的 4.如果还没有，返回null
	 */
	private ServicePara loadPlatforReportDefine(JSONObject reqData, String strBu) throws Exception {
		String strFunctionId = getFunctionId(reqData);
		Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath)
				.getParaDefine(strFunctionId, strParaPath, strBu);
		FunctionPara functionPara = (FunctionPara) funcObj;
		List<ServicePara> serviceList = functionPara.getServiceList();
		if (null != serviceList) {
			for (ServicePara servicepageParaPara : serviceList) {
				if (null != servicepageParaPara.getType() && servicepageParaPara.getType().equalsIgnoreCase("report")) {
					return servicepageParaPara;
				} else if (null != servicepageParaPara.getId()) {
					// 再次按pageId到page路径下查看遍历完整的page信息
					Object objPage = ParaQueryFactory.getParaQueryImpl("service").getParaDefine(
							servicepageParaPara.getId(), "service", "");
					ServicePara service = (ServicePara) objPage;
					if (null != service.getType() && service.getType().equalsIgnoreCase("report")) {
						// 可以将 TrxAccountingManager 打包进去一起返回，留待后人续作
						return servicepageParaPara;
					}
				}
			}
		}
		return null;
	}

	/**
	 * 查询function-workflowId的公用方法 通用读取相应bu下的function-workflowId
	 * 
	 * @param reqData
	 * @param strBu
	 * @return
	 * @throws Exception
	 *             1.读取传过来的bu下的func，遍历 2.如果其中workflowId ！="" &&
	 *             null的标示信息，则返回workflowId 3.如果没有，返回null
	 */
	private String loadPlatforWorkflowDefine(JSONObject reqData, String strBu) throws Exception {
		String strFunctionId = getFunctionId(reqData);
		Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath)
				.getParaDefine(strFunctionId, strParaPath, strBu);
		FunctionPara functionPara = (FunctionPara) funcObj;
		// 直接看有没有workflowId
		String strWorkflowId = functionPara.getWorkflow();
		// if (null != strWorkflowId) {
		if (StringUtil.isTrimNotEmpty(strWorkflowId)) {
			return strWorkflowId;
		}
		// }
		return null;
	}

	private void removeAccountDefineFromBu(JSONObject reqData, String strFunctionId) throws Exception {
		// 读取保理商的func
		Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strFunctionId, strParaPath,
				super.strBu);
		FunctionPara functionPara = (FunctionPara) funcObj;
		// 将func变成page的list
		List<PagePara> pageList = functionPara.getPageList();
		if (null != pageList) {
			// 遍历
			for (PagePara pagePara : pageList) {
				// 如果func有，则删除并更新
				if (null != pagePara.getMaincomp() && pagePara.getMaincomp().equalsIgnoreCase("TrxAccountingManager")) {
					// 如果有，从pagelist中删除此page
					pageList.remove(pagePara);

					super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

					super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));


					// 因为组件原因，需要将service变成String类型
					List<ServicePara> serviceList = functionPara.getServiceList();
					if(null!=serviceList){
						super.currentTrxData.put("serviceList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));
					}
					// end
					
					// 因为组件原因，需要将reportList变成String类型
					List<ReportPara> reportList = functionPara.getReportList();
					if(null!=reportList){
						super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
					}
					// end
					
					Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId,
							strParaPath, super.currentTrxData, super.strBu);
					return;
				}
				// 如果没有就看看这个pageID在page路径下全部的page中有没有
				else if (null != pagePara.getId()) {
					Object objPage = ParaQueryFactory.getParaQueryImpl("page").getParaDefine(pagePara.getId(), "page",
							strBu);
					PagePara page = (PagePara) objPage;
					if (null != page.getMaincomp() && page.getMaincomp().equalsIgnoreCase("TrxAccountingManager")) {
						pageList.remove(pagePara);
						super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

						super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));

						// 因为组件原因，需要将service变成String类型
						List<ServicePara> serviceList = functionPara.getServiceList();
						if(null!=serviceList){
							super.currentTrxData.put("serviceList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));
						}
						// end
						
						// 因为组件原因，需要将reportList变成String类型
						List<ReportPara> reportList = functionPara.getReportList();
						if(null!=reportList){
							super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
						}
						// end

						Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId,
								strParaPath, super.currentTrxData, super.strBu);
						return;
					}
				}
			}
		}

	}

	private void removeReportDefineFromBu(JSONObject reqData, String strFunctionId) throws Exception {
		// 读取保理商的func
		Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strFunctionId, strParaPath,
				super.strBu);
		FunctionPara functionPara = (FunctionPara) funcObj;
		// 将func变成page的list
		List<ServicePara> serviceList = functionPara.getServiceList();
		// 遍历
		if (null != serviceList) {
			for (ServicePara servicePara : serviceList) {
				// 如果func有，则删除并更新
				if (null != servicePara.getType() && servicePara.getType().equalsIgnoreCase("report")) {
					// 如果有，从pagelist中删除此page
					serviceList.remove(servicePara);
					super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

					super.currentTrxData.put("serviceList",
							JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));

					// 因为组件原因，需要将pageLit变成String类型
					List<PagePara> pageList = functionPara.getPageList();
					if(null!=pageList){
						super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));
					}
					// end

					// 因为组件原因，需要将reportList变成String类型
					List<ReportPara> reportList = functionPara.getReportList();
					if(null!=reportList){
						super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
					}
					// end

					Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId,
							strParaPath, super.currentTrxData, super.strBu);
					return;
				}
				// 如果没有就看看这个pageID在page路径下全部的page中有没有
				else if (null != servicePara.getId()) {
					Object objService = ParaQueryFactory.getParaQueryImpl("service").getParaDefine(servicePara.getId(),
							"service", strBu);
					ServicePara service = (ServicePara) objService;
					if (null != service.getType() && service.getType().equalsIgnoreCase("report")) {
						serviceList.remove(servicePara);
						super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

						super.currentTrxData.put("serviceList",
								JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));

						// 因为组			// 因为组件原因，需要将pageLit变成String类型
						List<PagePara> pageList = functionPara.getPageList();
						if(null!=pageList){
							super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));
						}
						// end
						
						// 因为组件原因，需要将reportList变成String类型
						List<ReportPara> reportList = functionPara.getReportList();
						if(null!=reportList){
							super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
						}
						// end

						Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId,
								strParaPath, super.currentTrxData, super.strBu);
						return;
					}
					return;
				}
			}
		}
	}

	private void removeWorkflowDefineFromBu(JSONObject reqData, String strFunctionId) throws Exception {
		// 读取保理商的func
		Object funcObj = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strFunctionId, strParaPath,
				super.strBu);
		FunctionPara functionPara = (FunctionPara) funcObj;
		String workflowId = functionPara.getWorkflow();
		// 遍历
		if (StringUtil.isTrimNotEmpty(workflowId)) {
			if ("" != workflowId.trim()) {
				super.currentTrxData.putAll(BeanUtils.toMap(funcObj));

				super.currentTrxData.put("workflowId", JsonUtil.getJSONString(workflowId));

				// 因为组件原因，需要将pageLit变成String类型
				List<PagePara> pageList = functionPara.getPageList();
				if(null!=pageList){
					super.currentTrxData.put("pageList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(pageList)));
				}
				// end

				// 因为组件原因，需要将service变成String类型
				List<ServicePara> serviceList = functionPara.getServiceList();
				if(null!=serviceList){
					super.currentTrxData.put("serviceList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(serviceList)));
				}
				// end
				
				// 因为组件原因，需要将reportList变成String类型
				List<ReportPara> reportList = functionPara.getReportList();
				if(null!=reportList){
					super.currentTrxData.put("reportList", JsonUtil.getJSONString(JsonUtil.getTrxGridData(reportList)));
				}
				// end

				Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).updateParaDefine(strFunctionId,
						strParaPath, super.currentTrxData, super.strBu);
				return;
			}
		}
	}

	// 重置功能//目的：直接将平台级的数据插入本地的数据
	private void resetPara(JSONObject reqData) throws Exception {

		String resetType = getResetType(reqData);
		String strFunctionId = getFunctionId(reqData);
		if ("accounting".equalsIgnoreCase(resetType)) {

			PagePara accountingDefine = loadPlatforAccoutingDefine(reqData, "");

			if (accountingDefine != null) {
				updateAcountingDefineIntoBu(reqData, strFunctionId, accountingDefine);
			}
		} else if ("report".equalsIgnoreCase(resetType)) {

			ServicePara serviceDefine = loadPlatforReportDefine(reqData, "");

			if (serviceDefine != null) {
				updateReportDefineIntoBu(reqData, strFunctionId, serviceDefine);
			}
		} else if ("workflow".equalsIgnoreCase(resetType)) {

			String workflowId = loadPlatforWorkflowDefine(reqData, "");

			if (workflowId != null) {
				updateWorkflowDefineIntoBu(reqData, strFunctionId, workflowId);
			}
		} else if ("all".equalsIgnoreCase(resetType)) {

			PagePara accountingDefine = loadPlatforAccoutingDefine(reqData, "");
			ServicePara serviceDefine = loadPlatforReportDefine(reqData, "");
			String workflowId = loadPlatforWorkflowDefine(reqData, "");

			if (null != accountingDefine || null != serviceDefine || null != workflowId) {
				updateAllDefineIntoBu(reqData, strFunctionId, accountingDefine, serviceDefine, workflowId);
			}
		} else {

		}
	}

	/**
	 * 启用 不启用
	 * 
	 * @return
	 */
	private String getSelectRessult(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("resultType") ? trxDom.getString("resultType") : "";
	}

	private String getFunctionId(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("functionId") ? trxDom.getString("functionId") : "";
	}

	/**
	 * accounting report workflow all
	 * 
	 * @return
	 */
	protected String getResetType(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("resetType") ? trxDom.getString("resetType") : "";
	}

	/**
	 * save reset
	 * 
	 * @return
	 */
	protected String getRequestType(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("requestType") ? trxDom.getString("requestType") : "";
	}

	// 新增返回ServiceType-
	private String getXmlServiceType(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("ServiceType") ? trxDom.getString("ServiceType") : "";
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
