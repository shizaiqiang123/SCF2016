package com.ut.scf.web.actions;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.web.servlet.AbsServletRequestAware;
import com.ut.scf.web.utils.WebUtils;

public class WSReportProcessorAction extends AbsServletRequestAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8500443887410035760L;
	
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	protected String getReqType() {
		return "Report";
	}

	@Resource(name = "aPQueryProcessor")
	IAPProcessor process;

	@Override
	protected void beforeAction() {

	}

	@Override
	protected String executeAction() throws Exception {
		JSONObject trxData = JsonHelper.getTrxObject(dataDom);
		JsonUtil.getChildJson(dataDom, "trxDom").put("reqType", "ajax");
		processResult = process.run(dataDom.toString());
		IApResponse apResponse = (IApResponse) processResult;
	
		if(apResponse.isSuccess()){
			String reportType = trxData.containsKey("reporttype")?trxData.getString("reporttype"):"";
			WebUtils.showViewFile(reportType,apResponse.getObj(), response);
		}else{
			super.dataMap.put("message", apResponse.getMessage());
			super.dataMap.put("success", false);
			return ERROR;
		}

		return null;
	}

	protected void afterAction() {
	}

}
