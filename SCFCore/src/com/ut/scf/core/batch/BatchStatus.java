package com.ut.scf.core.batch;

public class BatchStatus implements IBatchStatus{
	private String batchStatus;
	private String batchType;
	private String batchId;
	private String batchName;
	
	public String getBatchStatus() {
		return batchStatus;
	}
	public void setBatchStatus(String batchStatus) {
		this.batchStatus = batchStatus;
	}
	public String getBatchType() {
		return batchType;
	}
	public void setBatchType(String batchType) {
		this.batchType = batchType;
	}
	public String getBatchId() {
		return batchId;
	}
	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}
	public String getBatchName() {
		return batchName;
	}
	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}

	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj instanceof BatchStatus) {
			String oId = ((BatchStatus) obj).getBatchId();
			return this.getBatchId().equalsIgnoreCase(oId);
		}
		return false;
	}

}
