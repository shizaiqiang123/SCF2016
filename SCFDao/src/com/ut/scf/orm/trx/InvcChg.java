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
 * InvcChg entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INVC_CHG", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class InvcChg implements java.io.Serializable {

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
	private String hanChgCcy;
	private BigDecimal hanChgAmt;
	private String manChgRt;
	private String invNo;
	private BigDecimal manChgAmt;
	private String invCcy;
	private BigDecimal invAmt;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public InvcChg() {
	}

	/** minimal constructor */
	public InvcChg(String sysRefNo, String invNo) {
		this.sysRefNo = sysRefNo;
		this.invNo = invNo;
	}

	/** full constructor */
	public InvcChg(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String hanChgCcy, BigDecimal hanChgAmt,
			String manChgRt, String invNo, BigDecimal manChgAmt, String invCcy,
			BigDecimal invAmt,String sysOrgId) {
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
		this.hanChgCcy = hanChgCcy;
		this.hanChgAmt = hanChgAmt;
		this.manChgRt = manChgRt;
		this.invNo = invNo;
		this.manChgAmt = manChgAmt;
		this.invCcy = invCcy;
		this.invAmt = invAmt;
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

	@Column(name = "SYS_OP_TM", length = 11)
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

	@Column(name = "SYS_REL_TM", length = 11)
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

	@Column(name = "SYS_AUTH_TM", length = 11)
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

	@Column(name = "SYS_EVENT_TIMES", precision = 4, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "HAN_CHG_CCY", length = 3)
	public String getHanChgCcy() {
		return this.hanChgCcy;
	}

	public void setHanChgCcy(String hanChgCcy) {
		this.hanChgCcy = hanChgCcy;
	}

	@Column(name = "HAN_CHG_AMT", precision = 18, scale = 3)
	public BigDecimal getHanChgAmt() {
		return this.hanChgAmt;
	}

	public void setHanChgAmt(BigDecimal hanChgAmt) {
		this.hanChgAmt = hanChgAmt;
	}

	@Column(name = "MAN_CHG_RT", length = 3)
	public String getManChgRt() {
		return this.manChgRt;
	}

	public void setManChgRt(String manChgRt) {
		this.manChgRt = manChgRt;
	}

	@Column(name = "INV_NO", nullable = false, length = 35)
	public String getInvNo() {
		return this.invNo;
	}

	public void setInvNo(String invNo) {
		this.invNo = invNo;
	}

	@Column(name = "MAN_CHG_AMT", precision = 18, scale = 3)
	public BigDecimal getManChgAmt() {
		return this.manChgAmt;
	}

	public void setManChgAmt(BigDecimal manChgAmt) {
		this.manChgAmt = manChgAmt;
	}

	@Column(name = "INV_CCY", length = 3)
	public String getInvCcy() {
		return this.invCcy;
	}

	public void setInvCcy(String invCcy) {
		this.invCcy = invCcy;
	}

	@Column(name = "INV_AMT", precision = 18, scale = 3)
	public BigDecimal getInvAmt() {
		return this.invAmt;
	}

	public void setInvAmt(BigDecimal invAmt) {
		this.invAmt = invAmt;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}