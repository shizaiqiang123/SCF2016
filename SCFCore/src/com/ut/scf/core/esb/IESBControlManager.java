package com.ut.scf.core.esb;

import java.util.List;

/**
 * 
 * @author PanHao
 * @see 
	ESB 服务端接口，对系统中ESB实现容器的管理
 * @since 1.0
 *
 */
public interface IESBControlManager {
	
	public void start() throws Exception;
	
	public void stop() throws Exception;
	
	public void pause() throws Exception;
	
	public void reStart() throws Exception;
	
	public List<IESBServiceEntity> getAllServices();
	
	public String getStatus();
	
}
