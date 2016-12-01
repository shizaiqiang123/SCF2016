package com.ut.scf.core.component.query;

import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.workflow.WorkFlowPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.para.ParaQueryFactory;

/**
 * 
 * @author WangJingHua
 * @see parameters 保理商级服务功能- 账务(accounting)、面凾(report)、工作流(workflow) 查询实现类
 */
@Component("paraFactorQuery")
public class ParaFactorQueryImpl implements IQueryComponent {

	private static final String ACCOUNTING = "accounting";
	private static final String REPORT = "report";
	private static final String WORKFLOW = "workflow";

	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		JSONObject reqData = logicObj.getReqData();
		QueryNode queryPara = (QueryNode) logicObj.getReqParaObj();
		String strParaId = getXmlFileName(reqData);
		String strParaPath = queryPara.getTablename();
		String strType = getXmlServiceType(reqData).toLowerCase();// 判断是哪个功能

		if (StringUtil.isTrimEmpty(strParaId)) {
			logicObj.buildRespose();
			return logicObj;
		}
		String strBu = getBuFromReq(reqData);
		// NIO 锁机制优化
		try {
			Object obj = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strParaId, strParaPath, strBu);

			// 判断ServiceType并实现
			FunctionPara functionPara = (FunctionPara) obj;
			if (ACCOUNTING.equalsIgnoreCase(strType)) {
				// 需要再次解析page的属性
				List<PagePara> pages = functionPara.getPageList();
				for (PagePara pagePara : pages) {
					if (null != pagePara.getMaincomp()
							&& pagePara.getMaincomp().equalsIgnoreCase("TrxAccountingManager")) {
						logicObj.buildRespose(pagePara);
						return logicObj;

					} else if (null != pagePara.getId()) {
						// 再次按pageId到page路径下查看遍历完整的page信息
						Object objPage = ParaQueryFactory.getParaQueryImpl("page").getParaDefine(pagePara.getId(),
								"page", strBu);
						PagePara page = (PagePara) objPage;
						if (null != page.getMaincomp() && page.getMaincomp().equalsIgnoreCase("TrxAccountingManager")) {
							// 可以将 TrxAccountingManager 打包进去一起返回，留待后人续作
							logicObj.buildRespose(pagePara);
							return logicObj;
						}
					}
				}
			} else if (REPORT.equalsIgnoreCase(strType)) {
				// 看service中有没有挂report的
				// 需要再次解析page的属性
				List<ServicePara> services = functionPara.getServiceList();
				if (null != services) {
					for (ServicePara pagePara : services) {
						if (null != pagePara.getType() && pagePara.getType().equalsIgnoreCase("report")) {
							logicObj.buildRespose(pagePara);
							return logicObj;
						} else if (null != pagePara.getId()) {
							// 再次按pageId到page路径下查看遍历完整的page信息
							Object objPage = ParaQueryFactory.getParaQueryImpl("service").getParaDefine(
									pagePara.getId(), "service", strBu);
							ServicePara service = (ServicePara) objPage;
							if (null != service.getType() && service.getType().equalsIgnoreCase("report")) {
								// 可以将 TrxAccountingManager 打包进去一起返回，留待后人续作
								logicObj.buildRespose(pagePara);
								return logicObj;
							}
						}
					}
				}
			} else if (WORKFLOW.equalsIgnoreCase(strType)) {
				// 直接看有没有workflowId
				String strWorkflowId = functionPara.getWorkflow();
				if (StringUtil.isTrimNotEmpty(strWorkflowId)) {
					FunctionPara workflow =new FunctionPara();
					workflow.setWorkflow(strWorkflowId);
					logicObj.buildRespose(workflow);
					return logicObj;
				}
			}
			logicObj.buildRespose();
		} catch (Exception e) {
			e.printStackTrace();
			logicObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicObj.setRetInfo("File format exception, id:" + strParaId);
		}
		return logicObj;
	}

	private String getBuFromReq(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("strBu") ? trxDom.getString("strBu") : "";
	}

	private String getXmlFileName(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("paraId") ? trxDom.getString("paraId") : "";
	}

	// 新增返回ServiceType-
	private String getXmlServiceType(JSONObject reqData) {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom.containsKey("ServiceType") ? trxDom.getString("ServiceType") : "";
	}

}
