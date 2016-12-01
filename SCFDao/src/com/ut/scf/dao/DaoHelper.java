package com.ut.scf.dao;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import com.ut.scf.core.data.FuncDataObj;

@Repository("daoHelper")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class DaoHelper implements IDaoHelper{
	@Resource(name = "commDao")
	protected IBaseDao daoHelper;
	
	@Override
	public int execUpdate(IDaoEntity execEntity) {
		daoHelper.setEntityClass(execEntity.getSerializableEntity().getClass());
		if(execEntity.OPERATE_NAME_ADD.equalsIgnoreCase(execEntity.getOperateName())){
			daoHelper.save(execEntity.getSerializableEntity());
		}else if (execEntity.OPERATE_NAME_UPDATE.equalsIgnoreCase(execEntity.getOperateName())){
			daoHelper.update(execEntity.getSerializableEntity(),execEntity.getProcessList());
		}else if(execEntity.OPERATE_NAME_DELETE.equalsIgnoreCase(execEntity.getOperateName())){
			daoHelper.delete(execEntity.getSerializableEntity());
		}else if(execEntity.OPERATE_NAME_NON.equalsIgnoreCase(execEntity.getOperateName())){
			//daoHelper.delete(execEntity.getSerializableEntity());
		}else{
			daoHelper.saveOrUpdate(execEntity.getSerializableEntity(),execEntity.getProcessList());
		}
		return 0;
	}

	@Override
	public Object execQuery(IDaoEntity queryEntity) {
		daoHelper.setEntityClass(queryEntity.getSerializableEntity().getClass());
		return queryEntity.doProcess(daoHelper);
	}

	@Override
	public Object execQuery(String querySql, Object... values) {
		return daoHelper.find(querySql, values);
	}

	@Override
	public int execUpdate(String querySql, Object... values) {
		return (Integer) daoHelper.excute(querySql, values);
	}

	@Override
	public int execBatchUpdate(List<List<String>> updateList) throws Exception {
		return (Integer) daoHelper.excuteBatch(updateList);
	}

	@Override
	public Object execQuery(FuncDataObj dataObject) {
		Map<String, List<IDaoEntity>> allExecRecords = dataObject.getUpdateEntity();
		Iterator<Entry<String, List<IDaoEntity>>> childIterator = allExecRecords.entrySet().iterator();
		while (childIterator.hasNext()) {
			Entry<String, List<IDaoEntity>> e = childIterator.next();
			List<IDaoEntity> updataEntity = e.getValue();
			for (IDaoEntity serializable : updataEntity) {
				dataObject.buildRespose(serializable.doProcess(daoHelper));
			}
		}
		
		dataObject.clearEntity();

		return dataObject;
	}
	
	@Override
	public Object execUpdate(FuncDataObj dataObject) {
		Map<String, List<IDaoEntity>> allExecRecords = dataObject.getUpdateEntity();
		Iterator<Entry<String, List<IDaoEntity>>> childIterator = allExecRecords.entrySet().iterator();
		while (childIterator.hasNext()) {
			Entry<String, List<IDaoEntity>> e = childIterator.next();
			List<IDaoEntity> updataEntity = e.getValue();
			for (IDaoEntity serializable : updataEntity) {
				dataObject.buildRespose(serializable.doProcess(daoHelper));
			}
		}
		dataObject.clearEntity();

		return dataObject;
	}

	@Override
	public Object selectFor(String querySql, Object... values) {
		return daoHelper.selectFor(querySql, values);
	}
	
	
	@Override
	public void executeOrentSql(String sql) {
		daoHelper.executeOrentSql(sql);
	}
	@Override
	public List<Map<String, Object>> executeOrentSql(String sql, String[] cols) {
		return daoHelper.executeOrentSql(sql, cols);
	}
	
	public List<Object> executeForList(String sql, String col){
		 return daoHelper.executeForList(sql, col);
	}
}
