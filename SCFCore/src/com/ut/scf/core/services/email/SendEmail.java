package com.ut.scf.core.services.email;

import java.util.Properties;

import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


/**
 * 
 * @author 胡春兴
 *
 */
public class SendEmail {
	/**
	 * @param host  smtp服务器协议
	 * @param port  smtp服务端口号
	 * @param from_email_address  发件人邮箱地址
	 * @param from_email_pwd      发件人邮箱密码
	 * @param subject   邮件主题
	 * @param text      邮件内容
	 * @param to_email_addresses 收件人地址
	 * 
	 * @throws AddressException
	 * @throws MessagingException
	 */
    public void sendEmail(String host,int port,String from_email_addr,String from_email_pwd,String subject,String text,String [] to_email_addresses) throws AddressException, MessagingException{
    	//参数配置
    	Properties properties = new Properties();
    	//发送邮件协议
    	properties.setProperty("mail.transport.protocol", "smtp");
    	//需要验证
    	properties.setProperty("mail.smtp.auth", "true");
    	
    	//创建session对象
    	Session session = Session.getInstance(properties);
    	
    	//邮件信息
    	Message message = new MimeMessage(session);
    	//发件人
    	message.setFrom(new InternetAddress(from_email_addr));
    	//设置邮件主题
    	message.setSubject(subject);
    	//设置邮件内容
    	message.setText(text);
    	
    	//发送邮件
    	Transport tran = session.getTransport();
    	//连接到新浪邮箱服务器
    	tran.connect(host, port, from_email_addr, from_email_pwd);
    	
    	//发送邮件
    	for (int i = 0; i < to_email_addresses.length; i++) {
    		tran.sendMessage(message, new Address[]{ new InternetAddress(to_email_addresses[i])});
		}
    	tran.close();
    }
}
