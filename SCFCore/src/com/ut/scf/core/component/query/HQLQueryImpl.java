package com.ut.scf.core.component.query;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.comm.pojo.Page;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoReformat;
import com.ut.scf.dao.QueryDaoEntity;

/**
 * @see 根据配置，通过HQL实现数据查询
 * @author PanHao
 * 
 */

@Component("hqlQuery")
public class HQLQueryImpl implements IQueryComponent {

	protected QueryNode currrentLogicObj;

	protected AbsDataObject currentDataObj;

	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		currentDataObj = logicObj;
		currrentLogicObj = (QueryNode) logicObj.getReqParaObj();

		JSONObject logicData = (JSONObject) logicObj.getReqData();
		JSONObject trxDom = JsonHelper.getTrxObject(logicData);
		final QueryNode currrentLogicObj = (QueryNode) logicObj.getReqParaObj();
		FuncDataObj retObj = new FuncDataObj();
		try {

			// 添加 hql语句
			StringBuffer hql = new StringBuffer();
			String sql = currrentLogicObj.getSql().trim();
			hql.append(sql);

			// 拼 where条件
			String condition = currrentLogicObj.getCondition();

			if ("true".equalsIgnoreCase(currrentLogicObj.getBybu())) {
				if (StringUtil.isNull(condition)) {
					condition = "";
				} else {
					condition += " and ";
				}
				ApSessionContext context = ApSessionUtil.getContext();
				String sysBusiUnit = context.getSysBusiUnit();
				if (StringUtil.isNotNull(sysBusiUnit)) {
					condition += "sysBusiUnit = '" + sysBusiUnit + "'";
				}
			} else {
			}

			condition = parseCondition(condition);
			if (StringUtil.isNotEmpty(condition)) {
				hql.append(" where ").append(condition);
			}

			// 拼orderby
			String obderBy = currrentLogicObj.getOrderby();
			if (StringUtil.isNotEmpty(obderBy)) {
				hql.append(" order by ").append(obderBy);
			}

			// 拼 排序方式
			String asc = currrentLogicObj.getAsc();
			if (StringUtil.isNotEmpty(asc)) {
				if ("Y".equalsIgnoreCase(asc.trim())) {
					hql.append(" asc");
				} else if ("N".equalsIgnoreCase(asc.trim())) {
					hql.append(" desc");
				}
			}

			// 将参数配置的固定值或者需要从前台传递的值放入list里传到后台(其中list[0]是hql语句)
			String[] params = new String[0];
			if (StringUtil.isTrimNotEmpty(currrentLogicObj.getParams())) {
				params = currrentLogicObj.getParams().split(",");
			}

			List<Object> updateParams = new ArrayList<Object>();

			List<String> paramList = Arrays.asList(params);
			for (int i = 0; i < paramList.size(); i++) {
				String param = paramList.get(i).trim();
				if (param.contains("$")) {
					String newParam = param.substring(param.indexOf("$") + 1,
							param.lastIndexOf("$"));
					Object value = trxDom.get(newParam);
					newParam = "$" + newParam + "$";
					param = param.replace(newParam,
							value == null ? "" : value.toString());
					if (param.contains(":type")) {
						updateParams.add(parseDateType(param));
					} else {
						updateParams.add(param);
					}
				}
				// if (param.startsWith("$") && param.endsWith("$")) {
				// String newParam = param.substring(1, param.length() - 1);
				// Object value = trxDom.get(newParam);
				// updateParams.add(value);
				// }
				else {
					if (param.contains(":type")) {
						updateParams.add(parseDateType(param));
					} else {
						updateParams.add(param);
					}
				}
			}

			final String tables = currrentLogicObj.getTablename();
			// String table =
			// StringUtil.isTrimEmpty(tables)?"":tables.split(",")[0];

			IDaoEntity entity = new QueryDaoEntity();
			entity.setHql(hql.toString());
			entity.setParaList(updateParams);
			entity.setCondition(condition);
			String type = currrentLogicObj.getType();
			if ("J".equalsIgnoreCase(type)) {
				entity.setType(IDaoEntity.ENTITY_TYPE_JDBC);
				String fileds = currrentLogicObj.getFields();
				final String[] fieldList = fileds.split(",");
				entity.setReformat(new IDaoReformat() {

					@Override
					public Object reformat(Object recordData) {
						if (recordData == null)
							return null;
						List<Object> retList = (List<Object>) recordData;
						List<Object> mapList = new ArrayList<Object>();
						for (Object obj : retList) {
							Object[] objs = (Object[]) obj;
							Map record = new HashMap();
							for (int i = 0; i < objs.length; i++) {
								record.put(fieldList[i], objs[i]);
							}
							mapList.add(record);
						}
						return mapList;
					}
				});
			} else {
				entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
				entity.setReformat(new IDaoReformat() {
					@Override
					public Object reformat(Object recordData) {
						if (recordData == null) {
							return null;
						} else {
							String allFields = currrentLogicObj.getFields();
							if (allFields == null
									|| allFields.trim().equals("")) {
								return recordData;
							}
							String[] fields = allFields.split(",");
							List<String> retList = Arrays.asList(fields);
							if (recordData instanceof Page) {
								if (isMutiableQuery(tables)) {
									return getMutiableResult(recordData,
											retList);
								} else {
									return recordData;
								}
							} else {

								List<Object> result = (List<Object>) recordData;
								List<Object> retListMap = new ArrayList<Object>();
								for (Object singleObj : result) {
									if (singleObj.getClass().isArray()) {
										Object[] singleData = (Object[]) singleObj;
										Map<String, Object> retMap = new HashMap<String, Object>();
										for (int i = 0; i < retList.size(); i++) {
											retMap.put(retList.get(i),
													singleData[i]);
										}
										retListMap.add(retMap);
									}else{
										Map<String, Object> retMap = new HashMap<String, Object>();
											retMap.put(retList.get(0),singleObj);
										retListMap.add(retMap);
									}
								}
								return retListMap;
							}
						}
					}
				});
			}

			entity.setTableName(tables);

			String strPage = trxDom.containsKey("page") ? trxDom
					.getString("page") : "";
			String strRows = trxDom.containsKey("rows") ? trxDom
					.getString("rows") : "";
			if (StringUtil.isTrimNotEmpty(strPage)
					&& StringUtil.isTrimNotEmpty(strRows)) {
				int page = Integer.parseInt(strPage);
				int rows = Integer.parseInt(strRows);
				Page p = new Page(page, 0, rows, new ArrayList());
				entity.setPage(p);
			}

			retObj.addExcuteEntity(entity);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return retObj;
	}

	private boolean isMutiableQuery(String strTableName) {
		if (StringUtil.isTrimEmpty(strTableName)) {
			return false;
		}
		return strTableName.contains(",");
	}

	private Object getMutiableResult(Object recordData, List<String> allFileds) {
		// catalog 都是分页查询，返回的都是Page
		Page p = (Page) recordData;
		List<Object> result = p.getData();
		List<String> retList = allFileds;
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
							retMap.put(retList.get(i), DateTimeUtil
									.getDateTime(rields[i].toString()));
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						retMap.put(retList.get(i), "");
					}

				} else if (BeanUtils.isBigDecimalType(o.getClass())) {
					retMap.put(retList.get(i), rields[i]);
				} else {
					retMap.put(retList.get(i),
							BeanUtils.getProperty(o, retList.get(i)));
				}

			}
			retListMap.add(retMap);
		}
		p.updateData(retListMap);
		return p;
	}

	private String parseCondition(String con) {
		if (StringUtil.isTrimEmpty(con))
			return "";
		con = con.replaceAll("AND", "and");

		JSONObject domData = (JSONObject) currentDataObj.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(domData);
		JSONObject userData = JsonHelper.getUserObject(domData);
		String[] sepList = con.split("and");
		for (int i = 0, len = sepList.length; i < len; i++) {
			String field = sepList[i].trim();
			if (StringUtil.isTrimEmpty(field))
				continue;

			if (field.contains("$")) {
				field = field.substring(field.indexOf("$") + 1,
						field.lastIndexOf("$"));
				String realFiled = field;
				if (field.contains(".")) {
					realFiled = field.substring(field.indexOf(".") + 1);
				}
				if (trxData.containsKey(realFiled)
						&& StringUtil.isTrimNotEmpty((String) trxData
								.get(realFiled))) {
					// retMap.put(field,domData.get(field));
					String tempField = sepList[i].trim();
					tempField = tempField.replace("$" + field + "$",
							(String) trxData.get(realFiled));
					// tempField+=domData.get(field)+;
					sepList[i] = tempField;
				}else if (userData.containsKey(realFiled)&&StringUtil.isTrimNotEmpty((String) userData.get(realFiled))){
					String tempField = sepList[i].trim();
					tempField = tempField.replace("$"+field+"$", userData.getString(realFiled));
					sepList[i] = tempField;
				} else {
					sepList[i] = "";
				}
			}
		}

		StringBuffer buff = new StringBuffer();
		for (int i = 0, len = sepList.length; i < len; i++) {
			String field = sepList[i].trim();
			if (StringUtil.isTrimEmpty(field))
				continue;
			buff.append(field).append(" and ");
		}
		if (buff.length() > 0 && buff.toString().endsWith(" and ")) {
			buff.delete(buff.length() - " and ".length(), buff.length());
		}

		return buff.toString();
	}

	private Object parseDateType(String value) {
		String strValue = value.substring(0, value.indexOf(":type"));
		String strType = value.substring(value.indexOf(":type")
				+ ":type".length());
		if (BeanUtils.isBaseJavaType(strType)) {
			Object retObj = BeanUtils.getBaseJavaObj(strValue, strType);
			if (retObj != null)
				return retObj;
		}
		return strValue;
	}
}
