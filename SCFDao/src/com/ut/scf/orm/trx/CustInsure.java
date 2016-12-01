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
@Table(name = "cust_insure", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CustInsure implements java.io.Serializable {

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
	private String collatCompNm;
	private String collatNo;
	private BigDecimal collatAmt;
	private Timestamp collatVailDt;
	private Timestamp collatDueDt;
	private BigDecimal collatCompensateRt;
	private BigDecimal collatMaxCompensateAmt;
	private String insureNo;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public CustInsure() {
	}

	/** minimal constructor */
	public CustInsure(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CustInsure(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String sysRelReason, String sysBusiUnit,
			String collatCompNm, String collatNo, BigDecimal collatAmt,
			Timestamp collatVailDt, Timestamp collatDueDt,
			BigDecimal collatCompensateRt, BigDecimal collatMaxCompensateAmt,
			String insureNo,String sysOrgId) {
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
		this.collatCompNm = collatCompNm;
		this.collatNo = collatNo;
		this.collatAmt = collatAmt;
		this.collatVailDt = collatVailDt;
		this.collatDueDt = collatDueDt;
		this.collatCompensateRt = collatCompensateRt;
		this.collatMaxCompensateAmt = collatMaxCompensateAmt;
		this.insureNo = insureNo;
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

	@Column(name = "SYS_EVENT_TIMES")
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

	@Column(name = "COLLAT_COMP_NM", length = 200)
	public String getCollatCompNm() {
		return collatCompNm;
	}

	public void setCollatCompNm(String collatCompNm) {
		this.collatCompNm = collatCompNm;
	}

	@Column(name = "COLLAT_NO", length = 200)
	public String getCollatNo() {
		return collatNo;
	}

	public void setCollatNo(String collatNo) {
		this.collatNo = collatNo;
	}

	@Column(name = "COLLAT_AMT", precision = 18, scale = 4)
	public BigDecimal getCollatAmt() {
		return collatAmt;
	}

	public void setCollatAmt(BigDecimal collatAmt) {
		this.collatAmt = collatAmt;
	}

	@Column(name = "COLLAT_VAIL_DT", length = 19)
	public Timestamp getCollatVailDt() {
		return collatVailDt;
	}

	public void setCollatVailDt(Timestamp collatVailDt) {
		this.collatVailDt = collatVailDt;
	}

	@Column(name = "COLLAT_DUE_DT", length = 19)
	public Timestamp getCollatDueDt() {
		return collatDueDt;
	}

	public void setCollatDueDt(Timestamp collatDueDt) {
		this.collatDueDt = collatDueDt;
	}

	@Column(name = "COLLAT_COMPENSATE_RT", precision = 18, scale = 4)
	public BigDecimal getCollatCompensateRt() {
		return collatCompensateRt;
	}

	public void setCollatCompensateRt(BigDecimal collatCompensateRt) {
		this.collatCompensateRt = collatCompensateRt;
	}

	@Column(name = "COLLAT_MAX_COMPENSATE_AMT", precision = 18, scale = 4)
	public BigDecimal getCollatMaxCompensateAmt() {
		return collatMaxCompensateAmt;
	}

	public void setCollatMaxCompensateAmt(BigDecimal collatMaxCompensateAmt) {
		this.collatMaxCompensateAmt = collatMaxCompensateAmt;
	}

	@Column(name = "INSURE_NO", length = 200)
	public String getInsureNo() {
		return insureNo;
	}

	public void setInsureNo(String insureNo) {
		this.insureNo = insureNo;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}