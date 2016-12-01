package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "BLACKLIST_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class BlacklistM implements java.io.Serializable {

    // Fields    

     private String sysRefNo;
     private String batchNo;
     private String bussType;
     private String branchNo;
     private String blackName;
     private String cretType;
     private String cretCode;
     private String msgCode;
     private Timestamp msgCreateDate;
     private String msgNo;
     private Integer impNum;
     private Timestamp impDate;
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
     private BigDecimal sysEventTimes;
     private String sysOrgId;//新增字段add by WuKai 2016-11-7

    // Constructors

    /** default constructor */
    public BlacklistM() {
    }

	/** minimal constructor */
    public BlacklistM(String sysRefNo, BigDecimal sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }
    
    /** full constructor */
    public BlacklistM(String sysRefNo, String batchNo, String bussType, String branchNo, String blackName, String cretType, String cretCode, String msgCode, Timestamp msgCreateDate, String msgNo, Integer impNum, Timestamp impDate, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, BigDecimal sysEventTimes,String sysOrgId) {
        this.sysRefNo = sysRefNo;
        this.batchNo = batchNo;
        this.bussType = bussType;
        this.branchNo = branchNo;
        this.blackName = blackName;
        this.cretType = cretType;
        this.cretCode = cretCode;
        this.msgCode = msgCode;
        this.msgCreateDate = msgCreateDate;
        this.msgNo = msgNo;
        this.impNum = impNum;
        this.impDate = impDate;
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
        this.sysOrgId = sysOrgId;
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
    
    @Column(name="BATCH_NO", length=35)

    public String getBatchNo() {
        return this.batchNo;
    }
    
    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }
    
    @Column(name="BUSS_TYPE", length=1)

    public String getBussType() {
        return this.bussType;
    }
    
    public void setBussType(String bussType) {
        this.bussType = bussType;
    }
    
    @Column(name="BRANCH_NO", length=35)

    public String getBranchNo() {
        return this.branchNo;
    }
    
    public void setBranchNo(String branchNo) {
        this.branchNo = branchNo;
    }
    
    @Column(name="BLACK_NAME", length=35)

    public String getBlackName() {
        return this.blackName;
    }
    
    public void setBlackName(String blackName) {
        this.blackName = blackName;
    }
    
    @Column(name="CRET_TYPE", length=1)

    public String getCretType() {
        return this.cretType;
    }
    
    public void setCretType(String cretType) {
        this.cretType = cretType;
    }
    
    @Column(name="CRET_CODE", length=35)

    public String getCretCode() {
        return this.cretCode;
    }
    
    public void setCretCode(String cretCode) {
        this.cretCode = cretCode;
    }
    
    @Column(name="MSG_CODE", length=35)

    public String getMsgCode() {
        return this.msgCode;
    }
    
    public void setMsgCode(String msgCode) {
        this.msgCode = msgCode;
    }
    
    @Column(name="MSG_CREATE_DATE")

    public Timestamp getMsgCreateDate() {
        return this.msgCreateDate;
    }
    
    public void setMsgCreateDate(Timestamp msgCreateDate) {
        this.msgCreateDate = msgCreateDate;
    }
    
    @Column(name="MSG_NO", length=35)

    public String getMsgNo() {
        return this.msgNo;
    }
    
    public void setMsgNo(String msgNo) {
        this.msgNo = msgNo;
    }
    
    @Column(name="IMP_NUM", precision=7, scale=0)

    public Integer getImpNum() {
        return this.impNum;
    }
    
    public void setImpNum(Integer impNum) {
        this.impNum = impNum;
    }
    
    @Column(name="IMP_DATE")

    public Timestamp getImpDate() {
        return this.impDate;
    }
    
    public void setImpDate(Timestamp impDate) {
        this.impDate = impDate;
    }
    
    @Column(name="SYS_OP_ID", length=35)

    public String getSysOpId() {
        return this.sysOpId;
    }
    
    public void setSysOpId(String sysOpId) {
        this.sysOpId = sysOpId;
    }
    
    @Column(name="SYS_OP_TM")

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
    
    @Column(name="SYS_REL_TM")

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
    
    @Column(name="SYS_AUTH_TM")

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
    
    @Column(name="SYS_EVENT_TIMES", nullable=false, precision=38, scale=0)

    public BigDecimal getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(BigDecimal sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }
   
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}
