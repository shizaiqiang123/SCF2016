package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

/**
 * Collateral entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "COLLAT_CH_M", schema = "TRX")
@DynamicUpdate(true)
public class CollatChM implements java.io.Serializable {

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
	private String cntrctNo;
	private String collatNm;
	private String collatQty;
	private String collatCcy;
	private BigDecimal collatVal;
	private BigDecimal price;
	private BigDecimal salePrice;
	private BigDecimal ttlLoanAmt;
	private String ttlLoanQty;
	private String ttlInQty;
	private BigDecimal ttlInAmt;
	private BigDecimal ttlOutAmt;
	private String ttlOutQty;
	private Timestamp arrivalDt;
	private BigDecimal collatRdPrice;
	private String regNo;
	private Timestamp collatAdjDt;
	private String collatSpec;
	private String collatFact;
	private String qty;
	private String weight;
	private String collatUnit;
	private String collatId;
	private String collatOutQty;
	private String outQty;
	private String outWeight;
	private String froFlag;
	private String collatQtyBal;// 可融资数量
	private String loanFlag;// 是否融资标识
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	private String goodsId;//货物流水号
	// Constructors

	/** default constructor */
	public CollatChM() {
	}

	/** minimal constructor */
	public CollatChM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CollatChM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String cntrctNo, String collatNm,
			String collatQty, String collatCcy, BigDecimal collatVal,
			BigDecimal price, BigDecimal salePrice, BigDecimal ttlLoanAmt,
			String ttlLoanQty, String ttlInQty, BigDecimal ttlInAmt,
			BigDecimal ttlOutAmt, String ttlOutQty, Timestamp arrivalDt,
			BigDecimal collatRdPrice, String regNo, Timestamp collatAdjDt,
			String collatSpec, String collatFact, String qty, String weight,
			String collatUnit, String collatId, String collatOutQty,
			String outQty, String outWeight, String froFlag,
			String collatQtyBal, String loanFlag,String sysOrgId,String goodsId) {
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
		this.cntrctNo = cntrctNo;
		this.collatNm = collatNm;
		this.collatQty = collatQty;
		this.collatCcy = collatCcy;
		this.collatVal = collatVal;
		this.price = price;
		this.salePrice = salePrice;
		this.ttlLoanAmt = ttlLoanAmt;
		this.ttlLoanQty = ttlLoanQty;
		this.ttlInQty = ttlInQty;
		this.ttlInAmt = ttlInAmt;
		this.ttlOutAmt = ttlOutAmt;
		this.ttlOutQty = ttlOutQty;
		this.arrivalDt = arrivalDt;
		this.collatRdPrice = collatRdPrice;
		this.regNo = regNo;
		this.collatAdjDt = collatAdjDt;
		this.collatSpec = collatSpec;
		this.collatFact = collatFact;
		this.qty = qty;
		this.weight = weight;
		this.collatUnit = collatUnit;
		this.collatId = collatId;
		this.collatOutQty = collatOutQty;
		this.outQty = outQty;
		this.outWeight = outWeight;
		this.froFlag = froFlag;
		this.collatQtyBal = collatQtyBal;
		this.loanFlag = loanFlag;
		this.sysOrgId = sysOrgId;
		this.goodsId =goodsId;
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

	@Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "COLLAT_NM", length = 70)
	public String getCollatNm() {
		return this.collatNm;
	}

	public void setCollatNm(String collatNm) {
		this.collatNm = collatNm;
	}

	@Column(name = "COLLAT_QTY", length = 20)
	public String getCollatQty() {
		return this.collatQty;
	}

	public void setCollatQty(String collatQty) {
		this.collatQty = collatQty;
	}

	@Column(name = "COLLAT_CCY", length = 3)
	public String getCollatCcy() {
		return this.collatCcy;
	}

	public void setCollatCcy(String collatCcy) {
		this.collatCcy = collatCcy;
	}

	@Column(name = "COLLAT_VAL", precision = 22, scale = 0)
	public BigDecimal getCollatVal() {
		return this.collatVal;
	}

	public void setCollatVal(BigDecimal collatVal) {
		this.collatVal = collatVal;
	}

	@Column(name = "PRICE", precision = 22, scale = 0)
	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	@Column(name = "SALE_PRICE", precision = 22, scale = 0)
	public BigDecimal getSalePrice() {
		return this.salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	@Column(name = "TTL_LOAN_AMT", precision = 22, scale = 0)
	public BigDecimal getTtlLoanAmt() {
		return this.ttlLoanAmt;
	}

	public void setTtlLoanAmt(BigDecimal ttlLoanAmt) {
		this.ttlLoanAmt = ttlLoanAmt;
	}

	@Column(name = "TTL_LOAN_QTY", length = 20)
	public String getTtlLoanQty() {
		return this.ttlLoanQty;
	}

	public void setTtlLoanQty(String ttlLoanQty) {
		this.ttlLoanQty = ttlLoanQty;
	}

	@Column(name = "TTL_IN_QTY", length = 20)
	public String getTtlInQty() {
		return this.ttlInQty;
	}

	public void setTtlInQty(String ttlInQty) {
		this.ttlInQty = ttlInQty;
	}

	@Column(name = "TTL_IN_AMT", precision = 22, scale = 0)
	public BigDecimal getTtlInAmt() {
		return this.ttlInAmt;
	}

	public void setTtlInAmt(BigDecimal ttlInAmt) {
		this.ttlInAmt = ttlInAmt;
	}

	@Column(name = "TTL_OUT_AMT", precision = 22, scale = 0)
	public BigDecimal getTtlOutAmt() {
		return this.ttlOutAmt;
	}

	public void setTtlOutAmt(BigDecimal ttlOutAmt) {
		this.ttlOutAmt = ttlOutAmt;
	}

	@Column(name = "TTL_OUT_QTY", length = 20)
	public String getTtlOutQty() {
		return this.ttlOutQty;
	}

	public void setTtlOutQty(String ttlOutQty) {
		this.ttlOutQty = ttlOutQty;
	}

	@Column(name = "ARRIVAL_DT", length = 11)
	public Timestamp getArrivalDt() {
		return this.arrivalDt;
	}

	public void setArrivalDt(Timestamp arrivalDt) {
		this.arrivalDt = arrivalDt;
	}

	@Column(name = "COLLAT_RD_PRICE", precision = 22, scale = 0)
	public BigDecimal getCollatRdPrice() {
		return this.collatRdPrice;
	}

	public void setCollatRdPrice(BigDecimal collatRdPrice) {
		this.collatRdPrice = collatRdPrice;
	}

	@Column(name = "REG_NO", length = 35)
	public String getRegNo() {
		return this.regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	@Column(name = "COLLAT_ADJ_DT", length = 7)
	public Timestamp getCollatAdjDt() {

		return this.collatAdjDt;
	}

	public void setCollatAdjDt(Timestamp collatAdjDt) {
		this.collatAdjDt = collatAdjDt;
	}

	@Column(name = "COLLAT_SPEC", length = 50)
	public String getCollatSpec() {
		return this.collatSpec;
	}

	public void setCollatSpec(String collatSpec) {
		this.collatSpec = collatSpec;
	}

	@Column(name = "COLLAT_FACT", length = 35)
	public String getCollatFact() {
		return this.collatFact;
	}

	public void setCollatFact(String collatFact) {
		this.collatFact = collatFact;
	}

	@Column(name = "QTY", length = 20)
	public String getQty() {
		return this.qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	@Column(name = "WEIGHT", length = 20)
	public String getWeight() {
		return this.weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	@Column(name = "COLLAT_UNIT", length = 10)
	public String getCollatUnit() {
		return this.collatUnit;
	}

	public void setCollatUnit(String collatUnit) {
		this.collatUnit = collatUnit;
	}

	@Column(name = "COLLAT_ID", length = 35)
	public String getCollatId() {
		return collatId;
	}

	public void setCollatId(String collatId) {
		this.collatId = collatId;
	}

	@Column(name = "COLLAT_OUT_QTY", length = 18)
	public String getCollatOutQty() {
		return collatOutQty;
	}

	public void setCollatOutQty(String collatOutQty) {
		this.collatOutQty = collatOutQty;
	}

	@Column(name = "OUT_QTY", length = 18)
	public String getOutQty() {
		return outQty;
	}

	public void setOutQty(String outQty) {
		this.outQty = outQty;
	}

	@Column(name = "OUT_WEIGHT", length = 18)
	public String getOutWeight() {
		return outWeight;
	}

	public void setOutWeight(String outWeight) {
		this.outWeight = outWeight;
	}

	@Column(name = "FRO_FLAG", length = 2)
	public String getFroFlag() {
		return froFlag;
	}

	public void setFroFlag(String froFlag) {
		this.froFlag = froFlag;
	}

	@Column(name = "COLLAT_QTY_BAL", length = 20)
	public String getCollatQtyBal() {
		return collatQtyBal;
	}

	public void setCollatQtyBal(String collatQtyBal) {
		this.collatQtyBal = collatQtyBal;
	}

	@Column(name = "LOAN_FLAG", length = 2)
	public String getLoanFlag() {
		return loanFlag;
	}

	public void setLoanFlag(String loanFlag) {
		this.loanFlag = loanFlag;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
	@Column(name = "GOODS_ID", length = 35)
	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}
}