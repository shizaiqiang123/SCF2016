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
 * BillE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="BILL_E"
    ,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class BillE  implements java.io.Serializable {


    // Fields    

     private BillEId id;
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
     private String billNo;
     private String loanId;
     private String cntrctNo;
     private String selId;
     private String buyerId;
     private String billCcy;
     private BigDecimal billAmt;
     private BigDecimal billBal;
     private Timestamp billValDt;
     private Timestamp billDueDt;
     private String billRecp;
     private String billRecpAcno;
     private String remark;
     private String attribute1;
     private String attrvalue1;
     private String attribute2;
     private String attrvalue2;
     private String attribute3;
     private String attrvalue3;
     private BigDecimal marginCompen;
     private BigDecimal marginBal;
     private String sysOrgId;//新增字段add by WuKai 2016-11-7
    // Constructors

    /** default constructor */
    public BillE() {
    }

	/** minimal constructor */
    public BillE(BillEId id) {
        this.id = id;
    }
    
    /** full constructor */
    public BillE(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, Integer sysEventTimes, String billNo, String loanId, String cntrctNo, String selId, String buyerId, String billCcy, BigDecimal billAmt, BigDecimal billBal, Timestamp billValDt, Timestamp billDueDt, String billRecp, String billRecpAcno, String remark, String attribute1, String attrvalue1, String attribute2, String attrvalue2, String attribute3, String attrvalue3,BigDecimal marginCompen, BigDecimal marginBal,String sysOrgId) {
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
        this.billNo = billNo;
        this.loanId = loanId;
        this.cntrctNo = cntrctNo;
        this.selId = selId;
        this.buyerId = buyerId;
        this.billCcy = billCcy;
        this.billAmt = billAmt;
        this.billBal = billBal;
        this.billValDt = billValDt;
        this.billDueDt = billDueDt;
        this.billRecp = billRecp;
        this.billRecpAcno = billRecpAcno;
        this.remark = remark;
        this.attribute1 = attribute1;
        this.attrvalue1 = attrvalue1;
        this.attribute2 = attribute2;
        this.attrvalue2 = attrvalue2;
        this.attribute3 = attribute3;
        this.attrvalue3 = attrvalue3;
        this.marginCompen = marginCompen;
        this.marginBal = marginBal;
        this.sysOrgId = sysOrgId;
    }

   
    // Property accessors
    @EmbeddedId
    
    @AttributeOverrides( {
        @AttributeOverride(name="sysRefNo", column=@Column(name="SYS_REF_NO", nullable=false, length=35) ), 
        @AttributeOverride(name="sysEventTimes", column=@Column(name="SYS_EVENT_TIMES", nullable=false, precision=38, scale=0) ) } )

    public BillEId getId() {
        return this.id;
    }
    
    public void setId(BillEId id) {
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
    
    @Column(name="BILL_NO", length=35)

    public String getBillNo() {
        return this.billNo;
    }
    
    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }
    
    @Column(name="LOAN_ID", length=35)

    public String getLoanId() {
        return this.loanId;
    }
    
    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }
    
    @Column(name="CNTRCT_NO", length=35)

    public String getCntrctNo() {
        return this.cntrctNo;
    }
    
    public void setCntrctNo(String cntrctNo) {
        this.cntrctNo = cntrctNo;
    }
    
    @Column(name="SEL_ID", length=35)

    public String getSelId() {
        return this.selId;
    }
    
    public void setSelId(String selId) {
        this.selId = selId;
    }
    
    @Column(name="BUYER_ID", length=35)

    public String getBuyerId() {
        return this.buyerId;
    }
    
    public void setBuyerId(String buyerId) {
        this.buyerId = buyerId;
    }
    
    @Column(name="BILL_CCY", length=3)

    public String getBillCcy() {
        return this.billCcy;
    }
    
    public void setBillCcy(String billCcy) {
        this.billCcy = billCcy;
    }
    
    @Column(name="BILL_AMT", precision=18, scale=3)

    public BigDecimal getBillAmt() {
        return this.billAmt;
    }
    
    public void setBillAmt(BigDecimal billAmt) {
        this.billAmt = billAmt;
    }
    
    @Column(name="BILL_BAL", precision=18, scale=3)

    public BigDecimal getBillBal() {
        return this.billBal;
    }
    
    public void setBillBal(BigDecimal billBal) {
        this.billBal = billBal;
    }
    
    @Column(name="BILL_VAL_DT")

    public Timestamp getBillValDt() {
        return this.billValDt;
    }
    
    public void setBillValDt(Timestamp billValDt) {
        this.billValDt = billValDt;
    }
    
    @Column(name="BILL_DUE_DT")

    public Timestamp getBillDueDt() {
        return this.billDueDt;
    }
    
    public void setBillDueDt(Timestamp billDueDt) {
        this.billDueDt = billDueDt;
    }
    
    @Column(name="BILL_RECP", length=40)

    public String getBillRecp() {
        return this.billRecp;
    }
    
    public void setBillRecp(String billRecp) {
        this.billRecp = billRecp;
    }
    
    @Column(name="BILL_RECP_ACNO", length=40)

    public String getBillRecpAcno() {
        return this.billRecpAcno;
    }
    
    public void setBillRecpAcno(String billRecpAcno) {
        this.billRecpAcno = billRecpAcno;
    }
    
    @Column(name="REMARK", length=200)

    public String getRemark() {
        return this.remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
    
    @Column(name="ATTRIBUTE1", length=35)

    public String getAttribute1() {
        return this.attribute1;
    }
    
    public void setAttribute1(String attribute1) {
        this.attribute1 = attribute1;
    }
    
    @Column(name="ATTRVALUE1", length=35)

    public String getAttrvalue1() {
        return this.attrvalue1;
    }
    
    public void setAttrvalue1(String attrvalue1) {
        this.attrvalue1 = attrvalue1;
    }
    
    @Column(name="ATTRIBUTE2", length=35)

    public String getAttribute2() {
        return this.attribute2;
    }
    
    public void setAttribute2(String attribute2) {
        this.attribute2 = attribute2;
    }
    
    @Column(name="ATTRVALUE2", length=35)

    public String getAttrvalue2() {
        return this.attrvalue2;
    }
    
    public void setAttrvalue2(String attrvalue2) {
        this.attrvalue2 = attrvalue2;
    }
    
    @Column(name="ATTRIBUTE3", length=35)

    public String getAttribute3() {
        return this.attribute3;
    }
    
    public void setAttribute3(String attribute3) {
        this.attribute3 = attribute3;
    }
    
    @Column(name="ATTRVALUE3", length=35)

    public String getAttrvalue3() {
        return this.attrvalue3;
    }
    
    public void setAttrvalue3(String attrvalue3) {
        this.attrvalue3 = attrvalue3;
    }
   
    @Column(name="MARGIN_COMPEN", precision=18, scale=3)
   	public BigDecimal getMarginCompen() {
   		return marginCompen;
   	}

   	public void setMarginCompen(BigDecimal marginCompen) {
   		this.marginCompen = marginCompen;
   	}

   	@Column(name="MARGIN_BAL", precision=18, scale=3)
   	public BigDecimal getMarginBal() {
   		return marginBal;
   	}

   	public void setMarginBal(BigDecimal marginBal) {
   		this.marginBal = marginBal;
   	}

   	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}





}