package com.ut.scf.core.component.main.impl.beans;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.comm.pojo.FunctionInfo;
import com.comm.pojo.PageInfo;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.component.IGetPage;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.page.PageEntryFactory;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("aSETrxPageManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxPageManagerBean implements IMainComponent,IGetPage {

	private String reqPageType;

	private static final String REQ_TYPE_INITLIZE = "initlize";
	private static final String REQ_TYPE_NEXT = "next";
	private static final String REQ_TYPE_PRE = "pre";
	private static final String REQ_TYPE_CONTINUE = "continue";
	private static final String REQ_TYPE_SAVE = "save";
	private static final String REQ_TYPE_NEW = "new";
	private static final String REQ_TYPE_ENTRY = "entry";

	@Override
	public Object submitData(Object paraDom) throws Exception {
		JSONObject dataDom = (JSONObject) paraDom;
		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);
		reqPageType =trxDom.containsKey("reqPageType")? trxDom.get("reqPageType").toString():REQ_TYPE_NEXT;
		JSONObject funcInfo = JsonUtil.getChildJson((JSONObject) dataDom, "funcInfo");
		Object pageObj = funcInfo.get("sysPageIndex");
		int strPageIndex = -1;
		if(pageObj!=null)
			strPageIndex = funcInfo.getInt("sysPageIndex");

		ApSessionContext context = ApSessionUtil.getContext();

		int totalPage = context.getSysTotalPage();
	
		int beforePage = strPageIndex;
		
		int totalTrxPage = context.getSysTrxTotalPage();
		
		int trxPageIndex = context.getSysTrxPageIndex();

		try {
			if(REQ_TYPE_INITLIZE.equals(reqPageType)){
				beforePage = 0;
				FunctionPara funcObj = XMLParaParseHelper.parseFuncPara(trxDom.getString("sysFuncId"),context.getSysBusiUnit());
				totalPage=funcObj.getPagesSize(); 
				context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT, funcObj);
				context.setSysTotalPage(totalPage);
				totalTrxPage = funcObj.getTransactionPage();
				context.setSysTrxTotalPage(totalTrxPage);
				trxPageIndex = -1;
//				strFunType = funcObj.getFunctype();
			}else if(REQ_TYPE_NEXT.equals(reqPageType)){
				if (beforePage + 1 < totalPage)
					beforePage++;
			}else if(REQ_TYPE_PRE.equals(reqPageType)){
				if (beforePage - 1 > -1){
					String funcId = funcInfo.getString("sysFuncId");
					FunctionPara cFuncObj = XMLParaParseHelper.parseFuncPara(funcId,context.getSysBusiUnit());
					context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT, cFuncObj);
					context.setSysTotalPage(cFuncObj.getPagesSize());
					String orgnFuncId = funcInfo.get("sysOrgnFuncId")!=null?funcInfo.getString("sysOrgnFuncId"):"";
					
					if(StringUtil.isTrimNotEmpty(orgnFuncId)){
						FunctionPara orgnFuncObj = XMLParaParseHelper.parseFuncPara(orgnFuncId,context.getSysBusiUnit());
						context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT, orgnFuncObj);
					}
					PagePara orgnPage = getCurrentPage(beforePage);
					if(orgnPage.isTransaction())
						trxPageIndex--;
					context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT, orgnPage);
					beforePage--;
				}
			}else if(REQ_TYPE_CONTINUE.equals(reqPageType)){
				beforePage = 0;
				String funcId = funcInfo.getString("sysFuncId");
				FunctionPara cFuncObj = XMLParaParseHelper.parseFuncPara(funcId,context.getSysBusiUnit());
				context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT, cFuncObj);
			}else if(REQ_TYPE_SAVE.equals(reqPageType)){
				beforePage = totalPage;
			}else if(REQ_TYPE_NEW.equals(reqPageType)){
				beforePage = totalPage;
			}else if(REQ_TYPE_ENTRY.equals(reqPageType)){
//				beforePage = 0;
				FunctionPara funcObj = XMLParaParseHelper.parseFuncPara(trxDom.getString("sysFuncId"),context.getSysBusiUnit());
				totalPage=funcObj.getPagesSize(); 
				context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT, funcObj);
				funcInfo.put("funcType", funcObj.getFunctype());
				String strFunType = funcObj.getFunctype();
				if("RE".equalsIgnoreCase(strFunType)||"VH".equalsIgnoreCase(strFunType)||"DP".equalsIgnoreCase(strFunType)||"FP".equalsIgnoreCase(strFunType)){
					String strOrgnFunction =trxDom.containsKey("sysOrgnFuncId")? trxDom.getString("sysOrgnFuncId"):"";
					if(StringUtil.isTrimNotEmpty(strOrgnFunction)){
						FunctionPara orgnFunction = XMLParaParseHelper.parseFuncPara(strOrgnFunction,context.getSysBusiUnit());
						context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT, orgnFunction);
						totalTrxPage+=orgnFunction.getTransactionPage();
						context.setSysOrgnFuncId(strOrgnFunction);
					}
				}
				
				context.setSysTotalPage(totalPage);
				totalTrxPage += funcObj.getTransactionPage();
				context.setSysTrxTotalPage(totalTrxPage);
				
				PagePara page = getFirstTrxPage();
				beforePage = Integer.parseInt(page.getIndex());
				trxPageIndex = 0;
				context.setSysPageIndex(beforePage);
			}
			
			IGetPage pageProcessor = PageEntryFactory.getPageProcessor(dataDom);
			
			PagePara currentPage = pageProcessor.getCurrentPage(beforePage);
			if(currentPage.isTransaction()){
				if(REQ_TYPE_INITLIZE.equals(reqPageType)){
				
					trxPageIndex=0;
				}else if(REQ_TYPE_NEXT.equals(reqPageType)){
					trxPageIndex++;
				}else if(REQ_TYPE_PRE.equals(reqPageType)){
				}else if(REQ_TYPE_CONTINUE.equals(reqPageType)){
					trxPageIndex=0;
				}else if(REQ_TYPE_SAVE.equals(reqPageType)){
					trxPageIndex=totalTrxPage;
				}else if(REQ_TYPE_NEW.equals(reqPageType)){
					trxPageIndex=totalTrxPage;
				}else if(REQ_TYPE_ENTRY.equals(reqPageType)){
					trxPageIndex=0;
				}
			}
			
			FunctionInfo functionInfo = new FunctionInfo();
			context = ApSessionUtil.getContext();
			FunctionPara funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
			
			if(funcObj==null){
				funcObj = XMLParaParseHelper.parseFuncPara(trxDom.getString("sysFuncId"),context.getSysBusiUnit());
				context.setAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT, funcObj);
			}
			
			funcObj =  (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
			if(funcObj!=null){
//				functionInfo.setFuncType(funcObj.getFunctype());
				String strFunType =funcInfo.containsKey("funcType")?funcInfo.getString("funcType"):"";
//				String strFunType =funcObj.getFunctype();
				if(StringUtil.isTrimEmpty(strFunType)){
					if(trxDom.containsKey("funcType")){
						functionInfo.setFuncType(trxDom.getString("funcType"));
					}else if (isWorkflowEntry(trxDom)){
						if("RE".equalsIgnoreCase(funcObj.getFunctype())){
							functionInfo.setFuncType(funcObj.getFunctype());
						}else{
							functionInfo.setFuncType("FP");
						}
					}else{
						functionInfo.setFuncType(funcObj.getFunctype());
					}
				}else{
					functionInfo.setFuncType(strFunType);
				}
				
				functionInfo.setModule(funcObj.getModule());
				functionInfo.setSysFuncId(funcObj.getId());
				functionInfo.setSysFuncName(funcObj.getName());
			}

			functionInfo.setSysEventTimes(context.getSysEventTimes());
			functionInfo.setSysOrgnFuncId(context.getSysOrgnFuncId());
			functionInfo.setSysRefNo(context.getSysRefNo());

			PageInfo info = new PageInfo();
			//CE 模式下，这个beforePage 是错误的，必须使用context中的值
//			info.setIndex(beforePage);
//			if("CE".equalsIgnoreCase(strFunType)){
//				info.setIndex(context.getSysPageIndex());
//			}
			info.setIndex(Integer.parseInt(currentPage.getIndex()));
			info.setName(currentPage.getName());
			info.setTotal(context.getSysTotalPage());
			info.setUrl(currentPage.getJspfile());
			info.setFunctionId(funcObj.getId());
			info.setPageType(currentPage.getPagetype());
			info.setTransaction(currentPage.isTransaction());
			info.setSysTrxPageIndex(trxPageIndex);
			info.setSysTrxTotalPage(context.getSysTrxTotalPage());
			info.setDoname(currentPage.getDoname());

			IApResponse obj = new ApResponse();
			obj.setTotal(1);
			obj.setPageInfo(info);
			obj.setFuncObj(functionInfo);

			return obj;
		} catch (Exception e) {
//			e.printStackTrace();
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
			IApResponse obj = new ApResponse();
			obj.setTotal(1);
			obj.setPageInfo(null);
			obj.setFuncObj(null);
			obj.setMessage(e.getMessage());
			obj.setSuccess(false);
			return obj;
		}
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		return submitData(paraDom);
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
	}
	
	@Override
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
			if(orgnFuncObj==null)
				return funcObj.getPage(strPageIndex);
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
						return funcObj.getPage(strPageIndex-trxPageCount);
					}else{
						return orgnFuncObj.getTrxPage(strPageIndex-i);
					}
				}else{
					if(strPageIndex==currentIndex){
						return funcObj.getPage(currentIndex);
					}
					currentIndex++;
				}
				
			}
			return orgnFuncObj.getTrxPage(strPageIndex-currentIndex);
		}
		else if("CE".equalsIgnoreCase(strFunType)){
			FunctionPara orgnFuncObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
			if(orgnFuncObj==null)
				return funcObj.getPage(strPageIndex);
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
					context.setSysPageIndex(i);
					ApSessionUtil.setContext(context);
					return page;
				}else{
					
				}
			}
			return funcObj.getPage(strPageIndex);
		}else{
			currentPage = funcObj.getPage(strPageIndex);
		}
		context.setSysTotalPage(totalPage);
		context.setSysTrxTotalPage(currTrxPage);
		return currentPage;
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
	
	public boolean isWorkflowEntry(JSONObject trxDom ){
		if(trxDom.containsKey("entryType")){
			String entry = trxDom.getString("entryType");
			return "workflow".equalsIgnoreCase(entry);
		}
		return false;
	}
	
	public PagePara getFirstTrxPage(){
		ApSessionContext context = ApSessionUtil.getContext();
		FunctionPara funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
//		context.setSysPageIndex(strPageIndex);
		Assert.isTrue(funcObj.getPagesSize()>0, "This function is developing now, please waitting...");
//		int totalPage = funcObj.getPagesSize();
//		int currTrxPage = funcObj.getTransactionPage();
		String strFunType = funcObj.getFunctype();
		
		if("RE".equalsIgnoreCase(strFunType)||"VH".equalsIgnoreCase(strFunType)||"DP".equalsIgnoreCase(strFunType)||"FP".equalsIgnoreCase(strFunType)){
			FunctionPara orgnFuncObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
			if(orgnFuncObj==null)
				return funcObj.getTrxPage(0);
			
			return orgnFuncObj.getTrxPage(0);
		}
		else if("CE".equalsIgnoreCase(strFunType)){
			FunctionPara orgnFuncObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_ORIN_FUNCTION_OBJECT);
			if(orgnFuncObj==null)
				return funcObj.getTrxPage(0);
			return orgnFuncObj.getTrxPage(0);
		}else{
			return funcObj.getTrxPage(0);
		}
	}

}
