package com.ut.scf.core.page;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("workflowEntry")
public class WorkFlowPageEntry extends AbsPageEntry{

	@Override
	public PagePara getCurrentPage(int strPageIndex) {
		PagePara retPage = null;
		do{
			retPage = super.getCurrentPage(strPageIndex++);
		}while(retPage==null||!retPage.isTransaction());
		
		return buildReturnPage(retPage, --strPageIndex);
	}

	@Override
	public boolean checkPageEntry(JSONObject dataDom) {
		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);
		String reqPageType =trxDom.containsKey("reqPageType")? trxDom.getString("reqPageType"):REQ_TYPE_NEXT;
		
		if(REQ_TYPE_INITLIZE.equalsIgnoreCase(reqPageType)&&JsonHelper.hasWorkflowObject(dataDom)){
			ApSessionContext context = ApSessionUtil.getContext();
			FunctionPara orgFuncObj;
			try {
				orgFuncObj = getOrinFuncObj(dataDom);
				if(orgFuncObj!=null){
					context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT, orgFuncObj);
					context.setSysOrgnFuncId(orgFuncObj.getId());
				}
				return true;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return false;
	}
	
	public FunctionPara getOrinFuncObj(JSONObject dataDom) throws Exception {
		JSONObject workflowObj = JsonHelper.getWorkflowObject(dataDom);
		
		return getFuncObj(workflowObj.getString("sysOrgnFuncId"));
	}
	
	protected FunctionPara getFuncObj(String funcID) throws Exception {
		ApSessionContext context = ApSessionUtil.getContext();
		FunctionPara funcObj = XMLParaParseHelper.parseFuncPara(funcID,context.getSysBusiUnit());
		return funcObj;
	}

}
