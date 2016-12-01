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
 * GoodsInoutE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "GOODS_INOUT_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class GoodsInoutE implements java.io.Serializable {

	// Fields

	private GoodsInoutEId id;
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
	private Long ttlPayNum;
	private BigDecimal ttlPayAmt;
	private String buyerId;
	private String selId;
	private String buyerNm;
	private String selNm;
	private String ccy;
	private String patnerId;
	private String patnerNm;
	/** add by YeQing 2016-6-13 ------start */
	private Long ttlLowPayNum;// 最低库存价值
	private BigDecimal ttlYPayAmt;// 可提货价值
	private String regId;// 监管方编号
	private String regNm;// 监管方名称
	private String wareId;// 仓库ID
	private String wareNm;// 仓库名称
	private BigDecimal ttlRegAmt;// 库存价值总额
	/** add by YeQing 2016-6-13 ------end */
	private String sysRelReason;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	private BigDecimal poAmt;// 订单金额
	private BigDecimal ttlLoanAmt;// 融资金额
	private BigDecimal ttlLoanBal;// 融资余额
	private BigDecimal ttlOutAmt;// 本次可发货价值
	private BigDecimal ttlOutSureAmt;// 本次实发货价值
	private String loanId;// 融资编号
	private String poNo;// 订单编号
	private String isConfirm;// 是否确认
	private String confirmFlag;// 12：外网确认；11：银行
	private String confirmOp;// 意见

	// Constructors

	/** default constructor */
	public GoodsInoutE() {
	}

	/** minimal constructor */
	public GoodsInoutE(GoodsInoutEId id) {
		this.id = id;
	}

	/** full constructor */
	public GoodsInoutE(GoodsInoutEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String cntrctNo, String busiTp, String billId, String billNo,
			BigDecimal inoutAmt, Timestamp inoutDate, BigDecimal loanAmt,
			BigDecimal loanBal, String initBailAcc, BigDecimal initBailBal,
			String pmtBailAcc, Long ttlPayNum, BigDecimal ttlPayAmt,
			String buyerId, String selId, String buyerNm, String selNm,
			String ccy, String patnerId, String patnerNm, Long ttlLowPayNum,
			BigDecimal ttlYPayAmt, String regId, String regNm, String wareId,
			String wareNm, BigDecimal ttlRegAmt, String sysRelReason,
			String sysOrgId, BigDecimal poAmt, BigDecimal ttlLoanAmt,
			BigDecimal ttlLoanBal, BigDecimal ttlOutAmt,
			BigDecimal ttlOutSureAmt, String loanId, String poNo,
			String isConfirm, String confirmFlag, String confirmOp) {
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
		this.patnerId = patnerId;
		this.patnerNm = patnerNm;
		this.ttlLowPayNum = ttlLowPayNum;
		this.ttlYPayAmt = ttlYPayAmt;
		this.regId = regId;
		this.regNm = regNm;
		this.wareId = wareId;
		this.wareNm = wareNm;
		this.ttlRegAmt = ttlRegAmt;
		this.sysRelReason = sysRelReason;
		this.sysOrgId = sysOrgId;
		this.poAmt = poAmt;
		this.ttlLoanAmt = ttlLoanAmt;
		this.ttlLoanBal = ttlLoanBal;
		this.ttlOutAmt = ttlOutAmt;
		this.ttlOutSureAmt = ttlOutSureAmt;
		this.loanId = loanId;
		this.poNo = poNo;
		this.isConfirm = isConfirm;
		this.confirmFlag = confirmFlag;
		this.confirmOp = confirmOp;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)) })
	public GoodsInoutEId getId() {
		return this.id;
	}

	public void setId(GoodsInoutEId id) {
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

	@Column(name = "BUSI_TP", length = 35)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "BILL_ID", length = 35)
	public String getBillId() {
		return this.billId;
	}

	public void setBillId(String billId) {
		this.billId = billId;
	}

	@Column(name = "BILL_NO", length = 35)
	public String getBillNo() {
		return this.billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	@Column(name = "INOUT_AMT", precision = 18, scale = 3)
	public BigDecimal getInoutAmt() {
		return this.inoutAmt;
	}

	public void setInoutAmt(BigDecimal inoutAmt) {
		this.inoutAmt = inoutAmt;
	}

	@Column(name = "INOUT_DATE")
	public Timestamp getInoutDate() {
		return this.inoutDate;
	}

	public void setInoutDate(Timestamp inoutDate) {
		this.inoutDate = inoutDate;
	}

	@Column(name = "LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getLoanAmt() {
		return this.loanAmt;
	}

	public void setLoanAmt(BigDecimal loanAmt) {
		this.loanAmt = loanAmt;
	}

	@Column(name = "LOAN_BAL", precision = 18, scale = 3)
	public BigDecimal getLoanBal() {
		return this.loanBal;
	}

	public void setLoanBal(BigDecimal loanBal) {
		this.loanBal = loanBal;
	}

	@Column(name = "INIT_BAIL_ACC", length = 35)
	public String getInitBailAcc() {
		return this.initBailAcc;
	}

	public void setInitBailAcc(String initBailAcc) {
		this.initBailAcc = initBailAcc;
	}

	@Column(name = "INIT_BAIL_BAL", precision = 18, scale = 3)
	public BigDecimal getInitBailBal() {
		return this.initBailBal;
	}

	public void setInitBailBal(BigDecimal initBailBal) {
		this.initBailBal = initBailBal;
	}

	@Column(name = "PMT_BAIL_ACC", length = 35)
	public String getPmtBailAcc() {
		return this.pmtBailAcc;
	}

	public void setPmtBailAcc(String pmtBailAcc) {
		this.pmtBailAcc = pmtBailAcc;
	}

	@Column(name = "TTL_PAY_NUM", precision = 10, scale = 0)
	public Long getTtlPayNum() {
		return this.ttlPayNum;
	}

	public void setTtlPayNum(Long ttlPayNum) {
		this.ttlPayNum = ttlPayNum;
	}

	@Column(name = "TTL_PAY_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlPayAmt() {
		return this.ttlPayAmt;
	}

	public void setTtlPayAmt(BigDecimal ttlPayAmt) {
		this.ttlPayAmt = ttlPayAmt;
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

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "PATNER_ID", length = 35)
	public String getPatnerId() {
		return this.patnerId;
	}

	public void setPatnerId(String patnerId) {
		this.patnerId = patnerId;
	}

	@Column(name = "PATNER_NM", length = 35)
	public String getPatnerNm() {
		return this.patnerNm;
	}

	public void setPatnerNm(String patnerNm) {
		this.patnerNm = patnerNm;
	}

	/** add by YeQing 2016-6-13 ------start */
	@Column(name = "TTL_LOW_PAY_NUM", precision = 10, scale = 0)
	public Long getTtlLowPayNum() {
		return ttlLowPayNum;
	}

	public void setTtlLowPayNum(Long ttlLowPayNum) {
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

	@Column(name = "TTL_REG_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlRegAmt() {
		return ttlRegAmt;
	}

	public void setTtlRegAmt(BigDecimal ttlRegAmt) {
		this.ttlRegAmt = ttlRegAmt;
	}

	/** add by YeQing 2016-6-13 ------end */
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

	@Column(name = "TTL_LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlLoanAmt() {
		return ttlLoanAmt;
	}

	public void setTtlLoanAmt(BigDecimal ttlLoanAmt) {
		this.ttlLoanAmt = ttlLoanAmt;
	}

	@Column(name = "TTL_LOAN_BAL", precision = 18, scale = 3)
	public BigDecimal getTtlLoanBal() {
		return ttlLoanBal;
	}

	public void setTtlLoanBal(BigDecimal ttlLoanBal) {
		this.ttlLoanBal = ttlLoanBal;
	}

	@Column(name = "PO_AMT", precision = 18, scale = 3)
	public BigDecimal getPoAmt() {
		return poAmt;
	}

	public void setPoAmt(BigDecimal poAmt) {
		this.poAmt = poAmt;
	}

	@Column(name = "TTL_OUT_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlOutAmt() {
		return ttlOutAmt;
	}

	public void setTtlOutAmt(BigDecimal ttlOutAmt) {
		this.ttlOutAmt = ttlOutAmt;
	}

	@Column(name = "TTL_OUT_SURE_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlOutSureAmt() {
		return ttlOutSureAmt;
	}

	public void setTtlOutSureAmt(BigDecimal ttlOutSureAmt) {
		this.ttlOutSureAmt = ttlOutSureAmt;
	}

	@Column(name = "LOAN_ID", length = 35)
	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	@Column(name = "PO_NO", length = 35)
	public String getPoNo() {
		return poNo;
	}

	public void setPoNo(String poNo) {
		this.poNo = poNo;
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