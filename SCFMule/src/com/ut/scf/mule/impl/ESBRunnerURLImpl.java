package com.ut.scf.mule.impl;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.UnknownHostException;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpConnectionManager;
import org.apache.commons.httpclient.methods.InputStreamRequestEntity;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.params.HttpConnectionManagerParams;

import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.mule.IESBProtocol;

public class ESBRunnerURLImpl implements IESBProtocol {
	private String url;
	private String content_tp;
	private String timeout;
	private String charset;
	private String method;
	private String inout;
	private String serviceTp;

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
			byte[] b = xmlSource.getBytes(charset);
			InputStream is = new ByteArrayInputStream(b, 0, b.length);
			RequestEntity re = new InputStreamRequestEntity(is, b.length, "text/html;charset=" + charset);
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
					response.setResponseData(sb.toString());
					response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_RECEIVED);
				}
			} else {
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

	@Override
	public void initlizeService(IESBService request) throws Exception {
		this.setUrl(request.getAddress());
		this.setCharset(request.getCharacterset());
		this.setContent_tp(request.getServiceType());
		this.setMethod(request.getMethod());
		this.setTimeout(request.getTimeout());
		this.setInout(request.getInorout());
		this.serviceTp = request.getServiceType();
	}

	@Override
	public void destoryService(IESBService request) throws Exception {

	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getContent_tp() {
		return content_tp;
	}

	public void setContent_tp(String content_tp) {
		this.content_tp = content_tp;
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

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getInout() {
		return inout;
	}

	public void setInout(String inout) {
		this.inout = inout;
	}

	@Override
	public String getServiceTp() {
		return this.serviceTp;
	}

}
