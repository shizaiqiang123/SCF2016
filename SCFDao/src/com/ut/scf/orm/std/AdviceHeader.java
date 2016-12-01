package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * AdviceHeader entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "advice_header"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class AdviceHeader implements java.io.Serializable {

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
	private String sendId;
	private String sendNm;
	private String reSendId;
	private String msgTextId;
	private String msgTitle;
	private Timestamp msgSendDate;
	private Timestamp msgInvalidDate;
	private String msgStatue;
	private String msgRemindTp;
	private String msgGroupTp;
	private String msgGroup;
	private String msgGroupNm;
	private String msgSendTp;
	private String msgText;

	// Constructors

	/** default constructor */
	public AdviceHeader() {
	}

	/** minimal constructor */
	public AdviceHeader(String sysRefNo, Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm,
			Integer sysEventTimes, String sendId, Timestamp msgSendDate, Timestamp msgInvalidDate) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
		this.sendId = sendId;
		this.msgSendDate = msgSendDate;
		this.msgInvalidDate = msgInvalidDate;
	}

	/** full constructor */
	public AdviceHeader(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, Integer sysEventTimes, String sendId, String reSendId,
			String msgTextId, String msgTitle, Timestamp msgSendDate, Timestamp msgInvalidDate, String msgStatue,
			String msgRemindTp, String msgGroupTp, String msgGroup, String msgSendTp, String msgText,String msgGroupNm,String sendNm) {
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
		this.sendId = sendId;
		this.reSendId = reSendId;
		this.msgTextId = msgTextId;
		this.msgTitle = msgTitle;
		this.msgSendDate = msgSendDate;
		this.msgInvalidDate = msgInvalidDate;
		this.msgStatue = msgStatue;
		this.msgRemindTp = msgRemindTp;
		this.msgGroupTp = msgGroupTp;
		this.msgGroup = msgGroup;
		this.msgSendTp = msgSendTp;
		this.msgText = msgText;
		this.msgGroupNm = msgGroupNm;
		this.sendNm = sendNm;
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

	@Column(name = "SEND_ID", nullable = false, length = 35)
	public String getSendId() {
		return this.sendId;
	}

	public void setSendId(String sendId) {
		this.sendId = sendId;
	}

	@Column(name = "RE_SEND_ID", length = 35)
	public String getReSendId() {
		return this.reSendId;
	}

	public void setReSendId(String reSendId) {
		this.reSendId = reSendId;
	}

	@Column(name = "MSG_TEXT_ID", length = 35)
	public String getMsgTextId() {
		return this.msgTextId;
	}

	public void setMsgTextId(String msgTextId) {
		this.msgTextId = msgTextId;
	}

	@Column(name = "MSG_TITLE", length = 500)
	public String getMsgTitle() {
		return this.msgTitle;
	}

	public void setMsgTitle(String msgTitle) {
		this.msgTitle = msgTitle;
	}

	@Column(name = "MSG_SEND_DATE", nullable = false, length = 19)
	public Timestamp getMsgSendDate() {
		return this.msgSendDate;
	}

	public void setMsgSendDate(Timestamp msgSendDate) {
		this.msgSendDate = msgSendDate;
	}

	@Column(name = "MSG_INVALID_DATE", length = 19)
	public Timestamp getMsgInvalidDate() {
		return this.msgInvalidDate;
	}

	public void setMsgInvalidDate(Timestamp msgInvalidDate) {
		this.msgInvalidDate = msgInvalidDate;
	}

	@Column(name = "MSG_STATUE", length = 1)
	public String getMsgStatue() {
		return this.msgStatue;
	}

	public void setMsgStatue(String msgStatue) {
		this.msgStatue = msgStatue;
	}

	@Column(name = "MSG_REMIND_TP", length = 1)
	public String getMsgRemindTp() {
		return this.msgRemindTp;
	}

	public void setMsgRemindTp(String msgRemindTp) {
		this.msgRemindTp = msgRemindTp;
	}

	@Column(name = "MSG_GROUP_TP", length = 1)
	public String getMsgGroupTp() {
		return this.msgGroupTp;
	}

	public void setMsgGroupTp(String msgGroupTp) {
		this.msgGroupTp = msgGroupTp;
	}

	@Column(name = "MSG_GROUP", length = 35)
	public String getMsgGroup() {
		return this.msgGroup;
	}

	public void setMsgGroup(String msgGroup) {
		this.msgGroup = msgGroup;
	}

	@Column(name = "MSG_SEND_TP", length = 1)
	public String getMsgSendTp() {
		return this.msgSendTp;
	}

	public void setMsgSendTp(String msgSendTp) {
		this.msgSendTp = msgSendTp;
	}

	@Column(name = "MSG_TEXT")
	public String getMsgText() {
		return this.msgText;
	}

	public void setMsgText(String msgText) {
		this.msgText = msgText;
	}
	
	@Column(name = "SEND_NM", length = 70)
	public String getSendNm() {
		return sendNm;
	}

	public void setSendNm(String sendNm) {
		this.sendNm = sendNm;
	}

	@Column(name = "MSG_GROUP_NM", length = 70)
	public String getMsgGroupNm() {
		return msgGroupNm;
	}

	public void setMsgGroupNm(String msgGroupNm) {
		this.msgGroupNm = msgGroupNm;
	}

}