package com.ut.scf.orm.trx;
import java.math.BigDecimal;

import java.sql.Timestamp;

import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.Id;

import javax.persistence.Table;


import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * CntrctChange entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="CNTRCT_CHANGE"
    ,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class CntrctChange  implements java.io.Serializable {


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
     private String custNo;
     private String custNm;
     private String cntrctNo;
     private String refNo;
     private String trxCcy;
     private BigDecimal trxAmt;
     private BigDecimal expTrxAmt;
     private Timestamp trxDate;
     private String clType;
     private String tdType;
     private String sysOrgId;//新增字段add by WuKai 2016-11-7

    // Constructors

    /** default constructor */
    public CntrctChange() {
    }

	/** minimal constructor */
    public CntrctChange(String sysRefNo, Integer sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }
    
    /** full constructor */
    public CntrctChange(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, Integer sysEventTimes, String custNo, String custNm, String cntrctNo, String refNo, String trxCcy, BigDecimal trxAmt, BigDecimal expTrxAmt, Timestamp trxDate, String clType, String tdType,String sysOrgId) {
        this.sysRefNo = sysRefNo;
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
        this.custNo = custNo;
        this.custNm = custNm;
        this.cntrctNo = cntrctNo;
        this.refNo = refNo;
        this.trxCcy = trxCcy;
        this.trxAmt = trxAmt;
        this.expTrxAmt = expTrxAmt;
        this.trxDate = trxDate;
        this.clType = clType;
        this.tdType = tdType;
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
    
    @Column(name="SYS_EVENT_TIMES")

    public Integer getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(Integer sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }
    
    @Column(name="CUST_NO", length=35)

    public String getCustNo() {
        return this.custNo;
    }
    
    public void setCustNo(String custNo) {
        this.custNo = custNo;
    }
    
    @Column(name="CUST_NM", length=35)

    public String getCustNm() {
        return this.custNm;
    }
    
    public void setCustNm(String custNm) {
        this.custNm = custNm;
    }
    
    @Column(name="CNTRCT_NO", length=35)

    public String getCntrctNo() {
        return this.cntrctNo;
    }
    
    public void setCntrctNo(String cntrctNo) {
        this.cntrctNo = cntrctNo;
    }
    
    @Column(name="REF_NO", length=35)

    public String getRefNo() {
        return this.refNo;
    }
    
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }
    
    @Column(name="TRX_CCY", length=10)

    public String getTrxCcy() {
        return this.trxCcy;
    }
    
    public void setTrxCcy(String trxCcy) {
        this.trxCcy = trxCcy;
    }
    
    @Column(name="TRX_AMT", precision=24, scale=6)

    public BigDecimal getTrxAmt() {
        return this.trxAmt;
    }
    
    public void setTrxAmt(BigDecimal trxAmt) {
        this.trxAmt = trxAmt;
    }
    
    @Column(name="EXP_TRX_AMT", precision=24, scale=6)

    public BigDecimal getExpTrxAmt() {
        return this.expTrxAmt;
    }
    
    public void setExpTrxAmt(BigDecimal expTrxAmt) {
        this.expTrxAmt = expTrxAmt;
    }
    
    @Column(name="TRX_DATE")

    public Timestamp getTrxDate() {
        return this.trxDate;
    }
    
    public void setTrxDate(Timestamp trxDate) {
        this.trxDate = trxDate;
    }
    
    @Column(name="CL_TYPE", length=1)

    public String getClType() {
        return this.clType;
    }
    
    public void setClType(String clType) {
        this.clType = clType;
    }
    
    @Column(name="TD_TYPE", length=1)

    public String getTdType() {
        return this.tdType;
    }
    
    public void setTdType(String tdType) {
        this.tdType = tdType;
    }
   

    @Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}






}