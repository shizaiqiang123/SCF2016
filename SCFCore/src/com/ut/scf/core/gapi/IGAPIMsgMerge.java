package com.ut.scf.core.gapi;

import com.ut.comm.xml.gapi.GapiMsgPara;

public interface IGAPIMsgMerge {
	/**
	 * 
	 * @param para : mapping
	 * @param gapiMsg :json格式数据对象 
	 * @return xml 格式消息
	 * @throws Exception
	 */
	public Object mergeMsg(GapiMsgPara para,Object reqDom) throws Exception;
	
}
