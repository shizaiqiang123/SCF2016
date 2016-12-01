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
 * CntrctSbrE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CNTRCT_SBR_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CntrctSbrE implements java.io.Serializable {

	// Fields

	private CntrctSbrEId id;
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
	private String sysBusiUnit;
	private String serviceReq;
	private String cntrctNo;
	private String buyerId;
	private String selId;
	private String ccy;
	private String onlineNotify;
	private String buyerLmtCcy;
	private BigDecimal buyerLmtAmt;
	private Integer acctPeriod;
	private String buyerNm;
	private String trxId;
	private String sellerInstCd;
	private String buyerInstCd;
	private BigDecimal buyerLmtBat;
	private BigDecimal loanPct;
	private Integer openactGraceDay;
	private Integer graceDay;
	private String selNm;
	private BigDecimal lmtBalHd;
	private String buyerSysRefNo;
	private BigDecimal buyerImposeAmt;
	private BigDecimal singleImposeAmt;
	private BigDecimal payRt;
	private String ctctNm;
	private String ctctTel;
	private String ctctFax;
	private String remark;
	private BigDecimal lmtAmt;
	private BigDecimal lmtBal;
	private BigDecimal lmtAllocate;
	private BigDecimal lmtRecover;
	private String lmtCcy;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public CntrctSbrE() {
	}

	/** minimal constructor */
	public CntrctSbrE(CntrctSbrEId id) {
		this.id = id;
	}

	/** full constructor */
	public CntrctSbrE(CntrctSbrEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String sysBusiUnit, String serviceReq, String cntrctNo,
			String buyerId, String selId, String ccy, String onlineNotify,
			String buyerLmtCcy, BigDecimal buyerLmtAmt, Integer acctPeriod,
			String buyerNm, String trxId, String sellerInstCd,
			String buyerInstCd, BigDecimal buyerLmtBat, BigDecimal loanPct,
			Integer openactGraceDay, Integer graceDay, String selNm,
			BigDecimal lmtBalHd, String buyerSysRefNo,
			BigDecimal buyerImposeAmt, BigDecimal singleImposeAmt,
			BigDecimal payRt, String ctctNm, String ctctTel, String ctctFax,
			String remark,BigDecimal lmtAmt, BigDecimal lmtBal,BigDecimal lmtAllocate,BigDecimal lmtRecover,String lmtCcy,String sysOrgId) {
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
		this.sysBusiUnit = sysBusiUnit;
		this.serviceReq = serviceReq;
		this.cntrctNo = cntrctNo;
		this.buyerId = buyerId;
		this.selId = selId;
		this.ccy = ccy;
		this.onlineNotify = onlineNotify;
		this.buyerLmtCcy = buyerLmtCcy;
		this.buyerLmtAmt = buyerLmtAmt;
		this.acctPeriod = acctPeriod;
		this.buyerNm = buyerNm;
		this.trxId = trxId;
		this.sellerInstCd = sellerInstCd;
		this.buyerInstCd = buyerInstCd;
		this.buyerLmtBat = buyerLmtBat;
		this.loanPct = loanPct;
		this.openactGraceDay = openactGraceDay;
		this.graceDay = graceDay;
		this.selNm = selNm;
		this.lmtBalHd = lmtBalHd;
		this.buyerSysRefNo = buyerSysRefNo;
		this.buyerImposeAmt = buyerImposeAmt;
		this.singleImposeAmt = singleImposeAmt;
		this.payRt = payRt;
		this.ctctNm = ctctNm;
		this.ctctTel = ctctTel;
		this.ctctFax = ctctFax;
		this.remark = remark;
		this.lmtAmt = lmtAmt;
		this.lmtBal = lmtBal;
		this.lmtAllocate = lmtAllocate;
		this.lmtRecover = lmtRecover;
		this.lmtCcy = lmtCcy;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)) })
	public CntrctSbrEId getId() {
		return this.id;
	}

	public void setId(CntrctSbrEId id) {
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

	@Column(name = "SYS_LOCK_FLAG", length = 2)
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

	@Column(name = "SYS_TRX_STS", length = 2)
	public String getSysTrxSts() {
		return this.sysTrxSts;
	}

	public void setSysTrxSts(String sysTrxSts) {
		this.sysTrxSts = sysTrxSts;
	}

	@Column(name = "SYS_BUSI_UNIT", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "SERVICE_REQ", length = 2)
	public String getServiceReq() {
		return this.serviceReq;
	}

	public void setServiceReq(String serviceReq) {
		this.serviceReq = serviceReq;
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

	@Column(name = "SEL_ID", length = 40)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "CCY", length = 10)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "ONLINE_NOTIFY", length = 10)
	public String getOnlineNotify() {
		return this.onlineNotify;
	}

	public void setOnlineNotify(String onlineNotify) {
		this.onlineNotify = onlineNotify;
	}

	@Column(name = "BUYER_LMT_CCY", length = 10)
	public String getBuyerLmtCcy() {
		return this.buyerLmtCcy;
	}

	public void setBuyerLmtCcy(String buyerLmtCcy) {
		this.buyerLmtCcy = buyerLmtCcy;
	}

	@Column(name = "BUYER_LMT_AMT", precision = 18, scale = 4)
	public BigDecimal getBuyerLmtAmt() {
		return this.buyerLmtAmt;
	}

	public void setBuyerLmtAmt(BigDecimal buyerLmtAmt) {
		this.buyerLmtAmt = buyerLmtAmt;
	}

	@Column(name = "ACCT_PERIOD", precision = 38, scale = 0)
	public Integer getAcctPeriod() {
		return this.acctPeriod;
	}

	public void setAcctPeriod(Integer acctPeriod) {
		this.acctPeriod = acctPeriod;
	}

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return this.buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "TRX_ID", length = 40)
	public String getTrxId() {
		return this.trxId;
	}

	public void setTrxId(String trxId) {
		this.trxId = trxId;
	}

	@Column(name = "SELLER_INST_CD", length = 30)
	public String getSellerInstCd() {
		return this.sellerInstCd;
	}

	public void setSellerInstCd(String sellerInstCd) {
		this.sellerInstCd = sellerInstCd;
	}

	@Column(name = "BUYER_INST_CD", length = 30)
	public String getBuyerInstCd() {
		return this.buyerInstCd;
	}

	public void setBuyerInstCd(String buyerInstCd) {
		this.buyerInstCd = buyerInstCd;
	}

	@Column(name = "BUYER_LMT_BAT", precision = 18, scale = 4)
	public BigDecimal getBuyerLmtBat() {
		return this.buyerLmtBat;
	}

	public void setBuyerLmtBat(BigDecimal buyerLmtBat) {
		this.buyerLmtBat = buyerLmtBat;
	}

	@Column(name = "LOAN_PCT", precision = 8, scale = 4)
	public BigDecimal getLoanPct() {
		return this.loanPct;
	}

	public void setLoanPct(BigDecimal loanPct) {
		this.loanPct = loanPct;
	}

	@Column(name = "OPENACT_GRACE_DAY", precision = 38, scale = 0)
	public Integer getOpenactGraceDay() {
		return this.openactGraceDay;
	}

	public void setOpenactGraceDay(Integer openactGraceDay) {
		this.openactGraceDay = openactGraceDay;
	}

	@Column(name = "GRACE_DAY", precision = 38, scale = 0)
	public Integer getGraceDay() {
		return this.graceDay;
	}

	public void setGraceDay(Integer graceDay) {
		this.graceDay = graceDay;
	}

	@Column(name = "SEL_NM", length = 200)
	public String getSelNm() {
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "LMT_BAL_HD", precision = 30, scale = 4)
	public BigDecimal getLmtBalHd() {
		return this.lmtBalHd;
	}

	public void setLmtBalHd(BigDecimal lmtBalHd) {
		this.lmtBalHd = lmtBalHd;
	}

	@Column(name = "BUYER_SYS_REF_NO", length = 50)
	public String getBuyerSysRefNo() {
		return this.buyerSysRefNo;
	}

	public void setBuyerSysRefNo(String buyerSysRefNo) {
		this.buyerSysRefNo = buyerSysRefNo;
	}

	@Column(name = "BUYER_IMPOSE_AMT", precision = 18, scale = 4)
	public BigDecimal getBuyerImposeAmt() {
		return buyerImposeAmt;
	}

	public void setBuyerImposeAmt(BigDecimal buyerImposeAmt) {
		this.buyerImposeAmt = buyerImposeAmt;
	}

	@Column(name = "SINGLE_IMPOSE_AMT", precision = 18, scale = 4)
	public BigDecimal getSingleImposeAmt() {
		return singleImposeAmt;
	}

	public void setSingleImposeAmt(BigDecimal singleImposeAmt) {
		this.singleImposeAmt = singleImposeAmt;
	}

	@Column(name = "PAY_RT", precision = 18, scale = 4)
	public BigDecimal getPayRt() {
		return payRt;
	}

	public void setPayRt(BigDecimal payRt) {
		this.payRt = payRt;
	}

	@Column(name = "CTCT_NM", length = 35)
	public String getCtctNm() {
		return ctctNm;
	}

	public void setCtctNm(String ctctNm) {
		this.ctctNm = ctctNm;
	}

	@Column(name = "CTCT_TEL", length = 35)
	public String getCtctTel() {
		return ctctTel;
	}

	public void setCtctTel(String ctctTel) {
		this.ctctTel = ctctTel;
	}

	@Column(name = "CTCT_FAX", length = 35)
	public String getCtctFax() {
		return ctctFax;
	}

	public void setCtctFax(String ctctFax) {
		this.ctctFax = ctctFax;
	}

	@Column(name = "REMARK", length = 35)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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
	@Column(name = "LMT_ALLOCATE", precision = 18, scale = 4)
	public BigDecimal getLmtAllocate() {
		return lmtAllocate;
	}

	public void setLmtAllocate(BigDecimal lmtAllocate) {
		this.lmtAllocate = lmtAllocate;
	}

	@Column(name = "LMT_RECOVER", precision = 18, scale = 4)
	public BigDecimal getLmtRecover() {
		return lmtRecover;
	}

	public void setLmtRecover(BigDecimal lmtRecover) {
		this.lmtRecover = lmtRecover;
	}
	@Column(name = "LMT_CCY", length = 10)
	public String getLmtCcy() {
		return this.lmtCcy;
	}

	public void setLmtCcy(String lmtCcy) {
		this.lmtCcy = lmtCcy;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

}