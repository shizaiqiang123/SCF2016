package com.ut.scf.orm.trx;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

/**
 * goodsInout entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "GOODS_INOUT", schema = "TRX")
@DynamicUpdate(true)
public class GoodsInout implements java.io.Serializable {

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
	private String loanId;
	private Double inoutAmt;
	private Timestamp inoutDate;
	private String busiTp;
	private Timestamp pmtDt;
	private Double pmtAmt;
	private String cntrctNo;
	private String poNo;
	private Double ttlPayAmt;
	private Double ttlInVal;
	private Double ttlOutVal;
	private String poId;
	private Timestamp trxDt;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public GoodsInout() {
	}

	/** minimal constructor */
	public GoodsInout(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public GoodsInout(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String loanId, Double inoutAmt,
			Timestamp inoutDate, String busiTp, Timestamp pmtDt, Double pmtAmt,
			String cntrctNo, String poNo, Double ttlPayAmt, Double ttlInVal,
			Double ttlOutVal, String poId, Timestamp trxDt,String sysOrgId) {
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
		this.loanId = loanId;
		this.inoutAmt = inoutAmt;
		this.inoutDate = inoutDate;
		this.busiTp = busiTp;
		this.pmtDt = pmtDt;
		this.pmtAmt = pmtAmt;
		this.cntrctNo = cntrctNo;
		this.poNo = poNo;
		this.ttlPayAmt = ttlPayAmt;
		this.ttlInVal = ttlInVal;
		this.ttlOutVal = ttlOutVal;
		this.poId = poId;
		this.trxDt = trxDt;
		this.sysOrgId = sysOrgId;
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

	@Column(name = "LOAN_ID", length = 35)
	public String getLoanId() {
		return this.loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	@Column(name = "INOUT_AMT", precision = 18, scale = 4)
	public Double getInoutAmt() {
		return this.inoutAmt;
	}

	public void setInoutAmt(Double inoutAmt) {
		this.inoutAmt = inoutAmt;
	}

	@Column(name = "INOUT_DATE", length = 11)
	public Timestamp getInoutDate() {
		return this.inoutDate;
	}

	public void setInoutDate(Timestamp inoutDate) {
		this.inoutDate = inoutDate;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "PMT_DT", length = 11)
	public Timestamp getPmtDt() {
		return this.pmtDt;
	}

	public void setPmtDt(Timestamp pmtDt) {
		this.pmtDt = pmtDt;
	}

	@Column(name = "PMT_AMT", precision = 18, scale = 4)
	public Double getPmtAmt() {
		return this.pmtAmt;
	}

	public void setPmtAmt(Double pmtAmt) {
		this.pmtAmt = pmtAmt;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "PO_NO", length = 35)
	public String getPoNo() {
		return this.poNo;
	}

	public void setPoNo(String poNo) {
		this.poNo = poNo;
	}

	@Column(name = "TTL_PAY_AMT", precision = 18, scale = 4)
	public Double getTtlPayAmt() {
		return this.ttlPayAmt;
	}

	public void setTtlPayAmt(Double ttlPayAmt) {
		this.ttlPayAmt = ttlPayAmt;
	}

	@Column(name = "TTL_IN_VAL", precision = 18, scale = 4)
	public Double getTtlInVal() {
		return this.ttlInVal;
	}

	public void setTtlInVal(Double ttlInVal) {
		this.ttlInVal = ttlInVal;
	}

	@Column(name = "TTL_OUT_VAL", precision = 18, scale = 4)
	public Double getTtlOutVal() {
		return this.ttlOutVal;
	}

	public void setTtlOutVal(Double ttlOutVal) {
		this.ttlOutVal = ttlOutVal;
	}

	@Column(name = "PO_ID", length = 35)
	public String getPoId() {
		return poId;
	}

	public void setPoId(String poId) {
		this.poId = poId;
	}

	@Column(name = "TRX_DT", length = 11)
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}