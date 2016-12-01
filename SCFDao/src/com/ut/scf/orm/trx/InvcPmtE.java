package com.ut.scf.orm.trx;



import java.math.BigDecimal;
import java.sql.Timestamp;


import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import javax.persistence.Id;

import javax.persistence.Table;


import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * InvcPmt entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="INVC_PMT_E"
,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class InvcPmtE  implements java.io.Serializable {


    // Fields    

     private InvcPmtEId id;
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
     private String invPmtRef;
     private String invNo;
     private String invRef;
     private String invCcy;
     private BigDecimal invAmt;
     private BigDecimal pmtAmt;
     private BigDecimal payPrinAmt; 
     private String sysBusiUnit;
     private Integer eventTimes;
     private BigDecimal struLoanAmt;
     private BigDecimal invBal;
     private BigDecimal invLoanBal;
     private BigDecimal  invLoanAval;
     //增加还息金额
     private BigDecimal payIntAmt;
 	 private Timestamp invValDt;
 	 private Timestamp invDueDt;
 	private BigDecimal currInt;
 	private BigDecimal currPayInt;
 	private Timestamp trxDt;
 	private String sysOrgId;//新增字段add by WuKai 2016-11-7
    // Constructors

    /** default constructor */
    public InvcPmtE() {
    }

	/** minimal constructor */
    public InvcPmtE(InvcPmtEId id) {
        this.id = id;
    }
    
    /** full constructor */
    public InvcPmtE(InvcPmtEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String invPmtRef, String invNo,
			String invRef, String invCcy, BigDecimal invAmt, BigDecimal pmtAmt,
			BigDecimal payPrinAmt, String sysBusiUnit, Integer eventTimes,
			BigDecimal struLoanAmt, BigDecimal invBal, BigDecimal invLoanBal,
			BigDecimal invLoanAval, BigDecimal payIntAmt,Timestamp invValDt,Timestamp invDueDt,
			BigDecimal currInt,BigDecimal currPayInt,Timestamp trxDt,String sysOrgId) {
		super();
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
		this.invPmtRef = invPmtRef;
		this.invNo = invNo;
		this.invRef = invRef;
		this.invCcy = invCcy;
		this.invAmt = invAmt;
		this.pmtAmt = pmtAmt;
		this.payPrinAmt = payPrinAmt;
		this.sysBusiUnit = sysBusiUnit;
		this.eventTimes = eventTimes;
		this.struLoanAmt = struLoanAmt;
		this.invBal = invBal;
		this.invLoanBal = invLoanBal;
		this.invLoanAval = invLoanAval;
		this.payIntAmt = payIntAmt;
		this.invValDt = invValDt;
		this.invDueDt = invDueDt;
		this.currInt = currInt;
		this.currPayInt = currPayInt;
		this.trxDt = trxDt;
		this.sysOrgId = sysOrgId;
	}

 // Property accessors
 	@EmbeddedId
 	@AttributeOverrides({
 			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
 			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false)) })
 	public InvcPmtEId getId() {
 		return this.id;
 	}

 	public void setId(InvcPmtEId id) {
 		this.id = id;
 	}
    
    @Column(name="SYS_OP_ID", length=35)

    public String getSysOpId() {
        return this.sysOpId;
    }
    
    public void setSysOpId(String sysOpId) {
        this.sysOpId = sysOpId;
    }
    
    @Column(name="SYS_OP_TM", length=11)

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
    
    @Column(name="SYS_REL_TM", length=11)

    public Timestamp getSysRelTm() {
        return this.sysRelTm;
    }
    
    public void setSysRelTm(Timestamp sysRelTm) {
        this.sysRelTm = sysRelTm;
    }
    
    @Column(name="PAY_INT_AMT", length=35,scale=4)
    
	public BigDecimal getPayIntAmt()
	{
		return payIntAmt;
	}

	
	public void setPayIntAmt(BigDecimal payIntAmt)
	{
		this.payIntAmt = payIntAmt;
	}

	@Column(name="SYS_AUTH_ID", length=35)

    public String getSysAuthId() {
        return this.sysAuthId;
    }
    
    public void setSysAuthId(String sysAuthId) {
        this.sysAuthId = sysAuthId;
    }
    
    @Column(name="SYS_AUTH_TM", length=11)

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
    
    @Column(name="INV_PMT_REF", length=35)

    public String getInvPmtRef() {
        return this.invPmtRef;
    }
    
    public void setInvPmtRef(String invPmtRef) {
        this.invPmtRef = invPmtRef;
    }
    
    @Column(name="INV_NO", length=35)

    public String getInvNo() {
        return this.invNo;
    }
    
    public void setInvNo(String invNo) {
        this.invNo = invNo;
    }
    
    @Column(name="INV_CCY", length=3)

    public String getInvCcy() {
        return this.invCcy;
    }
    
    public void setInvCcy(String invCcy) {
        this.invCcy = invCcy;
    }
    
    @Column(name="INV_AMT", precision=18, scale=4)

    public BigDecimal getInvAmt() {
        return this.invAmt;
    }
    
    public void setInvAmt(BigDecimal invAmt) {
        this.invAmt = invAmt;
    }
    
    @Column(name="PMT_AMT", precision=18, scale=4)

    public BigDecimal getPmtAmt() {
        return this.pmtAmt;
    }
    
    public void setPmtAmt(BigDecimal pmtAmt) {
        this.pmtAmt = pmtAmt;
    }
    
    @Column(name="INV_REF", length=35)
	public String getInvRef() {
		return invRef;
	}

	public void setInvRef(String invRef) {
		this.invRef = invRef;
	}

	@Column(name="PAY_PRIN_AMT",precision=18, scale=4)
	public BigDecimal getPayPrinAmt() {
		return payPrinAmt;
	}

	public void setPayPrinAmt(BigDecimal payPrinAmt) {
		this.payPrinAmt = payPrinAmt;
	}
	
	@Column(name="SYS_BUSI_UNIT", length=35)
	public String getSysBusiUnit() {
		return sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name="EVENT_TIMES", precision=4, scale=0)
	public Integer getEventTimes() {
		return eventTimes;
	}

	public void setEventTimes(Integer eventTimes) {
		this.eventTimes = eventTimes;
	}

	@Column(name="STRU_LOAN_AMT", precision=18, scale=4)
	public BigDecimal getStruLoanAmt() {
		return struLoanAmt;
	}

	public void setStruLoanAmt(BigDecimal struLoanAmt) {
		this.struLoanAmt = struLoanAmt;
	}
	
	@Column(name="INV_BAL", precision=18, scale=4)
	public BigDecimal getInvBal() {
		return invBal;
	}

	public void setInvBal(BigDecimal invBal) {
		this.invBal = invBal;
	}

	@Column(name="INV_LOAN_BAL", precision=18, scale=4)
	public BigDecimal getInvLoanBal() {
		return invLoanBal;
	}

	public void setInvLoanBal(BigDecimal invLoanBal) {
		this.invLoanBal = invLoanBal;
	}

	@Column(name="INV_LOAN_AVAL", precision=18, scale=4)
	public BigDecimal getInvLoanAval() {
		return invLoanAval;
	}

	public void setInvLoanAval(BigDecimal invLoanAval) {
		this.invLoanAval = invLoanAval;
	}
	
	
	
	
   

	@Column(name = "INV_VAL_DT", length = 11)
	public Timestamp getInvValDt() {
		return this.invValDt;
	}

	public void setInvValDt(Timestamp invValDt) {
		this.invValDt = invValDt;
	}

	@Column(name = "INV_DUE_DT", length = 11)
	public Timestamp getInvDueDt() {
		return this.invDueDt;
	}

	public void setInvDueDt(Timestamp invDueDt) {
		this.invDueDt = invDueDt;
	}
   
	@Column(name = "CURR_INT", precision = 18, scale = 4)
	public BigDecimal getCurrInt() {
		return this.currInt;
	}

	public void setCurrInt(BigDecimal currInt) {
		this.currInt = currInt;
	}

	@Column(name = "CURR_PAY_INT", precision = 18, scale = 4)
	public BigDecimal getCurrPayInt() {
		return this.currPayInt;
	}

	public void setCurrPayInt(BigDecimal currPayInt) {
		this.currPayInt = currPayInt;
	}
	
	@Column(name = "TRX_DT")
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}