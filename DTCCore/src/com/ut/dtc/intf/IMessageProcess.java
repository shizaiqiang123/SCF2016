package com.ut.dtc.intf;

import com.ut.dtc.intf.data.ApplicationDefine;

public interface IMessageProcess {
	public String formatOutput(String content, ApplicationDefine out) throws Exception;

	public void storeData(String content,IMetadata metadata);

	public String formatInput(String content, IMetadata metadata) throws Exception;

	public void processMetadata(String content, IMetadata metadata);

	public void doAuthorizeCheck(String content, IMetadata metadata) throws Exception;

	public Object formatResponse(Object responseData, ApplicationDefine out);

	public void buildMetadata(IMetadata metadata, String content) throws Exception;

}