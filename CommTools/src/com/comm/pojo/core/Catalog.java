package com.comm.pojo.core;

import java.io.Serializable;
import java.util.List;

public class Catalog implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String condition;
	private List<FieldDefine> select;
	private List<FieldDefine> search;
	public String getCondition() {
		return condition;
	}
	public void setCondition(String condition) {
		this.condition = condition;
	}
	public List<FieldDefine> getSelect() {
		return select;
	}
	public void setSelect(List<FieldDefine> select) {
		this.select = select;
	}
	public List<FieldDefine> getSearch() {
		return search;
	}
	public void setSearch(List<FieldDefine> search) {
		this.search = search;
	}
}
