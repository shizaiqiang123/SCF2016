package com.ut.scf.orm.std;

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
 * ParaDefineE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "para_define_e"    ,schema="STD"
		)
@DynamicUpdate(true)
@DynamicInsert(true)
public class ParaDefineE implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = -7845140386058090175L;
	private ParaDefineEId id;
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
	private String sysRelReason;
	private String paraId;
	private String paraName;
	private String paraDesc;
	private String paraBu;
	private String paraTp;
	private String paraPath;
	//添加
	private String sysBusiUnit;
	private String sysFuncName;

	// Constructors

	/** default constructor */
	public ParaDefineE() {
	}

	/** minimal constructor */
	public ParaDefineE(ParaDefineEId id, Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm) {
		this.id = id;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
	}

	/** full constructor */
	public ParaDefineE(ParaDefineEId id, String sysOpId, String sysFuncName,Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, String sysRelReason, String paraId, String paraName, String paraDesc,
			String paraBu, String paraTp, String paraPath,String sysBusiUnit) {
		this.id = id;
		this.sysOpId = sysOpId;
		this.sysFuncName = sysFuncName;
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
		this.sysRelReason = sysRelReason;
		this.paraId = paraId;
		this.paraName = paraName;
		this.paraDesc = paraDesc;
		this.paraBu = paraBu;
		this.paraTp = paraTp;
		this.paraPath = paraPath;
		this.sysBusiUnit = sysBusiUnit;
	}
	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false)) })
	public ParaDefineEId getId() {
		return this.id;
	}

	public void setId(ParaDefineEId id) {
		this.id = id;
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

	@Column(name = "SYS_REL_TM",  length = 19)
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

	@Column(name = "SYS_AUTH_TM",  length = 19)
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

	@Column(name = "SYS_REL_REASON")
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "para_id", length = 35)
	public String getParaId() {
		return this.paraId;
	}

	public void setParaId(String paraId) {
		this.paraId = paraId;
	}

	@Column(name = "para_NAME", length = 35)
	public String getParaName() {
		return this.paraName;
	}

	public void setParaName(String paraName) {
		this.paraName = paraName;
	}

	@Column(name = "para_desc", length = 35)
	public String getParaDesc() {
		return this.paraDesc;
	}

	public void setParaDesc(String paraDesc) {
		this.paraDesc = paraDesc;
	}

	@Column(name = "para_bu", length = 35)
	public String getParaBu() {
		return this.paraBu;
	}

	public void setParaBu(String paraBu) {
		this.paraBu = paraBu;
	}

	@Column(name = "para_tp", length = 10)
	public String getParaTp() {
		return this.paraTp;
	}

	public void setParaTp(String paraTp) {
		this.paraTp = paraTp;
	}

	@Column(name = "para_path", length = 10)
	public String getParaPath() {
		return this.paraPath;
	}

	public void setParaPath(String paraPath) {
		this.paraPath = paraPath;
	}
     
	@Column(name = "sys_busi_unit", length = 35)
	public String getSysBusiUnit() {
		return sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}
	
	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}
}