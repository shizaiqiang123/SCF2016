package com.ut.scf.dao;

import java.io.Serializable;
import java.util.List;

import org.junit.Assert;

import com.comm.pojo.Page;

public class ExecDaoEntity implements IDaoEntity{
	private Serializable serializableEntity;
	
	private List<String> processList;
	
	private String condition;
	
	private String tableName;
	
	private String operate;
	
	private String hql;
	
	private List<Object> paraList;
	
	private String type;

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

	@Override
	public Serializable getSerializableEntity() {
		return serializableEntity;
	}

	@Override
	public void setSerializableEntity(Serializable serializableEntity) {
		this.serializableEntity = serializableEntity;
	}

	@Override
	public String getTableName() {
		return this.tableName;
	}

	@Override
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	@Override
	public String getAlias() {
		return null;
	}

	@Override
	public void setAlias(String alias) {
		
	}

	@Override
	public List<String> getOrderList() {
		Assert.fail("Needn't set excute entity Order List");
		return null;
	}

	@Override
	public void setOrderList(List<String> orderList) {
		
	}

	@Override
	public boolean isAscOrder() {
		return false;
	}

	@Override
	public void setAscOrder(boolean ascOrder) {
		
	}

	@Override
	public String getOperateName() {
		return operate;
	}

	@Override
	public void setOperateName(String name) {
		this.operate = name;
	}

	@Override
	public Page getPage() {
		return null;
	}

	@Override
	public void setPage(Page p) {
		
	}

	/**
	 * @see hql 定义规范： 
	 * 表名：使用hibernate 中定义的实体名称
	 * 更新字段：使用数据库栏位名
	 * @see sample 
	 * delete from TCntrctM where sys_Ref_No = ?
	 */
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
		
	}

	@Override
	public boolean isLockQuery() {
		return false;
	}

	@Override
	public List<Object> getParaList() {
		return paraList;
	}

	@Override
	public void setParaList(List<Object> parmList) {
		this.paraList = parmList;
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
		Object retObj = null;
		if("H".equalsIgnoreCase(this.getType())){
			retObj = execHql(daoHelper);
		}else{
			retObj = execEntity(daoHelper);
		}
		if(reformat==null){
			return retObj;
		}
			
		return reformat.reformat(retObj);
	}
	
	public Object execEntity(IBaseDao daoHelper){
		daoHelper.setEntityClass(this.getSerializableEntity().getClass());
		if(OPERATE_NAME_ADD.equalsIgnoreCase(this.getOperateName())){
			daoHelper.save(this.getSerializableEntity());
		}else if (OPERATE_NAME_UPDATE.equalsIgnoreCase(this.getOperateName())){
			daoHelper.update(this.getSerializableEntity(),this.getProcessList());
		}else if(OPERATE_NAME_DELETE.equalsIgnoreCase(this.getOperateName())){
			daoHelper.delete(this.getSerializableEntity());
		}else{
			daoHelper.saveOrUpdate(this.getSerializableEntity(),this.getProcessList());
		}
		return 0;
	}
	
	public Object execHql(IBaseDao daoHelper){
		String updataSql = this.getHql();
		Object retObj = daoHelper.excute(updataSql, this.getParaList().toArray());
		return retObj;
	}

	IDaoReformat reformat;
	@Override
	public void setReformat(IDaoReformat reformat) {
		this.reformat = reformat;
	}

	@Override
	public List<String> getDistinctList() {
		return null;
	}

	@Override
	public void setDistinctList(List<String> distinctList) {
		
	}
}
