package com.ut.scf.orm.std;

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
 * UserInfoE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "user_info_e", schema = "STD")
@DynamicUpdate(true)
@DynamicInsert(true)
public class UserInfoE implements java.io.Serializable {

	// Fields

	private UserInfoEId id;
	private String sysBusiUnit;
	private String email;
	private String extTel;
	private String mobPhone;
	private String telPhone;
	private String title;
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
	private String userId;
	private String userNm;
	private String password;
	private String userTp;
	private Timestamp pwdEditDt;
	private Timestamp pwdDueDt;
	private String ownerDep;
	private String ownerBrId;
	private String isMgr;
	private String note;
	private String userLevel;
	private String roleId;
	private String sysRelReason;
	private String userOwnerid;
	private String busiUnit;
	private String notifyTp;
	/*
	 * 0可登陆 1不可登陆
	 */
	private String userStatus;
	private Integer loginEventTimes;
	private String sysFuncName;
	private String imgUrl;
	private String custId;// 客户或者合作方ID
	private String userGrade;// 客户或者合作方等级
	private String sysOrgId;//机构号

	// Constructors

	/** default constructor */
	public UserInfoE() {
	}

	/** minimal constructor */
	public UserInfoE(UserInfoEId id, String userId) {
		this.id = id;
		this.userId = userId;
	}

	/** full constructor */
	public UserInfoE(UserInfoEId id, String sysBusiUnit, String email,
			String extTel, String mobPhone, String telPhone, String title,
			String sysOpId, Timestamp sysOpTm, String sysRelId,
			Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm,
			String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, String userId, String userNm,
			String password, String userTp, Timestamp pwdEditDt,
			Timestamp pwdDueDt, String ownerDep, String ownerBrId,
			String isMgr, String note, String userLevel, String roleId,
			String sysRelReason, String userOwnerid, String busiUnit,
			String notifyTp, String userStatus, Integer loginEventTimes,
			String sysFuncName, String imgUrl, String custId, String userGrade,String sysOrgId) {
		super();
		this.id = id;
		this.sysBusiUnit = sysBusiUnit;
		this.email = email;
		this.extTel = extTel;
		this.mobPhone = mobPhone;
		this.telPhone = telPhone;
		this.title = title;
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
		this.userId = userId;
		this.userNm = userNm;
		this.password = password;
		this.userTp = userTp;
		this.pwdEditDt = pwdEditDt;
		this.pwdDueDt = pwdDueDt;
		this.ownerDep = ownerDep;
		this.ownerBrId = ownerBrId;
		this.isMgr = isMgr;
		this.note = note;
		this.userLevel = userLevel;
		this.roleId = roleId;
		this.sysRelReason = sysRelReason;
		this.userOwnerid = userOwnerid;
		this.busiUnit = busiUnit;
		this.notifyTp = notifyTp;
		this.userStatus = userStatus;
		this.loginEventTimes = loginEventTimes;
		this.sysFuncName = sysFuncName;
		this.imgUrl = imgUrl;
		this.custId = custId;
		this.userGrade = userGrade;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false)) })
	public UserInfoEId getId() {
		return this.id;
	}

	public void setId(UserInfoEId id) {
		this.id = id;
	}

	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

	@Column(name = "sys_busi_unit", length = 35)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "email", length = 40)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "ext_tel", length = 40)
	public String getExtTel() {
		return this.extTel;
	}

	public void setExtTel(String extTel) {
		this.extTel = extTel;
	}

	@Column(name = "mob_phone", length = 40)
	public String getMobPhone() {
		return this.mobPhone;
	}

	public void setMobPhone(String mobPhone) {
		this.mobPhone = mobPhone;
	}

	@Column(name = "tel_phone", length = 40)
	public String getTelPhone() {
		return this.telPhone;
	}

	public void setTelPhone(String telPhone) {
		this.telPhone = telPhone;
	}

	@Column(name = "title", length = 35)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	@Column(name = "USER_ID", nullable = false, length = 35)
	public String getUserId() {
		return this.userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Column(name = "USER_NM", length = 35)
	public String getUserNm() {
		return this.userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	@Column(name = "PASSWORD", length = 15)
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "USER_TP", length = 1)
	public String getUserTp() {
		return this.userTp;
	}

	public void setUserTp(String userTp) {
		this.userTp = userTp;
	}

	@Column(name = "PWD_EDIT_DT", length = 19)
	public Timestamp getPwdEditDt() {
		return this.pwdEditDt;
	}

	public void setPwdEditDt(Timestamp pwdEditDt) {
		this.pwdEditDt = pwdEditDt;
	}

	@Column(name = "PWD_DUE_DT", length = 19)
	public Timestamp getPwdDueDt() {
		return this.pwdDueDt;
	}

	public void setPwdDueDt(Timestamp pwdDueDt) {
		this.pwdDueDt = pwdDueDt;
	}

	@Column(name = "OWNER_DEP", length = 35)
	public String getOwnerDep() {
		return this.ownerDep;
	}

	public void setOwnerDep(String ownerDep) {
		this.ownerDep = ownerDep;
	}

	@Column(name = "OWNER_BR_ID", length = 35)
	public String getOwnerBrId() {
		return this.ownerBrId;
	}

	public void setOwnerBrId(String ownerBrId) {
		this.ownerBrId = ownerBrId;
	}

	@Column(name = "IS_MGR", length = 1)
	public String getIsMgr() {
		return this.isMgr;
	}

	public void setIsMgr(String isMgr) {
		this.isMgr = isMgr;
	}

	@Column(name = "NOTE", length = 70)
	public String getNote() {
		return this.note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Column(name = "USER_LEVEL", length = 3)
	public String getUserLevel() {
		return this.userLevel;
	}

	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}

	@Column(name = "ROLE_ID", length = 32)
	public String getRoleId() {
		return this.roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	@Column(name = "SYS_REL_REASON", length = 65535)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "USER_OWNERID", length = 50)
	public String getUserOwnerid() {
		return this.userOwnerid;
	}

	public void setUserOwnerid(String userOwnerid) {
		this.userOwnerid = userOwnerid;
	}

	@Column(name = "BUSI_UNIT", length = 40)
	public String getBusiUnit() {
		return busiUnit;
	}

	public void setBusiUnit(String busiUnit) {
		this.busiUnit = busiUnit;
	}

	@Column(name = "NOTIFY_TP", length = 10)
	public String getNotifyTp() {
		return notifyTp;
	}

	public void setNotifyTp(String notifyTp) {
		this.notifyTp = notifyTp;
	}

	@Column(name = "USER_STATUS", length = 10)
	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	@Column(name = "LOGIN_EVENT_TIMES")
	public Integer getLoginEventTimes() {
		return loginEventTimes;
	}

	public void setLoginEventTimes(Integer loginEventTimes) {
		this.loginEventTimes = loginEventTimes;
	}

	@Column(name = "IMG_URL")
	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	@Column(name = "CUST_ID", length = 35)
	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	@Column(name = "USER_GRADE", length = 3)
	public String getUserGrade() {
		return userGrade;
	}

	public void setUserGrade(String userGrade) {
		this.userGrade = userGrade;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}