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
 * CbkReg entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CBK_REG_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CbkRegM implements java.io.Serializable {

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
	private String selId;
	private String buyerId;
	private String cntrctNo;
	private String ccy;
	private BigDecimal ttlCbkAmt;
	private String busiTp;
	private Timestamp cbkDt;
	private String remark;
	private String sysBusiUnit;
	private String selNm;
	private String buyerNm;
	private String cbkTp;
	private String cnNo;
	private BigDecimal cnAmt;
	private BigDecimal ttlRevTrfAmt;
	private Integer regNo;
	private String sysRelReason;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public CbkRegM() {
	}

	/** minimal constructor */
	public CbkRegM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CbkRegM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String selId, String buyerId,
			String cntrctNo, String ccy, BigDecimal ttlCbkAmt, String busiTp,
			Timestamp cbkDt, String remark, String sysBusiUnit, String selNm,
			String buyerNm, String cbkTp, String cnNo, BigDecimal cnAmt,
			BigDecimal ttlRevTrfAmt, Integer regNo, String sysRelReason,String sysOrgId) {
		super();
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
		this.selId = selId;
		this.buyerId = buyerId;
		this.cntrctNo = cntrctNo;
		this.ccy = ccy;
		this.ttlCbkAmt = ttlCbkAmt;
		this.busiTp = busiTp;
		this.cbkDt = cbkDt;
		this.remark = remark;
		this.sysBusiUnit = sysBusiUnit;
		this.selNm = selNm;
		this.buyerNm = buyerNm;
		this.cbkTp = cbkTp;
		this.cnNo = cnNo;
		this.cnAmt = cnAmt;
		this.ttlRevTrfAmt = ttlRevTrfAmt;
		this.regNo = regNo;
		this.sysRelReason = sysRelReason;
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return this.buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "TTL_CBK_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlCbkAmt() {
		return this.ttlCbkAmt;
	}

	public void setTtlCbkAmt(BigDecimal ttlCbkAmt) {
		this.ttlCbkAmt = ttlCbkAmt;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "CBK_DT")
	public Timestamp getCbkDt() {
		return this.cbkDt;
	}

	public void setCbkDt(Timestamp cbkDt) {
		this.cbkDt = cbkDt;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "SYS_BUSI_UNIT", length = 35)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "SEL_NM", length = 35)
	public String getSelNm() {
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return this.buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "CBK_TP", length = 3)
	public String getCbkTp() {
		return this.cbkTp;
	}

	public void setCbkTp(String cbkTp) {
		this.cbkTp = cbkTp;
	}

	@Column(name = "CN_NO", length = 40)
	public String getCnNo() {
		return this.cnNo;
	}

	public void setCnNo(String cnNo) {
		this.cnNo = cnNo;
	}

	@Column(name = "CN_AMT", nullable = false, precision = 38, scale = 0)
	public BigDecimal getCnAmt() {
		return this.cnAmt;
	}

	public void setCnAmt(BigDecimal cnAmt) {
		this.cnAmt = cnAmt;
	}

	@Column(name = "TTL_REV_TRF_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlRevTrfAmt() {
		return ttlRevTrfAmt;
	}

	public void setTtlRevTrfAmt(BigDecimal ttlRevTrfAmt) {
		this.ttlRevTrfAmt = ttlRevTrfAmt;
	}

	@Column(name = "REG_NO", precision = 6, scale = 0)
	public Integer getRegNo() {
		return regNo;
	}

	public void setRegNo(Integer regNo) {
		this.regNo = regNo;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

}