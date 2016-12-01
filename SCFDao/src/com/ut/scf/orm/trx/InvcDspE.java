package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * InvcE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INVC_DSP_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class InvcDspE implements java.io.Serializable {

	// Fields

	private InvcDspEId id;
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
	private String notifyBy;
	private Timestamp trxDt;
	private String selId;
	private String selNm;
	private String busiTp;
	private String ttlDspInvNo;
	private BigDecimal ttlDspInvAmt;
	private String dspFlag;
	private String cntrctNo;
	private String sysRelReason;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public InvcDspE() {
	}

	/** minimal constructor */
	public InvcDspE(InvcDspEId id, String sysLockFlag) {
		super();
		this.id = id;
		this.sysLockFlag = sysLockFlag;
	}

	/** full constructor */
	public InvcDspE(InvcDspEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String notifyBy, Timestamp trxDt, String selId, String selNm,
			String busiTp, String ttlDspInvNo, BigDecimal ttlDspInvAmt,
			String dspFlag,String sysOrgId) {
		super();
		this.id = id;
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
		this.notifyBy = notifyBy;
		this.trxDt = trxDt;
		this.selId = selId;
		this.selNm = selNm;
		this.busiTp = busiTp;
		this.ttlDspInvNo = ttlDspInvNo;
		this.ttlDspInvAmt = ttlDspInvAmt;
		this.dspFlag = dspFlag;
		this.sysOrgId = sysOrgId;
	}

	public InvcDspE(InvcDspEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String notifyBy, Timestamp trxDt, String selId, String selNm,
			String busiTp, String ttlDspInvNo, BigDecimal ttlDspInvAmt,
			String dspFlag, String cntrctNo, String sysRelReason) {
		super();
		this.id = id;
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
		this.notifyBy = notifyBy;
		this.trxDt = trxDt;
		this.selId = selId;
		this.selNm = selNm;
		this.busiTp = busiTp;
		this.ttlDspInvNo = ttlDspInvNo;
		this.ttlDspInvAmt = ttlDspInvAmt;
		this.dspFlag = dspFlag;
		this.cntrctNo = cntrctNo;
		this.sysRelReason = sysRelReason;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)) })
	public InvcDspEId getId() {
		return id;
	}

	public void setId(InvcDspEId id) {
		this.id = id;
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

	@Column(name = "NOTIFY_BY", length = 35)
	public String getNotifyBy() {
		return notifyBy;
	}

	public void setNotifyBy(String notifyBy) {
		this.notifyBy = notifyBy;
	}

	@Column(name = "TRX_DT", length = 11)
	public Timestamp getTrxDt() {
		return trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "SEL_NM", length = 35)
	public String getSelNm() {
		return selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "BUSI_TP", length = 35)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "TTL_DSP_INV_NO", length = 35)
	public String getTtlDspInvNo() {
		return ttlDspInvNo;
	}

	public void setTtlDspInvNo(String ttlDspInvNo) {
		this.ttlDspInvNo = ttlDspInvNo;
	}

	@Column(name = "TTL_DSP_INV_AMT", precision = 18, scale = 4)
	public BigDecimal getTtlDspInvAmt() {
		return ttlDspInvAmt;
	}

	public void setTtlDspInvAmt(BigDecimal ttlDspInvAmt) {
		this.ttlDspInvAmt = ttlDspInvAmt;
	}

	@Column(name = "DSP_FLAG", length = 35)
	public String getDspFlag() {
		return dspFlag;
	}

	public void setDspFlag(String dspFlag) {
		this.dspFlag = dspFlag;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
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