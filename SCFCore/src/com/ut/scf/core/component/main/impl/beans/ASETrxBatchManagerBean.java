package com.ut.scf.core.component.main.impl.beans;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.batch.BatchPara;
import com.ut.scf.core.batch.BatchInfoImpl;
import com.ut.scf.core.batch.IBatchComponent;
import com.ut.scf.core.batch.IBatchControl;
import com.ut.scf.core.batch.IBatchInfo;
import com.ut.scf.core.component.AbsMainCompManager;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.task.ITaskRunningInfo;
import com.ut.scf.core.task.TaskRunningInfoImpl;

@Component("aSETrxBatchManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxBatchManagerBean extends AbsMainCompManager{
	@Resource(name="batchManager")
	protected IBatchControl batchControl ;
	
	@Resource(name="batchProcessor")
	protected IBatchComponent batchComponent;
	
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		return queryData(paraDom);
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		Assert.isTrue(this.trxData.containsKey("reqBatchType"), "Batch manager must has request type.");
		String reqType =this.trxData.getString("reqBatchType");
		String curBu = "";
		if(paraDom instanceof JSONObject){
			paraDom=(JSONObject) paraDom;
			JSONObject jsonObject = ((JSONObject) paraDom).getJSONObject("userInfo");
			curBu = (String) jsonObject.get("sysBusiUnit");
			if(curBu==null||"".equals(curBu)){
				curBu = ASPathConst.getDefaultBuName();
			}
		}
		if("inq-all".equalsIgnoreCase(reqType)){
			return queryAllBatch(curBu);
		}else if("start".equalsIgnoreCase(reqType)){
			return startBatch();
		}else if("stop".equalsIgnoreCase(reqType)){			
			return stopBatch();
		}else if("start-all".equalsIgnoreCase(reqType)){
			return startAllBatch(curBu);
		}else if("stop-all".equalsIgnoreCase(reqType)){
			return stopAllBatch(curBu);
		}else if("run".equalsIgnoreCase(reqType)){
			return runBatch();
		}else{
			return querySingleBatch();
		}
	}

	private Object runBatch() {
		IBatchInfo batchInfo = getBatchInfo();	
		BatchPara para = (BatchPara)batchControl.getBatch(batchInfo);
		ITaskRunningInfo taskRunningInfo = new TaskRunningInfoImpl();		
		taskRunningInfo.setData(reqData);
		taskRunningInfo.setTaskId(para.getId());
		taskRunningInfo.setParam(para);
		batchComponent.runBatch(taskRunningInfo);		
		FuncDataObj obj = new FuncDataObj();		
		obj.buildRespose(batchInfo);
		logicDataObj.mergeResponse(obj);
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	private Object stopAllBatch(String bu) {
		batchControl.stopBatchByBu(bu);		
		FuncDataObj obj = new FuncDataObj();		
		obj.buildRespose(batchControl.queryBatch(bu));
		logicDataObj.mergeResponse(obj);
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	private Object startAllBatch(String bu) {
		batchControl.startBatchByBu(bu);
		FuncDataObj obj = new FuncDataObj();		
		obj.buildRespose(batchControl.queryBatch(bu));
		logicDataObj.mergeResponse(obj);
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	private Object stopBatch() {
		IBatchInfo batchInfo = getBatchInfo();	
		BatchPara para = (BatchPara)batchControl.getBatch(batchInfo);
		batchComponent.stopBatch(para);		
		FuncDataObj obj = new FuncDataObj();		
		obj.buildRespose(batchInfo);
		logicDataObj.mergeResponse(obj);
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	private Object startBatch() {
		IBatchInfo batchInfo = getBatchInfo();	
		BatchPara para = (BatchPara)batchControl.getBatch(batchInfo);
		batchComponent.startBatch(para);
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose(batchInfo);
		logicDataObj.mergeResponse(obj);
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		parseParameters(paraDom);
		Object response = logicDataObj.buildReturnRespose();
		return response;
	}
	
	public Object queryAllBatch(String bu) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose(batchControl.queryBatch(bu));
		logicDataObj.mergeResponse(obj);
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	public Object querySingleBatch() throws Exception {
		FuncDataObj obj = new FuncDataObj();
		IBatchInfo batchInfo = getBatchInfo();
		batchInfo = (IBatchInfo) batchComponent.getBatch(batchInfo);
		obj.buildRespose(batchInfo);
		logicDataObj.mergeResponse(obj);
		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}

	private IBatchInfo getBatchInfo() {
		String batchId = trxData.getString("batchId");
		Assert.isTrue(StringUtil.isTrimNotEmpty(batchId), "Query Batch manager must has Batch ID.");
		IBatchInfo batchInfo = new BatchInfoImpl();
		batchInfo.setBatchId(batchId);
		batchInfo.setBatchType(trxData.getString("batchType"));
		return batchInfo;
	}

}
