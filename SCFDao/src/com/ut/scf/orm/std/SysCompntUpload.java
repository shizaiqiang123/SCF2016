package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;


/**
 * SysCompntUpload entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name="sys_compnt_upload"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class SysCompntUpload  implements java.io.Serializable {


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
     private String trxId;
     private String trxEventTimes;
     private String uploadType;
     private String uploadDesc;
     private String uploadIsmust;
     private String templateUrl;
     private String configXml;
     private String sysBusiUnit;

    // Constructors

    /** default constructor */
    public SysCompntUpload() {
    }

	/** minimal constructor */
    public SysCompntUpload(String sysRefNo, Integer sysEventTimes) {
        this.sysRefNo = sysRefNo;
        this.sysEventTimes = sysEventTimes;
    }
    
    /** full constructor */
    public SysCompntUpload(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId, String sysTrxSts, Integer sysEventTimes, String trxId, String trxEventTimes, String uploadType, String uploadDesc, String uploadIsmust, String templateUrl, String configXml,String sysBusiUnit) {
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
        this.trxId = trxId;
        this.trxEventTimes = trxEventTimes;
        this.uploadType = uploadType;
        this.uploadDesc = uploadDesc;
        this.uploadIsmust = uploadIsmust;
        this.templateUrl = templateUrl;
        this.configXml = configXml;
        this.sysBusiUnit=sysBusiUnit;
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
    
    @Column(name="TRX_ID", length=40)

    public String getTrxId() {
        return this.trxId;
    }
    
    public void setTrxId(String trxId) {
        this.trxId = trxId;
    }
    
    @Column(name="TRX_EVENT_TIMES", length=6)

    public String getTrxEventTimes() {
        return this.trxEventTimes;
    }
    
    public void setTrxEventTimes(String trxEventTimes) {
        this.trxEventTimes = trxEventTimes;
    }
    
    @Column(name="UPLOAD_TYPE", length=10)

    public String getUploadType() {
        return this.uploadType;
    }
    
    public void setUploadType(String uploadType) {
        this.uploadType = uploadType;
    }
    
    @Column(name="UPLOAD_DESC", length=200)

    public String getUploadDesc() {
        return this.uploadDesc;
    }
    
    public void setUploadDesc(String uploadDesc) {
        this.uploadDesc = uploadDesc;
    }
    
    @Column(name="UPLOAD_ISMUST", length=10)

    public String getUploadIsmust() {
        return this.uploadIsmust;
    }
    
    public void setUploadIsmust(String uploadIsmust) {
        this.uploadIsmust = uploadIsmust;
    }
    
    @Column(name="TEMPLATE_URL", length=200)

    public String getTemplateUrl() {
        return this.templateUrl;
    }
    
    public void setTemplateUrl(String templateUrl) {
        this.templateUrl = templateUrl;
    }
    
    @Column(name="CONFIG_XML", length=200)

    public String getConfigXml() {
        return this.configXml;
    }
    
    public void setConfigXml(String configXml) {
        this.configXml = configXml;
    }
   
    @Column(name="sys_busi_unit", length=40)

    public String getSysBusiUnit() {
        return this.sysBusiUnit;
    }
    
    public void setSysBusiUnit(String sysBusiUnit) {
        this.sysBusiUnit = sysBusiUnit;
    }
    







}