package com.ut.scf.core.component.query;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.comm.pojo.Page;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.sql.ExpressionHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoReformat;
import com.ut.scf.dao.QueryDaoEntity;
/**
 * @see 根据参数 实现实体查询
 * @author PanHao
 *
 */
@Component("entityQuery")
public class EntityQueryImpl implements IQueryComponent{

	private String strTableName;
	private String strSchema;
	private String alias;
//	@Resource(name = "commDao")
//	protected IBaseDao daoHelper;
	
//	@Resource(name = "daoHelper")
//	protected IDaoHelper daoExecHelper;
//	protected final String KEY_NAME = "key_name";
//	protected final String KEY_VALUE = "key_value";
	
	QueryNode currrentLogicObj;
	AbsDataObject currentDataObj;

	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		parseParameters(logicObj);
		QueryNode node = (QueryNode) logicObj.getReqParaObj();
		
		String componet = node.getComponent();
		
		if(ClassLoadHelper.isRegisterComponent(componet)){
			try {
				return ClassLoadHelper.getBusiComponetProcessor(componet).inqData(logicObj);
			} catch (SCFThrowableException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		String strTableName = node.getTablename();
		Assert.isTrue(StringUtil.isTrimNotEmpty(strTableName ), "Miss process table name.");
		try {
			Object enity = ClassLoadHelper.getOrmEntity(getTableNameWithSechema());
			this.alias = this.getTableNameWithoutSchema(getTableNameWithSechema());
			String queryFields = currrentLogicObj.getFields();
			List<String> filedList = ExpressionHelper.getInstence().splitToList(queryFields);

			String condition = currrentLogicObj.getCondition();
			
			if("true".equalsIgnoreCase(currrentLogicObj.getBybu())){
				if(StringUtil.isNull(condition)){
					condition = "";
				}else{
					condition +=" and ";
				}
				ApSessionContext context = ApSessionUtil.getContext();
				String sysBusiUnit = context.getSysBusiUnit();
				if(StringUtil.isNotNull(sysBusiUnit)){
					condition+= "sysBusiUnit = "+sysBusiUnit;
				}
			}else{
			}

			condition = resetQueryCondition(condition);
			
			condition = parseCondition(condition);
			
			String obderBy = currrentLogicObj.getOrderby();
			List<String> orderList = ExpressionHelper.getInstence().splitToList(obderBy);

			String asc = currrentLogicObj.getAsc();
			boolean ascOrder = "Y".equalsIgnoreCase(asc);
			
			IDaoEntity daoEntity = new QueryDaoEntity();
			daoEntity.setAlias(alias);
			daoEntity.setAscOrder(ascOrder);
			daoEntity.setCondition(condition);
			daoEntity.setOrderList(orderList);
			daoEntity.setProcessList(filedList);
			daoEntity.setSerializableEntity((Serializable) enity);
			daoEntity.setReformat(new IDaoReformat() {
				
				@Override
				public Object reformat(Object recordData) {
//					FuncDataObj obj = new FuncDataObj();
//					obj.buildRespose(recordData);
					return recordData;
				}
			});
			
			JSONObject domData = (JSONObject) logicObj.getReqData();
			JSONObject trxDom = JsonHelper.getTrxObject(domData);
			String strPage = trxDom .containsKey("page")?trxDom.getString("page"):"";
			String strRows = trxDom.containsKey("rows")?trxDom.getString("rows"):"";
			if(StringUtil.isTrimNotEmpty(strPage)&&StringUtil.isTrimNotEmpty(strRows)){
				int page = Integer.parseInt(strPage);
				int rows =  Integer.parseInt(strRows);
				Page p = new Page(page,0,rows,new ArrayList());
				daoEntity.setPage(p);
			}
			List<IDaoEntity> updateList = new ArrayList<IDaoEntity>();
			updateList.add(daoEntity);
			
			logicObj.updateEntity(currentDataObj.getDoName(), updateList);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (SCFThrowableException e) {
			e.printStackTrace();
		}
		return logicObj;
	}
	
	private String parseCondition(String con){
		if(StringUtil.isTrimEmpty(con))
			return "";
		con = con.replaceAll("AND", "and");
		
		JSONObject domData = (JSONObject) currentDataObj.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(domData);
		JSONObject userData = JsonHelper.getUserObject(domData);
		String[] sepList = con.split("and");
		for(int i=0,len = sepList.length;i<len;i++){
			String field = sepList[i].trim();
			if(StringUtil.isTrimEmpty(field))
				continue;
			if(field.contains("$")){
				field = field.substring(field.indexOf("$")+1,field.lastIndexOf("$"));
				String realFiled = field;
				if(field.contains(".")){
					realFiled = field.substring(field.indexOf(".")+1);
				}
				if(trxData.containsKey(realFiled)&&StringUtil.isTrimNotEmpty((String) trxData.get(realFiled))){
					String tempField = sepList[i].trim();
					tempField = tempField.replace("$"+field+"$",(String) trxData.get(realFiled));
					sepList[i] = tempField;
				}else if (userData.containsKey(realFiled)&&StringUtil.isTrimNotEmpty((String) userData.get(realFiled))){
					String tempField = sepList[i].trim();
					tempField = tempField.replace("$"+field+"$", userData.getString(realFiled));
					sepList[i] = tempField;
				}
				else{
					sepList[i] ="";
				}
			}
		}
		
		StringBuffer buff = new StringBuffer();
		for(int i=0,len = sepList.length;i<len;i++){
			String field = sepList[i].trim();
			if(StringUtil.isTrimEmpty(field))
				continue;
			buff.append(field).append(" and ");
		}
		if(buff.length()>0&&buff.toString().endsWith(" and ")){
			buff.delete(buff.length()-" and ".length(), buff.length());
		}
		
		return buff.toString();
	}
	
	protected void parseParameters(FuncDataObj logicObj) {
		currentDataObj = logicObj;
		currrentLogicObj = (QueryNode) logicObj.getReqParaObj();

		this.strTableName = getTableNameWithoutSchema(currrentLogicObj.getTablename());
		this.strSchema = getSchema(currrentLogicObj.getTablename());
	}
	
	protected String getTableNameWithoutSchema(String fullName) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(fullName), "Table name must not be null or empty.");
		if (fullName.indexOf(".") > -1) {
			return fullName.substring(fullName.indexOf(".") + 1);
		} else {
			return fullName;
		}
	}
	
	protected String getTableNameWithSechema() {
		return this.strSchema + "." + this.strTableName;
	}
	
	
	protected String resetQueryCondition(String condition) {
		if (StringUtil.isTrimEmpty(condition))
			return "";
		if (this.strTableName.endsWith("_E")) {
			if (condition.contains("sysRefNo") && !condition.contains("id.sysRefNo")) {
				condition = condition.replaceAll("sysRefNo", "id.sysRefNo");
			}
			if (condition.contains("sysEventTimes") && !condition.contains("id.sysEventTimes")) {
				condition = condition.replaceAll("sysEventTimes", "id.sysEventTimes");
			}
		}
		
		return condition;
	}
	
	
	protected String getSchema(String fullName) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(fullName), "Table name must bot be null or empty.");
		if (fullName.indexOf(".") > -1) {
			return fullName.substring(0, fullName.indexOf("."));
		} else {
			return fullName;
		}
	}
	
	protected String getHibernateName(String name) {
		if (StringUtil.isTrimNotEmpty(alias)) {
			return new StringBuffer().append(alias).append(".").append(name).toString();
		}
		return name;
	}
}
