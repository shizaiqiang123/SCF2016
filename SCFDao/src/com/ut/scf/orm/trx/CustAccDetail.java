package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import oracle.sql.TIMESTAMP;

/**
 * CustAccDetail entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CUST_ACC_DETAIL", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CustAccDetail implements java.io.Serializable {

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
	private String accNo;
	private String tradeDt;
	private String tradeTm;
	private String hostAccDt;
	private String hostSerialno;
	private String hostTrancode;
	private BigDecimal tradeAmt;
	private BigDecimal accBal;
	private String tradeBrhno;
	private String oprTbl;
	private String ccy;
	private String ccyType;
	private String dcFlag;
	private String bizType;
	private String crctFlag;
	private String payerBranchno;
	private String payerBankname;
	private String payerUnionno;
	private String payerAccno;
	private String payerAccname;
	private String receiptBranchno;
	private String receiptBankname;
	private String receiptUnionno;
	private String receiptAccno;
	private String receiptAccname;
	private Timestamp oprTm;
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
	public CustAccDetail() {
	}

	/** minimal constructor */
	public CustAccDetail(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CustAccDetail(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String accNo, String tradeDt,
			String tradeTm, String hostAccDt, String hostSerialno,
			String hostTrancode, BigDecimal tradeAmt, BigDecimal accBal,
			String tradeBrhno, String oprTbl, String ccy, String ccyType,
			String dcFlag, String bizType, String crctFlag,
			String payerBranchno, String payerBankname, String payerUnionno,
			String payerAccno, String payerAccname, String receiptBranchno,
			String receiptBankname, String receiptUnionno, String receiptAccno,
			String receiptAccname, Timestamp oprTm, String remark,
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
		this.accNo = accNo;
		this.tradeDt = tradeDt;
		this.tradeTm = tradeTm;
		this.hostAccDt = hostAccDt;
		this.hostSerialno = hostSerialno;
		this.hostTrancode = hostTrancode;
		this.tradeAmt = tradeAmt;
		this.accBal = accBal;
		this.tradeBrhno = tradeBrhno;
		this.oprTbl = oprTbl;
		this.ccy = ccy;
		this.ccyType = ccyType;
		this.dcFlag = dcFlag;
		this.bizType = bizType;
		this.crctFlag = crctFlag;
		this.payerBranchno = payerBranchno;
		this.payerBankname = payerBankname;
		this.payerUnionno = payerUnionno;
		this.payerAccno = payerAccno;
		this.payerAccname = payerAccname;
		this.receiptBranchno = receiptBranchno;
		this.receiptBankname = receiptBankname;
		this.receiptUnionno = receiptUnionno;
		this.receiptAccno = receiptAccno;
		this.receiptAccname = receiptAccname;
		this.oprTm = oprTm;
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

	@Column(name = "ACC_NO", length = 35)
	public String getAccNo() {
		return this.accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	@Column(name = "TRADE_DT", length = 10)
	public String getTradeDt() {
		return this.tradeDt;
	}

	public void setTradeDt(String tradeDt) {
		this.tradeDt = tradeDt;
	}

	@Column(name = "TRADE_TM", length = 10)
	public String getTradeTm() {
		return this.tradeTm;
	}

	public void setTradeTm(String tradeTm) {
		this.tradeTm = tradeTm;
	}

	@Column(name = "HOST_ACC_DT", length = 10)
	public String getHostAccDt() {
		return this.hostAccDt;
	}

	public void setHostAccDt(String hostAccDt) {
		this.hostAccDt = hostAccDt;
	}

	@Column(name = "HOST_SERIALNO", length = 35)
	public String getHostSerialno() {
		return this.hostSerialno;
	}

	public void setHostSerialno(String hostSerialno) {
		this.hostSerialno = hostSerialno;
	}

	@Column(name = "HOST_TRANCODE", length = 10)
	public String getHostTrancode() {
		return this.hostTrancode;
	}

	public void setHostTrancode(String hostTrancode) {
		this.hostTrancode = hostTrancode;
	}

	@Column(name = "TRADE_AMT", precision = 18, scale = 3)
	public BigDecimal getTradeAmt() {
		return this.tradeAmt;
	}

	public void setTradeAmt(BigDecimal tradeAmt) {
		this.tradeAmt = tradeAmt;
	}

	@Column(name = "ACC_BAL", precision = 18, scale = 3)
	public BigDecimal getAccBal() {
		return this.accBal;
	}

	public void setAccBal(BigDecimal accBal) {
		this.accBal = accBal;
	}

	@Column(name = "TRADE_BRHNO", length = 35)
	public String getTradeBrhno() {
		return this.tradeBrhno;
	}

	public void setTradeBrhno(String tradeBrhno) {
		this.tradeBrhno = tradeBrhno;
	}

	@Column(name = "OPR_TBL", length = 35)
	public String getOprTbl() {
		return this.oprTbl;
	}

	public void setOprTbl(String oprTbl) {
		this.oprTbl = oprTbl;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "CCY_TYPE", length = 1)
	public String getCcyType() {
		return this.ccyType;
	}

	public void setCcyType(String ccyType) {
		this.ccyType = ccyType;
	}

	@Column(name = "DC_FLAG", length = 1)
	public String getDcFlag() {
		return this.dcFlag;
	}

	public void setDcFlag(String dcFlag) {
		this.dcFlag = dcFlag;
	}

	@Column(name = "BIZ_TYPE", length = 10)
	public String getBizType() {
		return this.bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}

	@Column(name = "CRCT_FLAG", length = 1)
	public String getCrctFlag() {
		return this.crctFlag;
	}

	public void setCrctFlag(String crctFlag) {
		this.crctFlag = crctFlag;
	}

	@Column(name = "PAYER_BRANCHNO", length = 35)
	public String getPayerBranchno() {
		return this.payerBranchno;
	}

	public void setPayerBranchno(String payerBranchno) {
		this.payerBranchno = payerBranchno;
	}

	@Column(name = "PAYER_BANKNAME", length = 35)
	public String getPayerBankname() {
		return this.payerBankname;
	}

	public void setPayerBankname(String payerBankname) {
		this.payerBankname = payerBankname;
	}

	@Column(name = "PAYER_UNIONNO", length = 35)
	public String getPayerUnionno() {
		return this.payerUnionno;
	}

	public void setPayerUnionno(String payerUnionno) {
		this.payerUnionno = payerUnionno;
	}

	@Column(name = "PAYER_ACCNO", length = 35)
	public String getPayerAccno() {
		return this.payerAccno;
	}

	public void setPayerAccno(String payerAccno) {
		this.payerAccno = payerAccno;
	}

	@Column(name = "PAYER_ACCNAME", length = 35)
	public String getPayerAccname() {
		return this.payerAccname;
	}

	public void setPayerAccname(String payerAccname) {
		this.payerAccname = payerAccname;
	}

	@Column(name = "RECEIPT_BRANCHNO", length = 35)
	public String getReceiptBranchno() {
		return this.receiptBranchno;
	}

	public void setReceiptBranchno(String receiptBranchno) {
		this.receiptBranchno = receiptBranchno;
	}

	@Column(name = "RECEIPT_BANKNAME", length = 35)
	public String getReceiptBankname() {
		return this.receiptBankname;
	}

	public void setReceiptBankname(String receiptBankname) {
		this.receiptBankname = receiptBankname;
	}

	@Column(name = "RECEIPT_UNIONNO", length = 35)
	public String getReceiptUnionno() {
		return this.receiptUnionno;
	}

	public void setReceiptUnionno(String receiptUnionno) {
		this.receiptUnionno = receiptUnionno;
	}

	@Column(name = "RECEIPT_ACCNO", length = 35)
	public String getReceiptAccno() {
		return this.receiptAccno;
	}

	public void setReceiptAccno(String receiptAccno) {
		this.receiptAccno = receiptAccno;
	}

	@Column(name = "RECEIPT_ACCNAME", length = 35)
	public String getReceiptAccname() {
		return this.receiptAccname;
	}

	public void setReceiptAccname(String receiptAccname) {
		this.receiptAccname = receiptAccname;
	}

	@Column(name = "OPR_TM")
	public Timestamp getOprTm() {
		return this.oprTm;
	}

	public void setOprTm(Timestamp oprTm) {
		this.oprTm = oprTm;
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