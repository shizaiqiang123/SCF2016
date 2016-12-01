package com.ut.scf.core.component.main.impl.beans;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.comm.pojo.core.Report;
import com.comm.pojo.report.IReportParameter;
import com.comm.pojo.report.BirtReportParameter;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.report.ReportPara;
import com.ut.comm.xml.sys.SysPara;
import com.ut.scf.core.component.AbsMainCompManager;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.services.report.impl.IReportService;

@Service("aSETrxReportManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxReportManagerBean extends AbsMainCompManager{

	@Resource(name = "reportJs")
	protected IServerSideJs jsEngine;
	
//	@Resource(name = "batchReport")
	protected IReportService reportService;
	
	@Override
	public Object submitData(Object paraDom) throws Exception {
		super.parseParameters(paraDom);
		int reportSize = funcObj.getReportsSize();
		IApResponse response = new ApResponse();
		if(reportSize<1){
			response.setMessage("No report need to show.");
			response.setTotal(0);
			response.setSuccess(true);
			return response;
		}
		
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context.getSysBusiUnit());
		
		List<Report> reportList = new ArrayList<Report>();

		for (int i = 0; i < reportSize; i++) {
			ReportPara report = funcObj.getReport(i);
			
			IReportParameter engine = new BirtReportParameter();
			engine.setDataSource(report.getDatasource());
			engine.setDataSourceType(report.getDatasourcetype());
			engine.setReportFilePath(getReportFileName(report.getReporttype()));
			engine.setOperateType("save");
			engine.setDesignFilePath(report.getTemplate());
			engine.setReportType(report.getReporttype());
			
			jsEngine.initTrxData(reqData);
			
			jsEngine.executeJsFile(report.getJs());
			
			if("xml".equalsIgnoreCase(report.getDatasourcetype())){
				
				String json = JsonUtil.getJSONString(jsEngine.getTrxData());
				
				engine.setDataSource(JsonUtil.convertToXmlStr(json));
			}
			
			engine.setTrxData(JsonUtil.getJSONString(jsEngine.getTrxData()));
//			reportService.save(engine);
		}
		response.setTotal(reportSize);
		response.setSuccess(true);
		response.setRows(reportList);
		return response;
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		super.parseParameters(paraDom);
		int reportSize = funcObj.getReportsSize();
		IApResponse response = new ApResponse();
		if(reportSize<1){
			response.setMessage("No report need to show.");
			response.setTotal(0);
			response.setSuccess(true);
			return response;
		}
		
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context.getSysBusiUnit());
		
		List<Report> reportList = new ArrayList<Report>();

		for (int i = 0; i < reportSize; i++) {
			ReportPara report = funcObj.getReport(i);
			Report reportInfo = new Report();
			reportInfo.setId(report.getId());
			reportInfo.setName(report.getName());
			reportInfo.setEngineUrl(sysPara.getReportengine());
			reportInfo.setType(report.getType());
			
			IReportParameter engine = new BirtReportParameter();
			engine.setDataSource(report.getDatasource());
//			engine.setDataSource(xmlSource);
			engine.setDataSourceType(report.getDatasourcetype());
			engine.setReportFilePath(getReportFileName(report.getReporttype()));
			engine.setOperateType(super.trxData.getString("operateType"));
			engine.setDesignFilePath(report.getTemplate());
			engine.setReportType(report.getReporttype());
			
//			jsEngine.initTrxData(JsonUtil.clone(reqData));
//			
//			jsEngine.executeJsFile(report.getMapping());
//			
//			if("xml".equalsIgnoreCase(report.getDatasourcetype())){
//				System.out.println(reqData);
//				
//				String json = JsonUtil.getJSONString(jsEngine.getTrxData());
//				
//				engine.setDataSource(JsonUtil.convertToXmlStr(json));
//				System.out.println(engine.getDataSource());
//			}
//			
//			engine.setTrxData(JsonUtil.getJSONString(jsEngine.getTrxData()));
	
			reportInfo.setPara(engine);
		
//			reportInfo.setTrxData(JsonUtil.getJSONString(jsEngine.getTrxData()));
			reportList.add(reportInfo);
		}
		response.setTotal(reportSize);
		response.setSuccess(true);
		response.setRows(reportList);
		return response;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
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
}
