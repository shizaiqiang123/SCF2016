package com.ut.scf.core.page;

import org.springframework.util.Assert;

import net.sf.json.JSONObject;

import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.component.IGetPage;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;

public abstract class AbsPageEntry implements IGetPage{
	protected static final String REQ_TYPE_INITLIZE = "initlize";
	protected static final String REQ_TYPE_NEXT = "next";
	protected static final String REQ_TYPE_PRE = "pre";
	protected static final String REQ_TYPE_CONTINUE = "continue";
	protected static final String REQ_TYPE_SAVE = "save";
	protected static final String REQ_TYPE_NEW = "new";
	
	public abstract boolean checkPageEntry(JSONObject dataDom);

	
	public PagePara getCurrentPage(int strPageIndex){
		ApSessionContext context = ApSessionUtil.getContext();
		FunctionPara funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
//		context.setSysPageIndex(strPageIndex);
		Assert.isTrue(funcObj.getPagesSize()>0, "This function is developing now, please waitting...");
		int totalPage = funcObj.getPagesSize();
		int currTrxPage = funcObj.getTransactionPage();
		String strFunType = funcObj.getFunctype();
		PagePara currentPage = null;
		
		if("RE".equalsIgnoreCase(strFunType)||"VH".equalsIgnoreCase(strFunType)||"DP".equalsIgnoreCase(strFunType)||"FP".equalsIgnoreCase(strFunType)){
			FunctionPara orgnFuncObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
			if(orgnFuncObj==null){
				return buildReturnPage(funcObj.getPage(strPageIndex),strPageIndex);
			}
				
			int trxPageCount = orgnFuncObj.getTransactionPage();
			totalPage+=trxPageCount;
			currTrxPage+=trxPageCount;
			context.setSysTotalPage(totalPage);
			context.setSysTrxTotalPage(currTrxPage);
			int currentIndex =0;
			for (int i = 0; i < funcObj.getPagesSize(); i++) {
				PagePara page = funcObj.getPage(i);
				if(page.isTransaction()){
					if(currentIndex+trxPageCount<=strPageIndex){
						return buildReturnPage(funcObj.getPage(strPageIndex-trxPageCount),strPageIndex);
					}else{
						return buildReturnPage(orgnFuncObj.getTrxPage(strPageIndex-i),strPageIndex);
					}
				}else{
					if(strPageIndex==currentIndex){
						return buildReturnPage(funcObj.getPage(currentIndex),strPageIndex);
					}
					currentIndex++;
				}
				
			}
			return buildReturnPage(orgnFuncObj.getTrxPage(strPageIndex-currentIndex),strPageIndex);
		}else{
			currentPage = funcObj.getPage(strPageIndex);
		}
		context.setSysTotalPage(totalPage);
		context.setSysTrxTotalPage(currTrxPage);
		return buildReturnPage(currentPage,strPageIndex);
	}
	
	protected PagePara buildReturnPage(PagePara page, int index){
		page.setIndex(index+"");
		return page;
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
}
