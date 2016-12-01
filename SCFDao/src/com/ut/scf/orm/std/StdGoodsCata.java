package com.ut.scf.orm.std;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * StdGoodsCata entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "std_goods_cata", schema = "STD")
@DynamicUpdate(true)
@DynamicInsert(true)
public class StdGoodsCata implements java.io.Serializable {

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
	private String goodsCata;
	private String CGoodsNm;
	private String goodsCharacter;
	private String producer;
	private String unit;
	private String ccy;
	private BigDecimal price;
	private String goodsId;
	private String region;
	private Timestamp updateDt;
	private String subCata;
	private String sysRelReason;
	private String goodsNm;// 商品名稱
	private String goodsCataTp;// 商品类型

	// Constructors

	/** default constructor */
	public StdGoodsCata() {
	}

	/** minimal constructor */
	public StdGoodsCata(String sysRefNo, Timestamp sysOpTm, Timestamp sysRelTm,
			Timestamp sysAuthTm, Integer sysEventTimes, String goodsCata,
			String ccy, BigDecimal price, String goodsId, Timestamp updateDt,
			String subCata) {
		this.sysRefNo = sysRefNo;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
		this.goodsCata = goodsCata;
		this.ccy = ccy;
		this.price = price;
		this.goodsId = goodsId;
		this.updateDt = updateDt;
		this.subCata = subCata;
	}

	/** full constructor */
	public StdGoodsCata(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String goodsCata, String cGoodsNm,
			String goodsCharacter, String producer, String unit, String ccy,
			BigDecimal price, String goodsId, String region,
			Timestamp updateDt, String subCata, String sysRelReason,
			String goodsNm, String goodsCataTp) {
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
		this.goodsCata = goodsCata;
		CGoodsNm = cGoodsNm;
		this.goodsCharacter = goodsCharacter;
		this.producer = producer;
		this.unit = unit;
		this.ccy = ccy;
		this.price = price;
		this.goodsId = goodsId;
		this.region = region;
		this.updateDt = updateDt;
		this.subCata = subCata;
		this.sysRelReason = sysRelReason;
		this.goodsNm = goodsNm;
		this.goodsCataTp = goodsCataTp;
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

	@Column(name = "SYS_OP_TM", nullable = false, length = 19)
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

	@Column(name = "SYS_REL_TM", nullable = true, length = 19)
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

	@Column(name = "SYS_AUTH_TM", nullable = true, length = 19)
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

	@Column(name = "GOODS_CATA", nullable = false, length = 2)
	public String getGoodsCata() {
		return this.goodsCata;
	}

	public void setGoodsCata(String goodsCata) {
		this.goodsCata = goodsCata;
	}

	@Column(name = "C_GOODS_NM", length = 70)
	public String getCGoodsNm() {
		return this.CGoodsNm;
	}

	public void setCGoodsNm(String CGoodsNm) {
		this.CGoodsNm = CGoodsNm;
	}

	@Column(name = "GOODS_CHARACTER", length = 32)
	public String getGoodsCharacter() {
		return this.goodsCharacter;
	}

	public void setGoodsCharacter(String goodsCharacter) {
		this.goodsCharacter = goodsCharacter;
	}

	@Column(name = "PRODUCER", length = 32)
	public String getProducer() {
		return this.producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
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

	@Column(name = "PRICE", nullable = false, precision = 18, scale = 4)
	public BigDecimal getPrice() {
		return this.price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	@Column(name = "GOODS_ID", nullable = false, length = 35)
	public String getGoodsId() {
		return this.goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	@Column(name = "REGION", length = 20)
	public String getRegion() {
		return this.region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Column(name = "UPDATE_DT", nullable = false, length = 19)
	public Timestamp getUpdateDt() {
		return this.updateDt;
	}

	public void setUpdateDt(Timestamp updateDt) {
		this.updateDt = updateDt;
	}

	@Column(name = "SUB_CATA", nullable = false, length = 2)
	public String getSubCata() {
		return this.subCata;
	}

	public void setSubCata(String subCata) {
		this.subCata = subCata;
	}

	@Column(name = "SYS_REL_REASON", length = 65535)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "GOODS_NM", length = 80)
	public String getGoodsNm() {
		return goodsNm;
	}

	public void setGoodsNm(String goodsNm) {
		this.goodsNm = goodsNm;
	}

	@Column(name = "GOODS_CATA_TP", length = 2)
	public String getGoodsCataTp() {
		return goodsCataTp;
	}

	public void setGoodsCataTp(String goodsCataTp) {
		this.goodsCataTp = goodsCataTp;
	}

}