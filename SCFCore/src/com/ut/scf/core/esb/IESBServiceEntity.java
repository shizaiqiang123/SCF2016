package com.ut.scf.core.esb;

/**
 * ESB 服务的管理实体类
 * @author PanHao
 *
 */
public interface IESBServiceEntity extends IESBService{
	public void setStatus(String status);
	
	public String getStatus();
}
