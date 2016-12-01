package com.ut.scf.core.workflow;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class WorkItem implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String itemId;
	
	private String itemName;
	
	private String itemDesc;
	
	private String itemCode;
	
	private String itemState;
	
	private String itemRefNo;
	
	private String itemExecutorId;//执行人Id
	
	private String itemPreExecutorId;//上一步执行人Id
	private String preItemName;//上一步执行人Id
	
	private int itemEvent;
	
	private Date startTime;
	
	private String currentStep;
	
	private String nextStep;
	
	private String preStep;
	
	private long proInsId;
	
	private String busiUnit;
	
	private Map<String,Object> bussinessData = new HashMap<String, Object>();

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemDesc() {
		return itemDesc;
	}

	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}

	public String getItemCode() {
		return itemCode;
	}

	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	public String getItemState() {
		return itemState;
	}

	public void setItemState(String itemState) {
		this.itemState = itemState;
	}

	public String getItemRefNo() {
		return itemRefNo;
	}

	public void setItemRefNo(String itemRefNo) {
		this.itemRefNo = itemRefNo;
	}

	public int getItemEvent() {
		return itemEvent;
	}

	public void setItemEvent(int itemEvent) {
		this.itemEvent = itemEvent;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date timestamp) {
		this.startTime = timestamp;
	}

	public String getCurrentStep() {
		return currentStep;
	}

	public void setCurrentStep(String currentStep) {
		this.currentStep = currentStep;
	}

	public String getNextStep() {
		return nextStep;
	}

	public void setNextStep(String nextStep) {
		this.nextStep = nextStep;
	}

	public String getPreStep() {
		return preStep;
	}

	public void setPreStep(String preStep) {
		this.preStep = preStep;
	}

	public long getProInsId() {
		return proInsId;
	}

	public void setProInsId(long proInsId) {
		this.proInsId = proInsId;
	}

	public String getBusiUnit() {
		return busiUnit;
	}

	public void setBusiUnit(String busiUnit) {
		this.busiUnit = busiUnit;
	}
	
	public void setBusiData(String busiName ,Object busiValue){
		this.bussinessData.put(busiName, busiValue);
	}
	
	public Object getBusiData(String busiName){
		if(this.bussinessData.containsKey(busiUnit)){
			return this.bussinessData.get(busiName);
		}
		return null;
	}
	
	public boolean constainsField(String fieldName){
		return this.bussinessData.containsKey(fieldName);
	}

	public Map<String, Object> getBussinessData() {
		return bussinessData;
	}

	public void setBussinessData(Map<String, Object> bussinessData) {
		this.bussinessData = bussinessData;
	}

	public String getItemExecutorId() {
		return itemExecutorId;
	}

	public void setItemExecutorId(String itemExecutorId) {
		this.itemExecutorId = itemExecutorId;
	}

	public String getItemPreExecutorId() {
		return itemPreExecutorId;
	}

	public void setItemPreExecutorId(String itemPreExecutorId) {
		this.itemPreExecutorId = itemPreExecutorId;
	}

	public String getPreItemName() {
		return preItemName;
	}

	public void setPreItemName(String preItemName) {
		this.preItemName = preItemName;
	}
	
	
}
