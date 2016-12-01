package com.ut.scf.core.services.report;

import java.io.BufferedReader;
import java.io.File;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.comm.pojo.report.BirtReportParameter;
import com.comm.pojo.report.IReportParameter;
import com.comm.pojo.report.IReportResponse;
import com.ut.comm.tool.CompressUtil;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.FileUtil;
import com.ut.comm.tool.SerializeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.file.FileReaderUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.report.ReportPara;
import com.ut.comm.xml.sys.SysPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.core.services.report.impl.IReportService;
import com.ut.scf.orm.trx.EsbServiceDetail;

@Service("reportServiceImpl")
@Lazy
public class ReportServiceImpl extends AbsESBServiceImpl{
	
	@Resource(name = "reportJs")
	protected IServerSideJs reportEngine;
	
	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:"+getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		super.getLogger().debug("destroy service success.");
	}

	@Override
	public String getServiceId() {
		return "Report";
	}
	

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		logicObj.buildRespose(queryServiceFromDb());
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		ReportPara reportPara = getReportDefine(super.trxObj);
		
		IReportParameter engine = new BirtReportParameter();
		JSONObject serviceData = processServiceJs(reportPara,reqObj);
		if(!checkServiceEnable(serviceData)){
			return ;
		}
		
		String dataSource=reportPara.getDatasource();
		String datasourceType=reportPara.getDatasourcetype();
		if("xml".equalsIgnoreCase(datasourceType)){
			String xmllSource = JsonUtil.convertToXmlStr(JsonUtil.getJSONString(serviceData));
			engine.setDataSource(xmllSource);
			engine.setDataSourceType(datasourceType);
			engine.setReportFilePath(getReportFileName(reportPara.getReporttype()));
			engine.setOperateType(IReportService.REQ_TYPE_SHOW);
			engine.setDesignFilePath(reportPara.getTemplate());
			engine.setReportType(reportPara.getReporttype());
			engine.setBu(reportPara.getBu());
		}else if("db".equalsIgnoreCase(datasourceType)){
//			engine.setDataSource(xmllSource);
			engine.setDataSource(dataSource);
			engine.setDataSourceType(datasourceType);
			engine.setReportFilePath(getReportFileName(reportPara.getReporttype()));
			engine.setOperateType(IReportService.REQ_TYPE_SHOW);
			engine.setDesignFilePath(reportPara.getTemplate());
			engine.setReportType(reportPara.getReporttype());
			engine.setBu(reportPara.getBu());
			engine.setTrxData( serviceData.toString());
			//需要判断一下如果是db数据源的时候就往里塞值
//			engine.setTrxData(xmllSource);
		}
		
		SysPara sysPara = XMLParaParseHelper.parseSysPara(currentBu);
		
		IReportResponse msgContext = sendUrlRequest(sysPara.getReportengine(),engine);
		if(msgContext.isSuccess()){
			String fileContext = msgContext.getFileContent();
			logicObj.buildRespose(fileContext);
		}else{
			logicObj.buildRespose(msgContext.getMessage());
			logicObj.setRetStatus(FuncDataObj.FAILED);
		}
	}
	
	public void saveServiceData(FuncDataObj logicObj) throws Exception {
		ReportPara reportPara = getReportDefine(super.trxObj);
		
		IReportParameter engine = new BirtReportParameter();
		JSONObject serviceData = processServiceJs(reportPara,reqObj);
		if(!checkServiceEnable(serviceData)){
			return ;
		}
		
		String dataSource=reportPara.getDatasource();
		String datasourceType=reportPara.getDatasourcetype();
		String fileName=serviceData.getString("ReportFileName")==null?"":serviceData.getString("ReportFileName");
		if("xml".equalsIgnoreCase(datasourceType)){
			String xmllSource = JsonUtil.convertToXmlStr(JsonUtil.getJSONString(serviceData));
			engine.setDataSource(xmllSource);
			engine.setDataSourceType(datasourceType);
			engine.setReportFilePath(getSaveReportFileName(reportPara.getReporttype(),fileName));
			engine.setOperateType(IReportService.REQ_TYPE_SAVE);
			engine.setDesignFilePath(reportPara.getTemplate());
			engine.setReportType(reportPara.getReporttype());
			engine.setBu(reportPara.getBu());
		}else if("db".equalsIgnoreCase(datasourceType)){
			engine.setDataSource(dataSource);
			engine.setDataSourceType(datasourceType);
			engine.setReportFilePath(getSaveReportFileName(reportPara.getReporttype(),fileName));
			engine.setOperateType(IReportService.REQ_TYPE_SAVE);
			engine.setDesignFilePath(reportPara.getTemplate());
			engine.setReportType(reportPara.getReporttype());
			engine.setBu(reportPara.getBu());
			//需要判断一下如果是db数据源的时候就往里塞值
			engine.setTrxData( serviceData.toString());
		}
		
		SysPara sysPara = XMLParaParseHelper.parseSysPara(currentBu);
		
		IReportResponse msgContext = sendUrlRequest(sysPara.getReportengine(),engine);
		if(msgContext.isSuccess()){
			String fileContext = msgContext.getFileContent();
			logicObj.buildRespose(fileContext);
		}else{
			logicObj.buildRespose(msgContext.getMessage());
			logicObj.setRetStatus(FuncDataObj.FAILED);
		}
	}
	
	public void saveAndShowServiceData(FuncDataObj logicObj) throws Exception {
		ReportPara reportPara = getReportDefine(super.trxObj);
		
		IReportParameter engine = new BirtReportParameter();
		JSONObject serviceData = processServiceJs(reportPara,reqObj);
		if(!checkServiceEnable(serviceData)){
			return ;
		}
		
		String dataSource=reportPara.getDatasource();
		String datasourceType=reportPara.getDatasourcetype();
		String fileName=serviceData.getString("ReportFileName")==null?"":serviceData.getString("ReportFileName");
		if("xml".equalsIgnoreCase(datasourceType)){
			String xmllSource = JsonUtil.convertToXmlStr(JsonUtil.getJSONString(serviceData));
			engine.setDataSource(xmllSource);
			engine.setDataSourceType(datasourceType);
			engine.setReportFilePath(getSaveReportFileName(reportPara.getReporttype(),fileName));
			engine.setOperateType(IReportService.REQ_TYPE_SAVE_SHOW);
			engine.setDesignFilePath(reportPara.getTemplate());
			engine.setReportType(reportPara.getReporttype());
			engine.setBu(reportPara.getBu());
		}else if("db".equalsIgnoreCase(datasourceType)){
			engine.setDataSource(dataSource);
			engine.setDataSourceType(datasourceType);
			engine.setReportFilePath(getSaveReportFileName(reportPara.getReporttype(),fileName));
			engine.setOperateType(IReportService.REQ_TYPE_SAVE_SHOW);
			engine.setDesignFilePath(reportPara.getTemplate());
			engine.setReportType(reportPara.getReporttype());
			engine.setBu(reportPara.getBu());
			//需要判断一下如果是db数据源的时候就往里塞值
			engine.setTrxData( serviceData.toString());
		}
		
		SysPara sysPara = XMLParaParseHelper.parseSysPara(currentBu);
		
		IReportResponse msgContext = sendUrlRequest(sysPara.getReportengine(),engine);
		if(msgContext.isSuccess()){
			String fileContext = msgContext.getFileContent();
			logicObj.buildRespose(fileContext);
		}else{
			logicObj.buildRespose(msgContext.getMessage());
			logicObj.setRetStatus(FuncDataObj.FAILED);
		}
	}
	
	public String getReportFileName(String fileType){
		String root = ASPathConst.getUserOutputPath()+File.separator;
		String date = DateTimeUtil.getSysDateTime("yyyyMMdd");
		File dir = new File(root+date);
		if(!dir.exists())
			dir.mkdir();
		String name = UUIdGenerator.getUUId();
		return root+date+File.separator+name+"."+fileType;
	}
	
	public String getSaveReportFileName(String fileType,String fileName){
		String root = ASPathConst.getUserOutputPath()+File.separator;
		String date = DateTimeUtil.getSysDateTime("yyyyMMdd");
		File dir = new File(root+date);
		if(!dir.exists())
			dir.mkdir();
		fileName=fileName==""?UUIdGenerator.getUUId():fileName;
		return root+date+File.separator+fileName+"."+fileType;
	}

	private ReportPara getReportDefine(JSONObject jsonObject) {
		ReportPara para = new ReportPara();
		para.setId(jsonObject.getString("id"));
		return XMLParaParseHelper.parseReport(para,currentBu);
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		
		logicObj.buildRespose(getReportList());
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		
		List<String> reportRules = super.getRules();

		SysPara sysPara = XMLParaParseHelper.parseSysPara(currentBu);
		
		IReportParameter engine = new BirtReportParameter();

		int msgIndex = 0;
		for (String rule : reportRules) {
			try {
				ReportPara reportPara = XMLParaParseHelper.parseReport(rule,currentBu);
				
				JSONObject serviceData = processServiceJs(reportPara,reqObj);
				if(!checkServiceEnable(serviceData)){
					continue;
				}
				
				String xmllSource = JsonUtil.convertToXmlStr(JsonUtil.getJSONString(serviceData));
				
				engine.setDataSource(xmllSource);

				String reportFilePath = getReportFileName(reportPara.getReporttype());
				engine.setDataSourceType(reportPara.getDatasourcetype());
				engine.setReportFilePath(reportFilePath);
				engine.setOperateType(IReportService.REQ_TYPE_SAVE_SHOW);
				engine.setDesignFilePath(reportPara.getTemplate());
				engine.setReportType(reportPara.getReporttype());

				IReportResponse msgContext = sendUrlRequest(sysPara.getReportengine(),engine);

				if(msgContext.isSuccess()){
					EsbServiceDetail msgDetail = super.generateMsgStore(reportFilePath, msgIndex++,"");
					if ("p".equalsIgnoreCase(reportPara.getType())) {
						super.callGapiProcess(msgContext.getFileContent());
						msgDetail.setSendStatus("M");
						msgDetail.setSysTrxSts("P");
					} else {
						//不发送
					}
					storeServiceDetailIntoDb(msgDetail,dataObj);
				}else{
					throw new Exception("Process report service get error:"+msgContext.getMessage());
				}
			} catch (Exception e) {
				//删除已生成的文件
				//deleteTempReport()
				getLogger().error(e.toString());
				throw e;
			}
		}
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		
		List<String> reportRules = super.getRules();

		SysPara sysPara = XMLParaParseHelper.parseSysPara(currentBu);
		
		IReportParameter engine = new BirtReportParameter();
		
		int msgIndex = 0;
		for (String rule : reportRules) {
			try {
				ReportPara reportPara = XMLParaParseHelper.parseReport(rule,currentBu);
				
				JSONObject serviceData = processServiceJs(reportPara,reqObj);
				if(!checkServiceEnable(serviceData)){
					continue;
				}
				
				String xmllSource = JsonUtil.convertToXmlStr(JsonUtil.getJSONString(serviceData));
				
				engine.setDataSource(xmllSource);
				
				String reportFilePath = getReportFileName(reportPara.getReporttype());
				engine.setDataSourceType(reportPara.getDatasourcetype());
				engine.setReportFilePath(reportFilePath);
				engine.setOperateType(IReportService.REQ_TYPE_SAVE_SHOW);
				engine.setDesignFilePath(reportPara.getTemplate());
				engine.setReportType(reportPara.getReporttype());

				IReportResponse msgContext = sendUrlRequest(sysPara.getReportengine(),engine);

				if(msgContext.isSuccess()){
					EsbServiceDetail msgDetail = super.generateMsgStore(reportFilePath, msgIndex++,"");
					super.callGapiProcess(msgContext.getFileContent());
					msgDetail.setSendStatus("M");
					storeServiceDetailIntoDb(msgDetail,dataObj);
				}else{
					throw new Exception("Process report service get error:"+msgContext.getMessage());
				}
			} catch (Exception e) {
				getLogger().error(e.toString());
			}
		}
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		
		List<String> reportRules = super.getRules();
		
		List<Object> msgs = queryServiceFromDb();
		
//		if(reportRules.size()!=msgs.size()){
//			throw new Exception("SCB message doesn't match parameter, please check parameter...");
//		}
		int msgIndex = 0;
		for (int i = 0; i < reportRules.size(); i++) {
			String ruleId = reportRules.get(i);
			ReportPara reportPara = XMLParaParseHelper.parseReport(ruleId,currentBu);
			if("M".equalsIgnoreCase(reportPara.getType())){
				Map record = (Map) msgs.get(i);
				String reportPath = record.get("msgText").toString();
				if(FileUtil.isFileExist(reportPath,"")){
					super.callGapiProcess(FileUtil.getBytesFromFile(reportPath));
					String msgId = record.get("sysRefNo").toString();
					dataObj.mergeResponse(super.updateServiceMsgStatus(msgId));
				}else{
					throw new Exception("Missing Report ESB service msg :"+reportPath);
				}
			}else{
					try {
						for( int n=0;n<msgs.size();n++){
							Map msgDetail=(Map) msgs.get(n);
							String sysRefNo=(String) msgDetail.get("sysRefNo");
							dataObj.mergeResponse(super.updateServiceMsgStatus(sysRefNo));
						}
					} catch (Exception e) {
						//删除已生成的文件
						//deleteTempReport()
						getLogger().error(e.toString());
						throw e;
					}
			}
		}
	}
	
	@Override
	public String getServiceJsFile(AbsObject para) {
		ReportPara reportPara = (ReportPara) para;
		return reportPara.getJs();
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		
	}
	
	public Object getReportList(){
		List<String> reportRules = super.getRules();
		List<ReportPara> listReport = new ArrayList<ReportPara>();
		for (String rule : reportRules) {
			ReportPara para = XMLParaParseHelper.parseReport(rule,currentBu);
			listReport.add(para);
		}
		return listReport;
	}
	
	public IReportResponse sendUrlRequest(String url, Object param) {
		BufferedReader in = null;
		try {
			URL realUrl = new URL(url);
			URLConnection connection = null;
			connection = realUrl.openConnection();
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");

			connection.setDoOutput(true);
			OutputStream outstr = connection.getOutputStream();
			byte[] data = SerializeUtil.serialize(param);
			CompressUtil.compress(data, outstr);

			byte[] responseByte = FileReaderUtil.getByteFromRequest(connection.getInputStream());
			responseByte = CompressUtil.decompress(responseByte);
			IReportResponse obj = (IReportResponse) SerializeUtil.unSerialize(responseByte);
			return obj;
		} catch (Exception e) {
			System.out.println("发送GET请求出现异常！" + e);
			e.printStackTrace();
		} finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return null;
	}
	
	public IServerSideJs getJsEngine(){
		return reportEngine;
	}
	
	private void deleteTempReport(String filePath) {
		File f = new File(filePath);
		if (!f.delete()) {
		}
	}
	
	public boolean checkServiceEnable(JSONObject currentDataObj){
		JSONObject trxData = JsonHelper.getTrxObject(currentDataObj);
		if(trxData.containsKey("ServiceEnable")){
			return !"false".equalsIgnoreCase(trxData.getString("ServiceEnable"));
		}
		return true;
	}
}
