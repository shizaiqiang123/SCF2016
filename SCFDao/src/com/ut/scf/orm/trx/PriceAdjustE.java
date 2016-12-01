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
 * PriceAdjustE entity.
 * 
 * @author YeQ
 * @date 2016-6-29
 */
@Entity
@Table(name = "PRICE_ADJUST_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class PriceAdjustE implements java.io.Serializable {

	/**
	 * 序列号
	 */
	private static final long serialVersionUID = 1L;

	// Fields
	private PriceAdjustEId id;
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
	private BigDecimal lmtBal;
	private String busiTp;
	private String billId;
	private String billNo;
	private BigDecimal inoutAmt;
	private Timestamp inoutDate;
	private BigDecimal loanAmt;
	private BigDecimal loanBal;
	private String initBailAcc;
	private BigDecimal initBailBal;
	private String pmtBailAcc;
	private Integer ttlPayNum;
	private BigDecimal ttlPayAmt;
	private String buyerId;
	private String selId;
	private String buyerNm;
	private String selNm;
	private String ccy;
	private Integer ttlLowPayNum;
	private BigDecimal ttlYPayAmt;
	private String regId;
	private String regNm;
	private String wareId;
	private String wareNm;
	private BigDecimal fundRt;
	private BigDecimal ttlRegAmt;
	private BigDecimal marginApplied;
	private BigDecimal openLoanAmt;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	/** default constructor */
	public PriceAdjustE() {
	}

	/** minimal constructor */
	public PriceAdjustE(PriceAdjustEId id) {
		this.id = id;
	}

	/** full constructor */
	public PriceAdjustE(PriceAdjustEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String cntrctNo, BigDecimal lmtBal,
			String busiTp, String billId, String billNo, BigDecimal inoutAmt,
			Timestamp inoutDate, BigDecimal loanAmt, BigDecimal loanBal,
			String initBailAcc, BigDecimal initBailBal, String pmtBailAcc,
			Integer ttlPayNum, BigDecimal ttlPayAmt, String buyerId,
			String selId, String buyerNm, String selNm, String ccy,
			Integer ttlLowPayNum, BigDecimal ttlYPayAmt, String regId,
			String regNm, String wareId, String wareNm, BigDecimal fundRt,
			BigDecimal ttlRegAmt, BigDecimal marginApplied,
			BigDecimal openLoanAmt,String sysOrgId) {
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
		this.sysEventTimes = sysEventTimes;
		this.cntrctNo = cntrctNo;
		this.lmtBal = lmtBal;
		this.busiTp = busiTp;
		this.billId = billId;
		this.billNo = billNo;
		this.inoutAmt = inoutAmt;
		this.inoutDate = inoutDate;
		this.loanAmt = loanAmt;
		this.loanBal = loanBal;
		this.initBailAcc = initBailAcc;
		this.initBailBal = initBailBal;
		this.pmtBailAcc = pmtBailAcc;
		this.ttlPayNum = ttlPayNum;
		this.ttlPayAmt = ttlPayAmt;
		this.buyerId = buyerId;
		this.selId = selId;
		this.buyerNm = buyerNm;
		this.selNm = selNm;
		this.ccy = ccy;
		this.ttlLowPayNum = ttlLowPayNum;
		this.ttlYPayAmt = ttlYPayAmt;
		this.regId = regId;
		this.regNm = regNm;
		this.wareId = wareId;
		this.wareNm = wareNm;
		this.fundRt = fundRt;
		this.ttlRegAmt = ttlRegAmt;
		this.marginApplied = marginApplied;
		this.openLoanAmt = openLoanAmt;
		this.sysOrgId = sysOrgId;
	}

	/** getter and setter */

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)) })
	public PriceAdjustEId getId() {
		return this.id;
	}

	public void setId(PriceAdjustEId id) {
		this.id = id;
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

	@Column(name = "CNTRCT_NO", length = 40)
	public String getCntrctNo() {
		return cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "LMT_BAL", precision = 18, scale = 3)
	public BigDecimal getLmtBal() {
		return lmtBal;
	}

	public void setLmtBal(BigDecimal lmtBal) {
		this.lmtBal = lmtBal;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "BILL_ID", length = 35)
	public String getBillId() {
		return billId;
	}

	public void setBillId(String billId) {
		this.billId = billId;
	}

	@Column(name = "BILL_NO", length = 35)
	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	@Column(name = "INOUT_AMT", precision = 18, scale = 3)
	public BigDecimal getInoutAmt() {
		return inoutAmt;
	}

	public void setInoutAmt(BigDecimal inoutAmt) {
		this.inoutAmt = inoutAmt;
	}

	@Column(name = "INOUT_DATE", length = 11)
	public Timestamp getInoutDate() {
		return inoutDate;
	}

	public void setInoutDate(Timestamp inoutDate) {
		this.inoutDate = inoutDate;
	}

	@Column(name = "LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getLoanAmt() {
		return loanAmt;
	}

	public void setLoanAmt(BigDecimal loanAmt) {
		this.loanAmt = loanAmt;
	}

	@Column(name = "LOAN_BAL", precision = 18, scale = 3)
	public BigDecimal getLoanBal() {
		return loanBal;
	}

	public void setLoanBal(BigDecimal loanBal) {
		this.loanBal = loanBal;
	}

	@Column(name = "INIT_BAIL_ACC", length = 35)
	public String getInitBailAcc() {
		return initBailAcc;
	}

	public void setInitBailAcc(String initBailAcc) {
		this.initBailAcc = initBailAcc;
	}

	@Column(name = "INIT_BAIL_BAL", precision = 18, scale = 3)
	public BigDecimal getInitBailBal() {
		return initBailBal;
	}

	public void setInitBailBal(BigDecimal initBailBal) {
		this.initBailBal = initBailBal;
	}

	@Column(name = "PMT_BAIL_ACC", length = 35)
	public String getPmtBailAcc() {
		return pmtBailAcc;
	}

	public void setPmtBailAcc(String pmtBailAcc) {
		this.pmtBailAcc = pmtBailAcc;
	}

	@Column(name = "TTL_PAY_NUM", precision = 10)
	public Integer getTtlPayNum() {
		return ttlPayNum;
	}

	public void setTtlPayNum(Integer ttlPayNum) {
		this.ttlPayNum = ttlPayNum;
	}

	@Column(name = "TTL_PAY_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlPayAmt() {
		return ttlPayAmt;
	}

	public void setTtlPayAmt(BigDecimal ttlPayAmt) {
		this.ttlPayAmt = ttlPayAmt;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "SEL_NM", length = 35)
	public String getSelNm() {
		return selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "ccy", length = 35)
	public String getCcy() {
		return ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "TTL_LOW_PAY_NUM", length = 35)
	public Integer getTtlLowPayNum() {
		return ttlLowPayNum;
	}

	public void setTtlLowPayNum(Integer ttlLowPayNum) {
		this.ttlLowPayNum = ttlLowPayNum;
	}

	@Column(name = "TTL_Y_PAY_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlYPayAmt() {
		return ttlYPayAmt;
	}

	public void setTtlYPayAmt(BigDecimal ttlYPayAmt) {
		this.ttlYPayAmt = ttlYPayAmt;
	}

	@Column(name = "REG_ID", length = 35)
	public String getRegId() {
		return regId;
	}

	public void setRegId(String regId) {
		this.regId = regId;
	}

	@Column(name = "REG_NM", length = 35)
	public String getRegNm() {
		return regNm;
	}

	public void setRegNm(String regNm) {
		this.regNm = regNm;
	}

	@Column(name = "WARE_ID", length = 35)
	public String getWareId() {
		return wareId;
	}

	public void setWareId(String wareId) {
		this.wareId = wareId;
	}

	@Column(name = "WARE_NM", length = 35)
	public String getWareNm() {
		return wareNm;
	}

	public void setWareNm(String wareNm) {
		this.wareNm = wareNm;
	}

	@Column(name = "FUND_RT", precision = 38, scale = 4)
	public BigDecimal getFundRt() {
		return fundRt;
	}

	public void setFundRt(BigDecimal fundRt) {
		this.fundRt = fundRt;
	}

	@Column(name = "TTL_REG_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlRegAmt() {
		return ttlRegAmt;
	}

	public void setTtlRegAmt(BigDecimal ttlRegAmt) {
		this.ttlRegAmt = ttlRegAmt;
	}

	@Column(name = "MARGIN_APPLIED", precision = 18, scale = 3)
	public BigDecimal getMarginApplied() {
		return marginApplied;
	}

	public void setMarginApplied(BigDecimal marginApplied) {
		this.marginApplied = marginApplied;
	}

	@Column(name = "OPEN_LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getOpenLoanAmt() {
		return openLoanAmt;
	}

	public void setOpenLoanAmt(BigDecimal openLoanAmt) {
		this.openLoanAmt = openLoanAmt;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}
