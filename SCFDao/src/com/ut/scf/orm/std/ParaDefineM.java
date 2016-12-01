package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * ParaDefineM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "para_define_m",schema="STD"
		)
@DynamicUpdate(true)
@DynamicInsert(true)
public class ParaDefineM implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = -1690197553211563085L;
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
	public ParaDefineM() {
	}

	/** minimal constructor */
	public ParaDefineM(String sysRefNo, Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm,
			Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public ParaDefineM(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, Integer sysEventTimes, String sysFuncName,String paraId, String paraName, String paraDesc,
			String paraBu, String paraTp, String paraPath,String sysBusiUnit) {
		this.sysRefNo = sysRefNo;
		this.sysOpId = sysOpId;
		this.sysOpTm = sysOpTm;
		this.sysRelId = sysRelId;
		this.sysFuncName = sysFuncName;
		this.sysRelTm = sysRelTm;
		this.sysAuthId = sysAuthId;
		this.sysAuthTm = sysAuthTm;
		this.sysNextOp = sysNextOp;
		this.sysLockFlag = sysLockFlag;
		this.sysLockBy = sysLockBy;
		this.sysFuncId = sysFuncId;
		this.sysTrxSts = sysTrxSts;
		this.sysEventTimes = sysEventTimes;
		this.paraId = paraId;
		this.paraName = paraName;
		this.paraDesc = paraDesc;
		this.paraBu = paraBu;
		this.paraTp = paraTp;
		this.paraPath = paraPath;
		this.sysBusiUnit = sysBusiUnit;
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

	/**
	 * @see 
	 *  function : fu
	 * 	account : ac
	 * 	batch : ba
	 * 	catalog : ca
	 *  inqdata : in
	 *  logicflow : lf
	 *  page : pa
	 *  query : qu
	 *  report : re
	 *  service : se
	 *  esbservice : es
	 *  syst : syst
	 *  task : ta
	 *  template : tl
	 *  workflow : wf
	 * @return
	 */
	@Column(name = "para_tp", length = 10)
	public String getParaTp() {
		return this.paraTp;
	}

	public void setParaTp(String paraTp) {
		this.paraTp = paraTp;
	}

	/**
	 * @see
	 * 	function : func
	 * 	account : accounting
	 * 	batch : batch
	 * 	catalog : cata
	 *  inqdata : inqdata
	 *  logicflow : logicflow
	 *  page : page
	 *  query : query
	 *  report : report
	 *  service : service
	 *  esbservice : esb/services
	 *  syst : syst
	 *  task : task
	 *  template : template
	 *  workflow : workflow
	 * 	js : js/*
	 * @return
	 */
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