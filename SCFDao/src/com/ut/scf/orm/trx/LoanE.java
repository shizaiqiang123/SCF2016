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
 * LoanE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "LOAN_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class LoanE implements java.io.Serializable {

	// Fields

	private LoanEId id;
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
	private BigDecimal loanPct;
	private BigDecimal loanRt;
	private Integer loanTimes;
	private BigDecimal intAmt;
	private Timestamp loanValDt;
	private Timestamp loanDueDt;
	private BigDecimal ttlLoanAmt;
	private String busiTp;
	private String selId;
	private String buyerId;
	private String selNm;
	private String buyerNm;
	private String serviceReq;
	private Timestamp trxDt;
	private BigDecimal selLmtBal;
	private Timestamp selLmtDueDt;
	private String poNo;
	private String poId;
	private BigDecimal ttlLoanBal;
	private BigDecimal ttlLoanBalHD;
	private String regNo;
	private String cntrctNo;
	private String ccy;
	private String sysRelReason;
	private BigDecimal marginAmt;
	private String marginAcNo;
	private BigDecimal marginCompen;
	private BigDecimal marginRele;
	private BigDecimal marginBal;
	private BigDecimal ttlDlvAmt;
	private String sysBusiUnit;
	private String advaPaytype;
	private String investorName;
	private String selAcNo;
	private String payIntTp;
	private BigDecimal finChgrt;
	private String finaSts;
	private String payChgTp;
	private Integer pmtTimes;
	private Timestamp lastPayDt;
	private String selAcNm;
	private String selAcBkNo;
	private String selAcBkNm;
	private String sysFuncName;
	private String printNumber;
	private String sellerInstCd;
	private String loanTp;
	private String loanApplicat;
	private BigDecimal initMarginPct;
	private BigDecimal authMarginPct;
	private BigDecimal lmtBal;
	private BigDecimal lmtAllocate;
	private BigDecimal lmtAmt;
	private BigDecimal loanAble;
	private String payBailAcno;
	private Timestamp loanOverdueDt;
	private String InsureNo;
	private String isCollect;
	private BigDecimal pdgAmt;
	private BigDecimal payIntAmt;
	private BigDecimal payPrinAmt;
	private BigDecimal pmtAmt;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7
	private String isConfirm;// 是否确认
	private String confirmFlag;// 0：外网融资；1：银行确认
	private String confirmOp;// 意见
	private BigDecimal poAmt;// 订单金额
	private String remark;
	
	// Constructors

	/** default constructor */
	public LoanE() {
	}

	/** minimal constructor */
	public LoanE(LoanEId id) {
		this.id = id;
	}

	/** full constructor */
	public LoanE(LoanEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String sysGapiSts, BigDecimal loanPct, BigDecimal loanRt,
			Integer loanTimes, BigDecimal intAmt, Timestamp loanValDt,
			Timestamp loanDueDt, BigDecimal ttlLoanAmt, String busiTp,
			String selId, String buyerId, String selNm, String buyerNm,
			String serviceReq, Timestamp trxDt, BigDecimal selLmtBal,
			Timestamp selLmtDueDt, String poNo, String poId,
			BigDecimal ttlLoanBal, BigDecimal ttlLoanBalHD, String regNo,
			String cntrctNo, String ccy, String sysRelReason,
			BigDecimal marginAmt, String marginAcNo, BigDecimal marginCompen,
			BigDecimal marginRele, BigDecimal marginBal, BigDecimal ttlDlvAmt,
			String sysBusiUnit, String advaPaytype, String investorName,
			String selAcNo, String payIntTp, BigDecimal finChgrt,
			String finaSts, String payChgTp, Integer pmtTimes,
			Timestamp lastPayDt, String selAcNm, String selAcBkNo,
			String selAcBkNm, String sysFuncName, String printNumber,
			String sellerInstCd, String loanTp, String loanApplicat,
			BigDecimal initMarginPct, BigDecimal authMarginPct,
			BigDecimal lmtBal, BigDecimal lmtAllocate, BigDecimal lmtAmt,
			BigDecimal loanAble, String payBailAcno, Timestamp loanOverdueDt,
			String insureNo, String isCollect, BigDecimal pdgAmt,
			BigDecimal payIntAmt, BigDecimal payPrinAmt, BigDecimal pmtAmt,
			String sysOrgId, String isConfirm, String confirmFlag,
			String confirmOp, BigDecimal poAmt,String remark) {
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
		this.sysGapiSts = sysGapiSts;
		this.loanPct = loanPct;
		this.loanRt = loanRt;
		this.loanTimes = loanTimes;
		this.intAmt = intAmt;
		this.loanValDt = loanValDt;
		this.loanDueDt = loanDueDt;
		this.ttlLoanAmt = ttlLoanAmt;
		this.busiTp = busiTp;
		this.selId = selId;
		this.buyerId = buyerId;
		this.selNm = selNm;
		this.buyerNm = buyerNm;
		this.serviceReq = serviceReq;
		this.trxDt = trxDt;
		this.selLmtBal = selLmtBal;
		this.selLmtDueDt = selLmtDueDt;
		this.poNo = poNo;
		this.poId = poId;
		this.ttlLoanBal = ttlLoanBal;
		this.ttlLoanBalHD = ttlLoanBalHD;
		this.regNo = regNo;
		this.cntrctNo = cntrctNo;
		this.ccy = ccy;
		this.sysRelReason = sysRelReason;
		this.marginAmt = marginAmt;
		this.marginAcNo = marginAcNo;
		this.marginCompen = marginCompen;
		this.marginRele = marginRele;
		this.marginBal = marginBal;
		this.ttlDlvAmt = ttlDlvAmt;
		this.sysBusiUnit = sysBusiUnit;
		this.advaPaytype = advaPaytype;
		this.investorName = investorName;
		this.selAcNo = selAcNo;
		this.payIntTp = payIntTp;
		this.finChgrt = finChgrt;
		this.finaSts = finaSts;
		this.payChgTp = payChgTp;
		this.pmtTimes = pmtTimes;
		this.lastPayDt = lastPayDt;
		this.selAcNm = selAcNm;
		this.selAcBkNo = selAcBkNo;
		this.selAcBkNm = selAcBkNm;
		this.sysFuncName = sysFuncName;
		this.printNumber = printNumber;
		this.sellerInstCd = sellerInstCd;
		this.loanTp = loanTp;
		this.loanApplicat = loanApplicat;
		this.initMarginPct = initMarginPct;
		this.authMarginPct = authMarginPct;
		this.lmtBal = lmtBal;
		this.lmtAllocate = lmtAllocate;
		this.lmtAmt = lmtAmt;
		this.loanAble = loanAble;
		this.payBailAcno = payBailAcno;
		this.loanOverdueDt = loanOverdueDt;
		InsureNo = insureNo;
		this.isCollect = isCollect;
		this.pdgAmt = pdgAmt;
		this.payIntAmt = payIntAmt;
		this.payPrinAmt = payPrinAmt;
		this.pmtAmt = pmtAmt;
		this.sysOrgId = sysOrgId;
		this.isConfirm = isConfirm;
		this.confirmFlag = confirmFlag;
		this.confirmOp = confirmOp;
		this.poAmt = poAmt;
		this.remark = remark;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)) })
	public LoanEId getId() {
		return this.id;
	}

	public void setId(LoanEId id) {
		this.id = id;
	}

	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
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

	@Column(name = "PRINT_NUMBER", length = 35)
	public String getPrintNumber() {
		return printNumber;
	}

	public void setPrintNumber(String printNumber) {
		this.printNumber = printNumber;
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

	@Column(name = "LOAN_PCT", precision = 8, scale = 4)
	public BigDecimal getLoanPct() {
		return this.loanPct;
	}

	public void setLoanPct(BigDecimal loanPct) {
		this.loanPct = loanPct;
	}

	@Column(name = "LOAN_RT", precision = 18, scale = 4)
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

	@Column(name = "TTL_LOAN_AMT", precision = 18, scale = 4)
	public BigDecimal getTtlLoanAmt() {
		return this.ttlLoanAmt;
	}

	public void setTtlLoanAmt(BigDecimal ttlLoanAmt) {
		this.ttlLoanAmt = ttlLoanAmt;
	}

	@Column(name = "BUSI_TP", length = 8)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
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

	@Column(name = "SERVICE_REQ", length = 1)
	public String getServiceReq() {
		return this.serviceReq;
	}

	public void setServiceReq(String serviceReq) {
		this.serviceReq = serviceReq;
	}

	@Column(name = "TRX_DT", length = 11)
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "SEL_LMT_BAL", precision = 18, scale = 4)
	public BigDecimal getSelLmtBal() {
		return this.selLmtBal;
	}

	public void setSelLmtBal(BigDecimal selLmtBal) {
		this.selLmtBal = selLmtBal;
	}

	@Column(name = "SEL_LMT_DUE_DT", length = 11)
	public Timestamp getSelLmtDueDt() {
		return this.selLmtDueDt;
	}

	public void setSelLmtDueDt(Timestamp selLmtDueDt) {
		this.selLmtDueDt = selLmtDueDt;
	}

	@Column(name = "PO_NO", length = 35)
	public String getPoNo() {
		return this.poNo;
	}

	public void setPoNo(String poNo) {
		this.poNo = poNo;
	}

	@Column(name = "PO_ID", length = 35)
	public String getPoId() {
		return this.poId;
	}

	public void setPoId(String poId) {
		this.poId = poId;
	}

	@Column(name = "TTL_LOAN_BAL", precision = 18, scale = 4)
	public BigDecimal getTtlLoanBal() {
		return this.ttlLoanBal;
	}

	public void setTtlLoanBal(BigDecimal ttlLoanBal) {
		this.ttlLoanBal = ttlLoanBal;
	}

	@Column(name = "TTL_LOAN_BALHD", precision = 18, scale = 4)
	public BigDecimal getTtlLoanBalHD() {
		return ttlLoanBalHD;
	}

	public void setTtlLoanBalHD(BigDecimal ttlLoanBalHD) {
		this.ttlLoanBalHD = ttlLoanBalHD;
	}

	@Column(name = "REG_NO", length = 35)
	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "MARGIN_AMT", precision = 18, scale = 4)
	public BigDecimal getMarginAmt() {
		return marginAmt;
	}

	public void setMarginAmt(BigDecimal marginAmt) {
		this.marginAmt = marginAmt;
	}

	@Column(name = "MARGIN_AC_NO", length = 35)
	public String getMarginAcNo() {
		return this.marginAcNo;
	}

	public void setMarginAcNo(String marginAcNo) {
		this.marginAcNo = marginAcNo;
	}

	@Column(name = "MARGIN_COMPEN", precision = 18, scale = 4)
	public BigDecimal getMarginCompen() {
		return this.marginCompen;
	}

	public void setMarginCompen(BigDecimal marginCompen) {
		this.marginCompen = marginCompen;
	}

	@Column(name = "MARGIN_RELE", precision = 18, scale = 4)
	public BigDecimal getMarginRele() {
		return this.marginRele;
	}

	public void setMarginRele(BigDecimal marginRele) {
		this.marginRele = marginRele;
	}

	@Column(name = "MARGIN_BAL", precision = 18, scale = 4)
	public BigDecimal getMarginBal() {
		return marginBal;
	}

	public void setMarginBal(BigDecimal marginBal) {
		this.marginBal = marginBal;
	}

	@Column(name = "TTL_DLV_AMT", precision = 18, scale = 4)
	public BigDecimal getTtlDlvAmt() {
		return ttlDlvAmt;
	}

	public void setTtlDlvAmt(BigDecimal ttlDlvAmt) {
		this.ttlDlvAmt = ttlDlvAmt;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "ADVA_PAYTYPE", length = 70)
	public String getAdvaPaytype() {
		return advaPaytype;
	}

	public void setAdvaPaytype(String advaPaytype) {
		this.advaPaytype = advaPaytype;
	}

	@Column(name = "INVESTOR_NAME", length = 70)
	public String getInvestorName() {
		return investorName;
	}

	public void setInvestorName(String investorName) {
		this.investorName = investorName;
	}

	@Column(name = "SEL_AC_NO", length = 40)
	public String getSelAcNo() {
		return selAcNo;
	}

	public void setSelAcNo(String selAcNo) {
		this.selAcNo = selAcNo;
	}

	@Column(name = "PAY_INT_TP", length = 5)
	public String getPayIntTp() {
		return this.payIntTp;
	}

	public void setPayIntTp(String payIntTp) {
		this.payIntTp = payIntTp;
	}

	@Column(name = "FIN_CHGRT", precision = 18, scale = 4)
	public BigDecimal getFinChgrt() {
		return this.finChgrt;
	}

	public void setFinChgrt(BigDecimal finChgrt) {
		this.finChgrt = finChgrt;
	}

	@Column(name = "FINA_STS", length = 1)
	public String getFinaSts() {
		return finaSts;
	}

	public void setFinaSts(String finaSts) {
		this.finaSts = finaSts;
	}

	@Column(name = "PAY_CHG_TP", length = 5)
	public String getPayChgTp() {
		return payChgTp;
	}

	public void setPayChgTp(String payChgTp) {
		this.payChgTp = payChgTp;
	}

	@Column(name = "PMT_TIMES", precision = 4, scale = 0)
	public Integer getPmtTimes() {
		return pmtTimes;
	}

	public void setPmtTimes(Integer pmtTimes) {
		this.pmtTimes = pmtTimes;
	}

	@Column(name = "LAST_PAY_DT", length = 11)
	public Timestamp getLastPayDt() {
		return lastPayDt;
	}

	public void setLastPayDt(Timestamp lastPayDt) {
		this.lastPayDt = lastPayDt;
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

	@Column(name = "SELLER_INST_CD", length = 35)
	public String getSellerInstCd() {
		return sellerInstCd;
	}

	public void setSellerInstCd(String sellerInstCd) {
		this.sellerInstCd = sellerInstCd;
	}

	@Column(name = "LOAN_TP", length = 1)
	public String getLoanTp() {
		return loanTp;
	}

	public void setLoanTp(String loanTp) {
		this.loanTp = loanTp;
	}

	@Column(name = "LOAN_APPLICAT", length = 50)
	public String getLoanApplicat() {
		return loanApplicat;
	}

	public void setLoanApplicat(String loanApplicat) {
		this.loanApplicat = loanApplicat;
	}

	@Column(name = "INIT_MARGIN_PCT", length = 8, scale = 4)
	public BigDecimal getInitMarginPct() {
		return initMarginPct;
	}

	public void setInitMarginPct(BigDecimal initMarginPct) {
		this.initMarginPct = initMarginPct;
	}

	@Column(name = "AUTH_MARGIN_PCT", length = 8, scale = 4)
	public BigDecimal getAuthMarginPct() {
		return authMarginPct;
	}

	public void setAuthMarginPct(BigDecimal authMarginPct) {
		this.authMarginPct = authMarginPct;
	}

	@Column(name = "LMT_BAL", length = 18, scale = 4)
	public BigDecimal getLmtBal() {
		return lmtBal;
	}

	public void setLmtBal(BigDecimal lmtBal) {
		this.lmtBal = lmtBal;
	}

	@Column(name = "LMT_ALLOCATE", length = 18, scale = 4)
	public BigDecimal getLmtAllocate() {
		return lmtAllocate;
	}

	public void setLmtAllocate(BigDecimal lmtAllocate) {
		this.lmtAllocate = lmtAllocate;
	}

	@Column(name = "LMT_AMT", length = 18, scale = 4)
	public BigDecimal getLmtAmt() {
		return lmtAmt;
	}

	public void setLmtAmt(BigDecimal lmtAmt) {
		this.lmtAmt = lmtAmt;
	}

	@Column(name = "PAY_BAIL_ACNO", length = 35)
	public String getPayBailAcno() {
		return payBailAcno;
	}

	public void setPayBailAcno(String payBailAcno) {
		this.payBailAcno = payBailAcno;
	}

	@Column(name = "LOAN_ABLE", length = 18, scale = 4)
	public BigDecimal getLoanAble() {
		return loanAble;
	}

	public void setLoanAble(BigDecimal loanAble) {
		this.loanAble = loanAble;
	}

	@Column(name = "LOAN_OVERDUE_DT", length = 11)
	public Timestamp getLoanOverdueDt() {
		return loanOverdueDt;
	}

	public void setLoanOverdueDt(Timestamp loanOverdueDt) {
		this.loanOverdueDt = loanOverdueDt;
	}

	@Column(name = "INSURE_NO", length = 35)
	public String getInsureNo() {
		return InsureNo;
	}

	public void setInsureNo(String insureNo) {
		InsureNo = insureNo;
	}

	@Column(name = "IS_COLLECT", length = 5)
	public String getIsCollect() {
		return isCollect;
	}

	public void setIsCollect(String isCollect) {
		this.isCollect = isCollect;
	}

	@Column(name = "PDG_AMT", length = 18, scale = 4)
	public BigDecimal getPdgAmt() {
		return pdgAmt;
	}

	public void setPdgAmt(BigDecimal pdgAmt) {
		this.pdgAmt = pdgAmt;
	}

	@Column(name = "PAY_INT_AMT", length = 18, scale = 4)
	public BigDecimal getPayIntAmt() {
		return payIntAmt;
	}

	public void setPayIntAmt(BigDecimal payIntAmt) {
		this.payIntAmt = payIntAmt;
	}

	@Column(name = "PAY_PRIN_AMT", length = 18, scale = 4)
	public BigDecimal getPayPrinAmt() {
		return payPrinAmt;
	}

	public void setPayPrinAmt(BigDecimal payPrinAmt) {
		this.payPrinAmt = payPrinAmt;
	}

	@Column(name = "PMT_AMT", length = 18, scale = 4)
	public BigDecimal getPmtAmt() {
		return pmtAmt;
	}

	public void setPmtAmt(BigDecimal pmtAmt) {
		this.pmtAmt = pmtAmt;
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

	@Column(name = "PO_AMT", length = 18, scale = 4)
	public BigDecimal getPoAmt() {
		return poAmt;
	}

	public void setPoAmt(BigDecimal poAmt) {
		this.poAmt = poAmt;
	}
	
	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
}