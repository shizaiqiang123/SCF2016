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
 * InvcLoan entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INVC_LOAN_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class InvcLoanM implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
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
	private String invRef;
	private String invNo;
	private String invCcy;
	private BigDecimal invAmt;
	private BigDecimal invBal;
	private BigDecimal invLoanBal;
	private BigDecimal invLoanAmt;
	private BigDecimal loanPct;// 融资比例
	private BigDecimal loanRt;// 正常利率
	private Integer loanTimes;
	private BigDecimal intAmt;
	private Timestamp loanValDt;
	private Timestamp loanDueDt;
	private String invcLoanId;
	private BigDecimal invLoanEbal;
	private String sysBusiUnit;
	private Integer eventTimes;
	private Timestamp dueDt;
	private String buyerId;
	private String buyerNm;
	private BigDecimal loanAmt;
	private Timestamp invValDt;
	private Timestamp invDueDt;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public InvcLoanM() {
	}

	/** minimal constructor */
	public InvcLoanM(String sysRefNo, String invcLoanId) {
		this.sysRefNo = sysRefNo;
		this.invcLoanId = invcLoanId;
	}

	/** full constructor */
	public InvcLoanM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String invRef, String invNo, String invCcy,
			BigDecimal invAmt, BigDecimal invBal, BigDecimal invLoanBal,
			BigDecimal invLoanAmt, BigDecimal loanPct, BigDecimal loanRt,
			Integer loanTimes, BigDecimal intAmt, Timestamp loanValDt,
			Timestamp loanDueDt, String invcLoanId, BigDecimal invLoanEbal,
			String sysBusiUnit, Integer eventTimes, Timestamp dueDt,
			String buyerId, String buyerNm, BigDecimal loanAmt,
			Timestamp invValDt, Timestamp invDueDt,String sysOrgId) {
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
		this.invRef = invRef;
		this.invNo = invNo;
		this.invCcy = invCcy;
		this.invAmt = invAmt;
		this.invBal = invBal;
		this.invLoanBal = invLoanBal;
		this.invLoanAmt = invLoanAmt;
		this.loanPct = loanPct;
		this.loanRt = loanRt;
		this.loanTimes = loanTimes;
		this.intAmt = intAmt;
		this.loanValDt = loanValDt;
		this.loanDueDt = loanDueDt;
		this.invcLoanId = invcLoanId;
		this.invLoanEbal = invLoanEbal;
		this.sysBusiUnit = sysBusiUnit;
		this.eventTimes = eventTimes;
		this.dueDt = dueDt;
		this.buyerId = buyerId;
		this.buyerNm = buyerNm;
		this.loanAmt = loanAmt;
		this.invValDt = invValDt;
		this.invDueDt = invDueDt;
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

	@Column(name = "INV_REF", length = 35)
	public String getInvRef() {
		return this.invRef;
	}

	public void setInvRef(String invRef) {
		this.invRef = invRef;
	}

	@Column(name = "INV_NO", length = 35)
	public String getInvNo() {
		return this.invNo;
	}

	public void setInvNo(String invNo) {
		this.invNo = invNo;
	}

	@Column(name = "INV_CCY", length = 35)
	public String getInvCcy() {
		return this.invCcy;
	}

	public void setInvCcy(String invCcy) {
		this.invCcy = invCcy;
	}

	@Column(name = "INV_AMT", precision = 18, scale = 4)
	public BigDecimal getInvAmt() {
		return this.invAmt;
	}

	public void setInvAmt(BigDecimal invAmt) {
		this.invAmt = invAmt;
	}

	@Column(name = "INV_BAL", precision = 18, scale = 4)
	public BigDecimal getInvBal() {
		return this.invBal;
	}

	public void setInvBal(BigDecimal invBal) {
		this.invBal = invBal;
	}

	@Column(name = "INV_LOAN_BAL", precision = 18, scale = 4)
	public BigDecimal getInvLoanBal() {
		return this.invLoanBal;
	}

	public void setInvLoanBal(BigDecimal invLoanBal) {
		this.invLoanBal = invLoanBal;
	}

	@Column(name = "INV_LOAN_AMT", precision = 18, scale = 4)
	public BigDecimal getInvLoanAmt() {
		return this.invLoanAmt;
	}

	public void setInvLoanAmt(BigDecimal invLoanAmt) {
		this.invLoanAmt = invLoanAmt;
	}

	@Column(name = "LOAN_PCT", precision = 8, scale = 4)
	public BigDecimal getLoanPct() {
		return this.loanPct;
	}

	public void setLoanPct(BigDecimal loanPct) {
		this.loanPct = loanPct;
	}

	@Column(name = "LOAN_RT", precision = 8, scale = 4)
	public BigDecimal getLoanRt() {
		return this.loanRt;
	}

	public void setLoanRt(BigDecimal loanRt) {
		this.loanRt = loanRt;
	}

	@Column(name = "LOAN_TIMES", precision = 3, scale = 0)
	public Integer getLoanTimes() {
		return this.loanTimes;
	}

	public void setLoanTimes(Integer loanTimes) {
		this.loanTimes = loanTimes;
	}

	@Column(name = "INT_AMT", precision = 18, scale = 4)
	public BigDecimal getIntAmt() {
		return this.intAmt;
	}

	public void setIntAmt(BigDecimal intAmt) {
		this.intAmt = intAmt;
	}

	@Column(name = "LOAN_VAL_DT", length = 11)
	public Timestamp getLoanValDt() {
		return this.loanValDt;
	}

	public void setLoanValDt(Timestamp loanValDt) {
		this.loanValDt = loanValDt;
	}

	@Column(name = "LOAN_DUE_DT", length = 11)
	public Timestamp getLoanDueDt() {
		return this.loanDueDt;
	}

	public void setLoanDueDt(Timestamp loanDueDt) {
		this.loanDueDt = loanDueDt;
	}

	@Column(name = "INVC_LOAN_ID", nullable = false, length = 35)
	public String getInvcLoanId() {
		return this.invcLoanId;
	}

	public void setInvcLoanId(String invcLoanId) {
		this.invcLoanId = invcLoanId;
	}

	@Column(name = "INV_LOAN_EBAL", precision = 18, scale = 4)
	public BigDecimal getInvLoanEbal() {
		return invLoanEbal;
	}

	public void setInvLoanEbal(BigDecimal invLoanEbal) {
		this.invLoanEbal = invLoanEbal;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "EVENT_TIMES", precision = 4, scale = 0)
	public Integer getEventTimes() {
		return eventTimes;
	}

	public void setEventTimes(Integer eventTimes) {
		this.eventTimes = eventTimes;
	}

	@Column(name = "DUE_DT")
	public Timestamp getDueDt() {
		return dueDt;
	}

	public void setDueDt(Timestamp dueDt) {
		this.dueDt = dueDt;
	}

	@Column(name = "BUYER_ID", precision = 35)
	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "BUYER_NM", precision = 35)
	public String getBuyerNm() {
		return buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "LOAN_AMT", precision = 18, scale = 4)
	public BigDecimal getLoanAmt() {
		return loanAmt;
	}

	public void setLoanAmt(BigDecimal loanAmt) {
		this.loanAmt = loanAmt;
	}

	@Column(name = "INV_VAL_DT", length = 11)
	public Timestamp getInvValDt() {
		return this.invValDt;
	}

	public void setInvValDt(Timestamp invValDt) {
		this.invValDt = invValDt;
	}

	@Column(name = "INV_DUE_DT", length = 11)
	public Timestamp getInvDueDt() {
		return this.invDueDt;
	}

	public void setInvDueDt(Timestamp invDueDt) {
		this.invDueDt = invDueDt;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}