package com.ut.report.entry;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import com.comm.pojo.report.IReportParameter;
import com.comm.pojo.report.IReportResponse;
import com.ut.comm.tool.CompressUtil;
import com.ut.comm.tool.SerializeUtil;
import com.ut.comm.tool.file.FileReaderUtil;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.report.engine.EngineUtil;
import com.ut.scf.core.services.report.impl.IReportService;


public class BatchService implements IReportService{
	
	public void run(Object request) {
//		IReportParameter paraments = getRequestParaments(request);
//		
//		String reqType = getReqType();
//		
//		switch(reqType){
//		case REQ_TYPE_SAVE:
//			save(paraments);
//			break;
//		case REQ_TYPE_SHOW:
//			show(paraments);
//			break;
//		case REQ_TYPE_SAVE_SHOW:
//			saveAndShow(paraments);
//			break;
//		default: buildErrorRequestTypeException(paraments);	
//		}
		
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
		
		deleteTempReport();
		
		return response;
	}

	@Override
	public IReportResponse saveAndShow(IReportParameter paraments) {
		IReportParameter reqPara = (IReportParameter) paraments;
		
		save(reqPara);
		
//		showReport(reqPara.getReportFilePath());
		
		return null;
	}
	
	private void buildErrorRequestTypeException(Object paraments) {
		
	}

	private String getReqType(IReportParameter parameter) {
		return parameter.getOperateType();
	}

	protected Object getRequestParaments(HttpServletRequest request) throws IOException {
		byte[] data = FileReaderUtil.getByteFromRequest(request.getInputStream());
		data = CompressUtil.decompress(data);
		Object obj = SerializeUtil.unSerialize(data);
		if(obj!=null){
			IReportParameter paramenter = (IReportParameter) JsonUtil.getDTO(obj.toString(), IReportParameter.class);
			return paramenter;
		}
		return null;
	}
	
	private void buildSuccessResponse(Object paraments) {
		
	}
	
	private void deleteTempReport() {
		
	}

}
