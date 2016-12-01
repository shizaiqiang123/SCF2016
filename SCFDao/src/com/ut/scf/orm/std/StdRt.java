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
 * StdCity entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="std_RT"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class StdRt  implements java.io.Serializable {


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
     private String sysBusiUnit;
     private String sysRelReason;
     
     private String finaTp;
     private String busiTp;
     private Integer acctPeriod;
     private String feeOrIntr;
     private String custLevel;
     private String rateTp;
     private BigDecimal rtSpread;
     private BigDecimal libor;
     private String acctPeriodDesc;
     


    // Constructors

    /** default constructor */
    public StdRt() {
    }

	/** minimal constructor */
    public StdRt(String sysRefNo) {
        this.sysRefNo = sysRefNo;
    }
    
    /** full constructor */
    public StdRt(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, Integer sysEventTimes, String cityNm, String sysBusiUnit, String sysRelReason) {
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
        this.sysBusiUnit = sysBusiUnit;
        this.sysRelReason = sysRelReason;
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
    
    @Column(name="SYS_EVENT_TIMES")

    public Integer getSysEventTimes() {
        return this.sysEventTimes;
    }
    
    public void setSysEventTimes(Integer sysEventTimes) {
        this.sysEventTimes = sysEventTimes;
    }

    @Column(name="SYS_BUSI_UNIT")
	public String getSysBusiUnit() {
		return sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	
	@Column(name="SYS_REL_REASON")
	public String getSysRelReason() {
		return sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name="FINA_TP")
	public String getFinaTp() {
		return finaTp;
	}

	public void setFinaTp(String finaTp) {
		this.finaTp = finaTp;
	}

	
	@Column(name="BUSI_TP")
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	
	@Column(name="ACCT_PERIOD")
	public Integer getAcctPeriod() {
		return acctPeriod;
	}

	public void setAcctPeriod(Integer acctPeriod) {
		this.acctPeriod = acctPeriod;
	}

	
	@Column(name="FEE_OR_INTR")
	public String getFeeOrIntr() {
		return feeOrIntr;
	}

	public void setFeeOrIntr(String feeOrIntr) {
		this.feeOrIntr = feeOrIntr;
	}

	
	@Column(name="CUST_LEVEL")
	public String getCustLevel() {
		return custLevel;
	}

	public void setCustLevel(String custLevel) {
		this.custLevel = custLevel;
	}

	
	@Column(name="RATE_TP")
	public String getRateTp() {
		return rateTp;
	}

	public void setRateTp(String rateTp) {
		this.rateTp = rateTp;
	}

	
	@Column(name="RT_SPREAD")
	public BigDecimal getRtSpread() {
		return rtSpread;
	}

	public void setRtSpread(BigDecimal rtSpread) {
		this.rtSpread = rtSpread;
	}

	
	@Column(name="LIBOR")
	public BigDecimal getLibor() {
		return libor;
	}

	public void setLibor(BigDecimal libor) {
		this.libor = libor;
	}
    
	@Column(name="ACCT_PERIOD_DESC")
	public String getAcctPeriodDesc() {
		return acctPeriodDesc;
	}


	public void setAcctPeriodDesc(String acctPeriodDesc) {
		this.acctPeriodDesc = acctPeriodDesc;
	}
    
   








}