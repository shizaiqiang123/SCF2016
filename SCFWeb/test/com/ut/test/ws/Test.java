package com.ut.test.ws;

import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
import org.apache.ws.security.handler.WSHandlerConstants;

import com.nstc.xerp.xfire.server.TxService;


public class Test {

	public static void main(String[] args) {
		 JaxWsProxyFactoryBean jwpFactory = new JaxWsProxyFactoryBean();
	        jwpFactory.setAddress("http://192.168.106.50:7001/XERP/service/TxService");
	        jwpFactory.setServiceClass(TxService.class);
	        jwpFactory.getOutInterceptors().add(new HeaderIntercepter());

	        TxService hw = (TxService)jwpFactory.create();
	       // ReturnDO<CaseInfo> response = hw.getCaseById("fe4dbd91-74c2-4d84-b221-828893e43f76");
	        System.out.println(hw.send("2334"));
	}
}
