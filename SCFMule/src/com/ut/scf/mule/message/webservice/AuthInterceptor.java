package com.ut.scf.mule.message.webservice;

import org.apache.cxf.binding.soap.SoapMessage;
import org.apache.cxf.headers.Header;
import org.apache.cxf.interceptor.Fault;
import org.apache.cxf.phase.AbstractPhaseInterceptor;
import org.apache.cxf.phase.Phase;
import org.apache.log4j.Logger;
import org.w3c.dom.Element;

import javax.xml.namespace.QName;
import javax.xml.soap.SOAPException;


/**
 * webservice 认证
 */
public class AuthInterceptor extends AbstractPhaseInterceptor<SoapMessage>implements IInterceptor {

	private Logger logger = Logger.getLogger(AuthInterceptor.class);

	private String wsUser = "";
	private String wsPwd = "";

	public String getWsUser() {
		return wsUser;
	}

	public void setWsUser(String wsUser) {
		this.wsUser = wsUser;
	}

	public String getWsPwd() {
		return wsPwd;
	}

	public void setWsPwd(String wsPwd) {
		this.wsPwd = wsPwd;
	}

	public AuthInterceptor() {
		super(Phase.PRE_PROTOCOL);
	}

	public void handleMessage(SoapMessage message) throws Fault {
		QName usernameQName = new QName("http://webservice.message.mule.scf.ut.com", "Username", "ns");
		QName passwordQName = new QName("http://webservice.message.mule.scf.ut.com", "Password", "ns");
		Header passwordHeader = message.getHeader(passwordQName);
		Header userNameHeader = message.getHeader(usernameQName);

		if (userNameHeader != null && passwordHeader != null) {
			Element userNameE = (Element) userNameHeader.getObject();
			Element passwordE = (Element) passwordHeader.getObject();
			if (userNameE != null && passwordE != null) {
				String userName = userNameE.getTextContent();
				String password = passwordE.getTextContent();
				if (wsUser.equals(userName) && wsPwd.equals(password)) {

				} else {
					SOAPException soapExc = new SOAPException("认证错误");
					throw new Fault(soapExc);
				}
			} else {
				SOAPException soapExc = new SOAPException("认证错误");
				throw new Fault(soapExc);
			}
		} else {
			SOAPException soapExc = new SOAPException("认证错误");
			throw new Fault(soapExc);
		}
	}
}
