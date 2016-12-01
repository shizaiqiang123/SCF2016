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
 * CnInvM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="CN_INV_M"
    ,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class CnInvM  implements java.io.Serializable {


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
     private String selNm;
     private String buyerNm;
     private String invNo;
     private String invCcy;
     private BigDecimal invBal;
     private BigDecimal invLoanAval;
     private BigDecimal crnAmt;
     private Timestamp invDueDt;
     private String cntrctNo;
     private String invSts;
     private Double loanPerc;
     private String temp;
     private String invRef;
     private String sysOrgId;//新增字段add by WuKai 2016-11-7

    // Constructors

    /** default constructor */
    public CnInvM() {
    }

	/** minimal constructor */
    public CnInvM(String sysRefNo, Integer sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }
    
    /** full constructor */
    public CnInvM(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, Integer sysEventTimes, String selNm, String buyerNm, String invNo, String invCcy, BigDecimal invBal, BigDecimal invLoanAval, BigDecimal crnAmt, Timestamp invDueDt, String cntrctNo, String invSts, Double loanPerc, String temp, String invRef,String sysOrgId) {
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
        this.selNm = selNm;
        this.buyerNm = buyerNm;
        this.invNo = invNo;
        this.invCcy = invCcy;
        this.invBal = invBal;
        this.invLoanAval = invLoanAval;
        this.crnAmt = crnAmt;
        this.invDueDt = invDueDt;
        this.cntrctNo = cntrctNo;
        this.invSts = invSts;
        this.loanPerc = loanPerc;
        this.temp = temp;
        this.invRef = invRef;
        this.sysOrgId = sysOrgId;
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

    public Integer getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(Integer sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }
    
    @Column(name="SEL_NM", length=40)

    public String getSelNm() {
        return this.selNm;
    }
    
    public void setSelNm(String selNm) {
        this.selNm = selNm;
    }
    
    @Column(name="BUYER_NM", length=40)

    public String getBuyerNm() {
        return this.buyerNm;
    }
    
    public void setBuyerNm(String buyerNm) {
        this.buyerNm = buyerNm;
    }
    
    @Column(name="INV_NO", length=40)

    public String getInvNo() {
        return this.invNo;
    }
    
    public void setInvNo(String invNo) {
        this.invNo = invNo;
    }
    
    @Column(name="INV_CCY", length=40)

    public String getInvCcy() {
        return this.invCcy;
    }
    
    public void setInvCcy(String invCcy) {
        this.invCcy = invCcy;
    }
    
    @Column(name="INV_BAL", precision=38, scale=0)

    public BigDecimal getInvBal() {
        return this.invBal;
    }
    
    public void setInvBal(BigDecimal invBal) {
        this.invBal = invBal;
    }
    
    @Column(name="INV_LOAN_AVAL", precision=38, scale=0)

    public BigDecimal getInvLoanAval() {
        return this.invLoanAval;
    }
    
    public void setInvLoanAval(BigDecimal invLoanAval) {
        this.invLoanAval = invLoanAval;
    }
    
    @Column(name="CRN_AMT", nullable=false, precision=38, scale=0)

    public BigDecimal getCrnAmt() {
        return this.crnAmt;
    }
    
    public void setCrnAmt(BigDecimal crnAmt) {
        this.crnAmt = crnAmt;
    }
    
    @Column(name="INV_DUE_DT")

    public Timestamp getInvDueDt() {
        return this.invDueDt;
    }
    
    public void setInvDueDt(Timestamp invDueDt) {
        this.invDueDt = invDueDt;
    }
    
    @Column(name="CNTRCT_NO", length=40)

    public String getCntrctNo() {
        return this.cntrctNo;
    }
    
    public void setCntrctNo(String cntrctNo) {
        this.cntrctNo = cntrctNo;
    }
    
    @Column(name="INV_STS", length=40)

    public String getInvSts() {
        return this.invSts;
    }
    
    public void setInvSts(String invSts) {
        this.invSts = invSts;
    }
    
    @Column(name="LOAN_PERC", precision=18, scale=4)

    public Double getLoanPerc() {
        return this.loanPerc;
    }
    
    public void setLoanPerc(Double loanPerc) {
        this.loanPerc = loanPerc;
    }
    
    @Column(name="TEMP", length=40)

    public String getTemp() {
        return this.temp;
    }
    
    public void setTemp(String temp) {
        this.temp = temp;
    }
    
    @Column(name="INV_REF", length=40)

    public String getInvRef() {
        return this.invRef;
    }
    
    public void setInvRef(String invRef) {
        this.invRef = invRef;
    }
   

    @Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}






}