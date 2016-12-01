package com.ut.scf.mule.config;

import com.ut.comm.tool.string.StringUtil;

public class MuleLogicEntity implements ILogicEntity{
	private String entityType;
	private String entityClass;
	
	@Override
	public void setEntityType(String entityType) {
		if(StringUtil.isTrimNotEmpty(entityType))
			this.entityType = entityType;
	}

	@Override
	public void setEntityClass(String entityClass) {
		if(StringUtil.isTrimNotEmpty(entityClass))
			this.entityClass = entityClass;
	}

	public String getEntityType() {
		return entityType;
	}

	public String getEntityClass() {
		return entityClass;
	}


}
