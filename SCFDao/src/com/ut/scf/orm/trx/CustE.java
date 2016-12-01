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
 * CustE entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "cust_e", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class CustE implements java.io.Serializable {

	// Fields

	private CustEId id;
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
	private String sysGapiSts;
	private String custNm;
	// private String custEnNm;
	private String custInstCd;
	// private String custEdiId;
	private String custBrId;
	private String custMgrId;
	// private String custCtry;
	private String custIndustry;
	// private String deptId;
	// private String custAdr;
	// private String custEnAdr;
	// private String custTel;
	// private String custFax;
	// private String custEmail;
	private String custTp;
	// private String ctctId;
	private String ctctNm;
	// private String ctctEnNm;
	private String ctctTel;
	private String ctctFax;
	private String ctctEmail;
	// private String ctctAdr;
	// private String custFlg;
	// private String isKeycust;
	private String ccy;
	private BigDecimal lmtAmt;
	private Timestamp validDt;
	private Timestamp dueDt;
	private BigDecimal lmtBal;
	private String sysRelReason;
	private String sysBusiUnit;
	private String licenceNo;
	// private Timestamp licenseRegDt;
	// private Timestamp licenseDueDt;
	private String stateTaxLicno;
	private String localTaxLicno;
	private BigDecimal regCapital;
	private String regCcy;
	private String fciNo;
	private String regionCd;
	private String cityCd;
	private Timestamp setupDt;
	private String busiScope;
	private String regAddr;
	private String officeAddr;
	private String ctctPersonTitle;
	// private String officialWeb;
	private String loanCardno;
	// private String staffNum;
	private String mobPhone;
	private String legalRepNm;
	private String legalRepIdtype;
	private String legalRepIdno;
	// private String inventorType;
	// private String belogBchId;
	// private String belogBchName;
	// private String logourl;
	private String compNature;
	private String remark;
	private String busiUnit;
	// private String lmtFlg;
	private BigDecimal lmtAllocate;
	private BigDecimal lmtRecover;
	// private String busiTp;
	// private String theirRef;
	// private String rcustId;
	// private String rcustNm;
	// private Timestamp lmtDt;
	private Timestamp trxDt;
	private String erpId;
	private String custLevel;
	private Timestamp regDt;
	private String contactPerson;
	private String email;
	private String legalMobPhone;
	private String document;
	private Timestamp arrivalDt;
	private String signSts;
	private String sysFuncName;
	private BigDecimal usedBal;
	private BigDecimal ableBal;
	private String clientNature;
	private String limiting;
	private String countryId;

	private String custAcNo;
	private String cmsCustNo;
	private String lmtCcy;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	/** default constructor */
	public CustE() {
	}

	/** minimal constructor */
	public CustE(CustEId id, String custNm) {
		this.id = id;
		this.custNm = custNm;
	}

	/** full constructor */
	public CustE(CustEId id, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			String custNm, String custInstCd, String custTp, String ctctNm,
			String ctctTel, String ctctFax, String ctctEmail,
			BigDecimal lmtAmt, Timestamp validDt, Timestamp dueDt,
			BigDecimal lmtBal, String sysRelReason, String sysBusiUnit,
			String licenceNo, String stateTaxLicno, String localTaxLicno,
			BigDecimal regCapital, String regCcy, String ccy, String fciNo,
			String regionCd, String cityCd, Timestamp setupDt,
			String busiScope, String regAddr, String officeAddr,
			String ctctPersonTitle, String loanCardno, String mobPhone,
			String legalRepNm, String legalRepIdtype, String legalRepIdno,
			String compNature, String remark, String busiUnit,
			BigDecimal lmtAllocate, BigDecimal lmtRecover, Timestamp trxDt,
			String erpId, String custLevel, Timestamp regDt,
			String sysFuncName, String contactPerson, String email,
			String legalMobPhone, String document, Timestamp arrivalDt,
			String signSts, String sysGapiSts, String custBrId,
			String countryId, BigDecimal usedBal, BigDecimal ableBal,
			String clientNature, String limiting, String custMgrId,
			String custAcNo, String cmsCustNo, String custIndustry,
			String lmtCcy, String sysOrgId) {
		super();
		this.id = id;
		this.sysFuncName = sysFuncName;
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
		this.custNm = custNm;
		this.custInstCd = custInstCd;
		this.custTp = custTp;
		this.ctctNm = ctctNm;
		this.ctctTel = ctctTel;
		this.ctctFax = ctctFax;
		this.ctctEmail = ctctEmail;
		this.lmtAmt = lmtAmt;
		this.validDt = validDt;
		this.dueDt = dueDt;
		this.lmtBal = lmtBal;
		this.sysRelReason = sysRelReason;
		this.sysBusiUnit = sysBusiUnit;
		this.licenceNo = licenceNo;
		this.stateTaxLicno = stateTaxLicno;
		this.localTaxLicno = localTaxLicno;
		this.regCapital = regCapital;
		this.regCcy = regCcy;
		this.ccy = ccy;
		this.fciNo = fciNo;
		this.regionCd = regionCd;
		this.cityCd = cityCd;
		this.setupDt = setupDt;
		this.busiScope = busiScope;
		this.regAddr = regAddr;
		this.officeAddr = officeAddr;
		this.ctctPersonTitle = ctctPersonTitle;
		this.loanCardno = loanCardno;
		this.mobPhone = mobPhone;
		this.legalRepNm = legalRepNm;
		this.legalRepIdtype = legalRepIdtype;
		this.legalRepIdno = legalRepIdno;
		this.compNature = compNature;
		this.remark = remark;
		this.busiUnit = busiUnit;
		this.lmtAllocate = lmtAllocate;
		this.lmtRecover = lmtRecover;
		this.trxDt = trxDt;
		this.erpId = erpId;
		this.custLevel = custLevel;
		this.regDt = regDt;
		this.contactPerson = contactPerson;
		this.email = email;
		this.legalMobPhone = legalMobPhone;
		this.document = document;
		this.arrivalDt = arrivalDt;
		this.signSts = signSts;
		this.sysGapiSts = sysGapiSts;
		this.usedBal = usedBal;
		this.ableBal = ableBal;
		this.clientNature = clientNature;
		this.limiting = limiting;
		this.custBrId = custBrId;
		this.countryId = countryId;
		this.custMgrId = custMgrId;
		this.custAcNo = custAcNo;
		this.cmsCustNo = cmsCustNo;
		this.custIndustry = custIndustry;
		this.lmtCcy = lmtCcy;
		this.sysOrgId = sysOrgId;
	}

	// Property accessors
	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "sysRefNo", column = @Column(name = "SYS_REF_NO", nullable = false, length = 35)),
			@AttributeOverride(name = "sysEventTimes", column = @Column(name = "SYS_EVENT_TIMES", nullable = false)) })
	public CustEId getId() {
		return this.id;
	}

	public void setId(CustEId id) {
		this.id = id;
	}

	@Column(name = "COUNTRY_ID", length = 35)
	public String getCountryId() {
		return countryId;
	}

	public void setCountryId(String countryId) {
		this.countryId = countryId;
	}

	@Column(name = "USED_BAL", precision = 18, scale = 4)
	public BigDecimal getUsedBal() {
		return usedBal;
	}

	public void setUsedBal(BigDecimal usedBal) {
		this.usedBal = usedBal;
	}

	@Column(name = "ABLE_BAL", precision = 18, scale = 4)
	public BigDecimal getAbleBal() {
		return ableBal;
	}

	public void setAbleBal(BigDecimal ableBal) {
		this.ableBal = ableBal;
	}

	@Column(name = "CLIENT_NATURE", length = 35)
	public String getClientNature() {
		return clientNature;
	}

	public void setClientNature(String clientNature) {
		this.clientNature = clientNature;
	}

	@Column(name = "LIMITING", length = 150)
	public String getLimiting() {
		return limiting;
	}

	public void setLimiting(String limiting) {
		this.limiting = limiting;
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

	@Column(name = "CUST_NM", nullable = false, length = 70)
	public String getCustNm() {
		return this.custNm;
	}

	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

	@Column(name = "CUST_TP", length = 1)
	public String getCustTp() {
		return this.custTp;
	}

	public void setCustTp(String custTp) {
		this.custTp = custTp;
	}

	@Column(name = "CTCT_NM", length = 35)
	public String getCtctNm() {
		return this.ctctNm;
	}

	public void setCtctNm(String ctctNm) {
		this.ctctNm = ctctNm;
	}

	@Column(name = "CTCT_TEL", length = 30)
	public String getCtctTel() {
		return this.ctctTel;
	}

	public void setCtctTel(String ctctTel) {
		this.ctctTel = ctctTel;
	}

	@Column(name = "CTCT_FAX", length = 30)
	public String getCtctFax() {
		return this.ctctFax;
	}

	public void setCtctFax(String ctctFax) {
		this.ctctFax = ctctFax;
	}

	@Column(name = "CTCT_EMAIL", length = 40)
	public String getCtctEmail() {
		return this.ctctEmail;
	}

	public void setCtctEmail(String ctctEmail) {
		this.ctctEmail = ctctEmail;
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

	@Column(name = "SYS_REL_REASON", length = 65535)
	public String getSysRelReason() {
		return this.sysRelReason;
	}

	public void setSysRelReason(String sysRelReason) {
		this.sysRelReason = sysRelReason;
	}

	@Column(name = "SYS_BUSI_UNIT", length = 40)
	public String getSysBusiUnit() {
		return this.sysBusiUnit;
	}

	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}

	@Column(name = "Licence_no", length = 32)
	public String getLicenceNo() {
		return this.licenceNo;
	}

	public void setLicenceNo(String licenceNo) {
		this.licenceNo = licenceNo;
	}

	@Column(name = "STATE_TAX_LICNO", length = 32)
	public String getStateTaxLicno() {
		return this.stateTaxLicno;
	}

	public void setStateTaxLicno(String stateTaxLicno) {
		this.stateTaxLicno = stateTaxLicno;
	}

	@Column(name = "LOCAL_TAX_LICNO", length = 32)
	public String getLocalTaxLicno() {
		return this.localTaxLicno;
	}

	public void setLocalTaxLicno(String localTaxLicno) {
		this.localTaxLicno = localTaxLicno;
	}

	@Column(name = "REG_CAPITAL", scale = 4)
	public BigDecimal getRegCapital() {
		return this.regCapital;
	}

	public void setRegCapital(BigDecimal regCapital) {
		this.regCapital = regCapital;
	}

	@Column(name = "REG_CCY", length = 3)
	public String getRegCcy() {
		return this.regCcy;
	}

	public void setRegCcy(String regCcy) {
		this.regCcy = regCcy;
	}

	@Column(name = "CCY", length = 3)
	public String getCcy() {
		return this.ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	@Column(name = "FCI_NO", length = 40)
	public String getFciNo() {
		return this.fciNo;
	}

	public void setFciNo(String fciNo) {
		this.fciNo = fciNo;
	}

	@Column(name = "REGION_CD", length = 20)
	public String getRegionCd() {
		return this.regionCd;
	}

	public void setRegionCd(String regionCd) {
		this.regionCd = regionCd;
	}

	@Column(name = "CITY_CD", length = 20)
	public String getCityCd() {
		return this.cityCd;
	}

	public void setCityCd(String cityCd) {
		this.cityCd = cityCd;
	}

	@Column(name = "SETUP_DT", length = 19)
	public Timestamp getSetupDt() {
		return this.setupDt;
	}

	public void setSetupDt(Timestamp setupDt) {
		this.setupDt = setupDt;
	}

	@Column(name = "BUSI_SCOPE", length = 80)
	public String getBusiScope() {
		return this.busiScope;
	}

	public void setBusiScope(String busiScope) {
		this.busiScope = busiScope;
	}

	@Column(name = "reg_addr", length = 200)
	public String getRegAddr() {
		return this.regAddr;
	}

	public void setRegAddr(String regAddr) {
		this.regAddr = regAddr;
	}

	@Column(name = "OFFICE_ADDR", length = 200)
	public String getOfficeAddr() {
		return this.officeAddr;
	}

	public void setOfficeAddr(String officeAddr) {
		this.officeAddr = officeAddr;
	}

	@Column(name = "CTCT_PERSON_TITLE", length = 100)
	public String getCtctPersonTitle() {
		return this.ctctPersonTitle;
	}

	public void setCtctPersonTitle(String ctctPersonTitle) {
		this.ctctPersonTitle = ctctPersonTitle;
	}

	@Column(name = "LOAN_CARDNO", length = 40)
	public String getLoanCardno() {
		return this.loanCardno;
	}

	public void setLoanCardno(String loanCardno) {
		this.loanCardno = loanCardno;
	}

	@Column(name = "MOB_PHONE", length = 40)
	public String getMobPhone() {
		return this.mobPhone;
	}

	public void setMobPhone(String mobPhone) {
		this.mobPhone = mobPhone;
	}

	@Column(name = "LEGAL_REP_NM", length = 200)
	public String getLegalRepNm() {
		return this.legalRepNm;
	}

	public void setLegalRepNm(String legalRepNm) {
		this.legalRepNm = legalRepNm;
	}

	@Column(name = "LEGAL_REP_IDTYPE", length = 5)
	public String getLegalRepIdtype() {
		return this.legalRepIdtype;
	}

	public void setLegalRepIdtype(String legalRepIdtype) {
		this.legalRepIdtype = legalRepIdtype;
	}

	@Column(name = "LEGAL_REP_IDNO", length = 40)
	public String getLegalRepIdno() {
		return this.legalRepIdno;
	}

	public void setLegalRepIdno(String legalRepIdno) {
		this.legalRepIdno = legalRepIdno;
	}

	@Column(name = "COMP_NATURE", length = 10)
	public String getCompNature() {
		return this.compNature;
	}

	public void setCompNature(String compNature) {
		this.compNature = compNature;
	}

	@Column(name = "REMARK", length = 200)
	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "busi_unit", length = 40)
	public String getBusiUnit() {
		return this.busiUnit;
	}

	public void setBusiUnit(String busiUnit) {
		this.busiUnit = busiUnit;
	}

	@Column(name = "CUST_INST_CD", length = 30)
	public String getCustInstCd() {
		return custInstCd;
	}

	public void setCustInstCd(String custInstCd) {
		this.custInstCd = custInstCd;
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

	@Column(name = "TRX_DT", length = 19)
	public Timestamp getTrxDt() {
		return trxDt;
	}

	public void setTrxDt(Timestamp trxDt) {
		this.trxDt = trxDt;
	}

	@Column(name = "ERP_ID", length = 35)
	public String getErpId() {
		return erpId;
	}

	public void setErpId(String erpId) {
		this.erpId = erpId;
	}

	@Column(name = "CUST_LEVEL", length = 15)
	public String getCustLevel() {
		return custLevel;
	}

	public void setCustLevel(String custLevel) {
		this.custLevel = custLevel;
	}

	@Column(name = "REG_DT", length = 19)
	public Timestamp getRegDt() {
		return regDt;
	}

	public void setRegDt(Timestamp regDt) {
		this.regDt = regDt;
	}

	@Column(name = "CONTACT_PERSON", length = 50)
	public String getContactPerson() {
		return contactPerson;
	}

	public void setContactPerson(String contactPerson) {
		this.contactPerson = contactPerson;
	}

	@Column(name = "EMAIL", length = 40)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "LEGAL_MOB_PHONE", length = 20)
	public String getLegalMobPhone() {
		return legalMobPhone;
	}

	public void setLegalMobPhone(String legalMobPhone) {
		this.legalMobPhone = legalMobPhone;
	}

	@Column(name = "DOCUMENT", length = 200)
	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	@Column(name = "ARRIVAL_DT", length = 19)
	public Timestamp getArrivalDt() {
		return arrivalDt;
	}

	public void setArrivalDt(Timestamp arrivalDt) {
		this.arrivalDt = arrivalDt;
	}

	@Column(name = "SIGN_STS", length = 35)
	public String getSignSts() {
		return signSts;
	}

	public void setSignSts(String signSts) {
		this.signSts = signSts;
	}

	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}

	@Column(name = "SYS_FUNC_NAME", length = 32)
	public String getSysFuncName() {
		return sysFuncName;
	}

	public void setSysFuncName(String sysFuncName) {
		this.sysFuncName = sysFuncName;
	}

	@Column(name = "VALID_DT", length = 19)
	public Timestamp getValidDt() {
		return validDt;
	}

	public void setValidDt(Timestamp validDt) {
		this.validDt = validDt;
	}

	@Column(name = "DUE_DT", length = 19)
	public Timestamp getDueDt() {
		return dueDt;
	}

	public void setDueDt(Timestamp dueDt) {
		this.dueDt = dueDt;
	}

	@Column(name = "CUST_BR_ID", length = 35)
	public String getCustBrId() {
		return this.custBrId;
	}

	public void setCustBrId(String custBrId) {
		this.custBrId = custBrId;
	}

	@Column(name = "CUST_MGR_ID", length = 35)
	public String getCustMgrId() {
		return this.custMgrId;
	}

	public void setCustMgrId(String custMgrId) {
		this.custMgrId = custMgrId;
	}

	@Column(name = "CUST_AC_NO", length = 35)
	public String getCustAcNo() {
		return this.custAcNo;
	}

	public void setCustAcNo(String custAcNo) {
		this.custAcNo = custAcNo;
	}

	@Column(name = "CMS_CUST_NO", length = 35)
	public String getCmsCustNo() {
		return this.cmsCustNo;
	}

	public void setCmsCustNo(String cmsCustNo) {
		this.cmsCustNo = cmsCustNo;
	}

	@Column(name = "CUST_INDUSTRY", length = 35)
	public String getCustIndustry() {
		return this.custIndustry;
	}

	public void setCustIndustry(String custIndustry) {
		this.custIndustry = custIndustry;
	}

	@Column(name = "LMT_CCY", length = 10)
	public String getLmtCcy() {
		return this.lmtCcy;
	}

	public void setLmtCcy(String lmtCcy) {
		this.lmtCcy = lmtCcy;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}