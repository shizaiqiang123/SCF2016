package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * CustColla entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "cust_colla", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CustColla implements java.io.Serializable {

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
	private String sysRelReason;
	private String sysBusiUnit;
	private String collatSource;
	private String collatSourceId;
	private String collatTp;
	private String collatCorpNm;
	private String collatNm;
	private String collatCcy;
	private BigDecimal collatVal;
	private String trxId;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public CustColla() {
	}

	/** minimal constructor */
	public CustColla(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CustColla(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String sysRelReason, String sysBusiUnit,
			String collatSource, String collatSourceId, String collatTp,
			String collatCorpNm, String collatNm, String collatCcy,
			BigDecimal collatVal, String trxId,String sysOrgId) {
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
		this.sysRelReason = sysRelReason;
		this.sysBusiUnit = sysBusiUnit;
		this.collatSource = collatSource;
		this.collatSourceId = collatSourceId;
		this.collatTp = collatTp;
		this.collatCorpNm = collatCorpNm;
		this.collatNm = collatNm;
		this.collatCcy = collatCcy;
		this.collatVal = collatVal;
		this.trxId = trxId;
		this.sysOrgId = sysOrgId;
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

	@Column(name = "SYS_OP_ID", length = 35)
	public String getSysOpId() {
		return this.sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_OP_TM", length = 19)
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

	@Column(name = "SYS_REL_TM", length = 19)
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

	@Column(name = "SYS_AUTH_TM", length = 19)
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "SYS_REL_REASON", length = 65535)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "COLLAT_SOURCE", length = 40)
	public String getCollatSource() {
		return this.collatSource;
	}

	public void setCollatSource(String collatSource) {
		this.collatSource = collatSource;
	}

	@Column(name = "COLLAT_SOURCE_ID", length = 40)
	public String getCollatSourceId() {
		return this.collatSourceId;
	}

	public void setCollatSourceId(String collatSourceId) {
		this.collatSourceId = collatSourceId;
	}

	@Column(name = "COLLAT_TP", length = 10)
	public String getCollatTp() {
		return this.collatTp;
	}

	public void setCollatTp(String collatTp) {
		this.collatTp = collatTp;
	}

	@Column(name = "COLLAT_CORP_NM", length = 50)
	public String getCollatCorpNm() {
		return this.collatCorpNm;
	}

	public void setCollatCorpNm(String collatCorpNm) {
		this.collatCorpNm = collatCorpNm;
	}

	@Column(name = "COLLAT_NM", length = 50)
	public String getCollatNm() {
		return this.collatNm;
	}

	public void setCollatNm(String collatNm) {
		this.collatNm = collatNm;
	}

	@Column(name = "COLLAT_CCY", length = 10)
	public String getCollatCcy() {
		return this.collatCcy;
	}

	public void setCollatCcy(String collatCcy) {
		this.collatCcy = collatCcy;
	}

	@Column(name = "COLLAT_VAL", precision = 19, scale = 4)
	public BigDecimal getCollatVal() {
		return this.collatVal;
	}

	public void setCollatVal(BigDecimal collatVal) {
		this.collatVal = collatVal;
	}

	@Column(name = "TRX_ID", length = 40)
	public String getTrxId() {
		return this.trxId;
	}

	public void setTrxId(String trxId) {
		this.trxId = trxId;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}