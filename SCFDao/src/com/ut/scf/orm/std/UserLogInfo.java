package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * UserHistoryInfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="user_log_info"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class UserLogInfo  implements java.io.Serializable {


    // Fields    

     private String sysRefNo;
     private String userId;
     private String userName;
     private String userIp;
     private Timestamp userLoginTime;
     private Timestamp userLogoutTime;
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
     private String sysRelReason;
     private String sysBusiUnit;
     private Integer sysEventTimes;
     private String  logType;
     private String userTp;
     private String userCity;


    // Constructors

    /** default constructor */
    public UserLogInfo() {
    }

	/** minimal constructor */
    public UserLogInfo(String sysRefNo, Integer sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }
    
    /** full constructor */
    public UserLogInfo(String sysRefNo, String userId, String userName, String userIp, Timestamp userLoginTime, Timestamp userLogoutTime, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, String sysRelReason, String sysBusiUnit, Integer sysEventTimes,String userCity) {
        this.sysRefNo = sysRefNo;
        this.userId = userId;
        this.userName = userName;
        this.userIp = userIp;
        this.userLoginTime = userLoginTime;
        this.userLogoutTime = userLogoutTime;
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
        this.sysRelReason = sysRelReason;
        this.sysBusiUnit = sysBusiUnit;
        this.sysEventTimes = sysEventTimes;
        this.userCity=userCity;
    }

   
    // Property accessors
    @Id 
    
    @Column(name="SYS_REF_NO", unique=true, nullable=false, length=100)

    public String getSysRefNo() {
        return this.sysRefNo;
    }
    
    public void setSysRefNo(String sysRefNo) {
        this.sysRefNo = sysRefNo;
    }
    
    @Column(name="USER_ID", length=35)

    public String getUserId() {
        return this.userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    @Column(name="USER_NAME", length=50)

    public String getUserName() {
        return this.userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    @Column(name="USER_IP", length=15)

    public String getUserIp() {
        return this.userIp;
    }
    
    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }
    
    @Column(name="USER_LOGIN_TIME", length=19)

    public Timestamp getUserLoginTime() {
        return this.userLoginTime;
    }
    
    public void setUserLoginTime(Timestamp userLoginTime) {
        this.userLoginTime = userLoginTime;
    }
    
    @Column(name="USER_LOGOUT_TIME", length=19)

    public Timestamp getUserLogoutTime() {
        return this.userLogoutTime;
    }
    
    public void setUserLogoutTime(Timestamp userLogoutTime) {
        this.userLogoutTime = userLogoutTime;
    }
    
    @Column(name="SYS_OP_ID", length=35)

    public String getSysOpId() {
        return this.sysOpId;
    }
    
    public void setSysOpId(String sysOpId) {
        this.sysOpId = sysOpId;
    }
    
    @Column(name="SYS_OP_TM", length=19)

    public Timestamp getSysOpTm() {
        return this.sysOpTm;
    }
    
    public void setSysOpTm(Timestamp sysOpTm) {
        this.sysOpTm = sysOpTm;
    }
    
    @Column(name="SYS_REL_ID", length=35)

    public String getSysRelId() {
        return this.sysRelId;
    }
    
    public void setSysRelId(String sysRelId) {
        this.sysRelId = sysRelId;
    }
    
    @Column(name="SYS_REL_TM", length=19)

    public Timestamp getSysRelTm() {
        return this.sysRelTm;
    }
    
    public void setSysRelTm(Timestamp sysRelTm) {
        this.sysRelTm = sysRelTm;
    }
    
    @Column(name="SYS_AUTH_ID", length=35)

    public String getSysAuthId() {
        return this.sysAuthId;
    }
    
    public void setSysAuthId(String sysAuthId) {
        this.sysAuthId = sysAuthId;
    }
    
    @Column(name="SYS_AUTH_TM", length=19)

    public Timestamp getSysAuthTm() {
        return this.sysAuthTm;
    }
    
    public void setSysAuthTm(Timestamp sysAuthTm) {
        this.sysAuthTm = sysAuthTm;
    }
    
    @Column(name="SYS_NEXT_OP", length=35)

    public String getSysNextOp() {
        return this.sysNextOp;
    }
    
    public void setSysNextOp(String sysNextOp) {
        this.sysNextOp = sysNextOp;
    }
    
    @Column(name="SYS_LOCK_FLAG", length=1)

    public String getSysLockFlag() {
        return this.sysLockFlag;
    }
    
    public void setSysLockFlag(String sysLockFlag) {
        this.sysLockFlag = sysLockFlag;
    }
    
    @Column(name="SYS_LOCK_BY", length=35)

    public String getSysLockBy() {
        return this.sysLockBy;
    }
    
    public void setSysLockBy(String sysLockBy) {
        this.sysLockBy = sysLockBy;
    }
    
    @Column(name="SYS_FUNC_ID", length=35)

    public String getSysFuncId() {
        return this.sysFuncId;
    }
    
    public void setSysFuncId(String sysFuncId) {
        this.sysFuncId = sysFuncId;
    }
    
    @Column(name="SYS_TRX_STS", length=1)

    public String getSysTrxSts() {
        return this.sysTrxSts;
    }
    
    public void setSysTrxSts(String sysTrxSts) {
        this.sysTrxSts = sysTrxSts;
    }
    
    @Column(name="SYS_REL_REASON", length=65535)

    public String getSysRelReason() {
        return this.sysRelReason;
    }
    
    public void setSysRelReason(String sysRelReason) {
        this.sysRelReason = sysRelReason;
    }
    
    @Column(name="SYS_BUSI_UNIT", length=40)

    public String getSysBusiUnit() {
        return this.sysBusiUnit;
    }
    
    public void setSysBusiUnit(String sysBusiUnit) {
        this.sysBusiUnit = sysBusiUnit;
    }
    
    @Column(name="SYS_EVENT_TIMES", nullable=false)

    public Integer getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(Integer sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }

    
    @Column(name="LOG_TYPE", length=19)
	public String getLogType() {
		return logType;
	}

	public void setLogType(String logType) {
		this.logType = logType;
	}

	@Column(name="USER_TP", length=1)
	public String getUserTp() {
		return userTp;
	}

	public void setUserTp(String userTp) {
		this.userTp = userTp;
	}

	
   
	@Column(name="USER_CITY", length=100)
	public String getUserCity() {
		return userCity;
	}

	public void setUserCity(String userCity) {
		this.userCity = userCity;
	}







}