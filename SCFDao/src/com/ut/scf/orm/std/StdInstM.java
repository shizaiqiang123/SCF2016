package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * StdInstM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "std_inst_m"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class StdInstM implements java.io.Serializable {

	// Fields

	private String sysRefNo;
	private String parentBr;
	private String brNm;
	private String brEnNm;
	private String brAddr;
	private String brMgr;
	private String brPostCd;
	private String brFaxNo;
	private String brEmail;
	private String brOwnerCtry;
	private String brTp;
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
	private String brTelNo;
	private String sysBusiUnit;

	// Constructors

	/** default constructor */
	public StdInstM() {
	}

	/** minimal constructor */
	public StdInstM(String sysRefNo, Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public StdInstM(String sysRefNo, String parentBr, String brNm, String brEnNm, String brAddr, String brMgr,
			String brPostCd, String brFaxNo, String brEmail, String brOwnerCtry, String brTp, String sysOpId,
			Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm,
			String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String brTelNo,String sysBusiUnit) {
		this.sysRefNo = sysRefNo;
		this.parentBr = parentBr;
		this.brNm = brNm;
		this.brEnNm = brEnNm;
		this.brAddr = brAddr;
		this.brMgr = brMgr;
		this.brPostCd = brPostCd;
		this.brFaxNo = brFaxNo;
		this.brEmail = brEmail;
		this.brOwnerCtry = brOwnerCtry;
		this.brTp = brTp;
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
		this.brTelNo = brTelNo;
		this.sysBusiUnit=sysBusiUnit;
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

	@Column(name = "PARENT_BR", length = 40)
	public String getParentBr() {
		return this.parentBr;
	}

	public void setParentBr(String parentBr) {
		this.parentBr = parentBr;
	}

	@Column(name = "BR_NM", length = 200)
	public String getBrNm() {
		return this.brNm;
	}

	public void setBrNm(String brNm) {
		this.brNm = brNm;
	}

	@Column(name = "BR_EN_NM", length = 200)
	public String getBrEnNm() {
		return this.brEnNm;
	}

	public void setBrEnNm(String brEnNm) {
		this.brEnNm = brEnNm;
	}

	@Column(name = "BR_ADDR", length = 200)
	public String getBrAddr() {
		return this.brAddr;
	}

	public void setBrAddr(String brAddr) {
		this.brAddr = brAddr;
	}

	@Column(name = "BR_MGR", length = 20)
	public String getBrMgr() {
		return this.brMgr;
	}

	public void setBrMgr(String brMgr) {
		this.brMgr = brMgr;
	}

	@Column(name = "BR_POST_CD", length = 10)
	public String getBrPostCd() {
		return this.brPostCd;
	}

	public void setBrPostCd(String brPostCd) {
		this.brPostCd = brPostCd;
	}

	@Column(name = "BR_FAX_NO", length = 40)
	public String getBrFaxNo() {
		return this.brFaxNo;
	}

	public void setBrFaxNo(String brFaxNo) {
		this.brFaxNo = brFaxNo;
	}

	@Column(name = "BR_EMAIL", length = 40)
	public String getBrEmail() {
		return this.brEmail;
	}

	public void setBrEmail(String brEmail) {
		this.brEmail = brEmail;
	}

	@Column(name = "BR_OWNER_CTRY", length = 100)
	public String getBrOwnerCtry() {
		return this.brOwnerCtry;
	}

	public void setBrOwnerCtry(String brOwnerCtry) {
		this.brOwnerCtry = brOwnerCtry;
	}

	@Column(name = "BR_TP", length = 40)
	public String getBrTp() {
		return this.brTp;
	}

	public void setBrTp(String brTp) {
		this.brTp = brTp;
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

	@Column(name = "BR_TEL_NO", length = 15)
	public String getBrTelNo() {
		return this.brTelNo;
	}

	public void setBrTelNo(String brTelNo) {
		this.brTelNo = brTelNo;
	}
	
	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

}