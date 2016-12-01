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

///**
// * LoanRegE entity. @author MyEclipse Persistence Tools
// */
@Entity
@Table(name = "LOAN_REG_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class LoanRegE implements java.io.Serializable {

	// /**
	// *
	// */
	private static final long serialVersionUID = -2774132338267285788L;
	// // Fields
	//
	private LoanRegEId id;
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
	private String regNo;
	private String collatNm;
	private String collatSpec;
	private String goodsId;
	private String prcollatFact;
	private String collatUnit;
	private String ccy;
	private BigDecimal collatRdPrice;
	private BigDecimal collatVal;
	private Timestamp collatAdjDt;
	private Integer qty;
	private Timestamp arrivalDt;
	private Integer poLoanNum;
	private BigDecimal collatQtyBal;
	private BigDecimal ttlCollatVal;
	private String collatChId;
	private String collatId;
	private String collatQty;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	//
	public LoanRegE() {
	}

	public LoanRegE(LoanRegEId id) {
		this.id = id;
	}

	public LoanRegE(LoanRegEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String loanId, String regNo, String collatNm, String collatSpec,
			String goodsId, String prcollatFact, String collatUnit, String ccy,
			BigDecimal collatRdPrice, BigDecimal collatVal,
			Timestamp collatAdjDt, Integer qty, Timestamp arrivalDt,
			Integer poLoanNum, BigDecimal collatQtyBal,
			BigDecimal ttlCollatVal, String collatChId, String collatId,
			String collatQty,String sysOrgId) {
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
		this.regNo = regNo;
		this.collatNm = collatNm;
		this.collatSpec = collatSpec;
		this.goodsId = goodsId;
		this.prcollatFact = prcollatFact;
		this.collatUnit = collatUnit;
		this.ccy = ccy;
		this.collatRdPrice = collatRdPrice;
		this.collatVal = collatVal;
		this.collatAdjDt = collatAdjDt;
		this.qty = qty;
		this.arrivalDt = arrivalDt;
		this.poLoanNum = poLoanNum;
		this.collatQtyBal = collatQtyBal;
		this.ttlCollatVal = ttlCollatVal;
		this.collatChId = collatChId;
		this.collatId = collatId;
		this.collatQty = collatQty;
		this.sysOrgId = sysOrgId;
	}

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)) })
	public LoanRegEId getId() {
		return id;
	}

	public void setId(LoanRegEId id) {
		this.id = id;
	}

	@Column(name = "SYS_OP_ID", length = 35)
	public String getSysOpId() {
		return sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_OP_TM", length = 11)
	public Timestamp getSysOpTm() {
		return sysOpTm;
	}

	public void setSysOpTm(Timestamp sysOpTm) {
		this.sysOpTm = sysOpTm;
	}

	@Column(name = "SYS_REL_ID", length = 35)
	public String getSysRelId() {
		return sysRelId;
	}

	public void setSysRelId(String sysRelId) {
		this.sysRelId = sysRelId;
	}

	@Column(name = "SYS_REL_TM", length = 11)
	public Timestamp getSysRelTm() {
		return sysRelTm;
	}

	public void setSysRelTm(Timestamp sysRelTm) {
		this.sysRelTm = sysRelTm;
	}

	@Column(name = "SYS_AUTH_ID", length = 35)
	public String getSysAuthId() {
		return sysAuthId;
	}

	public void setSysAuthId(String sysAuthId) {
		this.sysAuthId = sysAuthId;
	}

	@Column(name = "SYS_AUTH_TM", length = 11)
	public Timestamp getSysAuthTm() {
		return sysAuthTm;
	}

	public void setSysAuthTm(Timestamp sysAuthTm) {
		this.sysAuthTm = sysAuthTm;
	}

	@Column(name = "SYS_NEXT_OP", length = 35)
	public String getSysNextOp() {
		return sysNextOp;
	}

	public void setSysNextOp(String sysNextOp) {
		this.sysNextOp = sysNextOp;
	}

	@Column(name = "SYS_LOCK_FLAG", length = 1)
	public String getSysLockFlag() {
		return sysLockFlag;
	}

	public void setSysLockFlag(String sysLockFlag) {
		this.sysLockFlag = sysLockFlag;
	}

	@Column(name = "SYS_LOCK_BY", length = 35)
	public String getSysLockBy() {
		return sysLockBy;
	}

	public void setSysLockBy(String sysLockBy) {
		this.sysLockBy = sysLockBy;
	}

	@Column(name = "SYS_FUNC_ID", length = 35)
	public String getSysFuncId() {
		return sysFuncId;
	}

	public void setSysFuncId(String sysFuncId) {
		this.sysFuncId = sysFuncId;
	}

	@Column(name = "SYS_TRX_STS", length = 1)
	public String getSysTrxSts() {
		return sysTrxSts;
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

	@Column(name = "REG_NO", length = 35)
	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	@Column(name = "COLLAT_NM", length = 35)
	public String getCollatNm() {
		return collatNm;
	}

	public void setCollatNm(String collatNm) {
		this.collatNm = collatNm;
	}

	@Column(name = "COLLAT_SPEC", length = 35)
	public String getCollatSpec() {
		return collatSpec;
	}

	public void setCollatSpec(String collatSpec) {
		this.collatSpec = collatSpec;
	}

	@Column(name = "GOODS_ID", length = 35)
	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	@Column(name = "PRCOLLAT_FACT", length = 35)
	public String getPrcollatFact() {
		return prcollatFact;
	}

	public void setPrcollatFact(String prcollatFact) {
		this.prcollatFact = prcollatFact;
	}

	@Column(name = "COLLAT_UNIT", length = 3)
	public String getCollatUnit() {
		return collatUnit;
	}

	public void setCollatUnit(String collatUnit) {
		this.collatUnit = collatUnit;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "COLLAT_RD_PRICE", precision = 22, scale = 0)
	public BigDecimal getCollatRdPrice() {
		return collatRdPrice;
	}

	public void setCollatRdPrice(BigDecimal collatRdPrice) {
		this.collatRdPrice = collatRdPrice;
	}

	@Column(name = "COLLAT_VAL", precision = 22, scale = 0)
	public BigDecimal getCollatVal() {
		return collatVal;
	}

	public void setCollatVal(BigDecimal collatVal) {
		this.collatVal = collatVal;
	}

	@Column(name = "COLLAT_ADJ_DT", length = 11)
	public Timestamp getCollatAdjDt() {
		return collatAdjDt;
	}

	public void setCollatAdjDt(Timestamp collatAdjDt) {
		this.collatAdjDt = collatAdjDt;
	}

	@Column(name = "QTY", precision = 4, scale = 0)
	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	@Column(name = "ARRIVAL_DT", length = 11)
	public Timestamp getArrivalDt() {
		return arrivalDt;
	}

	public void setArrivalDt(Timestamp arrivalDt) {
		this.arrivalDt = arrivalDt;
	}

	@Column(name = "PO_LOAN_NUM", precision = 4, scale = 0)
	public Integer getPoLoanNum() {
		return this.poLoanNum;
	}

	public void setPoLoanNum(Integer poLoanNum) {
		this.poLoanNum = poLoanNum;
	}

	@Column(name = "COLLAT_QTY_BAL", precision = 22, scale = 0)
	public BigDecimal getCollatQtyBal() {
		return this.collatQtyBal;
	}

	public void setCollatQtyBal(BigDecimal collatQtyBal) {
		this.collatQtyBal = collatQtyBal;
	}

	@Column(name = "TTL_COLLAT_VAL", precision = 22, scale = 0)
	public BigDecimal getTtlCollatVal() {
		return this.ttlCollatVal;
	}

	public void setTtlCollatVal(BigDecimal ttlCollatVal) {
		this.ttlCollatVal = ttlCollatVal;
	}

	@Column(name = "COLLAT_CH_ID", length = 35)
	public String getCollatChId() {
		return collatChId;
	}

	public void setCollatChId(String collatChId) {
		this.collatChId = collatChId;
	}

	@Column(name = "COLLAT_ID", length = 35)
	public String getCollatId() {
		return collatId;
	}

	public void setCollatId(String collatId) {
		this.collatId = collatId;
	}

	@Column(name = "COLLAT_QTY", length = 20)
	public String getCollatQty() {
		return this.collatQty;
	}

	public void setCollatQty(String collatQty) {
		this.collatQty = collatQty;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}