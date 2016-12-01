package com.ut.scf.core.services.accounting.impl;

import java.math.BigDecimal;
import java.util.Date;

public class AccountingObject {
	private String sysRefNo;
	
	private String reconStat;
	
	private Date cretTm;
	
	private BigDecimal amt;
	
	private String ccy;
	
	private String trxDesc;
	
	private String relRefNo;
	
	private Integer relEvtNo;
	
	public String getSysRefNo() {
		return sysRefNo;
	}
	public void setSysRefNo(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}
	public String getReconStat() {
		return reconStat;
	}
	public void setReconStat(String reconStat) {
		this.reconStat = reconStat;
	}
	public Date getCretTm() {
		return cretTm;
	}
	public void setCretTm(Date cretTm) {
		this.cretTm = cretTm;
	}
	public BigDecimal getAmt() {
		return amt;
	}
	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}
	public String getCcy() {
		return ccy;
	}
	public void setCcy(String ccy) {
		this.ccy = ccy;
	}
	public String getRelRefNo() {
		return relRefNo;
	}
	public void setRelRefNo(String relRefNo) {
		this.relRefNo = relRefNo;
	}
	public Integer getRelEvtNo() {
		return relEvtNo;
	}
	public void setRelEvtNo(Integer relEvtNo) {
		this.relEvtNo = relEvtNo;
	}
	
	public String getTrxDesc() {
		return trxDesc;
	}
	public void setTrxDesc(String trxDesc) {
		this.trxDesc = trxDesc;
	}
}
