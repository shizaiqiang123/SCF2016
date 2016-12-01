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
 * CustImp entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "cust_imp"
,schema="TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class CustImp implements java.io.Serializable {

	// Fields

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
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
	private String sysGapiSts;
	private String custNm;
//	private String custEnNm;
	private String custInstCd;
//	private String custEdiId;
//	private String custBrId;
//	private String custMgrId;
//	private String custCtry;
//	private String custIndustry;
//	private String deptId;
//	private String custAdr;
//	private String custEnAdr;
//	private String custTel;
//	private String custFax;
//	private String custEmail;
	private String custTp;
//	private String ctctId;
	private String ctctNm;
//	private String ctctEnNm;
	private String ctctTel;
	private String ctctFax;
	private String ctctEmail;
//	private String ctctAdr;
//	private String custFlg;
//	private String isKeycust;
//	private String ccy;
	private BigDecimal lmtAmt;
//	private Timestamp validDt;
//	private Timestamp dueDt;
	private BigDecimal lmtBal;
	private String sysRelReason;
	private String sysBusiUnit;
	private String licenceNo;
//	private Timestamp licenseRegDt;
//	private Timestamp licenseDueDt;
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
//	private String officialWeb;
	private String loanCardno;
//	private String staffNum;
	private String mobPhone;
	private String legalRepNm;
	private String legalRepIdtype;
	private String legalRepIdno;
//	private String inventorType;
//	private String belogBchId;
//	private String belogBchName;
//	private String logourl;
	private String compNature;
	private String remark;
	private String busiUnit;
//	private String lmtFlg;
	private BigDecimal lmtAllocate;
	private BigDecimal lmtRecover;
//	private String busiTp;
//	private String theirRef;
//	private String rcustId;
//	private String rcustNm;
//	private Timestamp lmtDt;
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
	private String custId;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	

	// Constructors

	/** default constructor */
	public CustImp() {
	}

	/** minimal constructor */
	public CustImp(String sysRefNo, Integer sysEventTimes, String custNm) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
		this.custNm = custNm;
	}

	/** full constructor */
	public CustImp(String sysRefNo, String sysOpId, Timestamp sysOpTm,
			String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag,
			String sysLockBy, String sysFuncId, String sysTrxSts,
			Integer sysEventTimes, String custNm, String custInstCd,
			String custTp, String ctctNm, String ctctTel, String ctctFax,
			String ctctEmail, BigDecimal lmtAmt, BigDecimal lmtBal,
			String sysRelReason, String sysBusiUnit, String licenceNo,
			String stateTaxLicno, String localTaxLicno, BigDecimal regCapital,
			String regCcy, String fciNo, String regionCd, String cityCd,
			Timestamp setupDt, String busiScope, String regAddr,
			String officeAddr, String ctctPersonTitle,
			String loanCardno, String mobPhone, String legalRepNm,
			String legalRepIdtype, String legalRepIdno, String compNature,
			String remark, String busiUnit, BigDecimal lmtAllocate,
			BigDecimal lmtRecover, Timestamp trxDt, String erpId,
			String custLevel, Timestamp regDt, String contactPerson,
			String email, String legalMobPhone, String document,
			Timestamp arrivalDt, String signSts,String custId,String sysGapiSts,String sysOrgId) {
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
		this.custNm = custNm;
		this.custInstCd = custInstCd;
		this.custTp = custTp;
		this.ctctNm = ctctNm;
		this.ctctTel = ctctTel;
		this.ctctFax = ctctFax;
		this.ctctEmail = ctctEmail;
		this.lmtAmt = lmtAmt;
		this.lmtBal = lmtBal;
		this.sysRelReason = sysRelReason;
		this.sysBusiUnit = sysBusiUnit;
		this.licenceNo = licenceNo;
		this.stateTaxLicno = stateTaxLicno;
		this.localTaxLicno = localTaxLicno;
		this.regCapital = regCapital;
		this.regCcy = regCcy;
		this.fciNo = fciNo;
		this.regionCd = regionCd;
		this.cityCd = cityCd;
		this.setupDt = setupDt;
		this.busiScope = busiScope;
		this.regAddr = regAddr;
		this.officeAddr = officeAddr;
		this.ctctPersonTitle = ctctPersonTitle;
		this.sysGapiSts=sysGapiSts;
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
		this.custId = custId;
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

	@Column(name = "CUST_NM", nullable = false, length = 70)
	public String getCustNm() {
		return this.custNm;
	}

	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}

//	@Column(name = "CUST_EN_NM", length = 70)
//	public String getCustEnNm() {
//		return this.custEnNm;
//	}
//
//	public void setCustEnNm(String custEnNm) {
//		this.custEnNm = custEnNm;
//	}

	@Column(name = "CUST_INST_CD", length = 30)
	public String getCustInstCd() {
		return this.custInstCd;
	}

	public void setCustInstCd(String custInstCd) {
		this.custInstCd = custInstCd;
	}

//	@Column(name = "CUST_EDI_ID", length = 7)
//	public String getCustEdiId() {
//		return this.custEdiId;
//	}
//
//	public void setCustEdiId(String custEdiId) {
//		this.custEdiId = custEdiId;
//	}
//
//	@Column(name = "CUST_BR_ID", length = 35)
//	public String getCustBrId() {
//		return this.custBrId;
//	}
//
//	public void setCustBrId(String custBrId) {
//		this.custBrId = custBrId;
//	}

//	@Column(name = "CUST_MGR_ID", length = 35)
//	public String getCustMgrId() {
//		return this.custMgrId;
//	}
//
//	public void setCustMgrId(String custMgrId) {
//		this.custMgrId = custMgrId;
//	}
//
//	@Column(name = "CUST_CTRY", length = 35)
//	public String getCustCtry() {
//		return this.custCtry;
//	}
//
//	public void setCustCtry(String custCtry) {
//		this.custCtry = custCtry;
//	}
//
//	@Column(name = "CUST_INDUSTRY", length = 35)
//	public String getCustIndustry() {
//		return this.custIndustry;
//	}
//
//	public void setCustIndustry(String custIndustry) {
//		this.custIndustry = custIndustry;
//	}
//
//	@Column(name = "DEPT_ID", length = 35)
//	public String getDeptId() {
//		return this.deptId;
//	}
//
//	public void setDeptId(String deptId) {
//		this.deptId = deptId;
//	}
//
//	@Column(name = "CUST_ADR", length = 140)
//	public String getCustAdr() {
//		return this.custAdr;
//	}
//
//	public void setCustAdr(String custAdr) {
//		this.custAdr = custAdr;
//	}
//
//	@Column(name = "CUST_EN_ADR", length = 140)
//	public String getCustEnAdr() {
//		return this.custEnAdr;
//	}
//
//	public void setCustEnAdr(String custEnAdr) {
//		this.custEnAdr = custEnAdr;
//	}
//
//	@Column(name = "CUST_TEL", length = 35)
//	public String getCustTel() {
//		return this.custTel;
//	}
//
//	public void setCustTel(String custTel) {
//		this.custTel = custTel;
//	}
//
//	@Column(name = "CUST_FAX", length = 35)
//	public String getCustFax() {
//		return this.custFax;
//	}
//
//	public void setCustFax(String custFax) {
//		this.custFax = custFax;
//	}
//
//	@Column(name = "CUST_EMAIL", length = 40)
//	public String getCustEmail() {
//		return this.custEmail;
//	}
//
//	public void setCustEmail(String custEmail) {
//		this.custEmail = custEmail;
//	}

	@Column(name = "CUST_TP", length = 1)
	public String getCustTp() {
		return this.custTp;
	}

	public void setCustTp(String custTp) {
		this.custTp = custTp;
	}

//	@Column(name = "CTCT_ID", length = 35)
//	public String getCtctId() {
//		return this.ctctId;
//	}
//
//	public void setCtctId(String ctctId) {
//		this.ctctId = ctctId;
//	}

	@Column(name = "CTCT_NM", length = 35)
	public String getCtctNm() {
		return this.ctctNm;
	}

	public void setCtctNm(String ctctNm) {
		this.ctctNm = ctctNm;
	}

//	@Column(name = "CTCT_EN_NM", length = 35)
//	public String getCtctEnNm() {
//		return this.ctctEnNm;
//	}
//
//	public void setCtctEnNm(String ctctEnNm) {
//		this.ctctEnNm = ctctEnNm;
//	}

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

//	@Column(name = "CTCT_ADR", length = 140)
//	public String getCtctAdr() {
//		return this.ctctAdr;
//	}
//
//	public void setCtctAdr(String ctctAdr) {
//		this.ctctAdr = ctctAdr;
//	}
//
//	@Column(name = "CUST_FLG", length = 1)
//	public String getCustFlg() {
//		return this.custFlg;
//	}
//
//	public void setCustFlg(String custFlg) {
//		this.custFlg = custFlg;
//	}

//	@Column(name = "IS_KEYCUST", length = 1)
//	public String getIsKeycust() {
//		return this.isKeycust;
//	}
//
//	public void setIsKeycust(String isKeycust) {
//		this.isKeycust = isKeycust;
//	}
//
//	@Column(name = "CCY", length = 10)
//	public String getCcy() {
//		return this.ccy;
//	}
//
//	public void setCcy(String ccy) {
//		this.ccy = ccy;
//	}

	@Column(name = "LMT_AMT", precision = 18, scale = 4)
	public BigDecimal getLmtAmt() {
		return this.lmtAmt;
	}

	public void setLmtAmt(BigDecimal lmtAmt) {
		this.lmtAmt = lmtAmt;
	}

//	@Column(name = "VALID_DT", length = 19)
//	public Timestamp getValidDt() {
//		return this.validDt;
//	}
//
//	public void setValidDt(Timestamp validDt) {
//		this.validDt = validDt;
//	}
//
//	@Column(name = "DUE_DT", length = 19)
//	public Timestamp getDueDt() {
//		return this.dueDt;
//	}
//
//	public void setDueDt(Timestamp dueDt) {
//		this.dueDt = dueDt;
//	}

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

	@Column(name = "sys_busi_unit", length = 40)
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

//	@Column(name = "LICENSE_REG_DT", length = 19)
//	public Timestamp getLicenseRegDt() {
//		return this.licenseRegDt;
//	}
//
//	public void setLicenseRegDt(Timestamp licenseRegDt) {
//		this.licenseRegDt = licenseRegDt;
//	}

//	@Column(name = "LICENSE_DUE_DT", length = 19)
//	public Timestamp getLicenseDueDt() {
//		return this.licenseDueDt;
//	}
//
//	public void setLicenseDueDt(Timestamp licenseDueDt) {
//		this.licenseDueDt = licenseDueDt;
//	}

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

//	@Column(name = "STAFF_NUM", length = 10)
//	public String getStaffNum() {
//		return this.staffNum;
//	}
//
//	public void setStaffNum(String staffNum) {
//		this.staffNum = staffNum;
//	}

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

//	@Column(name = "INVENTOR_TYPE", length = 5)
//	public String getInventorType() {
//		return this.inventorType;
//	}
//
//	public void setInventorType(String inventorType) {
//		this.inventorType = inventorType;
//	}
//
//	@Column(name = "BELOG_BCH_ID", length = 40)
//	public String getBelogBchId() {
//		return this.belogBchId;
//	}
//
//	public void setBelogBchId(String belogBchId) {
//		this.belogBchId = belogBchId;
//	}
//
//	@Column(name = "BELOG_BCH_NAME", length = 200)
//	public String getBelogBchName() {
//		return this.belogBchName;
//	}
//
//	public void setBelogBchName(String belogBchName) {
//		this.belogBchName = belogBchName;
//	}
//
//	@Column(name = "LOGOURL", length = 200)
//	public String getLogourl() {
//		return this.logourl;
//	}
//
//	public void setLogourl(String logourl) {
//		this.logourl = logourl;
//	}

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

//	@Column(name = "LMT_FLG", length = 1)
//	public String getLmtFlg() {
//		return this.lmtFlg;
//	}
//
//	public void setLmtFlg(String lmtFlg) {
//		this.lmtFlg = lmtFlg;
//	}

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

//	@Column(name = "BUSI_TP", length = 1)
//	public String getBusiTp() {
//		return this.busiTp;
//	}
//
//	public void setBusiTp(String busiTp) {
//		this.busiTp = busiTp;
//	}
//
//	@Column(name = "THEIR_REF", length = 35)
//	public String getTheirRef() {
//		return this.theirRef;
//	}
//
//	public void setTheirRef(String theirRef) {
//		this.theirRef = theirRef;
//	}
//
//	@Column(name = "RCUST_ID", length = 35)
//	public String getRcustId() {
//		return this.rcustId;
//	}
//
//	public void setRcustId(String rcustId) {
//		this.rcustId = rcustId;
//	}
//
//	@Column(name = "RCUST_NM", length = 35)
//	public String getRcustNm() {
//		return this.rcustNm;
//	}
//
//	public void setRcustNm(String rcustNm) {
//		this.rcustNm = rcustNm;
//	}
//
//	@Column(name = "LMT_DT", length = 19)
//	public Timestamp getLmtDt() {
//		return this.lmtDt;
//	}
//
//	public void setLmtDt(Timestamp lmtDt) {
//		this.lmtDt = lmtDt;
//	}

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

	@Column(name = "CUST_LEVEL", length =15 )
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

	@Column(name = "CONTACT_PERSON", length = 35)
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

	@Column(name = "CUST_ID", length = 35)
	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}
	@Column(name = "SYS_GAPI_STS", length = 1)
	public String getSysGapiSts() {
		return sysGapiSts;
	}

	public void setSysGapiSts(String sysGapiSts) {
		this.sysGapiSts = sysGapiSts;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}