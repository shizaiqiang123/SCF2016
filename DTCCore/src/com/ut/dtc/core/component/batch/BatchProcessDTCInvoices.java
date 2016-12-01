package com.ut.dtc.core.component.batch;

import java.io.File;
import java.util.Date;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.batch.IAutoRunableTask;
import com.ut.scf.core.component.batch.BatchInvcExecutor;
import com.ut.scf.core.task.ITaskRunningInfo;
import com.ut.scf.core.task.TaskRunningInfoImpl;
import com.ut.scf.core.utils.BuDateTimeUtil;

@Component("batchProcessDTCInvoices")
@Scope("prototype")
public class BatchProcessDTCInvoices extends AbsRunableTask {

	@Override
	public void execute() {
		getLogger().debug(formatLogger("数据中心处理发票信息。。。"));
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		Map paraDataMap = trxDataPara.getProterties();
		String filePath = paraDataMap.containsKey("filePath")?paraDataMap.get("filePath").toString():"";//获取文件路径
		getLogger().debug(formatLogger("filePath:",filePath));
		String fileBakPath = paraDataMap.containsKey("fileBakPath")?paraDataMap.get("fileBakPath").toString():""; //文件备份路径
		getLogger().debug(formatLogger("fileBakPath:",fileBakPath));
		final String fileExtensions = paraDataMap.containsKey("fileExtensions")?paraDataMap.get("fileExtensions").toString():""; //获取文件后缀名
		getLogger().debug(formatLogger("fileExtensions:",fileExtensions));
		
		File root = new File(filePath);
		if(root.exists()&&root.canRead()){
			File []  allCustDirs = root.listFiles();
			getLogger().debug(formatLogger("allCustDirs count:",allCustDirs.length+""));
			
			for (File file : allCustDirs) {
				try{
					getLogger().debug(formatLogger("process customer:",file.getName()));
					
					IAutoRunableTask task = new BatchInvcExecutor();
					ITaskRunningInfo taskInfo = new TaskRunningInfoImpl();
					taskInfo.setData(JsonHelper.createReqJson());
					TaskPara param = new TaskPara();
					String taskId = "T_S_000009";
					
					param.setId(taskId);
					TrxDataPara trxData = new TrxDataPara();
					trxData.setProterty("filePath", file.getAbsolutePath()+File.separator+"invc");
					trxData.setProterty("fileBakPath", file.getAbsolutePath()+File.separator+"backup");
					trxData.setProterty("fileExtensions", fileExtensions);
					param.setTrxdatapara(trxData);
					
					taskInfo.setParam(param);
					taskInfo.setTaskId(taskId );
					
					task.excuteTask(taskInfo );
				}catch(Exception e){
					getLogger().error(formatLogger("process customer:",file.getName()," failed,",e.toString()));
				}
			}
		}else{
			getLogger().error(formatLogger("filePath 不存在或者不可读。"));
		}
	}

	
	public String formatPath(String input){
		if(StringUtil.isNotEmpty(input))
			return "";
		if(input.contains("$")){
			String replaseField = input.substring(input.indexOf("$")+1,input.lastIndexOf("$"));
			if("sysdate".equalsIgnoreCase(replaseField)){
				Date buDate = BuDateTimeUtil.getCurrentBuDate();
				String strSysdate = DateTimeUtil.parseDate(buDate, "yyyyMMdd");
				input = input.replace("$sysdate$", strSysdate);
				return input;
			}else{
				return input;
			}
		}else{
			return input;
		}
	}
}
