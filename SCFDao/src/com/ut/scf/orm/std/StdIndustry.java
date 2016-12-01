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
 * StdIndustry entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="STD_INDUSTRY"
    ,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class StdIndustry  implements java.io.Serializable {


    // Fields    

     private String sysRefNo;
     private Timestamp sysAuthTm;
     private String sysNextOp;
     private String sysLockFlag;
     private String sysLockBy;
     private String sysFuncId;
     private String sysTrxSts;
     private Integer sysEventTimes;
     private String industryNm;
     private String parentNo;
     private Integer orderNum;


    // Constructors

    /** default constructor */
    public StdIndustry() {
    }

	/** minimal constructor */
    public StdIndustry(String sysRefNo) {
        this.sysRefNo = sysRefNo;
    }
    
    /** full constructor */
    public StdIndustry(String sysRefNo, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, Integer sysEventTimes, String industryNm, String parentNo, Integer orderNum) {
        this.sysRefNo = sysRefNo;
        this.sysAuthTm = sysAuthTm;
        this.sysNextOp = sysNextOp;
        this.sysLockFlag = sysLockFlag;
        this.sysLockBy = sysLockBy;
        this.sysFuncId = sysFuncId;
        this.sysTrxSts = sysTrxSts;
        this.sysEventTimes = sysEventTimes;
        this.industryNm = industryNm;
        this.parentNo = parentNo;
        this.orderNum = orderNum;
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
    
    @Column(name="SYS_EVENT_TIMES", precision=38, scale=0)

    public Integer getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(Integer sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }
    
    @Column(name="INDUSTRY_NM", length=70)

    public String getIndustryNm() {
        return this.industryNm;
    }
    
    public void setIndustryNm(String industryNm) {
        this.industryNm = industryNm;
    }
    
    @Column(name="PARENT_NO", length=35)

    public String getParentNo() {
        return this.parentNo;
    }
    
    public void setParentNo(String parentNo) {
        this.parentNo = parentNo;
    }
    
    @Column(name="ORDER_NUM", precision=5, scale=0)

    public Integer getOrderNum() {
        return this.orderNum;
    }
    
    public void setOrderNum(Integer orderNum) {
        this.orderNum = orderNum;
    }
   








}