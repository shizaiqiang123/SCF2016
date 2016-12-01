package com.ut.scf.dao;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.data.FuncDataObj;

public interface IDaoHelper {
	public int execUpdate(IDaoEntity execEntity);
	
	public Object execQuery(IDaoEntity queryEntity);
	
	public Object execQuery(String querySql,Object ... values);
	
	public int execUpdate(String querySql,Object ... values);
	
	public int execBatchUpdate(List<List<String>> updateList) throws Exception;

	public Object execQuery(FuncDataObj dataObject);

	public Object execUpdate(FuncDataObj dataObject);
	
	public Object selectFor(String querySql,Object ... values);
	
	/*
     * added by zhangyilei 2015-12-01
     */
    public void executeOrentSql(String sql);
    public List<Map<String, Object>> executeOrentSql(String sql, String[] cols);
    public List<Object> executeForList(String sql, String col);
}
