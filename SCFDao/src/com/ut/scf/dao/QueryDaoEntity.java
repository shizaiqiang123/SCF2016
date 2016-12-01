package com.ut.scf.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;

import com.comm.pojo.Page;
import com.ut.scf.core.data.FuncDataObj;

public class QueryDaoEntity implements IDaoEntity{
	private Serializable serializableEntity;
	
	private String alias;
	
	private List<String> processList;
	
	private String condition;
	
	private List<String> orderList;
	
	private boolean ascOrder;
	
	private String tableName;
	
	private Page p;
	
	private String hql;
	
	private List<Object> paraList;
	
	private List<String> distinctList;
	
	private boolean isLockQuery;
	
	private String type;

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public List<String> getProcessList() {
		return processList;
	}

	public void setProcessList(List<String> processList) {
		this.processList = processList;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public List<String> getOrderList() {
		return orderList==null?new ArrayList<String>():orderList;
	}

	public void setOrderList(List<String> orderList) {
		this.orderList = orderList;
	}

	public boolean isAscOrder() {
		return ascOrder;
	}

	public void setAscOrder(boolean ascOrder) {
		this.ascOrder = ascOrder;
	}
	
	@Override
	public Serializable getSerializableEntity() {
		return serializableEntity;
	}

	@Override
	public void setSerializableEntity(Serializable serializableEntity) {
		this.serializableEntity = serializableEntity;
	}

	@Override
	public String getOperateName() {
		return OPERATE_NAME_QUERY;
	}

	@Override
	public void setOperateName(String name) {
		Assert.fail("Needn't set query entity Operate name");
	}

	@Override
	public Page getPage() {
		return p;
	}

	@Override
	public void setPage(Page p) {
		this.p = p;
	}

	@Override
	public void setHql(String hql) {
		this.hql = hql;
	}

	@Override
	public String getHql() {
		return this.hql;
	}

	@Override
	public void setLockQuery(boolean lock) {
		this.isLockQuery = lock;
	}

	@Override
	public boolean isLockQuery() {
		return this.isLockQuery;
	}

	@Override
	public List<Object> getParaList() {
		return this.paraList;
	}

	@Override
	public void setParaList(List<Object> paraList) {
		this.paraList = paraList;
	}
	
	@Override
	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String getType() {
		return this.type;
	}

	@Override
	public Object doProcess(IBaseDao daoHelper) {
		Object recordData = null;
		if(ENTITY_TYPE_HQL.equalsIgnoreCase(this.getType())){
			recordData = queryHql(daoHelper);
		}else if(ENTITY_TYPE_JDBC.equalsIgnoreCase(this.getType())){
			recordData = queryJdbc(daoHelper);
		}else{
			recordData = queryEntity(daoHelper);
		}
		if(reformat!=null)
			return reformat.reformat(recordData);
		
		FuncDataObj obj = new FuncDataObj();
		obj.buildRespose(obj);
		return obj;
	}
	
	public Object queryEntity(IBaseDao daoHelper){
		daoHelper.setEntityClass(this.getSerializableEntity().getClass());
		return daoHelper.findSpecificField(this);
	}
	
	public Object queryHql(IBaseDao daoHelper){
		String updataSql = this.getHql();
		if(getPage()!=null){
			Object retObj = daoHelper.findByHql(this);
			return retObj;
		}else{
			Object retObj = daoHelper.find(updataSql, this.getParaList().toArray());
			return retObj;
		}
	
	}
	
	public Object queryJdbc(IBaseDao daoHelper) {
		String updataSql = this.getHql();
		Object retObj = daoHelper.findBySql(this);
		return retObj;
	}
	
	IDaoReformat reformat;
	@Override
	public void setReformat(IDaoReformat reformat) {
		this.reformat = reformat;
	}

	@Override
	public List<String> getDistinctList() {
		return distinctList;
	}

	@Override
	public void setDistinctList(List<String> distinctList) {
		this.distinctList = distinctList;
	}
}
