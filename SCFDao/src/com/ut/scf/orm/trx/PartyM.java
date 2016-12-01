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
 * PartyM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "PARTY_M", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class PartyM implements java.io.Serializable {

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
	private String patnerNo;
	private String patnerNm;
	private String patnerEnNm;
	private String patnerTp;
	private String patnerCtry;
	private String patnerAdr;
	private String patnerTel;
	private String patnerFax;
	private String patnerEmail;
	private String patnerPostCd;
	private String inspTp;
	private Integer inspDay;
	private Timestamp inspDt;
	private String inspector;
	private String contactNm;
	private String isFci;
	private String fciNo;
	private String agmSignFlg;
	private String agmNo;
	private Timestamp agmValueDt;
	private Timestamp agmDueDt;
	private String patnerLevl;
	private String patnerArea;
	private String patnerGoods;
	private String patnerCity;
	private String sysRelReason;
	private String lmtCcy;
	private BigDecimal lmtAmt;
	private BigDecimal lmtBal;
	private Timestamp lmtValidDt;
	private Timestamp lmtDueDt;
	private String lmtFlg;
	private BigDecimal lmtAllocate;
	private BigDecimal lmtRecover;
	private String busiTp;
	private String theirRef;
	private String custId;
	private String custNm;
	private Timestamp lmtDt;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public PartyM() {
	}

	/** minimal constructor */
	public PartyM(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public PartyM(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String patnerNo, String patnerNm,
			String patnerEnNm, String patnerTp, String patnerCtry,
			String patnerAdr, String patnerTel, String patnerFax,
			String patnerEmail, String patnerPostCd, String inspTp,
			Integer inspDay, Timestamp inspDt, String inspector,
			String contactNm, String isFci, String fciNo, String agmSignFlg,
			String agmNo, Timestamp agmValueDt, Timestamp agmDueDt,
			String patnerLevl, String patnerArea, String patnerGoods,
			String patnerCity, String sysRelReason, String lmtCcy,
			BigDecimal lmtAmt, BigDecimal lmtBal, Timestamp lmtValidDt,
			Timestamp lmtDueDt, String lmtFlg, BigDecimal lmtAllocate,
			BigDecimal lmtRecover, String busiTp, String theirRef,
			String custId, String custNm, Timestamp lmtDt,String sysOrgId) {
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
		this.patnerNo = patnerNo;
		this.patnerNm = patnerNm;
		this.patnerEnNm = patnerEnNm;
		this.patnerTp = patnerTp;
		this.patnerCtry = patnerCtry;
		this.patnerAdr = patnerAdr;
		this.patnerTel = patnerTel;
		this.patnerFax = patnerFax;
		this.patnerEmail = patnerEmail;
		this.patnerPostCd = patnerPostCd;
		this.inspTp = inspTp;
		this.inspDay = inspDay;
		this.inspDt = inspDt;
		this.inspector = inspector;
		this.contactNm = contactNm;
		this.isFci = isFci;
		this.fciNo = fciNo;
		this.agmSignFlg = agmSignFlg;
		this.agmNo = agmNo;
		this.agmValueDt = agmValueDt;
		this.agmDueDt = agmDueDt;
		this.patnerLevl = patnerLevl;
		this.patnerArea = patnerArea;
		this.patnerGoods = patnerGoods;
		this.patnerCity = patnerCity;
		this.sysRelReason = sysRelReason;
		this.lmtCcy = lmtCcy;
		this.lmtAmt = lmtAmt;
		this.lmtBal = lmtBal;
		this.lmtValidDt = lmtValidDt;
		this.lmtDueDt = lmtDueDt;
		this.lmtFlg = lmtFlg;
		this.lmtAllocate = lmtAllocate;
		this.lmtRecover = lmtRecover;
		this.busiTp = busiTp;
		this.theirRef = theirRef;
		this.custId = custId;
		this.custNm = custNm;
		this.lmtDt = lmtDt;
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

	@Column(name = "PATNER_NO", length = 35)
	public String getPatnerNo() {
		return this.patnerNo;
	}

	public void setPatnerNo(String patnerNo) {
		this.patnerNo = patnerNo;
	}

	@Column(name = "PATNER_NM", length = 70)
	public String getPatnerNm() {
		return this.patnerNm;
	}

	public void setPatnerNm(String patnerNm) {
		this.patnerNm = patnerNm;
	}

	@Column(name = "PATNER_EN_NM", length = 70)
	public String getPatnerEnNm() {
		return this.patnerEnNm;
	}

	public void setPatnerEnNm(String patnerEnNm) {
		this.patnerEnNm = patnerEnNm;
	}

	@Column(name = "PATNER_TP", length = 1)
	public String getPatnerTp() {
		return this.patnerTp;
	}

	public void setPatnerTp(String patnerTp) {
		this.patnerTp = patnerTp;
	}

	@Column(name = "PATNER_CTRY", length = 35)
	public String getPatnerCtry() {
		return this.patnerCtry;
	}

	public void setPatnerCtry(String patnerCtry) {
		this.patnerCtry = patnerCtry;
	}

	@Column(name = "PATNER_ADR", length = 140)
	public String getPatnerAdr() {
		return this.patnerAdr;
	}

	public void setPatnerAdr(String patnerAdr) {
		this.patnerAdr = patnerAdr;
	}

	@Column(name = "PATNER_TEL", length = 30)
	public String getPatnerTel() {
		return this.patnerTel;
	}

	public void setPatnerTel(String patnerTel) {
		this.patnerTel = patnerTel;
	}

	@Column(name = "PATNER_FAX", length = 30)
	public String getPatnerFax() {
		return this.patnerFax;
	}

	public void setPatnerFax(String patnerFax) {
		this.patnerFax = patnerFax;
	}

	@Column(name = "PATNER_EMAIL", length = 40)
	public String getPatnerEmail() {
		return this.patnerEmail;
	}

	public void setPatnerEmail(String patnerEmail) {
		this.patnerEmail = patnerEmail;
	}

	@Column(name = "PATNER_POST_CD", length = 20)
	public String getPatnerPostCd() {
		return this.patnerPostCd;
	}

	public void setPatnerPostCd(String patnerPostCd) {
		this.patnerPostCd = patnerPostCd;
	}

	@Column(name = "INSP_TP", length = 1)
	public String getInspTp() {
		return this.inspTp;
	}

	public void setInspTp(String inspTp) {
		this.inspTp = inspTp;
	}

	@Column(name = "INSP_DAY", precision = 4, scale = 0)
	public Integer getInspDay() {
		return this.inspDay;
	}

	public void setInspDay(Integer inspDay) {
		this.inspDay = inspDay;
	}

	@Column(name = "INSP_DT", length = 11)
	public Timestamp getInspDt() {
		return this.inspDt;
	}

	public void setInspDt(Timestamp inspDt) {
		this.inspDt = inspDt;
	}

	@Column(name = "INSPECTOR", length = 35)
	public String getInspector() {
		return this.inspector;
	}

	public void setInspector(String inspector) {
		this.inspector = inspector;
	}

	@Column(name = "CONTACT_NM", length = 35)
	public String getContactNm() {
		return this.contactNm;
	}

	public void setContactNm(String contactNm) {
		this.contactNm = contactNm;
	}

	@Column(name = "IS_FCI", length = 1)
	public String getIsFci() {
		return this.isFci;
	}

	public void setIsFci(String isFci) {
		this.isFci = isFci;
	}

	@Column(name = "FCI_NO", length = 7)
	public String getFciNo() {
		return this.fciNo;
	}

	public void setFciNo(String fciNo) {
		this.fciNo = fciNo;
	}

	@Column(name = "AGM_SIGN_FLG", length = 1)
	public String getAgmSignFlg() {
		return this.agmSignFlg;
	}

	public void setAgmSignFlg(String agmSignFlg) {
		this.agmSignFlg = agmSignFlg;
	}

	@Column(name = "AGM_NO", length = 35)
	public String getAgmNo() {
		return this.agmNo;
	}

	public void setAgmNo(String agmNo) {
		this.agmNo = agmNo;
	}

	@Column(name = "AGM_VALUE_DT", length = 11)
	public Timestamp getAgmValueDt() {
		return this.agmValueDt;
	}

	public void setAgmValueDt(Timestamp agmValueDt) {
		this.agmValueDt = agmValueDt;
	}

	@Column(name = "AGM_DUE_DT", length = 11)
	public Timestamp getAgmDueDt() {
		return this.agmDueDt;
	}

	public void setAgmDueDt(Timestamp agmDueDt) {
		this.agmDueDt = agmDueDt;
	}

	@Column(name = "PATNER_LEVL", length = 7)
	public String getPatnerLevl() {
		return this.patnerLevl;
	}

	public void setPatnerLevl(String patnerLevl) {
		this.patnerLevl = patnerLevl;
	}

	@Column(name = "PATNER_AREA", length = 70)
	public String getPatnerArea() {
		return this.patnerArea;
	}

	public void setPatnerArea(String patnerArea) {
		this.patnerArea = patnerArea;
	}

	@Column(name = "PATNER_GOODS", length = 70)
	public String getPatnerGoods() {
		return this.patnerGoods;
	}

	public void setPatnerGoods(String patnerGoods) {
		this.patnerGoods = patnerGoods;
	}

	@Column(name = "PATNER_CITY", length = 35)
	public String getPatnerCity() {
		return this.patnerCity;
	}

	public void setPatnerCity(String patnerCity) {
		this.patnerCity = patnerCity;
	}

	@Column(name = "SYS_REL_REASON", length = 256)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "LMT_CCY", length = 35)
	public String getLmtCcy() {
		return this.lmtCcy;
	}

	public void setLmtCcy(String lmtCcy) {
		this.lmtCcy = lmtCcy;
	}

	@Column(name = "LMT_AMT", precision = 18, scale = 4)
	public BigDecimal getLmtAmt() {
		return this.lmtAmt;
	}

	public void setLmtAmt(BigDecimal lmtAmt) {
		this.lmtAmt = lmtAmt;
	}

	@Column(name = "LMT_BAL", precision = 18, scale = 4)
	public BigDecimal getLmtBal() {
		return this.lmtBal;
	}

	public void setLmtBal(BigDecimal lmtBal) {
		this.lmtBal = lmtBal;
	}

	@Column(name = "LMT_VALID_DT", length = 11)
	public Timestamp getLmtValidDt() {
		return this.lmtValidDt;
	}

	public void setLmtValidDt(Timestamp lmtValidDt) {
		this.lmtValidDt = lmtValidDt;
	}

	@Column(name = "LMT_DUE_DT", length = 11)
	public Timestamp getLmtDueDt() {
		return this.lmtDueDt;
	}

	public void setLmtDueDt(Timestamp lmtDueDt) {
		this.lmtDueDt = lmtDueDt;
	}

	@Column(name = "LMT_FLG", length = 1)
	public String getLmtFlg() {
		return this.lmtFlg;
	}

	public void setLmtFlg(String lmtFlg) {
		this.lmtFlg = lmtFlg;
	}

	@Column(name = "LMT_ALLOCATE", precision = 18, scale = 4)
	public BigDecimal getLmtAllocate() {
		return this.lmtAllocate;
	}

	public void setLmtAllocate(BigDecimal lmtAllocate) {
		this.lmtAllocate = lmtAllocate;
	}

	@Column(name = "LMT_RECOVER", precision = 18, scale = 4)
	public BigDecimal getLmtRecover() {
		return this.lmtRecover;
	}

	public void setLmtRecover(BigDecimal lmtRecover) {
		this.lmtRecover = lmtRecover;
	}

	@Column(name = "BUSI_TP", length = 1)
	public String getBusiTp() {
		return this.busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	@Column(name = "THEIR_REF", length = 35)
	public String getTheirRef() {
		return this.theirRef;
	}

	public void setTheirRef(String theirRef) {
		this.theirRef = theirRef;
	}

	@Column(name = "CUST_ID", length = 35)
	public String getCustId() {
		return this.custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	@Column(name = "CUST_NM", length = 35)
	public String getCustNm() {
		return this.custNm;
	}

	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

	@Column(name = "LMT_DT", length = 11)
	public Timestamp getLmtDt() {
		return this.lmtDt;
	}

	public void setLmtDt(Timestamp lmtDt) {
		this.lmtDt = lmtDt;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}