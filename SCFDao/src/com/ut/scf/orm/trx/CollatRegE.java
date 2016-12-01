package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * CollatReg entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "COLLAT_REG_E", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CollatRegE implements java.io.Serializable {

	// Fields

	private CollatRegEId id;
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
	private String selId;
	private String selNm;
	private String patnerId;
	private String patnerNm;
	private String storageId;
	private String storageNm;
	private String storageAdr;
	private String contactNm;
	private String cntrctNo;
	private BigDecimal regAmt;
	private String ccy;
	private BigDecimal regLowestVal;
	private BigDecimal regLoanBal;
	private String busiTp;
	private Integer loanTimes;
	private String sysRelReason;
	private String goodsId;
	private String goodsNm;
	private String unit;// 单位
	private BigDecimal price;// 单价
	private String isMortgage;// 是否抵押登记
	private String note;// 备注
	private String subCata;// 商品子类
	private String producer;// 生产厂家
	private String goodsCharacter;// 规格型号
	private String goodsCata;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7
	private Timestamp collatAdjDt;

	@Column(name = "GOODS_CATA")
	public String getGoodsCata() {
		return goodsCata;
	}

	public void setGoodsCata(String goodsCata) {
		this.goodsCata = goodsCata;
	}

	// Constructors

	/** default constructor */
	public CollatRegE() {
	}

	/** minimal constructor */
	public CollatRegE(CollatRegEId id, String sysLockFlag) {
		this.id = id;
		this.sysLockFlag = sysLockFlag;
	}

	/** full constructor */
	public CollatRegE(CollatRegEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts, String selId,
			String selNm, String patnerId, String patnerNm, String storageId,
			String storageNm, String storageAdr, String contactNm,
			String cntrctNo, BigDecimal regAmt, String ccy,
			BigDecimal regLowestVal, BigDecimal regLoanBal, String busiTp,
			Integer loanTimes, String sysRelReason, String goodsId,
			String goodsNm, String unit, BigDecimal price, String isMortgage,
			String note, String subCata, String producer,
			String goodsCharacter, String goodsCata, String sysOrgId,Timestamp collatAdjDt) {
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
		this.selId = selId;
		this.selNm = selNm;
		this.patnerId = patnerId;
		this.patnerNm = patnerNm;
		this.storageId = storageId;
		this.storageNm = storageNm;
		this.storageAdr = storageAdr;
		this.contactNm = contactNm;
		this.cntrctNo = cntrctNo;
		this.regAmt = regAmt;
		this.ccy = ccy;
		this.regLowestVal = regLowestVal;
		this.regLoanBal = regLoanBal;
		this.busiTp = busiTp;
		this.loanTimes = loanTimes;
		this.sysRelReason = sysRelReason;
		this.goodsId = goodsId;
		this.goodsNm = goodsNm;
		this.unit = unit;
		this.price = price;
		this.isMortgage = isMortgage;
		this.note = note;
		this.subCata = subCata;
		this.producer = producer;
		this.goodsCharacter = goodsCharacter;
		this.goodsCata = goodsCata;
		this.sysOrgId = sysOrgId;
		this.collatAdjDt = collatAdjDt;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false, precision = 4, scale = 0)) })
	public CollatRegEId getId() {
		return this.id;
	}

	public void setId(CollatRegEId id) {
		this.id = id;
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

	@Column(name = "SYS_REL_TM", length = 11)
	public Timestamp getSysRelTm() {
		return this.sysRelTm;
	}

	public void setSysRelTm(Timestamp sysRelTm) {
		this.sysRelTm = sysRelTm;
	}

	@Column(name = "SYS_AUTH_TM", length = 11)
	public Timestamp getSysAuthTm() {
		return this.sysAuthTm;
	}

	public void setSysAuthTm(Timestamp sysAuthTm) {
		this.sysAuthTm = sysAuthTm;
	}

	@Column(name = "SYS_REL_ID", length = 35)
	public String getSysRelId() {
		return this.sysRelId;
	}

	public void setSysRelId(String sysRelId) {
		this.sysRelId = sysRelId;
	}

	@Column(name = "SYS_AUTH_ID", length = 35)
	public String getSysAuthId() {
		return this.sysAuthId;
	}

	public void setSysAuthId(String sysAuthId) {
		this.sysAuthId = sysAuthId;
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

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "SEL_NM", length = 70)
	public String getSelNm() {
		return this.selNm;
	}

	public void setSelNm(String selNm) {
		this.selNm = selNm;
	}

	@Column(name = "PATNER_ID", length = 35)
	public String getPatnerId() {
		return this.patnerId;
	}

	public void setPatnerId(String patnerId) {
		this.patnerId = patnerId;
	}

	@Column(name = "PATNER_NM", length = 70)
	public String getPatnerNm() {
		return this.patnerNm;
	}

	public void setPatnerNm(String patnerNm) {
		this.patnerNm = patnerNm;
	}

	@Column(name = "STORAGE_ID", length = 35)
	public String getStorageId() {
		return this.storageId;
	}

	public void setStorageId(String storageId) {
		this.storageId = storageId;
	}

	@Column(name = "STORAGE_NM", length = 70)
	public String getStorageNm() {
		return this.storageNm;
	}

	public void setStorageNm(String storageNm) {
		this.storageNm = storageNm;
	}

	@Column(name = "STORAGE_ADR", length = 70)
	public String getStorageAdr() {
		return this.storageAdr;
	}

	public void setStorageAdr(String storageAdr) {
		this.storageAdr = storageAdr;
	}

	@Column(name = "CONTACT_NM", length = 70)
	public String getContactNm() {
		return this.contactNm;
	}

	public void setContactNm(String contactNm) {
		this.contactNm = contactNm;
	}

	@Column(name = "CNTRCT_NO", length = 35)
	public String getCntrctNo() {
		return this.cntrctNo;
	}

	public void setCntrctNo(String cntrctNo) {
		this.cntrctNo = cntrctNo;
	}

	@Column(name = "REG_AMT", precision = 18, scale = 3)
	public BigDecimal getRegAmt() {
		return this.regAmt;
	}

	public void setRegAmt(BigDecimal regAmt) {
		this.regAmt = regAmt;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "REG_LOWEST_VAL", precision = 18, scale = 3)
	public BigDecimal getRegLowestVal() {
		return this.regLowestVal;
	}

	public void setRegLowestVal(BigDecimal regLowestVal) {
		this.regLowestVal = regLowestVal;
	}

	@Column(name = "REG_LOAN_BAL", precision = 18, scale = 3)
	public BigDecimal getRegLoanBal() {
		return this.regLoanBal;
	}

	public void setRegLoanBal(BigDecimal regLoanBal) {
		this.regLoanBal = regLoanBal;
	}

	@Column(name = "BUSI_TP", length = 8)
	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "LOAN_TIMES", precision = 3, scale = 0)
	public Integer getLoanTimes() {
		return this.loanTimes;
	}

	public void setLoanTimes(Integer loanTimes) {
		this.loanTimes = loanTimes;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "GOODS_ID", length = 35)
	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
	}

	@Column(name = "GOODS_NM", length = 70)
	public String getGoodsNm() {
		return goodsNm;
	}

	public void setGoodsNm(String goodsNm) {
		this.goodsNm = goodsNm;
	}

	@Column(name = "IS_MORTGAGE", length = 8)
	public String getIsMortgage() {
		return isMortgage;
	}

	public void setIsMortgage(String isMortgage) {
		this.isMortgage = isMortgage;
	}

	@Column(name = "NOTE", length = 300)
	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

	@Column(name = "UNIT", length = 35)
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Column(name = "PRICE", precision = 18, scale = 3)
	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	@Column(name = "SUB_CATA", length = 35)
	public String getSubCata() {
		return subCata;
	}

	public void setSubCata(String subCata) {
		this.subCata = subCata;
	}

	@Column(name = "PRODUCER", length = 35)
	public String getProducer() {
		return producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	@Column(name = "GOODS_CHARACTER", length = 35)
	public String getGoodsCharacter() {
		return goodsCharacter;
	}

	public void setGoodsCharacter(String goodsCharacter) {
		this.goodsCharacter = goodsCharacter;
	}
	
	@Column(name = "COLLAT_ADJ_DT", length = 7)
	public Timestamp getCollatAdjDt() {

		return this.collatAdjDt;
	}

	public void setCollatAdjDt(Timestamp collatAdjDt) {
		this.collatAdjDt = collatAdjDt;
	}

}
