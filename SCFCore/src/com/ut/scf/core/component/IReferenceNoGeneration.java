package com.ut.scf.core.component;

import com.ut.scf.core.entity.IReferenceNoEntity;

public interface IReferenceNoGeneration {
	public String generateReferenceNo(IReferenceNoEntity entity);
	
	public boolean validateGeneration(IReferenceNoEntity entity);
}
