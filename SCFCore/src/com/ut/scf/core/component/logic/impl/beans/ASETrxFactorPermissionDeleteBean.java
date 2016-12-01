package com.ut.scf.core.component.logic.impl.beans;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;



@Service("trxFactorPermissionDeleteProcessor")
@Scope("prototype")
public class ASETrxFactorPermissionDeleteBean extends AbsLogicCompManager {
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;


	static int BASE_REF = 1;
	protected Logger logger = LoggerFactory.getLogger(this.getClass());

	@Override
	protected void addFilterBeforeInqData(Map<String, Object> crMap) {

	}

	@Override
	protected void addFieldsBeforeInqData(List<String> filedList) {

	}

	@Override
	protected void appendOrders(List<String> orders) {

	}

	@Override
	protected void appendPostFields(List<String> updateList) {

	}

	@Override
	protected FuncDataObj execPostData() throws Exception {

		JSONObject dataObject = (JSONObject) currentDataObj.getReqData();
		FuncDataObj obj = null;
		try {
			obj = updateFactorProduct(dataObject);
			obj.mergeResponse(updateByPermission(dataObject));
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			obj.setRetStatus(ComponentConst.BUSI_COMP_RESULT_VALUE_EXCEPTION);
			obj.setRetInfo(e.getMessage());
		}
		return obj;

	}
			
	private FuncDataObj updateFactorProduct(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String factorId = trxDom.getString("sysRefNo");
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("S");
		mainLogic.setSql("update FactorProduct set sysTrxSts = 'D' where factorId =?");
		mainLogic.setParams(factorId);
		obj.setReqParaObj(mainLogic);
		obj.setReqData(trxDom);
		obj = logicFactory.getProcessor(mainLogic).postData(obj);
		return obj;
	}


	private FuncDataObj updateByPermission(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String sysBusiUnit = trxDom.containsKey("busiUnit") ? trxDom.getString("busiUnit") : "";
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("S");
		mainLogic.setSql("update StdPermissionInfo set sysTrxSts = 'D' where sysBusiUnit =?");
		mainLogic.setParams(sysBusiUnit);
		obj.setReqParaObj(mainLogic);
		obj.setReqData(trxDom);
		obj = logicFactory.getProcessor(mainLogic).postData(obj);
		return obj;
	}
	
	@Resource(name = "logicFactory")
	LogicFactoryImpl logicFactory;
	
	@Override
	protected FuncDataObj execReleaseData() throws Exception {
		FuncDataObj obj = new FuncDataObj();
		JSONObject dataDom = (JSONObject) currentDataObj.getReqData();
		String result = dataDom.getString("isAgree");
		if ("Y".equalsIgnoreCase(result)) {

			obj.mergeResponse(deleteFactorProduct(dataDom));
			obj.mergeResponse(deleteStdPermission(dataDom));

			return obj;
		} else {

			obj.buildRespose();
			return obj;
		}

	}

	private FuncDataObj deleteStdPermission(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String factorId = trxDom.getString("sysRefNo");
		String sysBusiUnit = trxDom.containsKey("busiUnit") ? trxDom.getString("busiUnit") : "";
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("S");
		mainLogic.setSql("delete from StdPermissionInfo where sysBusiUnit = ? and sysTrxSts = 'D' ");
		mainLogic.setParams(sysBusiUnit);
		obj.setReqParaObj(mainLogic);
		obj.setReqData(trxDom);
		obj = logicFactory.getProcessor(mainLogic).postData(obj);
		return obj;

	}
	
	
	private FuncDataObj deleteFactorProduct(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		JSONObject dataDom = (JSONObject) currentDataObj.getReqData();
		String factorId = dataDom.getString("sysRefNo");
		String sysBusiUnit = dataDom.containsKey("busiUnit") ? dataDom.getString("busiUnit") : "";
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("S");
		mainLogic.setSql("delete from FactorProduct where sysTrxSts = 'D' and factorId =?");
		mainLogic.setParams(factorId);
		obj.setReqParaObj(mainLogic);
		obj.setReqData(dataDom);
		obj = logicFactory.getProcessor(mainLogic).postData(obj);
		return obj;
	}
	
	protected String getOperateName() {
		return IDaoEntity.OPERATE_NAME_ADD;
	}

	@Override
	protected void resetEventTimes() {
		int maxEvent = this.context.getSysEventTimes();
		super.currentDataObj.getReqData().put("sysEventTimes", eventTimes);
	}

	/**
	 * 生成WebService请求序列号(refPreStr{2} + yyyyMMddHHmmss + NNNN{4}) 生成结构(20位) =
	 * 两位的前缀 + 当前时间(yyyyMMddHHmmss) + 4位自增序号(0001-9999)
	 * 
	 * @param refPreStr
	 *            编号前缀
	 * @return
	 * @throws Exception
	 */
	public static String getSysRef(String refPreStr) throws Exception {

		String refNo = "";

		if (null == refPreStr || "".equals(refPreStr))
			refPreStr = "REF";
		if (refPreStr.length() > 2)
			refPreStr = refPreStr.substring(0, 2);
		try {
			String sNo = "";
			if (String.valueOf(BASE_REF).length() == 1)
				sNo = "000" + BASE_REF;
			else if (String.valueOf(BASE_REF).length() == 2)
				sNo = "00" + BASE_REF;
			else if (String.valueOf(BASE_REF).length() == 3)
				sNo = "0" + BASE_REF;
			else if (String.valueOf(BASE_REF).length() == 4)
				sNo = "" + BASE_REF;
			refNo = (new Timestamp(System.currentTimeMillis())).toString();
			refNo = refNo.replaceAll("-", "").replaceAll(" ", "").replaceAll(":", "").replaceAll("\\.", "");
			refNo = refPreStr + refNo.substring(0, 14) + sNo;
			BASE_REF++;
			if (BASE_REF >= 10000)
				BASE_REF = 1;
			return refNo;
		} catch (Exception E) {
			throw E;
		}
	}

	@Override
	protected FuncDataObj afterPostData() throws Exception {
		return this.postEventData(currentDataObj.getFuncType());
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
	
}
