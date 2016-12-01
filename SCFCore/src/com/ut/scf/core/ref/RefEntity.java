package com.ut.scf.core.ref;

public class RefEntity {
	public RefEntity(String refName,String refNo,String _key){
		this.refName = refName;
		this.refNo = refNo;
		this._key = _key;
	}
	private String refName;
	private String refNo;
	private String _key;
	public String getRefName() {
		return refName;
	}
	public void setRefName(String refName) {
		this.refName = refName;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String get_key() {
		return _key;
	}
	public void set_key(String _key) {
		this._key = _key;
	}
}
