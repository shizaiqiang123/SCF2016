package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * UserPwd
 */
@Entity
@Table(name = "user_pwd"
,schema="STD"
)

@DynamicUpdate(true)
@DynamicInsert(true)

public class UserPwd implements java.io.Serializable {

	// Fields
	private String sysRefNo;
	private Integer sysEventTimes;
	private String sysBusiUnit;
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
	private String password;
	private String plaPwd;
	private String pwdTp;
	//添加
	private String userTp;
	
	// Constructors

	/** default constructor */
	public UserPwd() {
	}

	/** minimal constructor */
	public UserPwd(String sysRefNo, Integer sysEventTimes, String userId,
			String password, String plaPwd, String pwdTp) {
		super();
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
		this.userId = userId;
		this.password = password;
		this.plaPwd = plaPwd;
		this.pwdTp = pwdTp;
	}

	/** full constructor */
	public UserPwd(String sysRefNo, Integer sysEventTimes, String sysBusiUnit,
			String sysOpId, Timestamp sysOpTm, String sysRelId,
			Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm,
			String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, String userId, String password,
			String plaPwd, String pwdTp,String userTp) {
		super();
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
		this.sysBusiUnit = sysBusiUnit;
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
		this.password = password;
		this.plaPwd = plaPwd;
		this.pwdTp = pwdTp;
		this.userTp = userTp;
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
	
	@Column(name = "USER_TP", length = 1)
	public String getUserTp() {
		return userTp;
	}

	public void setUserTp(String userTp) {
		this.userTp = userTp;
	}

	@Column(name = "SYS_EVENT_TIMES", nullable = false)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "sys_busi_unit", length = 35)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
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

	@Column(name = "PASSWORD", length = 15)
	
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "PLA_PWD", length = 15)
	
	public String getPlaPwd() {
		return plaPwd;
	}

	
	public void setPlaPwd(String plaPwd) {
		this.plaPwd = plaPwd;
	}


	@Column(name = "PWD_TP", length = 1)
	
	public String getPwdTp() {
		return pwdTp;
	}

	public void setPwdTp(String pwdTp) {
		this.pwdTp = pwdTp;
	}

}