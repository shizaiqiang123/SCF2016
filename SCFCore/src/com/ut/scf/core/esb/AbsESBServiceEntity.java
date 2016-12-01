package com.ut.scf.core.esb;

import org.apache.log4j.Logger;

import com.ut.scf.core.log.APLogUtil;

/**
 * 服务注册实现类
 * 所有ESB服务，都扩展此类
 * 此接口的实现类可以由ESB Service 参数定义直接Mapping
 * @author PanHao
 *
 */
public abstract class AbsESBServiceEntity implements IESBService{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Logger getLogger() {
		return APLogUtil.getServiceLogger("");
	}
}
