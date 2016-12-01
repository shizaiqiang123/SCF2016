package com.ut.scf.core.component.main.impl.beans;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.comm.pojo.PageInfo;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.component.AbsMainCompManager;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;

@Service("aSETrxResultManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxResultManagerBean extends AbsMainCompManager{
//	protected FuncDataObj logicDataObj;
//	@Resource(name = "aSETrxPageManagerBean")
//	protected IGetPage pageManager;
	@Override
	public Object queryData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		logicDataObj = new FuncDataObj();
		IApResponse response = (IApResponse) logicDataObj.buildReturnRespose();
		
		int totalPage = this.context.getSysTotalPage();
		List<Object> pageList = new ArrayList<Object>();
		for (int i = 0; i < totalPage; i++) {
			PagePara page = pageManager.getCurrentPage(i);
			if(page.isTransaction()&&!"rs".equalsIgnoreCase(page.getPagetype())){
				PageInfo info = new PageInfo();
				info.setIndex(i);
				info.setName(page.getName());
				info.setTotal(context.getSysTotalPage());
				info.setUrl(page.getJspfile());
				info.setPageType(page.getPagetype());
				info.setTransaction(page.isTransaction());
				info.setDoname(page.getDoname());
				pageList.add(info);
			}
		}
		
		trxData.put("isValidCode", funcObj.getIsValidCode());//是否有验证码		
		trxData.put("pages", pageList);
		response.setObj(trxData);
		return response;
	}
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		
		JSONObject funcJson = JsonHelper.getFuncObject(reqData);
		int index = funcJson.getInt("sysPageIndex");
		Object response = logicDataObj.buildReturnRespose();
		
		if(--index>-1){
			pagePara = pageManager.getMainPage();
			funcJson.put("sysPageIndex", index);
			this.context.setSysPageIndex(index);
			IMainComponent	t = super.getMainComponent(reqData,pagePara);
			response = t.submitData(reqData);
		}
		return response;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		
		JSONObject funcJson = JsonHelper.getFuncObject(reqData);
		int index = funcJson.getInt("sysPageIndex");
		PagePara pagePara = pageManager.getCurrentPage(index);
		Object response = logicDataObj.buildReturnRespose();
		
		if(--index>-1){
			pagePara = pageManager.getCurrentPage(index);
			funcJson.put("sysPageIndex", index);
			IMainComponent	t = super.getMainComponent(reqData, pagePara);
			t.cancelData(reqData);
		}
		return response;
	}


	
}
