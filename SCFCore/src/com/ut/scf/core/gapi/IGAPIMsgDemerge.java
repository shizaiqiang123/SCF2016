package com.ut.scf.core.gapi;

import java.util.List;

import com.ut.comm.xml.gapi.GapiMsgPara;

public interface IGAPIMsgDemerge {
	/**
	 * 
	 * @param para : mapping
	 * @param gapiMsg : xml 格式消息
	 * @return json格式数据对象
	 * @throws Exception
	 */
	public List<Object> demerge(GapiMsgPara para, Object gapiMsg) throws Exception;
}
