package com.ut.scf.dao;

import java.io.Serializable;
import java.util.List;

import com.comm.pojo.Page;

public interface IDaoEntity{
	
	public final String OPERATE_NAME_QUERY = "QUERY";
	
	public final String OPERATE_NAME_DELETE = "DELETE";
	
	public final String OPERATE_NAME_UPDATE = "UPDATE";
	
	public final String OPERATE_NAME_NON = "NON";
	
	public final String OPERATE_NAME_ADD = "ADD";
	
	public final String OPERATE_NAME_ADD_OR_UPDATE = "ADDORUPDATE";
	
	public final String ENTITY_TYPE_ENTITY = "E";
	
	public final String ENTITY_TYPE_HQL = "H";
	
	public final String ENTITY_TYPE_JDBC = "J";
	
	public Serializable getSerializableEntity();

	public void setSerializableEntity(Serializable serializableEntity);

	public List<String> getProcessList();

	public void setProcessList(List<String> processList);

	public String getCondition();

	public void setCondition(String condition);
	
	public String getTableName();

	public void setTableName(String tableName);

	public String getAlias();

	public void setAlias(String alias);
	
	public List<String> getOrderList();

	public void setOrderList(List<String> orderList);

	public boolean isAscOrder();

	public void setAscOrder(boolean ascOrder);
	
	public String getOperateName();

	public void setOperateName(String name);
	
	public Page getPage();
	
	public void setPage(Page p);
	
	public void setHql(String hql);
	
	public String getHql();
	
	public void setLockQuery(boolean lock);
	
	public boolean isLockQuery();
	
	public List<Object> getParaList();

	public void setParaList(List<Object> paraList);
	
	public void setType(String type);
	
	public String getType();
	
	public Object doProcess(IBaseDao daoHelper);
	
	public void setReformat(IDaoReformat reformat);
	
	public List<String> getDistinctList();

	public void setDistinctList(List<String> distinctList);
}
