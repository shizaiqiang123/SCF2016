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
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;


/**
 * 批处理供应商材料未达提醒
 * @author 开发
 *
 */
@Component("batchCustMaterialNotToRemindProcessor")
@Scope("prototype")
public class BatchCustMaterialNotToRemindProcessor  extends AbsRunableTask{
	
	protected ApSessionContext context;// 当前交易基本信息
	
	@Resource(name = "documentFactory")
	DocumentFactoryImpl documentFactory ;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;
	@Override
	public void execute() {
		this.context = ApSessionUtil.getContext();
		TaskPara taskPara = (TaskPara) currentTask.getParam();

		String catalogId = taskPara.getCatalog();

		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		String paraDt = (String) trxDataPara.getProterties().get("paraDt"); // 供应商材料送达日提前通知天数
		APLogUtil.getUserLogger().info("---------------供应商材料送达日提前通知天数为："+paraDt);
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
				if(map.get("arrivalDt") !=null){					
					String arrivalDt= map.get("arrivalDt").toString();
					if(calDays(nowDt,arrivalDt)<= Integer.parseInt(paraDt)){
						String selId = map.get("sysRefNo").toString();
						String sql = "select u from STD.UserInfoM u where u.userOwnerid = ?";
						FuncDataObj dataObj = new FuncDataObj();
						JSONObject reqData = JsonHelper.createReqJson();
						JSONObject trxData = JsonHelper.getTrxObject(reqData);
						QueryNode queryNode = new QueryNode();
						queryNode.setSql(sql);
						queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
						queryNode.setParams(selId);
						dataObj.setReqParaObj(queryNode);
						dataObj.setReqData(trxData);
						dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
						daoHelper.execQuery(dataObj);				
						List<Map> userObj = (List<Map>) dataObj.get(dataObj.getDoName());
						if (!userObj.isEmpty()) {
							for(Map user :userObj){	
								//调用预警API								
								if(trxDataPara!=null){
									trxData.putAll(trxDataPara.getProterties());
									trxData.putAll(user);
								}								
								try {
									reqData = (JSONObject) runTaskJsEnginee(taskPara,reqData);
								} catch (Exception e) {
									e.printStackTrace();
									continue;
								}
								
								System.out.println("《--------------------供应商材料未达提醒通知发出-----------------------》");
								APLogUtil.getUserLogger().info("《--------------------供应商材料未达提醒通知发出-----------------------》");
							}					
						}else{
							System.out.println("《--------------------用户表中没有供应商编号为："+selId+"的用户-----------------------》");
							APLogUtil.getUserLogger().info("《--------------------用户表中没有供应商编号为："+selId+"的用户-----------------------》");
						}
					}
				}else{
					APLogUtil.getUserLogger().info("《--------------------供应商材料寄送日未填写------------------》");
				}
			}
		}else{
			APLogUtil.getUserLogger().info("《--------------------没有待审核的供应商---------------------》");
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
