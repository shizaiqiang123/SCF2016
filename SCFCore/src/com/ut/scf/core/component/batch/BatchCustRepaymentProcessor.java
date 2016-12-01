package com.ut.scf.core.component.batch;

import java.sql.Timestamp;
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

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;


/**
 * 批处理供应商还款提醒
 * @author 开发
 *
 */
@Component("batchCustRepaymentProcessor")
@Scope("prototype")
public class BatchCustRepaymentProcessor  extends AbsRunableTask{
	protected ApSessionContext context;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;	
	@Override
	public void execute() {
		try {		
			this.context = ApSessionUtil.getContext();
			TaskPara taskPara = (TaskPara) currentTask.getParam();
			TrxDataPara trxDataPara = taskPara.getTrxdatapara();
			process(taskPara,trxDataPara);			
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserLogger().error("BatchCustRepaymentProcessor: 批处理供应商还款提醒出错。");
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}	
	}
	
	private void  process(TaskPara taskPara,TrxDataPara trxDataPara)throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);	
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		QueryNode queryNode = new QueryNode();
		queryNode.setSql("select p from TRX.PmtM p where  p.pmtSts ='0'");
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
//		String paraDt = (String) trxDataPara.getProterties().get("paraDt");
		int paraDt=0;
		if(trxDataPara.getProterties().get("paraDt")!=null){
		paraDt=trxDataPara.getProterties().containsKey("paraDt")?Integer.parseInt(trxDataPara.getProterties().get("paraDt").toString()):0;
//		DateTimeUtil.g
//		Date date=DateTimeUtil.dateAddDays(DateTimeUtil.getSysDate(),paraDt);
//		queryNode.setParams(date.toString());
		}
//		calDays(DateTimeUtil.getSysTime(),paraDt);
//		queryNode.setParams();
		dataObj.setReqParaObj(queryNode);
		dataObj.setReqData(trxData);		
		dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
		daoHelper.execQuery(dataObj);
		List<Map> obj = (List<Map>) dataObj.get(dataObj.getDoName());
		if (!obj.isEmpty()) {
			for (Map per : obj) {
				if(calDays(DateTimeUtil.getSysTime(), per.get("pmtDt").toString())<=paraDt){
				String userId = per.get("sysOpId").toString();
//				String sql = "select u from UserInfoM u where u.sysRefNo = ?";
//				queryNode.setSql(sql);
//				queryNode.setParams(userId);
//				dataObj.setReqParaObj(queryNode);
//				dataObj.setReqData(trxData);
//				dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
//				daoHelper.execQuery(dataObj);				
//				List<Map> userObj = (List<Map>) dataObj.get(dataObj.getDoName());
//				if (!userObj.isEmpty()) {
//					for(Map user :userObj){
//						TaskPara taskPara = (TaskPara) currentTask.getParam();				
						
						//调用预警API				
						if(trxDataPara!=null){
							trxData.putAll(trxDataPara.getProterties());
							trxData.putAll(per);
						}
						reqData = (JSONObject) runTaskJsEnginee(taskPara,reqData);
						
						System.out.println("《--------------------供应商融资提醒通知发出-----------------------》");
						APLogUtil.getUserLogger().info("《--------------------供应商融资提醒通知发出-----------------------》");
					}					
//				}else{
//					System.out.println("《--------------------用户表中没有供应商编号为："+userId+"的用户-----------------------》");
//					APLogUtil.getUserLogger().info("《--------------------用户表中没有供应商编号为："+userId+"的用户-----------------------》");
//				}
//			}
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
			e.printStackTrace();
		}
		
		return diffDays;

	}
}