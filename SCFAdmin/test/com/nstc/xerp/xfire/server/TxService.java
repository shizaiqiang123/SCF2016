package com.nstc.xerp.xfire.server;

import javax.jws.WebService;

/**
 * <p>
 * Title:服务端报文服务
 * </p>
 * 
 * <p>
 * Description:服务端-报文服务
 * </p>
 * 
 * <p>
 * Company: 北京九恒星科技股份有限公司
 * </p>
 * 
 * @author liujia
 * 
 * @since：2011-5-8 下午04:10:10
 * 
 * @version 1.0
 */
@WebService
public interface TxService {
	/**
	 * 
	 * Description:服务端开放给ERP的接口方法，用于接收约定的XML报文
	 * 
	 * @param message
	 * @return 返回约定的XML报文
	 * @author liujia
	 * @since：2011-5-8 下午04:11:47
	 */
	public String send(String message);
}
