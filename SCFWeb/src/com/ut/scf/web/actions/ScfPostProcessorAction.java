package com.ut.scf.web.actions;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.MapUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.XmlUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.gapi.IGAPIMsgManager;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.orm.std.GapiMsg;

public class ScfPostProcessorAction extends ActionSupport {

	private static final Map<String, String> TRANSCODE_GAPI = new HashMap<String, String>();

	private static final int GAPI_STS_PROCESSING = 0;
	private static final int GAPI_STS_SUCCEED = 1;
	private static final int GAPI_STS_FAILED = 2;
	private static final int GAPI_STS_EXCEPTION = 3;

	static {
		TRANSCODE_GAPI.put("b2e0082", "b2e0082_recv");
		TRANSCODE_GAPI.put("b2e0084", "b2e0084_recv");
		TRANSCODE_GAPI.put("b2e0298", "b2e0298_recv");
		TRANSCODE_GAPI.put("b2e0272", "b2e0272_recv");
		TRANSCODE_GAPI.put("b2e0001", "b2e0001_recv");
		TRANSCODE_GAPI.put("b2e0002", "b2e0002_recv");
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public String execute() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		String key = UUIdGenerator.getUUId();
		BufferedReader br = null;
		PrintWriter out = null;
		String gapiName = "";
		try {
			br = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
			String line = null;
			StringBuilder sb = new StringBuilder();
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			APLogUtil.getESBLogger().debug("接收SCF消息：" + sb.toString());
			Map map = new XmlUtil().getElements(sb.toString());
			String transCode = (String) MapUtil.getValueByStringKey(map, "head/trncod");
			String trnid = (String) MapUtil.getValueByStringKey(map, "head/trnid");
			gapiName = TRANSCODE_GAPI.get(transCode);
			storeMsg(key, gapiName, trnid, sb.toString(), "", GAPI_STS_PROCESSING, null);
			IGAPIProcessManager manager = ClassLoadHelper.getComponentClass("gapiManager");
			IGAPIMsgRequest gapiResponse = manager.processRecvMsg(gapiName, sb.toString(), null);
			storeMsg(key, gapiName, trnid, sb.toString(), gapiResponse.getMsgBody().toString(), GAPI_STS_SUCCEED, "");
			APLogUtil.getESBLogger().debug("返回SCF消息：" + gapiResponse.getMsgBody().toString());
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/xml");
			out = response.getWriter();
			out.write(gapiResponse.getMsgBody().toString());
			out.flush();
			return null;
		} catch (Exception e) {
			storeMsg(key, gapiName, null, null, null, GAPI_STS_EXCEPTION, e.toString());
			APLogUtil.getESBLogger().error("处理SCF Post数据出现异常", e);
		} finally {
			if (out != null) {
				out.close();
			}
			if (br != null) {
				br.close();
			}
		}
		return null;
	}

	private void storeMsg(String key, String gapiID, String trnid, String recMsg, String sendMsg, Integer gapiSts,
			String errorMsg) {
		try {
			if (gapiID != null && gapiID.trim().length() > 0) {
				GapiMsgPara gapiPara = XMLParaParseHelper.parseGapiMsgPara(gapiID, "");
				GapiMsg msgEntity = new GapiMsg();
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
