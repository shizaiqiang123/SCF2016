package com.ut.scf.core.services.email;

import javax.mail.AuthenticationFailedException;
import javax.mail.MessagingException;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.sun.mail.smtp.SMTPSendFailedException;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.services.AbsESBServiceImpl;
/**
 * 
 * @author 胡春兴
 *
 */
@Service("emailServiceImpl")
public class EmailServiceImpl extends AbsESBServiceImpl {
   
	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		JSONObject jo = logicObj.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(jo);
		//smtp服务器协议
		String host = trxData.get("host").toString();
		//smtp服务端口号
		int port  =  Integer.parseInt(trxData.get("port").toString());
		//发件人邮箱地址
		String from_email_address = trxData.get("from_email_address").toString();
		//发件人邮箱密码
		String from_email_pwd = trxData.get("from_email_pwd").toString();
		//邮件主题
	    String subject = trxData.get("subject").toString();
	    //邮件内容
	    String text = trxData.get("text").toString();
	    //收件人邮箱
	    String [] to_email_addresses =  trxData.get("to_email_addresses").toString().split(",");
		
	    
	    ServiceResponseImpl retObj = new ServiceResponseImpl();
	   
	      try{
	    	   SendEmail sendEmail = new SendEmail();
	    	   sendEmail.sendEmail(host, port, from_email_address, from_email_pwd, subject, text, to_email_addresses);
	    	   logicObj.setRetStatus("success");
	    	   logicObj.setRetInfo("发送成功");
			}catch(Exception e){
				logicObj.setRetStatus("exception");
				retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_EXCEPTION);
				if(e instanceof AuthenticationFailedException){
					logicObj.setRetInfo("发送者邮箱名称或密码不正确,或者邮箱设置不支持,或者与输入的协议不匹配");
		    	 }else if(e instanceof SMTPSendFailedException){
		    		 logicObj.setRetInfo("出现内存问题,请稍候再试");
		    	 } else if(e instanceof MessagingException){
		    		 logicObj.setRetInfo("SMTP邮件服务器或端口号配置不正确");
		    	 }else{
		    		 logicObj.setRetInfo(e.getMessage());
		    	 }
			}
			retObj.setResponseData(logicObj);
			retObj.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS);
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		// TODO Auto-generated method stub

	}

	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:" + getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:" + getServiceId());
		super.getLogger().debug("destroy service success.");
	}
	
	@Override
	public String getServiceId() {
		return "Email";
	}

}
