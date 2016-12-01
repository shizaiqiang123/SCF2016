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
 * StdCcy entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="std_ccy"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class StdCcy  implements java.io.Serializable {


    // Fields    

     private String sysRefNo;
     private String ccyNm;
     private BigDecimal decFormat;
     private BigDecimal baseDay;
     private String ccyCtry;
     //修改类型
     private BigDecimal rtDecimal;
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
     private String sysBusiUnit;
     private String ccySymbol;


    // Constructors

    /** default constructor */
    public StdCcy() {
    }

	/** minimal constructor */
    public StdCcy(String sysRefNo, Integer sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }
    
    /** full constructor */
    public StdCcy(String sysRefNo, String ccyNm, BigDecimal decFormat, BigDecimal baseDay, String ccyCtry, BigDecimal rtDecimal, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, Integer sysEventTimes, String sysBusiUnit, String ccySymbol) {
        this.sysRefNo = sysRefNo;
        this.ccyNm = ccyNm;
        this.decFormat = decFormat;
        this.baseDay = baseDay;
        this.ccyCtry = ccyCtry;
        this.rtDecimal = rtDecimal;
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
        this.sysBusiUnit = sysBusiUnit;
        this.ccySymbol = ccySymbol;
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
    
    @Column(name="CCY_NM", length=35)

    public String getCcyNm() {
        return this.ccyNm;
    }
    
    public void setCcyNm(String ccyNm) {
        this.ccyNm = ccyNm;
    }
    
    @Column(name="DEC_FORMAT", precision=3, scale=0)

    public BigDecimal getDecFormat() {
        return this.decFormat;
    }
    
    public void setDecFormat(BigDecimal decFormat) {
        this.decFormat = decFormat;
    }
    
    @Column(name="BASE_DAY", precision=3, scale=0)

    public BigDecimal getBaseDay() {
        return this.baseDay;
    }
    
    public void setBaseDay(BigDecimal baseDay) {
        this.baseDay = baseDay;
    }
    
    @Column(name="CCY_CTRY", length=3)

    public String getCcyCtry() {
        return this.ccyCtry;
    }
    
    public void setCcyCtry(String ccyCtry) {
        this.ccyCtry = ccyCtry;
    }
    
    @Column(name="RT_DECIMAL", precision=7, scale=0)

    public BigDecimal getRtDecimal() {
        return this.rtDecimal;
    }
    
    public void setRtDecimal(BigDecimal rtDecimal) {
        this.rtDecimal = rtDecimal;
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
    
    @Column(name="SYS_EVENT_TIMES", nullable=false)

    public Integer getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(Integer sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }
    
    @Column(name="sys_busi_unit", length=40)

    public String getSysBusiUnit() {
        return this.sysBusiUnit;
    }
    
    public void setSysBusiUnit(String sysBusiUnit) {
        this.sysBusiUnit = sysBusiUnit;
    }
    
    @Column(name="ccy_symbol", length=5)

    public String getCcySymbol() {
        return this.ccySymbol;
    }
    
    public void setCcySymbol(String ccySymbol) {
        this.ccySymbol = ccySymbol;
    }
   








}