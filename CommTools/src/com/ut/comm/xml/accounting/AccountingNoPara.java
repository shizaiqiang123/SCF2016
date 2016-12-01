package com.ut.comm.xml.accounting;

import com.ut.comm.xml.AbsObject;

public class AccountingNoPara extends AbsObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String type;
	
	private String desc;
	
	private String account;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	@Override
	public String getNodeName() {
		return "account";
	}

}
