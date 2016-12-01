package com.ut.scf.core.data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.comm.pojo.FunctionInfo;
import com.comm.pojo.PageInfo;

public interface IApResponse extends Serializable,Cloneable{
	public String getMessage();

	public void setMessage(String message) ;

	public int getTotal() ;

	public void setTotal(int total);

	public Object getRows();

	public void setRows(List rows) ;

	public void setRows(Map rows) ;

	public int getLevel();

	public void setLevel(int level);
	
	public int getErrorCode() ;

	public void setErrorCode(int errorCode);

	public Object getObj();

	public void setObj(Object obj);

	public boolean isSuccess();

	public void setSuccess(boolean success) ;
	
	public FunctionInfo getFuncObj();

	public void setFuncObj(FunctionInfo funcObj);
	
	public PageInfo getPageInfo();

	public void setPageInfo(PageInfo pageInfo);
	
	public Object unSerialize();
	
	public IApResponse clone();
}
