package com.ut.scf.core.gapi;

import com.ut.comm.xml.gapi.GapiMsgPara;

public interface IGAPIProcessManager {
	/**
	 * 
	 * @param para : gapi msg para
	 * @param msgContent : 服务返回的结果数据，即待发送的数据
	 * @param trxData : 当前交易的全部数据
	 * @throws Exception
	 */
	public IGAPIMsgResponse processSendMsg(GapiMsgPara para, IGAPIMsgRequest msgContent, Object trxData) throws Exception;
	
	/**
	 * 
	 * @param para
	 * @param msgContent
	 * @return
	 * @throws Exception
	 */
	public IGAPIMsgRequest processRecvMsg(String mappingService, String msgContent,String currentBu) throws Exception;
	
	/**
	 * 
	 * @param para : gapi 定义
	 * @param msgContent : 业务数据
	 * @param trxData ： 基础数据
	 * @return ： 待发送的报文
	 * @throws Exception
	 */
	public String processReformatMsg(GapiMsgPara para, IGAPIMsgRequest msgContent,Object trxData) throws Exception;
}
