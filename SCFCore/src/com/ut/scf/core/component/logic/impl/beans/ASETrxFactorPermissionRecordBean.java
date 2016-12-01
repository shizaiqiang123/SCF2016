package com.ut.scf.core.component.logic.impl.beans;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.StdPermissionInfo;
import com.ut.scf.orm.trx.StdProductPromission;


@Service("trxFactorPermissionRecordProcessor")
@Scope("prototype")
public class ASETrxFactorPermissionRecordBean extends AbsLogicCompManager {
	
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
			obj = updateByFactorId(dataObject);
			obj.mergeResponse(deleteByPermission(dataObject));
			obj.mergeResponse(addPermissionProductEntity(dataObject));
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			obj.setRetStatus(ComponentConst.BUSI_COMP_RESULT_VALUE_EXCEPTION);
			obj.setRetInfo(e.getMessage());
		}
		return obj;
	}
			
	private FuncDataObj updateByFactorId(JSONObject dataObject) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String factorId = dataObject.getString("factorId");
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("S");
		mainLogic.setSql("update FactorProduct set sysTrxSts = 'D' where factorId =?");
		mainLogic.setParams(factorId);
		obj.setReqParaObj(mainLogic);
		obj.setReqData(dataObject);
		obj = logicFactory.getProcessor(mainLogic).postData(obj);
		return obj;
	}
	private FuncDataObj deleteByPermission(JSONObject trxDom) throws Exception {
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

	private FuncDataObj addPermissionProductEntity(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String sysBusiUnit = trxDom.containsKey("busiUnit") ? trxDom.getString("busiUnit") : "";
		String sysRefNo = trxDom.getString("sysRefNo");
		String factorId = trxDom.getString("factorId");
		JSONObject products = super.getDoTrxData(trxDom, "productId");
		int totalRecords = getRecordCount(products);
		String linkTableName = "TRX.STD_PRODUCT_PROMISSION";
		for (int j = 0; j < totalRecords; j++) {

			JSONObject retTrxData = getTrxDom(products, j);
			String productId = retTrxData.containsKey("productId") ? retTrxData.getString("productId") : "";
			StringBuffer buff = new StringBuffer();
			buff.append("productId=").append(productId);
			//根据productId查询出所有的产品对应的权限
			List<Map> pers = searchFromProductPre(linkTableName, buff.toString(), trxDom);
			//将所有权限插入StdPermissionInfo表中
			for (Map stdProductPromission : pers) {

				String perId = (String) stdProductPromission.get("perId");
				StdPermissionInfo entity = new StdPermissionInfo();
				entity.setSysRefNo(getSysRef("Pe"));
				entity.setSysEventTimes(1);
				entity.setPerId(perId);
				entity.setPerName(factorId);
				entity.setSysTrxSts("P");
				entity.setSysBusiUnit(sysBusiUnit);
				IDaoEntity daoEntity = new ExecDaoEntity();
				daoEntity.setAlias(alias);
				daoEntity.setSerializableEntity((Serializable) entity);
				daoEntity.setOperateName(daoEntity.OPERATE_NAME_ADD);
				obj.addExcuteEntity(daoEntity);
			}
			
		}
		return obj;
	
	}
	
	
	private List<Map> searchFromProductPre(String linkTableName, String buff, JSONObject trxDom) throws Exception {

		QueryNode node = new QueryNode();
		node.setTablename(linkTableName);
		node.setCondition(buff);
		node.setType("E");
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDom);
		dataObj.setReqParaObj(node);
		IQueryComponent process = queryFactory.getProcessor(node);
		FuncDataObj processResult = process.queryData(dataObj);
		daoHelper.execQuery(processResult);
		List<Map> obj = (List<Map>) (processResult.getData().get("data"));
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
			obj.mergeResponse(updateFactorProduct(dataDom));
			obj.mergeResponse(deleteStdPermission(dataDom));
			obj.mergeResponse(updateStdPermission(dataDom));

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
	
	public FuncDataObj updateStdPermission(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String factorId = trxDom.getString("sysRefNo");
		String sysBusiUnit = trxDom.containsKey("busiUnit") ? trxDom.getString("busiUnit") : "";
		LogicNode mainLogic1 = new LogicNode();
		mainLogic1.setType("S");
		mainLogic1.setSql("update StdPermissionInfo set sysTrxSts = 'M' where sysBusiUnit = ? and sysTrxSts = 'P' ");
		mainLogic1.setParams(sysBusiUnit);
		obj.setReqParaObj(mainLogic1);
		obj.setReqData(trxDom);
		obj = logicFactory.getProcessor(mainLogic1).postData(obj);
		return obj;

	}

	private FuncDataObj deleteFactorProduct(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String factorId = trxDom.getString("sysRefNo");
		LogicNode mainLogic = new LogicNode();
		mainLogic.setType("S");
		mainLogic.setSql("delete from FactorProduct where sysTrxSts = 'D' and factorId =?");
		mainLogic.setParams(factorId);
		obj.setReqParaObj(mainLogic);
		obj.setReqData(trxDom);
		obj = logicFactory.getProcessor(mainLogic).postData(obj);
		return obj;
	}

	private FuncDataObj updateFactorProduct(JSONObject trxDom) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String factorId = trxDom.getString("sysRefNo");
		LogicNode mainLogic1 = new LogicNode();
		mainLogic1.setType("S");
		mainLogic1.setSql("update FactorProduct set sysTrxSts = 'M' where sysTrxSts = 'P' and factorId =?");
		mainLogic1.setParams(factorId);
		obj.setReqParaObj(mainLogic1);
		obj.setReqData(trxDom);
		obj = logicFactory.getProcessor(mainLogic1).postData(obj);
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
