package com.ut.scf.orm.std;

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
@Table(name = "advice_client",schema="STD")
@DynamicUpdate(true)
@DynamicInsert(true)
public class AdviceClient implements java.io.Serializable {

	private static final long serialVersionUID = -2963893243404978495L;
	
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
	private String msgId;
	private String sendId;
	private String recId;
	private String msgTextId;
	private String msgTitle;
	private String msgStatus;
	private String msgRemindTp;
	private Timestamp msgRemaindDate;
	private Timestamp msgRecDate;
	private Timestamp msgSendDate;
	private String sendNm;
	private String msgText;
	//业务类别 add by YeQing 2016-9-22
	private String busiTp;

	public AdviceClient() {}

	public AdviceClient(String sysRefNo, Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm,
			            Integer sysEventTimes, Timestamp msgRemaindDate, Timestamp msgRecDate,
			            Timestamp msgSendDate,String busiTp) {
		
		this.sysRefNo  = sysRefNo;
		this.sysOpTm   = sysOpTm;
		this.sysRelTm  = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes  = sysEventTimes;
		this.msgRemaindDate = msgRemaindDate;
		this.msgRecDate  = msgRecDate;
		this.msgSendDate = msgSendDate;
		this.busiTp = busiTp;
	}


	public AdviceClient(String sysRefNo, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
						String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
						String sysFuncId, String sysTrxSts, Integer sysEventTimes, String msgId, String sendId, String recId,
						String msgTextId, String msgTitle, String msgStatus, String msgRemindTp, Timestamp msgRemaindDate,
						Timestamp msgRecDate,Timestamp msgSendDate,String sendNm,String msgText,String busiTp) {
		
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
		this.msgId = msgId;
		this.sendId = sendId;
		this.recId = recId;
		this.msgTextId = msgTextId;
		this.msgTitle = msgTitle;
		this.msgStatus = msgStatus;
		this.msgRemindTp = msgRemindTp;
		this.msgRemaindDate = msgRemaindDate;
		this.msgRecDate = msgRecDate;
		this.msgSendDate = msgSendDate;
		this.sendNm = sendNm;
		this.msgText = msgText;
		this.busiTp = busiTp;
	}

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

	@Column(name = "MSG_ID", length = 35)
	public String getMsgId() {
		return this.msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}

	@Column(name = "SEND_ID", length = 35)
	public String getSendId() {
		return this.sendId;
	}

	public void setSendId(String sendId) {
		this.sendId = sendId;
	}

	@Column(name = "REC_ID", length = 35)
	public String getRecId() {
		return this.recId;
	}

	public void setRecId(String recId) {
		this.recId = recId;
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

	@Column(name = "MSG_STATUS", length = 1)
	public String getMsgStatus() {
		return this.msgStatus;
	}

	public void setMsgStatus(String msgStatus) {
		this.msgStatus = msgStatus;
	}

	@Column(name = "MSG_REMIND_TP", length = 1)
	public String getMsgRemindTp() {
		return this.msgRemindTp;
	}

	public void setMsgRemindTp(String msgRemindTp) {
		this.msgRemindTp = msgRemindTp;
	}

	@Column(name = "MSG_REMAIND_DATE", length = 19)
	public Timestamp getMsgRemaindDate() {
		return this.msgRemaindDate;
	}

	public void setMsgRemaindDate(Timestamp msgRemaindDate) {
		this.msgRemaindDate = msgRemaindDate;
	}

	@Column(name = "MSG_REC_DATE", length = 19)
	public Timestamp getMsgRecDate() {
		return this.msgRecDate;
	}

	public void setMsgRecDate(Timestamp msgRecDate) {
		this.msgRecDate = msgRecDate;
	}
	
	@Column(name = "MSG_SEND_DATE", length = 19)
	public Timestamp getMsgSendDate() {
		return msgSendDate;
	}

	public void setMsgSendDate(Timestamp msgSendDate) {
		this.msgSendDate = msgSendDate;
	}
	@Column(name = "SEND_NM", length = 70)
	public String getSendNm() {
		return sendNm;
	}

	public void setSendNm(String sendNm) {
		this.sendNm = sendNm;
	}
	
	@Column(name = "MSG_TEXT")
	public String getMsgText() {
		return this.msgText;
	}

	public void setMsgText(String msgText) {
		this.msgText = msgText;
	}

	@Column(name = "BUSI_TP", length = 8)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}
}