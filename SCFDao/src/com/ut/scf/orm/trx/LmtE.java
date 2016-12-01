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
 * LmtE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "LMT_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class LmtE implements java.io.Serializable {

	// Fields

	private LmtEId id;
	private String sysOpId;
	private Timestamp sysOpTm;
	private String sysRelId;
	private Timestamp sysRelTm;
	private String sysAuthId;
	private Timestamp sysAuthTm;
	private String sysNextOp;
	private String sysLockFlag;
	private String sysLockBy;
	private String sysTrxSts;
	private String sysFuncId;
	private String sysFuncName;
	private String sysBusiUnit;
	private String sysGapiSts;
	private BigDecimal lmtAmt;
	private BigDecimal lmtBal;
	private String lmtTp;
	private String lmtSts;
	private BigDecimal lmtAllocate;
	private BigDecimal lmtRecover;
	private BigDecimal ttlAllocate;
	private BigDecimal ttlRecover;
	private String lmtUsing;
	private String lmtUsingTp;
	private String lmtCcy;
	private Timestamp lmtValidDt;
	private Timestamp lmtDueDt;
	private String cntrctNo;
	private String theirRef;
	private String selId;
	private String selNm;
	private String buyerId;
	private String buyerNm;
	private BigDecimal loanPerc;
	private String busiTp;
	private BigDecimal lmtLa;
	private BigDecimal lmtRm;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public LmtE() {
	}

	/** minimal constructor */
	public LmtE(LmtEId id) {
		this.id = id;
	}

	/** full constructor */
	public LmtE(LmtEId id, String sysOpId, Timestamp sysOpTm, String sysRelId,
			Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm,
			String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysTrxSts, String sysFuncId, String sysFuncName,
			String sysBusiUnit, String sysGapiSts, BigDecimal lmtAmt,
			BigDecimal lmtBal, String lmtTp, String lmtSts,
			BigDecimal lmtAllocate, BigDecimal lmtRecover,
			BigDecimal ttlAllocate, BigDecimal ttlRecover, String lmtUsing,
			String lmtUsingTp, String lmtCcy, Timestamp lmtValidDt,
			Timestamp lmtDueDt, String cntrctNo, String theirRef, String selId,
			String selNm, String buyerId, String buyerNm, BigDecimal loanPerc,
			String busiTp, BigDecimal lmtLa, BigDecimal lmtRm,String sysOrgId) {
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
		this.sysTrxSts = sysTrxSts;
		this.sysFuncId = sysFuncId;
		this.sysFuncName = sysFuncName;
		this.sysBusiUnit = sysBusiUnit;
		this.sysGapiSts = sysGapiSts;
		this.lmtAmt = lmtAmt;
		this.lmtBal = lmtBal;
		this.lmtTp = lmtTp;
		this.lmtSts = lmtSts;
		this.lmtAllocate = lmtAllocate;
		this.lmtRecover = lmtRecover;
		this.ttlAllocate = ttlAllocate;
		this.ttlRecover = ttlRecover;
		this.lmtUsing = lmtUsing;
		this.lmtUsingTp = lmtUsingTp;
		this.lmtCcy = lmtCcy;
		this.lmtValidDt = lmtValidDt;
		this.lmtDueDt = lmtDueDt;
		this.cntrctNo = cntrctNo;
		this.theirRef = theirRef;
		this.selId = selId;
		this.selNm = selNm;
		this.buyerId = buyerId;
		this.buyerNm = buyerNm;
		this.loanPerc = loanPerc;
		this.busiTp = busiTp;
		this.lmtLa = lmtLa;
		this.lmtRm = lmtRm;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)) })
	public LmtEId getId() {
		return this.id;
	}

	public void setId(LmtEId id) {
		this.id = id;
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

	@Column(name = "SYS_TRX_STS", length = 1)
	public String getSysTrxSts() {
		return this.sysTrxSts;
	}

	public void setSysTrxSts(String sysTrxSts) {
		this.sysTrxSts = sysTrxSts;
	}

	@Column(name = "SYS_FUNC_ID", length = 35)
	public String getSysFuncId() {
		return this.sysFuncId;
	}

	public void setSysFuncId(String sysFuncId) {
		this.sysFuncId = sysFuncId;
	}

	@Column(name = "SYS_FUNC_NAME", length = 80)
	public String getSysFuncName() {
		return this.sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

	@Column(name = "SYS_BUSI_UNIT", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return this.sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "LMT_AMT", precision = 18, scale = 4)
	public BigDecimal getLmtAmt() {
		return this.lmtAmt;
	}

	public void setLmtAmt(BigDecimal lmtAmt) {
		this.lmtAmt = lmtAmt;
	}

	@Column(name = "LMT_BAL", precision = 18, scale = 4)
	public BigDecimal getLmtBal() {
		return this.lmtBal;
	}

	public void setLmtBal(BigDecimal lmtBal) {
		this.lmtBal = lmtBal;
	}

	@Column(name = "LMT_TP", length = 1)
	public String getLmtTp() {
		return this.lmtTp;
	}

	public void setLmtTp(String lmtTp) {
		this.lmtTp = lmtTp;
	}

	@Column(name = "LMT_STS", length = 1)
	public String getLmtSts() {
		return this.lmtSts;
	}

	public void setLmtSts(String lmtSts) {
		this.lmtSts = lmtSts;
	}

	@Column(name = "LMT_ALLOCATE", precision = 18, scale = 4)
	public BigDecimal getLmtAllocate() {
		return this.lmtAllocate;
	}

	public void setLmtAllocate(BigDecimal lmtAllocate) {
		this.lmtAllocate = lmtAllocate;
	}

	@Column(name = "LMT_RECOVER", precision = 18, scale = 4)
	public BigDecimal getLmtRecover() {
		return this.lmtRecover;
	}

	public void setLmtRecover(BigDecimal lmtRecover) {
		this.lmtRecover = lmtRecover;
	}

	@Column(name = "TTL_ALLOCATE", precision = 18, scale = 4)
	public BigDecimal getTtlAllocate() {
		return this.ttlAllocate;
	}

	public void setTtlAllocate(BigDecimal ttlAllocate) {
		this.ttlAllocate = ttlAllocate;
	}

	@Column(name = "TTL_RECOVER", precision = 18, scale = 4)
	public BigDecimal getTtlRecover() {
		return this.ttlRecover;
	}

	public void setTtlRecover(BigDecimal ttlRecover) {
		this.ttlRecover = ttlRecover;
	}

	@Column(name = "LMT_USING", length = 1)
	public String getLmtUsing() {
		return this.lmtUsing;
	}

	public void setLmtUsing(String lmtUsing) {
		this.lmtUsing = lmtUsing;
	}

	@Column(name = "LMT_USING_TP", length = 1)
	public String getLmtUsingTp() {
		return this.lmtUsingTp;
	}

	public void setLmtUsingTp(String lmtUsingTp) {
		this.lmtUsingTp = lmtUsingTp;
	}

	@Column(name = "LMT_CCY", length = 10)
	public String getLmtCcy() {
		return this.lmtCcy;
	}

	public void setLmtCcy(String lmtCcy) {
		this.lmtCcy = lmtCcy;
	}

	@Column(name = "LMT_VALID_DT")
	public Timestamp getLmtValidDt() {
		return this.lmtValidDt;
	}

	public void setLmtValidDt(Timestamp lmtValidDt) {
		this.lmtValidDt = lmtValidDt;
	}

	@Column(name = "LMT_DUE_DT")
	public Timestamp getLmtDueDt() {
		return this.lmtDueDt;
	}

	public void setLmtDueDt(Timestamp lmtDueDt) {
		this.lmtDueDt = lmtDueDt;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "THEIR_REF", length = 35)
	public String getTheirRef() {
		return this.theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
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
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return this.buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return this.buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "LOAN_PERC", precision = 18, scale = 4)
	public BigDecimal getLoanPerc() {
		return this.loanPerc;
	}

	public void setLoanPerc(BigDecimal loanPerc) {
		this.loanPerc = loanPerc;
	}

	@Column(name = "BUSI_TP", length = 10)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "LMT_LA", precision = 18, scale = 4)
	public BigDecimal getLmtLa() {
		return this.lmtLa;
	}

	public void setLmtLa(BigDecimal lmtLa) {
		this.lmtLa = lmtLa;
	}

	@Column(name = "LMT_RM", precision = 18, scale = 4)
	public BigDecimal getLmtRm() {
		return this.lmtRm;
	}

	public void setLmtRm(BigDecimal lmtRm) {
		this.lmtRm = lmtRm;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}