package com.ut.scf.core.workflow;

public class ProcessInstanceData {
	private boolean isAgree;
	
	private String itemRefNo;
	
	private int itemEvent;
	
	private String currentStep;
	
	private String nextStep;
	
	private String preStep;

	public boolean isAgree() {
		return isAgree;
	}

	public void setAgree(boolean isAgree) {
		this.isAgree = isAgree;
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
}
