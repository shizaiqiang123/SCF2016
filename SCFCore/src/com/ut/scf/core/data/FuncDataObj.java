package com.ut.scf.core.data;

public class FuncDataObj extends AbsDataObject{
	
	private String funcType;
	
	private String mainPageType;

	public String getFuncType() {
		return funcType;
	}

	public void setFuncType(String funcType) {
		this.funcType = funcType;
	}
	
	
	public FuncDataObj clone(){
		return (FuncDataObj) super.clone();
	}

	public String getMainPageType() {
		return mainPageType;
	}

	public void setMainPageType(String mainPageType) {
		this.mainPageType = mainPageType;
	}
	
	
}
