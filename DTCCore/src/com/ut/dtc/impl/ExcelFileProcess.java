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
import com.ut.dtc.util.ExcelUtil;
import com.ut.dtc.util.JSUtil;

@Service("excelMessageProcess")
@Scope("prototype")
public class ExcelFileProcess implements IMessageProcess{

	@Override
	public String formatOutput(String content, ApplicationDefine out) throws Exception {
		MsgTypeDefine define = out.getMsgDefine();
		if(StringUtil.isTrimNotEmpty(define.getBodyMapping())){
			JSONObject reqJson = JsonUtil.getJsonObj(content);
			String formattor =define.getValidator();
			reqJson = JSUtil.formatJs(formattor, reqJson);
			return reqJson.toString();
		}
		return content;
	}

	@Override
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

	@Override
	public String formatInput(String content, IMetadata metadata) throws Exception {
		IMessageBody body = metadata.getMsgBody();
		
		String mapping = body.getMapping();

		List<Object> bodyMsg = ExcelUtil.demerage(mapping, content);

		JSONObject reqJson = JsonHelper.createReqJson();
		JSONObject trxJson = JsonHelper.getTrxObject(reqJson);
		trxJson.putAll(BeanUtils.toMap(metadata.getMsgHeader()));
		
		JSONObject row = JsonUtil.getTrxGridData(bodyMsg,"row");
		JsonUtil.append(trxJson, row);
	
		String formattor = body.getFormator();

		reqJson = JSUtil.formatJs(formattor, reqJson);
		
		body.setMsgContent(reqJson.toString());
		
		IValidate validater = metadata.getValidate();
		
		validater.validateBody(bodyMsg);
		
		return reqJson.toString();
	}

	@Override
	public void processMetadata(String content, IMetadata metadata) {
		
	}

	@Override
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
	public void buildMetadata(IMetadata metadata, String content) throws Exception {
		String metaMapping= "dtc_head";
		
		List<Object> meta = ExcelUtil.demerage(metaMapping, content);
		
		IMessageHeader head = new HeaderMsg();
		for (Object object : meta) {
			if(object!=null&&object.getClass().isAssignableFrom(HashMap.class)){
				Map json = (Map) object;
				BeanUtils.setBeanProperty(head, json);
			}
		}
		String msgTp = head.getTranCode();
		
		IMessageBody body = new BodyMsg();
		metadata.setMsgId(UUIdGenerator.getUUId());
		metadata.setMsgBody(body);
		metadata.setMsgHeader(head);
		metadata.setMsgTp(msgTp);
		metadata.setValidate(new DefaultValidate());		
	}

}
