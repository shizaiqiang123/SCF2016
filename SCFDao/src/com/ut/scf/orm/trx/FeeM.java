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
 * AccTrn entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "FEE_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class FeeM implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = -5354775495546134230L;
	/**
	 * 
	 */
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
	private Timestamp trxDt;
	private String costCcy;
	private String costItem;
	private String costItem_desc;
	private BigDecimal currTransCost;
	private BigDecimal currTransPayCost;
	private String selId;
	private String selAcNo;
	private String selAcNm;
	private String selAcBkNm;
	private String remark;
	private BigDecimal currFinCost;
	private BigDecimal currFinPayCost;
	private Timestamp createDt;
	private String costPayFlg;
	private BigDecimal overdueCost;
	private Timestamp currFinDt;
	private Timestamp currFinPayDt;
	private String sysFuncName;
	private String cntrctNo;

	private String busiTp;
	private String costTp;
	private BigDecimal costAmt;
	private String theirRef;
	private BigDecimal totalTransPayCost;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public FeeM() {
	}

	/** minimal constructor */
	public FeeM(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}

	/** full constructor */

	public FeeM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, Timestamp trxDt, String costCcy,
			String costItem, String costItem_desc, BigDecimal currTransCost,
			BigDecimal currTransPayCost, String selId, String selAcNo,
			String selAcNm, String selAcBkNm, String remark,
			BigDecimal currFinCost, BigDecimal currFinPayCost,
			String sysFuncName, Timestamp createDt, String costPayFlg,
			String sysGapiSts, BigDecimal overdueCost, Timestamp currFinDt,
			Timestamp currFinPayDt, String cntrctNo, String busiTp,
			String costTp, BigDecimal costAmt, String theirRef,
			BigDecimal totalTransPayCost,String sysOrgId) {
		super();
		this.sysFuncName = sysFuncName;
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
		this.trxDt = trxDt;
		this.costCcy = costCcy;
		this.costItem = costItem;
		this.costItem_desc = costItem_desc;
		this.currTransCost = currTransCost;
		this.currTransPayCost = currTransPayCost;
		this.selId = selId;
		this.selAcNo = selAcNo;
		this.selAcNm = selAcNm;
		this.selAcBkNm = selAcBkNm;
		this.remark = remark;
		this.currFinCost = currFinCost;
		this.currFinPayCost = currFinPayCost;
		this.createDt = createDt;
		this.costPayFlg = costPayFlg;
		this.sysGapiSts = sysGapiSts;
		this.overdueCost = overdueCost;
		this.currFinDt = currFinDt;
		this.currFinPayDt = currFinPayDt;
		this.cntrctNo = cntrctNo;
		this.busiTp = busiTp;
		this.costTp = costTp;
		this.costAmt = costAmt;
		this.theirRef = theirRef;
		this.totalTransPayCost = totalTransPayCost;
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

	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
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

	@Column(name = "SYS_EVENT_TIMES", precision = 4, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "TRX_DT", length = 11)
	public Timestamp getTrxDt() {
		return trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "COST_CCY", length = 3)
	public String getCostCcy() {
		return costCcy;
	}

	public void setCostCcy(String costCcy) {
		this.costCcy = costCcy;
	}

	@Column(name = "COST_ITEM", length = 15)
	public String getCostItem() {
		return costItem;
	}

	public void setCostItem(String costItem) {
		this.costItem = costItem;
	}

	@Column(name = "COST_ITEM_DESC", length = 100)
	public String getCostItem_desc() {
		return costItem_desc;
	}

	public void setCostItem_desc(String costItem_desc) {
		this.costItem_desc = costItem_desc;
	}

	@Column(name = "CURR_TRANS_COST", precision = 18, scale = 4)
	public BigDecimal getCurrTransCost() {
		return currTransCost;
	}

	public void setCurrTransCost(BigDecimal currTransCost) {
		this.currTransCost = currTransCost;
	}

	@Column(name = "CURR_TRANS_PAY_COST", precision = 18, scale = 4)
	public BigDecimal getCurrTransPayCost() {
		return currTransPayCost;
	}

	public void setCurrTransPayCost(BigDecimal currTransPayCost) {
		this.currTransPayCost = currTransPayCost;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "SEL_AC_NO", length = 40)
	public String getSelAcNo() {
		return selAcNo;
	}

	public void setSelAcNo(String selAcNo) {
		this.selAcNo = selAcNo;
	}

	@Column(name = "SEL_AC_NM", length = 40)
	public String getSelAcNm() {
		return selAcNm;
	}

	public void setSelAcNm(String selAcNm) {
		this.selAcNm = selAcNm;
	}

	@Column(name = "SEL_AC_BK_NM", length = 70)
	public String getSelAcBkNm() {
		return selAcBkNm;
	}

	public void setSelAcBkNm(String selAcBkNm) {
		this.selAcBkNm = selAcBkNm;
	}

	@Column(name = "REMARK", length = 150)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "CURR_FIN_COST", precision = 18, scale = 4)
	public BigDecimal getCurrFinCost() {
		return currFinCost;
	}

	public void setCurrFinCost(BigDecimal currFinCost) {
		this.currFinCost = currFinCost;
	}

	@Column(name = "CURR_FIN_PAY_COST", precision = 18, scale = 4)
	public BigDecimal getCurrFinPayCost() {
		return currFinPayCost;
	}

	public void setCurrFinPayCost(BigDecimal currFinPayCost) {
		this.currFinPayCost = currFinPayCost;
	}

	@Column(name = "CREATE_DT", length = 11)
	public Timestamp getCreateDt() {
		return createDt;
	}

	public void setCreateDt(Timestamp createDt) {
		this.createDt = createDt;
	}

	@Column(name = "COST_PAY_FLG", length = 35)
	public String getCostPayFlg() {
		return costPayFlg;
	}

	public void setCostPayFlg(String costPayFlg) {
		this.costPayFlg = costPayFlg;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "OVERDUE_COST", precision = 18, scale = 4)
	public BigDecimal getOverdueCost() {
		return overdueCost;
	}

	public void setOverdueCost(BigDecimal overdueCost) {
		this.overdueCost = overdueCost;
	}

	@Column(name = "CURR_FIN_DT", length = 11)
	public Timestamp getCurrFinDt() {
		return currFinDt;
	}

	public void setCurrFinDt(Timestamp currFinDt) {
		this.currFinDt = currFinDt;
	}

	@Column(name = "CURR_FIN_PAY_DT", length = 11)
	public Timestamp getCurrFinPayDt() {
		return currFinPayDt;
	}

	public void setCurrFinPayDt(Timestamp currFinPayDt) {
		this.currFinPayDt = currFinPayDt;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "BUSI_TP", length = 35)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "COST_TP", length = 35)
	public String getCostTp() {
		return costTp;
	}

	public void setCostTp(String costTp) {
		this.costTp = costTp;
	}

	@Column(name = "COST_AMT", precision = 18, scale = 4)
	public BigDecimal getCostAmt() {
		return costAmt;
	}

	public void setCostAmt(BigDecimal costAmt) {
		this.costAmt = costAmt;
	}

	@Column(name = "THEIR_REF", length = 35)
	public String getTheirRef() {
		return theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
	}

	@Column(name = "TOTAL_TRANS_PAY_COST", precision = 18, scale = 4)
	public BigDecimal getTotalTransPayCost() {
		return totalTransPayCost;
	}

	public void setTotalTransPayCost(BigDecimal totalTransPayCost) {
		this.totalTransPayCost = totalTransPayCost;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}