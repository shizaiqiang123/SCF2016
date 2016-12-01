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
 * CrtfM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "CRTF_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CrtfM implements java.io.Serializable {

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
	private String crtfNo;
	private String loanId;
	private String cntrctNo;
	private String selId;
	private String buyerId;
	private String billNo;
	private BigDecimal billAmt;
	private Timestamp billValDt;
	private Timestamp billDueDt;
	private String adviceNo;
	private Timestamp adviceDt;
	private String brandNo;
	private String chassisNo;
	private String engineNo;
	private BigDecimal adviceAmt;
	private Timestamp releaseDt;
	private String remark;
	private String attribute1;
	private String attrvalue1;
	private String attribute2;
	private String attrvalue2;
	private String attribute3;
	private String attrvalue3;
	private String refNo;
	private String goodsCata;
	private String subCata;
	private String goodsId;
	private String goodsNm;
	private String region;
	private Timestamp updateDt;
	private String unit;
	private String ccy;
	private BigDecimal price;
	private String producer;
	private String goodsCataId;
	private String subCataId;
	private String goodsCataNm;// 商品大类名称
	private String subCataNm;// 商品子类名称
	private Long poInNum;
	private Long poOutNum;
	private Long ttlPoOutNum;
	private BigDecimal poOutAmt;
	private BigDecimal poInAmt;
	private String froFlag;
	// modify by shizaiqiang
	private Long poNum;
	private Long sumPoInNum;
	private String goodsCharacter;
	
	//订单流水号
	private String poRef;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	// Constructors

	/** default constructor */
	public CrtfM() {
	}

	/** minimal constructor */
	public CrtfM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public CrtfM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String crtfNo, String loanId,
			String cntrctNo, String selId, String buyerId, String billNo,
			BigDecimal billAmt, Timestamp billValDt, Timestamp billDueDt,
			String adviceNo, Timestamp adviceDt, String brandNo,
			String chassisNo, String engineNo, BigDecimal adviceAmt,
			Timestamp releaseDt, String remark, String attribute1,
			String attrvalue1, String attribute2, String attrvalue2,
			String attribute3, String attrvalue3, String refNo,
			String goodsCata, String subCata, String goodsId, String goodsNm,
			String region, Timestamp updateDt, String unit, String ccy,
			BigDecimal price, String producer, String goodsCataId,
			String subCataId, String goodsCataNm, String subCataNm,
			Long poInNum, Long poOutNum, Long ttlPoOutNum, BigDecimal poOutAmt,
			BigDecimal poInAmt, String froFlag, Long poNum, Long sumPoInNum,
			String goodsCharacter,String poRef,String sysOrgId) {
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
		this.crtfNo = crtfNo;
		this.loanId = loanId;
		this.cntrctNo = cntrctNo;
		this.selId = selId;
		this.buyerId = buyerId;
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
		this.remark = remark;
		this.attribute1 = attribute1;
		this.attrvalue1 = attrvalue1;
		this.attribute2 = attribute2;
		this.attrvalue2 = attrvalue2;
		this.attribute3 = attribute3;
		this.attrvalue3 = attrvalue3;
		this.refNo = refNo;
		this.goodsCata = goodsCata;
		this.subCata = subCata;
		this.goodsId = goodsId;
		this.goodsNm = goodsNm;
		this.region = region;
		this.updateDt = updateDt;
		this.unit = unit;
		this.ccy = ccy;
		this.price = price;
		this.producer = producer;
		this.goodsCataId = goodsCataId;
		this.subCataId = subCataId;
		this.goodsCataNm = goodsCataNm;
		this.subCataNm = subCataNm;
		this.poInNum = poInNum;
		this.poOutNum = poOutNum;
		this.ttlPoOutNum = ttlPoOutNum;
		this.poOutAmt = poOutAmt;
		this.poInAmt = poInAmt;
		this.froFlag = froFlag;
		this.poNum = poNum;
		this.sumPoInNum = sumPoInNum;
		this.goodsCharacter = goodsCharacter;
		this.poRef = poRef;
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

	@Column(name = "CRTF_NO", length = 35)
	public String getCrtfNo() {
		return this.crtfNo;
	}

	public void setCrtfNo(String crtfNo) {
		this.crtfNo = crtfNo;
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

	@Column(name = "SEL_ID", length = 35)
	public String getSelId() {
		return this.selId;
	}

	public void setSelId(String selId) {
		this.selId = selId;
	}

	@Column(name = "BUYER_ID", length = 35)
	public String getBuyerId() {
		return this.buyerId;
	}

	public void setBuyerId(String buyerId) {
		this.buyerId = buyerId;
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

	@Column(name = "REF_NO", length = 35)
	public String getRefNo() {
		return this.refNo;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	@Column(name = "GOODS_CATA", length = 5)
	public String getGoodsCata() {
		return goodsCata;
	}

	public void setGoodsCata(String goodsCata) {
		this.goodsCata = goodsCata;
	}

	@Column(name = "SUB_CATA", length = 5)
	public String getSubCata() {
		return subCata;
	}

	public void setSubCata(String subCata) {
		this.subCata = subCata;
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

	@Column(name = "REGION", length = 20)
	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	@Column(name = "UPDATE_DT", length = 11)
	public Timestamp getUpdateDt() {
		return updateDt;
	}

	public void setUpdateDt(Timestamp updateDt) {
		this.updateDt = updateDt;
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

	@Column(name = "PRODUCER", length = 32)
	public String getProducer() {
		return producer;
	}

	public void setProducer(String producer) {
		this.producer = producer;
	}

	@Column(name = "GOODS_CATA_ID", length = 5)
	public String getGoodsCataId() {
		return goodsCataId;
	}

	public void setGoodsCataId(String goodsCataId) {
		this.goodsCataId = goodsCataId;
	}

	@Column(name = "SUB_CATA_ID", length = 5)
	public String getSubCataId() {
		return subCataId;
	}

	public void setSubCataId(String subCataId) {
		this.subCataId = subCataId;
	}

	@Column(name = "GOODS_CATA_NM", length = 35)
	public String getGoodsCataNm() {
		return goodsCataNm;
	}

	public void setGoodsCataNm(String goodsCataNm) {
		this.goodsCataNm = goodsCataNm;
	}

	@Column(name = "SUB_CATA_NM", length = 35)
	public String getSubCataNm() {
		return subCataNm;
	}

	public void setSubCataNm(String subCataNm) {
		this.subCataNm = subCataNm;
	}

	@Column(name = "PO_IN_NUM", precision = 10, scale = 0)
	public Long getPoInNum() {
		return poInNum;
	}

	public void setPoInNum(Long poInNum) {
		this.poInNum = poInNum;
	}

	@Column(name = "PO_OUT_NUM", precision = 10, scale = 0)
	public Long getPoOutNum() {
		return poOutNum;
	}

	public void setPoOutNum(Long poOutNum) {
		this.poOutNum = poOutNum;
	}

	@Column(name = "TTL_PO_OUT_NUM", precision = 10, scale = 0)
	public Long getTtlPoOutNum() {
		return ttlPoOutNum;
	}

	public void setTtlPoOutNum(Long ttlPoOutNum) {
		this.ttlPoOutNum = ttlPoOutNum;
	}

	@Column(name = "PO_OUT_AMT", precision = 18, scale = 3)
	public BigDecimal getPoOutAmt() {
		return poOutAmt;
	}

	public void setPoOutAmt(BigDecimal poOutAmt) {
		this.poOutAmt = poOutAmt;
	}

	@Column(name = "PO_IN_AMT", precision = 18, scale = 3)
	public BigDecimal getPoInAmt() {
		return poInAmt;
	}

	public void setPoInAmt(BigDecimal poInAmt) {
		this.poInAmt = poInAmt;
	}

	@Column(name = "FRO_FLAG", length = 15)
	public String getFroFlag() {
		return froFlag;
	}

	public void setFroFlag(String froFlag) {
		this.froFlag = froFlag;
	}

	@Column(name = "PO_NUM", precision = 10, scale = 0)
	public Long getPoNum() {
		return poNum;
	}

	public void setPoNum(Long poNum) {
		this.poNum = poNum;
	}

	@Column(name = "SUM_PO_IN_NUM", precision = 10, scale = 0)
	public Long getSumPoInNum() {
		return sumPoInNum;
	}

	public void setSumPoInNum(Long sumPoInNum) {
		this.sumPoInNum = sumPoInNum;
	}

	@Column(name = "GOODS_CHARACTER", length = 35)
	public String getGoodsCharacter() {
		return goodsCharacter;
	}

	public void setGoodsCharacter(String goodsCharacter) {
		this.goodsCharacter = goodsCharacter;
	}

	@Column(name = "PO_REF", length = 35)
	public String getPoRef() {
		return poRef;
	}

	public void setPoRef(String poRef) {
		this.poRef = poRef;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
	
}