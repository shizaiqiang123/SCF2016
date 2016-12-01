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
 * TrfReg entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "TRF_REG_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class TrfRegM implements java.io.Serializable {

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
	private String selId;
	private String buyerId;
	private String selNm;
	private String buyerNm;
	private String ccy;
	private BigDecimal regAmt;
	private String cntrctNo;
	private String serviceReq;
	private String busiTp;
	private Timestamp trxDt;
	private Integer acctPeriod;
	private Integer graceDay;
	private Integer regNo;
	private String remark;
	private BigDecimal ttlCrnAmt;
	private String sysBusiUnit;
	private String selAcNo;
	private BigDecimal pdgAmt;
	private BigDecimal docketAmt;
	private String isCollect;
	private String sellerInstCd;
	private BigDecimal ttlRevTrfAmt;
	private Integer trfFlg;
	// modify by shizaiqiang 用于应收账款质押功能
	private String pldNm;
	private String pawNm;
	private String pldCnNo;
	private Timestamp pldValDt;
	private Timestamp pldDueDt;
	private BigDecimal pldPro;
	private String pldRem;
	private Timestamp lmtValidDt;
	private Timestamp lmtDueDt;
	private String sysRelReason;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	private String  isConfirm;
	private String confirmFlag;
	private String  confirmOp;
	// Constructors

	/** default constructor */
	public TrfRegM() {
	}

	/** minimal constructor */
	public TrfRegM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public TrfRegM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String selId, String buyerId, String selNm,
			String buyerNm, String ccy, BigDecimal regAmt, String cntrctNo,
			String serviceReq, String busiTp, Timestamp trxDt,
			Integer acctPeriod, Integer graceDay, Integer regNo, String remark,
			BigDecimal ttlCrnAmt, String sysBusiUnit, String selAcNo,
			BigDecimal pdgAmt, BigDecimal docketAmt, String isCollect,
			String sellerInstCd, BigDecimal ttlRevTrfAmt, Integer trfFlg,
			String pldNm, String pawNm, String pldCnNo, Timestamp pldValDt,
			Timestamp pldDueDt, BigDecimal pldPro, String pldRem,
			Timestamp lmtValidDt, Timestamp lmtDueDt, String sysRelReason,String sysOrgId,
			String isConfirm,String confirmFlag,String confirmOp) {
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
		this.selId = selId;
		this.buyerId = buyerId;
		this.selNm = selNm;
		this.buyerNm = buyerNm;
		this.ccy = ccy;
		this.regAmt = regAmt;
		this.cntrctNo = cntrctNo;
		this.serviceReq = serviceReq;
		this.busiTp = busiTp;
		this.trxDt = trxDt;
		this.acctPeriod = acctPeriod;
		this.graceDay = graceDay;
		this.regNo = regNo;
		this.remark = remark;
		this.ttlCrnAmt = ttlCrnAmt;
		this.sysBusiUnit = sysBusiUnit;
		this.selAcNo = selAcNo;
		this.pdgAmt = pdgAmt;
		this.docketAmt = docketAmt;
		this.isCollect = isCollect;
		this.sellerInstCd = sellerInstCd;
		this.ttlRevTrfAmt = ttlRevTrfAmt;
		this.trfFlg = trfFlg;
		this.pldNm = pldNm;
		this.pawNm = pawNm;
		this.pldCnNo = pldCnNo;
		this.pldValDt = pldValDt;
		this.pldDueDt = pldDueDt;
		this.pldPro = pldPro;
		this.pldRem = pldRem;
		this.lmtValidDt = lmtValidDt;
		this.lmtDueDt = lmtDueDt;
		this.sysRelReason = sysRelReason;
		this.sysOrgId = sysOrgId;
		this.isConfirm = isConfirm;
		this.confirmFlag = confirmFlag;
		this.confirmOp = confirmOp;
	}

	@Column(name = "SELLER_INST_CD", length = 35)
	public String getSellerInstCd() {
		return sellerInstCd;
	}

	public void setSellerInstCd(String sellerInstCd) {
		this.sellerInstCd = sellerInstCd;
	}

	// Property accessors
	@Id
	@Column(name = "SYS_REF_NO", unique = true, nullable = false, length = 35)
	public String getSysRefNo() {
		return this.sysRefNo;
	}

	@Column(name = "PDG_AMT", precision = 18, scale = 4)
	public BigDecimal getPdgAmt() {
		return pdgAmt;
	}

	public void setPdgAmt(BigDecimal pdgAmt) {
		this.pdgAmt = pdgAmt;
	}

	@Column(name = "DOCKET_AMT", precision = 18, scale = 4)
	public BigDecimal getDocketAmt() {
		return docketAmt;
	}

	public void setDocketAmt(BigDecimal docketAmt) {
		this.docketAmt = docketAmt;
	}

	@Column(name = "IS_COLLECT", length = 1)
	public String getIsCollect() {
		return isCollect;
	}

	public void setIsCollect(String isCollect) {
		this.isCollect = isCollect;
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
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

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "REG_AMT", precision = 18, scale = 4)
	public BigDecimal getRegAmt() {
		return this.regAmt;
	}

	public void setRegAmt(BigDecimal regAmt) {
		this.regAmt = regAmt;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "SERVICE_REQ", length = 1)
	public String getServiceReq() {
		return this.serviceReq;
	}

	public void setServiceReq(String serviceReq) {
		this.serviceReq = serviceReq;
	}

	@Column(name = "BUSI_TP", length = 8)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "TRX_DT", length = 11)
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "ACCT_PERIOD", precision = 3, scale = 0)
	public Integer getAcctPeriod() {
		return this.acctPeriod;
	}

	public void setAcctPeriod(Integer acctPeriod) {
		this.acctPeriod = acctPeriod;
	}

	@Column(name = "GRACE_DAY", precision = 3, scale = 0)
	public Integer getGraceDay() {
		return this.graceDay;
	}

	public void setGraceDay(Integer graceDay) {
		this.graceDay = graceDay;
	}

	@Column(name = "REG_NO", precision = 6, scale = 0)
	public Integer getRegNo() {
		return regNo;
	}

	public void setRegNo(Integer regNo) {
		this.regNo = regNo;
	}

	@Column(name = "remark", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "TTL_CRN_AMT", precision = 18, scale = 4)
	public BigDecimal getTtlCrnAmt() {
		return ttlCrnAmt;
	}

	public void setTtlCrnAmt(BigDecimal ttlCrnAmt) {
		this.ttlCrnAmt = ttlCrnAmt;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "SEL_AC_NO", length = 40)
	public String getSelAcNo() {
		return selAcNo;
	}

	public void setSelAcNo(String selAcNo) {
		this.selAcNo = selAcNo;
	}

	@Column(name = "TTL_REV_TRF_AMT", precision = 18, scale = 4)
	public BigDecimal getTtlRevTrfAmt() {
		return ttlRevTrfAmt;
	}

	public void setTtlRevTrfAmt(BigDecimal ttlRevTrfAmt) {
		this.ttlRevTrfAmt = ttlRevTrfAmt;
	}

	@Column(name = "TRF_FLG", precision = 6, scale = 0)
	public Integer getTrfFlg() {
		return trfFlg;
	}

	public void setTrfFlg(Integer trfFlg) {
		this.trfFlg = trfFlg;
	}

	@Column(name = "PLD_NM", length = 35)
	public String getPldNm() {
		return pldNm;
	}

	public void setPldNm(String pldNm) {
		this.pldNm = pldNm;
	}

	@Column(name = "PAW_NM", length = 35)
	public String getPawNm() {
		return pawNm;
	}

	public void setPawNm(String pawNm) {
		this.pawNm = pawNm;
	}

	@Column(name = "PLD_CN_NO", length = 35)
	public String getPldCnNo() {
		return pldCnNo;
	}

	public void setPldCnNo(String pldCnNo) {
		this.pldCnNo = pldCnNo;
	}

	@Column(name = "PLD_REM", length = 35)
	public String getPldRem() {
		return pldRem;
	}

	public void setPldRem(String pldRem) {
		this.pldRem = pldRem;
	}

	@Column(name = "PLD_PRO", precision = 18, scale = 4)
	public BigDecimal getPldPro() {
		return pldPro;
	}

	public void setPldPro(BigDecimal pldPro) {
		this.pldPro = pldPro;
	}

	@Column(name = "PLD_VAL_DT", length = 11)
	public Timestamp getPldValDt() {
		return pldValDt;
	}

	public void setPldValDt(Timestamp pldValDt) {
		this.pldValDt = pldValDt;
	}

	@Column(name = "PLD_DUE_DT", length = 11)
	public Timestamp getPldDueDt() {
		return pldDueDt;
	}

	public void setPldDueDt(Timestamp pldDueDt) {
		this.pldDueDt = pldDueDt;
	}

	@Column(name = "LMT_VALID_DT", length = 11)
	public Timestamp getLmtValidDt() {
		return lmtValidDt;
	}

	public void setLmtValidDt(Timestamp lmtValidDt) {
		this.lmtValidDt = lmtValidDt;
	}

	@Column(name = "LMT_DUE_DT", length = 11)
	public Timestamp getLmtDueDt() {
		return lmtDueDt;
	}

	public void setLmtDueDt(Timestamp lmtDueDt) {
		this.lmtDueDt = lmtDueDt;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return sysRelReason;
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
}