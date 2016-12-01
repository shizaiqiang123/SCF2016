package com.ut.scf.core.component.batch;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.log.APLogUtil;


/**
 * 批处理审核融资申请/还款自动核销 （STP自动处理）
 * @author 开发
 *
 */
@Component("batchReleaseLoanProcessor")
@Scope("prototype")
public class BatchReleaseLoanProcessor  extends AbsRunableTask{
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;	
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;	
	@Override
	public void execute() {
		try {			
			process();			
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}	
	}
	
	private void  process()throws Exception {		
		TaskPara taskPara = (TaskPara) currentTask.getParam();

		String catalogId = taskPara.getCatalog();
		if (StringUtil.isTrimEmpty(catalogId)) {
			return;
		}
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		IApResponse catalogResult = getCatalogObj(catalogId);
		if (catalogResult != null && catalogResult.getTotal() != 0 && catalogResult.isSuccess()) {
			List<Map> catalogRecords = (List<Map>) catalogResult.getRows();			
			for (Map map : catalogRecords) {
				//调用预警API
				trxData.putAll(map);		
				reqData = (JSONObject) runTaskJsEnginee(taskPara,reqData);				
			}
		}
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