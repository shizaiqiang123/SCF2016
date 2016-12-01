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
@WebService(endpointInterface = "com.ut.scf.mule.message.webservice.IWebService")
public class TxServiceImpl implements IWebService {

	private final static String TEMP_GAPI_ID = "xerp_recv";
	private static final int GAPI_STS_PROCESSING = 0;
	private static final int GAPI_STS_SUCCEED = 1;
	private static final int GAPI_STS_FAILED = 2;
	private static final int GAPI_STS_EXCEPTION = 3;

	@Override
	@WebMethod
	@WebResult(name = "retData")
	public String doWork(String reqData) {
		String retXml = "";
		String key = UUIdGenerator.getUUId();
		String gapiID = "";
		try {
			APLogUtil.getESBLogger().debug("接收XERP消息：" + reqData);
			GapiMsgPara gapiPara = XMLParaParseHelper.parseGapiMsgPara(TEMP_GAPI_ID, null);
			IGAPIMsgManager gapiMsgGenerator = ClassLoadHelper.getComponentClass(gapiPara.getGenerator());

			List<Object> returnObj = gapiMsgGenerator.demerge(gapiPara, reqData);
			String bizCode = JsonHelper.getTrxObject((JSONObject) returnObj.get(0)).getString("bizCode");
			gapiID = "xerp" + bizCode + "_recv";
			storeMsg(key, gapiID, bizCode, reqData, "", GAPI_STS_PROCESSING, null);
			IGAPIProcessManager manager = ClassLoadHelper.getComponentClass("gapiManager");
			IGAPIMsgRequest gapiResponse = manager.processRecvMsg(gapiID, reqData.toString(), null);
			APLogUtil.getESBLogger().debug("返回XERP消息：" + gapiResponse.getMsgBody().toString());
			retXml = gapiResponse.getMsgBody().toString();
			storeMsg(key, gapiID, bizCode, reqData, gapiResponse.getMsgBody().toString(), GAPI_STS_SUCCEED, "");
		} catch (Exception e) {
			storeMsg(key, gapiID, null, null, null, GAPI_STS_EXCEPTION, e.toString());
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

	private void storeMsg(String key, String gapiID, String trnid, String recMsg, String sendMsg, Integer gapiSts,
			String errorMsg) {
		try {
			if (gapiID != null && gapiID.trim().length() > 0) {
				GapiMsgPara gapiPara = XMLParaParseHelper.parseGapiMsgPara(gapiID, "");
				com.ut.scf.orm.std.GapiMsg msgEntity = new GapiMsg();
				msgEntity.setMsgId(key);
				msgEntity.setSysRefNo(key);
				msgEntity.setSysEventTimes(1);
				msgEntity.setGapiName(gapiPara.getName());
				msgEntity.setGapiId(gapiID);
				msgEntity.setTrxRefNo(trnid);
				msgEntity.setTrxEventTimes(1);
				msgEntity.setGapiType("in");
				msgEntity.setSysBusiUnit("");
				msgEntity.setSysLockFlag("F");
				msgEntity.setSysTrxSts("M");
				msgEntity.setGapiSts(gapiSts);
				msgEntity.setSysOpTm(DateTimeUtil.getTimestamp());
				msgEntity.setReceiveMessage(recMsg);
				msgEntity.setSendMessage(sendMsg);
				msgEntity.setErrorMsg(errorMsg);

				IGAPIMsgManager gapiMsgGenerator = ClassLoadHelper.getComponentClass(gapiPara.getGenerator());
				gapiMsgGenerator.storeMsg(gapiPara, msgEntity, true);
			}
		} catch (Exception e) {
			APLogUtil.getESBLogger().error("存储SCF Post数据出现异常", e);
		}
	}

}
