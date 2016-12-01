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

@Entity
@Table(name = "fund_ref_e"
,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class FundRefE implements java.io.Serializable{
	private FundRefEId id;
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
	private String sysBusiUnit;
	private String sysGapiSts;
	private String payAcNo;
	private String selAcNo;
	private BigDecimal ttlPmtAmt;
	private Timestamp pmtDt;
	private String payerNm;
	private String bkCd;
	private String remark;
	private String compSts;
	private String theirRef;
	private Timestamp trxDt;
	private String sysRelReason;
	private String sysFuncName;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	
	
	/** default constructor */
	public FundRefE() {
	}
	
	/** minimal constructor */
	public FundRefE(FundRefEId id) {
		this.id = id;
	}

	/** full constructor */
	public FundRefE(FundRefEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String sysBusiUnit, String sysGapiSts, String payAcNo,
			String selAcNo, BigDecimal ttlPmtAmt, Timestamp pmtDt,String sysFuncName,
			String payerNm, String bkCd, String remark, String compSts,
			String sysRelReason,String theirRef,Timestamp trxDt,String sysOrgId) {
		super();
		this.sysFuncName = sysFuncName;
		this.id = id;
		this.sysOpId = sysOpId;
		this.sysOpTm = sysOpTm;
		this.sysRelId = sysRelId;
		this.sysRelTm = sysRelTm;
		this.sysAuthId = sysAuthId;
		this.sysRelReason = sysRelReason;
		this.sysAuthTm = sysAuthTm;
		this.sysNextOp = sysNextOp;
		this.sysLockFlag = sysLockFlag;
		this.sysLockBy = sysLockBy;
		this.sysFuncId = sysFuncId;
		this.sysTrxSts = sysTrxSts;
		this.sysBusiUnit = sysBusiUnit;
		this.sysGapiSts = sysGapiSts;
		this.payAcNo = payAcNo;
		this.selAcNo = selAcNo;
		this.ttlPmtAmt = ttlPmtAmt;
		this.pmtDt = pmtDt;
		this.payerNm = payerNm;
		this.bkCd = bkCd;
		this.remark = remark;
		this.compSts = compSts;
		this.theirRef = theirRef;
		this.trxDt = trxDt;
		this.sysOrgId = sysOrgId;
	}
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false)) })
	public FundRefEId getId(){
		return this.id;
	}
	public void setId(FundRefEId id){
		this.id=id;
	}
	@Column(name = "SYS_OP_ID", length = 35)
	public String getSysOpId() {
		return this.sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
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

	

	@Column(name = "SYS_BUSI_UNIT", length = 40)
	public String getSysBusiUnit() {
		return sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "PAY_AC_NO", length = 35)
	public String getPayAcNo() {
		return payAcNo;
	}

	public void setPayAcNo(String payAcNo) {
		this.payAcNo = payAcNo;
	}

	@Column(name = "sel_AC_NO", length = 35)
	public String getSelAcNo() {
		return selAcNo;
	}

	public void setSelAcNo(String selAcNo) {
		this.selAcNo = selAcNo;
	}

    @Column(name="TTL_PMT_AMT", precision=18, scale=4)
	public BigDecimal getTtlPmtAmt() {
		return ttlPmtAmt;
	}

	public void setTtlPmtAmt(BigDecimal ttlPmtAmt) {
		this.ttlPmtAmt = ttlPmtAmt;
	}

	@Column(name = "PMT_DT", length = 19)
	public Timestamp getPmtDt() {
		return pmtDt;
	}

	public void setPmtDt(Timestamp pmtDt) {
		this.pmtDt = pmtDt;
	}

	@Column(name = "PAYER_NM", length = 70)
	public String getPayerNm() {
		return payerNm;
	}

	public void setPayerNm(String payerNm) {
		this.payerNm = payerNm;
	}

	@Column(name = "BK_CD", length = 35)
	public String getBkCd() {
		return bkCd;
	}

	public void setBkCd(String bkCd) {
		this.bkCd = bkCd;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "COMP_STS", length = 3)
	public String getCompSts() {
		return compSts;
	}

	public void setCompSts(String compSts) {
		this.compSts = compSts;
	}

	@Column(name = "THEIR_REF", length = 35)
	public String getTheirRef() {
		return theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
	}
	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}
	

	@Column(name = "TRX_DT", length = 11)
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}
	
	@Column(name = "SYS_REL_REASON", length = 65535)
	public String getSysRelReason() {
		return this.sysRelReason;
	}
	
	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}
