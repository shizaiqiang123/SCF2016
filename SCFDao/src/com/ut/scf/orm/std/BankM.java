package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * BankM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "bank_m"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class BankM implements java.io.Serializable {

	// Fields

	private String sysRefNo;
	private String bkEnNm;
	private String bkOwnerCtry;
	private String bkSwiftCd;
	private String bkAddr;
	private String bkTel;
	private String bkFax;
	private String bkEmail;
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
	private String bkNm;

	// Constructors

	/** default constructor */
	public BankM() {
	}

	/** minimal constructor */
	public BankM(String sysRefNo, String bkOwnerCtry, String bkAddr, Timestamp sysOpTm, Timestamp sysRelTm,
			Timestamp sysAuthTm, Integer sysEventTimes, String bkNm) {
		this.sysRefNo = sysRefNo;
		this.bkOwnerCtry = bkOwnerCtry;
		this.bkAddr = bkAddr;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
		this.bkNm = bkNm;
	}

	/** full constructor */
	public BankM(String sysRefNo, String bkEnNm, String bkOwnerCtry, String bkSwiftCd, String bkAddr, String bkTel,
			String bkFax, String bkEmail, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, Integer sysEventTimes, String bkNm) {
		this.sysRefNo = sysRefNo;
		this.bkEnNm = bkEnNm;
		this.bkOwnerCtry = bkOwnerCtry;
		this.bkSwiftCd = bkSwiftCd;
		this.bkAddr = bkAddr;
		this.bkTel = bkTel;
		this.bkFax = bkFax;
		this.bkEmail = bkEmail;
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
		this.bkNm = bkNm;
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

	@Column(name = "BK_EN_NM", length = 70)
	public String getBkEnNm() {
		return this.bkEnNm;
	}

	public void setBkEnNm(String bkEnNm) {
		this.bkEnNm = bkEnNm;
	}

	@Column(name = "BK_OWNER_CTRY", nullable = false, length = 3)
	public String getBkOwnerCtry() {
		return this.bkOwnerCtry;
	}

	public void setBkOwnerCtry(String bkOwnerCtry) {
		this.bkOwnerCtry = bkOwnerCtry;
	}

	@Column(name = "BK_SWIFT_CD", length = 20)
	public String getBkSwiftCd() {
		return this.bkSwiftCd;
	}

	public void setBkSwiftCd(String bkSwiftCd) {
		this.bkSwiftCd = bkSwiftCd;
	}

	@Column(name = "BK_ADDR", nullable = false, length = 140)
	public String getBkAddr() {
		return this.bkAddr;
	}

	public void setBkAddr(String bkAddr) {
		this.bkAddr = bkAddr;
	}

	@Column(name = "BK_TEL", length = 15)
	public String getBkTel() {
		return this.bkTel;
	}

	public void setBkTel(String bkTel) {
		this.bkTel = bkTel;
	}

	@Column(name = "BK_FAX", length = 35)
	public String getBkFax() {
		return this.bkFax;
	}

	public void setBkFax(String bkFax) {
		this.bkFax = bkFax;
	}

	@Column(name = "BK_EMAIL", length = 35)
	public String getBkEmail() {
		return this.bkEmail;
	}

	public void setBkEmail(String bkEmail) {
		this.bkEmail = bkEmail;
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

	@Column(name = "BK_NM", nullable = false, length = 70)
	public String getBkNm() {
		return this.bkNm;
	}

	public void setBkNm(String bkNm) {
		this.bkNm = bkNm;
	}

}