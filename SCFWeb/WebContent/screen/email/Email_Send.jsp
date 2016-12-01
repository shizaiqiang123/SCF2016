<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>邮件发送</title>
<script type="text/javascript" src="script/email/Email_Send.js"></script>
</head>
<body>
    <form id="mailSendForm">
		<!-- 	<div id="mainDiv" style="width: 100%; height: 200px"
				class="easyui-panel" title="邮件发送"> -->
				<table class="utTab">
				    <tr><font color="red">建议使用163邮箱主发，相对比较稳定。邮件主题不能以数字开头，也最好不要包含特殊字符，可能会被邮箱拒绝接收!!</font></tr>
				    <tr>
						<td>SMTP服务器协议: (例smtp.163.com)</td>
						<td><input name="host" type="text" class="easyui-validatebox combo"  required="true"/></td>
					</tr>
					<tr>
						<td>SMTP服务端口号:</td>
						<td><input name="port" type="text" class="easyui-validatebox combo" data-options="validType:['number','maxLength[3]']"     required="true"/></td>
					</tr>
					<tr>
						<td>发送人邮箱账号:</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="from_email_address"
							data-options="validType:'email'"  required="true" /></td>
					</tr>
					<tr>
						<td>发送人邮箱密码:</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="from_email_pwd"
							data-options="validType:'noHaveChinese'"  required="true" /></td>
					</tr>
					<tr>
						<td>邮件主题:</td>
						<td><input name="subject" type="text" class="easyui-validatebox combo" data-options="validType:'noStartNum'" required="true"/></td>
					</tr>
					<tr>
						<td>邮件内容:</td>
						<td><textarea class="easyui-validatebox"
							name="text"  class="easyui-validatebox combo"  required="true"></textarea>
					</tr>
					<tr>
						<td>接收人邮箱:</td>
						<td><input type="text" class="easyui-validatebox combo"
							name="to_email_addresses"
							data-options="validType:'email'"  required="true" /></td>
					</tr>
				</table>
			<!-- </div> -->
		</form>
</body>
</html>