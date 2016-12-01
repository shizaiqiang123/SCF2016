package com.ut.scf.orm.trx;

import java.math.BigDecimal;

import javax.persistence.Embeddable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

/**
 * LoanRegEId entity. @author MyEclipse Persistence Tools
 */
@Embeddable
@DynamicUpdate(true)
@DynamicInsert(true)
public class LoanRegEId implements java.io.Serializable {

	// Fields

	private String sysRefNo;
	private Integer sysEventTimes;

	// Constructors

	/** default constructor */
	public LoanRegEId() {
	}

	/** full constructor */
	public LoanRegEId(String sysRefNo, Integer sysEventTimes) {
		this.sysRefNo = sysRefNo;
		this.sysEventTimes = sysEventTimes;
	}

	// Property accessors

	public String getSysRefNo() {
		return this.sysRefNo;
	}

	public void setSysRefNo(String sysRefNo) {
		this.sysRefNo = sysRefNo;
	}

	public Integer getSysEventTimes() {
		return this.sysEventTimes;
	}

	public void setSysEventTimes(Integer sysEventTimes) {
		this.sysEventTimes = sysEventTimes;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof LoanRegEId))
			return false;
		LoanRegEId castOther = (LoanRegEId) other;

		return ((this.getSysRefNo() == castOther.getSysRefNo()) || (this
				.getSysRefNo() != null && castOther.getSysRefNo() != null && this
				.getSysRefNo().equals(castOther.getSysRefNo())))
				&& ((this.getSysEventTimes() == castOther.getSysEventTimes()) || (this
						.getSysEventTimes() != null
						&& castOther.getSysEventTimes() != null && this
						.getSysEventTimes()
						.equals(castOther.getSysEventTimes())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getSysRefNo() == null ? 0 : this.getSysRefNo().hashCode());
		result = 37
				* result
				+ (getSysEventTimes() == null ? 0 : this.getSysEventTimes()
						.hashCode());
		return result;
	}

}