package com.ut.scf.mule.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Properties;

//import javax.mail.AuthenticationFailedException;
//import javax.mail.MessagingException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ftpserver.FtpServer;
//import com.sun.mail.smtp.SMTPSendFailedException;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.services.email.SendEmail;
import com.ut.scf.mule.IESBProtocol;

import net.sf.json.JSONObject;

public class ESBRunnerEmailImpl implements IESBProtocol {
	private static Log logger = LogFactory.getLog(ESBRunnerEmailImpl.class);
	private String inorout;
	private String ip;
	private int port;
	private int timeout;
	private String serviceTp;
	private String user;
	private String pwd;
	private String homeDir;
	private String charset;
	private String passsivePort;

	FtpServer service = null;

	@Override
	public void initlizeService(IESBService request) throws Exception {
		this.inorout = request.getInorout();
		this.ip = request.getAddress();
		this.port = Integer.parseInt(request.getPort());
		this.timeout = Integer.parseInt(request.getTimeout());
		this.serviceTp = request.getServiceType();
		this.user = request.getUser();
		this.pwd = request.getPwd();
		this.homeDir = request.getHomeDir();
		this.charset = request.getCharacterset();
		this.passsivePort = request.getPasssivePort();
		
	}

	@Override
	public void destoryService(IESBService request) throws Exception {
		
	}

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request)
			throws Exception {
		IESBServiceResponse response = new ServiceResponseImpl();
		JSONObject json = (JSONObject) request.getRequestData();
		JSONObject trxData = JsonHelper.getTrxObject(json);
//		//smtp服务器协议
//		String host = trxData.get("host").toString();
//		//smtp服务端口号
//		int port  =  Integer.parseInt(trxData.get("port").toString());
//		//发件人邮箱地址
//		String from_email_address = trxData.get("from_email_address").toString();
//		//发件人邮箱密码
//		String from_email_pwd = trxData.get("from_email_pwd").toString();
		//邮件主题
	    String subject = json.containsKey("subject")?json.get("subject").toString():"";
	    //邮件内容
	    String text = trxData.get("advContent").toString();
	    //收件人邮箱
	    String [] to_email_addresses =  json.get("to_email_addresses").toString().split(",");
		
	    
	    ServiceResponseImpl retObj = new ServiceResponseImpl();
	   
//	      try{
//	    	   SendEmail sendEmail = new SendEmail();
//	    	   sendEmail.sendEmail(ip, port, user, pwd, subject, text, to_email_addresses);
////	    	   response.setRetStatus("success");
////	    	   response.setRetInfo("发送成功");
//			}
//	    catch(Exception e){
//				response.setError("exception");
//				retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_EXCEPTION);
//				if(e instanceof AuthenticationFailedException){
//					response.setError("发送者邮箱名称或密码不正确,或者邮箱设置不支持,或者与输入的协议不匹配");
//		    	 }else if(e instanceof SMTPSendFailedException){
//		    		 response.setError("出现内存问题,请稍候再试");
//		    	 } else if(e instanceof MessagingException){
//		    		 response.setError("SMTP邮件服务器或端口号配置不正确");
//		    	 }else{
//		    		 response.setError(e.getMessage());
//		    	 }
//			}
//			retObj.setResponseData(logicObj);
//			retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS);
	      return response;
	}

	@Override
	public String getServiceTp() {
		return this.serviceTp;
	}
}
