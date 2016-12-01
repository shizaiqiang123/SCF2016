package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * PoolInoutM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "POOL_INOUT_M", schema = "TRX")
public class PoolInoutM implements java.io.Serializable {

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
	private String sellerInstCd;
	private String selId;
	private String selNm;
	private String busiTp;
	private String ccy;
	private String inoutTp;
	private BigDecimal arBal;
	private BigDecimal arAvalLoan;
	private BigDecimal poolLine;
	private BigDecimal openLoanAmt;
	private String marginAcNo;
	private BigDecimal marginAmt;
	private Timestamp trxDt;
	private Timestamp freezeDueDt;
	private BigDecimal lmtAmt;
	private BigDecimal lmtBal;
	private String sysRelReason;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public PoolInoutM() {
	}

	/** minimal constructor */
	public PoolInoutM(String sysRefNo, Timestamp sysOpTm, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public PoolInoutM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String cntrctNo, String sellerInstCd,
			String selId, String selNm, String busiTp, String ccy,
			String inoutTp, BigDecimal arBal, BigDecimal arAvalLoan,
			BigDecimal poolLine, BigDecimal openLoanAmt, String marginAcNo,
			BigDecimal marginAmt, Timestamp trxDt, Timestamp freezeDueDt,
			BigDecimal lmtAmt, BigDecimal lmtBal, String sysRelReason,String sysOrgId) {
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
		this.cntrctNo = cntrctNo;
		this.sellerInstCd = sellerInstCd;
		this.selId = selId;
		this.selNm = selNm;
		this.busiTp = busiTp;
		this.ccy = ccy;
		this.inoutTp = inoutTp;
		this.arBal = arBal;
		this.arAvalLoan = arAvalLoan;
		this.poolLine = poolLine;
		this.openLoanAmt = openLoanAmt;
		this.marginAcNo = marginAcNo;
		this.marginAmt = marginAmt;
		this.trxDt = trxDt;
		this.freezeDueDt = freezeDueDt;
		this.lmtAmt = lmtAmt;
		this.lmtBal = lmtBal;
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

	@Column(name = "CNTRCT_NO", length = 40)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "SELLER_INST_CD", length = 35)
	public String getSellerInstCd() {
		return this.sellerInstCd;
	}

	public void setSellerInstCd(String sellerInstCd) {
		this.sellerInstCd = sellerInstCd;
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

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "CCY", length = 35)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "INOUT_TP", length = 1)
	public String getInoutTp() {
		return this.inoutTp;
	}

	public void setInoutTp(String inoutTp) {
		this.inoutTp = inoutTp;
	}

	@Column(name = "AR_BAL", precision = 18, scale = 3)
	public BigDecimal getArBal() {
		return this.arBal;
	}

	public void setArBal(BigDecimal arBal) {
		this.arBal = arBal;
	}

	@Column(name = "AR_AVAL_LOAN", precision = 18, scale = 3)
	public BigDecimal getArAvalLoan() {
		return this.arAvalLoan;
	}

	public void setArAvalLoan(BigDecimal arAvalLoan) {
		this.arAvalLoan = arAvalLoan;
	}

	@Column(name = "POOL_LINE", precision = 18, scale = 3)
	public BigDecimal getPoolLine() {
		return this.poolLine;
	}

	public void setPoolLine(BigDecimal poolLine) {
		this.poolLine = poolLine;
	}

	@Column(name = "OPEN_LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getOpenLoanAmt() {
		return this.openLoanAmt;
	}

	public void setOpenLoanAmt(BigDecimal openLoanAmt) {
		this.openLoanAmt = openLoanAmt;
	}

	@Column(name = "MARGIN_AC_NO", length = 35)
	public String getMarginAcNo() {
		return this.marginAcNo;
	}

	public void setMarginAcNo(String marginAcNo) {
		this.marginAcNo = marginAcNo;
	}

	@Column(name = "MARGIN_AMT", precision = 18, scale = 3)
	public BigDecimal getMarginAmt() {
		return this.marginAmt;
	}

	public void setMarginAmt(BigDecimal marginAmt) {
		this.marginAmt = marginAmt;
	}

	@Column(name = "TRX_DT")
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "FREEZE_DUE_DT")
	public Timestamp getFreezeDueDt() {
		return this.freezeDueDt;
	}

	public void setFreezeDueDt(Timestamp freezeDueDt) {
		this.freezeDueDt = freezeDueDt;
	}

	@Column(name = "LMT_AMT", precision = 18, scale = 3)
	public BigDecimal getLmtAmt() {
		return this.lmtAmt;
	}

	public void setLmtAmt(BigDecimal lmtAmt) {
		this.lmtAmt = lmtAmt;
	}

	@Column(name = "LMT_BAL", precision = 18, scale = 3)
	public BigDecimal getLmtBal() {
		return this.lmtBal;
	}

	public void setLmtBal(BigDecimal lmtBal) {
		this.lmtBal = lmtBal;
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