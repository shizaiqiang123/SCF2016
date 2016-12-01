package com.ut.scf.core.data;

@Deprecated
public class FuncServiceDataObj extends AbsDataObject{
	/**
	 * P:pending
	 * M:master 
	 */
	private String strServiceType;

	public String getStrServiceType() {
		return strServiceType;
	}

	public void setStrServiceType(String strServiceType) {
		this.strServiceType = strServiceType;
	}
}
