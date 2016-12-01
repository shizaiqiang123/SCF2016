package com.ut.scf.dao;

import java.util.List;

import org.springframework.util.Assert;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.string.StringUtil;

public class QueryForDaoEntity extends QueryDaoEntity{
	
	private IDaoEntity forProcess;
	
	public IDaoEntity getForProcess() {
		return forProcess;
	}

	public void setForProcess(IDaoEntity forProcess) {
		this.forProcess = forProcess;
	}

	public Object queryEntity(IBaseDao daoHelper){
		//
		Assert.isTrue(false, "Not allow access.");
		return null;
	}
	
	public Object queryHql(IBaseDao daoHelper){
		String updataSql = this.getHql();
		Object retObj = daoHelper.selectFor(updataSql, this.getParaList().toArray(new Object[this.getParaList().size()]));
		
		Object queryData = this.reformat.reformat(retObj);
		if(queryData == null){
			return queryData;
		}else{
			List<Object> paraList = forProcess.getParaList();
			for (int i = 0; i < paraList.size(); i++) {
				Object object  = paraList.get(i);
				if(object.getClass().equals(String.class)){
					String paraValue = object.toString();
					if(StringUtil.isTrimNotEmpty(paraValue)&&paraValue.startsWith("$")&&paraValue.endsWith("$")){
						paraValue = paraValue.replace("$", "");
						paraList.set(i, BeanUtils.getProperty(queryData, paraValue));
					}
				}
			}
			
			Object forObj =forProcess.doProcess(daoHelper);
			return retObj;
		}
	}
}
