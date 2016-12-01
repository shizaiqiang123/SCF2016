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
 * ChangeDetailsE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CHANGE_DETAILS_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class ChangeDetailsE implements java.io.Serializable {

	// Fields

	private ChangeDetailsEId id;
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
	private String inoutRef;
	private String refNo;
	private String collatNm;
	private String collatSpec;
	private String goodsId;
	private String prcollatFact;
	private String collatUnit;
	private String ccy;
	private String qty;
	private BigDecimal collatRdPrice;
	private String collatQty;
	private String outQty;
	private BigDecimal collatVal;
	private BigDecimal poOutAmt;
	private Timestamp collatAdjDt;
	private Timestamp arrivalDt;
	private String changeFlag;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public ChangeDetailsE() {
	}

	/** minimal constructor */
	public ChangeDetailsE(ChangeDetailsEId id, Timestamp sysOpTm) {
		super();
		this.id = id;
		this.sysOpTm = sysOpTm;
	}

	/** full constructor */
	public ChangeDetailsE(ChangeDetailsEId id, String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm,
			String sysAuthId, Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy,
			String sysFuncId, String sysTrxSts, String inoutRef, String refNo, String collatNm, String collatSpec,
			String goodsId, String prcollatFact, String collatUnit, String ccy, String qty, BigDecimal collatRdPrice,
			String collatQty, String outQty, BigDecimal collatVal, BigDecimal poOutAmt, Timestamp collatAdjDt,
			Timestamp arrivalDt, String changeFlag,String sysOrgId) {
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
		this.inoutRef = inoutRef;
		this.refNo = refNo;
		this.collatNm = collatNm;
		this.collatSpec = collatSpec;
		this.goodsId = goodsId;
		this.prcollatFact = prcollatFact;
		this.collatUnit = collatUnit;
		this.ccy = ccy;
		this.qty = qty;
		this.collatRdPrice = collatRdPrice;
		this.collatQty = collatQty;
		this.outQty = outQty;
		this.collatVal = collatVal;
		this.poOutAmt = poOutAmt;
		this.collatAdjDt = collatAdjDt;
		this.arrivalDt = arrivalDt;
		this.changeFlag = changeFlag;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35) ),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 38, scale = 0) ) })
	public ChangeDetailsEId getId() {
		return this.id;
	}

	public void setId(ChangeDetailsEId id) {
		this.id = id;
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

	@Column(name = "INOUT_REF", length = 35)
	public String getInoutRef() {
		return this.inoutRef;
	}

	public void setInoutRef(String inoutRef) {
		this.inoutRef = inoutRef;
	}

	@Column(name = "REF_NO", length = 35)
	public String getRefNo() {
		return this.refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	@Column(name = "COLLAT_NM", length = 35)
	public String getCollatNm() {
		return this.collatNm;
	}

	public void setCollatNm(String collatNm) {
		this.collatNm = collatNm;
	}

	@Column(name = "COLLAT_SPEC", length = 35)
	public String getCollatSpec() {
		return this.collatSpec;
	}

	public void setCollatSpec(String collatSpec) {
		this.collatSpec = collatSpec;
	}

	@Column(name = "GOODS_ID", length = 35)
	public String getGoodsId() {
		return this.goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	@Column(name = "PRCOLLAT_FACT", length = 35)
	public String getPrcollatFact() {
		return this.prcollatFact;
	}

	public void setPrcollatFact(String prcollatFact) {
		this.prcollatFact = prcollatFact;
	}

	@Column(name = "COLLAT_UNIT", length = 10)
	public String getCollatUnit() {
		return this.collatUnit;
	}

	public void setCollatUnit(String collatUnit) {
		this.collatUnit = collatUnit;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "QTY", length = 18)
	public String getQty() {
		return this.qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	@Column(name = "COLLAT_RD_PRICE", precision = 18, scale = 3)
	public BigDecimal getCollatRdPrice() {
		return this.collatRdPrice;
	}

	public void setCollatRdPrice(BigDecimal collatRdPrice) {
		this.collatRdPrice = collatRdPrice;
	}

	@Column(name = "COLLAT_QTY", length = 18)
	public String getCollatQty() {
		return this.collatQty;
	}

	public void setCollatQty(String collatQty) {
		this.collatQty = collatQty;
	}

	@Column(name = "OUT_QTY", length = 18)
	public String getOutQty() {
		return this.outQty;
	}

	public void setOutQty(String outQty) {
		this.outQty = outQty;
	}

	@Column(name = "COLLAT_VAL", precision = 18, scale = 3)
	public BigDecimal getCollatVal() {
		return this.collatVal;
	}

	public void setCollatVal(BigDecimal collatVal) {
		this.collatVal = collatVal;
	}

	@Column(name = "PO_OUT_AMT", precision = 18, scale = 3)
	public BigDecimal getPoOutAmt() {
		return this.poOutAmt;
	}

	public void setPoOutAmt(BigDecimal poOutAmt) {
		this.poOutAmt = poOutAmt;
	}

	@Column(name = "COLLAT_ADJ_DT")
	public Timestamp getCollatAdjDt() {
		return this.collatAdjDt;
	}

	public void setCollatAdjDt(Timestamp collatAdjDt) {
		this.collatAdjDt = collatAdjDt;
	}

	@Column(name = "ARRIVAL_DT")
	public Timestamp getArrivalDt() {
		return this.arrivalDt;
	}

	public void setArrivalDt(Timestamp arrivalDt) {
		this.arrivalDt = arrivalDt;
	}

	@Column(name = "CHANGE_FLAG", length = 1)
	public String getChangeFlag() {
		return this.changeFlag;
	}

	public void setChangeFlag(String changeFlag) {
		this.changeFlag = changeFlag;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

}