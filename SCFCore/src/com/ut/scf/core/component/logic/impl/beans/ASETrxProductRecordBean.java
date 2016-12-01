package com.ut.scf.core.component.logic.impl.beans;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.orm.trx.StdProductPromission;

@Service("trxProductRecordProcessor")
@Scope("prototype")
public class ASETrxProductRecordBean extends AbsLogicCompManager {

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
			obj = deleteByProduct(dataObject);
			obj.mergeResponse(addProductMenuEntity(dataObject));
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			obj.setRetStatus(ComponentConst.BUSI_COMP_RESULT_VALUE_EXCEPTION);
		}
		return obj;
	}

	private FuncDataObj addProductMenuEntity(JSONObject dataObject)
			throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String menuTree = dataObject.getString("menuTree");
		if (!StringUtils.isEmpty(menuTree)) {
			String[] mTrees = menuTree.split(",");
			for (String menu : mTrees) {

				StdProductPromission entity = new StdProductPromission();
				entity.setProductId(dataObject.getString("sysRefNo"));
				entity.setPerId(menu.trim());
				entity.setSysRefNo(getSysRef("Pr"));
				entity.setSysEventTimes(1);
				IDaoEntity daoEntity = new ExecDaoEntity();
				daoEntity.setAlias(alias);
				daoEntity.setSerializableEntity((Serializable) entity);
				daoEntity.setOperateName(daoEntity.OPERATE_NAME_ADD);
				obj.addExcuteEntity(daoEntity);
			}
		}
		return obj;
	}

	private FuncDataObj deleteByProduct(JSONObject dataObject) throws Exception {
		FuncDataObj obj = new FuncDataObj();
		String menuSysRefNoTree = dataObject.getString("menuSysRefNo");
		if (!StringUtils.isEmpty(menuSysRefNoTree)) {
			String[] sysRefNos = menuSysRefNoTree.split(",");
			for (String sysRefNo : sysRefNos) {
				IDaoEntity daoEntity = new ExecDaoEntity();
				StdProductPromission entity = new StdProductPromission();
				entity.setSysRefNo(sysRefNo);
				entity.setSysEventTimes(1);
				entity.setProductId("TESTPRODUCTID");
				entity.setPerId("TESTPERID");
				daoEntity.setAlias(alias);
				daoEntity.setSerializableEntity((Serializable) entity);
				daoEntity.setOperateName(daoEntity.OPERATE_NAME_DELETE);
				obj.addExcuteEntity(daoEntity);
			}
		}
		return obj;
//		FuncDataObj obj = new FuncDataObj();
//		String productId = dataObject.getString("productId");
//		IDaoEntity daoEntity = new ExecDaoEntity();	
//		daoEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
//		daoEntity.setHql("delete from StdProductPromission where productId = ?");
//		List<Object> para = new ArrayList<Object>();
//		para.add(productId);
//		daoEntity.setParaList(para);
//		daoEntity.setTableName("std.std_product_promission");
//		daoEntity.setOperateName(daoEntity.OPERATE_NAME_DELETE);
//		obj.addExcuteEntity(daoEntity);	
//		return obj;
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
	protected FuncDataObj execReleaseData() throws Exception {
		JSONObject dataDom = (JSONObject) currentDataObj.getReqData();
		String result = dataDom.getString("isAgree");
		if ("Y".equalsIgnoreCase(result)) {
			return super.execReleaseData();
		} else {
			FuncDataObj obj = new FuncDataObj();
			obj.buildRespose();
			return obj;
		}
	}

	protected String getOperateName() {
		return IDaoEntity.OPERATE_NAME_ADD;
	}

	@Override
	protected void resetEventTimes() {
		int maxEvent = this.context.getSysEventTimes();
		super.currentDataObj.getReqData().put("sysEventTimes", eventTimes);

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
