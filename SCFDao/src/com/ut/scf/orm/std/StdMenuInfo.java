package com.ut.scf.orm.std;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * StdMenuInfo entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "std_menu_info"
,schema="STD"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class StdMenuInfo implements java.io.Serializable {

	// Fields

	private String sysRefNo;
	private String menuId;
	private String menuName;
	private String menuParentid;
	private String isparent;
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
	private Integer menuNum;
	private Integer menuTp;
	private String menuImage;

	// Constructors

	/** default constructor */
	public StdMenuInfo() {
	}

	/** minimal constructor */
	public StdMenuInfo(String sysRefNo, String menuId, String menuName, String menuParentid, String isparent,
			Timestamp sysOpTm, Timestamp sysRelTm, Timestamp sysAuthTm, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.menuId = menuId;
		this.menuName = menuName;
		this.menuParentid = menuParentid;
		this.isparent = isparent;
		this.sysOpTm = sysOpTm;
		this.sysRelTm = sysRelTm;
		this.sysAuthTm = sysAuthTm;
		this.sysEventTimes = sysEventTimes;
	}

	/** full constructor */
	public StdMenuInfo(String sysRefNo, String menuId, String menuName, String menuParentid, String isparent,
			String sysOpId, Timestamp sysOpTm, String sysRelId, Timestamp sysRelTm, String sysAuthId,
			Timestamp sysAuthTm, String sysNextOp, String sysLockFlag, String sysLockBy, String sysFuncId,
			String sysTrxSts, Integer sysEventTimes, Integer menuNum,Integer menuTp,String menuImage) {
		this.sysRefNo = sysRefNo;
		this.menuId = menuId;
		this.menuName = menuName;
		this.menuParentid = menuParentid;
		this.isparent = isparent;
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
		this.menuNum = menuNum;
		this.menuTp = menuTp;
		this.menuImage=menuImage;
	}

	// Property accessors
	@Id
	@Column(name = "SYS_REF_NO", unique = true, nullable = false, length = 32)
	public String getSysRefNo() {
		return this.sysRefNo;
	}

	public void setSysRefNo(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}

	@Column(name = "MENU_ID", nullable = false, length = 32)
	public String getMenuId() {
		return this.menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	@Column(name = "MENU_NAME", nullable = false, length = 200)
	public String getMenuName() {
		return this.menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	@Column(name = "MENU_PARENTID", nullable = false, length = 32)
	public String getMenuParentid() {
		return this.menuParentid;
	}

	public void setMenuParentid(String menuParentid) {
		this.menuParentid = menuParentid;
	}

	@Column(name = "ISPARENT", nullable = false, length = 1)
	public String getIsparent() {
		return this.isparent;
	}

	public void setIsparent(String isparent) {
		this.isparent = isparent;
	}

	@Column(name = "SYS_OP_ID", length = 35)
	public String getSysOpId() {
		return this.sysOpId;
	}

	public void setSysOpId(String sysOpId) {
		this.sysOpId = sysOpId;
	}

	@Column(name = "SYS_OP_TM", nullable = true, length = 19)
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

	@Column(name = "MENU_NUM", precision = 22, scale = 0)
	public Integer getMenuNum() {
		return this.menuNum;
	}

	public void setMenuNum(Integer menuNum) {
		this.menuNum = menuNum;
	}

	@Column(name = "MENU_TP", precision = 22, scale = 0)
	public Integer getMenuTp() {
		return menuTp;
	}

	public void setMenuTp(Integer menuTp) {
		this.menuTp = menuTp;
	}

	@Column(name = "MENU_IMAGE", length = 200)
	public String getMenuImage() {
		return menuImage;
	}

	public void setMenuImage(String menuImage) {
		this.menuImage = menuImage;
	}

}