package com.ut.scf.core.data;

import com.comm.pojo.FunctionInfo;

@Deprecated
public class InitlizePageResponse extends ApResponse {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private FunctionInfo funcObj;

	public FunctionInfo getFuncObj() {
		return funcObj;
	}

	public void setFuncObj(FunctionInfo funcObj) {
		this.funcObj = funcObj;
	}
}
