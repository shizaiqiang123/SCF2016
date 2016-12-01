package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * HostSerials entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "HOST_SERIALS", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class HostSerials implements java.io.Serializable {

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
	private String instNo;
	private String custNo;
	private String custName;
	private String cntrctNo;
	private String prdCode;
	private String prdName;
	private String refNo;
	private String bizDt;
	private String tradeTm;
	private String serialNo;
	private String tradeRt;
	private String crctFlag;
	private String ccy;
	private BigDecimal tradeAmt;
	private String journalNo;
	private String certificateNo;
	private String reconFlag;
	private String processCode;
	private String hostName;
	private String prehostCode;
	private String bizType;
	private String tranContext;
	private String isneedReceipt;
	private String manualFlag;
	private String outAccNo;
	private String outAccNm;
	private String outAccBrchno;
	private String outAccBrchnm;
	private String outAccDcflag;
	private String inAccNo;
	private String inAccNm;
	private String inAccBrchno;
	private String inAccBrchnm;
	private String inAccDcflag;
	private String remark;
	private String attribute1;
	private String attrvalue1;
	private String attribute2;
	private String attrvalue2;
	private String attribute3;
	private String attrvalue3;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public HostSerials() {
	}

	/** minimal constructor */
	public HostSerials(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public HostSerials(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String instNo, String custNo,
			String custName, String cntrctNo, String prdCode, String prdName,
			String refNo, String bizDt, String tradeTm, String serialNo,
			String tradeRt, String crctFlag, String ccy, BigDecimal tradeAmt,
			String journalNo, String certificateNo, String reconFlag,
			String processCode, String hostName, String prehostCode,
			String bizType, String tranContext, String isneedReceipt,
			String manualFlag, String outAccNo, String outAccNm,
			String outAccBrchno, String outAccBrchnm, String outAccDcflag,
			String inAccNo, String inAccNm, String inAccBrchno,
			String inAccBrchnm, String inAccDcflag, String remark,
			String attribute1, String attrvalue1, String attribute2,
			String attrvalue2, String attribute3, String attrvalue3,String sysOrgId) {
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
		this.instNo = instNo;
		this.custNo = custNo;
		this.custName = custName;
		this.cntrctNo = cntrctNo;
		this.prdCode = prdCode;
		this.prdName = prdName;
		this.refNo = refNo;
		this.bizDt = bizDt;
		this.tradeTm = tradeTm;
		this.serialNo = serialNo;
		this.tradeRt = tradeRt;
		this.crctFlag = crctFlag;
		this.ccy = ccy;
		this.tradeAmt = tradeAmt;
		this.journalNo = journalNo;
		this.certificateNo = certificateNo;
		this.reconFlag = reconFlag;
		this.processCode = processCode;
		this.hostName = hostName;
		this.prehostCode = prehostCode;
		this.bizType = bizType;
		this.tranContext = tranContext;
		this.isneedReceipt = isneedReceipt;
		this.manualFlag = manualFlag;
		this.outAccNo = outAccNo;
		this.outAccNm = outAccNm;
		this.outAccBrchno = outAccBrchno;
		this.outAccBrchnm = outAccBrchnm;
		this.outAccDcflag = outAccDcflag;
		this.inAccNo = inAccNo;
		this.inAccNm = inAccNm;
		this.inAccBrchno = inAccBrchno;
		this.inAccBrchnm = inAccBrchnm;
		this.inAccDcflag = inAccDcflag;
		this.remark = remark;
		this.attribute1 = attribute1;
		this.attrvalue1 = attrvalue1;
		this.attribute2 = attribute2;
		this.attrvalue2 = attrvalue2;
		this.attribute3 = attribute3;
		this.attrvalue3 = attrvalue3;
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

	@Column(name = "SYS_OP_TM")
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

	@Column(name = "SYS_REL_TM")
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

	@Column(name = "SYS_AUTH_TM")
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "INST_NO", length = 35)
	public String getInstNo() {
		return this.instNo;
	}

	public void setInstNo(String instNo) {
		this.instNo = instNo;
	}

	@Column(name = "CUST_NO", length = 35)
	public String getCustNo() {
		return this.custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	@Column(name = "CUST_NAME", length = 35)
	public String getCustName() {
		return this.custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "PRD_CODE", length = 35)
	public String getPrdCode() {
		return this.prdCode;
	}

	public void setPrdCode(String prdCode) {
		this.prdCode = prdCode;
	}

	@Column(name = "PRD_NAME", length = 35)
	public String getPrdName() {
		return this.prdName;
	}

	public void setPrdName(String prdName) {
		this.prdName = prdName;
	}

	@Column(name = "REF_NO", length = 35)
	public String getRefNo() {
		return this.refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	@Column(name = "BIZ_DT", length = 10)
	public String getBizDt() {
		return this.bizDt;
	}

	public void setBizDt(String bizDt) {
		this.bizDt = bizDt;
	}

	@Column(name = "TRADE_TM", length = 10)
	public String getTradeTm() {
		return this.tradeTm;
	}

	public void setTradeTm(String tradeTm) {
		this.tradeTm = tradeTm;
	}

	@Column(name = "SERIAL_NO", length = 35)
	public String getSerialNo() {
		return this.serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	@Column(name = "TRADE_RT", length = 100)
	public String getTradeRt() {
		return this.tradeRt;
	}

	public void setTradeRt(String tradeRt) {
		this.tradeRt = tradeRt;
	}

	@Column(name = "CRCT_FLAG", length = 1)
	public String getCrctFlag() {
		return this.crctFlag;
	}

	public void setCrctFlag(String crctFlag) {
		this.crctFlag = crctFlag;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "TRADE_AMT", precision = 18, scale = 3)
	public BigDecimal getTradeAmt() {
		return this.tradeAmt;
	}

	public void setTradeAmt(BigDecimal tradeAmt) {
		this.tradeAmt = tradeAmt;
	}

	@Column(name = "JOURNAL_NO", length = 35)
	public String getJournalNo() {
		return this.journalNo;
	}

	public void setJournalNo(String journalNo) {
		this.journalNo = journalNo;
	}

	@Column(name = "CERTIFICATE_NO", length = 35)
	public String getCertificateNo() {
		return this.certificateNo;
	}

	public void setCertificateNo(String certificateNo) {
		this.certificateNo = certificateNo;
	}

	@Column(name = "RECON_FLAG", length = 35)
	public String getReconFlag() {
		return this.reconFlag;
	}

	public void setReconFlag(String reconFlag) {
		this.reconFlag = reconFlag;
	}

	@Column(name = "PROCESS_CODE", length = 35)
	public String getProcessCode() {
		return this.processCode;
	}

	public void setProcessCode(String processCode) {
		this.processCode = processCode;
	}

	@Column(name = "HOST_NAME", length = 35)
	public String getHostName() {
		return this.hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	@Column(name = "PREHOST_CODE", length = 35)
	public String getPrehostCode() {
		return this.prehostCode;
	}

	public void setPrehostCode(String prehostCode) {
		this.prehostCode = prehostCode;
	}

	@Column(name = "BIZ_TYPE", length = 35)
	public String getBizType() {
		return this.bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	@Column(name = "TRAN_CONTEXT", length = 200)
	public String getTranContext() {
		return this.tranContext;
	}

	public void setTranContext(String tranContext) {
		this.tranContext = tranContext;
	}

	@Column(name = "ISNEED_RECEIPT", length = 1)
	public String getIsneedReceipt() {
		return this.isneedReceipt;
	}

	public void setIsneedReceipt(String isneedReceipt) {
		this.isneedReceipt = isneedReceipt;
	}

	@Column(name = "MANUAL_FLAG", length = 1)
	public String getManualFlag() {
		return this.manualFlag;
	}

	public void setManualFlag(String manualFlag) {
		this.manualFlag = manualFlag;
	}

	@Column(name = "OUT_ACC_NO", length = 35)
	public String getOutAccNo() {
		return this.outAccNo;
	}

	public void setOutAccNo(String outAccNo) {
		this.outAccNo = outAccNo;
	}

	@Column(name = "OUT_ACC_NM", length = 35)
	public String getOutAccNm() {
		return this.outAccNm;
	}

	public void setOutAccNm(String outAccNm) {
		this.outAccNm = outAccNm;
	}

	@Column(name = "OUT_ACC_BRCHNO", length = 35)
	public String getOutAccBrchno() {
		return this.outAccBrchno;
	}

	public void setOutAccBrchno(String outAccBrchno) {
		this.outAccBrchno = outAccBrchno;
	}

	@Column(name = "OUT_ACC_BRCHNM", length = 35)
	public String getOutAccBrchnm() {
		return this.outAccBrchnm;
	}

	public void setOutAccBrchnm(String outAccBrchnm) {
		this.outAccBrchnm = outAccBrchnm;
	}

	@Column(name = "OUT_ACC_DCFLAG", length = 1)
	public String getOutAccDcflag() {
		return this.outAccDcflag;
	}

	public void setOutAccDcflag(String outAccDcflag) {
		this.outAccDcflag = outAccDcflag;
	}

	@Column(name = "IN_ACC_NO", length = 35)
	public String getInAccNo() {
		return this.inAccNo;
	}

	public void setInAccNo(String inAccNo) {
		this.inAccNo = inAccNo;
	}

	@Column(name = "IN_ACC_NM", length = 35)
	public String getInAccNm() {
		return this.inAccNm;
	}

	public void setInAccNm(String inAccNm) {
		this.inAccNm = inAccNm;
	}

	@Column(name = "IN_ACC_BRCHNO", length = 35)
	public String getInAccBrchno() {
		return this.inAccBrchno;
	}

	public void setInAccBrchno(String inAccBrchno) {
		this.inAccBrchno = inAccBrchno;
	}

	@Column(name = "IN_ACC_BRCHNM", length = 35)
	public String getInAccBrchnm() {
		return this.inAccBrchnm;
	}

	public void setInAccBrchnm(String inAccBrchnm) {
		this.inAccBrchnm = inAccBrchnm;
	}

	@Column(name = "IN_ACC_DCFLAG", length = 1)
	public String getInAccDcflag() {
		return this.inAccDcflag;
	}

	public void setInAccDcflag(String inAccDcflag) {
		this.inAccDcflag = inAccDcflag;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "ATTRIBUTE1", length = 35)
	public String getAttribute1() {
		return this.attribute1;
	}

	public void setAttribute1(String attribute1) {
		this.attribute1 = attribute1;
	}

	@Column(name = "ATTRVALUE1", length = 35)
	public String getAttrvalue1() {
		return this.attrvalue1;
	}

	public void setAttrvalue1(String attrvalue1) {
		this.attrvalue1 = attrvalue1;
	}

	@Column(name = "ATTRIBUTE2", length = 35)
	public String getAttribute2() {
		return this.attribute2;
	}

	public void setAttribute2(String attribute2) {
		this.attribute2 = attribute2;
	}

	@Column(name = "ATTRVALUE2", length = 35)
	public String getAttrvalue2() {
		return this.attrvalue2;
	}

	public void setAttrvalue2(String attrvalue2) {
		this.attrvalue2 = attrvalue2;
	}

	@Column(name = "ATTRIBUTE3", length = 35)
	public String getAttribute3() {
		return this.attribute3;
	}

	public void setAttribute3(String attribute3) {
		this.attribute3 = attribute3;
	}

	@Column(name = "ATTRVALUE3", length = 35)
	public String getAttrvalue3() {
		return this.attrvalue3;
	}

	public void setAttrvalue3(String attrvalue3) {
		this.attrvalue3 = attrvalue3;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
}