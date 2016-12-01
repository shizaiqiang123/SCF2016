package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * comFun entity. @author yhy 常用功能
 */
@Entity
@Table(name = "GAPI_MSG", schema = "STD")
@DynamicUpdate(true)
@DynamicInsert(true)
public class GapiMsg implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 638332737658975747L;
	// Fields
	private String sysRefNo;
	private String sysBusiUnit;
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
	private String gapiType;// in or out
	private String msgId;
	private String sendMessage;
	private String receiveMessage;
	private Integer resendTimes;
	private String trxRefNo;
	private Integer trxEventTimes;
	private String gapiName;
	private Integer msgSts;
	private String errorMsg;
	private String gapiId;
	private Integer gapiSts;
	private String relatedRefNo;
	

	// Constructors

	/** default constructor */
	public GapiMsg() {
		super();
		// TODO Auto-generated constructor stub
	}

	/** minimal constructor */
	public GapiMsg(String sysRefNo, Integer sysEventTimes, String msgId) {
		super();
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
		this.msgId = msgId;
	}

	/** full constructor */
	public GapiMsg(String sysRefNo, String sysBusiUnit, String sysOpId,
			Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp,
			String sysLockFlag, String sysLockBy, String sysFuncId,
			String sysTrxSts, Integer sysEventTimes, String gapiType,
			String msgId, String sendMessage, String receiveMessage,
			Integer resendTimes, String trxRefNo, Integer trxEventTimes,
			String gapiName, Integer msgSts,String relatedRefNo, String errorMsg,String gapiId,Integer gapiSts) {
		super();
		this.sysRefNo = sysRefNo;
		this.sysBusiUnit = sysBusiUnit;
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
		this.gapiType = gapiType;
		this.msgId = msgId;
		this.sendMessage = sendMessage;
		this.receiveMessage = receiveMessage;
		this.resendTimes = resendTimes;
		this.trxRefNo = trxRefNo;
		this.trxEventTimes = trxEventTimes;
		this.gapiName = gapiName;
		this.msgSts = msgSts;
		this.errorMsg = errorMsg;
		this.gapiId=gapiId;
		this.gapiSts=gapiSts;
		this.relatedRefNo=relatedRefNo;
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

	@Column(name = "sys_busi_unit", length = 35)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
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
	@Column(name = "GAPI_TYPE", length = 35)
	public String getGapiType() {
		return gapiType;
	}

	public void setGapiType(String gapiType) {
		this.gapiType = gapiType;
	}

	@Column(name = "MSG_ID", length = 35)
	public String getMsgId() {
		return msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}

	@Column(name = "SEND_MESSAGE")
	public String getSendMessage() {
		return sendMessage;
	}

	public void setSendMessage(String sendMessage) {
		this.sendMessage = sendMessage;
	}

	@Column(name = "RECEIVE_MESSAGE")
	public String getReceiveMessage() {
		return receiveMessage;
	}

	public void setReceiveMessage(String receiveMessage) {
		this.receiveMessage = receiveMessage;
	}
	
	@Column(name = "RESEND_TIMES")
	public Integer getResendTimes() {
		return resendTimes;
	}

	public void setResendTimes(Integer resendTimes) {
		this.resendTimes = resendTimes;
	}

	@Column(name = "TRX_REF_NO", length = 35)
	public String getTrxRefNo() {
		return trxRefNo;
	}

	public void setTrxRefNo(String trxRefNo) {
		this.trxRefNo = trxRefNo;
	}
	
	@Column(name = "TRX_EVENT_TIMES")
	public Integer getTrxEventTimes() {
		return trxEventTimes;
	}

	public void setTrxEventTimes(Integer trxEventTimes) {
		this.trxEventTimes = trxEventTimes;
	}

	@Column(name = "GAPI_NAME", length = 35)
	public String getGapiName() {
		return gapiName;
	}

	public void setGapiName(String gapiName) {
		this.gapiName = gapiName;
	}
	
	@Column(name = "MSG_STS", length = 35)
	public Integer getMsgSts() {
		return msgSts;
	}

	public void setMsgSts(Integer msgSts) {
		this.msgSts = msgSts;
	}

	@Column(name = "ERROR_MSG", length = 800)
	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	@Column(name = "GAPI_ID", length = 35)
	public String getGapiId() {
		return gapiId;
	}

	public void setGapiId(String gapiId) {
		this.gapiId = gapiId;
	}

	
	@Column(name = "GAPI_STS", length = 35)
	public Integer getGapiSts() {
		return gapiSts;
	}

	public void setGapiSts(Integer gapiSts) {
		this.gapiSts = gapiSts;
	}

	@Column(name = "RELATED_REF_NO", length = 35)
	public String getRelatedRefNo() {
		return relatedRefNo;
	}

	public void setRelatedRefNo(String relatedRefNo) {
		this.relatedRefNo = relatedRefNo;
	}

	

}