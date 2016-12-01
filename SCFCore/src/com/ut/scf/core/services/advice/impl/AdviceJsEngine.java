package com.ut.scf.core.services.advice.impl;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import net.sf.json.JSONObject;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.advice.AdvicePara;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.AbsServerSideJs;
import com.ut.scf.core.js.ScriptManager;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.AdviceHeader;

@Service("adviceJsEngine")
@Scope("prototype")
public class AdviceJsEngine extends AbsServerSideJs {
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;
	@Override
	protected Logger getLogger() {
		ApSessionContext context = ApSessionUtil.getContext();
		return APLogUtil.getAdviceLogger(context.getSysBusiUnit());
	}

	private final String BEANNAME = "$";

	private AdvicePara advicePara;

	protected JSONObject funcData;

	protected JSONObject commData;

	protected JSONObject userData;

	protected JSONObject reqData;

	protected JSONObject postData;

	// protected JSONObject trxData;

	protected JSONObject receives;

	public AdviceHeader header;

	public Timestamp bussData;

	public List<Map<String, Object>> receivers;

	public String msgTextId;

	/**
	 * @param funcId
	 * @throws Exception
	 */
	public void assignFunc(String funcId) throws Exception {
		if (StringUtil.isTrimEmpty(funcId)) {
			throw new Exception("Assign Function failed, missing function id.");
		}

		FunctionPara para = XMLParaParseHelper.parseFuncPara(funcId, "");

		funcData.put("sysFuncId", funcId);
		funcData.put("name", para.getName());
		funcData.put("funcType", para.getFunctype());
		funcData.put("module", para.getModule());
		funcData.put("sysEventTimes", 1);
		funcData.put("sysPageIndex", para.getPagesSize() - 1);

		header = new AdviceHeader();
		header.setMsgGroupTp(advicePara.getGrouptp());
		// header.setMsgGroup(msgGroup);
		// header.setMsgGroupNm(msgGroupNm);
		header.setMsgRemindTp(advicePara.getRemindtp());
		header.setMsgSendTp(advicePara.getSendtp());

		header.setMsgSendDate(bussData);
		// 到期日 = 发送日 + 有效期
		Date invalidDate = DateTimeUtil.dateAddDays(bussData,
				Integer.parseInt(advicePara.getExpdt()));
		Timestamp times = new Timestamp(invalidDate.getTime());
		header.setMsgInvalidDate(times);
		header.setMsgStatue("2");
		header.setMsgText(advicePara.getContent());
		header.setMsgTextId(msgTextId);
		header.setMsgTitle(advicePara.getTitle());
		header.setSendId(getStringValue(trxData, "sendId"));
		header.setSendNm(getStringValue(trxData, "sendNm"));
		header.setSysRefNo(getStringValue(trxData, "sysRefNo"));
		header.setSysRefNo(msgTextId);
		header.setSysEventTimes(1);
		((JSONObject) trxData).putAll(BeanUtils.toMap(header));
	}

	@Override
	public void initTrxData(Object trxData) {
		if (scriptMgr == null) {
			scriptMgr = new ScriptManager(BEANNAME, this);
		}
		
		Assert.isTrue(JSONObject.class.isAssignableFrom(trxData.getClass()), "Currenttly doesn't support others data type but [JSONObject].");
		this.orgnData = (JSONObject) trxData;
		
		reqData = JsonUtil.clone((JSONObject) trxData);
		postData = JsonHelper.createReqJson();
		commData = JsonHelper.getConnObject(postData);
		userData = JsonHelper.getUserObject(postData);
		funcData = JsonHelper.getFuncObject(postData);
		this.trxData = JsonHelper.getTrxObject(postData);
		bussData = DateTimeUtil.getTimestamp();
		receivers = new ArrayList<Map<String, Object>>();
		msgTextId = UUIdGenerator.getUUId();
	}

	@Override
	public void initTrxPara(Object trxPara) {
		advicePara = (AdvicePara) trxPara;
	}

	@Override
	public Object getTrxData() {
		JSONObject reveivers = getTrxGridData(receivers);
		((JSONObject) trxData).put("recipients", reveivers);
		return postData;
	}
	public void setTrxData(Object trxData){
		if(trxData instanceof JSONObject){
			JsonHelper.setTrxObject(reqData, (JSONObject)trxData);
		}
	}

	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("advice", fileName));
		if (scriptFile.exists() && scriptFile.canRead()) {
			scriptMgr.exec(scriptFile);
		} else
			throw new IOException("File not found or cannt read.");
	}

	@Override
	public void executeJsContent(String jsContent) throws Exception {
		scriptMgr.exec(jsContent);
	}

	public void appendReveiver(String userId) {
		Map<String, Object> receiver = new HashMap<String, Object>();
		receiver.put("msgRecId", userId);
		receiver.put("msgRecNm", "");
		receiver.put("sysRefNo", UUIdGenerator.getUUId());
		receiver.put("msgRecTp", advicePara.getGrouptp());
		receiver.put("msgId", msgTextId);
		receiver.put("sysEventTimes", 1);
		receivers.add(receiver);
	}

	public String getTrxOperator() {
		JSONObject reqUserData = JsonHelper.getUserObject(reqData);
		return reqUserData.getString("sysUserRef");
	}

	public Object getTrxDom() {
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		return trxDom;
	}

	public String getTrxRef(String refName) {
		return UUIdGenerator.getUUId();
	}

	public String getParameterEdit(JSONObject reqData) {
		// AdvicePara advicePara = (AdvicePara) obj;
		// JSONObject adviceObj=(JSONObject) obj;
		String message = advicePara.getContent();

		// advicePara.setContent();
		int key;
		// String left="";
		String right = "";
		String keyData = "";
		String value = message;
		Object valueData="";
		JSONObject trxDom=reqData.containsKey("trxDom")?JsonHelper.getTrxObject(reqData):reqData;
		String valueString ="";
		// List<Object> value=new ArrayList<>();
		value=value.replaceAll("<p>", "");
		value=value.replaceAll("</p>", "");
		value=value.replaceAll("&lt;p&gt;", "");
		value=value.replaceAll("&lt;/p&gt;", "");
		if (value.contains("$")) {
			while (true) {
				if ((key = value.indexOf("$")) != -1) {
					right = value.substring(key + 1);
					key = right.indexOf("$");
					// value.add(right.substring(0,key));
					keyData = right.substring(0, key);
					
					right = "$" + keyData + "$";
					valueData = trxDom.containsKey(keyData) ? trxDom
							.get(keyData) : "";
					if("".equalsIgnoreCase(valueData.toString())){
						List<Map> obj = (List<Map>) (trxDom.get("data"));
						valueData = obj.get(0).containsKey(keyData)?obj.get(0).get(keyData):"";
					}
					if(valueData instanceof JSONObject){
//						JsonUtil.getMapFromJson((JSONObject)valueData);
//						valueData=map.get("")
//						System.out.println(map.size());
						Date time=(Date) JsonUtil.getDTO(valueData.toString(),Date.class);
						SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
						valueData=df.format(time);
					}else{
						if(valueData.toString().matches("^\\d{4}-\\d{2}-\\d{2}.\\d{2}:\\d{2}:\\d{2}$")){
							valueString =valueData.toString();
							valueString=valueString.replaceAll("T"," ");
							valueString=valueString.replaceAll("00:00:00", "");
						}else{
							valueString = valueData.toString();
						}
					}
					if("".equalsIgnoreCase(valueString))
					{
					    message = message.replace(right, valueData.toString());
					}else
					{
						message = message.replace(right, valueString);
					}
					value = message;
					

				} else {
					break;
				}
			}
		}
		advicePara.setContent(message);
		return null;
	}
	public String getTrxGridString(JSONObject jsonObject,String data,String key){
		List<Map> obj = (List<Map>) (jsonObject.get(data));
		if(obj.size()==1){
			return obj.get(0).get(key).toString();
		}
		return null; 
	}
	public JSONObject queryTable(String tableName,String buff,String orderBy){
		FuncDataObj adviceObj = new FuncDataObj();
		adviceObj.setReqData(reqData);
		QueryNode qn = new QueryNode();
		qn.setTablename(tableName);
		qn.setCondition(buff);
		qn.setType("E");
		if(orderBy!=null&!"".equalsIgnoreCase(orderBy))
		{
			qn.setOrderby(orderBy);
		}
		adviceObj.setReqParaObj(qn);
		IQueryComponent process = queryFactory.getProcessor(qn);
		FuncDataObj processResult = process.queryData(adviceObj);
		daoHelper.execQuery(processResult);
//		trxData
//		JSONObject trxDom=JsonHelper.getTrxObject(reqData);
//		JsonHelper data=JsonUtil.
//		JsonHelper.setTrxObject(trxDom, adviceObj.getData());
		List<Map> obj = (List<Map>) (processResult.getData().get("data"));
		if(obj.size()==0){
			return null;
		}
		if(obj.size()!=1){
			return JsonUtil.getTrxGridData(obj);
		}
			
		if(FuncDataObj.SUCCESS.equalsIgnoreCase(adviceObj.getRetStatus())){
			JSONObject jsonObject = JsonUtil.getJSON(adviceObj.getData().get("data"));
			return jsonObject;
		}
		return null;
	}
	
	public String getFuncNm(){
		ApSessionContext context = ApSessionUtil.getContext();
		Object function = context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		if(function==null){
			return "";
		}else{
			FunctionPara para = (FunctionPara) function;
			return para.getName();
		}
	}
}
