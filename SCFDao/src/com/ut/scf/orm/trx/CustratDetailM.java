package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * CustratDetailMId entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CUSTRAT_DETAIL_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)

public class CustratDetailM implements java.io.Serializable {

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
	private String custRatTp;
	private String ratBaseId;
	private String ratName;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public CustratDetailM() {
	}

	/** minimal constructor */
	public CustratDetailM(String sysRefNo, Timestamp sysOpTm,
			Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CustratDetailM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String custRatTp, String ratBaseId,
			String ratName,String sysOrgId) {
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
		this.custRatTp = custRatTp;
		this.ratBaseId = ratBaseId;
		this.ratName = ratName;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@Id
	@Column(name = "SYS_REF_NO", nullable = false, length = 35)
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

	@Column(name = "SYS_OP_TM", nullable = false)
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "CUST_RAT_TP", length = 35)
	public String getCustRatTp() {
		return this.custRatTp;
	}

	public void setCustRatTp(String custRatTp) {
		this.custRatTp = custRatTp;
	}

	@Column(name = "RAT_BASE_ID", length = 35)
	public String getRatBaseId() {
		return this.ratBaseId;
	}

	public void setRatBaseId(String ratBaseId) {
		this.ratBaseId = ratBaseId;
	}

	@Column(name = "RAT_NAME", length = 35)
	public String getRatName() {
		return this.ratName;
	}

	public void setRatName(String ratName) {
		this.ratName = ratName;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof CustratDetailM))
			return false;
		CustratDetailM castOther = (CustratDetailM) other;

		return ((this.getSysRefNo() == castOther.getSysRefNo()) || (this
				.getSysRefNo() != null && castOther.getSysRefNo() != null && this
				.getSysRefNo().equals(castOther.getSysRefNo())))
				&& ((this.getSysOpId() == castOther.getSysOpId()) || (this
						.getSysOpId() != null && castOther.getSysOpId() != null && this
						.getSysOpId().equals(castOther.getSysOpId())))
				&& ((this.getSysOpTm() == castOther.getSysOpTm()) || (this
						.getSysOpTm() != null && castOther.getSysOpTm() != null && this
						.getSysOpTm().equals(castOther.getSysOpTm())))
				&& ((this.getSysRelId() == castOther.getSysRelId()) || (this
						.getSysRelId() != null
						&& castOther.getSysRelId() != null && this
						.getSysRelId().equals(castOther.getSysRelId())))
				&& ((this.getSysRelTm() == castOther.getSysRelTm()) || (this
						.getSysRelTm() != null
						&& castOther.getSysRelTm() != null && this
						.getSysRelTm().equals(castOther.getSysRelTm())))
				&& ((this.getSysAuthId() == castOther.getSysAuthId()) || (this
						.getSysAuthId() != null
						&& castOther.getSysAuthId() != null && this
						.getSysAuthId().equals(castOther.getSysAuthId())))
				&& ((this.getSysAuthTm() == castOther.getSysAuthTm()) || (this
						.getSysAuthTm() != null
						&& castOther.getSysAuthTm() != null && this
						.getSysAuthTm().equals(castOther.getSysAuthTm())))
				&& ((this.getSysNextOp() == castOther.getSysNextOp()) || (this
						.getSysNextOp() != null
						&& castOther.getSysNextOp() != null && this
						.getSysNextOp().equals(castOther.getSysNextOp())))
				&& ((this.getSysLockFlag() == castOther.getSysLockFlag()) || (this
						.getSysLockFlag() != null
						&& castOther.getSysLockFlag() != null && this
						.getSysLockFlag().equals(castOther.getSysLockFlag())))
				&& ((this.getSysLockBy() == castOther.getSysLockBy()) || (this
						.getSysLockBy() != null
						&& castOther.getSysLockBy() != null && this
						.getSysLockBy().equals(castOther.getSysLockBy())))
				&& ((this.getSysFuncId() == castOther.getSysFuncId()) || (this
						.getSysFuncId() != null
						&& castOther.getSysFuncId() != null && this
						.getSysFuncId().equals(castOther.getSysFuncId())))
				&& ((this.getSysTrxSts() == castOther.getSysTrxSts()) || (this
						.getSysTrxSts() != null
						&& castOther.getSysTrxSts() != null && this
						.getSysTrxSts().equals(castOther.getSysTrxSts())))
				&& ((this.getSysEventTimes() == castOther.getSysEventTimes()) || (this
						.getSysEventTimes() != null
						&& castOther.getSysEventTimes() != null && this
						.getSysEventTimes()
						.equals(castOther.getSysEventTimes())))
				&& ((this.getCustRatTp() == castOther.getCustRatTp()) || (this
						.getCustRatTp() != null
						&& castOther.getCustRatTp() != null && this
						.getCustRatTp().equals(castOther.getCustRatTp())))
				&& ((this.getRatBaseId() == castOther.getRatBaseId()) || (this
						.getRatBaseId() != null
						&& castOther.getRatBaseId() != null && this
						.getRatBaseId().equals(castOther.getRatBaseId())))
				&& ((this.getRatName() == castOther.getRatName()) || (this
						.getRatName() != null && castOther.getRatName() != null && this
						.getRatName().equals(castOther.getRatName())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getSysRefNo() == null ? 0 : this.getSysRefNo().hashCode());
		result = 37 * result
				+ (getSysOpId() == null ? 0 : this.getSysOpId().hashCode());
		result = 37 * result
				+ (getSysOpTm() == null ? 0 : this.getSysOpTm().hashCode());
		result = 37 * result
				+ (getSysRelId() == null ? 0 : this.getSysRelId().hashCode());
		result = 37 * result
				+ (getSysRelTm() == null ? 0 : this.getSysRelTm().hashCode());
		result = 37 * result
				+ (getSysAuthId() == null ? 0 : this.getSysAuthId().hashCode());
		result = 37 * result
				+ (getSysAuthTm() == null ? 0 : this.getSysAuthTm().hashCode());
		result = 37 * result
				+ (getSysNextOp() == null ? 0 : this.getSysNextOp().hashCode());
		result = 37
				* result
				+ (getSysLockFlag() == null ? 0 : this.getSysLockFlag()
						.hashCode());
		result = 37 * result
				+ (getSysLockBy() == null ? 0 : this.getSysLockBy().hashCode());
		result = 37 * result
				+ (getSysFuncId() == null ? 0 : this.getSysFuncId().hashCode());
		result = 37 * result
				+ (getSysTrxSts() == null ? 0 : this.getSysTrxSts().hashCode());
		result = 37
				* result
				+ (getSysEventTimes() == null ? 0 : this.getSysEventTimes()
						.hashCode());
		result = 37 * result
				+ (getCustRatTp() == null ? 0 : this.getCustRatTp().hashCode());
		result = 37 * result
				+ (getRatBaseId() == null ? 0 : this.getRatBaseId().hashCode());
		result = 37 * result
				+ (getRatName() == null ? 0 : this.getRatName().hashCode());
		return result;
	}

}