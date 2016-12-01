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
 * PmtM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PMT_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class PmtM implements java.io.Serializable {

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
	private BigDecimal ttlPmtAmt;
	private Timestamp pmtDt;
	private Timestamp trxDt;
	private String selId;
	private String buyerId;
	private String selNm;
	private String buyerNm;
	private String busiTp;
	private String serviceReq;
	private String loanId;
	private BigDecimal payIntAmt;
	private BigDecimal payPrinAmt;
	private String poId;
	private String sysRelReason;
	private String pmtTp;
	private String sysBusiUnit;
	private Integer pmtTimes;
	private String clearPmt;
	private String theirRef;
	private Timestamp lastPayDt;
	private String pmtSts;
	private String selAcNo;
	private String selAcNm;
	private String selAcBkNo;
	private String selAcBkNm;
	private String sysFuncName;
	private String printNumber;
	private String lmtCcy;
	private BigDecimal verPmtAmt;
	private BigDecimal payTranAmt;
	private BigDecimal payBillAmt;
	private String acNo;
	private BigDecimal lmtBal;
	private BigDecimal lmtAvl;
	private BigDecimal lmtAmt;
	private String sysRefNoSbr;
	private BigDecimal cntrctSbrBuyerBal;
	private BigDecimal buyerLmtBal;
	private BigDecimal buyerLmtAvl;
	private String cntrctNo;
	private String insureNo;
	private BigDecimal marginAmtUsed;//保证金提取金额
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	private BigDecimal poAmt;//订单金额
	private String poNo;//订单编号
	// Constructors
	private String  isConfirm;
	private String confirmFlag;
	private String  confirmOp;

	/** default constructor */
	public PmtM() {
	}

	/** minimal constructor */
	public PmtM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public PmtM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String sysGapiSts, Integer sysEventTimes, BigDecimal ttlPmtAmt,
			Timestamp pmtDt, Timestamp trxDt, String selId, String buyerId,
			String selNm, String buyerNm, String busiTp, String serviceReq,
			String loanId, BigDecimal payIntAmt, BigDecimal payPrinAmt,
			String poId, String sysRelReason, String pmtTp, String sysBusiUnit,
			Integer pmtTimes, String clearPmt, String theirRef,
			Timestamp lastPayDt, String pmtSts, String selAcNo, String selAcNm,
			String selAcBkNo, String selAcBkNm, String sysFuncName,
			String printNumber, String lmtCcy, BigDecimal verPmtAmt,
			BigDecimal payTranAmt, BigDecimal payBillAmt, String acNo,
			BigDecimal lmtBal, BigDecimal lmtAvl, BigDecimal lmtAmt,
			String sysRefNoSbr, BigDecimal cntrctSbrBuyerBal,
			BigDecimal buyerLmtBal, BigDecimal buyerLmtAvl, String cntrctNo,
			String insureNo, BigDecimal marginAmtUsed,String sysOrgId,
			String isConfirm,String confirmFlag,String confirmOp,BigDecimal poAmt, String poNo) {
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
		this.ttlPmtAmt = ttlPmtAmt;
		this.pmtDt = pmtDt;
		this.trxDt = trxDt;
		this.selId = selId;
		this.buyerId = buyerId;
		this.selNm = selNm;
		this.buyerNm = buyerNm;
		this.busiTp = busiTp;
		this.serviceReq = serviceReq;
		this.loanId = loanId;
		this.payIntAmt = payIntAmt;
		this.payPrinAmt = payPrinAmt;
		this.poId = poId;
		this.sysRelReason = sysRelReason;
		this.pmtTp = pmtTp;
		this.sysBusiUnit = sysBusiUnit;
		this.pmtTimes = pmtTimes;
		this.clearPmt = clearPmt;
		this.theirRef = theirRef;
		this.lastPayDt = lastPayDt;
		this.pmtSts = pmtSts;
		this.selAcNo = selAcNo;
		this.selAcNm = selAcNm;
		this.selAcBkNo = selAcBkNo;
		this.selAcBkNm = selAcBkNm;
		this.sysFuncName = sysFuncName;
		this.printNumber = printNumber;
		this.lmtCcy = lmtCcy;
		this.verPmtAmt = verPmtAmt;
		this.payTranAmt = payTranAmt;
		this.payBillAmt = payBillAmt;
		this.acNo = acNo;
		this.lmtBal = lmtBal;
		this.lmtAvl = lmtAvl;
		this.lmtAmt = lmtAmt;
		this.sysRefNoSbr = sysRefNoSbr;
		this.cntrctSbrBuyerBal = cntrctSbrBuyerBal;
		this.buyerLmtBal = buyerLmtBal;
		this.buyerLmtAvl = buyerLmtAvl;
		this.cntrctNo = cntrctNo;
		this.insureNo = insureNo;
		this.marginAmtUsed = marginAmtUsed;
		this.sysOrgId = sysOrgId;
		this.poAmt = poAmt;
		this.poNo = poNo;
		this.isConfirm = isConfirm;
		this.confirmFlag = confirmFlag;
		this.confirmOp = confirmOp;
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
	
	
	@Column(name = "PRINT_NUMBER", length = 35)
	public String getPrintNumber() {
		return printNumber;
	}

	public void setPrintNumber(String printNumber) {
		this.printNumber = printNumber;
	}

	@Column(name = "SYS_BUSI_UNIT", length = 35)
	public String getSysBusiUnit() {
		return sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
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
	
	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "TTL_PMT_AMT", precision = 18, scale = 4)
	public BigDecimal getTtlPmtAmt() {
		return this.ttlPmtAmt;
	}

	public void setTtlPmtAmt(BigDecimal ttlPmtAmt) {
		this.ttlPmtAmt = ttlPmtAmt;
	}

	@Column(name = "PMT_DT", length = 11)
	public Timestamp getPmtDt() {
		return this.pmtDt;
	}

	public void setPmtDt(Timestamp pmtDt) {
		this.pmtDt = pmtDt;
	}

	@Column(name = "TRX_DT", length = 11)
	public Timestamp getTrxDt() {
		return this.trxDt;
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

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return this.buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
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

	@Column(name = "BUSI_TP", length = 8)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "SERVICE_REQ", length = 1)
	public String getServiceReq() {
		return this.serviceReq;
	}

	public void setServiceReq(String serviceReq) {
		this.serviceReq = serviceReq;
	}

	@Column(name = "LOAN_ID", length = 35)
	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	@Column(name = "PAY_INT_AMT", precision = 18, scale = 4)
	public BigDecimal getPayIntAmt() {
		return payIntAmt;
	}

	public void setPayIntAmt(BigDecimal payIntAmt) {
		this.payIntAmt = payIntAmt;
	}

	@Column(name = "PAY_PRIN_AMT", precision = 18, scale = 4)
	public BigDecimal getPayPrinAmt() {
		return payPrinAmt;
	}

	public void setPayPrinAmt(BigDecimal payPrinAmt) {
		this.payPrinAmt = payPrinAmt;
	}

	@Column(name = "PO_ID", length = 35)
	public String getPoId() {
		return poId;
	}

	public void setPoId(String poId) {
		this.poId = poId;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "PMT_TP", length = 8)
	public String getPmtTp() {
		return pmtTp;
	}

	public void setPmtTp(String pmtTp) {
		this.pmtTp = pmtTp;
	}

	@Column(name = "PMT_TIMES", precision = 4, scale = 0)
	public Integer getPmtTimes() {
		return pmtTimes;
	}

	public void setPmtTimes(Integer pmtTimes) {
		this.pmtTimes = pmtTimes;
	}

	@Column(name = "CLEAR_PMT", length = 15)
	public String getClearPmt() {
		return clearPmt;
	}

	public void setClearPmt(String clearPmt) {
		this.clearPmt = clearPmt;
	}

	@Column(name = "THEIR_REF", length = 35)
	public String getTheirRef() {
		return theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
	}

	@Column(name = "LAST_PAY_DT", length = 11)
	public Timestamp getLastPayDt() {
		return lastPayDt;
	}

	public void setLastPayDt(Timestamp lastPayDt) {
		this.lastPayDt = lastPayDt;
	}

	@Column(name = "PMT_STS", length = 3)
	public String getPmtSts() {
		return pmtSts;
	}

	public void setPmtSts(String pmtSts) {
		this.pmtSts = pmtSts;
	}

	@Column(name = "SEL_AC_NO", length = 40)
	public String getSelAcNo() {
		return selAcNo;
	}

	public void setSelAcNo(String selAcNo) {
		this.selAcNo = selAcNo;
	}

	@Column(name = "SEL_AC_NM", length = 50)
	public String getSelAcNm() {
		return selAcNm;
	}

	public void setSelAcNm(String selAcNm) {
		this.selAcNm = selAcNm;
	}

	@Column(name = "SEL_AC_BK_NM", length = 50)
	public String getSelAcBkNm() {
		return selAcBkNm;
	}

	public void setSelAcBkNm(String selAcBkNm) {
		this.selAcBkNm = selAcBkNm;
	}

	@Column(name = "SEL_AC_BK_NO", length = 40)
	public String getSelAcBkNo() {
		return selAcBkNo;
	}

	public void setSelAcBkNo(String selAcBkNo) {
		this.selAcBkNo = selAcBkNo;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "LMT_CCY", length = 30)
	public String getLmtCcy() {
		return lmtCcy;
	}

	public void setLmtCcy(String lmtCcy) {
		this.lmtCcy = lmtCcy;
	}

	@Column(name = "VER_PMT_AMT", length = 30,scale=4)
	public BigDecimal getVerPmtAmt() {
		return verPmtAmt;
	}

	public void setVerPmtAmt(BigDecimal verPmtAmt) {
		this.verPmtAmt = verPmtAmt;
	}

	@Column(name = "PAY_TRAN_AMT", length = 30 ,scale=4)
	public BigDecimal getPayTranAmt() {
		return payTranAmt;
	}

	public void setPayTranAmt(BigDecimal payTranAmt) {
		this.payTranAmt = payTranAmt;
	}

	@Column(name = "PAY_BILL_AMT", length = 30,scale=4)
	public BigDecimal getPayBillAmt() {
		return payBillAmt;
	}

	public void setPayBillAmt(BigDecimal payBillAmt) {
		this.payBillAmt = payBillAmt;
	}

	@Column(name = "AC_NO", length = 30)
	public String getAcNo() {
		return acNo;
	}

	public void setAcNo(String acNo) {
		this.acNo = acNo;
	}

	@Column(name = "LMT_BAL", length = 30,scale=4)
	public BigDecimal getLmtBal() {
		return lmtBal;
	}

	public void setLmtBal(BigDecimal lmtBal) {
		this.lmtBal = lmtBal;
	}

	@Column(name = "LMT_AVL", length = 30,scale=4)
	public BigDecimal getLmtAvl() {
		return lmtAvl;
	}

	public void setLmtAvl(BigDecimal lmtAvl) {
		this.lmtAvl = lmtAvl;
	}

	@Column(name = "LMT_AMT", length = 30,scale=4)
	public BigDecimal getLmtAmt() {
		return lmtAmt;
	}

	public void setLmtAmt(BigDecimal lmtAmt) {
		this.lmtAmt = lmtAmt;
	}

	@Column(name = "SYS_REF_NO_SBR", length = 35)
	public String getSysRefNoSbr() {
		return sysRefNoSbr;
	}

	public void setSysRefNoSbr(String sysRefNoSbr) {
		this.sysRefNoSbr = sysRefNoSbr;
	}

	@Column(name = "CNTRCT_SBR_BUYER_BAL", length = 30,scale=4)
	public BigDecimal getCntrctSbrBuyerBal() {
		return cntrctSbrBuyerBal;
	}

	public void setCntrctSbrBuyerBal(BigDecimal cntrctSbrBuyerBal) {
		this.cntrctSbrBuyerBal = cntrctSbrBuyerBal;
	}

	@Column(name = "BUYER_LMT_BAL", length = 30,scale=4)
	public BigDecimal getBuyerLmtBal() {
		return buyerLmtBal;
	}

	public void setBuyerLmtBal(BigDecimal buyerLmtBal) {
		this.buyerLmtBal = buyerLmtBal;
	}

	@Column(name = "BUYER_LMT_AVL", length = 30,scale=4)
	public BigDecimal getBuyerLmtAvl() {
		return buyerLmtAvl;
	}

	public void setBuyerLmtAvl(BigDecimal buyerLmtAvl) {
		this.buyerLmtAvl = buyerLmtAvl;
	}

	@Column(name = "CNTRCT_NO", length = 30,scale=4)
	public String getCntrctNo() {
		return cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "INSURE_NO", length = 35)
	public String getInsureNo() {
		return insureNo;
	}

	public void setInsureNo(String insureNo) {
		this.insureNo = insureNo;
	}
	
	@Column(name = "MARGIN_AMT_USED", length = 30,scale=4)
	public BigDecimal getMarginAmtUsed() {
		return marginAmtUsed;
	}

	public void setMarginAmtUsed(BigDecimal marginAmtUsed) {
		this.marginAmtUsed = marginAmtUsed;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
	@Column(name = "IS_CONFIRM", length = 2)
	public String getIsConfirm() {
		return isConfirm;
	}

	public void setIsConfirm(String isConfirm) {
		this.isConfirm = isConfirm;
	}
	
	@Column(name = "CONFIRM_FLAG", length = 2)
	public String getConfirmFlag() {
		return confirmFlag;
	}

	public void setConfirmFlag(String confirmFlag) {
		this.confirmFlag = confirmFlag;
	}
	
	@Column(name = "CONFIRM_OP", length = 256)
	public String getConfirmOp() {
		return confirmOp;
	}

	public void setConfirmOp(String confirmOp) {
		this.confirmOp = confirmOp;
	}
	
	@Column(name = "PO_NO", length = 35)
	public String getPoNo() {
		return poNo;
	}

	public void setPoNo(String poNo) {
		this.poNo = poNo;
	}

	@Column(name = "PO_AMT", length = 18, scale = 4)
	public BigDecimal getPoAmt() {
		return poAmt;
	}

	public void setPoAmt(BigDecimal poAmt) {
		this.poAmt = poAmt;
	}
}