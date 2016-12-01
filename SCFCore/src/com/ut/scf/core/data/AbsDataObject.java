package com.ut.scf.core.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.util.Assert;

import net.sf.json.JSONObject;

import com.comm.pojo.Page;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.scf.dao.IDaoEntity;

public abstract class AbsDataObject implements Cloneable{
	public static final String SUCCESS = "success";
	public static final String FAILED = "failed";
	public static final String EXCEPTION = "exception";
	
	public static final int INFO = 0;
	public static final int WARN = 1;
	public static final int ERROR = 2;

	private static final String ROOT_DO_NAME = "data";
	private String doName;// Data Object name

	// from page
	private JSONObject reqData;

	// from xml para
	private AbsObject reqParaObj;
	
	// 待执行的数据对象
	private Map<String,List<IDaoEntity>> executeMap= new HashMap<String, List<IDaoEntity>>();
	
	/**
	 * key : do name
	 * value: string[0] 待执行SQL string[...] 执行参数
	 * 
	 */
//	private Map<String,List<Object>> executeSQL= new HashMap<String,List<Object>>();

	private String retStatus;

	private StringBuffer infoBuff = new StringBuffer();

	private Map<String, Object> data = new HashMap<String, Object>();
	
	private int level=0;

	public boolean hasRecord() {
		Object obj = data.get(ROOT_DO_NAME);
		if(obj==null){
			return false;
		}else if (List.class.isAssignableFrom(obj.getClass())) {
			List<Object> entityList = (List<Object>) obj;
			return !entityList.isEmpty();
		} else if (Map.class.isAssignableFrom(obj.getClass())) {
			Map entityMap = (Map) obj;
			return !entityMap.isEmpty();
		}
		return !data.isEmpty();
	}
	
	public Object getReturnObj(){
		String doName = ROOT_DO_NAME;
		if(StringUtil.isTrimNotEmpty(this.getDoName())){
			doName = this.getDoName();
		}
		return data.get(doName);
	}
	
	public Object buildReturnRespose(String strReqType) {
		IApResponse obj = new ApResponse();
		obj.setSuccess(SUCCESS.equalsIgnoreCase(this.getRetStatus()));
		
		if(ROOT_DO_NAME.equalsIgnoreCase(this.getDoName())||StringUtil.isTrimEmpty(this.getDoName())){
			if(data.isEmpty()){
				if(!"Ajax".equalsIgnoreCase(strReqType)){
					obj.setObj(reqData);
				}
			}else{
				Object objData = data.get(ROOT_DO_NAME);
				if (List.class.isAssignableFrom(objData.getClass())) {
					//一般非分页查询都是返回List对象
					List<Object> entityList = (List<Object>) objData;
					if("Ajax".equalsIgnoreCase(strReqType)){
						obj.setTotal(entityList.size());
						obj.setRows(entityList);
					}else{
						if(entityList.isEmpty()){
							obj.setTotal(0);
						}else{
							if(entityList.size() ==1){
								obj.setObj(entityList.get(0));
								obj.setTotal(1);
							}else{
								obj.setTotal(entityList.size());
								obj.setRows(entityList);
							}
						}
					}
				} else if(Page.class.isAssignableFrom(objData.getClass())){
					//只有分页查询返回的是Page对象
					Page p = (Page) objData;
					obj.setTotal(p.getTotalCount());
					obj.setRows(p.getData());
				} else if(Map.class.isAssignableFrom(objData.getClass())){
					Map<String,Object> entityList = (Map<String,Object>) objData;
					obj.setTotal(entityList.size());
					obj.setRows(entityList);
				}else{
					obj.setObj(objData);
					obj.setTotal(1);
				}
			}
		
		}else{
			//待完善
			obj.setObj(data.get(this.getDoName()));
		}

		obj.setLevel(level);
		obj.setMessage(infoBuff.toString());

		//保证查询的输入值，保存到下一次请求中，如catalog中选中的记录，必须在下一个页面的查询中能够取到
		if(obj.getObj()==null){
			if(!"Ajax".equalsIgnoreCase(strReqType)){
				obj.setObj(reqData);
			}
		}
		
		return obj;
	}
	
	public Object buildReturnRespose() {
		Object reqType = reqData==null?null:((JSONObject)this.reqData).get("reqType");
		String strReqType = reqType==null?"":reqType.toString();
		return buildReturnRespose(strReqType);
	}

	public void buildRespose() {
		this.setRetStatus(SUCCESS);
	}
//	public void buildRespose(Object entity) {
//		buildRespose(entity);
//	}

	public void buildRespose(Object entity) {
		try {
			this.setRetStatus(SUCCESS);
			if(entity==null){
				data.put(ROOT_DO_NAME, entity);
				return;
			}
			if (ROOT_DO_NAME.equalsIgnoreCase(this.getDoName())) {
				//如果没有指定查询的目标节点，默认放在 data 节点下
				Class<?> entityClass = entity.getClass();
				if (List.class.isAssignableFrom(entityClass)) {
					//一般非分页查询都是返回List对象
					List<Object> entityList = (List<Object>) entity;
					
					data.put(ROOT_DO_NAME, resetRersult(entityList));
				}else if (Map.class.isAssignableFrom(entityClass)) {
					//一般非分页查询都是返回List对象
					Map<String,Object> entityList = (Map<String,Object>) entity;
					
					data.put(ROOT_DO_NAME, entityList);
				}else if(BeanUtils.isBaseDataType(entityClass)){
					data.put(ROOT_DO_NAME, entity);
				}else if(Page.class.isAssignableFrom(entityClass)){
					//只有分页查询返回的是Page对象
					//原逻辑：将对象属性展开到Map中
//					BeanUtils.populateData(entity, data,fieldList);
					
					//新逻辑：保留对象结构在Map中
					Page p = (Page) entity;
					resetRersult(p);
//					p.updateData(resetRersult(p.getData()));
					data.put(ROOT_DO_NAME, entity);
				}else{
					data.put(ROOT_DO_NAME, entity);
				}
			} else {
				//如果指定了目标节点，将返回结果放在目标节点下
				
				Map<String, Object> newData = (Map<String, Object>) (data.containsKey(this.getDoName())?data.get(this.getDoName()):new HashMap<String, Object>());
				newData.put(ROOT_DO_NAME, entity);
				data.put(this.getDoName(), newData);
			}
		} catch (IllegalArgumentException e) {
			this.setRetStatus(EXCEPTION);
			e.printStackTrace();
		}  catch (Exception e) {
			this.setRetStatus(EXCEPTION);
			e.printStackTrace();
		}
	}
	
	private void resetRersult(Page retObj) {
		List<Object> entityList = (List<Object>) retObj.getData();
		List<Object> retList = new ArrayList<Object>();
		for (Object object : entityList) {
			Map tempMap = new HashMap();
			if(Map.class.isAssignableFrom(object.getClass())){
				tempMap.putAll((Map) object);
			}else{
				tempMap.putAll(BeanUtils.toMap(object));
			}
			
			if(tempMap.containsKey("id")){
				Object idObj = tempMap.get("id");
				if(idObj!=null){
					tempMap.putAll(BeanUtils.toMap(idObj));
					tempMap.remove("id");
				}
			}
			retList.add(tempMap);
		}
		retObj.updateData(retList);
	}
	
	private List<Object> resetRersult(List<Object> entityList) {
		List<Object> retList = new ArrayList<Object>();
		for (Object object : entityList) {
			if(object==null){
//				retList.add(object);
			}else if (object.getClass().isArray()) {
				retList.add(object);
			} else if (BeanUtils.isBaseJavaType(object.getClass())) {
				retList.add(object);
			} else {
				Map tempMap = new HashMap();
				tempMap.putAll(BeanUtils.toMap(object));
				if (tempMap.containsKey("id")) {
					Object idObj = tempMap.get("id");
					tempMap.putAll(BeanUtils.toMap(idObj));
					if (!BeanUtils.isBaseJavaType(idObj.getClass())) {
						tempMap.remove("id");
					}
				}
				retList.add(tempMap);
			}
		}
		return retList;
	}

	public void mergeResponse(AbsDataObject obj) {
		if (obj == null)
			return;
		if (obj.getRetStatus().compareTo(this.getRetStatus()) <= 0) {
			this.setRetStatus(obj.getRetStatus());
			this.appendRetInfo(obj.getRetInfo());
		}

		if (obj.hasRecord()){
			String sourceName = obj.getDoName();
			if (ROOT_DO_NAME.equalsIgnoreCase(sourceName)) {
				this.getData().putAll(obj.getData());
			} else if (this.data.containsKey(sourceName)) {
				Map target = (Map) this.get(sourceName);
				target.clear();
				target.putAll(obj.getData());
			} else {
				this.data.put(sourceName, obj.getData());
			}
		}
		
		mergeEntityList(obj);
	}
	
	private void mergeEntityList(AbsDataObject obj) {
		Map<String, List<IDaoEntity>> myMap = obj.getUpdateEntity();
		if (myMap != null && !myMap.isEmpty()) {
			Set<Entry<String, List<IDaoEntity>>> set = myMap.entrySet();
			for (Entry<String, List<IDaoEntity>> entry : set) {
				if(entry.getValue()!=null)
					this.updateEntity(entry.getKey(), entry.getValue());
			}
		}
	}
	
	/**
	 * @see 从查询结果中查找属性值，客户端忽略返回值类型
	 * 如果返回的是List， 默认取List<0>中对应的属性值
	 * 如果返回的是Map，直接取map中的属性值
	 * 
	 * @param retInfo
	 */
	public void appendRetInfo(String retInfo) {
		this.infoBuff.append(retInfo);
	}
	
	public String getString(String key){
		Object keyObj = get(key);
		if(keyObj==null)
		Assert.isTrue(keyObj!=null,"Canot read Field:"+key);	
		return keyObj.toString();
	}
	
	public Integer getInteger(String key){
		String keyStr = getString(key);
		try{
			return Integer.parseInt(keyStr);
		}catch(Exception e){
			Assert.isTrue(false,"Canot parse Field:"+key);	
			return 0;
		}
	}

	public Object get(String key) {
		if(key.indexOf(".")>-1){
			String parentName=key.substring(0,key.indexOf("."));
			if (!data.containsKey(parentName))
				return "";
			key = key.substring(key.indexOf(".")+1);
			Object childObj = data.get(parentName);
			if (List.class.isAssignableFrom(childObj.getClass())) {
				List child = (List) childObj;
				if(child!=null&&!child.isEmpty()){
					Object obj = child.get(0);
					if (Map.class.isAssignableFrom(obj.getClass())) {
						Map childMap = (Map) obj;
						return childMap.get(key);
					}else if (String.class.isAssignableFrom(obj.getClass())) {
						return obj.toString();
					}else{
						return BeanUtils.getProperty(obj, key);
					}
				}
				return "";
			}
			
			if (Map.class.isAssignableFrom(childObj.getClass())) {
				Map child = (Map) childObj;
				return child.get(key);
			}

			return BeanUtils.getProperty(childObj, key);
		}else{
			if (!data.containsKey(key)){
				return get(this.ROOT_DO_NAME+"."+key);
			}
			return data.get(key);
		}
	}

	public void update(String key, Object value) {
		data.put(key, value);
	}

	public void delete(String key) {
		if (!data.containsKey(key))
			return;

		data.remove(key);
	}

	public String getRetStatus() {
		return StringUtil.isTrimEmpty(retStatus) ? SUCCESS : retStatus;
	}

	public void setRetStatus(String retType) {
		
		this.retStatus = retType;
	}

	public String getRetInfo() {
		return infoBuff.toString();
	}

	public void setRetInfo(String retInfo) {
		infoBuff.append(retInfo);
	}

	public void clearRetInfo() {
		infoBuff.setLength(0);
	}

	public JSONObject getReqData() {
		return reqData;
	}

	public void setReqData(JSONObject reqDomData) {
		this.reqData = reqDomData;
	}

	public AbsObject getReqParaObj() {
		return reqParaObj;
	}

	public void setReqParaObj(AbsObject reqParaObj) {
		this.reqParaObj = reqParaObj;
	}

	public String getDoName() {
		if (StringUtil.isTrimEmpty(doName))
			return ROOT_DO_NAME;
		return doName;
	}

	public void setDoName(String doName) {
		this.doName = doName;
	}

	public Map<String, Object> getData() {
		return data;
	}

	public List<IDaoEntity> getEntityList(String entityName){
		if(this.executeMap.containsKey(entityName))
			return this.executeMap.get(entityName);
		else
			return new ArrayList<IDaoEntity>();
	}
	
	/**
	 * 获取所有待更新/查询的实体类
	 * key : do name
	 * value : 待更新的记录
	 * @return Map
	 */
	public Map<String,List<IDaoEntity>> getUpdateEntity(){
		return this.executeMap;
	}

	public void addUpdateEntity(String entityName, List<IDaoEntity> entityList){
		this.executeMap.put(entityName, entityList);
	}
	
	public void addUpdateEntity(String entityName, IDaoEntity entity) {
		List<IDaoEntity> update = this.executeMap.containsKey(entityName) ? this.executeMap.get(entityName)
				: new ArrayList<IDaoEntity>();
		update.add(entity);
		this.executeMap.put(entityName, update);
	}
	
	public void updateEntity(String entityName, List<IDaoEntity> entityList){
		if(this.executeMap.containsKey(entityName)){
			getEntityList(entityName).addAll(entityList);
		}else
			addUpdateEntity(entityName, entityList);
	}
	
	public void addExcuteEntity(IDaoEntity entity){
		addUpdateEntity(ROOT_DO_NAME, entity);
	}
	public List<IDaoEntity> getAllExcuteEntity(){
		return (List<IDaoEntity>) this.executeMap.get(ROOT_DO_NAME);
	}
	public void clearEntity(){
		this.executeMap.clear();
	}
	
	public void clearEntity(String key){
		this.executeMap.remove(key);
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}
	
	public AbsDataObject clone(){
		AbsDataObject o = null;
		try {
			o = (AbsDataObject) super.clone();
			JSONObject oldReq = this.getReqData();
			if(oldReq!=null){
				o.reqData = JsonUtil.clone(oldReq);
			}
			
		} catch (CloneNotSupportedException e) {
		} 
		return o;
	}
	
	
}
