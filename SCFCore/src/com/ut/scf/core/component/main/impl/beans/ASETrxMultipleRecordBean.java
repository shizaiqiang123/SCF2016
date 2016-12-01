package com.ut.scf.core.component.main.impl.beans;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.page.PagePara;
import com.ut.scf.core.component.AbsMainCompManager;
import com.ut.scf.core.component.ComponentDefine;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ClassLoadHelper;
@Service("aSETrxMultipleBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxMultipleRecordBean extends AbsMainCompManager{
	

	@Override
	public Object submitData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		
		int recordSize = 10;
		PagePara pagePara =super.pagePara;
		String strFuncType = this.funcObj.getFunctype();
		if(ComponentDefine.isDefinedComponent(strFuncType)){
			String mainComponent = ComponentDefine.getDefinedComponent(strFuncType);
			IMainComponent t = ClassLoadHelper.getMainComponetProcessor(mainComponent);
			int totRecode = this.trxData.getInt("total");
			for (int i = 0; i < totRecode ; i++) {
				try{
					//将单个record数据解析成reqDom，逐个调用page中配置的主控。
					JSONObject reqObj = getTrxDom(i);
					JSONObject reqClone = JsonUtil.clone(reqData);
					JsonHelper.setTrxObject(reqClone, reqObj);
					Object retObj = t.submitData(reqClone);
					//主控中默认会提交事务，这里需要将事务提出来执行
				}catch(Exception e){
					logger.error(e.toString());
				}
			}
			
			Object response = logicDataObj.buildReturnRespose();
			return response;
		}
		
		Object response = logicDataObj.buildReturnRespose();
		return response;
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		logicDataObj = new FuncDataObj();
		Object response = logicDataObj.buildReturnRespose();
		return response;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
	}
	
	public JSONObject getTrxDom(int recodIndex){
		String key = "rows"+recodIndex;
		if(this.trxData.containsKey(key)){
			return this.trxData.getJSONObject(key);
		}
		return null;
	}

}
