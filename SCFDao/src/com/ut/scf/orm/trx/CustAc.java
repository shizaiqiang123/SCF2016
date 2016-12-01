package com.ut.scf.orm.trx;

import java.sql.Timestamp;


import javax.persistence.Column;

import javax.persistence.Entity;

import javax.persistence.Id;

import javax.persistence.Table;


import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * CustAc entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="cust_ac"
,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class CustAc  implements java.io.Serializable {

	// Fields    

     /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
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
     private String sysRelReason;
     private String sysBusiUnit;
     private String sysGapiSts;
     private String acNo;
     private String ccy;
     private String acNm;
     private String acBkNm;
     private String acBkNo;
     private String acTp;
     private String acFlag;
     private String isAutoVerif;
     private String verifSeq;
     private String isAutoTransfer;
     private String acOwnerType;
     private String acOwnerid;
     private String acOwnerName;
     private String relavOwnerType;
     private String relavOwnerid;
     private String relavOwnerNm;
     private String relavAc;
     private String relavAcId;
     private String prodId;
     private String prodDesc;
     private String remark;
     private String licenceNo;//营业执照id
     private String buyerId;//所属成员企业ID
     private String sysOrgId;//新增字段add by WuKai 2016-11-7
    // Constructors

    /** default constructor */
    public CustAc() {
    }

	/** minimal constructor */
    public CustAc(String sysRefNo, Integer sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }
    
    /** full constructor */
    public CustAc(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String sysRelReason, String sysBusiUnit,
			String acNo, String ccy, String acNm, String acBkNm, String acBkNo,
			String acTp, String acFlag, String isAutoVerif, String verifSeq,
			String isAutoTransfer, String acOwnerType, String acOwnerid,
			String acOwnerName, String relavOwnerType, String relavOwnerid,
			String relavOwnerNm, String relavAc, String relavAcId,
			String prodId, String prodDesc, String remark, String licenceNo,
			String buyerId,String sysGapiSts,String sysOrgId) {
		super();
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
		this.sysRelReason = sysRelReason;
		this.sysBusiUnit = sysBusiUnit;
		this.acNo = acNo;
		this.ccy = ccy;
		this.acNm = acNm;
		this.acBkNm = acBkNm;
		this.acBkNo = acBkNo;
		this.acTp = acTp;
		this.acFlag = acFlag;
		this.isAutoVerif = isAutoVerif;
		this.verifSeq = verifSeq;
		this.isAutoTransfer = isAutoTransfer;
		this.acOwnerType = acOwnerType;
		this.acOwnerid = acOwnerid;
		this.acOwnerName = acOwnerName;
		this.relavOwnerType = relavOwnerType;
		this.relavOwnerid = relavOwnerid;
		this.relavOwnerNm = relavOwnerNm;
		this.relavAc = relavAc;
		this.relavAcId = relavAcId;
		this.prodId = prodId;
		this.prodDesc = prodDesc;
		this.remark = remark;
		this.licenceNo = licenceNo;
		this.buyerId = buyerId;
		this.sysGapiSts=sysGapiSts;
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
    
    @Column(name="SYS_REL_REASON", length=65535)

    public String getSysRelReason() {
        return this.sysRelReason;
    }
    
    public void setSysRelReason(String sysRelReason) {
        this.sysRelReason = sysRelReason;
    }
    
    @Column(name="sys_busi_unit", length=40)

    public String getSysBusiUnit() {
        return this.sysBusiUnit;
    }
    
    public void setSysBusiUnit(String sysBusiUnit) {
        this.sysBusiUnit = sysBusiUnit;
    }
    
    @Column(name="AC_NO", length=40)

    public String getAcNo() {
        return this.acNo;
    }
    
    public void setAcNo(String acNo) {
        this.acNo = acNo;
    }
    
    @Column(name="CCY", length=10)

    public String getCcy() {
        return this.ccy;
    }
    
    public void setCcy(String ccy) {
        this.ccy = ccy;
    }
    
    @Column(name="AC_NM", length=50)

    public String getAcNm() {
        return this.acNm;
    }
    
    public void setAcNm(String acNm) {
        this.acNm = acNm;
    }
    
    @Column(name="AC_BK_NM", length=50)

    public String getAcBkNm() {
        return this.acBkNm;
    }
    
    public void setAcBkNm(String acBkNm) {
        this.acBkNm = acBkNm;
    }
    
    @Column(name="AC_BK_NO", length=40)

    public String getAcBkNo() {
        return this.acBkNo;
    }
    
    public void setAcBkNo(String acBkNo) {
        this.acBkNo = acBkNo;
    }
    
    @Column(name="AC_TP", length=5)

    public String getAcTp() {
        return this.acTp;
    }
    
    public void setAcTp(String acTp) {
        this.acTp = acTp;
    }
    
    @Column(name="AC_FLAG", length=5)

    public String getAcFlag() {
        return this.acFlag;
    }
    
    public void setAcFlag(String acFlag) {
        this.acFlag = acFlag;
    }
    
    @Column(name="IS_AUTO_VERIF", length=5)

    public String getIsAutoVerif() {
        return this.isAutoVerif;
    }
    
    public void setIsAutoVerif(String isAutoVerif) {
        this.isAutoVerif = isAutoVerif;
    }
    
    @Column(name="VERIF_SEQ", length=5)

    public String getVerifSeq() {
        return this.verifSeq;
    }
    
    public void setVerifSeq(String verifSeq) {
        this.verifSeq = verifSeq;
    }
    
    @Column(name="IS_AUTO_TRANSFER", length=5)

    public String getIsAutoTransfer() {
        return this.isAutoTransfer;
    }
    
    public void setIsAutoTransfer(String isAutoTransfer) {
        this.isAutoTransfer = isAutoTransfer;
    }
    
    @Column(name="AC_OWNER_TYPE", length=5)

    public String getAcOwnerType() {
        return this.acOwnerType;
    }
    
    public void setAcOwnerType(String acOwnerType) {
        this.acOwnerType = acOwnerType;
    }
    
    @Column(name="AC_OWNERID", length=40)

    public String getAcOwnerid() {
        return this.acOwnerid;
    }
    
    public void setAcOwnerid(String acOwnerid) {
        this.acOwnerid = acOwnerid;
    }
    
    @Column(name="AC_OWNER_NAME", length=50)

    public String getAcOwnerName() {
        return this.acOwnerName;
    }
    
    public void setAcOwnerName(String acOwnerName) {
        this.acOwnerName = acOwnerName;
    }
    
    @Column(name="RELAV_OWNER_TYPE", length=5)

    public String getRelavOwnerType() {
        return this.relavOwnerType;
    }
    
    public void setRelavOwnerType(String relavOwnerType) {
        this.relavOwnerType = relavOwnerType;
    }
    
    @Column(name="RELAV_OWNERID", length=40)

    public String getRelavOwnerid() {
        return this.relavOwnerid;
    }
    
    public void setRelavOwnerid(String relavOwnerid) {
        this.relavOwnerid = relavOwnerid;
    }
    
    @Column(name="RELAV_OWNER_NM", length=50)

    public String getRelavOwnerNm() {
        return this.relavOwnerNm;
    }
    
    public void setRelavOwnerNm(String relavOwnerNm) {
        this.relavOwnerNm = relavOwnerNm;
    }
    
    @Column(name="RELAV_AC", length=40)

    public String getRelavAc() {
        return this.relavAc;
    }
    
    public void setRelavAc(String relavAc) {
        this.relavAc = relavAc;
    }
    
    @Column(name="RELAV_AC_ID", length=40)

    public String getRelavAcId() {
        return this.relavAcId;
    }
    
    public void setRelavAcId(String relavAcId) {
        this.relavAcId = relavAcId;
    }
    
    @Column(name="PROD_ID", length=40)

    public String getProdId() {
        return this.prodId;
    }
    
    public void setProdId(String prodId) {
        this.prodId = prodId;
    }
    
    @Column(name="PROD_DESC", length=50)

    public String getProdDesc() {
        return this.prodDesc;
    }
    
    public void setProdDesc(String prodDesc) {
        this.prodDesc = prodDesc;
    }
    
    @Column(name="REMARK", length=200)

    public String getRemark() {
        return this.remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Column(name="LICENCE_NO", length=32)
	public String getLicenceNo() {
		return licenceNo;
	}

	public void setLicenceNo(String licenceNo) {
		this.licenceNo = licenceNo;
	}

	@Column(name="BUYER_ID", length=35)
	public String getBuyerId() {
		return buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}