package com.ut.scf.orm.std;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * RefNoM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ref_no_m"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class RefNoM implements java.io.Serializable {

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
	private String refName;
	private String refPrefix;
	private String refType;
	private String module;
	private String resetFrequency;
	private String initNumber;
	private Integer refLength;
	private Integer refInterval;

	// Constructors

	/** default constructor */
	public RefNoM() {
	}

	/** minimal constructor */
	public RefNoM(String sysRefNo, Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm, Integer sysEventTimes,
			String refName) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
		this.refName = refName;
	}

	/** full constructor */
	public RefNoM(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, Integer sysEventTimes, String refName, String refPrefix,
			String refType, String module, String resetFrequency, String initNumber, Integer refLength, Integer refInterval) {
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
		this.refName = refName;
		this.refPrefix = refPrefix;
		this.refType = refType;
		this.module = module;
		this.resetFrequency = resetFrequency;
		this.initNumber = initNumber;
		this.refLength = refLength;
		this.refInterval = refInterval;
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

	@Column(name = "SYS_OP_TM", nullable = false, length = 19)
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

	@Column(name = "SYS_REL_TM", nullable = true, length = 19)
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

	@Column(name = "SYS_AUTH_TM", nullable = true, length = 19)
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "REF_NAME", nullable = false, length = 35)
	public String getRefName() {
		return this.refName;
	}

	public void setRefName(String refName) {
		this.refName = refName;
	}

	@Column(name = "REF_PREFIX", length = 35)
	public String getRefPrefix() {
		return this.refPrefix;
	}

	public void setRefPrefix(String refPrefix) {
		this.refPrefix = refPrefix;
	}

	@Column(name = "REF_TYPE", length = 1)
	public String getRefType() {
		return this.refType;
	}

	public void setRefType(String refType) {
		this.refType = refType;
	}

	@Column(name = "MODULE", length = 35)
	public String getModule() {
		return this.module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	@Column(name = "RESET_FREQUENCY", length = 35)
	public String getResetFrequency() {
		return this.resetFrequency;
	}

	public void setResetFrequency(String resetFrequency) {
		this.resetFrequency = resetFrequency;
	}

	@Column(name = "INIT_NUMBER", length = 35)
	public String getInitNumber() {
		return this.initNumber;
	}

	public void setInitNumber(String initNumber) {
		this.initNumber = initNumber;
	}

	@Column(name = "REF_LENGTH", precision = 2, scale = 0)
	public Integer getRefLength() {
		return this.refLength;
	}

	public void setRefLength(Integer refLength) {
		this.refLength = refLength;
	}

	@Column(name = "REF_INTERVAL", precision = 2, scale = 0)
	public Integer getRefInterval() {
		return this.refInterval;
	}

	public void setRefInterval(Integer refInterval) {
		this.refInterval = refInterval;
	}

}