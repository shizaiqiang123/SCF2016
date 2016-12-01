package com.ut.scf.core.esb;

/**
 * 
 * @author PanHao
 * @see 
 *  对ESB 上发布的具体服务管理
 * @since 1.0
 *
 */
public interface IESBServiceManager {
	public void start(IESBServiceEntity entity);
	
	public void stop(IESBServiceEntity entity);
	
	public void pause(IESBServiceEntity entity);
	
	public void reStart(IESBServiceEntity entity);
	
	public String getStatus(IESBServiceEntity entity);
}
