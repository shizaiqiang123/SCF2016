package com.ut.scf.core.conf;

import org.springframework.stereotype.Component;

import com.ut.comm.xml.XMLParaHelper;
import com.ut.comm.xml.accounting.AccountingPara;
import com.ut.comm.xml.advice.AdvicePara;
import com.ut.comm.xml.batch.BatchPara;
import com.ut.comm.xml.batch.BatchsPara;
import com.ut.comm.xml.catalog.CatalogPara;
import com.ut.comm.xml.edi.EDIPara;
import com.ut.comm.xml.esb.ESBServicePara;
import com.ut.comm.xml.esb.ESBServicesPara;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.comm.xml.inqdata.InquireDataPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.product.ProductPara;
import com.ut.comm.xml.query.QueryPara;
import com.ut.comm.xml.report.ReportPara;
import com.ut.comm.xml.root.SysRootPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.comm.xml.sys.SysPara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.comm.xml.workflow.WorkFlowPara;

@Component("paraConfig")
public class SysParaDefineConfig implements IConfig{

	@Override
	public void initilize() {
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_ACCOUNTING, AccountingPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_BATCH, BatchPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_CATALOG, CatalogPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_FUNC, FunctionPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_GAPI, GapiPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_INQDATA, InquireDataPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_LOGICFLOW, LogicFlowPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_PAGE, PagePara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_QUERY, QueryPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_REPORT, ReportPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_SERVICE, ServicePara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_AP_SYS, SysPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_BATCHS_ROOT, BatchsPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_ACCOUNTING_ROOT, AccountingPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_TASK, TaskPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_TEMPLATE, TemplatePara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_WORKFLOW, WorkFlowPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_EDI, EDIPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_ADVICE, AdvicePara.class);
		
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_ESB_SERVICE, ESBServicePara.class);
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_ESB_SERVICES, ESBServicesPara.class);
		
		XMLParaHelper.registeObject(XMLParaHelper.PARA_PATH_SYS, SysRootPara.class);
		XMLParaHelper.registeObject(XMLParaHelper.NOTE_NAME_PRODUCT, ProductPara.class);
	}

	@Override
	public void destory() {
	}

}
