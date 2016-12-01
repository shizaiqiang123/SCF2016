package com.ut.scf.core.doc;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.xml.template.TemplatePara;

@Component("documentFactory")
public class DocumentFactoryImpl {
	@Resource(name = "excelManager")
	protected ExcelManager excelManager;
	
	@Resource(name = "pdfManager")
	protected PdfManager pdfManager;
	
	@Resource(name = "textManager")
	protected TextManager textManager;
	
	@Resource(name = "xmlManager")
	protected XmlManager xmlManager;
	
	
	public IDocumentManager getProcessor(TemplatePara  templatePara){
		String strType = templatePara.getTemptype();
		String tempId = templatePara.getId();
		if("Excel".equalsIgnoreCase(strType)){
			return excelManager;
		}
		if("pdf".equalsIgnoreCase(strType)){
			return pdfManager;
		}
		if ("xml".equalsIgnoreCase(strType)) {
			return xmlManager;
		}
		if("text".equalsIgnoreCase(strType)){
			return textManager;
		}		
		Assert.isTrue(false, "不支持"+tempId+"该配置文件中设置的"+strType+"格式.请修改后重新上传。");
		return null;
	}
}