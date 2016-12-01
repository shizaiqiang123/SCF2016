package com.ut.scf.orm.std;

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
 * StdCustClE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "std_cust_cl_e"
,schema="STD"
)

@DynamicUpdate(true)
@DynamicInsert(true)
public class StdCustClE implements java.io.Serializable {

	// Fields

	private StdCustClEId id;
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
	private String clDesc;
	private String clParentId;
	private String custId;
	private String custTp;
	private String clFrameId;
	private String ccy;
	private BigDecimal creditAmt;
	private Timestamp validDt;
	private Timestamp dueDt;
	private String isRecycle;
	private String isAva;
	private String isShare;
	private String rtTp;
	private String isFreeze;
	private Timestamp freezeDt;
	private String freezeRsn;
	private BigDecimal exposureAmt;
	private String sysFuncName;
	
	// Constructors

	/** default constructor */
	public StdCustClE() {
	}

	/** minimal constructor */
	public StdCustClE(StdCustClEId id,String sysFuncName, Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm, String custTp,
			Timestamp validDt, Timestamp dueDt, Timestamp freezeDt) {
		this.id = id;
		this.sysOpTm = sysOpTm;
		this.sysFuncName = sysFuncName;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.custTp = custTp;
		this.validDt = validDt;
		this.dueDt = dueDt;
		this.freezeDt = freezeDt;
	}

	/** full constructor */
	public StdCustClE(StdCustClEId id, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, String clDesc, String clParentId, String custId, String custTp,
			String clFrameId, String ccy, BigDecimal creditAmt, Timestamp validDt, Timestamp dueDt, String isRecycle,
			String isAva, String isShare, String rtTp, String isFreeze, Timestamp freezeDt, String freezeRsn,
			BigDecimal exposureAmt) {
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
		this.clDesc = clDesc;
		this.clParentId = clParentId;
		this.custId = custId;
		this.custTp = custTp;
		this.clFrameId = clFrameId;
		this.ccy = ccy;
		this.creditAmt = creditAmt;
		this.validDt = validDt;
		this.dueDt = dueDt;
		this.isRecycle = isRecycle;
		this.isAva = isAva;
		this.isShare = isShare;
		this.rtTp = rtTp;
		this.isFreeze = isFreeze;
		this.freezeDt = freezeDt;
		this.freezeRsn = freezeRsn;
		this.exposureAmt = exposureAmt;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false)) })
	public StdCustClEId getId() {
		return this.id;
	}

	public void setId(StdCustClEId id) {
		this.id = id;
	}

	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}
	
	@Column(name = "SYS_OP_ID", length = 35)
	public String getSysOpId() {
		return this.sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_OP_TM", nullable = false, length = 19)
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

	@Column(name = "SYS_REL_TM", nullable = true, length = 19)
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

	@Column(name = "SYS_AUTH_TM", nullable = true, length = 19)
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

	@Column(name = "CL_DESC", length = 70)
	public String getClDesc() {
		return this.clDesc;
	}

	public void setClDesc(String clDesc) {
		this.clDesc = clDesc;
	}

	@Column(name = "CL_PARENT_ID", length = 35)
	public String getClParentId() {
		return this.clParentId;
	}

	public void setClParentId(String clParentId) {
		this.clParentId = clParentId;
	}

	@Column(name = "CUST_ID", length = 35)
	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	@Column(name = "CUST_TP", nullable = false, length = 1)
	public String getCustTp() {
		return this.custTp;
	}

	public void setCustTp(String custTp) {
		this.custTp = custTp;
	}

	@Column(name = "CL_FRAME_ID", length = 35)
	public String getClFrameId() {
		return this.clFrameId;
	}

	public void setClFrameId(String clFrameId) {
		this.clFrameId = clFrameId;
	}

	@Column(name = "CCY", length = 10)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "CREDIT_AMT", precision = 18, scale =4 )
	public BigDecimal getCreditAmt() {
		return this.creditAmt;
	}

	public void setCreditAmt(BigDecimal creditAmt) {
		this.creditAmt = creditAmt;
	}

	@Column(name = "VALID_DT", nullable = false, length = 19)
	public Timestamp getValidDt() {
		return this.validDt;
	}

	public void setValidDt(Timestamp validDt) {
		this.validDt = validDt;
	}

	@Column(name = "DUE_DT", nullable = false, length = 19)
	public Timestamp getDueDt() {
		return this.dueDt;
	}

	public void setDueDt(Timestamp dueDt) {
		this.dueDt = dueDt;
	}

	@Column(name = "IS_RECYCLE", length = 1)
	public String getIsRecycle() {
		return this.isRecycle;
	}

	public void setIsRecycle(String isRecycle) {
		this.isRecycle = isRecycle;
	}

	@Column(name = "IS_AVA", length = 1)
	public String getIsAva() {
		return this.isAva;
	}

	public void setIsAva(String isAva) {
		this.isAva = isAva;
	}

	@Column(name = "IS_SHARE", length = 1)
	public String getIsShare() {
		return this.isShare;
	}

	public void setIsShare(String isShare) {
		this.isShare = isShare;
	}

	@Column(name = "RT_TP", length = 1)
	public String getRtTp() {
		return this.rtTp;
	}

	public void setRtTp(String rtTp) {
		this.rtTp = rtTp;
	}

	@Column(name = "IS_FREEZE", length = 1)
	public String getIsFreeze() {
		return this.isFreeze;
	}

	public void setIsFreeze(String isFreeze) {
		this.isFreeze = isFreeze;
	}

	@Column(name = "FREEZE_DT", nullable = false, length = 19)
	public Timestamp getFreezeDt() {
		return this.freezeDt;
	}

	public void setFreezeDt(Timestamp freezeDt) {
		this.freezeDt = freezeDt;
	}

	@Column(name = "FREEZE_RSN", length = 50)
	public String getFreezeRsn() {
		return this.freezeRsn;
	}

	public void setFreezeRsn(String freezeRsn) {
		this.freezeRsn = freezeRsn;
	}

	@Column(name = "EXPOSURE_AMT", precision = 18, scale = 4)
	public BigDecimal getExposureAmt() {
		return this.exposureAmt;
	}

	public void setExposureAmt(BigDecimal exposureAmt) {
		this.exposureAmt = exposureAmt;
	}

}