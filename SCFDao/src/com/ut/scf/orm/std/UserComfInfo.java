package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * UserComfInfo entity. @author yhy
 */
@Entity
@Table(name="user_comf_info"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class UserComfInfo  implements java.io.Serializable {


    // Fields    

     private String sysRefNo;
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
     private String funId;
     private Integer sysEventTimes;
     private String funNm;
     /*
      * 1为常用功能
      * 2为业务数据展示
      */
     private String userFunType;

    // Constructors

    /** default constructor */
    public UserComfInfo() {
    }

	/** minimal constructor */
    public UserComfInfo(String sysRefNo, String userId, Integer sysEventTimes,String funId) {
        this.sysRefNo = sysRefNo;
        this.userId = userId;
        this.sysEventTimes = sysEventTimes;
        this.funId=funId;
        
    }
    
    /** full constructor */
    public UserComfInfo(String sysRefNo, String sysBusiUnit, String sysOpId,
			Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp,
			String sysLockFlag, String sysLockBy, String sysFuncId,
			String sysTrxSts, String userId, String funId,
			Integer sysEventTimes, String funNm,String userFunType) {
		super();
		this.sysRefNo = sysRefNo;
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
		this.funId = funId;
		this.sysEventTimes = sysEventTimes;
		this.funNm = funNm;
		this.userFunType=userFunType;
	}

   

	// Property accessors
    @Id 
    
    @Column(name="SYS_REF_NO", unique=true, nullable=false, length=35)

    public String getSysRefNo() {
        return this.sysRefNo;
    }

	public void setSysRefNo(String sysRefNo) {
        this.sysRefNo = sysRefNo;
    }
    
    @Column(name="sys_busi_unit", length=35)

    public String getSysBusiUnit() {
        return this.sysBusiUnit;
    }
    
    public void setSysBusiUnit(String sysBusiUnit) {
        this.sysBusiUnit = sysBusiUnit;
    }
    
    @Column(name="FUN_ID", length=35)
    public String getFunId() {
		return funId;
	}

	public void setFunId(String funId) {
		this.funId = funId;
	}
   
    @Column(name="FUN_NM", length=35)
    public String getFunNm() {
		return funNm;
	}

	public void setFunNm(String funNm) {
		this.funNm = funNm;
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
    
    @Column(name="USER_ID", nullable=false, length=35)

    public String getUserId() {
        return this.userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
  
    @Column(name="SYS_EVENT_TIMES", nullable=false)

    public Integer getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(Integer sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }

	
    @Column(name="USER_FUN_TYPE", length=1)
    public String getUserFunType() {
		return userFunType;
	}

	public void setUserFunType(String userFunType) {
		this.userFunType = userFunType;
	}

}