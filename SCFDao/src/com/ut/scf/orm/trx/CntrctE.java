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
 * CntrctE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "cntrct_e", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CntrctE implements java.io.Serializable {

	// Fields

	private CntrctEId id;
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
	private String cntrctNo;
	private Timestamp validDt;
	private Timestamp dueDt;
	private Timestamp trxDt;
	private String busiTp;
	private String selId;
	private String hanChgCcy;
	private BigDecimal hanChgAmt;
	private Integer manChgRt;
	private String lmtCcy;
	private BigDecimal lmtAmt;
	private BigDecimal lmtBal;
	private Timestamp lmtValidDt;
	private Timestamp lmtDueDt;
	private Integer exposureDay;
	private Integer minMarginPct;
	private String cntrctSts;
	private BigDecimal openLoanAmt;
	private String clerkId;
	private String ifId;
	private String ifClId;
	private String ifHanChgCcy;
	private BigDecimal ifHanChgAmt;
	private Integer ifCommRt;
	private String efId;
	private String efClId;
	private String efHanChgCcy;
	private BigDecimal efHanChgAmt;
	private Integer efCommRt;
	private String patnerId;
	private String patnerNm;
	private String patnerClId;
	private String patnerHanChgCcy;
	private BigDecimal patnerHanChgAmt;
	private Integer patnerHanChgRt;
	private BigDecimal loanPct;
	private Integer acctPeriod;
	private Integer graceDay;
	private String buyerId;
	private String selNm;
	private String buyerNm;
	private String serviceReq;
	private String sysRelReason;
	private Integer fundRt;
	private String intRt;
	private String intColTp;
	private Timestamp intColDt;
	private String storageId;
	private String storageNm;
	private String storageAdr;
	private String contactNm;
	private String custAcNo;
	private String marginAcNo;
	private BigDecimal ttlRegAmt;
	private Integer loanTimes;
	private BigDecimal regLowestVal;
	private BigDecimal marginBal;
	private String marginForm;
	private String marginTp;
	private BigDecimal marginApplied;
	private Integer gurPayPct;
	private Integer openactGraceDay;
	private String payIntTp;
	private BigDecimal penaRt;
	private BigDecimal transChgrt;
	private BigDecimal finChgrt;
	private BigDecimal loanRt;
	private String sysBusiUnit;
	private String finaTp;
	private BigDecimal arBal;
	private BigDecimal chgLmtAmt;
	private BigDecimal arAvalLoan;
	private String lmtFlg;
	private BigDecimal lmtAllocate;
	private BigDecimal lmtRecover;
	private String theirRef;
	private String rcustId;
	private String rcustNm;
	private Timestamp lmtDt;
	private BigDecimal openIntAmt;
	private String buyer2Id;
	private String buyer3Id;
	private BigDecimal loanPerc;
	private BigDecimal commRt;
	private String approvalSts;
	private String chgSts;
	private String lmtSts;
	private String payChgTp;
	private String poolId;
	private String remark;
	private String sysFuncName;
	private String sellerInstCd;
	private BigDecimal billAmt;
	private BigDecimal initGartPct;
	private String sellerLmtLimit;
	private BigDecimal lmtAvl;
	private String custBrId;
	private String cmsCntrctNo;
	private String initThFlg;
	private Integer crtfWarPrd;
	private String bchNm;
	private String insureTp;
	private String isPossInsure;
	private String insureLimit;
	private String cmsCustNo;
	private BigDecimal pldPerc;
	private String recourseTp;
	// modify by shizaiqiang
	private BigDecimal poolLine;
	// add by YeQing 2016-8-31 还款标识(0:新建协议时候的初始值,1：买方还款、间接还款,2：卖方还款)
	private String paySts;
	private BigDecimal maxDroPerc;// 最大跌幅率
	private String isSendSelLmt;// 是否分配卖方额度
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public CntrctE() {
	}

	/** minimal constructor */
	public CntrctE(CntrctEId id) {
		this.id = id;
	}

	/** full constructor */
	public CntrctE(CntrctEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String sysGapiSts, String cntrctNo, Timestamp validDt,
			Timestamp dueDt, Timestamp trxDt, String busiTp, String selId,
			String hanChgCcy, BigDecimal hanChgAmt, Integer manChgRt,
			String lmtCcy, BigDecimal lmtAmt, BigDecimal lmtBal,
			Timestamp lmtValidDt, Timestamp lmtDueDt, Integer exposureDay,
			Integer minMarginPct, String cntrctSts, BigDecimal openLoanAmt,
			String clerkId, String ifId, String ifClId, String ifHanChgCcy,
			BigDecimal ifHanChgAmt, Integer ifCommRt, String efId,
			String efClId, String efHanChgCcy, BigDecimal efHanChgAmt,
			Integer efCommRt, String patnerId, String patnerNm,
			String patnerClId, String patnerHanChgCcy,
			BigDecimal patnerHanChgAmt, Integer patnerHanChgRt,
			BigDecimal loanPct, Integer acctPeriod, Integer graceDay,
			String buyerId, String selNm, String buyerNm, String serviceReq,
			String sysRelReason, Integer fundRt, String intRt, String intColTp,
			Timestamp intColDt, String storageId, String storageNm,
			String storageAdr, String contactNm, String custAcNo,
			String marginAcNo, BigDecimal ttlRegAmt, Integer loanTimes,
			BigDecimal regLowestVal, BigDecimal marginBal, String marginForm,
			String marginTp, BigDecimal marginApplied, Integer gurPayPct,
			Integer openactGraceDay, String payIntTp, BigDecimal penaRt,
			BigDecimal transChgrt, BigDecimal finChgrt, BigDecimal loanRt,
			String sysBusiUnit, String finaTp, BigDecimal arBal,
			BigDecimal chgLmtAmt, BigDecimal arAvalLoan, String lmtFlg,
			BigDecimal lmtAllocate, BigDecimal lmtRecover, String theirRef,
			String rcustId, String rcustNm, Timestamp lmtDt,
			BigDecimal openIntAmt, String buyer2Id, String buyer3Id,
			BigDecimal loanPerc, BigDecimal commRt, String approvalSts,
			String chgSts, String lmtSts, String payChgTp, String poolId,
			String remark, String sysFuncName, String sellerInstCd,
			BigDecimal billAmt, BigDecimal initGartPct, String sellerLmtLimit,
			BigDecimal lmtAvl, String custBrId, String cmsCntrctNo,
			String initThFlg, Integer crtfWarPrd, String bchNm,
			String insureTp, String isPossInsure, String insureLimit,
			String cmsCustNo, BigDecimal pldPerc, String recourseTp,
			BigDecimal poolLine, String paySts, BigDecimal maxDroPerc,
			String isSendSelLmt,String sysOrgId) {
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
		this.cntrctNo = cntrctNo;
		this.validDt = validDt;
		this.dueDt = dueDt;
		this.trxDt = trxDt;
		this.busiTp = busiTp;
		this.selId = selId;
		this.hanChgCcy = hanChgCcy;
		this.hanChgAmt = hanChgAmt;
		this.manChgRt = manChgRt;
		this.lmtCcy = lmtCcy;
		this.lmtAmt = lmtAmt;
		this.lmtBal = lmtBal;
		this.lmtValidDt = lmtValidDt;
		this.lmtDueDt = lmtDueDt;
		this.exposureDay = exposureDay;
		this.minMarginPct = minMarginPct;
		this.cntrctSts = cntrctSts;
		this.openLoanAmt = openLoanAmt;
		this.clerkId = clerkId;
		this.ifId = ifId;
		this.ifClId = ifClId;
		this.ifHanChgCcy = ifHanChgCcy;
		this.ifHanChgAmt = ifHanChgAmt;
		this.ifCommRt = ifCommRt;
		this.efId = efId;
		this.efClId = efClId;
		this.efHanChgCcy = efHanChgCcy;
		this.efHanChgAmt = efHanChgAmt;
		this.efCommRt = efCommRt;
		this.patnerId = patnerId;
		this.patnerNm = patnerNm;
		this.patnerClId = patnerClId;
		this.patnerHanChgCcy = patnerHanChgCcy;
		this.patnerHanChgAmt = patnerHanChgAmt;
		this.patnerHanChgRt = patnerHanChgRt;
		this.loanPct = loanPct;
		this.acctPeriod = acctPeriod;
		this.graceDay = graceDay;
		this.buyerId = buyerId;
		this.selNm = selNm;
		this.buyerNm = buyerNm;
		this.serviceReq = serviceReq;
		this.sysRelReason = sysRelReason;
		this.fundRt = fundRt;
		this.intRt = intRt;
		this.intColTp = intColTp;
		this.intColDt = intColDt;
		this.storageId = storageId;
		this.storageNm = storageNm;
		this.storageAdr = storageAdr;
		this.contactNm = contactNm;
		this.custAcNo = custAcNo;
		this.marginAcNo = marginAcNo;
		this.ttlRegAmt = ttlRegAmt;
		this.loanTimes = loanTimes;
		this.regLowestVal = regLowestVal;
		this.marginBal = marginBal;
		this.marginForm = marginForm;
		this.marginTp = marginTp;
		this.marginApplied = marginApplied;
		this.gurPayPct = gurPayPct;
		this.openactGraceDay = openactGraceDay;
		this.payIntTp = payIntTp;
		this.penaRt = penaRt;
		this.transChgrt = transChgrt;
		this.finChgrt = finChgrt;
		this.loanRt = loanRt;
		this.sysBusiUnit = sysBusiUnit;
		this.finaTp = finaTp;
		this.arBal = arBal;
		this.chgLmtAmt = chgLmtAmt;
		this.arAvalLoan = arAvalLoan;
		this.lmtFlg = lmtFlg;
		this.lmtAllocate = lmtAllocate;
		this.lmtRecover = lmtRecover;
		this.theirRef = theirRef;
		this.rcustId = rcustId;
		this.rcustNm = rcustNm;
		this.lmtDt = lmtDt;
		this.openIntAmt = openIntAmt;
		this.buyer2Id = buyer2Id;
		this.buyer3Id = buyer3Id;
		this.loanPerc = loanPerc;
		this.commRt = commRt;
		this.approvalSts = approvalSts;
		this.chgSts = chgSts;
		this.lmtSts = lmtSts;
		this.payChgTp = payChgTp;
		this.poolId = poolId;
		this.remark = remark;
		this.sysFuncName = sysFuncName;
		this.sellerInstCd = sellerInstCd;
		this.billAmt = billAmt;
		this.initGartPct = initGartPct;
		this.sellerLmtLimit = sellerLmtLimit;
		this.lmtAvl = lmtAvl;
		this.custBrId = custBrId;
		this.cmsCntrctNo = cmsCntrctNo;
		this.initThFlg = initThFlg;
		this.crtfWarPrd = crtfWarPrd;
		this.bchNm = bchNm;
		this.insureTp = insureTp;
		this.isPossInsure = isPossInsure;
		this.insureLimit = insureLimit;
		this.cmsCustNo = cmsCustNo;
		this.pldPerc = pldPerc;
		this.recourseTp = recourseTp;
		this.poolLine = poolLine;
		this.paySts = paySts;
		this.maxDroPerc = maxDroPerc;
		this.isSendSelLmt = isSendSelLmt;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false)) })
	public CntrctEId getId() {
		return this.id;
	}

	public void setId(CntrctEId id) {
		this.id = id;
	}

	@Column(name = "SYS_OP_ID", length = 35)
	public String getSysOpId() {
		return this.sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_OP_TM", length = 19)
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

	@Column(name = "SYS_REL_TM", length = 19)
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

	@Column(name = "SYS_AUTH_TM", length = 19)
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

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "VALID_DT", length = 19)
	public Timestamp getValidDt() {
		return this.validDt;
	}

	public void setValidDt(Timestamp validDt) {
		this.validDt = validDt;
	}

	@Column(name = "DUE_DT", length = 19)
	public Timestamp getDueDt() {
		return this.dueDt;
	}

	public void setDueDt(Timestamp dueDt) {
		this.dueDt = dueDt;
	}

	@Column(name = "TRX_DT", length = 19)
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "BUSI_TP", length = 10)
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

	@Column(name = "HAN_CHG_CCY", length = 10)
	public String getHanChgCcy() {
		return this.hanChgCcy;
	}

	public void setHanChgCcy(String hanChgCcy) {
		this.hanChgCcy = hanChgCcy;
	}

	@Column(name = "HAN_CHG_AMT", precision = 18, scale = 4)
	public BigDecimal getHanChgAmt() {
		return this.hanChgAmt;
	}

	public void setHanChgAmt(BigDecimal hanChgAmt) {
		this.hanChgAmt = hanChgAmt;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "MAN_CHG_RT")
	public Integer getManChgRt() {
		return this.manChgRt;
	}

	public void setManChgRt(Integer manChgRt) {
		this.manChgRt = manChgRt;
	}

	@Column(name = "LMT_CCY", length = 10)
	public String getLmtCcy() {
		return this.lmtCcy;
	}

	public void setLmtCcy(String lmtCcy) {
		this.lmtCcy = lmtCcy;
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

	@Column(name = "LMT_VALID_DT", length = 19)
	public Timestamp getLmtValidDt() {
		return this.lmtValidDt;
	}

	public void setLmtValidDt(Timestamp lmtValidDt) {
		this.lmtValidDt = lmtValidDt;
	}

	@Column(name = "LMT_DUE_DT", length = 19)
	public Timestamp getLmtDueDt() {
		return this.lmtDueDt;
	}

	public void setLmtDueDt(Timestamp lmtDueDt) {
		this.lmtDueDt = lmtDueDt;
	}

	@Column(name = "EXPOSURE_DAY")
	public Integer getExposureDay() {
		return this.exposureDay;
	}

	public void setExposureDay(Integer exposureDay) {
		this.exposureDay = exposureDay;
	}

	@Column(name = "MIN_MARGIN_PCT", precision = 38, scale = 4)
	public Integer getMinMarginPct() {
		return this.minMarginPct;
	}

	public void setMinMarginPct(Integer minMarginPct) {
		this.minMarginPct = minMarginPct;
	}

	@Column(name = "CNTRCT_STS", length = 1)
	public String getCntrctSts() {
		return this.cntrctSts;
	}

	public void setCntrctSts(String cntrctSts) {
		this.cntrctSts = cntrctSts;
	}

	@Column(name = "OPEN_LOAN_AMT", precision = 18, scale = 4)
	public BigDecimal getOpenLoanAmt() {
		return this.openLoanAmt;
	}

	public void setOpenLoanAmt(BigDecimal openLoanAmt) {
		this.openLoanAmt = openLoanAmt;
	}

	@Column(name = "CLERK_ID", length = 35)
	public String getClerkId() {
		return this.clerkId;
	}

	public void setClerkId(String clerkId) {
		this.clerkId = clerkId;
	}

	@Column(name = "IF_ID", length = 35)
	public String getIfId() {
		return this.ifId;
	}

	public void setIfId(String ifId) {
		this.ifId = ifId;
	}

	@Column(name = "IF_CL_ID", length = 35)
	public String getIfClId() {
		return this.ifClId;
	}

	public void setIfClId(String ifClId) {
		this.ifClId = ifClId;
	}

	@Column(name = "IF_HAN_CHG_CCY", length = 10)
	public String getIfHanChgCcy() {
		return this.ifHanChgCcy;
	}

	public void setIfHanChgCcy(String ifHanChgCcy) {
		this.ifHanChgCcy = ifHanChgCcy;
	}

	@Column(name = "IF_HAN_CHG_AMT", precision = 18, scale = 4)
	public BigDecimal getIfHanChgAmt() {
		return this.ifHanChgAmt;
	}

	public void setIfHanChgAmt(BigDecimal ifHanChgAmt) {
		this.ifHanChgAmt = ifHanChgAmt;
	}

	@Column(name = "IF_COMM_RT", precision = 38, scale = 4)
	public Integer getIfCommRt() {
		return this.ifCommRt;
	}

	public void setIfCommRt(Integer ifCommRt) {
		this.ifCommRt = ifCommRt;
	}

	@Column(name = "EF_ID", length = 35)
	public String getEfId() {
		return this.efId;
	}

	public void setEfId(String efId) {
		this.efId = efId;
	}

	@Column(name = "EF_CL_ID", length = 35)
	public String getEfClId() {
		return this.efClId;
	}

	public void setEfClId(String efClId) {
		this.efClId = efClId;
	}

	@Column(name = "EF_HAN_CHG_CCY", length = 10)
	public String getEfHanChgCcy() {
		return this.efHanChgCcy;
	}

	public void setEfHanChgCcy(String efHanChgCcy) {
		this.efHanChgCcy = efHanChgCcy;
	}

	@Column(name = "EF_HAN_CHG_AMT", precision = 18, scale = 4)
	public BigDecimal getEfHanChgAmt() {
		return this.efHanChgAmt;
	}

	public void setEfHanChgAmt(BigDecimal efHanChgAmt) {
		this.efHanChgAmt = efHanChgAmt;
	}

	@Column(name = "EF_COMM_RT", precision = 38, scale = 4)
	public Integer getEfCommRt() {
		return this.efCommRt;
	}

	public void setEfCommRt(Integer efCommRt) {
		this.efCommRt = efCommRt;
	}

	@Column(name = "PATNER_ID", length = 35)
	public String getPatnerId() {
		return this.patnerId;
	}

	public void setPatnerId(String patnerId) {
		this.patnerId = patnerId;
	}

	@Column(name = "PATNER_NM", length = 70)
	public String getPatnerNm() {
		return this.patnerNm;
	}

	public void setPatnerNm(String patnerNm) {
		this.patnerNm = patnerNm;
	}

	@Column(name = "PATNER_CL_ID", length = 35)
	public String getPatnerClId() {
		return this.patnerClId;
	}

	public void setPatnerClId(String patnerClId) {
		this.patnerClId = patnerClId;
	}

	@Column(name = "PATNER_HAN_CHG_CCY", length = 10)
	public String getPatnerHanChgCcy() {
		return this.patnerHanChgCcy;
	}

	public void setPatnerHanChgCcy(String patnerHanChgCcy) {
		this.patnerHanChgCcy = patnerHanChgCcy;
	}

	@Column(name = "PATNER_HAN_CHG_AMT", precision = 18, scale = 4)
	public BigDecimal getPatnerHanChgAmt() {
		return this.patnerHanChgAmt;
	}

	public void setPatnerHanChgAmt(BigDecimal patnerHanChgAmt) {
		this.patnerHanChgAmt = patnerHanChgAmt;
	}

	@Column(name = "PATNER_HAN_CHG_RT")
	public Integer getPatnerHanChgRt() {
		return this.patnerHanChgRt;
	}

	public void setPatnerHanChgRt(Integer patnerHanChgRt) {
		this.patnerHanChgRt = patnerHanChgRt;
	}

	@Column(name = "LOAN_PCT", precision = 8, scale = 4)
	public BigDecimal getLoanPct() {
		return this.loanPct;
	}

	public void setLoanPct(BigDecimal loanPct) {
		this.loanPct = loanPct;
	}

	@Column(name = "ACCT_PERIOD")
	public Integer getAcctPeriod() {
		return this.acctPeriod;
	}

	public void setAcctPeriod(Integer acctPeriod) {
		this.acctPeriod = acctPeriod;
	}

	@Column(name = "GRACE_DAY")
	public Integer getGraceDay() {
		return this.graceDay;
	}

	public void setGraceDay(Integer graceDay) {
		this.graceDay = graceDay;
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

	@Column(name = "BUYER_NM", length = 50)
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

	@Column(name = "SYS_REL_REASON", length = 65535)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "FUND_RT", precision = 38, scale = 4)
	public Integer getFundRt() {
		return this.fundRt;
	}

	public void setFundRt(Integer fundRt) {
		this.fundRt = fundRt;
	}

	@Column(name = "INT_RT", length = 18)
	public String getIntRt() {
		return this.intRt;
	}

	public void setIntRt(String intRt) {
		this.intRt = intRt;
	}

	@Column(name = "INT_COL_TP", length = 18)
	public String getIntColTp() {
		return this.intColTp;
	}

	public void setIntColTp(String intColTp) {
		this.intColTp = intColTp;
	}

	@Column(name = "INT_COL_DT", length = 19)
	public Timestamp getIntColDt() {
		return this.intColDt;
	}

	public void setIntColDt(Timestamp intColDt) {
		this.intColDt = intColDt;
	}

	@Column(name = "STORAGE_ID", length = 35)
	public String getStorageId() {
		return this.storageId;
	}

	public void setStorageId(String storageId) {
		this.storageId = storageId;
	}

	@Column(name = "STORAGE_NM", length = 70)
	public String getStorageNm() {
		return this.storageNm;
	}

	public void setStorageNm(String storageNm) {
		this.storageNm = storageNm;
	}

	@Column(name = "STORAGE_ADR", length = 14)
	public String getStorageAdr() {
		return this.storageAdr;
	}

	public void setStorageAdr(String storageAdr) {
		this.storageAdr = storageAdr;
	}

	@Column(name = "CONTACT_NM", length = 70)
	public String getContactNm() {
		return this.contactNm;
	}

	public void setContactNm(String contactNm) {
		this.contactNm = contactNm;
	}

	@Column(name = "CUST_AC_NO", length = 35)
	public String getCustAcNo() {
		return this.custAcNo;
	}

	public void setCustAcNo(String custAcNo) {
		this.custAcNo = custAcNo;
	}

	@Column(name = "MARGIN_AC_NO", length = 35)
	public String getMarginAcNo() {
		return this.marginAcNo;
	}

	public void setMarginAcNo(String marginAcNo) {
		this.marginAcNo = marginAcNo;
	}

	@Column(name = "TTL_REG_AMT", precision = 18, scale = 4)
	public BigDecimal getTtlRegAmt() {
		return this.ttlRegAmt;
	}

	public void setTtlRegAmt(BigDecimal ttlRegAmt) {
		this.ttlRegAmt = ttlRegAmt;
	}

	@Column(name = "LOAN_TIMES")
	public Integer getLoanTimes() {
		return this.loanTimes;
	}

	public void setLoanTimes(Integer loanTimes) {
		this.loanTimes = loanTimes;
	}

	@Column(name = "REG_LOWEST_VAL", precision = 18, scale = 4)
	public BigDecimal getRegLowestVal() {
		return this.regLowestVal;
	}

	public void setRegLowestVal(BigDecimal regLowestVal) {
		this.regLowestVal = regLowestVal;
	}

	@Column(name = "MARGIN_BAL", precision = 18, scale = 4)
	public BigDecimal getMarginBal() {
		return this.marginBal;
	}

	public void setMarginBal(BigDecimal marginBal) {
		this.marginBal = marginBal;
	}

	@Column(name = "MARGIN_FORM", length = 1)
	public String getMarginForm() {
		return this.marginForm;
	}

	public void setMarginForm(String marginForm) {
		this.marginForm = marginForm;
	}

	@Column(name = "MARGIN_TP", length = 1)
	public String getMarginTp() {
		return this.marginTp;
	}

	public void setMarginTp(String marginTp) {
		this.marginTp = marginTp;
	}

	@Column(name = "MARGIN_APPLIED", precision = 18, scale = 4)
	public BigDecimal getMarginApplied() {
		return this.marginApplied;
	}

	public void setMarginApplied(BigDecimal marginApplied) {
		this.marginApplied = marginApplied;
	}

	@Column(name = "GUR_PAY_PCT", precision = 38, scale = 4)
	public Integer getGurPayPct() {
		return this.gurPayPct;
	}

	public void setGurPayPct(Integer gurPayPct) {
		this.gurPayPct = gurPayPct;
	}

	@Column(name = "OPENACT_GRACE_DAY")
	public Integer getOpenactGraceDay() {
		return this.openactGraceDay;
	}

	public void setOpenactGraceDay(Integer openactGraceDay) {
		this.openactGraceDay = openactGraceDay;
	}

	@Column(name = "PAY_INT_TP", length = 5)
	public String getPayIntTp() {
		return this.payIntTp;
	}

	public void setPayIntTp(String payIntTp) {
		this.payIntTp = payIntTp;
	}

	@Column(name = "PENA_RT", precision = 18, scale = 4)
	public BigDecimal getPenaRt() {
		return this.penaRt;
	}

	public void setPenaRt(BigDecimal penaRt) {
		this.penaRt = penaRt;
	}

	@Column(name = "TRANS_CHGRT", precision = 18, scale = 4)
	public BigDecimal getTransChgrt() {
		return this.transChgrt;
	}

	public void setTransChgrt(BigDecimal transChgrt) {
		this.transChgrt = transChgrt;
	}

	@Column(name = "FIN_CHGRT", precision = 18, scale = 4)
	public BigDecimal getFinChgrt() {
		return this.finChgrt;
	}

	public void setFinChgrt(BigDecimal finChgrt) {
		this.finChgrt = finChgrt;
	}

	@Column(name = "LOAN_RT", precision = 18, scale = 4)
	public BigDecimal getLoanRt() {
		return this.loanRt;
	}

	public void setLoanRt(BigDecimal loanRt) {
		this.loanRt = loanRt;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "FINA_TP", length = 5)
	public String getFinaTp() {
		return finaTp;
	}

	public void setFinaTp(String finaTp) {
		this.finaTp = finaTp;
	}

	@Column(name = "AR_BAL", precision = 18, scale = 4)
	public BigDecimal getArBal() {
		return arBal;
	}

	public void setArBal(BigDecimal arBal) {
		this.arBal = arBal;
	}

	@Column(name = "AR_AVAL_LOAN", precision = 18, scale = 4)
	public BigDecimal getArAvalLoan() {
		return arAvalLoan;
	}

	public void setArAvalLoan(BigDecimal arAvalLoan) {
		this.arAvalLoan = arAvalLoan;
	}

	@Column(name = "LMT_FLG", length = 5)
	public String getLmtFlg() {
		return lmtFlg;
	}

	public void setLmtFlg(String lmtFlg) {
		this.lmtFlg = lmtFlg;
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

	@Column(name = "THEIR_REF", length = 35)
	public String getTheirRef() {
		return theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
	}

	@Column(name = "RCUST_ID", length = 35)
	public String getRcustId() {
		return rcustId;
	}

	public void setRcustId(String rcustId) {
		this.rcustId = rcustId;
	}

	@Column(name = "RCUST_NM", length = 35)
	public String getRcustNm() {
		return rcustNm;
	}

	public void setRcustNm(String rcustNm) {
		this.rcustNm = rcustNm;
	}

	@Column(name = "LMT_DT", length = 19)
	public Timestamp getLmtDt() {
		return lmtDt;
	}

	public void setLmtDt(Timestamp lmtDt) {
		this.lmtDt = lmtDt;
	}

	@Column(name = "OPEN_INT_AMT", precision = 18, scale = 4)
	public BigDecimal getOpenIntAmt() {
		return openIntAmt;
	}

	public void setOpenIntAmt(BigDecimal openIntAmt) {
		this.openIntAmt = openIntAmt;
	}

	@Column(name = "BUYER2_ID", length = 35)
	public String getBuyer2Id() {
		return buyer2Id;
	}

	public void setBuyer2Id(String buyer2Id) {
		this.buyer2Id = buyer2Id;
	}

	@Column(name = "BUYER3_ID", length = 35)
	public String getBuyer3Id() {
		return buyer3Id;
	}

	public void setBuyer3Id(String buyer3Id) {
		this.buyer3Id = buyer3Id;
	}

	@Column(name = "LOAN_PERC", precision = 18, scale = 4)
	public BigDecimal getLoanPerc() {
		return loanPerc;
	}

	public void setLoanPerc(BigDecimal loanPerc) {
		this.loanPerc = loanPerc;
	}

	@Column(name = "COMM_RT", precision = 18, scale = 4)
	public BigDecimal getCommRt() {
		return commRt;
	}

	public void setCommRt(BigDecimal commRt) {
		this.commRt = commRt;
	}

	@Column(name = "APPROVAL_STS", length = 35)
	public String getApprovalSts() {
		return approvalSts;
	}

	public void setApprovalSts(String approvalSts) {
		this.approvalSts = approvalSts;
	}

	@Column(name = "PAY_CHG_TP", length = 5)
	public String getPayChgTp() {
		return payChgTp;
	}

	public void setPayChgTp(String payChgTp) {
		this.payChgTp = payChgTp;
	}

	@Column(name = "POOL_ID", length = 35)
	public String getPoolId() {
		return poolId;
	}

	public void setPoolId(String poolId) {
		this.poolId = poolId;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "CHG_LMT_AMT", precision = 18, scale = 4)
	public BigDecimal getChgLmtAmt() {
		return chgLmtAmt;
	}

	public void setChgLmtAmt(BigDecimal chgLmtAmt) {
		this.chgLmtAmt = chgLmtAmt;
	}

	@Column(name = "CHG_STS", length = 15)
	public String getChgSts() {
		return chgSts;
	}

	public void setChgSts(String chgSts) {
		this.chgSts = chgSts;
	}

	@Column(name = "LMT_STS", length = 15)
	public String getLmtSts() {
		return lmtSts;
	}

	public void setLmtSts(String lmtSts) {
		this.lmtSts = lmtSts;
	}

	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

	@Column(name = "SELLER_INST_CD", length = 18, scale = 4)
	public String getSellerInstCd() {
		return sellerInstCd;
	}

	public void setSellerInstCd(String sellerInstCd) {
		this.sellerInstCd = sellerInstCd;
	}

	@Column(name = "BILL_AMT", length = 18, scale = 4)
	public BigDecimal getBillAmt() {
		return billAmt;
	}

	public void setBillAmt(BigDecimal billAmt) {
		this.billAmt = billAmt;
	}

	@Column(name = "INIT_GART_PCT", length = 8, scale = 4)
	public BigDecimal getInitGartPct() {
		return initGartPct;
	}

	public void setInitGartPct(BigDecimal initGartPct) {
		this.initGartPct = initGartPct;
	}

	@Column(name = "SELLER_LMT_LIMIT", length = 200)
	public String getSellerLmtLimit() {
		return sellerLmtLimit;
	}

	public void setSellerLmtLimit(String sellerLmtLimit) {
		this.sellerLmtLimit = sellerLmtLimit;
	}

	@Column(name = "LMT_AVL", length = 18, scale = 4)
	public BigDecimal getLmtAvl() {
		return lmtAvl;
	}

	public void setLmtAvl(BigDecimal lmtAvl) {
		this.lmtAvl = lmtAvl;
	}

	@Column(name = "CUST_BR_ID", length = 35)
	public String getCustBrId() {
		return custBrId;
	}

	public void setCustBrId(String custBrId) {
		this.custBrId = custBrId;
	}

	@Column(name = "CMS_CNTRCT_NO", length = 35)
	public String getCmsCntrctNo() {
		return cmsCntrctNo;
	}

	public void setCmsCntrctNo(String cmsCntrctNo) {
		this.cmsCntrctNo = cmsCntrctNo;
	}

	@Column(name = "INIT_TH_FLG", length = 1)
	public String getInitThFlg() {
		return initThFlg;
	}

	public void setInitThFlg(String initThFlg) {
		this.initThFlg = initThFlg;
	}

	@Column(name = "CRTF_WAR_PRD")
	public Integer getCrtfWarPrd() {
		return this.crtfWarPrd;
	}

	public void setCrtfWarPrd(Integer crtfWarPrd) {
		this.crtfWarPrd = crtfWarPrd;
	}

	@Column(name = "BCH_NM", length = 35)
	public String getBchNm() {
		return bchNm;
	}

	public void setBchNm(String bchNm) {
		this.bchNm = bchNm;
	}

	@Column(name = "INSURE_TP", length = 10)
	public String getInsureTp() {
		return insureTp;
	}

	public void setInsureTp(String insureTp) {
		this.insureTp = insureTp;
	}

	@Column(name = "IS_POSS_INSURE", length = 10)
	public String getIsPossInsure() {
		return isPossInsure;
	}

	public void setIsPossInsure(String isPossInsure) {
		this.isPossInsure = isPossInsure;
	}

	@Column(name = "INSURE_LIMIT", length = 200)
	public String getInsureLimit() {
		return insureLimit;
	}

	public void setInsureLimit(String insureLimit) {
		this.insureLimit = insureLimit;
	}

	@Column(name = "CMS_CUST_NO", length = 35)
	public String getCmsCustNo() {
		return cmsCustNo;
	}

	public void setCmsCustNo(String cmsCustNo) {
		this.cmsCustNo = cmsCustNo;
	}

	@Column(name = "PLD_PERC", length = 18, scale = 4)
	public BigDecimal getPldPerc() {
		return pldPerc;
	}

	public void setPldPerc(BigDecimal pldPerc) {
		this.pldPerc = pldPerc;
	}

	@Column(name = "RECOURSE_TP", length = 18)
	public String getRecourseTp() {
		return this.recourseTp;
	}

	public void setRecourseTp(String recourseTp) {
		this.recourseTp = recourseTp;
	}

	@Column(name = "POOL_LINE", length = 18, scale = 4)
	public BigDecimal getPoolLine() {
		return poolLine;
	}

	public void setPoolLine(BigDecimal poolLine) {
		this.poolLine = poolLine;
	}

	@Column(name = "PAY_STS", length = 1)
	public String getPaySts() {
		return paySts;
	}

	public void setPaySts(String paySts) {
		this.paySts = paySts;
	}

	@Column(name = "MAX_DRO_PERC", precision = 18, scale = 4)
	public BigDecimal getMaxDroPerc() {
		return maxDroPerc;
	}

	public void setMaxDroPerc(BigDecimal maxDroPerc) {
		this.maxDroPerc = maxDroPerc;
	}

	@Column(name = "IS_SEND_SEL_LMT", length = 12)
	public String getIsSendSelLmt() {
		return isSendSelLmt;
	}

	public void setIsSendSelLmt(String isSendSelLmt) {
		this.isSendSelLmt = isSendSelLmt;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}