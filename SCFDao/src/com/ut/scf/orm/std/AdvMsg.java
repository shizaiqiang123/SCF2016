package com.ut.scf.orm.std;

import java.sql.Blob;
import java.sql.Timestamp;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "ADV_MSG", schema = "STD")
public class AdvMsg {
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
	
	private String fromUid;
	
	private String fromUname;
	
	private String toUid;
	
	private String toUname;
	
	private String messageId;
	
	private Blob messageText;
	
	private Timestamp messageDate;
	
	private String statue;
	
	private String sendRole;
	
	public AdvMsg() {
		super();
	}
	
	public AdvMsg(
		String sysRefNo,
		String sysOpId,
		Timestamp sysOpTm,
		String sysRelId,
		Timestamp sysRelTm,
		String sysAuthId,
		Timestamp sysAuthTm,
		String sysNextOp,
		String sysLockFlag,
		String sysLockBy,
		String sysFuncId,
		String sysTrxSts,
		Integer sysEventTimes,
		String fromUid,
		String fromUname,
		String toUid,
		String toUname,
		String messageId,
		Blob messageText,
		Timestamp messageDate,
		String statue,
		String sendRole) {
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
		this.sysEventTimes = sysEventTimes;
		this.fromUid = fromUid;
		this.fromUname = fromUname;
		this.toUid = toUid;
		this.toUname = toUname;
		this.messageId = messageId;
		this.messageText = messageText;
		this.messageDate = messageDate;
		this.statue = statue;
		this.sendRole = sendRole;
	}
	
	@Id
	@Column(name = "SYS_REF_NO", unique = true, nullable = false, length = 35)
	public String getSysRefNo() {
		return sysRefNo;
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
	
	@Column(name = "SYS_OP_TM", length = 11)
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
	
	@Column(name = "SYS_REL_TM", length = 11)
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
	
	@Column(name = "SYS_AUTH_TM", length = 11)
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
	
	@Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 3, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}
	
	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}
	
	@Column(name = "FROM_UID", length = 32)
	public String getFromUid() {
		return fromUid;
	}	
	
	public void setFromUid(String fromUid) {
		this.fromUid = fromUid;
	}
	
	@Column(name = "FROM_UNAME", length = 200)
	public String getFromUname() {
		return fromUname;
	}
	
	public void setFromUname(String fromUname) {
		this.fromUname = fromUname;
	}
	
	@Column(name = "TO_UID", length = 32)
	public String getToUid() {
		return toUid;
	}
	
	public void setToUid(String toUid) {
		this.toUid = toUid;
	}
	
	@Column(name = "TO_UNAME", length = 200)
	public String getToUname() {
		return toUname;
	}
	
	public void setToUname(String toUname) {
		this.toUname = toUname;
	}
	
	@Column(name = "MESSAGE_ID", length = 32)
	public String getMessageId() {
		return messageId;
	}
	
	public void setMessageId(String messageId) {
		this.messageId = messageId;
	}
	
	@Lob 
	@Basic(fetch=FetchType.LAZY) 
	@Column(name="MESSAGE_TEXT", columnDefinition="BLOB", nullable=true)
	public Blob getMessageText() {
		return messageText;
	}
	
	public void setMessageText(Blob messageText) {
		this.messageText = messageText;
	}
	
	@Column(name = "MESSAGE_DATE", length = 11)
	public Timestamp getMessageDate() {
		return messageDate;
	}
	
	public void setMessageDate(Timestamp messageDate) {
		this.messageDate = messageDate;
	}
	
	@Column(name = "STATUE", length = 1)
	public String getStatue() {
		return statue;
	}
	
	public void setStatue(String statue) {
		this.statue = statue;
	}
	
	@Column(name = "SEND_ROLE", length = 32)
	public String getSendRole() {
		return sendRole;
	}
	
	public void setSendRole(String sendRole) {
		this.sendRole = sendRole;
	}
	
}
