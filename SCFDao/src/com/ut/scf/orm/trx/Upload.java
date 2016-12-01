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
 * TrfReg entity. @author MyEclipse Persistence Tools
 */
@Entity
@Table(name = "UPLOAD", schema = "TRX")
@DynamicUpdate(true)
@DynamicInsert(true)
public class Upload implements java.io.Serializable {

	// Fields

	private String sysRefNo;
	private String name;
	private String type;
	private String upUrl;
	private Timestamp uptime;
	private String upman;
	private String upvi;
	private String sysOrgId;// 新增字段add by WuKai 2016-11-7

	// Constructors

	public Upload() {
		super();
	}

	public Upload(String sysRefNo) {
		super();
		this.sysRefNo = sysRefNo;
	}

	public Upload(String sysRefNo, String name, String type, String upUrl,
			Timestamp uptime) {
		super();
		this.sysRefNo = sysRefNo;
		this.name = name;
		this.type = type;
		this.upUrl = upUrl;
		this.uptime = uptime;
	}

	public Upload(String sysRefNo, String name, String type, String upUrl,
			Timestamp uptime, String upman, String upvi, String sysOrgId) {
		super();
		this.sysRefNo = sysRefNo;
		this.name = name;
		this.type = type;
		this.upUrl = upUrl;
		this.uptime = uptime;
		this.upman = upman;
		this.upvi = upvi;
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

	@Column(name = "NAME", length = 50)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "TYPE", length = 30)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "UP_TIME", length = 6)
	public Timestamp getUptime() {
		return uptime;
	}

	public void setUptime(Timestamp uptime) {
		this.uptime = uptime;
	}

	@Column(name = "UP_URL", length = 200)
	public String getUpUrl() {
		return upUrl;
	}

	public void setUpUrl(String upUrl) {
		this.upUrl = upUrl;
	}

	@Column(name = "UPMAN", length = 50)
	public String getUpman() {
		return upman;
	}

	public void setUpman(String upman) {
		this.upman = upman;
	}

	@Column(name = "UPVI", length = 50)
	public String getUpvi() {
		return upvi;
	}

	public void setUpvi(String upvi) {
		this.upvi = upvi;
	}
	@Column(name = "SYS_ORG_ID", length = 35)
	public String getSysOrgId() {
		return sysOrgId;
	}

	public void setSysOrgId(String sysOrgId) {
		this.sysOrgId = sysOrgId;
	}
}
