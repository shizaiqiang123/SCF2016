package com.ut.scf.orm.trx;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * InoutDetails entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "INOUT_DETAILS", schema = "TRX")
public class InoutDetails implements java.io.Serializable {

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
	private String inoutRefNo;
	private String crtfRefNo;
	private String crtfNo;
	private String busiTp;
	private Timestamp trxDt;
	private String billNo;
	private BigDecimal billAmt;
	private Timestamp billValDt;
	private Timestamp billDueDt;
	private String adviceNo;
	private Timestamp adviceDt;
	private String brandNo;
	private String chassisNo;
	private String engineNo;
	BigDecimal adviceAmt;
	private Timestamp releaseDt;

	/** add by YeQing 2016-6-13 ------start */
	private Long poInNum;// 入库数量
	private Long ttlPoOutNum;// 已出库数量
	private Long poOutNum;// 本次出库数量
	private BigDecimal poOutAmt;// 本次出库价值
	private String producer;// 生产厂家
	private String unit;// 计价单位
	private String ccy;// 币别
	private BigDecimal price;// 单价
	private String goodsId;// 商品ID
	private String goodsNm;// 商品名称
	private String subCata;// 商品子类
	private String collatSpec;// 规格型号
	private String goodsCata;// 商品大类

	/** add by YeQing 2016-6-13 ------end */

	// 订单编号
	private String poRef;
	private String goodsCharacter;// 商品大类
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	private BigDecimal poPrice;// 商品单价
	private Long poNum;// 商品数量
	private BigDecimal ttlAmt;// 商品总价
	private Timestamp poDueDt;// 发货到期日
	private Long poNumUseable;// 商品可发货数量
	private BigDecimal poNumUseableAmt;// 商品可发货数量价值

	// Constructors

	/** default constructor */
	public InoutDetails() {
	}

	/** minimal constructor */
	public InoutDetails(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public InoutDetails(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String inoutRefNo, String crtfRefNo,
			String crtfNo, String busiTp, Timestamp trxDt, String billNo,
			BigDecimal billAmt, Timestamp billValDt, Timestamp billDueDt,
			String adviceNo, Timestamp adviceDt, String brandNo,
			String chassisNo, String engineNo, BigDecimal adviceAmt,
			Timestamp releaseDt, Long poInNum, Long ttlPoOutNum, Long poOutNum,
			BigDecimal poOutAmt, String producer, String unit, String ccy,
			BigDecimal price, String goodsId, String goodsNm, String subCata,
			String collatSpec, String goodsCata, String poRef,
			String goodsCharacter, String sysOrgId, BigDecimal poPrice,
			Long poNum, BigDecimal ttlAmt, Timestamp poDueDt,
			Long poNumUseable, BigDecimal poNumUseableAmt) {
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
		this.inoutRefNo = inoutRefNo;
		this.crtfRefNo = crtfRefNo;
		this.crtfNo = crtfNo;
		this.busiTp = busiTp;
		this.trxDt = trxDt;
		this.billNo = billNo;
		this.billAmt = billAmt;
		this.billValDt = billValDt;
		this.billDueDt = billDueDt;
		this.adviceNo = adviceNo;
		this.adviceDt = adviceDt;
		this.brandNo = brandNo;
		this.chassisNo = chassisNo;
		this.engineNo = engineNo;
		this.adviceAmt = adviceAmt;
		this.releaseDt = releaseDt;
		this.poInNum = poInNum;
		this.ttlPoOutNum = ttlPoOutNum;
		this.poOutNum = poOutNum;
		this.poOutAmt = poOutAmt;
		this.producer = producer;
		this.unit = unit;
		this.ccy = ccy;
		this.price = price;
		this.goodsId = goodsId;
		this.goodsNm = goodsNm;
		this.subCata = subCata;
		this.collatSpec = collatSpec;
		this.goodsCata = goodsCata;
		this.poRef = poRef;
		this.goodsCharacter = goodsCharacter;
		this.sysOrgId = sysOrgId;
		this.poPrice = poPrice;
		this.poNum = poNum;
		this.ttlAmt = ttlAmt;
		this.poDueDt = poDueDt;
		this.poNumUseable = poNumUseable;
		this.poNumUseableAmt = poNumUseableAmt;
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

	@Column(name = "SYS_EVENT_TIMES")
	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	@Column(name = "INOUT_REF_NO", length = 35)
	public String getInoutRefNo() {
		return this.inoutRefNo;
	}

	public void setInoutRefNo(String inoutRefNo) {
		this.inoutRefNo = inoutRefNo;
	}

	@Column(name = "CRTF_REF_NO", length = 35)
	public String getCrtfRefNo() {
		return this.crtfRefNo;
	}

	public void setCrtfRefNo(String crtfRefNo) {
		this.crtfRefNo = crtfRefNo;
	}

	@Column(name = "CRTF_NO", length = 35)
	public String getCrtfNo() {
		return this.crtfNo;
	}

	public void setCrtfNo(String crtfNo) {
		this.crtfNo = crtfNo;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "TRX_DT")
	public Timestamp getTrxDt() {
		return this.trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "BILL_NO", length = 35)
	public String getBillNo() {
		return this.billNo;
	}

	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}

	@Column(name = "BILL_AMT", precision = 18, scale = 3)
	public BigDecimal getBillAmt() {
		return this.billAmt;
	}

	public void setBillAmt(BigDecimal billAmt) {
		this.billAmt = billAmt;
	}

	@Column(name = "BILL_VAL_DT")
	public Timestamp getBillValDt() {
		return this.billValDt;
	}

	public void setBillValDt(Timestamp billValDt) {
		this.billValDt = billValDt;
	}

	@Column(name = "BILL_DUE_DT")
	public Timestamp getBillDueDt() {
		return this.billDueDt;
	}

	public void setBillDueDt(Timestamp billDueDt) {
		this.billDueDt = billDueDt;
	}

	@Column(name = "ADVICE_NO", length = 40)
	public String getAdviceNo() {
		return this.adviceNo;
	}

	public void setAdviceNo(String adviceNo) {
		this.adviceNo = adviceNo;
	}

	@Column(name = "ADVICE_DT")
	public Timestamp getAdviceDt() {
		return this.adviceDt;
	}

	public void setAdviceDt(Timestamp adviceDt) {
		this.adviceDt = adviceDt;
	}

	@Column(name = "BRAND_NO", length = 35)
	public String getBrandNo() {
		return this.brandNo;
	}

	public void setBrandNo(String brandNo) {
		this.brandNo = brandNo;
	}

	@Column(name = "CHASSIS_NO", length = 35)
	public String getChassisNo() {
		return this.chassisNo;
	}

	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}

	@Column(name = "ENGINE_NO", length = 35)
	public String getEngineNo() {
		return this.engineNo;
	}

	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}

	@Column(name = "ADVICE_AMT", precision = 18, scale = 3)
	public BigDecimal getAdviceAmt() {
		return this.adviceAmt;
	}

	public void setAdviceAmt(BigDecimal adviceAmt) {
		this.adviceAmt = adviceAmt;
	}

	@Column(name = "RELEASE_DT")
	public Timestamp getReleaseDt() {
		return this.releaseDt;
	}

	public void setReleaseDt(Timestamp releaseDt) {
		this.releaseDt = releaseDt;
	}

	/** add by YeQing 2016-6-13 ------start */
	@Column(name = "PO_IN_NUM", precision = 10, scale = 0)
	public Long getPoInNum() {
		return poInNum;
	}

	public void setPoInNum(Long poInNum) {
		this.poInNum = poInNum;
	}

	@Column(name = "TTL_PO_OUT_NUM", precision = 10, scale = 0)
	public Long getTtlPoOutNum() {
		return ttlPoOutNum;
	}

	public void setTtlPoOutNum(Long ttlPoOutNum) {
		this.ttlPoOutNum = ttlPoOutNum;
	}

	@Column(name = "PO_OUT_NUM", precision = 10, scale = 0)
	public Long getPoOutNum() {
		return poOutNum;
	}

	public void setPoOutNum(Long poOutNum) {
		this.poOutNum = poOutNum;
	}

	@Column(name = "PO_OUT_AMT", precision = 18, scale = 3)
	public BigDecimal getPoOutAmt() {
		return poOutAmt;
	}

	public void setPoOutAmt(BigDecimal poOutAmt) {
		this.poOutAmt = poOutAmt;
	}

	@Column(name = "PRODUCER", length = 35)
	public String getProducer() {
		return producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	@Column(name = "UNIT", length = 3)
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "PRICE", precision = 18, scale = 3)
	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	@Column(name = "GOODS_ID", length = 35)
	public String getGoodsId() {
		return goodsId;
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

	@Column(name = "SUB_CATA", length = 5)
	public String getSubCata() {
		return subCata;
	}

	public void setSubCata(String subCata) {
		this.subCata = subCata;
	}

	@Column(name = "COLLAT_SPEC", length = 35)
	public String getCollatSpec() {
		return collatSpec;
	}

	public void setCollatSpec(String collatSpec) {
		this.collatSpec = collatSpec;
	}

	@Column(name = "GOODS_CATA", length = 5)
	public String getGoodsCata() {
		return goodsCata;
	}

	public void setGoodsCata(String goodsCata) {
		this.goodsCata = goodsCata;
	}

	/** add by YeQing 2016-6-13 ------end */

	@Column(name = "PO_REF", length = 35)
	public String getPoRef() {
		return poRef;
	}

	public void setPoRef(String poRef) {
		this.poRef = poRef;
	}

	@Column(name = "GOODS_CHARACTER", length = 35)
	public String getGoodsCharacter() {
		return goodsCharacter;
	}

	public void setGoodsCharacter(String goodsCharacter) {
		this.goodsCharacter = goodsCharacter;
	}

	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

	@Column(name = "PO_PRICE", precision = 18, scale = 3)
	public BigDecimal getPoPrice() {
		return poPrice;
	}

	public void setPoPrice(BigDecimal poPrice) {
		this.poPrice = poPrice;
	}

	@Column(name = "TTL_AMT", precision = 18, scale = 3)
	public BigDecimal getTtlAmt() {
		return ttlAmt;
	}

	public void setTtlAmt(BigDecimal ttlAmt) {
		this.ttlAmt = ttlAmt;
	}

	@Column(name = "PO_NUM_USEABLE_AMT", precision = 18, scale = 3)
	public BigDecimal getPoNumUseableAmt() {
		return poNumUseableAmt;
	}

	public void setPoNumUseableAmt(BigDecimal poNumUseableAmt) {
		this.poNumUseableAmt = poNumUseableAmt;
	}

	@Column(name = "PO_NUM", precision = 10, scale = 0)
	public Long getPoNum() {
		return poNum;
	}

	public void setPoNum(Long poNum) {
		this.poNum = poNum;
	}

	@Column(name = "PO_NUM_USEABLE", precision = 10, scale = 0)
	public Long getPoNumUseable() {
		return poNumUseable;
	}

	public void setPoNumUseable(Long poNumUseable) {
		this.poNumUseable = poNumUseable;
	}

	@Column(name = "PO_DUE_DT")
	public Timestamp getPoDueDt() {
		return poDueDt;
	}

	public void setPoDueDt(Timestamp poDueDt) {
		this.poDueDt = poDueDt;
	}
}