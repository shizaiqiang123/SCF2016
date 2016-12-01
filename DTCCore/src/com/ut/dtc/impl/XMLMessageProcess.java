package com.ut.dtc.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.dtc.intf.IMessageBody;
import com.ut.dtc.intf.IMessageHeader;
import com.ut.dtc.intf.IMessageProcess;
import com.ut.dtc.intf.IMetadata;
import com.ut.dtc.intf.IValidate;
import com.ut.dtc.intf.data.ApplicationDefine;
import com.ut.dtc.intf.data.BodyMsg;
import com.ut.dtc.intf.data.HeaderMsg;
import com.ut.dtc.intf.data.MsgTypeDefine;
import com.ut.dtc.util.DBUtil;
import com.ut.dtc.util.GAPIUtil;
import com.ut.dtc.util.JSUtil;

@Service("xmlMessageProcess")
@Scope("prototype")
public class XMLMessageProcess implements IMessageProcess{
	public String formatOutput(String content, ApplicationDefine out) throws Exception {
		MsgTypeDefine define = out.getMsgDefine();
		if(StringUtil.isTrimNotEmpty(define.getBodyMapping())){
			
			List<Object> bodyMsg = GAPIUtil.demerage(define.getBodyMapping(), content);
			String msgContent = "";
			if(bodyMsg!=null&&!bodyMsg.isEmpty()){
				msgContent = bodyMsg.get(0).toString();
			}
			
			JSONObject reqJson = JsonUtil.getJsonObj(msgContent);
			String formattor =define.getValidator();
			reqJson = JSUtil.formatJs(formattor, reqJson);
			return reqJson.toString();
		}
		return content;
	}

	public void storeData(String content,IMetadata metadata) {
		String sql = "insert into trx.DTC_MSG_LOG(SYS_REF_NO,SYS_EVENT_TIMES,SYS_OP_TM,SYS_ORG_ID,CUST_ID,CUST_NM,CUST_BRANCH,INTF_ID,"
				+ "INTF_DESC,REMARK,MSG_TEXT,MSG_STS) VALUES(?,?,to_date(?,'yyyy-mm-dd hh24:mi:ss'),?,?,?,?,?,?,?,?,?)";
		List<Object> parms = new ArrayList<Object>();
		parms.add(metadata.getMsgId());
		parms.add(1);
		parms.add(DateTimeUtil.getSysTime());
		parms.add("");
		parms.add(metadata.getMsgHeader().getCustId());
		parms.add(metadata.getMsgHeader().getCustNm());
		parms.add(metadata.getCustBu());
		parms.add(metadata.getMsgTp());
		parms.add(metadata.getMsgHeader().getSystemId());
		parms.add("");
		parms.add(content);
		parms.add(1);
		
		DBUtil.updateData(sql, parms);
	}

	public String formatInput(String content, IMetadata metadata) throws Exception {
		IMessageBody body = metadata.getMsgBody();
		
		String mapping = body.getMapping();
		List<Object> bodyMsg = GAPIUtil.demerage(mapping, content);
		String msgContent = "";
		if(bodyMsg!=null&&!bodyMsg.isEmpty()){
			msgContent = bodyMsg.get(0).toString();
		}
		
		String formattor = body.getFormator();
		
		JSONObject reqJson = JsonUtil.getJsonObj(msgContent);
		
		reqJson = JSUtil.formatJs(formattor, reqJson);
		
		body.setMsgContent(reqJson.toString());
		
		IValidate validater = metadata.getValidate();
		
		validater.validateBody(bodyMsg);
		
		return content;
	}

	public void processMetadata(String content, IMetadata metadata) {
//		metadata.setCustBu("platform");
//		IMessageBody body = metadata.getMsgBody();
	}

	public void doAuthorizeCheck(String content, IMetadata metadata) throws Exception {
		IMessageHeader header = metadata.getMsgHeader();
		
		IValidate validater = metadata.getValidate();
		validater.validateHeader(header);
	}

	@Override
	public Object formatResponse(Object responseData, ApplicationDefine out) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("result", "success");
		return map;
		}

	@Override
	public void buildMetadata(IMetadata data,String input) throws Exception {
		
		String metaMapping= "dtc_head";
		
		List<Object> meta = GAPIUtil.demerage(metaMapping, input);
		
		IMessageHeader head = new HeaderMsg();
		for (Object object : meta) {
			if(object!=null&&object.getClass().isAssignableFrom(JSONObject.class)){
				JSONObject json = (JSONObject) object;
				JSONObject trxData = JsonHelper.getTrxObject(json);
				BeanUtils.setBeanProperty(head, trxData);
			}
		}
		String msgTp = head.getTranCode();
		
		IMessageBody body = new BodyMsg();
		data.setMsgId(UUIdGenerator.getUUId());
		data.setMsgBody(body);
		data.setMsgHeader(head);
		data.setMsgTp(msgTp);
		data.setValidate(new DefaultValidate());
	}
}
