package com.ut.scf.web.session;


public class UserSessionObj extends SessionObject{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String userName;
	private String ownerBrId;
	private String userId;
	private String sysDate;
	private String sysBusiUnit;
	private String datasource;
	private String userTp;
	private String userRefNo;
	private String userRole;
	private String userOwnerId;
	private String ownerDept;
	private String sysOrgId;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getOwnerBrId() {
		return ownerBrId;
	}
	public void setOwnerBrId(String ownerBrId) {
		this.ownerBrId = ownerBrId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getSysDate() {
		return sysDate;
	}
	public void setSysDate(String sysDate) {
		this.sysDate = sysDate;
	}
	public String getSysBusiUnit() {
		return sysBusiUnit;
	}
	public void setSysBusiUnit(String sysBusiUnit) {
		this.sysBusiUnit = sysBusiUnit;
	}
	public String getDatasource() {
		return datasource;
	}
	public void setDatasource(String datasource) {
		this.datasource = datasource;
	}
	public String getUserTp() {
		return userTp;
	}
	public void setUserTp(String userTp) {
		this.userTp = userTp;
	}
	public String getUserRefNo() {
		return userRefNo;
	}
	public void setUserRefNo(String userRefNo) {
		this.userRefNo = userRefNo;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	public String getUserOwnerId() {
		return userOwnerId;
	}
	public void setUserOwnerId(String userOwnerId) {
		this.userOwnerId = userOwnerId;
	}
	public String getOwnerDept(){
		return ownerDept;
	}
	public void setOwnerDept(String ownerDept){
		this.ownerDept = ownerDept;
	}
	
	public String getSysOrgId() {
		return sysOrgId;
	}
	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}

	
}
