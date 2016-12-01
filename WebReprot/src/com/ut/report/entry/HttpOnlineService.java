package com.ut.report.entry;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.comm.pojo.report.IReportParameter;
import com.comm.pojo.report.IReportResponse;
import com.ut.comm.tool.CompressUtil;
import com.ut.comm.tool.SerializeUtil;
import com.ut.comm.tool.file.FileReaderUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.report.engine.EngineUtil;
import com.ut.scf.core.services.report.impl.IReportService;

public class HttpOnlineService extends HttpServlet implements IReportService{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3091150580864025894L;
	
	HttpServletRequest request;
	
	HttpServletResponse response;
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		IReportResponse reportResponse = null;
		try{
			request.setCharacterEncoding("UTF-8");
			
			this.request = request;
			this.response = response;
			
			IReportParameter paraments = (IReportParameter) getRequestParaments(request);
			paraments.setDesignFilePath( getReportDesignFile(paraments.getDesignFilePath(),paraments.getBu()) );
			
			checkParameters(paraments);

			String reqType = getReqType(paraments);
			
			if(StringUtil.isTrimEmpty(reqType)){
				EngineUtil.buildErrorRequestTypeException(paraments);
				return;
			}
			
				
			if(REQ_TYPE_SAVE.equals(reqType)){
				reportResponse = save(paraments);
			}else if(REQ_TYPE_SHOW.equals(reqType)){
				reportResponse = show(paraments);
			}else if(REQ_TYPE_SAVE_SHOW.equals(reqType)){
				reportResponse = saveAndShow(paraments);
			}else{
				EngineUtil.buildErrorRequestTypeException(paraments);
			}
		}catch(IOException ie){
			EngineUtil.buildErrorException(reportResponse,ie);
		} catch (Exception e) {
			EngineUtil.buildErrorException(reportResponse,e);
		}finally{
			buildResponse(reportResponse);
		}
	}
	private String getReportRootPath(String bu){
		return XMLParaLoadHelper.getApParaDeinePath("report",bu);
	}
	private String getReportDesignFile(String template,String bu){
		if(StringUtil.isTrimEmpty(template)){
			return "";
		}
		StringBuffer buff = new StringBuffer();
//		buff.append(getReportRootPath(bu)).append(File.separator)
		buff.append(getReportRootPath(bu))
		.append("designer").append(File.separator)
		.append(template);
		return buff.toString();
	}
	private void buildResponse(IReportResponse reportResponse) {
		try {
			OutputStream outstr = response.getOutputStream();
			byte[] data = SerializeUtil.serialize(reportResponse);
			data = CompressUtil.compress(data);
			outstr.write(data, 0, data.length);

			outstr.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void checkParameters(IReportParameter paraments) throws Exception {
		checkNotNullStr("Data paraments",paraments);
		checkNotNullStr("Data Source Type",paraments.getDataSourceType());
		checkNotNullStr("Design File",paraments.getDesignFilePath());
		checkNotNullStr("Operate Type",paraments.getOperateType());
		checkNotNullStr("Report Type",paraments.getReportType());
	}
	
	private void checkNotNullStr(String name,Object value) throws Exception{
		if(value!=null){
			String strValue = value.toString();
			if(StringUtil.isNotNull(strValue)){
				return;
			}
		}
		throw new Exception(String.format("[%s] must not be null in request.", name));
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		this.doPost(request, response);
	}

	@Override
	public IReportResponse save(IReportParameter paraments) {
		return EngineUtil.generateReport((IReportParameter) paraments);
	}

	@Override
	public IReportResponse show(IReportParameter paraments) {
		IReportParameter reqPara = (IReportParameter) paraments;
		
		IReportResponse response = EngineUtil.generateReport(reqPara);
		
//		showReport(reqPara.getReportFilePath());
		
		deleteTempReport(reqPara.getReportFilePath());
		
		return response;
	}

	@Override
	public IReportResponse saveAndShow(IReportParameter paraments) {
		IReportParameter reqPara = (IReportParameter) paraments;
		
		IReportResponse response = save(reqPara);
		
//		showReport(reqPara.getReportFilePath());
		
		return response;
	}
	
	private String getReqType(IReportParameter parameter) {
		return parameter.getOperateType();
	}

	protected Object getRequestParaments(HttpServletRequest request) throws IOException {
		byte[] data = FileReaderUtil.getByteFromRequest(request.getInputStream());
		data = CompressUtil.decompress(data);
		Object obj = SerializeUtil.unSerialize(data);
		return obj;
	}
	
	
	private void showReport(String reportFilePath){
		ServletOutputStream servletOutputStream = null;
	
		try
		{
			servletOutputStream = response.getOutputStream();
		} catch (IOException e)
		{
			EngineUtil.buildErrorException(null, e);
			return;
		} finally
		{
		}
		try
		{
			this.getBytesFromFile(reportFilePath, servletOutputStream);
		} catch (IOException e)
		{
			EngineUtil.buildErrorException(null, e);
			return;
		}
	}
	
	private void getBytesFromFile(String reportFile, ServletOutputStream servletOutputStream)
			throws FileNotFoundException, IOException
	{
		File file = new File(reportFile);
		BufferedInputStream inputStream = null;
		inputStream = new BufferedInputStream(new FileInputStream(file));

		byte[] buffer = new byte[4096];
		int curLen = inputStream.read(buffer);
		while (curLen > 0) {
			servletOutputStream.write(buffer, 0, curLen);
			servletOutputStream.flush();
			curLen = inputStream.read(buffer);
		}
		inputStream.close();
		inputStream = null;
		file = null;
		buffer = null;
	}
	
	private void deleteTempReport(String filePath) {
		File f = new File(filePath);
		if (!f.delete()) {
		}
	}
	
}
