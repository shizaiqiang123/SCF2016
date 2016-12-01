package com.ut.scf.orm.trx;

import java.sql.Clob;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * PoCancelM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PO_CANCEL_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class PoCancelM implements java.io.Serializable {

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
	private double loanPct;
	private double loanRt;
	private Integer loanTimes;
	private double intAmt;
	private Timestamp loanValDt;
	private Timestamp loanDueDt;
	private double ttlLoanAmt;
	private String busiTp;
	private String selId;
	private String buyerId;
	private String selNm;
	private String buyerNm;
	private String serviceReq;
	private Timestamp trxDt;
	private double selLmtBal;
	private Timestamp selLmtDueDt;
	private String poNo;
	private String poId;
	private double ttlLoanBal;
	private String regNo;
	private String cntrctNo;
	private String ccy;
	private Clob sysRelReason;
	private double marginAmt;
	private String marginAcNo;
	private double marginCompen;
	private double marginRele;
	private double marginBal;
	private double ttlDlvAmt;
	private String sysBusiUnit;
	private String advaPaytype;
	private String investorName;
	private String selAcNo;
	private String payIntTp;
	private double finChgrt;
	private double loanPerc;
	private Timestamp lastPayDt;
	private String rateTp;
	private double rtSpread;
	private double libor;
	private String payChgTp;
	private String finaSts;
	private Integer pmtTimes;
	private String selAcNm;
	private String selAcBkNm;
	private String selAcBkNo;
	private String sysGapiSts;
	private String sysFuncName;
	private String printNumber;
	private String sellerInstCd;
	private String loanTp;
	private String loanApplicat;
	private double initMarginPct;
	private double authMarginPct;
	private double lmtBal;
	private double lmtAvl;
	private double lmtAmt;
	private String payBailAcno;
	private double loanAble;
	private String billNo;
	private Timestamp loanOverdueDt;
	private double lmtAllocate;
	private String insureNo;
	private double ttlLoanBalhd;
	private String isCollect;
	private double pdgAmt;
	private double payIntAmt;
	private double payPrinAmt;
	private double pmtAmt;
	private String sysOrgId;
	private String isConfirm;
	private String confirmFlag;
	private Clob confirmOp;
	private double poAmt;
	private double cancelAmt;
	private String loanId;
	// Constructors

	/** default constructor */
	public PoCancelM() {
	}

	/** minimal constructor */
	public PoCancelM(Timestamp sysOpTm, Integer sysEventTimes) {
		this.sysOpTm = sysOpTm;
		this.sysEventTimes = sysEventTimes;
	}
	
	

	public PoCancelM(String sysRefNo, Integer sysEventTimes) {
		super();
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public PoCancelM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, double loanPct, double loanRt,
			Integer loanTimes, double intAmt, Timestamp loanValDt,
			Timestamp loanDueDt, double ttlLoanAmt, String busiTp,
			String selId, String buyerId, String selNm, String buyerNm,
			String serviceReq, Timestamp trxDt, double selLmtBal,
			Timestamp selLmtDueDt, String poNo, String poId, double ttlLoanBal,
			String regNo, String cntrctNo, String ccy, Clob sysRelReason,
			double marginAmt, String marginAcNo, double marginCompen,
			double marginRele, double marginBal, double ttlDlvAmt,
			String sysBusiUnit, String advaPaytype, String investorName,
			String selAcNo, String payIntTp, double finChgrt, double loanPerc,
			Timestamp lastPayDt, String rateTp, double rtSpread, double libor,
			String payChgTp, String finaSts, Integer pmtTimes, String selAcNm,
			String selAcBkNm, String selAcBkNo, String sysGapiSts,
			String sysFuncName, String printNumber, String sellerInstCd,
			String loanTp, String loanApplicat, double initMarginPct,
			double authMarginPct, double lmtBal, double lmtAvl, double lmtAmt,
			String payBailAcno, double loanAble, String billNo,
			Timestamp loanOverdueDt, double lmtAllocate, String insureNo,
			double ttlLoanBalhd, String isCollect, double pdgAmt,
			double payIntAmt, double payPrinAmt, double pmtAmt,
			String sysOrgId, String isConfirm, String confirmFlag,
			Clob confirmOp, double poAmt, double cancelAmt, String loanId) {
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
		this.loanPerc = loanPerc;
		this.lastPayDt = lastPayDt;
		this.rateTp = rateTp;
		this.rtSpread = rtSpread;
		this.libor = libor;
		this.payChgTp = payChgTp;
		this.finaSts = finaSts;
		this.pmtTimes = pmtTimes;
		this.selAcNm = selAcNm;
		this.selAcBkNm = selAcBkNm;
		this.selAcBkNo = selAcBkNo;
		this.sysGapiSts = sysGapiSts;
		this.sysFuncName = sysFuncName;
		this.printNumber = printNumber;
		this.sellerInstCd = sellerInstCd;
		this.loanTp = loanTp;
		this.loanApplicat = loanApplicat;
		this.initMarginPct = initMarginPct;
		this.authMarginPct = authMarginPct;
		this.lmtBal = lmtBal;
		this.lmtAvl = lmtAvl;
		this.lmtAmt = lmtAmt;
		this.payBailAcno = payBailAcno;
		this.loanAble = loanAble;
		this.billNo = billNo;
		this.loanOverdueDt = loanOverdueDt;
		this.lmtAllocate = lmtAllocate;
		this.insureNo = insureNo;
		this.ttlLoanBalhd = ttlLoanBalhd;
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
		this.cancelAmt = cancelAmt;
		this.loanId = loanId;
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

	@Column(name = "SYS_OP_TM", nullable = false)
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

	@Column(name = "LOAN_PCT", precision = 8, scale = 4)
	public double getLoanPct() {
		return this.loanPct;
	}

	public void setLoanPct(double loanPct) {
		this.loanPct = loanPct;
	}

	@Column(name = "LOAN_RT", precision = 18, scale = 4)
	public double getLoanRt() {
		return this.loanRt;
	}

	public void setLoanRt(double loanRt) {
		this.loanRt = loanRt;
	}

	@Column(name = "LOAN_TIMES", precision = 38, scale = 0)
	public Integer getLoanTimes() {
		return this.loanTimes;
	}

	public void setLoanTimes(Integer loanTimes) {
		this.loanTimes = loanTimes;
	}

	@Column(name = "INT_AMT", precision = 18, scale = 4)
	public double getIntAmt() {
		return this.intAmt;
	}

	public void setIntAmt(double intAmt) {
		this.intAmt = intAmt;
	}

	@Column(name = "LOAN_VAL_DT")
	public Timestamp getLoanValDt() {
		return this.loanValDt;
	}

	public void setLoanValDt(Timestamp loanValDt) {
		this.loanValDt = loanValDt;
	}

	@Column(name = "LOAN_DUE_DT")
	public Timestamp getLoanDueDt() {
		return this.loanDueDt;
	}

	public void setLoanDueDt(Timestamp loanDueDt) {
		this.loanDueDt = loanDueDt;
	}

	@Column(name = "TTL_LOAN_AMT", precision = 18, scale = 4)
	public double getTtlLoanAmt() {
		return this.ttlLoanAmt;
	}

	public void setTtlLoanAmt(double ttlLoanAmt) {
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

	@Column(name = "SEL_NM", length = 200)
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

	@Column(name = "TRX_DT")
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "SEL_LMT_BAL", precision = 18, scale = 4)
	public double getSelLmtBal() {
		return this.selLmtBal;
	}

	public void setSelLmtBal(double selLmtBal) {
		this.selLmtBal = selLmtBal;
	}

	@Column(name = "SEL_LMT_DUE_DT")
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
	public double getTtlLoanBal() {
		return this.ttlLoanBal;
	}

	public void setTtlLoanBal(double ttlLoanBal) {
		this.ttlLoanBal = ttlLoanBal;
	}

	@Column(name = "REG_NO", length = 35)
	public String getRegNo() {
		return this.regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "SYS_REL_REASON")
	public Clob getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(Clob sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "MARGIN_AMT", precision = 18, scale = 4)
	public double getMarginAmt() {
		return this.marginAmt;
	}

	public void setMarginAmt(double marginAmt) {
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
	public double getMarginCompen() {
		return this.marginCompen;
	}

	public void setMarginCompen(double marginCompen) {
		this.marginCompen = marginCompen;
	}

	@Column(name = "MARGIN_RELE", precision = 18, scale = 4)
	public double getMarginRele() {
		return this.marginRele;
	}

	public void setMarginRele(double marginRele) {
		this.marginRele = marginRele;
	}

	@Column(name = "MARGIN_BAL", precision = 18, scale = 4)
	public double getMarginBal() {
		return this.marginBal;
	}

	public void setMarginBal(double marginBal) {
		this.marginBal = marginBal;
	}

	@Column(name = "TTL_DLV_AMT", precision = 18, scale = 4)
	public double getTtlDlvAmt() {
		return this.ttlDlvAmt;
	}

	public void setTtlDlvAmt(double ttlDlvAmt) {
		this.ttlDlvAmt = ttlDlvAmt;
	}

	@Column(name = "SYS_BUSI_UNIT", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "ADVA_PAYTYPE", length = 5)
	public String getAdvaPaytype() {
		return this.advaPaytype;
	}

	public void setAdvaPaytype(String advaPaytype) {
		this.advaPaytype = advaPaytype;
	}

	@Column(name = "INVESTOR_NAME", length = 70)
	public String getInvestorName() {
		return this.investorName;
	}

	public void setInvestorName(String investorName) {
		this.investorName = investorName;
	}

	@Column(name = "SEL_AC_NO", length = 40)
	public String getSelAcNo() {
		return this.selAcNo;
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
	public double getFinChgrt() {
		return this.finChgrt;
	}

	public void setFinChgrt(double finChgrt) {
		this.finChgrt = finChgrt;
	}

	@Column(name = "LOAN_PERC", precision = 18, scale = 4)
	public double getLoanPerc() {
		return this.loanPerc;
	}

	public void setLoanPerc(double loanPerc) {
		this.loanPerc = loanPerc;
	}

	@Column(name = "LAST_PAY_DT")
	public Timestamp getLastPayDt() {
		return this.lastPayDt;
	}

	public void setLastPayDt(Timestamp lastPayDt) {
		this.lastPayDt = lastPayDt;
	}

	@Column(name = "RATE_TP", length = 35)
	public String getRateTp() {
		return this.rateTp;
	}

	public void setRateTp(String rateTp) {
		this.rateTp = rateTp;
	}

	@Column(name = "RT_SPREAD", precision = 18, scale = 4)
	public double getRtSpread() {
		return this.rtSpread;
	}

	public void setRtSpread(double rtSpread) {
		this.rtSpread = rtSpread;
	}

	@Column(name = "LIBOR", precision = 18, scale = 4)
	public double getLibor() {
		return this.libor;
	}

	public void setLibor(double libor) {
		this.libor = libor;
	}

	@Column(name = "PAY_CHG_TP", length = 5)
	public String getPayChgTp() {
		return this.payChgTp;
	}

	public void setPayChgTp(String payChgTp) {
		this.payChgTp = payChgTp;
	}

	@Column(name = "FINA_STS", length = 1)
	public String getFinaSts() {
		return this.finaSts;
	}

	public void setFinaSts(String finaSts) {
		this.finaSts = finaSts;
	}

	@Column(name = "PMT_TIMES", precision = 38, scale = 0)
	public Integer getPmtTimes() {
		return this.pmtTimes;
	}

	public void setPmtTimes(Integer pmtTimes) {
		this.pmtTimes = pmtTimes;
	}

	@Column(name = "SEL_AC_NM", length = 50)
	public String getSelAcNm() {
		return this.selAcNm;
	}

	public void setSelAcNm(String selAcNm) {
		this.selAcNm = selAcNm;
	}

	@Column(name = "SEL_AC_BK_NM", length = 50)
	public String getSelAcBkNm() {
		return this.selAcBkNm;
	}

	public void setSelAcBkNm(String selAcBkNm) {
		this.selAcBkNm = selAcBkNm;
	}

	@Column(name = "SEL_AC_BK_NO", length = 40)
	public String getSelAcBkNo() {
		return this.selAcBkNo;
	}

	public void setSelAcBkNo(String selAcBkNo) {
		this.selAcBkNo = selAcBkNo;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return this.sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "SYS_FUNC_NAME", length = 35)
	public String getSysFuncName() {
		return this.sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

	@Column(name = "PRINT_NUMBER", length = 35)
	public String getPrintNumber() {
		return this.printNumber;
	}

	public void setPrintNumber(String printNumber) {
		this.printNumber = printNumber;
	}

	@Column(name = "SELLER_INST_CD", length = 35)
	public String getSellerInstCd() {
		return this.sellerInstCd;
	}

	public void setSellerInstCd(String sellerInstCd) {
		this.sellerInstCd = sellerInstCd;
	}

	@Column(name = "LOAN_TP", length = 1)
	public String getLoanTp() {
		return this.loanTp;
	}

	public void setLoanTp(String loanTp) {
		this.loanTp = loanTp;
	}

	@Column(name = "LOAN_APPLICAT", length = 50)
	public String getLoanApplicat() {
		return this.loanApplicat;
	}

	public void setLoanApplicat(String loanApplicat) {
		this.loanApplicat = loanApplicat;
	}

	@Column(name = "INIT_MARGIN_PCT", precision = 8, scale = 4)
	public double getInitMarginPct() {
		return this.initMarginPct;
	}

	public void setInitMarginPct(double initMarginPct) {
		this.initMarginPct = initMarginPct;
	}

	@Column(name = "AUTH_MARGIN_PCT", precision = 8, scale = 4)
	public double getAuthMarginPct() {
		return this.authMarginPct;
	}

	public void setAuthMarginPct(double authMarginPct) {
		this.authMarginPct = authMarginPct;
	}

	@Column(name = "LMT_BAL", precision = 18, scale = 4)
	public double getLmtBal() {
		return this.lmtBal;
	}

	public void setLmtBal(double lmtBal) {
		this.lmtBal = lmtBal;
	}

	@Column(name = "LMT_AVL", precision = 18, scale = 4)
	public double getLmtAvl() {
		return this.lmtAvl;
	}

	public void setLmtAvl(double lmtAvl) {
		this.lmtAvl = lmtAvl;
	}

	@Column(name = "LMT_AMT", precision = 18, scale = 4)
	public double getLmtAmt() {
		return this.lmtAmt;
	}

	public void setLmtAmt(double lmtAmt) {
		this.lmtAmt = lmtAmt;
	}

	@Column(name = "PAY_BAIL_ACNO", length = 35)
	public String getPayBailAcno() {
		return this.payBailAcno;
	}

	public void setPayBailAcno(String payBailAcno) {
		this.payBailAcno = payBailAcno;
	}

	@Column(name = "LOAN_ABLE", precision = 18, scale = 4)
	public double getLoanAble() {
		return this.loanAble;
	}

	public void setLoanAble(double loanAble) {
		this.loanAble = loanAble;
	}

	@Column(name = "BILL_NO", length = 35)
	public String getBillNo() {
		return this.billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	@Column(name = "LOAN_OVERDUE_DT")
	public Timestamp getLoanOverdueDt() {
		return this.loanOverdueDt;
	}

	public void setLoanOverdueDt(Timestamp loanOverdueDt) {
		this.loanOverdueDt = loanOverdueDt;
	}

	@Column(name = "LMT_ALLOCATE", precision = 18, scale = 4)
	public double getLmtAllocate() {
		return this.lmtAllocate;
	}

	public void setLmtAllocate(double lmtAllocate) {
		this.lmtAllocate = lmtAllocate;
	}

	@Column(name = "INSURE_NO", length = 35)
	public String getInsureNo() {
		return this.insureNo;
	}

	public void setInsureNo(String insureNo) {
		this.insureNo = insureNo;
	}

	@Column(name = "TTL_LOAN_BALHD", precision = 18, scale = 4)
	public double getTtlLoanBalhd() {
		return this.ttlLoanBalhd;
	}

	public void setTtlLoanBalhd(double ttlLoanBalhd) {
		this.ttlLoanBalhd = ttlLoanBalhd;
	}

	@Column(name = "IS_COLLECT", length = 5)
	public String getIsCollect() {
		return this.isCollect;
	}

	public void setIsCollect(String isCollect) {
		this.isCollect = isCollect;
	}

	@Column(name = "PDG_AMT", precision = 18, scale = 4)
	public double getPdgAmt() {
		return this.pdgAmt;
	}

	public void setPdgAmt(double pdgAmt) {
		this.pdgAmt = pdgAmt;
	}

	@Column(name = "PAY_INT_AMT", precision = 18, scale = 4)
	public double getPayIntAmt() {
		return this.payIntAmt;
	}

	public void setPayIntAmt(double payIntAmt) {
		this.payIntAmt = payIntAmt;
	}

	@Column(name = "PAY_PRIN_AMT", precision = 18, scale = 4)
	public double getPayPrinAmt() {
		return this.payPrinAmt;
	}

	public void setPayPrinAmt(double payPrinAmt) {
		this.payPrinAmt = payPrinAmt;
	}

	@Column(name = "PMT_AMT", precision = 18, scale = 4)
	public double getPmtAmt() {
		return this.pmtAmt;
	}

	public void setPmtAmt(double pmtAmt) {
		this.pmtAmt = pmtAmt;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return this.sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

	@Column(name = "IS_CONFIRM", length = 2)
	public String getIsConfirm() {
		return this.isConfirm;
	}

	public void setIsConfirm(String isConfirm) {
		this.isConfirm = isConfirm;
	}

	@Column(name = "CONFIRM_FLAG", length = 2)
	public String getConfirmFlag() {
		return this.confirmFlag;
	}

	public void setConfirmFlag(String confirmFlag) {
		this.confirmFlag = confirmFlag;
	}

	@Column(name = "CONFIRM_OP")
	public Clob getConfirmOp() {
		return this.confirmOp;
	}

	public void setConfirmOp(Clob confirmOp) {
		this.confirmOp = confirmOp;
	}

	@Column(name = "PO_AMT", precision = 18, scale = 4)
	public double getPoAmt() {
		return this.poAmt;
	}

	public void setPoAmt(double poAmt) {
		this.poAmt = poAmt;
	}

	@Column(name = "CANCEL_AMT", precision = 18, scale = 4)
	public double getCancelAmt() {
		return this.cancelAmt;
	}

	public void setCancelAmt(double cancelAmt) {
		this.cancelAmt = cancelAmt;
	}
	
	@Column(name = "LOAN_ID", length = 35)
	public String getLoanId() {
		return this.loanId;
	}

	public void setLoanId(String loadId) {
		this.loanId = loadId;
	}
}