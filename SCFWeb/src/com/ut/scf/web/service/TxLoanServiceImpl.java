package com.ut.scf.web.service;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebResult;
import javax.jws.WebService;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.gapi.IGAPIMsgManager;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.mule.message.webservice.IWebService;
import com.ut.scf.mule.message.webservice.IWebLoanService;
import com.ut.scf.orm.std.GapiMsg;

import net.sf.json.JSONObject;

@SuppressWarnings({ "all" })
@WebService(endpointInterface = "com.ut.scf.mule.message.webservice.IWebLoanService")
public class TxLoanServiceImpl implements IWebLoanService {

	private final static String TEMP_GAPI_ID = "xerp_recv";
	private static final int GAPI_STS_PROCESSING = 0;
	private static final int GAPI_STS_SUCCEED = 1;
	private static final int GAPI_STS_FAILED = 2;
	private static final int GAPI_STS_EXCEPTION = 3;

	@Override
	@WebMethod
	@WebResult(name = "retData")
	public String loanApplyRt(String reqData) {
		String retXml = "";
		String key = UUIdGenerator.getUUId();
		
		StringBuffer buff = new StringBuffer();
		try {
			APLogUtil.getESBLogger().debug("接收XERP消息：" + reqData);
			
			buff.append("<?xml version=\"1.0\" encoding = \"UTF-8\"?>");
			buff.append("<XERP>");
			buff.append("<BODY>");
			buff.append("<RET_CODE>");
			buff.append("1");
			buff.append("</RET_CODE>");
			buff.append("<RET_MSG>");
			buff.append("操作成功");
			buff.append("</RET_MSG>");
			buff.append("<CMS_CUST_NO>");
			buff.append("CMS0000001");
			buff.append("</CMS_CUST_NO>");
			buff.append("</BODY>");
			buff.append("</XERP>");
			
			retXml = buff.toString();
			
		} catch (Exception e) {
			APLogUtil.getESBLogger().error("处理XERP数据出现异常", e);
			System.out.println(e);
			retXml += "<?xml version=\"1.0\" encoding = \"UTF-8\"?>";
			retXml += "<XERP>                                  ";
			retXml += "	<BODY>                               ";
			retXml += "		<RET_CODE>3</RET_CODE>           ";
			retXml += "		<RET_MSG>" + e.getMessage() + "</RET_MSG>              ";
			retXml += "	</BODY>                              ";
			retXml += "</XERP>                                 ";
		}
		return retXml;
	}
}
