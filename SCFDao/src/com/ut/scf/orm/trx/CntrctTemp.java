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
 * CntrctTemp entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "cntrct_temp", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CntrctTemp implements java.io.Serializable {

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
	private String sysGapiSts;
	private Integer sysEventTimes;
	private String editionNo;
	private String cntrctNm;
	private String cntrctURL;
	private Timestamp dueDt;
	private String productNm;
	private String productId;
	private String busiTp;
	private String payChgTp;
	private String payIntTp;
	private BigDecimal verifPerc;
	private BigDecimal verifLimit;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public CntrctTemp() {
	}

	/** minimal constructor */
	public CntrctTemp(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CntrctTemp(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String sysGapiSts, Integer sysEventTimes, String editionNo,
			String cntrctNm, String cntrctURL, Timestamp dueDt,
			String productNm, String productId, String busiTp, String payChgTp,
			String payIntTp,BigDecimal verifPerc, BigDecimal verifLimit,String sysOrgId) {
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
		this.sysGapiSts = sysGapiSts;
		this.sysEventTimes = sysEventTimes;
		this.editionNo = editionNo;
		this.cntrctNm = cntrctNm;
		this.cntrctURL = cntrctURL;
		this.dueDt = dueDt;
		this.productNm = productNm;
		this.productId = productId;
		this.busiTp = busiTp;
		this.payChgTp = payChgTp;
		this.payIntTp = payIntTp;
		this.verifPerc = verifPerc;
		this.verifLimit = verifLimit;
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

	@Column(name = "SYS_OP_ID", length = 35)
	public String getSysOpId() {
		return this.sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_OP_TM", length = 19)
	public Timestamp getSysOpTm() {
		return this.sysOpTm;
	}

	public void setSysOpTm(Timestamp sysOpTm) {
		this.sysOpTm = sysOpTm;
	}

	@Column(name = "SYS_REL_ID", length = 35)
	public String getSysRelId() {
		return this.sysRelId;
	}

	public void setSysRelId(String sysRelId) {
		this.sysRelId = sysRelId;
	}

	@Column(name = "SYS_REL_TM", length = 19)
	public Timestamp getSysRelTm() {
		return this.sysRelTm;
	}

	public void setSysRelTm(Timestamp sysRelTm) {
		this.sysRelTm = sysRelTm;
	}

	@Column(name = "SYS_AUTH_ID", length = 35)
	public String getSysAuthId() {
		return this.sysAuthId;
	}

	public void setSysAuthId(String sysAuthId) {
		this.sysAuthId = sysAuthId;
	}

	@Column(name = "SYS_AUTH_TM", length = 19)
	public Timestamp getSysAuthTm() {
		return this.sysAuthTm;
	}

	public void setSysAuthTm(Timestamp sysAuthTm) {
		this.sysAuthTm = sysAuthTm;
	}

	@Column(name = "SYS_NEXT_OP", length = 35)
	public String getSysNextOp() {
		return this.sysNextOp;
	}

	public void setSysNextOp(String sysNextOp) {
		this.sysNextOp = sysNextOp;
	}

	@Column(name = "SYS_LOCK_FLAG", length = 1)
	public String getSysLockFlag() {
		return this.sysLockFlag;
	}

	public void setSysLockFlag(String sysLockFlag) {
		this.sysLockFlag = sysLockFlag;
	}

	@Column(name = "SYS_LOCK_BY", length = 35)
	public String getSysLockBy() {
		return this.sysLockBy;
	}

	public void setSysLockBy(String sysLockBy) {
		this.sysLockBy = sysLockBy;
	}

	@Column(name = "SYS_FUNC_ID", length = 35)
	public String getSysFuncId() {
		return this.sysFuncId;
	}

	public void setSysFuncId(String sysFuncId) {
		this.sysFuncId = sysFuncId;
	}

	@Column(name = "SYS_TRX_STS", length = 1)
	public String getSysTrxSts() {
		return this.sysTrxSts;
	}

	public void setSysTrxSts(String sysTrxSts) {
		this.sysTrxSts = sysTrxSts;
	}

	@Column(name = "SYS_EVENT_TIMES", nullable = false)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "EDITION_NO", length = 35)
	public String getEditionNo() {
		return this.editionNo;
	}

	public void setEditionNo(String editionNo) {
		this.editionNo = editionNo;
	}

	@Column(name = "DUE_DT", length = 19)
	public Timestamp getDueDt() {
		return this.dueDt;
	}

	public void setDueDt(Timestamp dueDt) {
		this.dueDt = dueDt;
	}

	@Column(name = "CNTRCT_NM", length = 100)
	public String getCntrctNm() {
		return cntrctNm;
	}

	public void setCntrctNm(String cntrctNm) {
		this.cntrctNm = cntrctNm;
	}

	@Column(name = "CNTRCT_URL", length = 100)
	public String getCntrctURL() {
		return cntrctURL;
	}

	public void setCntrctURL(String cntrctURL) {
		this.cntrctURL = cntrctURL;
	}
	
	@Column(name = "PRODUCT_NM", length = 50)
	public String getProductNm() {
		return productNm;
	}

	public void setProductNm(String productNm) {
		this.productNm = productNm;
	}

	@Column(name = "PRODUCT_ID", length = 35)
	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}
	
	@Column(name = "BUSI_TP", length = 10)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}
	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}
	
	@Column(name = "PAY_CHG_TP", length = 5)
	public String getPayChgTp() {
		return payChgTp;
	}

	public void setPayChgTp(String payChgTp) {
		this.payChgTp = payChgTp;
	}
	
	@Column(name = "PAY_INT_TP", length = 5)
	public String getPayIntTp() {
		return payIntTp;
	}

	public void setPayIntTp(String payIntTp) {
		this.payIntTp = payIntTp;
	}
	
	@Column(name = "VERIF_PERC", precision = 18, scale = 4)
	public BigDecimal getVerifPerc() {
		return verifPerc;
	}

	public void setVerifPerc(BigDecimal verifPerc) {
		this.verifPerc = verifPerc;
	}

	@Column(name = "VERIF_LIMIT", precision = 18, scale = 4)
	public BigDecimal getVerifLimit() {
		return verifLimit;
	}

	public void setVerifLimit(BigDecimal verifLimit) {
		this.verifLimit = verifLimit;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}