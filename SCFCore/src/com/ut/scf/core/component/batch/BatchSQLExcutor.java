package com.ut.scf.core.component.batch;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSON;
import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.data.IApResponse;

@Component("batchSQLExecutor")
@Scope("prototype")
public class BatchSQLExcutor extends AbsRunableTask{

	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;

	@Override
	public void execute() {
		TaskPara taskPara = (TaskPara) currentTask.getParam();

		String catalogId = taskPara.getCatalog();
		
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		String paraTp = (String) trxDataPara.getProterties().get("paraTp");

		if (StringUtil.isTrimEmpty(catalogId)) {
			return;
		}

		IApResponse catalogResult = getCatalogObj(catalogId);
		if (catalogResult != null&& catalogResult.getTotal()!=0 && catalogResult.isSuccess()) {
			List<Map> catalogRecords = (List<Map>) catalogResult.getRows();
			if ("Y".equalsIgnoreCase(taskPara.getSinglethread())||catalogRecords.size()<3) {
				runTaskSingleThread(catalogRecords);
			} else {
				runTaskMutiThread(catalogRecords);
			}
		}

		getLogger().info(this.currentTask.getTaskId());
	}

	protected IApResponse getCatalogObj(String catalogId) {
		try {
			JSONObject reqJson = JsonHelper.createReqJson();

			JSONObject trxJson = JsonHelper.getTrxObject(reqJson);

			trxJson.put("cataType", "loadData");

			trxJson.put("cataId", catalogId);

			return (IApResponse) catalogProcessor.queryData(reqJson);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	protected void runTaskSingleThread(List<Map> catalogRecords) {
		for (Map map : catalogRecords) {
			try {
				runTask(map);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	public class MyThreadTask extends Thread  implements Runnable {
		private List<Map> catalogRecords;

		public MyThreadTask(List<Map> catalogRecords) {
			// TODO Auto-generated constructor stub
			this.catalogRecords = catalogRecords;
		} 
		@Override
		public void run() {
			// TODO Auto-generated method stub
			for (Map map : catalogRecords) {
				try {
					runTask(map);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	protected void runTaskMutiThread(List<Map> catalogRecords) {
		int catalogSize = catalogRecords.size();
		List<Map> catalogRecordsFrist = catalogRecords.subList(0, catalogSize/3);
		List<Map> catalogRecordsSecond = catalogRecords.subList(catalogSize/3,2*catalogSize/3);
		List<Map> catalogRecordslast = catalogRecords.subList(2*catalogSize/3,catalogSize);
		MyThreadTask threadFirst = new MyThreadTask(catalogRecordsFrist);
		MyThreadTask threadSecond = new MyThreadTask(catalogRecordsSecond);
		MyThreadTask threadlast = new MyThreadTask(catalogRecordslast);
		Thread runThreadFrist = new Thread(threadFirst);
		Thread runThreadSecond = new Thread(threadSecond);
		Thread runThreadLast = new Thread(threadlast);
		runThreadFrist.run();
		runThreadSecond.run();
		runThreadLast.run();
	}

	protected void runTask(Object record) throws Exception{
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		JSONObject reqData = currentTask.getData();
		if(reqData==null)
			reqData =  JsonHelper.createReqJson();

		JSONObject trxJson = JsonHelper.getTrxObject(reqData);

		trxJson.putAll((Map) record);
//		super.runTaskJsEnginee(taskPara, reqData);
		super.runTaskJsEnginee(taskPara, trxJson); //modify by zhx:执行记录集数据
	}
}
