package com.ut.scf.orm.trx;

// default package

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * Cntrct_Pat_M entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CNTRCT_PAT_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CntrctPatM implements java.io.Serializable {

	// Fields
	private String sysRefNo;
	private String sysOpId;
	private Timestamp sysOpTm;
	private String sysRelId;
	private Timestamp sysRelTm;
	private String sysAuthId;
	private Timestamp sysAuthTm;
	private String sysNextOp;
	private String sysLockFlag;
	private String sysLockBy;
	private String sysFuncId;
	private String sysTrxSts;
	private Integer sysEventTimes;
	private String cntrctNo;
	private String patnerId;
	private String patnerNm;
	private String agmNo;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	private String patnerAdr;
	private String patnerCity;
	private String patnerTel;
	private String patnerFax;
	private String patnerEmail;
	private String remark;
	// Constructors

	/** default constructor */
	public CntrctPatM() {
	}

	/** minimal constructor */
	public CntrctPatM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, String sysAuthId, Timestamp sysAuthTm,
			Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysOpId = sysOpId;
		this.sysOpTm = sysOpTm;
		this.sysRelId = sysRelId;
		this.sysAuthId = sysAuthId;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CntrctPatM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String cntrctNo, String patnerId,
			String patnerNm, String agmNo,String sysOrgId,String patnerAdr,String patnerCity,
			String patnerTel,String patnerFax,String patnerEmail,String remark) {
		this.sysRefNo = sysRefNo;
		this.sysOpId = sysOpId;
		this.sysOpTm = sysOpTm;
		this.sysRelId = sysRelId;
		this.sysRelTm = sysRelTm;
		this.sysAuthId = sysAuthId;
		this.sysAuthTm = sysAuthTm;
		this.sysNextOp = sysNextOp;
		this.sysLockFlag = sysLockFlag;
		this.sysLockBy = sysLockBy;
		this.sysFuncId = sysFuncId;
		this.sysTrxSts = sysTrxSts;
		this.sysEventTimes = sysEventTimes;
		this.cntrctNo = cntrctNo;
		this.patnerId = patnerId;
		this.patnerNm = patnerNm;
		this.agmNo = agmNo;
		this.sysOrgId = sysOrgId;
		this.patnerAdr = patnerAdr;
		this.patnerCity = patnerCity;
		this.patnerTel = patnerTel;
		this.patnerFax = patnerFax;
		this.patnerEmail = patnerEmail; 
		this.remark = remark;
	}

	// Property accessors
	@Id
	@Column(name = "SYS_REF_NO", unique = true, nullable = false, length = 35)
	public String getSysRefNo() {
		return this.sysRefNo;
	}

	public void setSysRefNo(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}

	@Column(name = "SYS_OP_ID",length = 35)
	public String getSysOpId() {
		return this.sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_OP_TM")
	public Timestamp getSysOpTm() {
		return this.sysOpTm;
	}

	public void setSysOpTm(Timestamp sysOpTm) {
		this.sysOpTm = sysOpTm;
	}

	@Column(name = "SYS_REL_ID", length = 35)
	public String getSysRelId() {
		return this.sysRelId;
	}

	public void setSysRelId(String sysRelId) {
		this.sysRelId = sysRelId;
	}

	@Column(name = "SYS_REL_TM")
	public Timestamp getSysRelTm() {
		return this.sysRelTm;
	}

	public void setSysRelTm(Timestamp sysRelTm) {
		this.sysRelTm = sysRelTm;
	}

	@Column(name = "SYS_AUTH_ID", length = 35)
	public String getSysAuthId() {
		return this.sysAuthId;
	}

	public void setSysAuthId(String sysAuthId) {
		this.sysAuthId = sysAuthId;
	}

	@Column(name = "SYS_AUTH_TM")
	public Timestamp getSysAuthTm() {
		return this.sysAuthTm;
	}

	public void setSysAuthTm(Timestamp sysAuthTm) {
		this.sysAuthTm = sysAuthTm;
	}

	@Column(name = "SYS_NEXT_OP", length = 35)
	public String getSysNextOp() {
		return this.sysNextOp;
	}

	public void setSysNextOp(String sysNextOp) {
		this.sysNextOp = sysNextOp;
	}

	@Column(name = "SYS_LOCK_FLAG", length = 1)
	public String getSysLockFlag() {
		return this.sysLockFlag;
	}

	public void setSysLockFlag(String sysLockFlag) {
		this.sysLockFlag = sysLockFlag;
	}

	@Column(name = "SYS_LOCK_BY", length = 35)
	public String getSysLockBy() {
		return this.sysLockBy;
	}

	public void setSysLockBy(String sysLockBy) {
		this.sysLockBy = sysLockBy;
	}

	@Column(name = "SYS_FUNC_ID", length = 35)
	public String getSysFuncId() {
		return this.sysFuncId;
	}

	public void setSysFuncId(String sysFuncId) {
		this.sysFuncId = sysFuncId;
	}

	@Column(name = "SYS_TRX_STS", length = 1)
	public String getSysTrxSts() {
		return this.sysTrxSts;
	}

	public void setSysTrxSts(String sysTrxSts) {
		this.sysTrxSts = sysTrxSts;
	}

	@Column(name = "SYS_EVENT_TIMES",  precision = 38, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "PATNER_ID", length = 35)
	public String getPatnerId() {
		return this.patnerId;
	}

	public void setPatnerId(String patnerId) {
		this.patnerId = patnerId;
	}

	@Column(name = "PATNER_NM", length = 70)
	public String getPatnerNm() {
		return this.patnerNm;
	}

	public void setPatnerNm(String patnerNm) {
		this.patnerNm = patnerNm;
	}

	@Column(name = "AGM_NO", length = 35)
	public String getAgmNo() {
		return this.agmNo;
	}

	public void setAgmNo(String agmNo) {
		this.agmNo = agmNo;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
	@Column(name = "PATNER_ADR", length = 140)
	public String getPatnerAdr() {
		return this.patnerAdr;
	}

	public void setPatnerAdr(String patnerAdr) {
		this.patnerAdr = patnerAdr;
	}
	
	@Column(name = "PATNER_CITY", length = 35)
	public String getPatnerCity() {
		return this.patnerCity;
	}

	public void setPatnerCity(String patnerCity) {
		this.patnerCity = patnerCity;
	}

	@Column(name = "PATNER_TEL", length = 30)
	public String getPatnerTel() {
		return this.patnerTel;
	}

	public void setPatnerTel(String patnerTel) {
		this.patnerTel = patnerTel;
	}
	
	@Column(name = "PATNER_FAX", length = 30)
	public String getPatnerFax() {
		return this.patnerFax;
	}

	public void setPatnerFax(String patnerFax) {
		this.patnerFax = patnerFax;
	}
	
	@Column(name = "PATNER_EMAIL", length = 40)
	public String getPatnerEmail() {
		return this.patnerEmail;
	}

	public void setPatnerEmail(String patnerEmail) {
		this.patnerEmail = patnerEmail;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	
	
}