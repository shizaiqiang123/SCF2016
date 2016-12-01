package com.ut.scf.core.gapi;

import com.ut.comm.xml.gapi.GapiMsgPara;

public interface IGAPIMsgManager extends IGAPIMsgDemerge,IGAPIMsgMerge{
	
	/**
	 * 
	 * @param para : define
	 * @param reqDom :json格式数据对象 
	 * @param autoCommit :是否直接提交事物 
	 * @return boolean : success or failed
	 * @throws Exception
	 */
	public Object storeMsg(GapiMsgPara para,Object reqDom, boolean autoCommit) throws Exception;
	
	/**
	 * 
	 * @param para : define
	 * @param reqDom :xml格式数据对象 
	 * @param autoCommit :是否直接提交事物 
	 * @return boolean : success or failed
	 * @throws Exception
	 */
	public Object resendMsg(GapiMsgPara para,Object reqDom, boolean autoCommit) throws Exception;
	
	/**
	 * 
	 * @param para : define
	 * @param msgId : 消息唯一编号
	 * @param autoCommit :是否直接提交事物 
	 * @return boolean : success or failed
	 * @throws Exception
	 */
	public Object deleteMsg(GapiMsgPara para,String msgId, boolean autoCommit) throws Exception;
}
