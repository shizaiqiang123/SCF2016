package com.ut.scf.core.services.edi;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.SerializeUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.edi.EDIObject;
import com.ut.comm.xml.edi.EDIPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.core.services.edi.impl.IEDIMsgGenerate;
import com.ut.scf.orm.trx.EdiMsgDetail;

@Service("ediMsgServiceImpl")
public class EDIMsgServiceImpl extends AbsESBServiceImpl{

	/**
	 * 
	 */
	private final String EDI_TABLE_NAME = "trx.Edi_Msg_Detail";
	
	@Resource(name="ediProcessor")
	private IEDIMsgGenerate ediProcessor;
	
	@Override
	public String getServiceId() {
		return "EDI";
	}

	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:"+getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		super.getLogger().debug("destroy service success.");
	}

	private EdiMsgDetail generateEdiMsgStore(Document ediMsg,int index) {
		String id = UUIdGenerator.getUUId();
		String msgTp = ediMsg.getDocumentElement().getNodeName();
		JSONObject funcObj = JsonHelper.getFuncObject(reqObj);
		JSONObject trxObj = JsonHelper.getTrxObject(reqObj);
		int funcEvent = trxObj.containsKey("sysEventTimes")?funcObj.getInt("sysEventTimes"):1;
		EdiMsgDetail detail = new EdiMsgDetail();
		detail.setSysRefNo(id);
		detail.setFuncEventTimes(funcEvent);//默认是PM交易，申请时，event times 需要加1
		detail.setFuncId(funcObj.getString("sysFuncId"));
		detail.setFuncRef(funcObj.getString("sysRefNo"));
		detail.setMsgText(XMLManager.convertToString(ediMsg));
		detail.setMsgIndex(index);
		detail.setMsgTp(msgTp);
		detail.setSendStatus("P");
		detail.setSysEventTimes(1);
		detail.setSysOpTm(DateTimeUtil.getTimestamp());
		detail.setMsgModle("O");
		return detail;
	}
	
	private FuncDataObj updateEdiMsgStore(String msgId) throws Exception {
		FuncDataObj logicDataObj = new FuncDataObj();
		LogicNode reqParaObj = new LogicNode();
		reqParaObj.setType("E");
		reqParaObj.setTablename(EDI_TABLE_NAME);
		reqParaObj.setCascadeevent("N");
		reqParaObj.setFields("sendStatus");
		logicDataObj.setReqParaObj(reqParaObj );
		
		JSONObject submitObj = JsonUtil.clone(super.trxObj);
		submitObj.put("sendStatus","M");
		submitObj.put("sysRefNo",msgId);
		logicDataObj.setReqData(submitObj);
		
		return logicFactory.getProcessor(reqParaObj).postData(logicDataObj);
	}
	
	public List queryPara(){	
		List<String> ediRules = super.getRules();
		List<EDIObject> listEdi = new ArrayList<EDIObject>();
		for (String rule : ediRules) {
			EDIPara para = XMLParaParseHelper.parseEDIPara(rule,currentBu);
			EDIObject obj = new EDIObject();
			obj.setStatus("P");
			BeanUtils.copy(para, obj);
			listEdi.add(obj);
		}
		return listEdi;
	}
	
	public Document preViewMsg() throws Exception{
		String rule = getRuleFromReq(reqObj);
		EDIPara ediPara = XMLParaParseHelper.parseEDIPara(rule,currentBu);
		Document ediMsg = ediProcessor.generateMsg(ediPara ,super.reqObj);
		return ediMsg;
	}
	
	public List<Object> queryFromDb(){
		JSONObject funcObj = JsonHelper.getTrxObject(reqObj);
		String funcRef = funcObj.getString("sysRefNo");
		Integer funcEvent = funcObj.getInt("sysEventTimes");
		
		FuncDataObj logicDataObj = new FuncDataObj();
		
		QueryNode queryObj = new QueryNode();
		queryObj.setType("E");
		queryObj.setTablename(EDI_TABLE_NAME);
		//暂时不匹配event times
//		queryObj.setCondition("funcRef = "+funcRef+" and funcEventTimes = "+funcEvent);
		queryObj.setCondition("funcRef = "+funcRef);
		queryObj.setOrderby("msgIndex");
		queryObj.setAsc("Y");
		
		logicDataObj.setReqParaObj(queryObj );
		logicDataObj.setReqData(super.reqObj);
		
		FuncDataObj maxRecord = queryFactory.getProcessor(queryObj).queryData(logicDataObj);
		maxRecord = (FuncDataObj) this.daoExecHelper.execQuery(maxRecord);
		return (List<Object>) maxRecord.get(maxRecord.getDoName());
	}

	private String getRuleFromReq(JSONObject reqObj) {
		String rule = super.trxObj.getString("id");
		return rule;
	}

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		logicObj.buildRespose(queryFromDb());
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		Object msgContext = XMLManager.convertToString(preViewMsg());
		Object retList = SerializeUtil.serialize(msgContext);
		logicObj.buildRespose(retList);
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		logicObj.buildRespose(queryPara());
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		List<String> ediRules = super.getRules();

		FuncDataObj logicDataObj = new FuncDataObj();
		LogicNode reqParaObj = new LogicNode();
		reqParaObj.setType("E");
		reqParaObj.setTablename(EDI_TABLE_NAME);
		reqParaObj.setCascadeevent("N");
		logicDataObj.setReqParaObj(reqParaObj);

		int msgIndex = 0;
		for (String rule : ediRules) {
			try {
				EDIPara ediPara = XMLParaParseHelper.parseEDIPara(rule,currentBu);

				Document ediMsg = ediProcessor.generateMsg(ediPara, super.reqObj);

				EdiMsgDetail msgDetail = generateEdiMsgStore(ediMsg, msgIndex++);
				if ("p".equalsIgnoreCase(ediPara.getType())) {
					super.callGapiProcess(ediMsg);
					msgDetail.setSendStatus("M");
				} else {
					//不发送
				}
				JSONObject submitObj = JsonUtil.clone(super.trxObj);
				submitObj.putAll(BeanUtils.toMap(msgDetail));
				logicDataObj.setReqData(submitObj);
				dataObj.mergeResponse(logicFactory.getProcessor(reqParaObj).postData(logicDataObj));
			} catch (Exception e) {
				getLogger().error(e.toString());
			}
		}
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		List<String> ediRules = super.getRules();

		FuncDataObj logicDataObj = new FuncDataObj();
		LogicNode reqParaObj = new LogicNode();
		reqParaObj.setType("E");
		reqParaObj.setTablename(EDI_TABLE_NAME);
		reqParaObj.setCascadeevent("N");
		logicDataObj.setReqParaObj(reqParaObj);

		int msgIndex = 0;
		for (String rule : ediRules) {
			try {
				EDIPara ediPara = XMLParaParseHelper.parseEDIPara(rule,currentBu);

				Document ediMsg = ediProcessor.generateMsg(ediPara, super.reqObj);

				EdiMsgDetail msgDetail = generateEdiMsgStore(ediMsg, msgIndex++);
				super.callGapiProcess(ediMsg);
				msgDetail.setSendStatus("M");
				JSONObject submitObj = JsonUtil.clone(super.trxObj);
				submitObj.putAll(BeanUtils.toMap(msgDetail));
				logicDataObj.setReqData(submitObj);
				dataObj.mergeResponse(logicFactory.getProcessor(reqParaObj).postData(logicDataObj));
			} catch (Exception e) {
				getLogger().error(e.toString());
			}
		}
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		List<String> ediRules = super.getRules();
		
		List<Object> msgs = queryFromDb();
		
		if(ediRules.size()!=msgs.size()){
			throw new Exception("EDI message doesn't match EDI parameter, please check parameter...");
		}
		for (int i = 0; i < ediRules.size(); i++) {
			String ruleId = ediRules.get(i);
			EDIPara ediPara = XMLParaParseHelper.parseEDIPara(ruleId,currentBu);
			if("M".equalsIgnoreCase(ediPara.getType())){
				Map record = (Map) msgs.get(i);
				super.callGapiProcess(record.get("msgText"));
				String msgId = record.get("sysRefNo").toString();
				dataObj.mergeResponse(updateEdiMsgStore(msgId));
			}
		}
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		
	}

}
