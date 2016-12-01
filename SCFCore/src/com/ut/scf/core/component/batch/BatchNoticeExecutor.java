package com.ut.scf.core.component.batch;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
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
@Component("batchNoticeExecutor")
@Scope("prototype")
public class BatchNoticeExecutor  extends AbsRunableTask{
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;
	@Override
	public void execute() {
		TaskPara taskPara = (TaskPara) currentTask.getParam();

		String catalogId = taskPara.getCatalog();

		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		String paraDt = (String) trxDataPara.getProterties().get("paraDt"); // 发票到期前设置天数
		System.out.println("---------------发票到期日提前通知天说为："+paraDt);

		if (StringUtil.isTrimEmpty(catalogId)) {
			return;
		}

		IApResponse catalogResult = getCatalogObj(catalogId);
		if (catalogResult != null && catalogResult.getTotal() != 0 && catalogResult.isSuccess()) {
			List<Map> catalogRecords = (List<Map>) catalogResult.getRows();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			Date now = new Date();
			String nowDt = df.format(now);
			for (Map map : catalogRecords) {
				String invDueDt= map.get("invDueDt").toString();
				if(calDays(nowDt,invDueDt)<= Integer.parseInt(paraDt)){
					//调用预警API
					System.out.println(invDueDt);
					System.out.println("发出通知-----------------------》");
				}
			}
		}
	}
	private long calDays(String nowDt, String invDueDt) {
		long diffDays = 0;
		DateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
		try {
			Date dtNowdt = dtFormat.parse(nowDt);
			Date dtInvDueDt = dtFormat.parse(invDueDt);
			long diffTm = dtInvDueDt.getTime()-dtNowdt.getTime();
			diffDays = diffTm/ (1000 * 60 * 60 * 24);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return diffDays;

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
	
	

}
