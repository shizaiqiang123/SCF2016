package com.ut.scf.mule.test;


import org.springframework.stereotype.Component;

import com.ut.scf.core.component.logic.ILogicFlowComponent;
import com.ut.scf.core.data.FuncDataObj;

import net.sf.json.JSONObject;

@Component("alertClientTest")
public class AlertClientTest implements ILogicFlowComponent {

	@Override
	public FuncDataObj postData(FuncDataObj logicObj) throws Exception {
		JSONObject reqData = logicObj.getReqData();

		FuncDataObj retFuncDataObj = new FuncDataObj();
		try {
			
			System.out.println("******************************");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retFuncDataObj;
	}

	
}
