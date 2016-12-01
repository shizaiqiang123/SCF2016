package com.ut.scf.orm.trx;

import java.math.BigDecimal;

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
 * CnE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="CN_E"
    ,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class CnE  implements java.io.Serializable {


    // Fields    

     private CnEId id;
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
     private String selId;
     private String selNm;
     private String cnNo;
     private BigDecimal cnAmt;
     private String ccy;

     private String sysOrgId;//新增字段add by WuKai 2016-11-7

    // Constructors

    /** default constructor */
    public CnE() {
    }

	/** minimal constructor */
    public CnE(CnEId id) {
        this.id = id;
    }
    
    /** full constructor */
    public CnE(CnEId id, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts,String selId, String selNm, String cnNo, BigDecimal cnAmt, String ccy,String sysOrgId) {
        this.id = id;
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
        this.selId = selId;
        this.selNm = selNm;
        this.cnNo = cnNo;
        this.cnAmt = cnAmt;
        this.ccy = ccy;
        this.sysOrgId = sysOrgId;
    }

   
    // Property accessors
    @EmbeddedId
    
    @AttributeOverrides( {
        @AttributeOverride(name="sysRefNo", column=@Column(name="SYS_REF_NO", nullable=false, length=35) ), 
        @AttributeOverride(name="sysEventTimes", column=@Column(name="SYS_EVENT_TIMES", nullable=false, precision=38, scale=0) ) } )

    public CnEId getId() {
        return this.id;
    }
    
    public void setId(CnEId id) {
        this.id = id;
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
    
    @Column(name="SEL_ID", length=40)

    public String getSelId() {
        return this.selId;
    }
    
    public void setSelId(String selId) {
        this.selId = selId;
    }
    
    @Column(name="SEL_NM", length=40)

    public String getSelNm() {
        return this.selNm;
    }
    
    public void setSelNm(String selNm) {
        this.selNm = selNm;
    }
    
    @Column(name="CN_NO", length=40)

    public String getCnNo() {
        return this.cnNo;
    }
    
    public void setCnNo(String cnNo) {
        this.cnNo = cnNo;
    }
    
    @Column(name="CN_AMT", nullable=false, precision=38, scale=0)

    public BigDecimal getCnAmt() {
        return this.cnAmt;
    }
    
    public void setCnAmt(BigDecimal cnAmt) {
        this.cnAmt = cnAmt;
    }
    
    @Column(name="CCY", length=40)

    public String getCcy() {
        return this.ccy;
    }
    
    public void setCcy(String ccy) {
        this.ccy = ccy;
    }
   
    @Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}







}