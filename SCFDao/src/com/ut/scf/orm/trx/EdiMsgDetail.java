package com.ut.scf.orm.trx;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * AdviceDetail entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "edi_msg_detail", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class EdiMsgDetail implements java.io.Serializable {

	// change name to ESB_EDI_DETAIL
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
	private String msgTp;
	private String sendStatus;
	private String funcId;
	private String funcRef;
	private String msgText;
	private Integer funcEventTimes;
	private Integer msgIndex;
	/**
	 * I:incoing O:outgoing
	 */
	private String msgModle;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public EdiMsgDetail() {
	}

	/** minimal constructor */
	public EdiMsgDetail(String sysRefNo, Timestamp sysOpTm, Timestamp sysRelTm,
			Timestamp sysAuthTm, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public EdiMsgDetail(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String msgTp, String sendStatus,
			String funcId, String funcRef, String msgText,
			Integer funcEventTimes, Integer msgIndex, String msgModle,
			String sysOrgId) {
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
		this.msgTp = msgTp;
		this.sendStatus = sendStatus;
		this.funcId = funcId;
		this.funcRef = funcRef;
		this.msgText = msgText;
		this.funcEventTimes = funcEventTimes;
		this.msgIndex = msgIndex;
		this.msgModle = msgModle;
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "MSG_TP", length = 1)
	public String getMsgTp() {
		return msgTp;
	}

	public void setMsgTp(String msgTp) {
		this.msgTp = msgTp;
	}

	@Column(name = "SEND_STATUS", length = 1)
	public String getSendStatus() {
		return sendStatus;
	}

	public void setSendStatus(String sendStatus) {
		this.sendStatus = sendStatus;
	}

	@Column(name = "FUNC_ID", length = 35)
	public String getFuncId() {
		return funcId;
	}

	public void setFuncId(String funcId) {
		this.funcId = funcId;
	}

	@Column(name = "FUNC_REF", length = 35)
	public String getFuncRef() {
		return funcRef;
	}

	public void setFuncRef(String funcRef) {
		this.funcRef = funcRef;
	}

	@Column(name = "MSG_TEXT")
	public String getMsgText() {
		return msgText;
	}

	public void setMsgText(String msgText) {
		this.msgText = msgText;
	}

	@Column(name = "FUNC_EVENT_TIMES", nullable = false)
	public Integer getFuncEventTimes() {
		return funcEventTimes;
	}

	public void setFuncEventTimes(Integer funcEventTimes) {
		this.funcEventTimes = funcEventTimes;
	}

	@Column(name = "MSG_INDEX", nullable = false)
	public Integer getMsgIndex() {
		return msgIndex;
	}

	public void setMsgIndex(Integer msgIndex) {
		this.msgIndex = msgIndex;
	}

	@Column(name = "MSG_MODLE", length = 1)
	public String getMsgModle() {
		return msgModle;
	}

	public void setMsgModle(String msgModle) {
		this.msgModle = msgModle;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}