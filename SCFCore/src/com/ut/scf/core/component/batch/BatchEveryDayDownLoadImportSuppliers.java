package com.ut.scf.core.component.batch;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
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
import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.ref.RefPara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.main.impl.beans.ASETrxAjaxManagerBean;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;


/**
 * 每天从下载供应商信息并导入
 * @author develop
 *
 */
@Component("batchEveryDayDownLoadImportSuppliers")
@Scope("prototype")


public class BatchEveryDayDownLoadImportSuppliers extends AbsRunableTask {

	protected ASETrxAjaxManagerBean ajaxManager;
	
	IServiceFactory serviceFactory;
	
	protected IServerSideJs serverJsEngine;
	
	protected ApSessionContext context;// 当前交易基本信息
	
	@Resource(name = "documentFactory")
	DocumentFactoryImpl documentFactory ;
	@Resource(name = "refNoManager")
	IReferenceNo refNoManager;
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

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
		String localFilePath = getReportFileFatherPath();//获取文件路径
		String localFileBackPath =  getReportFileFatherBackPath(); //文件备份路径
		String otherFilePath = (String) trxDataPara.getProterties().get("OTHERFILEPATH");//获取文件对方文件夹名
		String otherPath = (String) trxDataPara.getProterties().get("OTHERPATH")+File.separator+otherFilePath+File.separator;//获取文件对方文件夹路径
		final String fileExtensions = (String) trxDataPara.getProterties().get("fileExtensions");//获取过滤文件后缀名
		final String fileName = (String) trxDataPara.getProterties().get("FILENAME");//获取文件名
		final List<String> fileNmaeList = new ArrayList<String>();
		String[] fileExtensionList = fileExtensions.split(",");
		for (String fileExt : fileExtensionList) {
			String fileNameAll=fileName+fileExt;
			fileNmaeList.add(fileNameAll);
		}
		
		runFTPServicesDownLoadProcess(taskPara,fileNmaeList,localFilePath,otherPath);//跑一下FTP下载文件
		
		File[] files = new File(localFilePath).listFiles();
		if(files==null || files.length==0){
			APLogUtil.getUserLogger().info("当前目录"+localFilePath+"下没有文件。");
			return;
		}
		List<File> fileList = Arrays.asList(files);
		
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
			APLogUtil.getUserLogger().info("当前目录"+localFilePath+"下没有应收账款文件。");
			return;
		}
		
		//开始写表
		saveProcess(trxDataPara,resultList);
		
//		//移动文件(改名)
//		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");		
//		String timeTrail = sf.format(new Date());
////		int len=fileNmaeList.size();
//		for(String list:fileNmaeList){
//			String oldFile=filePath+list;
//			String newFile=filePath+timeTrail+fileName;
//			backFile(oldFile,newFile);
//		}
	}
	
	private void saveProcess(TrxDataPara trxDataPara, List<File> resultList) {
		
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
			    importSupplierFromFile(logicObj);
			 
				
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
	private void importSupplierFromFile(FuncDataObj logicObj) throws Exception {		
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
			if( isHave<0 ){
				custMSysRefNoList.add((String) map.get("sysRefNo"));
				dataObj.mergeResponse(editCustM(logicObj.getReqData(), map)); //统一事务
			}
			dataObj.mergeResponse(editCntrctM(logicObj.getReqData(), map)); //统一事务
			dataObj.mergeResponse(editStdAcNo(logicObj.getReqData(), map)); //统一事务
		}
//		JsonHelper.setTrxObject(reqData, trxData);
		daoHelper.execUpdate(dataObj);
		APLogUtil.getUserLogger().info("==================BatchInvcExecutor  end==========================");		
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
		trxData.put("bankId", map.get("bankId"));
		trxData.put("synGapiSts", "2");
		mainLogic.setFields("bankId,synGapiSts");
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxEditRecord");
		dataObj = t.postData(dataObj);
		return dataObj;
		
	}
	private FuncDataObj editCntrctM(JSONObject trxDom, Map map)throws Exception {
		
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("TRX.CNTRCT_M");
		mainLogic.setType("C");	
		mainLogic.setCascadeevent("Y");
		dataObj.setReqParaObj(mainLogic);
//		trxData.putAll(map);
		trxData.put("sysRefNo", map.get("cntrctNo"));
		trxData.put("poolLoanId", map.get("poolLoanId"));
//		trxData.put("sysOpTm", DateTimeUtil.getTimestamp());
		mainLogic.setFields("poolLoanId");
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxEditRecord");
		dataObj = t.postData(dataObj);
		return dataObj;
		
	}
	private FuncDataObj editStdAcNo(JSONObject trxDom, Map map) throws Exception{
		
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("STD.STD_AC_NO");
		mainLogic.setType("C");	
		mainLogic.setCascadeevent("N");
		dataObj.setReqParaObj(mainLogic);
		String sysRefNo=getStdAcNoSysRefNo(trxDom);
		trxData.put("sysRefNo", sysRefNo);
		trxData.put("sysOpTm", DateTimeUtil.getTimestamp());
		trxData.put("acNo", map.get("acNo"));
		trxData.put("acNm", map.get("custNm"));
		trxData.put("acBkNm", "中国银行上海分行");
		trxData.put("acOwnerid", map.get("sysRefNo"));
		trxData.put("acTp", "2");
		trxData.put("buyerId", map.get("buyerId"));
		trxData.put("cntrctNo", map.get("cntrctNo"));
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxAddRecord");
		dataObj = t.postData(dataObj);
		return dataObj;
		
	}
	private String getStdAcNoSysRefNo(JSONObject trxDom) throws Exception {
		List refList = new ArrayList();

		// 协议表中的 sys_ref_no为invc_m表的CNTRCT_NO
		RefPara refPara = new RefPara();
		refPara.setRefname("AcNo");
		refPara.setReffield("sysRefNo");

		FuncDataObj funObj = new FuncDataObj();
		funObj.setReqParaObj(refPara);
		funObj.setReqData(trxDom);
		FuncDataObj retData = null;
		try {
			retData = (FuncDataObj) refNoManager.generateNo(funObj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List listRef = (List) retData.getData().get(retData.getDoName());
		String sysRefNo = (String) ((Map) listRef.get(0)).get("sysRefNo");
		return sysRefNo;
	}
//	private Map<String, String> queryStdAcNoSysRefNo(JSONObject trxDate) {
//		FuncDataObj dataObj = new FuncDataObj();
//		JSONObject trxData = JsonHelper.getTrxObject(trxDate);
//		QueryNode node = new QueryNode();
//		dataObj.setReqData(trxData);
//		String invNo= dataObj.get("invNo").toString(); 
//		String sql = "";
//		sql = "select invc  from  TRX.InvcM  invc  where invc.invNo = ?";
//		node.setParams( invNo+":typejava.lang.String");
//		node.setSql(sql);
//		node.setType(LogicNode.LOGIC_TYPE_SQL);
//
//		IQueryComponent process = queryFactory.getProcessor(node);
//		dataObj.setReqParaObj(node);
//		FuncDataObj processResult = process.queryData(dataObj);
//
//		daoHelper.execQuery(processResult);
//		Map<String,String> invcMap=new HashMap<>();
//		if (processResult.hasRecord()) {
//			String sysRefNo=processResult.getString("sysRefNo");
//			String invSts=processResult.getString("invSts");
//			invcMap.put("sysRefNo", sysRefNo);
//			invcMap.put("invSts", invSts);
//			return  invcMap;
//		} else {
//			invcMap.put("sysRefNo", "");
//			invcMap.put("invSts", "");
//			return invcMap;
//		}
//	}
	
	private void runFTPServicesDownLoadProcess(TaskPara taskPara,List<String> fileNmaeList,String localFilePath,String otherPath){
//		FILENAME:"1efc6a26829745ac8837c764c74c1451.xls",
//		REMOTEPATH:"图片",
//		TYPE:"UPLOAD",
//		LOCALPATH:"E:\\logs\\20151203"
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		trxData.put("runServiceType", "FTP");
		trxData.put("TYPE", (trxDataPara.getProterties().get("TYPE")).toString());
		trxData.put("REMOTEPATH", (trxDataPara.getProterties().get("OTHERFILEPATH")).toString());
		trxData.put("LOCALPATH",localFilePath);
		try {
			for(String list:fileNmaeList){
				trxData.put("FILENAME", list);
				trxData = (JSONObject) runTaskJsEnginee(taskPara,trxData);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	private List checkData(FuncDataObj logicObj, List list) throws Exception {		
		List reqList = new ArrayList<Object>();
		try {
			//JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map) list.get(i);
				if(    ( map.get("sysRefNo")!=null && StringUtils.isNotEmpty(map.get("sysRefNo").toString().trim()) ) &&
						( map.get("licenceNo")!=null && StringUtils.isNotEmpty(map.get("licenceNo").toString().trim()) ) &&
						( map.get("cntrctNo")!=null && StringUtils.isNotEmpty(map.get("cntrctNo").toString().trim())  ) &&
						( map.get("buyerId")!=null && StringUtils.isNotEmpty(map.get("buyerId").toString().trim()) ) &&
						( map.get("bankId")!=null && StringUtils.isNotEmpty(map.get("bankId").toString().trim()) ) &&
						( map.get("poolLoanId")!=null && StringUtils.isNotEmpty(map.get("poolLoanId").toString().trim()) ) &&
						( map.get("acNo")!=null && StringUtils.isNotEmpty(map.get("acNo").toString().trim()) ) ){
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
	/**
	 * 备份文件
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
		String root = ASPathConst.getUserOutputPath()+File.separator+"DownLoad"+File.separator+"Suppilers"+File.separator;
		String date = DateTimeUtil.getSysDateTime("yyyyMMdd");
		File dir = new File(root+date);
		if(!dir.exists())
			dir.mkdir();
		return root+date+File.separator;
	}
	public String getReportFileFatherBackPath(){
		String root = ASPathConst.getUserOutputPath()+File.separator+"Back"+File.separator+"DownLoad"+File.separator+"Suppilers"+File.separator;
		String date = DateTimeUtil.getSysDateTime("yyyyMMdd");
		File dir = new File(root+date);
		if(!dir.exists())
			dir.mkdir();
		return root+date+File.separator;
	}

}
