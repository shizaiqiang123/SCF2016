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
 * CostMaster entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "cost_master", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CostMaster implements java.io.Serializable {

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
	private String sysRelReason;
	private String sysBusiUnit;
	private String trxId;
	private Timestamp trxDt;
	private String costCcy;
	private String costItem;
	private String costItemDesc;
	private BigDecimal currTransCost;
	private BigDecimal totalTransCost;
	private BigDecimal currTransPayCost;
	private BigDecimal totalTransPayCost;
	private String selId;
	private String selNm;
	private String selAcNo;
	private String selAcNm;
	private String selAcBkNm;
	private String belogBchId;
	private String belogBchName;
	private String remark;
	private BigDecimal currFinCost;
	private BigDecimal totalFinCost;
	private BigDecimal currFinPayCost;
	private BigDecimal totalFinPayCost;
	private Timestamp createDt;
	private String costPayFlg;
	private String busiTp;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public CostMaster() {
	}

	/** minimal constructor */
	public CostMaster(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CostMaster(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String sysRelReason, String sysBusiUnit,
			String trxId, Timestamp trxDt, String costCcy, String costItem,
			String costItemDesc, BigDecimal currTransCost,
			BigDecimal totalTransCost, BigDecimal currTransPayCost,
			BigDecimal totalTransPayCost, String selId, String selNm,
			String selAcNo, String selAcNm, String selAcBkNm,
			String belogBchId, String belogBchName, String remark,
			BigDecimal currFinCost, BigDecimal totalFinCost,
			BigDecimal currFinPayCost, BigDecimal totalFinPayCost,
			Timestamp createDt, String costPayFlg, String busiTp,String sysOrgId) {
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
		this.sysRelReason = sysRelReason;
		this.sysBusiUnit = sysBusiUnit;
		this.trxId = trxId;
		this.trxDt = trxDt;
		this.costCcy = costCcy;
		this.costItem = costItem;
		this.costItemDesc = costItemDesc;
		this.currTransCost = currTransCost;
		this.totalTransCost = totalTransCost;
		this.currTransPayCost = currTransPayCost;
		this.totalTransPayCost = totalTransPayCost;
		this.selId = selId;
		this.selNm = selNm;
		this.selAcNo = selAcNo;
		this.selAcNm = selAcNm;
		this.selAcBkNm = selAcBkNm;
		this.belogBchId = belogBchId;
		this.belogBchName = belogBchName;
		this.remark = remark;
		this.currFinCost = currFinCost;
		this.totalFinCost = totalFinCost;
		this.currFinPayCost = currFinPayCost;
		this.totalFinPayCost = totalFinPayCost;
		this.createDt = createDt;
		this.costPayFlg = costPayFlg;
		this.busiTp = busiTp;
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

	@Column(name = "SYS_REL_REASON", length = 200)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "sys_busi_unit", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "TRX_ID", length = 40)
	public String getTrxId() {
		return this.trxId;
	}

	public void setTrxId(String trxId) {
		this.trxId = trxId;
	}

	@Column(name = "TRX_DT", length = 19)
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "COST_CCY", length = 5)
	public String getCostCcy() {
		return this.costCcy;
	}

	public void setCostCcy(String costCcy) {
		this.costCcy = costCcy;
	}

	@Column(name = "COST_ITEM", length = 5)
	public String getCostItem() {
		return this.costItem;
	}

	public void setCostItem(String costItem) {
		this.costItem = costItem;
	}

	@Column(name = "COST_ITEM_DESC", length = 200)
	public String getCostItemDesc() {
		return this.costItemDesc;
	}

	public void setCostItemDesc(String costItemDesc) {
		this.costItemDesc = costItemDesc;
	}

	@Column(name = "CURR_TRANS_COST", precision = 19, scale = 4)
	public BigDecimal getCurrTransCost() {
		return this.currTransCost;
	}

	public void setCurrTransCost(BigDecimal currTransCost) {
		this.currTransCost = currTransCost;
	}

	@Column(name = "TOTAL_TRANS_COST", precision = 19, scale = 4)
	public BigDecimal getTotalTransCost() {
		return this.totalTransCost;
	}

	public void setTotalTransCost(BigDecimal totalTransCost) {
		this.totalTransCost = totalTransCost;
	}

	@Column(name = "CURR_TRANS_PAY_COST", precision = 19, scale = 4)
	public BigDecimal getCurrTransPayCost() {
		return this.currTransPayCost;
	}

	public void setCurrTransPayCost(BigDecimal currTransPayCost) {
		this.currTransPayCost = currTransPayCost;
	}

	@Column(name = "TOTAL_TRANS_PAY_COST", precision = 19, scale = 4)
	public BigDecimal getTotalTransPayCost() {
		return this.totalTransPayCost;
	}

	public void setTotalTransPayCost(BigDecimal totalTransPayCost) {
		this.totalTransPayCost = totalTransPayCost;
	}

	@Column(name = "SEL_ID", length = 40)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "SEL_NM", length = 40)
	public String getSelNm() {
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "SEL_AC_NO", length = 40)
	public String getSelAcNo() {
		return this.selAcNo;
	}

	public void setSelAcNo(String selAcNo) {
		this.selAcNo = selAcNo;
	}

	@Column(name = "SEL_AC_NM", length = 40)
	public String getSelAcNm() {
		return this.selAcNm;
	}

	public void setSelAcNm(String selAcNm) {
		this.selAcNm = selAcNm;
	}

	@Column(name = "SEL_AC_BK_NM", length = 40)
	public String getSelAcBkNm() {
		return this.selAcBkNm;
	}

	public void setSelAcBkNm(String selAcBkNm) {
		this.selAcBkNm = selAcBkNm;
	}

	@Column(name = "BELOG_BCH_ID", length = 40)
	public String getBelogBchId() {
		return this.belogBchId;
	}

	public void setBelogBchId(String belogBchId) {
		this.belogBchId = belogBchId;
	}

	@Column(name = "BELOG_BCH_NAME", length = 40)
	public String getBelogBchName() {
		return this.belogBchName;
	}

	public void setBelogBchName(String belogBchName) {
		this.belogBchName = belogBchName;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "CURR_FIN_COST", precision = 19, scale = 4)
	public BigDecimal getCurrFinCost() {
		return this.currFinCost;
	}

	public void setCurrFinCost(BigDecimal currFinCost) {
		this.currFinCost = currFinCost;
	}

	@Column(name = "TOTAL_FIN_COST", precision = 19, scale = 4)
	public BigDecimal getTotalFinCost() {
		return this.totalFinCost;
	}

	public void setTotalFinCost(BigDecimal totalFinCost) {
		this.totalFinCost = totalFinCost;
	}

	@Column(name = "CURR_FIN_PAY_COST", precision = 19, scale = 4)
	public BigDecimal getCurrFinPayCost() {
		return this.currFinPayCost;
	}

	public void setCurrFinPayCost(BigDecimal currFinPayCost) {
		this.currFinPayCost = currFinPayCost;
	}

	@Column(name = "TOTAL_FIN_PAY_COST", precision = 19, scale = 4)
	public BigDecimal getTotalFinPayCost() {
		return this.totalFinPayCost;
	}

	public void setTotalFinPayCost(BigDecimal totalFinPayCost) {
		this.totalFinPayCost = totalFinPayCost;
	}

	@Column(name = "CREATE_DT", length = 19)
	public Timestamp getCreateDt() {
		return this.createDt;
	}

	public void setCreateDt(Timestamp createDt) {
		this.createDt = createDt;
	}

	@Column(name = "COST_PAY_FLG", length = 5)
	public String getCostPayFlg() {
		return costPayFlg;
	}

	public void setCostPayFlg(String costPayFlg) {
		this.costPayFlg = costPayFlg;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

}