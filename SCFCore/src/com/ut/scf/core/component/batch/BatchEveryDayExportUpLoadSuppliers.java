package com.ut.scf.core.component.batch;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.gapi.MessageSendRequest;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.services.advice.impl.AdviceConstants;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;


/**
 * 每天导出供应商信息并上传
 * @author develop
 *
 */
@Component("batchEveryDayExportUpLoadSuppliers")
@Scope("prototype")
public class BatchEveryDayExportUpLoadSuppliers extends AbsRunableTask {

	IQueryFactory queryFactory;
	
	protected ASETrxAjaxManagerBean ajaxManager;
	
	IReferenceNo refNoManager;
	
	IServiceFactory serviceFactory;
	
	protected IServerSideJs serverJsEngine;
	
	protected ApSessionContext context;// 当前交易基本信息

	@Resource(name = "documentFactory")
	DocumentFactoryImpl documentFactory ;

	@Override
	public void execute() {
		this.context = ApSessionUtil.getContext();
		
		try {
			process();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			ApSessionUtil.close();
		}
	}
	private void process() throws Exception {
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
//		String filePath = getReportFileFatherPath()+"UpLoad"+File.separator;//获取文件路径
		String localFilePath = getReportFileFatherPath();//获取文件路径
		String localFileBackPath =  getReportFileFatherBackPath(); //文件备份路径
		final String fileExtensions = (String) trxDataPara.getProterties().get("fileExtensions");//获取过滤文件后缀名
		final String fileName = (String) trxDataPara.getProterties().get("FILENAME");//获取文件名
		
		runReportServicesProcess(taskPara);//跑一下report生成落地文件
		
		File[] files = new File(localFilePath).listFiles();
		if(files==null || files.length==0){
			APLogUtil.getUserLogger().info("当前目录"+localFilePath+"下没有文件。");
			return;
		}
		List<File> fileList = Arrays.asList(files);
		final List<String> fileNmaeList = new ArrayList<String>();
		
		//过滤文件
		@SuppressWarnings("unchecked")
		List<File> resultList = (List<File>) CollectionUtils.select(fileList,
				new Predicate(){
					public boolean evaluate(Object o) {
						File f =(File) o;
						String[] fileExtension = fileExtensions.split(",");
						for (String fileExt : fileExtension) {
							if(f.getName().endsWith(fileExt)){
								fileNmaeList.add((f.getName()).toString());
								return true;
							}
						}
						return false;
					}			
		});		
		if(resultList.size() == 0){
			APLogUtil.getUserLogger().info("当前目录"+localFilePath+"下没有供应商信息件。");
			return;
		}
		
//		//移动文件(改名)
//		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");		
//		String timeTrail = sf.format(new Date());
////		int len=fileNmaeList.size();
//		for(String list:fileNmaeList){
//			String oldFile=localFilePath+list;
//			String newFile=localFilePath+timeTrail+fileName;
//			backFile(oldFile,newFile);
//		}
		
		runFTPServicesUpLoadProcess(taskPara,fileNmaeList,localFilePath);//跑一下FTP上传文件
		
		editProcess(trxDataPara,resultList );
		
	}
	private void runReportServicesProcess(TaskPara taskPara){
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		trxData.put("id", taskPara.getTrxdatapara().getProterties().get("reportId"));
		reqData.put("fileName", taskPara.getTrxdatapara().getProterties().get("FILENAME"));
		reqData.put("runServiceType", "Report");
		try {
			reqData = (JSONObject) runTaskJsEnginee(taskPara,reqData);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void runFTPServicesUpLoadProcess(TaskPara taskPara,List<String> fileNmaeList,String filePath){
//		FILENAME:"1efc6a26829745ac8837c764c74c1451.xls",
//		REMOTEPATH:"图片",
//		TYPE:"UPLOAD",
//		LOCALPATH:"E:\\logs\\20151203"
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		trxData.put("runServiceType", "FTP");
		trxData.put("REMOTEPATH", (trxDataPara.getProterties().get("OTHERFILEPATH")).toString());
		trxData.put("TYPE", (trxDataPara.getProterties().get("TYPE")).toString());
		trxData.put("LOCALPATH",filePath);
		try {
			for(String list:fileNmaeList){
				trxData.put("FILENAME", list);
				trxData = (JSONObject) runTaskJsEnginee(taskPara,trxData);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	private void editProcess(TrxDataPara trxDataPara, List<File> resultList) {
		
		for(File file:resultList){
			try {
				JSONObject reqData = JsonHelper.createReqJson();
				JSONObject trxData = JsonHelper.getTrxObject(reqData);
				trxData.put("filePath", file.getAbsolutePath());
				int pos=file.getName().lastIndexOf(".");
			    trxData.put("fileExtensions",file.getName().substring(pos));
			    JsonHelper.setTrxObject(reqData, trxData);	    
				FuncDataObj logicObj = new FuncDataObj();
			    logicObj.setReqData(reqData);	    
			    
			    String templateId =  (String) trxDataPara.getProterties().get("templateId");//配置文件id
				TemplatePara  templatePara = XMLParaParseHelper.parseFuncTemplatePara(
						templateId,context.getSysBusiUnit());//配置文件信息	    
			    logicObj.setReqParaObj(templatePara);
			    
			    //处理文件
			    exportFromFile(logicObj);
			 
				
			} catch (Exception e) {
				e.printStackTrace();
				APLogUtil.getUserLogger().error("batchEveryDayDownLoadImportSuppliers: 批处理供应商信息逻辑流出错。");
				APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
			
//			editCustM();
//			editCntrctM();
//			editStdAcNo();
			
		}
		
	}
	private void exportFromFile(FuncDataObj logicObj) throws Exception {		
		 //解析上传文件内容,数据写入logicObj中的data中。	   
		TemplatePara  templatePara = (TemplatePara) logicObj.getReqParaObj();    	
		documentFactory.getProcessor(templatePara).importDoc(logicObj);			
	    reformat(logicObj);	    	
	}
	public void reformat(FuncDataObj logicObj) throws Exception {		
		APLogUtil
				.getUserLogger()
				.info("==================BatchImportSuppliers  start==========================");
		List list = (List) logicObj.getData().get(logicObj.getDoName());
		JSONObject reqData = logicObj.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);	
		// 校验数据
		list = checkData(logicObj, list);

		List<String> custMSysRefNoList=new ArrayList<String>();
		FuncDataObj dataObj = new FuncDataObj();
		for (int i = 0; i < list.size(); i++) {
			Map map = (Map) list.get(i);
			int isHave=custMSysRefNoList.indexOf(map.get("sysRefNo"));
			if( isHave<0	 ){
				custMSysRefNoList.add((String) map.get("sysRefNo"));
				dataObj.mergeResponse(editCustM(logicObj.getReqData(), map)); //统一事务
			}
		}
		daoHelper.execUpdate(dataObj);
		APLogUtil.getUserLogger().info("==================BatchInvcExecutor  end==========================");		
	}
	private List checkData(FuncDataObj logicObj, List list) throws Exception {		
		List reqList = new ArrayList<Object>();
		try {
			//JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map) list.get(i);
				if(    ( map.get("sysRefNo")!=null && StringUtils.isNotEmpty(map.get("sysRefNo").toString().trim()) ) &&
						( map.get("licenceNo")!=null && StringUtils.isNotEmpty(map.get("licenceNo").toString().trim()) ) 
					){
					reqList.add(map);
				}
			}
			return reqList;
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserLogger().error(e.getMessage());			
		} 
		return list;
	}
	private FuncDataObj editCustM(JSONObject trxDom, Map map)throws Exception {
		
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("TRX.CUST_M");
		mainLogic.setType("C");	
		mainLogic.setCascadeevent("Y");
		dataObj.setReqParaObj(mainLogic);
//		trxData.putAll(map);
//		trxData.put("sysOpTm", DateTimeUtil.getTimestamp());
		trxData.put("sysRefNo", map.get("sysRefNo"));
		trxData.put("synGapiSts","1");
		mainLogic.setFields("synGapiSts");
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxEditRecord");
		dataObj = t.postData(dataObj);
		return dataObj;
		
	}
	/**
	 * 移动文件-可改名
	 * @param oldPath  旧文件完整路径
	 * @param newPath  新文件完整路径
	 */
	private void backFile(String oldPath,String newPath) throws Exception{
		APLogUtil.getUserLogger().info("-----开始备份文件--"+oldPath);
		File old = new File(oldPath);
		File newFile = new File(newPath);
		boolean s = old.renameTo(newFile);
		if(s){
			APLogUtil.getUserLogger().info("备份成功："+s+":"+newPath);
		}else{
			APLogUtil.getUserLogger().info("备份失败："+s+":"+newPath);
		}
	}
	public String getReportFileFatherPath(){
//		String root = ASPathConst.getUserOutputPath()+File.separator+"ExportSuppliers"+File.separator;
		String root = ASPathConst.getUserOutputPath()+File.separator;
		String date = DateTimeUtil.getSysDateTime("yyyyMMdd");
		File dir = new File(root+date);
		if(!dir.exists())
			dir.mkdir();
//		String name = UUIdGenerator.getUUId();
//		return root+date+File.separator+name+"."+fileType;
		return root+date+File.separator;
	}
	public String getReportFileFatherBackPath(){
		String root = ASPathConst.getUserOutputPath()+File.separator+"Back"+File.separator+"UpLoad"+File.separator;
		String date = DateTimeUtil.getSysDateTime("yyyyMMdd");
		File dir = new File(root+date);
		if(!dir.exists())
			dir.mkdir();
		return root+date+File.separator;
	}
}
