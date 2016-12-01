package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * CrtfRegE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CRTF_REG_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CrtfRegE implements java.io.Serializable {

	// Fields

	private CrtfRegEId id;
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
	private String loanId;
	private String cntrctNo;
	private String buyerId;
	private String selId;
	private String buyerNm;
	private String selNm;
	private String busiTp;
	private String ccy;
	private BigDecimal loanAmt;
	private BigDecimal loanBal;
	private Timestamp regDt;
	private String remark;
	private String attribute1;
	private String attrvalue1;
	private String attribute2;
	private String attrvalue2;
	private String attribute3;
	private String attrvalue3;
	private String sellerInstCd;
	private Timestamp loanValDt;
	private Timestamp loanDueDt;
	private String supervisorId;
	private String supervisorNm;
	private String warehouseId;
	private String warehouseNm;
	private String regId;
	private String regNm;
	private String wareId;
	private String wareNm;
	private Double fundRt;
	private BigDecimal regAmt;
	private BigDecimal ttlRegAmt;
	private BigDecimal maxDroPerc;
	private String sysRelReason;
	private String goDownNo;// 仓单编号
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	private String loanFlag;// 是否融资标识
	// Constructors

	/** default constructor */
	public CrtfRegE() {
	}

	/** minimal constructor */
	public CrtfRegE(CrtfRegEId id) {
		this.id = id;
	}

	/** full constructor */
	public CrtfRegE(CrtfRegEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String loanId, String cntrctNo, String buyerId, String selId,
			String buyerNm, String selNm, String busiTp, String ccy,
			BigDecimal loanAmt, BigDecimal loanBal, Timestamp regDt,
			String remark, String attribute1, String attrvalue1,
			String attribute2, String attrvalue2, String attribute3,
			String attrvalue3, String sellerInstCd, Timestamp loanValDt,
			Timestamp loanDueDt, String supervisorId, String supervisorNm,
			String warehouseId, String warehouseNm, String regId, String regNm,
			String wareId, String wareNm, Double fundRt, BigDecimal regAmt,
			BigDecimal ttlRegAmt, BigDecimal maxDroPerc, String sysRelReason,
			String goDownNo,String sysOrgId,String loanFlag) {
		super();
		this.id = id;
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
		this.loanId = loanId;
		this.cntrctNo = cntrctNo;
		this.buyerId = buyerId;
		this.selId = selId;
		this.buyerNm = buyerNm;
		this.selNm = selNm;
		this.busiTp = busiTp;
		this.ccy = ccy;
		this.loanAmt = loanAmt;
		this.loanBal = loanBal;
		this.regDt = regDt;
		this.remark = remark;
		this.attribute1 = attribute1;
		this.attrvalue1 = attrvalue1;
		this.attribute2 = attribute2;
		this.attrvalue2 = attrvalue2;
		this.attribute3 = attribute3;
		this.attrvalue3 = attrvalue3;
		this.sellerInstCd = sellerInstCd;
		this.loanValDt = loanValDt;
		this.loanDueDt = loanDueDt;
		this.supervisorId = supervisorId;
		this.supervisorNm = supervisorNm;
		this.warehouseId = warehouseId;
		this.warehouseNm = warehouseNm;
		this.regId = regId;
		this.regNm = regNm;
		this.wareId = wareId;
		this.wareNm = wareNm;
		this.fundRt = fundRt;
		this.regAmt = regAmt;
		this.ttlRegAmt = ttlRegAmt;
		this.maxDroPerc = maxDroPerc;
		this.sysRelReason = sysRelReason;
		this.goDownNo = goDownNo;
		this.sysOrgId = sysOrgId;
		this.loanFlag = loanFlag;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0)) })
	public CrtfRegEId getId() {
		return this.id;
	}

	public void setId(CrtfRegEId id) {
		this.id = id;
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

	@Column(name = "LOAN_ID", length = 35)
	public String getLoanId() {
		return this.loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return this.buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
	}

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "BUYER_NM", length = 35)
	public String getBuyerNm() {
		return this.buyerNm;
	}

	public void setBuyerNm(String buyerNm) {
		this.buyerNm = buyerNm;
	}

	@Column(name = "SEL_NM", length = 35)
	public String getSelNm() {
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "BUSI_TP", length = 2)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "LOAN_AMT", precision = 18, scale = 3)
	public BigDecimal getLoanAmt() {
		return this.loanAmt;
	}

	public void setLoanAmt(BigDecimal loanAmt) {
		this.loanAmt = loanAmt;
	}

	@Column(name = "LOAN_BAL", precision = 18, scale = 3)
	public BigDecimal getLoanBal() {
		return this.loanBal;
	}

	public void setLoanBal(BigDecimal loanBal) {
		this.loanBal = loanBal;
	}

	@Column(name = "REG_DT")
	public Timestamp getRegDt() {
		return this.regDt;
	}

	public void setRegDt(Timestamp regDt) {
		this.regDt = regDt;
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

	@Column(name = "SELLER_INST_CD", length = 35)
	public String getSellerInstCd() {
		return this.sellerInstCd;
	}

	public void setSellerInstCd(String sellerInstCd) {
		this.sellerInstCd = sellerInstCd;
	}

	@Column(name = "LOAN_VAL_DT")
	public Timestamp getLoanValDt() {
		return this.loanValDt;
	}

	public void setLoanValDt(Timestamp loanValDt) {
		this.loanValDt = loanValDt;
	}

	@Column(name = "LOAN_DUE_DT")
	public Timestamp getLoanDueDt() {
		return this.loanDueDt;
	}

	public void setLoanDueDt(Timestamp loanDueDt) {
		this.loanDueDt = loanDueDt;
	}

	@Column(name = "SUPERVISOR_ID", length = 35)
	public String getSupervisorId() {
		return supervisorId;
	}

	public void setSupervisorId(String supervisorId) {
		this.supervisorId = supervisorId;
	}

	@Column(name = "SUPERVISOR_NM", length = 35)
	public String getSupervisorNm() {
		return supervisorNm;
	}

	public void setSupervisorNm(String supervisorNm) {
		this.supervisorNm = supervisorNm;
	}

	@Column(name = "WAREHOUSE_ID", length = 35)
	public String getWarehouseId() {
		return warehouseId;
	}

	public void setWarehouseId(String warehouseId) {
		this.warehouseId = warehouseId;
	}

	@Column(name = "WAREHOUSE_NM", length = 35)
	public String getWarehouseNm() {
		return warehouseNm;
	}

	public void setWarehouseNm(String warehouseNm) {
		this.warehouseNm = warehouseNm;
	}

	@Column(name = "REG_ID", length = 35)
	public String getRegId() {
		return regId;
	}

	public void setRegId(String regId) {
		this.regId = regId;
	}

	@Column(name = "REG_NM", length = 35)
	public String getRegNm() {
		return regNm;
	}

	public void setRegNm(String regNm) {
		this.regNm = regNm;
	}

	@Column(name = "WARE_ID", length = 35)
	public String getWareId() {
		return wareId;
	}

	public void setWareId(String wareId) {
		this.wareId = wareId;
	}

	@Column(name = "WARE_NM", length = 35)
	public String getWareNm() {
		return wareNm;
	}

	public void setWareNm(String wareNm) {
		this.wareNm = wareNm;
	}

	@Column(name = "FUND_RT", precision = 6, scale = 4)
	public Double getFundRt() {
		return fundRt;
	}

	public void setFundRt(Double fundRt) {
		this.fundRt = fundRt;
	}

	@Column(name = "REG_AMT", precision = 18, scale = 3)
	public BigDecimal getRegAmt() {
		return regAmt;
	}

	public void setRegAmt(BigDecimal regAmt) {
		this.regAmt = regAmt;
	}

	@Column(name = "TTL_REG_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlRegAmt() {
		return ttlRegAmt;
	}

	public void setTtlRegAmt(BigDecimal ttlRegAmt) {
		this.ttlRegAmt = ttlRegAmt;
	}

	@Column(name = "MAX_DRO_PERC", precision = 18, scale = 4)
	public BigDecimal getMaxDroPerc() {
		return maxDroPerc;
	}

	public void setMaxDroPerc(BigDecimal maxDroPerc) {
		this.maxDroPerc = maxDroPerc;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "GO_DOWN_NO", length = 35)
	public String getGoDownNo() {
		return goDownNo;
	}

	public void setGoDownNo(String goDownNo) {
		this.goDownNo = goDownNo;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
	@Column(name = "LOAN_FLAG", length = 2)
	public String getLoanFlag() {
		return loanFlag;
	}

	public void setLoanFlag(String loanFlag) {
		this.loanFlag = loanFlag;
	}
}