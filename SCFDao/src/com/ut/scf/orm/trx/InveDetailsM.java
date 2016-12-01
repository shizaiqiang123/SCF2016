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
 * InveDetailsM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INVE_DETAILS_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class InveDetailsM implements java.io.Serializable {

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
	private String refNo;
	private String collatNm;
	private String collatSpec;
	private String goodsId;
	private String prcollatFact;
	private String collatUnit;
	private String ccy;
	private BigDecimal collatRdPrice;
	private BigDecimal collatVal;
	private BigDecimal qty;
	private Timestamp arrivalDt;
	private Integer collatQtyBal;
	private Integer loanQtyBal;
	private Integer collatQty;
	private Integer outQty;
	private BigDecimal outVal;
	private String collatRefNo;
	private String cntrctNo;
	private Integer collatOutQty;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public InveDetailsM() {
	}

	/** minimal constructor */
	public InveDetailsM(String sysRefNo, Integer sysEventTimes) {
		super();
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public InveDetailsM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String refNo, String collatNm,
			String collatSpec, String goodsId, String prcollatFact,
			String collatUnit, String ccy, BigDecimal collatRdPrice,
			BigDecimal collatVal, BigDecimal qty, Timestamp arrivalDt,
			Integer collatQtyBal, Integer loanQtyBal, Integer collatQty,
			Integer outQty, BigDecimal outVal, String collatRefNo,
			String cntrctNo, Integer collatOutQty,String sysOrgId) {
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
		this.refNo = refNo;
		this.collatNm = collatNm;
		this.collatSpec = collatSpec;
		this.goodsId = goodsId;
		this.prcollatFact = prcollatFact;
		this.collatUnit = collatUnit;
		this.ccy = ccy;
		this.collatRdPrice = collatRdPrice;
		this.collatVal = collatVal;
		this.qty = qty;
		this.arrivalDt = arrivalDt;
		this.collatQtyBal = collatQtyBal;
		this.loanQtyBal = loanQtyBal;
		this.collatQty = collatQty;
		this.outQty = outQty;
		this.outVal = outVal;
		this.collatRefNo = collatRefNo;
		this.cntrctNo = cntrctNo;
		this.collatOutQty = collatOutQty;
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

	@Column(name = "REF_NO", length = 50)
	public String getRefNo() {
		return this.refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	@Column(name = "COLLAT_NM", length = 50)
	public String getCollatNm() {
		return this.collatNm;
	}

	public void setCollatNm(String collatNm) {
		this.collatNm = collatNm;
	}

	@Column(name = "COLLAT_SPEC", length = 50)
	public String getCollatSpec() {
		return this.collatSpec;
	}

	public void setCollatSpec(String collatSpec) {
		this.collatSpec = collatSpec;
	}

	@Column(name = "GOODS_ID", length = 50)
	public String getGoodsId() {
		return this.goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	@Column(name = "PRCOLLAT_FACT", length = 50)
	public String getPrcollatFact() {
		return this.prcollatFact;
	}

	public void setPrcollatFact(String prcollatFact) {
		this.prcollatFact = prcollatFact;
	}

	@Column(name = "COLLAT_UNIT", length = 50)
	public String getCollatUnit() {
		return this.collatUnit;
	}

	public void setCollatUnit(String collatUnit) {
		this.collatUnit = collatUnit;
	}

	@Column(name = "CCY", length = 50)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "COLLAT_RD_PRICE", precision = 18, scale = 3)
	public BigDecimal getCollatRdPrice() {
		return this.collatRdPrice;
	}

	public void setCollatRdPrice(BigDecimal collatRdPrice) {
		this.collatRdPrice = collatRdPrice;
	}

	@Column(name = "COLLAT_VAL", precision = 18, scale = 3)
	public BigDecimal getCollatVal() {
		return this.collatVal;
	}

	public void setCollatVal(BigDecimal collatVal) {
		this.collatVal = collatVal;
	}

	@Column(name = "QTY", precision = 10, scale = 0)
	public BigDecimal getQty() {
		return this.qty;
	}

	public void setQty(BigDecimal qty) {
		this.qty = qty;
	}

	@Column(name = "ARRIVAL_DT")
	public Timestamp getArrivalDt() {
		return this.arrivalDt;
	}

	public void setArrivalDt(Timestamp arrivalDt) {
		this.arrivalDt = arrivalDt;
	}

	@Column(name = "COLLAT_QTY_BAL", precision = 10, scale = 0)
	public Integer getCollatQtyBal() {
		return this.collatQtyBal;
	}

	public void setCollatQtyBal(Integer collatQtyBal) {
		this.collatQtyBal = collatQtyBal;
	}

	@Column(name = "LOAN_QTY_BAL", precision = 10, scale = 0)
	public Integer getLoanQtyBal() {
		return this.loanQtyBal;
	}

	public void setLoanQtyBal(Integer loanQtyBal) {
		this.loanQtyBal = loanQtyBal;
	}

	@Column(name = "COLLAT_QTY", precision = 10, scale = 0)
	public Integer getCollatQty() {
		return this.collatQty;
	}

	public void setCollatQty(Integer collatQty) {
		this.collatQty = collatQty;
	}

	@Column(name = "OUT_QTY", precision = 10, scale = 0)
	public Integer getOutQty() {
		return this.outQty;
	}

	public void setOutQty(Integer outQty) {
		this.outQty = outQty;
	}

	@Column(name = "OUT_VAL", precision = 18, scale = 3)
	public BigDecimal getOutVal() {
		return this.outVal;
	}

	public void setOutVal(BigDecimal outVal) {
		this.outVal = outVal;
	}

	@Column(name = "COLLAT_REF_NO", length = 50)
	public String getCollatRefNo() {
		return this.collatRefNo;
	}

	public void setCollatRefNo(String collatRefNo) {
		this.collatRefNo = collatRefNo;
	}

	@Column(name = "CNTRCT_NO", length = 50)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "COLLAT_OUT_QTY", precision = 10, scale = 0)
	public Integer getCollatOutQty() {
		return collatOutQty;
	}

	public void setCollatOutQty(Integer collatOutQty) {
		this.collatOutQty = collatOutQty;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
}