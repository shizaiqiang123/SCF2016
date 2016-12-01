package com.ut.scf.mule.impl;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.UnknownHostException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;


import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPMessage;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpConnectionManager;
import org.apache.commons.httpclient.methods.InputStreamRequestEntity;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;
import org.apache.cxf.aegis.databinding.AegisDatabinding;
import org.apache.cxf.frontend.ServerFactoryBean;
import org.apache.cxf.interceptor.Interceptor;
import org.apache.cxf.jaxws.support.JaxWsServiceFactoryBean;
import org.apache.cxf.message.Message;

import org.w3c.dom.Node;

import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.mule.IESBProtocol;
import com.ut.scf.mule.message.webservice.IInterceptor;

public class ESBRunnerWSImpl implements IESBProtocol {
	private String url;
	private String timeout;
	private String charset;
	private String inorout;
	private String serviceTp;
	private String characterset;

	public String getCharacterset() {
		return characterset;
	}

	public void setCharacterset(String characterset) {
		this.characterset = characterset;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getInterceptorClass() {
		return interceptorClass;
	}

	public void setInterceptorClass(String interceptorClass) {
		this.interceptorClass = interceptorClass;
	}

	private String userName;
	private String pwd;
	private String interceptorClass;

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception {
		IESBServiceResponse response = new ServiceResponseImpl();
		Object object = request.getRequestData();
		if (object == null) {

		}
		GapiMsgPara gapiObj = (GapiMsgPara) request.getRequestPara();
		String xmlSource = object.toString();

		int len = xmlSource.length();
		if (len > 9999) {
			throw new IOException("send msg too long .");
		}
		try {
			HttpClient httpclient = new HttpClient();
			HttpConnectionManager hConnectionManager = httpclient.getHttpConnectionManager();
			HttpConnectionManagerParams hManagerParams = new HttpConnectionManagerParams();
			hManagerParams.setSoTimeout(Integer.parseInt(this.getTimeout()) * 1000);
			hManagerParams.setConnectionTimeout(Integer.parseInt(this.getTimeout()) * 1000);
			hConnectionManager.setParams(hManagerParams);
			PostMethod httpMethod = new PostMethod(this.getUrl());
			httpMethod.setRequestHeader("connection", "Keep-Alive");
			String string = formatMessage(xmlSource);
			byte[] b = string.getBytes(charset);
			ESBServiceUtil.getLogger().debug("发送WS报文：" + string);
			InputStream is = new ByteArrayInputStream(b, 0, b.length);
			RequestEntity re = new InputStreamRequestEntity(is, b.length, "application/soap+xml; charset=" + charset);
			httpMethod.setRequestEntity(re);
			int statusCode = httpclient.executeMethod(httpMethod);
			if (statusCode == 200) {
				response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_SENDED);
				if ("SYNC".equals(gapiObj.getModle())) {
					BufferedReader in = new BufferedReader(new InputStreamReader(httpMethod.getResponseBodyAsStream(),
							httpMethod.getResponseCharSet()));
					StringBuffer sb = new StringBuffer();
					String line = null;
					while ((line = in.readLine()) != null) {
						sb.append(line);
					}
					ESBServiceUtil.getLogger().debug("接收WS报文：" + sb.toString());
					response.setResponseData(getSoapMsgBodyData(sb.toString()));
					response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_RECEIVED);
				}
			} else {
				 String soapResponseData = httpMethod.getResponseBodyAsString();
	             System.out.println(soapResponseData);
				throw new Exception("Http response code :" + statusCode);
			}

			ESBServiceUtil.getLogger().debug("process end...");
		} catch (UnknownHostException e1) {
			ESBServiceUtil.getLogger().error("exception..." + e1.toString());
			response.setError("Exception:" + e1.toString());
			throw e1;
		} catch (IOException e1) {
			ESBServiceUtil.getLogger().error("exception..." + e1.toString());
			response.setError("Exception:" + e1.toString());
			throw e1;
		}

		return response;
	}

	ServerFactoryBean serverFactoryBean;

	@Override
	public void initlizeService(IESBService request) throws Exception {
		this.setUrl(request.getAddress());
		this.setCharset(request.getCharacterset());
		this.setTimeout(request.getTimeout());
		this.setInorout(request.getInorout());
		this.setServiceTp(request.getServiceType());
		this.setUserName(request.getWsUser());
		this.setPwd(request.getWsPwd());
		this.characterset = request.getCharacterset();
		this.setInterceptorClass(request.getWsInterceptorClass());
		if ("o".equalsIgnoreCase(this.inorout)) {
			AegisDatabinding a = new AegisDatabinding();
			JaxWsServiceFactoryBean s = new JaxWsServiceFactoryBean();
			s.setDataBinding(a);
			s.setWrapped(true);
			serverFactoryBean = new ServerFactoryBean(s);
			serverFactoryBean.setServiceClass(Class.forName(request.getInterfaceName()));
			serverFactoryBean.setAddress("/" + request.getWsServiceName());
			serverFactoryBean.setServiceBean(Class.forName(request.getClassName()).newInstance());
			if (this.getInterceptorClass() != null && this.getInterceptorClass().length() > 0) {
				List<Interceptor<? extends Message>> list = new ArrayList();
				Object object = Class.forName(interceptorClass).newInstance();
				IInterceptor iInterceptor = (IInterceptor) object;
				iInterceptor.setWsUser(userName);
				iInterceptor.setWsPwd(pwd);
				list.add((Interceptor<Message>) object);
				serverFactoryBean.setInInterceptors(list);
			}
			serverFactoryBean.create();
			System.out.println("发布web服务：" + request.getWsServiceName() + "成功!");
		}
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTimeout() {
		return timeout;
	}

	public void setTimeout(String timeout) {
		this.timeout = timeout;
	}

	public String getCharset() {
		return charset;
	}

	public void setCharset(String charset) {
		this.charset = charset;
	}

	public String getInorout() {
		return inorout;
	}

	public void setInorout(String inorout) {
		this.inorout = inorout;
	}

	public void setServiceTp(String serviceTp) {
		this.serviceTp = serviceTp;
	}

	@Override
	public void destoryService(IESBService request) throws Exception {
		if ("o".equalsIgnoreCase(this.inorout)) {
			if (serverFactoryBean != null && serverFactoryBean.isStart()) {
				serverFactoryBean.destroy();
			}
		}
	}

	@Override
	public String getServiceTp() {
		return serviceTp;
	}

	private String formatMessage(String source) throws Exception {
		String string = "";
		string += "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"                                                                      ";
		string += "	xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">                                    ";
		string += "	<soap:Header>                                                                                                                              ";
		string += "		<wsse:Security soap:mustUnderstand=\"1\"                                                                                               ";
		string += "			xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">                                  ";
		string += "			<wsse:UsernameToken wsu:Id=\"UsernameToken-203264315\"                                                                             ";
		string += "				xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"                               ";
		string += "				xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">                              ";
		string += "				<wsse:Username                                                                                                                 ";
		string += "					xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">%s</wsse:Username>";
		string += "				<wsse:Password                                                                                                                 ";
		string += "					Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\"                   ";
		string += "					xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">%s</wsse:Password>      ";
		string += "			</wsse:UsernameToken>                                                                                                              ";
		string += "		</wsse:Security>                                                                                                                       ";
		string += "	</soap:Header>                                                                                                                             ";
		string += "	<soap:Body>                                                                                                                                ";
		string += "		<ns1:send xmlns:ns1=\"http://server.xfire.xerp.nstc.com\">                                                                             ";
		string += "			<ns1:in0></ns1:in0>                                                                                                            ";
		string += "		</ns1:send>                                                                                                                            ";
		string += "	</soap:Body>                                                                                                                               ";
		string += "</soap:Envelope>                                                                                                                             ";
		String string2 = String.format(string, userName, pwd);
		SOAPMessage soapMessage = soapString2SOAPMessage(string2);
		Node node = soapMessage.getSOAPBody().getFirstChild().getNextSibling().getFirstChild().getNextSibling();
		node.setTextContent(source);
		soapMessage.saveChanges();
		return soapMessage2String(soapMessage);
	}

	public static void main(String[] args) throws Exception {
		ESBRunnerWSImpl ex = new ESBRunnerWSImpl();
		ex.setPwd("12334");
		ex.setUserName("12334444");
		ex.setCharset("utf-8");
		System.out.println(ex.formatMessage("<root></root>"));
	}

	public String soapMessage2String(SOAPMessage soapMessage) throws Exception {
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		soapMessage.writeTo(bos);
		return new String(bos.toByteArray(), charset);
	}

	private SOAPMessage soapString2SOAPMessage(String soapMsg) throws Exception {
		MessageFactory msgFactory;
		msgFactory = MessageFactory.newInstance();
		SOAPMessage reqMsg = msgFactory.createMessage(new MimeHeaders(),
				new ByteArrayInputStream(soapMsg.getBytes(Charset.forName(charset))));
		reqMsg.saveChanges();
		return reqMsg;
	}

	private String getSoapMsgBodyData(String soapMsg) throws Exception {
		return soapString2SOAPMessage(soapMsg).getSOAPBody().getTextContent();
	}

}
