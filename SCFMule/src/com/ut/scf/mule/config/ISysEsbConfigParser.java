package com.ut.scf.mule.config;

import java.io.IOException;

import org.w3c.dom.Document;

public interface ISysEsbConfigParser {
	
	
	public final String CONFIG_ROOT = "flow";
	public final String CONFIG_NAME = "name";
	public final String CONFIG_PROTOCOL_TYPE = "protocol_type";
	public final String CONFIG_PROTOCOL = "protocol";
	public final String CONFIG_LOGIC_FLOW = "logic_flow";
	
	/***
	 * 
	 * @param configDom
	 * <?xml version="1.0" encoding="UTF-8"?>
		<flow>
			<name>WebService Loan</name>
			<protocol_type>WebService</protocol_type>
			<protocol>
				<inbound>
					<pattern>request-response</pattern>
					<address>mLoan</address>
					<encoding>GB18030</encoding>
		  			<serviceClass>com.ut.test.webservices.impl.MLoanService</serviceClass>
				</inbound>
			</protocol>
			<logic_flow>
				<component type="singleton-object">com.ut.test.webservices.impl.MLoanService</component>
			</logic_flow>
		</flow>
	 * @throws IOException
	 */
	public void loadConfig(Document configDom) throws IOException;
	
	public ISysEsbConfigFlowConstruct parseCongig();
}
