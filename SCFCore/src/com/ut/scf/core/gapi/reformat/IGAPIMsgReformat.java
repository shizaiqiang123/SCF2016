package com.ut.scf.core.gapi.reformat;

import com.ut.comm.xml.gapi.GapiMsgPara;
/**
 * 对GAPI消息进行format成标准的格式
 * @author PanHao
 *
 */
public interface IGAPIMsgReformat {
	/**
	 * 
	 * @param protocol : 参数
	 * @param message	： 消息内容
	 * @param trxDom	：当前交易数据
	 * @throws Exception
	 */
	public String reformat(GapiMsgPara protocol,Object message,Object trxDom) throws Exception;
	
	/**
	 * 
	 * @param protocol : 参数定义
	 * @param message ： 接收到的消息体已经被Mapping成 json格式
	 * {
	 * 	verifyResult:boolean
	 * 	verifyMsg: String
	 * }
	 * @param trxDom	： 当前交易数据
	 * @throws Exception
	 */
	public Object verify(GapiMsgPara protocol,Object messageJson) throws Exception;
}
