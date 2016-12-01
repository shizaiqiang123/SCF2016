package com.ut.dtc.intf;

/**
 * @see 验证消息格式合法性
 * @author 潘浩
 *
 */
public interface IValidate {
	
	public boolean validateHeader(Object obj) throws Exception;
	
	public boolean validateBody(Object obj) throws Exception;
	
	public boolean validateRequest(Object obj) throws Exception;
	
	public boolean validateResponse(Object obj) throws Exception;
}
