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
 * GoodsChangeE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "GOODS_CHANGE_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class GoodsChangeE implements java.io.Serializable {

	// Fields

	private GoodsChangeEId id;
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
	private String cntrctNo;
	private String buyerId;
	private String selId;
	private String buyerNm;
	private String selNm;
	private String ccy;
	private String regId;
	private String regNm;
	private String wareId;
	private String wareNm;
	private String wareAdd;
	private String wareContact;
	private Integer fundRt;
	private BigDecimal ttlRegAmt;
	private Integer ttlLowPayNum;
	private BigDecimal lmtBal;
	private Timestamp lmtValidDt;
	private Timestamp lmtDueDt;
	private Integer minMarginPct;
	private String cntrctSts;
	private BigDecimal openLoanAmt;
	private BigDecimal marginBal;
	private BigDecimal ttlInVal;
	private BigDecimal ttlOutVal;
	private String busiTp;
	private String sysRelReason;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public GoodsChangeE() {
	}

	/** minimal constructor */
	public GoodsChangeE(GoodsChangeEId id, Timestamp sysOpTm) {
		super();
		this.id = id;
		this.sysOpTm = sysOpTm;
	}

	/** full constructor */
	public GoodsChangeE(GoodsChangeEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String cntrctNo, String buyerId, String selId, String buyerNm,
			String selNm, String ccy, String regId, String regNm,
			String wareId, String wareNm, String wareAdd, String wareContact,
			Integer fundRt, BigDecimal ttlRegAmt, Integer ttlLowPayNum,
			BigDecimal lmtBal, Timestamp lmtValidDt, Timestamp lmtDueDt,
			Integer minMarginPct, String cntrctSts, BigDecimal openLoanAmt,
			BigDecimal marginBal, BigDecimal ttlInVal, BigDecimal ttlOutVal,
			String busiTp, String sysRelReason,String sysOrgId) {
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
		this.cntrctNo = cntrctNo;
		this.buyerId = buyerId;
		this.selId = selId;
		this.buyerNm = buyerNm;
		this.selNm = selNm;
		this.ccy = ccy;
		this.regId = regId;
		this.regNm = regNm;
		this.wareId = wareId;
		this.wareNm = wareNm;
		this.wareAdd = wareAdd;
		this.wareContact = wareContact;
		this.fundRt = fundRt;
		this.ttlRegAmt = ttlRegAmt;
		this.ttlLowPayNum = ttlLowPayNum;
		this.lmtBal = lmtBal;
		this.lmtValidDt = lmtValidDt;
		this.lmtDueDt = lmtDueDt;
		this.minMarginPct = minMarginPct;
		this.cntrctSts = cntrctSts;
		this.openLoanAmt = openLoanAmt;
		this.marginBal = marginBal;
		this.ttlInVal = ttlInVal;
		this.ttlOutVal = ttlOutVal;
		this.busiTp = busiTp;
		this.sysRelReason = sysRelReason;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)) })
	public GoodsChangeEId getId() {
		return this.id;
	}

	public void setId(GoodsChangeEId id) {
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

	@Column(name = "CNTRCT_NO", length = 40)
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

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return this.buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "SEL_NM", length = 35)
	public String getSelNm() {
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "CCY", length = 10)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "REG_ID", length = 35)
	public String getRegId() {
		return this.regId;
	}

	public void setRegId(String regId) {
		this.regId = regId;
	}

	@Column(name = "REG_NM", length = 35)
	public String getRegNm() {
		return this.regNm;
	}

	public void setRegNm(String regNm) {
		this.regNm = regNm;
	}

	@Column(name = "WARE_ID", length = 35)
	public String getWareId() {
		return this.wareId;
	}

	public void setWareId(String wareId) {
		this.wareId = wareId;
	}

	@Column(name = "WARE_NM", length = 35)
	public String getWareNm() {
		return this.wareNm;
	}

	public void setWareNm(String wareNm) {
		this.wareNm = wareNm;
	}

	@Column(name = "WARE_ADD", length = 35)
	public String getWareAdd() {
		return this.wareAdd;
	}

	public void setWareAdd(String wareAdd) {
		this.wareAdd = wareAdd;
	}

	@Column(name = "WARE_CONTACT", length = 35)
	public String getWareContact() {
		return this.wareContact;
	}

	public void setWareContact(String wareContact) {
		this.wareContact = wareContact;
	}

	@Column(name = "FUND_RT", precision = 38, scale = 4)
	public Integer getFundRt() {
		return this.fundRt;
	}

	public void setFundRt(Integer fundRt) {
		this.fundRt = fundRt;
	}

	@Column(name = "TTL_REG_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlRegAmt() {
		return this.ttlRegAmt;
	}

	public void setTtlRegAmt(BigDecimal ttlRegAmt) {
		this.ttlRegAmt = ttlRegAmt;
	}

	@Column(name = "TTL_LOW_PAY_NUM", precision = 18, scale = 3)
	public Integer getTtlLowPayNum() {
		return this.ttlLowPayNum;
	}

	public void setTtlLowPayNum(Integer ttlLowPayNum) {
		this.ttlLowPayNum = ttlLowPayNum;
	}

	@Column(name = "LMT_BAL", precision = 18, scale = 3)
	public BigDecimal getLmtBal() {
		return this.lmtBal;
	}

	public void setLmtBal(BigDecimal lmtBal) {
		this.lmtBal = lmtBal;
	}

	@Column(name = "LMT_VALID_DT")
	public Timestamp getLmtValidDt() {
		return this.lmtValidDt;
	}

	public void setLmtValidDt(Timestamp lmtValidDt) {
		this.lmtValidDt = lmtValidDt;
	}

	@Column(name = "LMT_DUE_DT")
	public Timestamp getLmtDueDt() {
		return this.lmtDueDt;
	}

	public void setLmtDueDt(Timestamp lmtDueDt) {
		this.lmtDueDt = lmtDueDt;
	}

	@Column(name = "MIN_MARGIN_PCT", precision = 18, scale = 3)
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

	@Column(name = "OPEN_LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getOpenLoanAmt() {
		return this.openLoanAmt;
	}

	public void setOpenLoanAmt(BigDecimal openLoanAmt) {
		this.openLoanAmt = openLoanAmt;
	}

	@Column(name = "MARGIN_BAL", precision = 18, scale = 3)
	public BigDecimal getMarginBal() {
		return this.marginBal;
	}

	public void setMarginBal(BigDecimal marginBal) {
		this.marginBal = marginBal;
	}

	@Column(name = "TTL_IN_VAL", precision = 18, scale = 3)
	public BigDecimal getTtlInVal() {
		return this.ttlInVal;
	}

	public void setTtlInVal(BigDecimal ttlInVal) {
		this.ttlInVal = ttlInVal;
	}

	@Column(name = "TTL_OUT_VAL", precision = 18, scale = 3)
	public BigDecimal getTtlOutVal() {
		return this.ttlOutVal;
	}

	public void setTtlOutVal(BigDecimal ttlOutVal) {
		this.ttlOutVal = ttlOutVal;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
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
}