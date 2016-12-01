package com.ut.scf.mule.message.webservice;

import javax.jws.WebService;

@WebService(endpointInterface = "com.ut.scf.mule.message.webservice.IWebService")
public class WsImpl implements IWebService {

	@Override
	public String doWork(String reqData) {
		String string = "";
		string += "<?xml version=\"1.0\" encoding = \"UTF-8\"?>";
		string += "<XERP>                                  ";
		string += "	<BODY>                               ";
		string += "		<RET_CODE>0</RET_CODE>           ";
		string += "		<RET_MSG></RET_MSG>              ";
		string += "	</BODY>                              ";
		string += "</XERP>                                 ";
		return string;
	}

}
