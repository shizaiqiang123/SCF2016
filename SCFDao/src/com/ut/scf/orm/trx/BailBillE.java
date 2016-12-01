package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * BailPayE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "BAIL_BILL_E", schema = "TRX")
public class BailBillE implements java.io.Serializable {

	// Fields

	private BailBillEId id;
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
	private String loanId;
	private String cntrctNo;
	private String billNo;
	private String billCcy;
	private BigDecimal billAmt;
	private Timestamp billValDt;
	private Timestamp billDueDt;
	
	
	// --------新增字段 add by YeQing 2016-6-1 *  start---------
	private String refNo;
	private String marginBal;
	private String marginCompen;
	// --------新增字段 add by YeQing 2016-6-1 *  end-----------
	
	private String sysOrgId;//新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public BailBillE() {
	}

	/** minimal constructor */
	public BailBillE(BailBillEId id) {
		this.id = id;
	}

	/** full constructor */
	public BailBillE(BailBillEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String loanId, String cntrctNo, String billNo, String billCcy,
			BigDecimal billAmt, Timestamp billValDt, Timestamp billDueDt,
			String refNo,String marginBal,String marginCompen,String sysOrgId) {
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
		this.loanId = loanId;
		this.cntrctNo = cntrctNo;
		this.billNo = billNo;
		this.billCcy = billCcy;
		this.billAmt = billAmt;
		this.billValDt = billValDt;
		this.billDueDt = billDueDt;
		this.refNo = refNo;
		this.marginBal = marginBal;
		this.marginCompen = marginCompen;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)) })
	public BailBillEId getId() {
		return this.id;
	}

	public void setId(BailBillEId id) {
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

	@Column(name = "LOAN_ID", length = 35)
	public String getLoanId() {
		return this.loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "BILL_NO", length = 35)
	public String getBillNo() {
		return billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	@Column(name = "BILL_CCY", length = 3)
	public String getBillCcy() {
		return billCcy;
	}

	public void setBillCcy(String billCcy) {
		this.billCcy = billCcy;
	}

	@Column(name = "BILL_AMT", precision = 18, scale = 3)
	public BigDecimal getBillAmt() {
		return billAmt;
	}

	public void setBillAmt(BigDecimal billAmt) {
		this.billAmt = billAmt;
	}

	@Column(name = "BILL_VAL_DT")
	public Timestamp getBillValDt() {
		return billValDt;
	}

	public void setBillValDt(Timestamp billValDt) {
		this.billValDt = billValDt;
	}

	@Column(name = "BILL_DUE_DT")
	public Timestamp getBillDueDt() {
		return billDueDt;
	}

	public void setBillDueDt(Timestamp billDueDt) {
		this.billDueDt = billDueDt;
	}
	
	@Column(name = "REF_NO", length = 35)
	public String getRefNo() {
		return refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	
	@Column(name = "MARGIN_BAL", precision = 18, scale = 3)
	public String getMarginBal() {
		return marginBal;
	}

	public void setMarginBal(String marginBal) {
		this.marginBal = marginBal;
	}
	@Column(name = "MARGIN_COMPEN", precision = 18, scale = 3)
	public String getMarginCompen() {
		return marginCompen;
	}

	public void setMarginCompen(String marginCompen) {
		this.marginCompen = marginCompen;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
	
}