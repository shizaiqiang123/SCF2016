package com.ut.scf.core.workflow;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

public class Procinstance implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5349180327058253604L;

	private String priId;
	private String priNm;
	private String priCreator;
	private String priExecuter;
	private String priState;
	private String priAreacode;
	private Timestamp priStartTm;

	private Map<String, Object> bussinessData = new HashMap<String, Object>();

	public String getPriId() {
		return priId;
	}

	public void setPriId(String priId) {
		this.priId = priId;
	}

	public String getPriNm() {
		return priNm;
	}

	public void setPriNm(String priNm) {
		this.priNm = priNm;
	}

	public String getPriCreator() {
		return priCreator;
	}

	public void setPriCreator(String priCreator) {
		this.priCreator = priCreator;
	}

	public String getPriExecuter() {
		return priExecuter;
	}

	public void setPriExecuter(String priExecuter) {
		this.priExecuter = priExecuter;
	}

	public String getPriState() {
		return priState;
	}

	public void setPriState(String priState) {
		this.priState = priState;
	}

	public String getPriAreacode() {
		return priAreacode;
	}

	public void setPriAreacode(String priAreacode) {
		this.priAreacode = priAreacode;
	}

	public Map<String, Object> getBussinessData() {
		return bussinessData;
	}

	public void setBussinessData(Map<String, Object> bussinessData) {
		this.bussinessData = bussinessData;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Timestamp getPriStartTm() {
		return priStartTm;
	}

	public void setPriStartTm(Timestamp priStartTm) {
		this.priStartTm = priStartTm;
	}

}
