package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * CollateralM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "COLLATERAL_M", schema = "TRX")
public class CollateralM implements java.io.Serializable {

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
	private String poNo;
	private String buyerId;
	private String selId;
	private String refNo;
	private String poBrand;
	private String poModel;
	private BigDecimal poPrice;
	private Long poNum;
	private BigDecimal ttlAmt;
	private String remark;
	private String goodsId;
	private String goodsNm;
	private String unit;
	private String ccy;
	private String goodsCharacter;
	private String subCata;
	private String goodsCata;
	private String producer;
	private Long poNumUseable;
	private Long poNumUsed;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7
	private Timestamp poDueDt;// 发货到期日

	// Constructors

	/** default constructor */
	public CollateralM() {
	}

	/** minimal constructor */
	public CollateralM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CollateralM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String cntrctNo, String poNo,
			String buyerId, String selId, String refNo, String poBrand,
			String poModel, BigDecimal poPrice, Long poNum, BigDecimal ttlAmt,
			String remark, String goodsId, String goodsNm, String unit,
			String ccy, String goodsCharacter, String subCata,
			String goodsCata, String producer, Long poNumUseable,
			Long poNumUsed, String sysOrgId, Timestamp poDueDt) {
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
		this.poNo = poNo;
		this.buyerId = buyerId;
		this.selId = selId;
		this.refNo = refNo;
		this.poBrand = poBrand;
		this.poModel = poModel;
		this.poPrice = poPrice;
		this.poNum = poNum;
		this.ttlAmt = ttlAmt;
		this.remark = remark;
		this.goodsId = goodsId;
		this.goodsNm = goodsNm;
		this.unit = unit;
		this.ccy = ccy;
		this.goodsCharacter = goodsCharacter;
		this.subCata = subCata;
		this.goodsCata = goodsCata;
		this.producer = producer;
		this.poNumUseable = poNumUseable;
		this.poNumUsed = poNumUsed;
		this.sysOrgId = sysOrgId;
		this.poDueDt = poDueDt;
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

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "PO_NO", length = 35)
	public String getPoNo() {
		return this.poNo;
	}

	public void setPoNo(String poNo) {
		this.poNo = poNo;
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

	@Column(name = "REF_NO", length = 35)
	public String getRefNo() {
		return this.refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	@Column(name = "PO_BRAND", length = 35)
	public String getPoBrand() {
		return this.poBrand;
	}

	public void setPoBrand(String poBrand) {
		this.poBrand = poBrand;
	}

	@Column(name = "PO_MODEL", length = 35)
	public String getPoModel() {
		return this.poModel;
	}

	public void setPoModel(String poModel) {
		this.poModel = poModel;
	}

	@Column(name = "PO_PRICE", precision = 18, scale = 3)
	public BigDecimal getPoPrice() {
		return this.poPrice;
	}

	public void setPoPrice(BigDecimal poPrice) {
		this.poPrice = poPrice;
	}

	@Column(name = "PO_NUM", precision = 10, scale = 0)
	public Long getPoNum() {
		return this.poNum;
	}

	public void setPoNum(Long poNum) {
		this.poNum = poNum;
	}

	@Column(name = "TTL_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlAmt() {
		return this.ttlAmt;
	}

	public void setTtlAmt(BigDecimal ttlAmt) {
		this.ttlAmt = ttlAmt;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "GOODS_CHARACTER", length = 32)
	public String getGoodsCharacter() {
		return this.goodsCharacter;
	}

	public void setGoodsCharacter(String goodsCharacter) {
		this.goodsCharacter = goodsCharacter;
	}

	@Column(name = "UNIT", length = 3)
	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Column(name = "CCY", nullable = false, length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "GOODS_ID", nullable = false, length = 35)
	public String getGoodsId() {
		return this.goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	@Column(name = "GOODS_NM", length = 80)
	public String getGoodsNm() {
		return goodsNm;
	}

	public void setGoodsNm(String goodsNm) {
		this.goodsNm = goodsNm;
	}

	@Column(name = "SUB_CATA", nullable = false, length = 2)
	public String getSubCata() {
		return this.subCata;
	}

	public void setSubCata(String subCata) {
		this.subCata = subCata;
	}

	@Column(name = "GOODS_CATA", nullable = false, length = 2)
	public String getGoodsCata() {
		return this.goodsCata;
	}

	public void setGoodsCata(String goodsCata) {
		this.goodsCata = goodsCata;
	}

	@Column(name = "PRODUCER", length = 32)
	public String getProducer() {
		return this.producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	@Column(name = "PO_NUM_USEABLE", precision = 10, scale = 0)
	public Long getPoNumUseable() {
		return poNumUseable;
	}

	public void setPoNumUseable(Long poNumUseable) {
		this.poNumUseable = poNumUseable;
	}

	@Column(name = "PO_NUM_USED", precision = 10, scale = 0)
	public Long getPoNumUsed() {
		return poNumUsed;
	}

	public void setPoNumUsed(Long poNumUsed) {
		this.poNumUsed = poNumUsed;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

	@Column(name = "PO_DUE_DT")
	public Timestamp getPoDueDt() {
		return poDueDt;
	}

	public void setPoDueDt(Timestamp poDueDt) {
		this.poDueDt = poDueDt;
	}
}