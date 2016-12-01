package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * ADVICE_LINK entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "advice_link",schema="STD")
@DynamicUpdate(true)
@DynamicInsert(true)
public class AdviceLink implements java.io.Serializable {

	private static final long serialVersionUID = -8561812566692055700L;

	private String sysRefNo;
	
	private String sendId;
	private String recId;
	private Timestamp sendDt;
	private String msgId;
	private Integer messageType;
	
	/*
	CRTF_NO
	CNTRCT_NO
	BILL_NO
    */
	private String crtfNo;
    private String billNo;
    private String cntrctNo;
    //CRET_CODE
    private String cretCode;
    /*
    BUYER_ID
	SEL_ID
	INV_NO
	*/
    private String buyerId;
	private String selId;
	private String invNo;
	/*
	LOAN_NO
	*/
	private String loanNo;
	//业务类别 add by YeQing 2016-9-22
	private String busiTp;
	
	public AdviceLink() {}

	public AdviceLink(String sysRefNo, Timestamp sendDt,String cntrctNo,
			          String billNo,String crtfNo,String cretCode,
			          String buyerId, String selId, String invNo,
			          String loanNo,String busiTp
		   ) {
		
		this.sysRefNo  = sysRefNo;
		this.sendDt = sendDt;
		this.cntrctNo = cntrctNo;
		this.billNo = billNo;
		this.crtfNo = crtfNo;
		this.cretCode = cretCode;
		
		this.buyerId = buyerId;
		this.selId   = selId;
		this.invNo   = invNo;
		this.loanNo   = loanNo;
		this.busiTp   = busiTp;
	}


	public AdviceLink(String sysRefNo, String msgId, String sendId, String recId,
					  Integer messageType, Timestamp sendDt,String cntrctNo,String billNo,
					  String crtfNo,String cretCode,String loanNo,
					  String buyerId, String selId, String invNo,String busiTp) {
		
		this.sysRefNo = sysRefNo;
		this.msgId = msgId;
		this.sendId = sendId;
		this.recId = recId;
		this.sendDt = sendDt;
		this.messageType = messageType;
		
		this.cntrctNo = cntrctNo;
		this.billNo = billNo;
		this.crtfNo = crtfNo;
		this.cretCode = cretCode;
		
		this.buyerId = buyerId;
		this.selId   = selId;
		this.invNo   = invNo;
		
		this.loanNo   = loanNo;
		this.busiTp   = busiTp;
	}

	@Column(name = "LOAN_NO", length = 35)
	public String getLoanNo() {
		return loanNo;
	}
	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return buyerId;
	}
	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return selId;
	}
	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "INV_NO", length = 35)
	public String getInvNo() {
		return invNo;
	}
	public void setInvNo(String invNo) {
		this.invNo = invNo;
	}

	@Id
	@Column(name = "SYS_REF_NO", unique = true, nullable = false, length = 35)
	public String getSysRefNo() {
		return this.sysRefNo;
	}

	public void setSysRefNo(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}
	
	@Column(name = "CRET_CODE", length = 35)
	public String getCretCode() {
		return cretCode;
	}
	public void setCretCode(String cretCode) {
		this.cretCode = cretCode;
	}

	@Column(name = "MESSAGE_TYPE", nullable = false)
	public Integer getMessageType() {
		return this.messageType;
	}

	public void setMessageType(Integer messageType) {
		this.messageType = messageType;
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

	@Column(name = "SEND_DT", length = 19)
	public Timestamp getSendDt() {
		return this.sendDt;
	}

	public void setSendDt(Timestamp sendDt) {
		this.sendDt = sendDt;
	}
	
	@Column(name="CNTRCT_NO", length=35)
    public String getCntrctNo() {
        return this.cntrctNo;
    }
    public void setCntrctNo(String cntrctNo) {
        this.cntrctNo = cntrctNo;
    }
    
    @Column(name="BILL_NO", length=35)
    public String getBillNo() {
        return this.billNo;
    }
    public void setBillNo(String billNo) {
        this.billNo = billNo;
    }
    
    @Column(name="CRTF_NO", length=35)
    public String getCrtfNo() {
        return this.crtfNo;
    }
    public void setCrtfNo(String crtfNo) {
        this.crtfNo = crtfNo;
    }

    @Column(name = "BUSI_TP", length = 8)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}
}