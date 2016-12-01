package com.ut.dtc.core.component.batch;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.FileUtil;
import com.ut.comm.tool.FtpUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.dtc.util.DBUtil;
import com.ut.dtc.util.LogUtil;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.utils.BuDateTimeUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

@Component("dtcMainProcessor")
@Scope("prototype")
public class DTCMainProcessor extends AbsRunableTask{

	@Override
	public void execute() {
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		List<Map> allDefindCust = findFtpCusts();
		
		if(allDefindCust!=null && !allDefindCust.isEmpty()){
			JSONObject msg = JsonHelper.createReqJson();
			JsonHelper.getTrxObject(msg).putAll(trxDataPara.getProterties());
			for (Map cust : allDefindCust) {
				JsonHelper.getTrxObject(msg).putAll(cust);
				
				processCustInterface(msg);
			}
		}
	}

	private void processCustInterface(JSONObject cust) {
		SingleProcess process = new SingleProcess();
		process.setCustInfo(cust);
		process.start();
		
	}

	private List<Map> findFtpCusts() {
		List<Map> retList = new ArrayList<Map>();
		String sql = "select cust_Id,intf_Id,proc_Address,proc_User_Id,proc_Password,proc_Port,"
				+ "formator,mapping,remote_Path,File_name from trx.DTC_CUST_INTF f,trx.dtc_proc_define_m m "
				+ "where  f.proc_id = m.sys_REF_NO AND m.proc_tp = ? and is_Config = ? AND PROC_STS = ?";
		List<Object> parms = new ArrayList<Object>();
		parms.add("0");
		parms.add("0");
		parms.add("0");

		List<Object[]> queryResult = DBUtil.queryData(sql, parms);
		for (Object[] objects : queryResult) {
			Map<String, Object> record = new HashMap<String, Object>();
			record.put("cust_Id", objects[0]);
			record.put("intf_Id", objects[1]);
			record.put("proc_Address", objects[2]);
			record.put("proc_UserId", objects[3]);
			record.put("proc_Password", objects[4]);
			record.put("proc_Port", objects[5]);
			record.put("formator", objects[6]);
			record.put("mapping", objects[7]);
			record.put("remote_Path", objects[8]);
			record.put("File_name", objects[9]);

			retList.add(record);
		}
		
		return retList;
	}
}

class SingleProcess extends Thread {
	private JSONObject custInfo;
	
	public void run() {
		try {
			String localFile = runService(custInfo);

			File local = new File(localFile);
			
			JSONObject jsonObject = JsonHelper.getTrxObject(custInfo);
			String backupPath = jsonObject.containsKey("localBk")?jsonObject.getString("localBk"):"";
			
			if (local.isDirectory() && local.canRead()) {
				IMainComponent mainProcessor = ClassLoadHelper.getComponentClass("dtcProcessManager");
				JSONObject trxJson = JsonHelper.getTrxObject(custInfo);
				File[] files = local.listFiles();
				for (File file : files) {
					try {
						if (file.canWrite() && FileUtil.lockFile(file)) {
							System.out.println("...可读");
							trxJson.put("content", file.getPath());
							trxJson.put("channel", "ftp");
							mainProcessor.submitData(custInfo);
							System.out.println("执行成功。。。");
							String backup = formatPath(backupPath, jsonObject)
									+ File.separator;
							File bkFile = new File(backup);
							if (!bkFile.exists()) {
								bkFile.mkdirs();
							}
							FileUtil.unlockFile(file);
							FileUtil.upload(file.getName(), backup, file);
							file.delete();
						} else {
							System.out.println("不可读");
							continue;
						}

					} catch (Exception e) {
						System.out.println("执行失败。。。");
						LogUtil.error(e.toString());
						String backup = formatPath(backupPath, jsonObject)
								+ File.separator;
						File bkFile = new File(backup);
						if (!bkFile.exists()) {
							bkFile.mkdirs();
						}
						FileUtil.unlockFile(file);
						FileUtil.upload(file.getName(), backup, file);
						file.delete();
					}finally{
						
					}
				}
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void setCustInfo(JSONObject custInfo) {
		this.custInfo =JsonUtil.clone(custInfo);
	}
	
	public String runService(JSONObject request) throws Exception {
		JSONObject jsonObject = JsonHelper.getTrxObject(request);
		String custId =  jsonObject.containsKey("cust_Id")?jsonObject.get("cust_Id").toString():"";
		jsonObject.put("custId", custId);
		FtpUtil ftpUtil = new FtpUtil();
		try {
			String localPath = jsonObject.containsKey("localPath")?jsonObject.getString("localPath"):"";
			String validate = jsonObject.containsKey("validate")?jsonObject.getString("validate"):"";
			String backupPath = jsonObject.containsKey("backupPath")?jsonObject.getString("backupPath"):"";
			String deleteOnSuccess = jsonObject.containsKey("deleteOnSuccess")?jsonObject.getString("deleteOnSuccess"):"";
			
			String ip = jsonObject.containsKey("proc_Address")?jsonObject.getString("proc_Address"):"";
			int port = jsonObject.containsKey("proc_Port")?jsonObject.getInt("proc_Port"):23;
			String ftpUser= jsonObject.containsKey("proc_UserId")?jsonObject.getString("proc_UserId"):"";
			String ftpPwd = jsonObject.containsKey("proc_Password")?jsonObject.getString("proc_Password"):"";
			String charset = jsonObject.containsKey("charset")?jsonObject.getString("charset"):"utf-8";
			String remotePath = jsonObject.containsKey("remote_Path")?jsonObject.getString("remote_Path"):"";//每个企业的路径在申请接口时定义
			String fileName = jsonObject.containsKey("File_name")?jsonObject.getString("File_name"):"";//指定下载文件名
			
			localPath = formatPath(localPath,jsonObject);
			remotePath = formatPath(remotePath,jsonObject);
			backupPath = formatPath(backupPath,jsonObject);
			
			localPath = localPath+File.separator+custId+remotePath;//每个客户下载到本地对应的目录下
			
			ftpUtil.connect(ip, port, ftpUser, ftpPwd, false, charset);
			ftpUtil.setBackupPath(backupPath);
			
			ftpUtil.retrieve(remotePath,localPath,validate,"true".equalsIgnoreCase(deleteOnSuccess));
			return localPath;
		} catch (Exception e) {
			throw e;
		} finally {
			ftpUtil.disconnect();
		}
	}
	
	public String formatPath(String input,JSONObject json){
		if(StringUtil.isEmpty(input))
			return "";
		if(input.contains("$")){
			String replaseField = input.substring(input.indexOf("$")+1,input.lastIndexOf("$"));
			if("sysdate".equalsIgnoreCase(replaseField)){
				Date buDate = BuDateTimeUtil.getCurrentBuDate();
				String strSysdate = DateTimeUtil.parseDate(buDate, "yyyyMMdd");
				input = input.replace("$sysdate$", strSysdate);
				return input;
			}else if(json.containsKey(replaseField)){
				String strSysdate = json.getString(replaseField);
				input = input.replace("$"+replaseField+"$", strSysdate);
				return input;
			}else{
				return input;
			}
		}else{
			return input;
		}
	}
}
