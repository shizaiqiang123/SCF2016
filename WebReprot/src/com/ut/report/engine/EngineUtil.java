package com.ut.report.engine;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.eclipse.birt.report.data.oda.jdbc.IConnectionFactory;
import org.eclipse.birt.report.engine.api.DocxRenderOption;
import org.eclipse.birt.report.engine.api.EXCELRenderOption;
import org.eclipse.birt.report.engine.api.EngineException;
import org.eclipse.birt.report.engine.api.HTMLRenderOption;
import org.eclipse.birt.report.engine.api.IRenderOption;
import org.eclipse.birt.report.engine.api.IReportEngine;
import org.eclipse.birt.report.engine.api.IReportRunnable;
import org.eclipse.birt.report.engine.api.IRunAndRenderTask;
import org.eclipse.birt.report.engine.api.PDFRenderOption;
import org.eclipse.birt.report.engine.api.script.ScriptException;

import com.comm.pojo.report.IReportParameter;
import com.comm.pojo.report.IReportResponse;
import com.comm.pojo.report.ReportResponse;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;

public class EngineUtil {
	public static void buildSuccessResponse(Object paraments) {
		
	}
	
	public static void setRenderOption(String docType,HTMLRenderOption hTMLRenderOption) {
		if ("pdf".equalsIgnoreCase(docType))
		{
			hTMLRenderOption.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_PDF);
		}
		else if ("html".equalsIgnoreCase(docType))
		{
			hTMLRenderOption.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_HTML);
		} else if ("xls".equalsIgnoreCase(docType)) {
			hTMLRenderOption.setOutputFormat("xls");
		} else if ("doc".equalsIgnoreCase(docType)) {
			hTMLRenderOption.setOutputFormat("doc");
		} else if ("ppt".equalsIgnoreCase(docType)) {
			hTMLRenderOption.setOutputFormat("ppt");
		}
	}
	
	public static IRenderOption createRenderOption(String docType){
		IRenderOption renderOption = null;
		if ("pdf".equalsIgnoreCase(docType))
		{
			renderOption = new PDFRenderOption();
			renderOption.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_PDF);
		}
		else if ("html".equalsIgnoreCase(docType))
		{
			renderOption = new HTMLRenderOption();
			renderOption.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_HTML);
		} else if ("xls".equalsIgnoreCase(docType)) {
			renderOption = new EXCELRenderOption();
			renderOption.setOutputFormat("xls");
			((EXCELRenderOption)renderOption).setOfficeVersion("office2003");
		}else if ("xlsx".equalsIgnoreCase(docType)) {
			renderOption = new EXCELRenderOption();
			renderOption.setOutputFormat("xlsx");
			((EXCELRenderOption)renderOption).setOfficeVersion("office2007");
			((EXCELRenderOption)renderOption).setHideGridlines(false);
		} else if ("doc".equalsIgnoreCase(docType)) {
			renderOption = new DocxRenderOption();
			renderOption.setOutputFormat("doc");
			((EXCELRenderOption)renderOption).setOfficeVersion("office2003");
		} else if ("docx".equalsIgnoreCase(docType)) {
			renderOption = new DocxRenderOption();
			renderOption.setOutputFormat("docx");
			((EXCELRenderOption)renderOption).setOfficeVersion("office2007");
		}  else if ("ppt".equalsIgnoreCase(docType)) {
			renderOption = new DocxRenderOption();
			renderOption.setOutputFormat("doc");
		}
		return renderOption;
	}

	public static void buildResponse(IRunAndRenderTask runAndRenderTask,IReportResponse response)
	{
		int status = runAndRenderTask.getStatus();
		if(status==IRunAndRenderTask.STATUS_SUCCEEDED){
			response.setSuccess(true);
			byte[] fileContent;
			try {
				fileContent = getBytesFromFile(runAndRenderTask.getRenderOption().getOutputFileName());
				
				String srtContent = new sun.misc.BASE64Encoder().encodeBuffer(fileContent);
				response.setFileContent(srtContent);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
				buildErrorException(response, e);
			} catch (IOException e) {
				e.printStackTrace();
				buildErrorException(response, e);
			}
		}else if(status==IRunAndRenderTask.STATUS_FAILED){
			List errors = runAndRenderTask.getErrors();
			if (errors != null && errors.size() > 0)
			{
				response.setSuccess(false);
				StringBuffer errorStr = new StringBuffer();
				for (int i = 0, length = errors.size(); i < length; i++)
				{
					Object error = errors.get(i);
					errorStr.append(error).append("\r\n");
				}
				response.setMessage(errorStr.toString());
			}
		}else{
			response.setSuccess(false);
			response.setMessage(status+"");
		}
	}
	
	public static void buildErrorRequestTypeException(Object paraments) {
		
	}
	
	public static void buildErrorException(IReportResponse response, Exception e) {
		response.setSuccess(false);
		response.setMessage(e.toString());
		response.setLevel("Error");
	}
	
	public static IReportResponse generateReport(IReportParameter paramenters) {
		Map context = new HashMap();
		IReportResponse rptResponse = new ReportResponse();
		IRenderOption renderOption = createRenderOption(paramenters.getReportType());
//		setRenderOption(, renderOption);
		Connection connection = null;
		if ("xml".equalsIgnoreCase(paramenters.getDataSourceType())) {
			ByteArrayInputStream stream = null;
			try
			{
				String dataSource = decodeParameter(paramenters.getDataSource());
				stream = new ByteArrayInputStream(dataSource.getBytes("UTF-8"));
			} catch (UnsupportedEncodingException e1)
			{
				buildErrorException(rptResponse, e1);
				return rptResponse;
			}
			context.put("org.eclipse.birt.report.data.oda.xml.inputStream", stream);
			context.put("org.eclipse.birt.report.data.oda.xml.closeInputStream", new Boolean(true));
		} else {
			
			try
			{
				connection = EngineFactory.getConnection(paramenters.getDataSource());
			} catch (SQLException e)
			{
				buildErrorException(rptResponse, e);
				return rptResponse;
			} finally
			{
			}
			context.put(IConnectionFactory.PASS_IN_CONNECTION,connection);
			context.put("CustomedConnection", connection);
			
		}

		renderOption.setOutputFileName(paramenters.getReportFilePath());

		// Get report engine.
		IReportEngine reportEngine = EngineFactory.getReportEngine();

		// Open report design.
		IReportRunnable reportRunnable = null;
		try
		{
			reportRunnable = reportEngine.openReportDesign(paramenters.getDesignFilePath());
		} catch (EngineException e)
		{
			// throw e;
			buildErrorException(rptResponse, e);
			return rptResponse;
		} finally
		{
		}
		
		try {
			if ("db".equalsIgnoreCase(paramenters.getDataSourceType())) {
				reportRunnable.getDesignInstance().getDataSource("Data Source").setPrivateDriverProperty("odaJndiName", paramenters.getDataSource());
			}
		} catch (ScriptException e1) {
			buildErrorException(rptResponse, e1);
			return rptResponse;
		}
		
		IRunAndRenderTask runAndRenderTask = reportEngine.createRunAndRenderTask(reportRunnable);
		
		runAndRenderTask.setAppContext(context);
		runAndRenderTask.setRenderOption(renderOption);
		
		if ("db".equalsIgnoreCase(paramenters.getDataSourceType())) {
			String strTrxData = paramenters.getTrxData();
			JSONObject trxData = JsonUtil.getJsonObj(strTrxData);
			JSONObject reqPara = JsonHelper.getTrxObject(trxData);
			JSONObject mapData = JsonUtil.getChildJson(reqPara, "parameterValueMap");
			Map<String, Object> parameterValueMap = JsonUtil.getMapFromJson(mapData);
//			Map<String, Object> parameterValueMap=(Map<String, Object>) reqPara.get("parameterValueMap");
			try {
				if( parameterValueMap != null){
					runAndRenderTask.setParameterValues(parameterValueMap);
				}
			} catch (Exception e) {
				e.printStackTrace();
				buildErrorException(rptResponse, e);
			}
		}

		try {
			runAndRenderTask.run();
		} catch (EngineException e) {
			e.printStackTrace();
			buildErrorException(rptResponse, e);
		} finally {
			runAndRenderTask.close();
		}
		EngineUtil.buildResponse(runAndRenderTask,rptResponse);
		return rptResponse;
	}
	
	
	private static byte[] getBytesFromFile(String reportFile)throws FileNotFoundException, IOException
	{
		File file = new File(reportFile);
		BufferedInputStream inputStream = null;
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		try {
			inputStream = new BufferedInputStream(new FileInputStream(file));
			int curLen = inputStream.read(buffer);
			while (curLen > 0) {
				outStream.write(buffer, 0, curLen);
				outStream.flush();
				curLen = inputStream.read(buffer);
			}
			return outStream.toByteArray();
		} finally {
			inputStream.close();
			inputStream = null;
			file = null;
			buffer = null;
		}
	}
	
	private static String decodeParameter(String parameter) throws UnsupportedEncodingException
	{
		try
		{
			parameter = URLDecoder.decode(parameter,"UTF-8");
		} catch (UnsupportedEncodingException e)
		{
			throw e;
		} finally
		{
		}
		return parameter;
	}
	
}
