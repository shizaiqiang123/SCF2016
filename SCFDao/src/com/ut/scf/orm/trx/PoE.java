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

import oracle.sql.CLOB;

/**
 * PoE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PO_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class PoE implements java.io.Serializable {

	// Fields

	private PoEId id;
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
	private String poCcy;
	private BigDecimal poAmt;
	private Timestamp poDueDt;
	private String poNo;
	private Timestamp trxDt;
	private BigDecimal poLoanBal;
	private String trxSts;
	private String sysRelReason;
	private String sysFuncName;
	private String busiTp;
	private Integer poNum;
	private String patnerId;
	private String patnerNm;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7
	private String isLoan;// 是否融过资
	private String isConfirm;// 是否确认
	private String confirmFlag;// 0：外网合同确认；1：银行合同确认
	private String confirmOp;// 意见

	// Constructors

	/** default constructor */
	public PoE() {
	}

	/** minimal constructor */
	public PoE(PoEId id, Timestamp sysOpTm) {
		this.id = id;
		this.sysOpTm = sysOpTm;
	}

	/** full constructor */
	public PoE(PoEId id, String sysOpId, Timestamp sysOpTm, String sysRelId,
			Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm,
			String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, String cntrctNo,
			String buyerId, String selId, String buyerNm, String selNm,
			String poCcy, BigDecimal poAmt, Timestamp poDueDt, String poNo,
			Timestamp trxDt, BigDecimal poLoanBal, String trxSts,
			String sysRelReason, String sysFuncName, String busiTp,
			Integer poNum, String patnerId, String patnerNm, String sysOrgId,
			String isLoan, String isConfirm, String confirmFlag,
			String confirmOp) {
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
		this.poCcy = poCcy;
		this.poAmt = poAmt;
		this.poDueDt = poDueDt;
		this.poNo = poNo;
		this.trxDt = trxDt;
		this.poLoanBal = poLoanBal;
		this.trxSts = trxSts;
		this.sysRelReason = sysRelReason;
		this.sysFuncName = sysFuncName;
		this.busiTp = busiTp;
		this.poNum = poNum;
		this.patnerId = patnerId;
		this.patnerNm = patnerNm;
		this.sysOrgId = sysOrgId;
		this.isLoan = isLoan;
		this.isConfirm = isConfirm;
		this.confirmFlag = confirmFlag;
		this.confirmOp = confirmOp;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)) })
	public PoEId getId() {
		return this.id;
	}

	public void setId(PoEId id) {
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

	@Column(name = "BUYER_NM", length = 70)
	public String getBuyerNm() {
		return this.buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "SEL_NM", length = 70)
	public String getSelNm() {
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "PO_CCY", length = 3)
	public String getPoCcy() {
		return this.poCcy;
	}

	public void setPoCcy(String poCcy) {
		this.poCcy = poCcy;
	}

	@Column(name = "PO_AMT", precision = 18, scale = 4)
	public BigDecimal getPoAmt() {
		return this.poAmt;
	}

	public void setPoAmt(BigDecimal poAmt) {
		this.poAmt = poAmt;
	}

	@Column(name = "PO_DUE_DT")
	public Timestamp getPoDueDt() {
		return this.poDueDt;
	}

	public void setPoDueDt(Timestamp poDueDt) {
		this.poDueDt = poDueDt;
	}

	@Column(name = "PO_NO", length = 35)
	public String getPoNo() {
		return this.poNo;
	}

	public void setPoNo(String poNo) {
		this.poNo = poNo;
	}

	@Column(name = "TRX_DT")
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "PO_LOAN_BAL", precision = 18, scale = 4)
	public BigDecimal getPoLoanBal() {
		return this.poLoanBal;
	}

	public void setPoLoanBal(BigDecimal poLoanBal) {
		this.poLoanBal = poLoanBal;
	}

	@Column(name = "TRX_STS", length = 1)
	public String getTrxSts() {
		return this.trxSts;
	}

	public void setTrxSts(String trxSts) {
		this.trxSts = trxSts;
	}

	@Column(name = "SYS_REL_REASON")
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "SYS_FUNC_NAME", length = 35)
	public String getSysFuncName() {
		return this.sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

	@Column(name = "BUSI_TP", length = 2)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "PO_NUM", nullable = false, precision = 10, scale = 0)
	public Integer getPoNum() {
		return this.poNum;
	}

	public void setPoNum(Integer poNum) {
		this.poNum = poNum;
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

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

	@Column(name = "IS_LOAN", length = 2)
	public String getIsLoan() {
		return isLoan;
	}

	public void setIsLoan(String isLoan) {
		this.isLoan = isLoan;
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