package com.ut.scf.core.data;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.comm.pojo.FunctionInfo;
import com.comm.pojo.PageInfo;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonUtil;

public class ApResponse implements IApResponse{
	/**
	 * 
	 */
	private static final long serialVersionUID = -766506564762771215L;

	private boolean success = true;

	private String message;
	
	private int total;
	
	private int level;
	
	private int errorCode;
	
	private Object obj;

	private Object rows ;
	
	private FunctionInfo funcObj;
	
	private PageInfo pageInfo;
	
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public Object getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public Object getObj() {
//		if(obj instanceof String){
//			this.obj =JsonUtil.getJsonObj(obj.toString());
//		}else{
//		
//		}
		return obj;
	}

	public void setObj(Object obj) {
		if(obj instanceof Serializable){
			this.obj = (Serializable) obj;
		}else{
			try {
				this.obj = JsonUtil.getJSONString(obj);
			} catch (Exception e) {
				e.printStackTrace();
				this.obj = (Serializable) BeanUtils.toMap(obj);
			}
		}
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public FunctionInfo getFuncObj() {
		return funcObj;
	}

	public void setFuncObj(FunctionInfo funcObj) {
		this.funcObj = funcObj;
	}

	public PageInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PageInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

	@Override
	public void setRows(Map rows) {
		this.rows = rows;
	}

	@Override
	public Object unSerialize() {
		if(this.obj instanceof String){
			this.obj =JsonUtil.getJsonObj(this.obj.toString());
		}else{
		
		}
		return this;
	}
	
	public IApResponse clone() {
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		ObjectOutputStream oos;
		try {
			oos = new ObjectOutputStream(bos);
			oos.writeObject(this);
			ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(
					bos.toByteArray()));
			return (IApResponse) ois.readObject();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}
}
