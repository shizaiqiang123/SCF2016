package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * InvcCbk entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INVC_CBK", schema = "TRX")
public class InvcCbk implements java.io.Serializable {

	private static final long serialVersionUID = 521803081922284843L;

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
	private String trxId;
	private String invId;
	private String invNo;
	private String invCcy;
	private Timestamp cbkDt;
	private BigDecimal invAmt;
	private BigDecimal invBal;
	private BigDecimal invLoanBal;
	private BigDecimal invCrnBal;
	private String busiTp;
	private String remark;
	private String sysBusiUnit;
	private String buyerId;
	private String buyerNm;
	private Timestamp invValDt;
	private Timestamp invDueDt;
	private Timestamp dueDt;
	private BigDecimal chgBcAmt;
	private String invSts;
	private String pcSts;

	private BigDecimal invLoanAval;
	private BigDecimal crnAmt;
	private String selNm;
	private Double loanPerc;
	private String temp;
	private String invRef;

	private BigDecimal revTrfAmt;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public InvcCbk() {
	}

	/** minimal constructor */
	public InvcCbk(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public InvcCbk(BigDecimal revTrfAmt, String sysRefNo, String sysOpId,
			Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp,
			String sysLockFlag, String sysLockBy, String sysFuncId,
			String sysTrxSts, Integer sysEventTimes, String cntrctNo,
			String trxId, String invId, String invNo, String invCcy,
			Timestamp cbkDt, BigDecimal invAmt, BigDecimal invBal,
			BigDecimal invLoanBal, BigDecimal invCrnBal, String busiTp,
			String remark, String sysBusiUnit, String buyerId, String buyerNm,
			Timestamp invValDt, Timestamp invDueDt, Timestamp dueDt,
			BigDecimal chgBcAmt, BigDecimal invLoanAval, String invSts,
			String pcSts, BigDecimal crnAmt, String selNm, Double loanPerc,
			String temp, String invRef,String sysOrgId) {
		this.revTrfAmt = revTrfAmt;
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
		this.trxId = trxId;
		this.invId = invId;
		this.invNo = invNo;
		this.invCcy = invCcy;
		this.cbkDt = cbkDt;
		this.invAmt = invAmt;
		this.invBal = invBal;
		this.invLoanBal = invLoanBal;
		this.invCrnBal = invCrnBal;
		this.busiTp = busiTp;
		this.remark = remark;
		this.sysBusiUnit = sysBusiUnit;
		this.buyerId = buyerId;
		this.buyerNm = buyerNm;
		this.invValDt = invValDt;
		this.invDueDt = invDueDt;
		this.dueDt = dueDt;
		this.chgBcAmt = chgBcAmt;
		this.invSts = invSts;
		this.pcSts = pcSts;
		this.invLoanAval = invLoanAval;
		this.crnAmt = crnAmt;
		this.selNm = selNm;
		this.loanPerc = loanPerc;
		this.temp = temp;
		this.invRef = invRef;
		this.sysOrgId = sysOrgId;
	}

	@Column(name = "INV_LOAN_AVAL", precision = 18, scale = 4)
	public BigDecimal getInvLoanAval() {
		return invLoanAval;
	}

	public void setInvLoanAval(BigDecimal invLoanAval) {
		this.invLoanAval = invLoanAval;
	}

	@Column(name = "REV_TRF_AMT", precision = 18, scale = 3)
	public BigDecimal getRevTrfAmt() {
		return revTrfAmt;
	}

	public void setRevTrfAmt(BigDecimal revTrfAmt) {
		this.revTrfAmt = revTrfAmt;
	}

	@Column(name = "CHG_BC_AMT", precision = 18, scale = 4)
	public BigDecimal getChgBcAmt() {
		return chgBcAmt;
	}

	public void setChgBcAmt(BigDecimal chgBcAmt) {
		this.chgBcAmt = chgBcAmt;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "INV_VAL_DT")
	public Timestamp getInvValDt() {
		return invValDt;
	}

	public void setInvValDt(Timestamp invValDt) {
		this.invValDt = invValDt;
	}

	@Column(name = "INV_DUE_DT")
	public Timestamp getInvDueDt() {
		return invDueDt;
	}

	public void setInvDueDt(Timestamp invDueDt) {
		this.invDueDt = invDueDt;
	}

	@Column(name = "DUE_DT")
	public Timestamp getDueDt() {
		return dueDt;
	}

	public void setDueDt(Timestamp dueDt) {
		this.dueDt = dueDt;
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

	@Column(name = "SYS_EVENT_TIMES", precision = 38, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "TRX_ID", length = 35)
	public String getTrxId() {
		return this.trxId;
	}

	public void setTrxId(String trxId) {
		this.trxId = trxId;
	}

	@Column(name = "INV_ID", length = 35)
	public String getInvId() {
		return this.invId;
	}

	public void setInvId(String invId) {
		this.invId = invId;
	}

	@Column(name = "INV_NO", length = 35)
	public String getInvNo() {
		return this.invNo;
	}

	public void setInvNo(String invNo) {
		this.invNo = invNo;
	}

	@Column(name = "INV_CCY", length = 3)
	public String getInvCcy() {
		return this.invCcy;
	}

	public void setInvCcy(String invCcy) {
		this.invCcy = invCcy;
	}

	@Column(name = "CBK_DT")
	public Timestamp getCbkDt() {
		return this.cbkDt;
	}

	public void setCbkDt(Timestamp cbkDt) {
		this.cbkDt = cbkDt;
	}

	@Column(name = "INV_AMT", precision = 18, scale = 3)
	public BigDecimal getInvAmt() {
		return this.invAmt;
	}

	public void setInvAmt(BigDecimal invAmt) {
		this.invAmt = invAmt;
	}

	@Column(name = "INV_BAL", precision = 18, scale = 3)
	public BigDecimal getInvBal() {
		return this.invBal;
	}

	public void setInvBal(BigDecimal invBal) {
		this.invBal = invBal;
	}

	@Column(name = "INV_LOAN_BAL", precision = 18, scale = 3)
	public BigDecimal getInvLoanBal() {
		return this.invLoanBal;
	}

	public void setInvLoanBal(BigDecimal invLoanBal) {
		this.invLoanBal = invLoanBal;
	}

	@Column(name = "INV_CRN_BAL", precision = 18, scale = 3)
	public BigDecimal getInvCrnBal() {
		return this.invCrnBal;
	}

	public void setInvCrnBal(BigDecimal invCrnBal) {
		this.invCrnBal = invCrnBal;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
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

	@Column(name = "INV_STS", length = 10)
	public String getInvSts() {
		return this.invSts;
	}

	public void setInvSts(String invSts) {
		this.invSts = invSts;
	}

	@Column(name = "PC_STS", length = 10)
	public String getPcSts() {
		return this.pcSts;
	}

	public void setPcSts(String pcSts) {
		this.pcSts = pcSts;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "CRN_AMT", nullable = false, precision = 38, scale = 0)
	public BigDecimal getCrnAmt() {
		return crnAmt;
	}

	public void setCrnAmt(BigDecimal crnAmt) {
		this.crnAmt = crnAmt;
	}

	@Column(name = "SEL_NM", length = 40)
	public String getSelNm() {
		return selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "LOAN_PERC", precision = 18, scale = 4)
	public Double getLoanPerc() {
		return loanPerc;
	}

	public void setLoanPerc(Double loanPerc) {
		this.loanPerc = loanPerc;
	}

	@Column(name = "TEMP", length = 40)
	public String getTemp() {
		return temp;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	@Column(name = "INV_REF", length = 40)
	public String getInvRef() {
		return invRef;
	}

	public void setInvRef(String invRef) {
		this.invRef = invRef;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
}