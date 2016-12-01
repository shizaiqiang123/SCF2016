package com.ut.scf.core.page;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import net.sf.json.JSONObject;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
@Service("customerEntry")
public class CustomerPageEntry extends AbsPageEntry{

	@Override
	public PagePara getCurrentPage(int strPageIndex) {
		ApSessionContext context = ApSessionUtil.getContext();
		FunctionPara funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
//		context.setSysPageIndex(strPageIndex);
		Assert.isTrue(funcObj.getPagesSize()>0, "This function is developing now, please waitting...");
		int totalPage = funcObj.getPagesSize();
		int currTrxPage = funcObj.getTransactionPage();
		
		FunctionPara orgnFuncObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
		if(orgnFuncObj==null)
			return buildReturnPage(funcObj.getPage(strPageIndex),strPageIndex);
		int trxPageCount = orgnFuncObj.getTransactionPage();
		totalPage+=trxPageCount;
		currTrxPage+=trxPageCount;
		context.setSysTotalPage(totalPage);
		context.setSysTrxTotalPage(currTrxPage);
		int currentIndex =0;
		for (int i = strPageIndex; i < orgnFuncObj.getPagesSize(); i++) {
			PagePara page = orgnFuncObj.getPage(i);
			if(page.isTransaction()){
				context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT, orgnFuncObj);
//				context.setSysPageIndex(i);
				ApSessionUtil.setContext(context);
				return buildReturnPage(page,i);
			}else{
				
			}
		}
		return buildReturnPage(funcObj.getPage(strPageIndex),strPageIndex);
	}

	@Override
	public PagePara getMainPage() {
		ApSessionContext context = ApSessionUtil.getContext();
		int totalPage = context.getSysTotalPage();
		for (int i = 0; i <totalPage; i++) {
			PagePara p = getCurrentPage(i);
			if(p.isTransaction()&&StringUtil.isTrimEmpty(p.getDoname())){
				return p;
			}
		}
		return getCurrentPage(context.getSysTrxPageIndex());
	}

	@Override
	public boolean checkPageEntry(JSONObject dataDom) {
		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);

		JSONObject funcInfo = JsonHelper.getFuncObject(dataDom);
		String strFunType =funcInfo.containsKey("funcType")?funcInfo.getString("funcType"):"";
		return "CE".equalsIgnoreCase(strFunType);
	}

}
