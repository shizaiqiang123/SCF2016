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
 * InvcM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INVC_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class InvcM implements java.io.Serializable {

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
	private String sysGapiSts;
	private Integer sysEventTimes;
	private String cntrctNo;
	private String buyerId;
	private String selId;
	private String orderNo;
	private String invNo;
	private String batchNo;
	private Timestamp invDt;
	private Timestamp invValDt;
	private Timestamp invDueDt;
	private String invCcy;
	private BigDecimal invAmt;
	private BigDecimal invBal;
	private BigDecimal invLoanBal;
	private BigDecimal revTrfAmt; // 反转让金额
	private String reTrfNo; // 反转让批次
	// 新建应付利息
	private BigDecimal intAmt;
	private String invSts;
	private String busiTp;
	private BigDecimal invLoanAval;
	private String sysRelReason;
	private String adjTp;
	private String notes;
	private String arType;
	private Integer acctPeriod;
	private BigDecimal chgBcAmt;
	private String linkInvNo;
	private String linkInvRef;
	private String sysBusiUnit;
	private BigDecimal crnAmt;
	private BigDecimal loanRt;
	private Timestamp lastPayDt;
	private String poolSts;
	private String licenceNo;
	private String sysFuncName;
	private String buyerNm;
	private BigDecimal acctAmt;
	private Timestamp dueDt;
	private BigDecimal loanPerc;
	private BigDecimal loanBalAmt;
	private BigDecimal loanTranAmt;
	private BigDecimal loanBillAmt;
	private BigDecimal payTranAmt;
	private BigDecimal payBillAmt;
	private BigDecimal payAmt;
	private BigDecimal struLoanAmt;
	private Timestamp feeDt;
	private String selNm;// 新建卖方名称
	private BigDecimal dspAmt;// 争议金额
	private Timestamp dspDt;// 争议日期
	private String dspFlag;// 发票争议标识
	private String dspRsn;// 争议原因
	private String otherRsn;// 其他原因
	private String dspRef;// 争议流水号
	private String fixRsn;// 解决原因
	private String theirRef;
	private BigDecimal cbkAmt;// 转让金额
	private String inPool;//是否入池 0是1否
	private String isInvcLoan ;//该笔发票是否融资（0未融资 1已经融资）
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public InvcM() {
	}

	/** minimal constructor */
	public InvcM(String sysRefNo, String invNo) {
		this.sysRefNo = sysRefNo;
		this.invNo = invNo;
	}

	public InvcM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String sysGapiSts, Integer sysEventTimes, String cntrctNo,
			String buyerId, String selId, String orderNo, String invNo,
			String batchNo, Timestamp invDt, Timestamp invValDt,
			Timestamp invDueDt, String invCcy, BigDecimal invAmt,
			BigDecimal invBal, BigDecimal invLoanBal, BigDecimal revTrfAmt,
			String reTrfNo, BigDecimal intAmt, String invSts, String busiTp,
			BigDecimal invLoanAval, String sysRelReason, String adjTp,
			String notes, String arType, Integer acctPeriod,
			BigDecimal chgBcAmt, String linkInvNo, String linkInvRef,
			String sysBusiUnit, BigDecimal crnAmt, BigDecimal loanRt,
			Timestamp lastPayDt, String poolSts, String licenceNo,
			String sysFuncName, String buyerNm, BigDecimal acctAmt,
			Timestamp dueDt, BigDecimal loanPerc, BigDecimal loanBalAmt,
			BigDecimal loanTranAmt, BigDecimal loanBillAmt,
			BigDecimal payTranAmt, BigDecimal payBillAmt, BigDecimal payAmt,
			BigDecimal struLoanAmt, Timestamp feeDt, String selNm,
			BigDecimal dspAmt, Timestamp dspDt, String dspFlag, String dspRsn,
			String otherRsn, String dspRef, String fixRsn, String theirRef,
			BigDecimal cbkAmt,String inPool,String isInvcLoan,String sysOrgId) {
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
		this.sysGapiSts = sysGapiSts;
		this.sysEventTimes = sysEventTimes;
		this.cntrctNo = cntrctNo;
		this.buyerId = buyerId;
		this.selId = selId;
		this.orderNo = orderNo;
		this.invNo = invNo;
		this.batchNo = batchNo;
		this.invDt = invDt;
		this.invValDt = invValDt;
		this.invDueDt = invDueDt;
		this.invCcy = invCcy;
		this.invAmt = invAmt;
		this.invBal = invBal;
		this.invLoanBal = invLoanBal;
		this.revTrfAmt = revTrfAmt;
		this.reTrfNo = reTrfNo;
		this.intAmt = intAmt;
		this.invSts = invSts;
		this.busiTp = busiTp;
		this.invLoanAval = invLoanAval;
		this.sysRelReason = sysRelReason;
		this.adjTp = adjTp;
		this.notes = notes;
		this.arType = arType;
		this.acctPeriod = acctPeriod;
		this.chgBcAmt = chgBcAmt;
		this.linkInvNo = linkInvNo;
		this.linkInvRef = linkInvRef;
		this.sysBusiUnit = sysBusiUnit;
		this.crnAmt = crnAmt;
		this.loanRt = loanRt;
		this.lastPayDt = lastPayDt;
		this.poolSts = poolSts;
		this.licenceNo = licenceNo;
		this.sysFuncName = sysFuncName;
		this.buyerNm = buyerNm;
		this.acctAmt = acctAmt;
		this.dueDt = dueDt;
		this.loanPerc = loanPerc;
		this.loanBalAmt = loanBalAmt;
		this.loanTranAmt = loanTranAmt;
		this.loanBillAmt = loanBillAmt;
		this.payTranAmt = payTranAmt;
		this.payBillAmt = payBillAmt;
		this.payAmt = payAmt;
		this.struLoanAmt = struLoanAmt;
		this.feeDt = feeDt;
		this.selNm = selNm;
		this.dspAmt = dspAmt;
		this.dspDt = dspDt;
		this.dspFlag = dspFlag;
		this.dspRsn = dspRsn;
		this.otherRsn = otherRsn;
		this.dspRef = dspRef;
		this.fixRsn = fixRsn;
		this.theirRef = theirRef;
		this.cbkAmt = cbkAmt;
		this.inPool = inPool;
		this.isInvcLoan = isInvcLoan;
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

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "ACCT_AMT", precision = 18, scale = 4)
	public BigDecimal getAcctAmt() {
		return acctAmt;
	}

	public void setAcctAmt(BigDecimal acctAmt) {
		this.acctAmt = acctAmt;
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

	@Column(name = "SYS_FUNC_NAME", length = 70)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
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

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return this.buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "ORDER_NO", length = 35)
	public String getOrderNo() {
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	@Column(name = "INV_NO", nullable = false, length = 35)
	public String getInvNo() {
		return this.invNo;
	}

	public void setInvNo(String invNo) {
		this.invNo = invNo;
	}

	@Column(name = "BATCH_NO", length = 35)
	public String getBatchNo() {
		return this.batchNo;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	@Column(name = "INV_DT", length = 11)
	public Timestamp getInvDt() {
		return this.invDt;
	}

	public void setInvDt(Timestamp invDt) {
		this.invDt = invDt;
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

	@Column(name = "INV_CCY", length = 3)
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

	@Column(name = "INV_STS", length = 10)
	public String getInvSts() {
		return invSts;
	}

	public void setInvSts(String invSts) {
		this.invSts = invSts;
	}

	@Column(name = "BUSI_TP", length = 8)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "INV_LOAN_AVAL", precision = 18, scale = 4)
	public BigDecimal getInvLoanAval() {
		return invLoanAval;
	}

	public void setInvLoanAval(BigDecimal invLoanAval) {
		this.invLoanAval = invLoanAval;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "ADJ_TP", length = 8)
	public String getAdjTp() {
		return adjTp;
	}

	public void setAdjTp(String adjTp) {
		this.adjTp = adjTp;
	}

	@Column(name = "NOTES", length = 150)
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	@Column(name = "AR_TYPE", length = 5)
	public String getArType() {
		return arType;
	}

	public void setArType(String arType) {
		this.arType = arType;
	}

	@Column(name = "ACCT_PERIOD")
	public Integer getAcctPeriod() {
		return this.acctPeriod;
	}

	public void setAcctPeriod(Integer acctPeriod) {
		this.acctPeriod = acctPeriod;
	}

	@Column(name = "CHG_BC_AMT", precision = 18, scale = 4)
	public BigDecimal getChgBcAmt() {
		return this.chgBcAmt;
	}

	public void setChgBcAmt(BigDecimal chgBcAmt) {
		this.chgBcAmt = chgBcAmt;
	}

	@Column(name = "LINK_INV_NO", length = 35)
	public String getLinkInvNo() {
		return linkInvNo;
	}

	public void setLinkInvNo(String linkInvNo) {
		this.linkInvNo = linkInvNo;
	}

	@Column(name = "LINK_INV_REF", length = 35)
	public String getLinkInvRef() {
		return linkInvRef;
	}

	public void setLinkInvRef(String linkInvRef) {
		this.linkInvRef = linkInvRef;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "INT_AMT", length = 18, scale = 4)
	public BigDecimal getIntAmt() {
		return intAmt;
	}

	public void setIntAmt(BigDecimal intAmt) {
		this.intAmt = intAmt;
	}

	@Column(name = "CRN_AMT", length = 18, scale = 4)
	public BigDecimal getCrnAmt() {
		return crnAmt;
	}

	public void setCrnAmt(BigDecimal crnAmt) {
		this.crnAmt = crnAmt;
	}

	@Column(name = "LOAN_RT", length = 8, scale = 4)
	public BigDecimal getLoanRt() {
		return loanRt;
	}

	public void setLoanRt(BigDecimal loanRt) {
		this.loanRt = loanRt;
	}

	@Column(name = "LAST_PAY_DT", length = 11)
	public Timestamp getLastPayDt() {
		return this.lastPayDt;
	}

	public void setLastPayDt(Timestamp lastPayDt) {
		this.lastPayDt = lastPayDt;
	}

	@Column(name = "POOL_STS", length = 10)
	public String getPoolSts() {
		return poolSts;
	}

	public void setPoolSts(String poolSts) {
		this.poolSts = poolSts;
	}

	@Column(name = "LICENCE_NO", length = 35)
	public String getLicenceNo() {
		return licenceNo;
	}

	public void setLicenceNo(String licenceNo) {
		this.licenceNo = licenceNo;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "DUE_DT")
	public Timestamp getDueDt() {
		return dueDt;
	}

	public void setDueDt(Timestamp dueDt) {
		this.dueDt = dueDt;
	}

	@Column(name = "LOAN_PERC", length = 8, scale = 4)
	public BigDecimal getLoanPerc() {
		return loanPerc;
	}

	public void setLoanPerc(BigDecimal loanPerc) {
		this.loanPerc = loanPerc;
	}

	@Column(name = "LOAN_BAL_AMT", length = 18, scale = 4)
	public BigDecimal getLoanBalAmt() {
		return loanBalAmt;
	}

	public void setLoanBalAmt(BigDecimal loanBalAmt) {
		this.loanBalAmt = loanBalAmt;
	}

	@Column(name = "LOAN_TRAN_AMT", length = 18, scale = 4)
	public BigDecimal getLoanTranAmt() {
		return loanTranAmt;
	}

	public void setLoanTranAmt(BigDecimal loanTranAmt) {
		this.loanTranAmt = loanTranAmt;
	}

	@Column(name = "LOAN_BILL_AMT", length = 18, scale = 4)
	public BigDecimal getLoanBillAmt() {
		return loanBillAmt;
	}

	public void setLoanBillAmt(BigDecimal loanBillAmt) {
		this.loanBillAmt = loanBillAmt;
	}

	@Column(name = "PAY_TRAN_AMT", length = 18, scale = 4)
	public BigDecimal getPayTranAmt() {
		return payTranAmt;
	}

	public void setPayTranAmt(BigDecimal payTranAmt) {
		this.payTranAmt = payTranAmt;
	}

	@Column(name = "PAY_BILL_AMT", length = 18, scale = 4)
	public BigDecimal getPayBillAmt() {
		return payBillAmt;
	}

	public void setPayBillAmt(BigDecimal payBillAmt) {
		this.payBillAmt = payBillAmt;
	}

	@Column(name = "PAY_AMT", length = 18, scale = 4)
	public BigDecimal getPayAmt() {
		return payAmt;
	}

	public void setPayAmt(BigDecimal payAmt) {
		this.payAmt = payAmt;
	}

	@Column(name = "STRU_LOAN_AMT", length = 18, scale = 4)
	public BigDecimal getStruLoanAmt() {
		return struLoanAmt;
	}

	public void setStruLoanAmt(BigDecimal struLoanAmt) {
		this.struLoanAmt = struLoanAmt;
	}

	@Column(name = "FEE_DT")
	public Timestamp getFeeDt() {
		return feeDt;
	}

	public void setFeeDt(Timestamp feeDt) {
		this.feeDt = feeDt;
	}

	@Column(name = "SEL_NM", length = 35)
	public String getSelNm() {
		return selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "DSP_AMT", length = 18, scale = 4)
	public BigDecimal getDspAmt() {
		return dspAmt;
	}

	public void setDspAmt(BigDecimal dspAmt) {
		this.dspAmt = dspAmt;
	}

	@Column(name = "DSP_DT", length = 11)
	public Timestamp getDspDt() {
		return dspDt;
	}

	public void setDspDt(Timestamp dspDt) {
		this.dspDt = dspDt;
	}

	@Column(name = "DSP_FLAG", length = 35)
	public String getDspFlag() {
		return dspFlag;
	}

	public void setDspFlag(String dspFlag) {
		this.dspFlag = dspFlag;
	}

	@Column(name = "DSP_RSN", length = 35)
	public String getDspRsn() {
		return dspRsn;
	}

	public void setDspRsn(String dspRsn) {
		this.dspRsn = dspRsn;
	}

	@Column(name = "OTHER_RSN", length = 35)
	public String getOtherRsn() {
		return otherRsn;
	}

	public void setOtherRsn(String otherRsn) {
		this.otherRsn = otherRsn;
	}

	@Column(name = "DSP_REF", length = 35)
	public String getDspRef() {
		return dspRef;
	}

	public void setDspRef(String dspRef) {
		this.dspRef = dspRef;
	}

	@Column(name = "FIX_RSN", length = 35)
	public String getFixRsn() {
		return fixRsn;
	}

	public void setFixRsn(String fixRsn) {
		this.fixRsn = fixRsn;
	}

	@Column(name = "THEIR_REF", length = 35)
	public String getTheirRef() {
		return theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
	}

	@Column(name = "REV_TRF_AMT", precision = 18, scale = 4)
	public BigDecimal getRevTrfAmt() {
		return revTrfAmt;
	}

	public void setRevTrfAmt(BigDecimal revTrfAmt) {
		this.revTrfAmt = revTrfAmt;
	}

	@Column(name = "RE_TRF_NO", length = 35)
	public String getReTrfNo() {
		return reTrfNo;
	}

	public void setReTrfNo(String reTrfNo) {
		this.reTrfNo = reTrfNo;
	}

	@Column(name = "CBK_AMT", precision = 18, scale = 4)
	public BigDecimal getCbkAmt() {
		return cbkAmt;
	}

	public void setCbkAmt(BigDecimal cbkAmt) {
		this.cbkAmt = cbkAmt;
	}

	@Column(name = "IN_POOL", length = 5)
	public String getInPool() {
		return inPool;
	}

	public void setInPool(String inPool) {
		this.inPool = inPool;
	}

	@Column(name = "IS_INVC_LOAN", length = 5)
	public String getIsInvcLoan() {
		return isInvcLoan;
	}

	public void setIsInvcLoan(String isInvcLoan) {
		this.isInvcLoan = isInvcLoan;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}