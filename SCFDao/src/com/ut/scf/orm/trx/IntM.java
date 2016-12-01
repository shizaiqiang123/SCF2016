package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * IntM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INT_M", schema = "TRX")
public class IntM implements java.io.Serializable {

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
	private String sysGapiSts;
	private String sysFuncName;
	private String cntrctNo;
	private Timestamp trxDt;
	private String selId;
	private String selAcNo;
	private String selAcNm;
	private String selAcBkNm;
	private String busiTp;
	private String intTp;
	private String intCcy;
	private BigDecimal intAmt;
	private BigDecimal currInt;
	private BigDecimal currPayInt;
	private Timestamp createDt;
	private String intPayFlg;
	private BigDecimal overdueInt;
	private Timestamp currIntDt;
	private Timestamp currIntPayDt;
	private String theirRef;
	private String remark;
	private String payIntTp;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public IntM() {
	}

	/** minimal constructor */
	public IntM(String sysRefNo, Timestamp sysOpTm, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;	
		this.sysOpTm = sysOpTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public IntM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String sysGapiSts, String sysFuncName,
			String cntrctNo, Timestamp trxDt, String selId, String selAcNo,
			String selAcNm, String selAcBkNm, String busiTp, String intTp,
			String intCcy, BigDecimal intAmt, BigDecimal currInt, BigDecimal currPayInt,
			Timestamp createDt, String intPayFlg, BigDecimal overdueInt,
			Timestamp currIntDt, Timestamp currIntPayDt, String theirRef,
			String remark,String payIntTp,String sysOrgId) {
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
		this.sysGapiSts = sysGapiSts;
		this.sysFuncName = sysFuncName;
		this.cntrctNo = cntrctNo;
		this.trxDt = trxDt;
		this.selId = selId;
		this.selAcNo = selAcNo;
		this.selAcNm = selAcNm;
		this.selAcBkNm = selAcBkNm;
		this.busiTp = busiTp;
		this.intTp = intTp;
		this.intCcy = intCcy;
		this.intAmt = intAmt;
		this.currInt = currInt;
		this.currPayInt = currPayInt;
		this.createDt = createDt;
		this.intPayFlg = intPayFlg;
		this.overdueInt = overdueInt;
		this.currIntDt = currIntDt;
		this.currIntPayDt = currIntPayDt;
		this.theirRef = theirRef;
		this.remark = remark;
		this.payIntTp = payIntTp;
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

	@Column(name = "SYS_OP_TM", nullable = false)
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

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return this.sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "SYS_FUNC_NAME", length = 35)
	public String getSysFuncName() {
		return this.sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "TRX_DT")
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "SEL_AC_NO", length = 50)
	public String getSelAcNo() {
		return this.selAcNo;
	}

	public void setSelAcNo(String selAcNo) {
		this.selAcNo = selAcNo;
	}

	@Column(name = "SEL_AC_NM", length = 50)
	public String getSelAcNm() {
		return this.selAcNm;
	}

	public void setSelAcNm(String selAcNm) {
		this.selAcNm = selAcNm;
	}

	@Column(name = "SEL_AC_BK_NM", length = 150)
	public String getSelAcBkNm() {
		return this.selAcBkNm;
	}

	public void setSelAcBkNm(String selAcBkNm) {
		this.selAcBkNm = selAcBkNm;
	}

	@Column(name = "BUSI_TP", length = 50)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "INT_TP", length = 50)
	public String getIntTp() {
		return this.intTp;
	}

	public void setIntTp(String intTp) {
		this.intTp = intTp;
	}

	@Column(name = "INT_CCY", length = 50)
	public String getIntCcy() {
		return this.intCcy;
	}

	public void setIntCcy(String intCcy) {
		this.intCcy = intCcy;
	}

	@Column(name = "INT_AMT", precision = 18, scale = 4)
	public BigDecimal getIntAmt() {
		return this.intAmt;
	}

	public void setIntAmt(BigDecimal intAmt) {
		this.intAmt = intAmt;
	}

	@Column(name = "CURR_INT", precision = 18, scale = 4)
	public BigDecimal getCurrInt() {
		return this.currInt;
	}

	public void setCurrInt(BigDecimal currInt) {
		this.currInt = currInt;
	}

	@Column(name = "CURR_PAY_INT", precision = 18, scale = 4)
	public BigDecimal getCurrPayInt() {
		return this.currPayInt;
	}

	public void setCurrPayInt(BigDecimal currPayInt) {
		this.currPayInt = currPayInt;
	}

	@Column(name = "CREATE_DT")
	public Timestamp getCreateDt() {
		return this.createDt;
	}

	public void setCreateDt(Timestamp createDt) {
		this.createDt = createDt;
	}

	@Column(name = "INT_PAY_FLG", length = 50)
	public String getIntPayFlg() {
		return this.intPayFlg;
	}

	public void setIntPayFlg(String intPayFlg) {
		this.intPayFlg = intPayFlg;
	}

	@Column(name = "OVERDUE_INT", precision = 18, scale = 4)
	public BigDecimal getOverdueInt() {
		return this.overdueInt;
	}

	public void setOverdueInt(BigDecimal overdueInt) {
		this.overdueInt = overdueInt;
	}

	@Column(name = "CURR_INT_DT")
	public Timestamp getCurrIntDt() {
		return this.currIntDt;
	}

	public void setCurrIntDt(Timestamp currIntDt) {
		this.currIntDt = currIntDt;
	}

	@Column(name = "CURR_INT_PAY_DT")
	public Timestamp getCurrIntPayDt() {
		return this.currIntPayDt;
	}

	public void setCurrIntPayDt(Timestamp currIntPayDt) {
		this.currIntPayDt = currIntPayDt;
	}

	@Column(name = "THEIR_REF", length = 50)
	public String getTheirRef() {
		return this.theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
	}

	@Column(name = "REMARK", length = 500)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	@Column(name = "PAY_INT_TP", length = 5)
	public String getPayIntTp() {
		return this.payIntTp;
	}

	public void setPayIntTp(String payIntTp) {
		this.payIntTp = payIntTp;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
}