package com.ut.scf.core.component.main.impl.beans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.comm.pojo.Page;
import com.comm.pojo.core.Catalog;
import com.comm.pojo.core.FieldDefine;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.catalog.CatalogPara;
import com.ut.comm.xml.catalog.CatalogOnObj;
import com.ut.comm.xml.catalog.FieldObj;
import com.ut.comm.xml.catalog.JoinObj;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.logicflow.LogicFlowPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.exception.SCFThrowableException;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.dao.IDaoReformat;

@Service("aSETrxCatalogManagerBean") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxCatalogManagerBean implements IMainComponent{
	
	protected ApSessionContext context;
	
	protected FuncDataObj logicDataObj;
	
	protected FunctionPara funcObj;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	
	protected PagePara pagePara;
	
	private String tableName;
	/**
	 * post query request and return query result list to page.
	 */
	@Deprecated
	@Override
	public Object submitData(Object paraDom) throws Exception {
		JSONObject trxData = JsonHelper.getTrxObject((JSONObject) paraDom);
		context = ApSessionUtil.getContext();
		logicDataObj = new FuncDataObj();
		logicDataObj.setReqData(trxData);
		
		funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		PagePara pagePara = (PagePara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT);
		
		String logicId = pagePara.getLogicid();
		if(StringUtil.isTrimNotEmpty(logicId)){
			LogicFlowPara logicPara =  XMLParaParseHelper.parseFuncLogicFlow(logicId,context.getSysBusiUnit());
			if (StringUtil.isTrimEmpty(pagePara.getQueryid())) {
				return null;
			}
			for (int i = 0, len = logicPara.getNodeSize(); i < len; i++) {
				LogicNode logicNode = logicPara.getLnode(i);
				try {
					logicDataObj.setReqParaObj(logicNode);
					String component = logicNode.getComponent();
					ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor(component);
					FuncDataObj processResult = t.postData(logicDataObj);
					logicDataObj.mergeResponse(processResult);
				} catch (SCFThrowableException se) {
					throw se;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		Object response = logicDataObj.buildReturnRespose();
		return response;
	}
	
	/**
	 * load catalog parameters and show on page.
	 */
	@Override
	public Object queryData(Object paraDom) throws Exception {
		logicDataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject((JSONObject) paraDom);
		context = ApSessionUtil.getContext();
		funcObj = (FunctionPara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT);
		pagePara = (PagePara) context.getAttribute(SessionObjVariable.AP_ATTRIBUTE_NAME_PAGE_OBJECT);
		logicDataObj.setReqData((JSONObject) paraDom);
		Object opType = trxData.get("cataType");
		String strOpType = opType==null?"loadData":opType.toString();
		if("loadData".equalsIgnoreCase(strOpType)){
			return loadData();
		}else{
			return loadPara();
		}
	}
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory ;
	
	
	protected FuncDataObj queryDataRecord(String cataId) throws Exception {
		if (StringUtil.isTrimNotEmpty(cataId)) {
			CatalogPara catalogObj = XMLParaParseHelper.parseFuncCatalog(cataId,context.getSysBusiUnit());
			tableName = catalogObj.getTablename();

			Assert.isTrue(StringUtil.isTrimNotEmpty(tableName), "Missing catalog table name, id is:"+cataId);
			
			boolean isMutible = isMutibleQuery(tableName);
			
			if(isMutible){
				return queryMutibleRecord(catalogObj);
			}else{
				return queryMainRecord(catalogObj);
			}
		}
		throw new Exception("Cannot find catalog id in request.");
	}
	
	private boolean isMutibleQuery(String tableName) {
		return tableName.split(",").length>1;
	}

	protected FuncDataObj queryMutibleRecord(CatalogPara catalogObj) throws Exception {
		QueryNode mainLogic = new QueryNode();
		mainLogic.setType("S");
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone();
		List<String> allFileds = new ArrayList<String>();
		mainLogic.setParams(catalogObj.getParams());
		mainLogic.setCondition(catalogObj.getCondition());
		
		tableName = catalogObj.getTablename();
		
		List<String> tableNames = new ArrayList<String>();
		String[] tables = tableName.split(",");
		for (int i = 0; i < tables.length; i++) {
			tableNames.add(tables[i]);
		}
		mainLogic.setTablename(tableName);
		List<FieldObj> selectList = catalogObj.getSelect().getSelect();
		StringBuffer buff = new StringBuffer("select ");
		List<String> distinctList = new ArrayList<String>();
		List<String> tempFieldList = new ArrayList<String>();
		for (FieldObj fieldObj : selectList) {
			String fieldName = fieldObj.getField();
			if (StringUtil.isTrimNotEmpty(fieldName)) {
				String distinct = processDistinct(fieldObj, distinctList);
				String alis = StringUtil.isTrimEmpty(fieldObj.getAlis())?fieldName:fieldObj.getAlis();
				if (StringUtil.isTrimEmpty(distinct)) {
					buff.append(fieldName).append(" as ").append(alis).append(" ,");
					allFileds.add(alis);
				}else{
					tempFieldList.add(alis);
				}
			}
		}
		if(!distinctList.isEmpty()){
			String dist = distinctList.get(0);
			dist = "select distinct "+dist+",";
			buff.replace(0, "select".length(), dist);
			
			tempFieldList.addAll(allFileds);
			
			allFileds = tempFieldList;
		}

		if (buff.length() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append(" from ");
		
		StringBuffer conBuff = new StringBuffer();
		conBuff.append(tableNames.get(0));
		
		JoinObj join=catalogObj.getJoin();
		if(join!=null){
			int size = join.size();
			for (int j = 0; j < size; j++) {
				conBuff.append(" left join ");
				conBuff.append(tableNames.get(j+1));
				conBuff.append(" on ");
				CatalogOnObj onObj = join.getOn(j);
				conBuff.append(onObj.getOn());
			}
		}
		buff.append(conBuff);

		mainLogic.setSql(buff.toString());
		mainLogic.setOrderby(catalogObj.getOrderby());
		mainLogic.setAsc(catalogObj.getAsc());
		
		dataObj.setReqParaObj(mainLogic);

		FuncDataObj mainRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);

		List<IDaoEntity> entityList = mainRecord.getEntityList(mainRecord.getDoName());
		for (IDaoEntity entity : entityList) {
			final List<String> fieldList = allFileds;
			if(StringUtil.isTrimEmpty(entity.getCondition())){
				entity.setCondition(conBuff.toString());
			}else{
				entity.setCondition(conBuff.toString()+" where "+entity.getCondition());
			}
			entity.setDistinctList(distinctList);
			entity.setProcessList(allFileds);
			entity.setType(IDaoEntity.ENTITY_TYPE_JDBC);
			entity.setReformat(new IDaoReformat() {

				@Override
				public Object reformat(Object recordData) {
					if (recordData == null) {
						return null;
					} else {
						// catalog 都是分页查询，返回的都是Page:错了，后台执行的catalog没有分页属性，后台不会分页。
						if(recordData instanceof Page){
							Page p =(Page) recordData;
							List<Object> result = p.getData();
							List<String> retList = fieldList;
							retList.add("rownum_");
							List<Object> retListMap = new ArrayList<Object>();
							for (Object singleObj : result) {
								Object[] rields = (Object[]) singleObj;
								Map<String, Object> retMap = new HashMap<String, Object>();
								for (int i = 0; i < rields.length; i++) {
									Object o = rields[i];
									if (o == null || BeanUtils.isBaseDataType(o.getClass())) {
										retMap.put(retList.get(i), rields[i]);
									} else if (BeanUtils.isDateType(o.getClass())) {
										if (rields[i] != null) {
											try {
												retMap.put(retList.get(i), DateTimeUtil.getDateTime(rields[i].toString()));
											}
											catch (Exception e) {
												e.printStackTrace();
											}
										} else {
											retMap.put(retList.get(i), "");
										}

									}else if (BeanUtils.isOracleDateType(o.getClass())) {
										if (rields[i] != null) {
											try {
												retMap.put(retList.get(i), DateTimeUtil.getOracleDateTime(rields[i]));
											}
											catch (Exception e) {
												e.printStackTrace();
											}
										} else {
											retMap.put(retList.get(i), "");
										}
									}else if (BeanUtils.isBigDecimalType(o.getClass())) {
										retMap.put(retList.get(i), rields[i]);
									} else {
										retMap.put(retList.get(i), BeanUtils.getProperty(o, retList.get(i)));
									}

								}
								retListMap.add(retMap);
							}
							p.updateData(retListMap);
							return p;
						}else{
							List<Object> result = (List<Object>) recordData;
							List<String> retList = fieldList;
							List<Object> retListMap = new ArrayList<Object>();
							for (Object singleObj : result) {
								if(singleObj.getClass().isArray() ){
									Object [] singleData = (Object[]) singleObj;
									Map<String, Object> retMap = new HashMap<String, Object>();
									for (int i = 0; i < retList.size(); i++) {
										Object o = singleData[i];
										if (o == null || BeanUtils.isBaseDataType(o.getClass())) {
											retMap.put(retList.get(i), singleData[i]);
										} else if (BeanUtils.isDateType(o.getClass())) {
											if (singleData[i] != null) {
												try {
													retMap.put(retList.get(i), DateTimeUtil.getDateTime(singleData[i].toString()));
												}
												catch (Exception e) {
													e.printStackTrace();
												}
											} else {
												retMap.put(retList.get(i), "");
											}

										}else if (BeanUtils.isOracleDateType(o.getClass())) {
											if (singleData[i] != null) {
												try {
													retMap.put(retList.get(i), DateTimeUtil.getOracleDateTime(singleData[i]));
												}
												catch (Exception e) {
													e.printStackTrace();
												}
											} else {
												retMap.put(retList.get(i), "");
											}
										}else if (BeanUtils.isBigDecimalType(o.getClass())) {
											retMap.put(retList.get(i), singleData[i]);
										} else {
											retMap.put(retList.get(i), BeanUtils.getProperty(o, retList.get(i)));
										}

									}
									retListMap.add(retMap);
								}else{
									retListMap.add(singleObj);
								}
							}
							return retListMap;
						}
					}
				}
			});
		}

		this.daoHelper.execQuery(mainRecord);

		return mainRecord;
	}
	
	protected FuncDataObj queryMainRecord(CatalogPara catalogObj) throws Exception {
		QueryNode mainLogic = new QueryNode();
		mainLogic.setType("E");
		mainLogic.setComponent("");
		FuncDataObj dataObj = (FuncDataObj) this.logicDataObj.clone();
		List<String> allFileds = new ArrayList<String>();
		List<String> distinctList = new ArrayList<String>();
		
		if("true".equalsIgnoreCase(catalogObj.getBybu())){
			String strCondition = catalogObj.getCondition();
			ApSessionContext context = ApSessionUtil.getContext();
			String sysBusiUnit = context.getSysBusiUnit();
			if(StringUtil.isNotNull(sysBusiUnit)){
				strCondition+= "and sysBusiUnit = "+sysBusiUnit;
			}
			mainLogic.setCondition(strCondition);
		}else{
			mainLogic.setCondition(catalogObj.getCondition());
		}
		
		tableName = catalogObj.getTablename();
		mainLogic.setTablename(tableName);

		List<FieldObj> selectList = catalogObj.getSelect().getSelect();
		StringBuffer buff = new StringBuffer();
		for (FieldObj fieldObj : selectList) {
			String fieldName = fieldObj.getField();
			if (StringUtil.isTrimNotEmpty(fieldName)) {
				String distinct = processDistinct(fieldObj, distinctList);
				if (StringUtil.isTrimEmpty(distinct)) {
					buff.append(converKeyField(fieldName)).append(",");
				}
				allFileds.add(fieldName);
			}
		}
		// default add sysFuncId
		if (!allFileds.contains("sysFuncId")) {
			allFileds.add("sysFuncId");
			buff.append("sysFuncId").append(",");
		}

		if (buff.length() > 0) {
			buff.deleteCharAt(buff.length() - 1);
		}

		mainLogic.setFields(buff.toString());
		mainLogic.setOrderby(catalogObj.getOrderby());
		dataObj.setReqParaObj(mainLogic);
		
		if(JsonHelper.hasWorkflowObject(dataObj.getReqData())){
			JSONObject trxJson = JsonHelper.getTrxObject(dataObj.getReqData());
			trxJson.putAll(JsonHelper.getWorkflowObject(dataObj.getReqData()));
		}

		FuncDataObj mainRecord = queryFactory.getProcessor(mainLogic).queryData(dataObj);
		
		List<IDaoEntity> entityList = mainRecord.getEntityList(mainRecord.getDoName());
		for (IDaoEntity entity : entityList) {
			final List<String> fieldList = allFileds;
			entity.setReformat(new IDaoReformat() {
				@Override
				public Object reformat(Object recordData) {
					if (recordData == null) {
						return null;
					} else {
						if(recordData instanceof Page){
							Page p =(Page) recordData;
							resetRersult(p);
							List<Object> result = p.getData();
							List<String> retList = fieldList;
							List<Object> retListMap = new ArrayList<Object>();
							for (Object singleObj : result) {
								Map record = (Map) singleObj;
								Map<String, Object> retMap = new HashMap<String, Object>();

								for (String string : retList) {
									retMap.put(string, record.get(string));
								}

								retListMap.add(retMap);
							}
							p.updateData(retListMap);
							return p;
						}else{
							List<Object> result = (List<Object>) recordData;
							List<String> retList = fieldList;
							List<Object> retListMap = new ArrayList<Object>();
							for (Object singleObj : result) {
								if(singleObj.getClass().isArray() ){
									Object [] singleData = (Object[]) singleObj;
									Map<String, Object> retMap = new HashMap<String, Object>();
									for (int i = 0; i < retList.size(); i++) {
										retMap.put(retList.get(i), singleData[i]);
									}
									retListMap.add(retMap);
								}else{
									retListMap.add(singleObj);
								}
							}
							return retListMap;
						}
						
					}
				}
			});
			entity.setDistinctList(distinctList);
		}

		this.daoHelper.execQuery(mainRecord);

		return mainRecord;
	}
	
	private void resetRersult(Page retObj) {
		List<Object> entityList = (List<Object>) retObj.getData();
		List<Object> retList = new ArrayList<Object>();
		for (Object object : entityList) {
			Map tempMap = new HashMap();
			if (Map.class.isAssignableFrom(object.getClass())) {
				tempMap.putAll((Map) object);
			} else if(object.getClass().isArray() ){
				
			}else {
				tempMap.putAll(BeanUtils.toMap(object));
			}

			if (tempMap.containsKey("id")) {
				Object idObj = tempMap.get("id");
				if (idObj != null) {
					tempMap.putAll(BeanUtils.toMap(idObj));
					tempMap.remove("id");
				}
			}
			retList.add(tempMap);
		}
		retObj.updateData(retList);
	}
	
	private static Map<String,String> keyMap = new HashMap<String,String>();
	static{
		keyMap.put("sysRefNo", "id");
		keyMap.put("sysEventTimes", "id");
	}
	private String converKeyField(String fieldName){
		if(keyMap.containsKey(fieldName)&&tableName.toUpperCase().endsWith("_E"))
			return keyMap.get(fieldName);
		return fieldName;
	}

	/**
	 * clear session and parameter load.
	 */
	@Override
	public Object cancelData(Object paraDom) throws Exception {
		logicDataObj = new FuncDataObj();
		Object response = logicDataObj.buildReturnRespose();
		return response;
	}
	
	public Object loadData() throws Exception {
		String cataId ="";
		JSONObject reqData = logicDataObj.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		cataId = trxData.containsKey("cataId")?trxData.getString("cataId"):"";
		if(StringUtil.isTrimEmpty(cataId)){
			cataId = pagePara.getCatalog();
		}
		
		FuncDataObj mainRecord = queryDataRecord(cataId);
		logicDataObj.mergeResponse(mainRecord);

		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;
	}
	
	public Object loadPara() {
		String cataId = pagePara.getCatalog();
		IApResponse retObj = new ApResponse();
		if (StringUtil.isTrimNotEmpty(cataId)) {
			CatalogPara catalogObj = XMLParaParseHelper.parseFuncCatalog(cataId,context.getSysBusiUnit());
			Catalog catalog = new Catalog();
			catalog.setCondition(catalogObj.getCondition());
			List<FieldObj> searchList = catalogObj.getSearch() == null ? null : catalogObj.getSearch().getSearch();
			List<FieldDefine> search = new ArrayList<FieldDefine>();
			if (searchList != null) {
				for (FieldObj fieldObj : searchList) {
					FieldDefine f = new FieldDefine();
					BeanUtils.copy(fieldObj, f);
					search.add(f);
				}
			}

			catalog.setSearch(search);

			List<FieldObj> selectList = catalogObj.getSelect() == null ? null : catalogObj.getSelect().getSelect();
			List<FieldDefine> select = new ArrayList<FieldDefine>();
			if (selectList != null) {
				for (FieldObj fieldObj : selectList) {
					FieldDefine f = new FieldDefine();
					BeanUtils.copy(fieldObj, f);
					if(StringUtil.isTrimNotEmpty(fieldObj.getAlis()))
						f.setField(fieldObj.getAlis());
					select.add(f);
				}
			}
			catalog.setSelect(select);

			retObj.setSuccess(true);
			retObj.setObj(catalog);
		}
		return retObj;
	}
	
	protected String processDistinct(FieldObj field,List<String> distinctList){
		if(field.getDistinct()!=null&&"true".equalsIgnoreCase(field.getDistinct())){
			distinctList.add(field.getField());
			return field.getField();
		}
		return "";
	}


}
