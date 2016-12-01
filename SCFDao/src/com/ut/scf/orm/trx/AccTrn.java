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
 * AccTrn entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ACC_TRN"
,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class AccTrn implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 4810156569036002471L;
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
	private String accNo;
	private String relRefNo;
	private Integer relEvtNo;
	private String trxDesc;
	private String trxTp;
	private BigDecimal amt;
	private Timestamp cretTm;
	private Timestamp updtTm;
	private String reconStat;

	// Constructors

	/** default constructor */
	public AccTrn() {
	}

	/** minimal constructor */
	public AccTrn(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}

	/** full constructor */
	public AccTrn(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId,
			String sysTrxSts, Integer sysEventTimes, String accNo, String relRefNo, Integer relEvtNo, String trxDesc,
			String trxTp, BigDecimal amt, Timestamp cretTm, Timestamp updtTm, String reconStat) {
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
		this.accNo = accNo;
		this.relRefNo = relRefNo;
		this.relEvtNo = relEvtNo;
		this.trxDesc = trxDesc;
		this.trxTp = trxTp;
		this.amt = amt;
		this.cretTm = cretTm;
		this.updtTm = updtTm;
		this.reconStat = reconStat;
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

	@Column(name = "SYS_REL_TM", length=11)
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

	@Column(name = "SYS_AUTH_TM" , length=11)
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

	@Column(name = "SYS_EVENT_TIMES", precision = 4, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "ACC_NO", length = 35)
	public String getAccNo() {
		return this.accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	@Column(name = "REL_REF_NO", length = 35)
	public String getRelRefNo() {
		return this.relRefNo;
	}

	public void setRelRefNo(String relRefNo) {
		this.relRefNo = relRefNo;
	}

	@Column(name = "REL_EVT_NO", precision = 4, scale = 0)
	public Integer getRelEvtNo() {
		return this.relEvtNo;
	}

	public void setRelEvtNo(Integer relEvtNo) {
		this.relEvtNo = relEvtNo;
	}

	@Column(name = "TRX_DESC", length = 35)
	public String getTrxDesc() {
		return this.trxDesc;
	}

	public void setTrxDesc(String trxDesc) {
		this.trxDesc = trxDesc;
	}

	@Column(name = "TRX_TP", length = 1)
	public String getTrxTp() {
		return this.trxTp;
	}

	public void setTrxTp(String trxTp) {
		this.trxTp = trxTp;
	}

	@Column(name = "AMT", precision = 18, scale = 4)
	public BigDecimal getAmt() {
		return this.amt;
	}

	public void setAmt(BigDecimal amt) {
		this.amt = amt;
	}

	@Column(name = "CRET_TM", length=11)
	public Timestamp getCretTm() {
		return this.cretTm;
	}

	public void setCretTm(Timestamp cretTm) {
		this.cretTm = cretTm;
	}

	@Column(name = "UPDT_TM", length=11)
	public Timestamp getUpdtTm() {
		return this.updtTm;
	}

	public void setUpdtTm(Timestamp updtTm) {
		this.updtTm = updtTm;
	}

	@Column(name = "RECON_STAT", length = 1)
	public String getReconStat() {
		return this.reconStat;
	}

	public void setReconStat(String reconStat) {
		this.reconStat = reconStat;
	}

}