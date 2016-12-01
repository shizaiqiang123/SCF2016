package com.ut.dtc.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IBaseDao;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.QueryDaoEntity;

public class DBUtil {
	private static final String DB_IMPL_NAME = "daoHelper";
	
	public static List<Object []> queryData(String sql,List<Object> parms){
		List<Object []> retList = new ArrayList<Object []>();
		try {
			IBaseDao helper = ClassLoadHelper.getComponentClass("commDao");
			IDaoEntity entity = new QueryDaoEntity();
			entity.setHql(sql);
			entity.setParaList(parms);
			entity.setCondition("");
			
			Object ret = helper.findBySql(entity);
			if(ret!=null&&ret instanceof List){
				retList.addAll((Collection<? extends Object []>) ret);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retList;
	}
	
	public static int countData(String sql,List<Object> parms){
		try {
			IBaseDao helper = ClassLoadHelper.getComponentClass("commDao");
			IDaoEntity entity = new QueryDaoEntity();
			entity.setHql(sql);
			entity.setParaList(parms);
			entity.setCondition("");
			
			Object ret = helper.findBySql(entity);
			if(ret!=null&&ret instanceof List){
				return ((List)ret).size();
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	public static int updateData(String sql,List<Object> parms){
		try {
			IBaseDao helper = ClassLoadHelper.getComponentClass("commDao");
			IDaoEntity entity = new ExecDaoEntity();
			entity.setHql(sql);
			entity.setParaList(parms);
			entity.setCondition("");
			Object ret = helper.excuteJdbc(sql,parms.toArray(new Object[parms.size()]));
			return 0;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return 0;
	}
	
	public static int saveData(Object obj){
		try {
			IBaseDao helper = ClassLoadHelper.getComponentClass("commDao");
			helper.save(obj);
			return 0;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		
		return 0;
	}
}
