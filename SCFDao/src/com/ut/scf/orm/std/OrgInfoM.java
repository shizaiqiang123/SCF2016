package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * StdOrgInfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "ORG_INFO_M", schema = "STD")
@DynamicUpdate(true)
@DynamicInsert(true)
public class OrgInfoM implements java.io.Serializable {

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
	private String sysRelReason;
	private String sysBusiUnit;
	private String sysFuncName;
	// 用到的
	private String orgNm;
	private String orgTp;
	private String orgOwnerid;
	private String orgLevel;
	private String telPhone;
	private String remark;
	private String busiUnit;
	private String blgOrgid;
	private String orgId;
	private String bankOrgId;
	private String blgOrgNm;
	private String contactPerson;
	private String contactMobPhone;
	private String contactEmail;
	private String orgAddr;
	private String postcode;
	private String fax;
	// 暂时没用到
	private Timestamp setupDate;
	private String vchOrgid;
	private String busiLicense;
	private String bankLicense;
	private String chgUserid;
	private String chgUsername;
	private String zipCode;
	private String regionCode;
	private String zhno;
	private String zoneno;
	private String branchChnames;

	// Constructors

	/** default constructor */
	public OrgInfoM() {
	}

	/** minimal constructor */
	public OrgInfoM(String sysRefNo, Integer sysEventTimes, String orgId) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
		this.orgId = orgId;
	}

	/** full constructor */
	public OrgInfoM(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, String bankOrgId, Integer sysEventTimes, String sysRelReason,
			String sysBusiUnit, String orgNm, String orgTp, String orgOwnerid, String orgLevel, String blgOrgid,
			Timestamp setupDate, String vchOrgid, String busiLicense, String bankLicense, String orgAddr,
			String chgUserid, String chgUsername, String zipCode, String telPhone, String regionCode, String zhno,
			String zoneno, String branchChnames, String remark, String busiUnit, String orgId, String blgOrgNm,
			String sysFuncName, String contactPerson, String contactMobPhone,String postcode,String fax,String contactEmail) {
		this.contactPerson = contactPerson;
		this.contactMobPhone = contactMobPhone;
		this.contactEmail = contactEmail;
		this.sysRefNo = sysRefNo;
		this.sysOpId = sysOpId;
		this.sysOpTm = sysOpTm;
		this.sysRelId = sysRelId;
		this.postcode = postcode;
		this.sysRelTm = sysRelTm;
		this.sysAuthId = sysAuthId;
		this.sysAuthTm = sysAuthTm;
		this.sysNextOp = sysNextOp;
		this.sysLockFlag = sysLockFlag;
		this.sysLockBy = sysLockBy;
		this.sysFuncId = sysFuncId;
		this.sysTrxSts = sysTrxSts;
		this.sysEventTimes = sysEventTimes;
		this.sysRelReason = sysRelReason;
		this.sysBusiUnit = sysBusiUnit;
		this.orgNm = orgNm;
		this.orgTp = orgTp;
		this.orgOwnerid = orgOwnerid;
		this.orgLevel = orgLevel;
		this.blgOrgid = blgOrgid;
		this.setupDate = setupDate;
		this.vchOrgid = vchOrgid;
		this.busiLicense = busiLicense;
		this.bankLicense = bankLicense;
		this.orgAddr = orgAddr;
		this.chgUserid = chgUserid;
		this.chgUsername = chgUsername;
		this.zipCode = zipCode;
		this.telPhone = telPhone;
		this.regionCode = regionCode;
		this.zhno = zhno;
		this.zoneno = zoneno;
		this.branchChnames = branchChnames;
		this.remark = remark;
		this.busiUnit = busiUnit;
		this.fax = fax;
		this.orgId = orgId;
		this.blgOrgNm = blgOrgNm;
		this.bankOrgId = bankOrgId;
		this.sysFuncName = sysFuncName;
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

	@Column(name = "SYS_OP_TM", length = 19)
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

	@Column(name = "SYS_REL_TM", length = 19)
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

	@Column(name = "SYS_AUTH_TM", length = 19)
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

	@Column(name = "SYS_REL_REASON", length = 65535)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "busi_unit", length = 40)
	public String getBusiUnit() {
		return this.busiUnit;
	}

	public void setBusiUnit(String busiUnit) {
		this.busiUnit = busiUnit;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "ORG_NM", length = 200)
	public String getOrgNm() {
		return this.orgNm;
	}

	public void setOrgNm(String orgNm) {
		this.orgNm = orgNm;
	}

	@Column(name = "ORG_TP", length = 5)
	public String getOrgTp() {
		return this.orgTp;
	}

	public void setOrgTp(String orgTp) {
		this.orgTp = orgTp;
	}

	@Column(name = "ORG_OWNERID", length = 40)
	public String getOrgOwnerid() {
		return this.orgOwnerid;
	}

	public void setOrgOwnerid(String orgOwnerid) {
		this.orgOwnerid = orgOwnerid;
	}

	@Column(name = "ORG_LEVEL", length = 5)
	public String getOrgLevel() {
		return this.orgLevel;
	}

	public void setOrgLevel(String orgLevel) {
		this.orgLevel = orgLevel;
	}

	@Column(name = "BLG_ORGID", length = 40)
	public String getBlgOrgid() {
		return this.blgOrgid;
	}

	public void setBlgOrgid(String blgOrgid) {
		this.blgOrgid = blgOrgid;
	}

	@Column(name = "SETUP_DATE", length = 19)
	public Timestamp getSetupDate() {
		return this.setupDate;
	}

	public void setSetupDate(Timestamp setupDate) {
		this.setupDate = setupDate;
	}

	@Column(name = "VCH_ORGID", length = 40)
	public String getVchOrgid() {
		return this.vchOrgid;
	}

	public void setVchOrgid(String vchOrgid) {
		this.vchOrgid = vchOrgid;
	}

	@Column(name = "BUSI_LICENSE", length = 32)
	public String getBusiLicense() {
		return this.busiLicense;
	}

	public void setBusiLicense(String busiLicense) {
		this.busiLicense = busiLicense;
	}

	@Column(name = "BANK_LICENSE", length = 32)
	public String getBankLicense() {
		return this.bankLicense;
	}

	public void setBankLicense(String bankLicense) {
		this.bankLicense = bankLicense;
	}

	@Column(name = "ORG_ADDR", length = 200)
	public String getOrgAddr() {
		return this.orgAddr;
	}

	public void setOrgAddr(String orgAddr) {
		this.orgAddr = orgAddr;
	}

	@Column(name = "CHG_USERID", length = 40)
	public String getChgUserid() {
		return this.chgUserid;
	}

	public void setChgUserid(String chgUserid) {
		this.chgUserid = chgUserid;
	}

	@Column(name = "CHG_USERNAME", length = 40)
	public String getChgUsername() {
		return this.chgUsername;
	}

	public void setChgUsername(String chgUsername) {
		this.chgUsername = chgUsername;
	}

	@Column(name = "ZIP_CODE", length = 10)
	public String getZipCode() {
		return this.zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	@Column(name = "TEL_PHONE", length = 40)
	public String getTelPhone() {
		return this.telPhone;
	}

	public void setTelPhone(String telPhone) {
		this.telPhone = telPhone;
	}

	@Column(name = "REGION_CODE", length = 20)
	public String getRegionCode() {
		return this.regionCode;
	}

	public void setRegionCode(String regionCode) {
		this.regionCode = regionCode;
	}

	@Column(name = "ZHNO", length = 12)
	public String getZhno() {
		return this.zhno;
	}

	public void setZhno(String zhno) {
		this.zhno = zhno;
	}

	@Column(name = "ZONENO", length = 12)
	public String getZoneno() {
		return this.zoneno;
	}

	public void setZoneno(String zoneno) {
		this.zoneno = zoneno;
	}

	@Column(name = "BRANCH_CHNAMES", length = 50)
	public String getBranchChnames() {
		return this.branchChnames;
	}

	public void setBranchChnames(String branchChnames) {
		this.branchChnames = branchChnames;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "ORG_ID", length = 35)
	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	@Column(name = "BLG_ORG_NM", length = 200)
	public String getBlgOrgNm() {
		return blgOrgNm;
	}

	public void setBlgOrgNm(String blgOrgNm) {
		this.blgOrgNm = blgOrgNm;
	}

	@Column(name = "contact_Person", length = 50)
	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	@Column(name = "contact_Mob_Phone", length = 20)
	public String getContactMobPhone() {
		return contactMobPhone;
	}

	public void setContactMobPhone(String contactMobPhone) {
		this.contactMobPhone = contactMobPhone;
	}

	@Column(name = "contact_Email", length = 50)
	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	@Column(name = "bank_Org_Id", length = 35)
	public String getBankOrgId() {
		return bankOrgId;
	}

	public void setBankOrgId(String bankOrgId) {
		this.bankOrgId = bankOrgId;
	}
	@Column(name = "POSTCODE", length = 35)
	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}
	@Column(name = "FAX", length = 35)
	public String getFax() {
		return fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}
	
	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

}