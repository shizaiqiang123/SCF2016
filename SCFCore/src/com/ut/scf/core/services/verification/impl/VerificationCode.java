package com.ut.scf.core.services.verification.impl;

import java.sql.Timestamp;

public class VerificationCode {
	private String code;
	//秒
	private String time;
	private Timestamp createTime;
	private String key;
	private Integer inputErrorTms;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public Timestamp getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public Integer getInputErrorTms() {
		return inputErrorTms;
	}
	public void setInputErrorTms(Integer inputErrorTms) {
		this.inputErrorTms = inputErrorTms;
	}
	
	
}
