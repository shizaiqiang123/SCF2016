package com.ut.scf.core.component.batch;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;

@Component("batchSodEodProcessor")
@Scope("prototype")
public class BatchSodEodProcessor extends AbsRunableTask{

	@Override
	public void execute() {
		TaskPara tp = (TaskPara) currentTask.getParam();
		TrxDataPara trxPara = tp.getTrxdatapara();
		
		JSONObject reqData = JsonHelper.createReqJson();
		if(trxPara!=null)
			JsonHelper.getTrxObject(reqData).putAll(trxPara.getProterties());
		
		try {
			reqData = (JSONObject) runTaskJsEnginee(tp,reqData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		getLogger().error(tp.getId());
	}
}
