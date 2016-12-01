package com.ut.scf.core.services.accounting.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class AccountingSubject implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 账号
	 */
	private String accNo;
	/**
	 * 科目类型 ： D/C
	 */
	private String trxTp;
	/**
	 * 金额
	 */
	private BigDecimal amt = BigDecimal.ZERO;
	
	private BigDecimal balBef = BigDecimal.ZERO;
	
	private String balAft;
	
	/**
	 * 原始金额
	 */
	private BigDecimal orgAmt = BigDecimal.ZERO;
	/**
	 * 交易日期
	 */
	private Date cretTm;
	
	/**
	 * 交易日期
	 */
	private Date updtTm;
	/**
	 * 币别
	 */
	private String ccy;
	/**
	 * 汇率
	 */
	private Double exchRate = 1.0;
	
	private String desc;
	
	private String relRefNo;
	
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public BigDecimal getAmt() {
		return amt;
	}
	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}
	public Date getCretTm() {
		return cretTm;
	}
	public void setCretTm(Date cretTm) {
		this.cretTm = cretTm;
	}
	public String getCcy() {
		return ccy;
	}
	public void setCcy(String ccy) {
		this.ccy = ccy;
	}
	public Double getExchRate() {
		return exchRate;
	}
	public void setExchRate(Double exchRate) {
		this.exchRate = exchRate;
	}
	public String getTrxTp() {
		return trxTp;
	}
	public void setTrxTp(String trxTp) {
		this.trxTp = trxTp;
	}
	public BigDecimal getBalBef() {
		return balBef;
	}
	public void setBalBef(BigDecimal balBef) {
		this.balBef = balBef;
	}
	public String getBalAft() {
		return balAft;
	}
	public void setBalAft(String balAft) {
		this.balAft = balAft;
	}
	public BigDecimal getOrgAmt() {
		return orgAmt;
	}
	public void setOrgAmt(BigDecimal orgAmt) {
		this.orgAmt = orgAmt;
	}
	public Date getUpdtTm() {
		return updtTm;
	}
	public void setUpdtTm(Date updtTm) {
		this.updtTm = updtTm;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getRelRefNo() {
		return relRefNo;
	}
	public void setRelRefNo(String relRefNo) {
		this.relRefNo = relRefNo;
	}
}
