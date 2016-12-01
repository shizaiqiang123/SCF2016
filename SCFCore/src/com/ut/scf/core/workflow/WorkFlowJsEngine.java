package com.ut.scf.core.workflow;

import java.io.File;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import net.sf.json.JSONObject;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.js.ServerSideJsImpl;

@Service("workflowJs")
@Scope("prototype")
public class WorkFlowJsEngine  extends ServerSideJsImpl{
	ProcessInstanceData instanceData;
	
	@Override
	public Object getTrxData() {
		checkInstanceData();
		return instanceData;
	}
	
	@Override
	public void initTrxData(Object reqData) {
		super.initTrxData(reqData);
		instanceData = new ProcessInstanceData();
		
		JSONObject trxJson = (JSONObject) getTrxJsonData();
		Object isAgree = trxJson.get("isAgree");
		if(isAgree!=null){
			instanceData.setAgree("Y".equalsIgnoreCase(isAgree.toString()));
		}else{
			instanceData.setAgree(false);
		}
		
		JSONObject funcJson = (JSONObject) super.funcData;
		
		instanceData.setCurrentStep(funcJson.getString("sysFuncId"));
		instanceData.setPreStep(funcJson.containsKey("sysOrgnFuncId")?funcJson.getString("sysOrgnFuncId"):"");
		
		instanceData.setItemEvent(trxJson.containsKey("sysEventTimes")?trxJson.getInt("sysEventTimes"):0);
		
		instanceData.setItemRefNo(trxJson.containsKey("sysRefNo")?trxJson.getString("sysRefNo"):"");

	}
	
	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("workflow", fileName));
		super.executeJsFile(scriptFile.getPath());
	}
	
	public void assignNextStep(String nextStep){
		if(instanceData==null){
			instanceData  = new ProcessInstanceData();
		}
		
		if("RE".equalsIgnoreCase(getFuncType())){
			String currentStep = instanceData.getCurrentStep();
			String preStep = instanceData.getPreStep();
			if(instanceData.isAgree()){
				instanceData.setNextStep(currentStep);
			}else{
				instanceData.setNextStep(preStep);
			}
		}else{
			instanceData.setNextStep(nextStep);
		}
//		instanceData.setNextStep(nextStep);
	}
	
	public void checkInstanceData(){
		getLogger().debug(instanceData.toString());
	}
	
}
