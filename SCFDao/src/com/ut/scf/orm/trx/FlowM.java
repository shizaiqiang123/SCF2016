package com.ut.scf.orm.trx;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;



/**
 * CustM entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "FLOW_M"
, schema = "TRX"
)
@DynamicUpdate(true)
@DynamicInsert(true)
public class FlowM implements Serializable{
	
	private String sysRefNo;
	private Integer procinsid;
	private String userId;
	private String sysOrgId;//新增字段add by WuKai 2016-11-7
	public FlowM() {
	}
	
	public FlowM(String sysRefNo, Integer procinsid) {
		this.sysRefNo = sysRefNo;
		this.procinsid = procinsid;
	}
	
	
	 public FlowM(String sysRefNo, Integer procinsid, String userId,String sysOrgId) {
		this.sysRefNo = sysRefNo;
		this.procinsid = procinsid;
		this.userId = userId;
		this.sysOrgId = sysOrgId;
	}

	@Id 
	    
	 @Column(name="SYS_REF_NO", unique=true, nullable=false, length=35)
	public String getSysRefNo() {
		return sysRefNo;
	}
	public void setSysRefNo(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}
	
	@Column(name = "PROCINSID", length = 20)
	public Integer getProcinsid() {
		return procinsid;
	}

	public void setProcinsid(Integer procinsid) {
		this.procinsid = procinsid;
	}
	
	@Column(name = "USER_ID", length = 30)
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}
