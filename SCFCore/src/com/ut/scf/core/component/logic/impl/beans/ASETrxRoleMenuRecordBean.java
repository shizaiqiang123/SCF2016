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
import com.ut.scf.orm.std.StdRoleMenu;

@Service("trxRoleMenuRecordProcessor")
@Scope("prototype")
public class ASETrxRoleMenuRecordBean extends AbsLogicCompManager {

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
			obj = deleteByRoleMenu(dataObject);
			obj.mergeResponse(addRoleMenuEntity(dataObject));
		}
		catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();			
			obj.setRetStatus(ComponentConst.BUSI_COMP_RESULT_VALUE_EXCEPTION);
		}
		return obj;		
	}

	private FuncDataObj addRoleMenuEntity(JSONObject dataObject) throws Exception {
		FuncDataObj obj = new FuncDataObj();		
		String menuTree = dataObject.getString("menuTree");
		if(!StringUtils.isEmpty(menuTree)){
			String[] menuTrees = menuTree.split(",");		
			for(String menu : menuTrees){
				
				StdRoleMenu  roleMenu = new StdRoleMenu();
				roleMenu.setRoleId(dataObject.getString("roleId"));
				roleMenu.setMenuId(menu.trim());
				roleMenu.setSysRefNo(getSysRef("Ro"));
				roleMenu.setSysEventTimes(1);
				IDaoEntity daoEntity = new ExecDaoEntity();		
				daoEntity.setAlias(alias);		
				daoEntity.setSerializableEntity((Serializable) roleMenu);				
				daoEntity.setOperateName(daoEntity.OPERATE_NAME_ADD);					
				obj.addExcuteEntity(daoEntity);					
			}
		}		
		return obj;
	}
	
	private FuncDataObj deleteByRoleMenu(JSONObject dataObject) throws Exception{
		FuncDataObj obj = new FuncDataObj();	
		String roleId = dataObject.getString("roleId");
		IDaoEntity daoEntity = new ExecDaoEntity();	
		daoEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		daoEntity.setHql("delete from StdRoleMenu where roleId = ?");
		List<Object> para = new ArrayList<Object>();
		para.add(roleId);
		daoEntity.setParaList(para);
		daoEntity.setTableName("std.Std_Role_Menu");
		daoEntity.setOperateName(daoEntity.OPERATE_NAME_DELETE);
		obj.addExcuteEntity(daoEntity);	
		return obj;
	}

	/**
	 * 生成WebService请求序列号(refPreStr{2} + yyyyMMddHHmmss + NNNN{4})
	 * 生成结构(20位) = 两位的前缀 + 当前时间(yyyyMMddHHmmss) + 4位自增序号(0001-9999)
	 * @param refPreStr 编号前缀
	 * @return
	 * @throws Exception
	 */
	   public static String getSysRef(String refPreStr) throws Exception {
		
		String refNo = "";

		if ( null == refPreStr || "".equals(refPreStr))
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
			refNo = refNo.replaceAll("-", "").replaceAll(" ", "").replaceAll(
					":", "").replaceAll("\\.", "");
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

	
	

	protected String getOperateName() {
		return IDaoEntity.OPERATE_NAME_ADD;
	}

	@Override
	protected void resetEventTimes() {
		
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
