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
 * BailPayM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "BAIL_PAY_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class BailPayM implements java.io.Serializable {

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
	private String loanId;
	private String cntrctNo;
	private String selId;
	private String selNm;
	private String buyerId;
	private String buyerNm;
	private BigDecimal bailPayAmt;
	private String busiTp;
	private String ccy;
	private Timestamp trxDt;
	private String remark;
	private String attribute1;
	private String attrvalue1;
	private String attribute2;
	private String attrvalue2;
	private String attribute3;
	private String attrvalue3;
	private Timestamp loanValDt;
	private Timestamp loanDueDt;
	private BigDecimal ttlLoanAmt;
	private BigDecimal marginAmt;
	private BigDecimal marginBal;
	private String loanTp;
	private String initMarginPct;
	private String marginAcNo;
	private String payBailAcno;
	private BigDecimal marginCompen;
	private String sysRelReason;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	private BigDecimal ttlCrtfAmt;

	// Constructors

	/** default constructor */
	public BailPayM() {
	}

	/** minimal constructor */
	public BailPayM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public BailPayM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String loanId, String cntrctNo,
			String selId, String selNm, String buyerId, String buyerNm,
			BigDecimal bailPayAmt, String busiTp, String ccy, Timestamp trxDt,
			String remark, String attribute1, String attrvalue1,
			String attribute2, String attrvalue2, String attribute3,
			String attrvalue3, Timestamp loanValDt, Timestamp loanDueDt,
			BigDecimal ttlLoanAmt, BigDecimal marginAmt, BigDecimal marginBal,
			String loanTp, String initMarginPct, String marginAcNo,
			String payBailAcno, BigDecimal marginCompen, String sysRelReason,String sysOrgId,BigDecimal ttlCrtfAmt) {
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
		this.loanId = loanId;
		this.cntrctNo = cntrctNo;
		this.selId = selId;
		this.selNm = selNm;
		this.buyerId = buyerId;
		this.buyerNm = buyerNm;
		this.bailPayAmt = bailPayAmt;
		this.busiTp = busiTp;
		this.ccy = ccy;
		this.trxDt = trxDt;
		this.remark = remark;
		this.attribute1 = attribute1;
		this.attrvalue1 = attrvalue1;
		this.attribute2 = attribute2;
		this.attrvalue2 = attrvalue2;
		this.attribute3 = attribute3;
		this.attrvalue3 = attrvalue3;
		this.loanValDt = loanValDt;
		this.loanDueDt = loanDueDt;
		this.ttlLoanAmt = ttlLoanAmt;
		this.marginAmt = marginAmt;
		this.marginBal = marginBal;
		this.loanTp = loanTp;
		this.initMarginPct = initMarginPct;
		this.marginAcNo = marginAcNo;
		this.payBailAcno = payBailAcno;
		this.marginCompen = marginCompen;
		this.sysRelReason = sysRelReason;
		this.sysOrgId = sysOrgId;
		this.ttlCrtfAmt = ttlCrtfAmt;
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

	@Column(name = "LOAN_ID", length = 35)
	public String getLoanId() {
		return this.loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
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

	@Column(name = "BAIL_PAY_AMT", precision = 18, scale = 3)
	public BigDecimal getBailPayAmt() {
		return this.bailPayAmt;
	}

	public void setBailPayAmt(BigDecimal bailPayAmt) {
		this.bailPayAmt = bailPayAmt;
	}

	@Column(name = "BUSI_TP", length = 2)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "TRX_DT")
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "ATTRIBUTE1", length = 35)
	public String getAttribute1() {
		return this.attribute1;
	}

	public void setAttribute1(String attribute1) {
		this.attribute1 = attribute1;
	}

	@Column(name = "ATTRVALUE1", length = 35)
	public String getAttrvalue1() {
		return this.attrvalue1;
	}

	public void setAttrvalue1(String attrvalue1) {
		this.attrvalue1 = attrvalue1;
	}

	@Column(name = "ATTRIBUTE2", length = 35)
	public String getAttribute2() {
		return this.attribute2;
	}

	public void setAttribute2(String attribute2) {
		this.attribute2 = attribute2;
	}

	@Column(name = "ATTRVALUE2", length = 35)
	public String getAttrvalue2() {
		return this.attrvalue2;
	}

	public void setAttrvalue2(String attrvalue2) {
		this.attrvalue2 = attrvalue2;
	}

	@Column(name = "ATTRIBUTE3", length = 35)
	public String getAttribute3() {
		return this.attribute3;
	}

	public void setAttribute3(String attribute3) {
		this.attribute3 = attribute3;
	}

	@Column(name = "ATTRVALUE3", length = 35)
	public String getAttrvalue3() {
		return this.attrvalue3;
	}

	public void setAttrvalue3(String attrvalue3) {
		this.attrvalue3 = attrvalue3;
	}

	@Column(name = "LOAN_VAL_DT")
	public Timestamp getLoanValDt() {
		return loanValDt;
	}

	public void setLoanValDt(Timestamp loanValDt) {
		this.loanValDt = loanValDt;
	}

	@Column(name = "LOAN_DUE_DT")
	public Timestamp getLoanDueDt() {
		return loanDueDt;
	}

	public void setLoanDueDt(Timestamp loanDueDt) {
		this.loanDueDt = loanDueDt;
	}

	@Column(name = "TTL_LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlLoanAmt() {
		return ttlLoanAmt;
	}

	public void setTtlLoanAmt(BigDecimal ttlLoanAmt) {
		this.ttlLoanAmt = ttlLoanAmt;
	}

	@Column(name = "MARGIN_AMT", precision = 18, scale = 3)
	public BigDecimal getMarginAmt() {
		return marginAmt;
	}

	public void setMarginAmt(BigDecimal marginAmt) {
		this.marginAmt = marginAmt;
	}

	@Column(name = "MARGIN_BAL", precision = 18, scale = 3)
	public BigDecimal getMarginBal() {
		return marginBal;
	}

	public void setMarginBal(BigDecimal marginBal) {
		this.marginBal = marginBal;
	}

	@Column(name = "LOAN_TP")
	public String getLoanTp() {
		return loanTp;
	}

	public void setLoanTp(String loanTp) {
		this.loanTp = loanTp;
	}

	@Column(name = "INIT_MARGIN_PCT", length = 35)
	public String getInitMarginPct() {
		return initMarginPct;
	}

	public void setInitMarginPct(String initMarginPct) {
		this.initMarginPct = initMarginPct;
	}

	@Column(name = "MARGIN_AC_NO", length = 35)
	public String getMarginAcNo() {
		return marginAcNo;
	}

	public void setMarginAcNo(String marginAcNo) {
		this.marginAcNo = marginAcNo;
	}

	@Column(name = "PAY_BAIL_ACNO", length = 35)
	public String getPayBailAcno() {
		return payBailAcno;
	}

	public void setPayBailAcno(String payBailAcno) {
		this.payBailAcno = payBailAcno;
	}

	@Column(name = "MARGIN_COMPEN", length = 35)
	public BigDecimal getMarginCompen() {
		return marginCompen;
	}

	public void setMarginCompen(BigDecimal marginCompen) {
		this.marginCompen = marginCompen;
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

	@Column(name = "TTL_CRTF_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlCrtfAmt() {
		return ttlCrtfAmt;
	}

	public void setTtlCrtfAmt(BigDecimal ttlCrtfAmt) {
		this.ttlCrtfAmt = ttlCrtfAmt;
	}
	
	
	
}