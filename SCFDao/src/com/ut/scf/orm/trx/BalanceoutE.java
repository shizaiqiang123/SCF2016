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
 * BalanceoutE  entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="BALANCEOUT_E"
    ,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class BalanceoutE   implements java.io.Serializable {


    /**
	 * 
	 */
	// Fields    

     private BalanceoutEId id;
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
     private String custNo;
     private String custNm;
     private String cntrctNo;
     private String prdCode;
     private String prdNm;
     private String outCcy;
     private BigDecimal outAmt;
     private String outAccNo;
     private String outAccBrh;
     private String outAccNm;
     private String inAccNo;
     private String inAccBrh;
     private String inAccNm;
     private String remark;
     private String attribute1;
     private String attrvalue1;
     private String attribute2;
     private String attrvalue2;
     private String attribute3;
     private String attrvalue3;
     private String sysOrgId;//新增字段add by WuKai 2016-11-7

    // Constructors

    /** default constructor */
    public BalanceoutE () {
    }

	/** minimal constructor */
    public BalanceoutE (BalanceoutEId id) {
        this.id = id;
    }
    
    /** full constructor */
    public BalanceoutE (BalanceoutEId id, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, String custNo, String custNm, String cntrctNo, String prdCode, String prdNm, String outCcy, BigDecimal outAmt, String outAccNo, String outAccBrh, String outAccNm, String inAccNo, String inAccBrh, String inAccNm, String attribute1, String attrvalue1, String attribute2, String attrvalue2, String attribute3, String attrvalue3,String remark,String sysOrgId) {
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
        this.custNo = custNo;
        this.custNm = custNm;
        this.cntrctNo = cntrctNo;
        this.prdCode = prdCode;
        this.prdNm = prdNm;
        this.outCcy = outCcy;
        this.outAmt = outAmt;
        this.outAccNo = outAccNo;
        this.outAccBrh = outAccBrh;
        this.outAccNm = outAccNm;
        this.inAccNo = inAccNo;
        this.inAccBrh = inAccBrh;
        this.inAccNm = inAccNm;
        this.attribute1 = attribute1;
        this.attrvalue1 = attrvalue1;
        this.attribute2 = attribute2;
        this.attrvalue2 = attrvalue2;
        this.attribute3 = attribute3;
        this.attrvalue3 = attrvalue3;
        this.remark = remark;
        this.sysOrgId = sysOrgId;
    }

   
    // Property accessors
    @EmbeddedId
    
    @AttributeOverrides( {
        @AttributeOverride(name="sysRefNo", column=@Column(name="SYS_REF_NO", nullable=false, length=35) ), 
        @AttributeOverride(name="sysEventTimes", column=@Column(name="SYS_EVENT_TIMES", nullable=false, precision=38, scale=0) ) } )

    public BalanceoutEId getId() {
        return this.id;
    }
    
    public void setId(BalanceoutEId id) {
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
    
    @Column(name="PRD_CODE", length=35)

    public String getPrdCode() {
        return this.prdCode;
    }
    
    public void setPrdCode(String prdCode) {
        this.prdCode = prdCode;
    }
    
    @Column(name="PRD_NM", length=35)

    public String getPrdNm() {
        return this.prdNm;
    }
    
    public void setPrdNm(String prdNm) {
        this.prdNm = prdNm;
    }
    
    @Column(name="OUT_CCY", length=3)

    public String getOutCcy() {
        return this.outCcy;
    }
    
    public void setOutCcy(String outCcy) {
        this.outCcy = outCcy;
    }
    
    @Column(name="OUT_AMT", precision=18, scale=3)

    public BigDecimal getOutAmt() {
        return this.outAmt;
    }
    
    public void setOutAmt(BigDecimal outAmt) {
        this.outAmt = outAmt;
    }
    
    @Column(name="OUT_ACC_NO", length=35)

    public String getOutAccNo() {
        return this.outAccNo;
    }
    
    public void setOutAccNo(String outAccNo) {
        this.outAccNo = outAccNo;
    }
    
    @Column(name="OUT_ACC_BRH", length=35)

    public String getOutAccBrh() {
        return this.outAccBrh;
    }
    
    public void setOutAccBrh(String outAccBrh) {
        this.outAccBrh = outAccBrh;
    }
    
    @Column(name="OUT_ACC_NM", length=35)

    public String getOutAccNm() {
        return this.outAccNm;
    }
    
    public void setOutAccNm(String outAccNm) {
        this.outAccNm = outAccNm;
    }
    
    @Column(name="IN_ACC_NO", length=35)

    public String getInAccNo() {
        return this.inAccNo;
    }
    
    public void setInAccNo(String inAccNo) {
        this.inAccNo = inAccNo;
    }
    
    @Column(name="IN_ACC_BRH", length=35)

    public String getInAccBrh() {
        return this.inAccBrh;
    }
    
    public void setInAccBrh(String inAccBrh) {
        this.inAccBrh = inAccBrh;
    }
    
    @Column(name="IN_ACC_NM", length=35)

    public String getInAccNm() {
        return this.inAccNm;
    }
    
    public void setInAccNm(String inAccNm) {
        this.inAccNm = inAccNm;
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
   

    @Column(name="REMARK", length=200)

    public String getRemark() {
        return this.remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }


	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}




}