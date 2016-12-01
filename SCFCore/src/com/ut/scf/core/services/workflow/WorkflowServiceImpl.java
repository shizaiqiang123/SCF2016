package com.ut.scf.core.services.workflow;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.report.ReportPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.workflow.WorkFlowPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.core.workflow.WorkFlowCtrol;

@Service("workflowServiceImpl")
public class WorkflowServiceImpl extends AbsESBServiceImpl{

	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:"+getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		super.getLogger().debug("destroy service success.");
	}


	@Override
	public String getServiceId() {
		return "Workflow";
	}
	
	@Resource(name="apWorkFlow")
	WorkFlowCtrol workfolw ;

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		JSONObject instanceData = dataObj.getReqData();
		WorkFlowPara para = getWorkflowDefine(super.trxObj);
		if(para!=null)
			workfolw.create(para, instanceData);
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		
	}
	
	private WorkFlowPara getWorkflowDefine(JSONObject jsonObject) {
		List<String> rules = super.serviceObj.getRules();
		if(rules==null||rules.isEmpty()){
			return null;
		}
		WorkFlowPara para = new WorkFlowPara();
		
		para.setId(rules.get(0));
		return XMLParaParseHelper.parseWorkflowPara(para,currentBu);
	}
}
