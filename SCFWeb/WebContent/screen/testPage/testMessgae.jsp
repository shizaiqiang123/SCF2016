<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>短信发送页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/testJs/testMessage.js"></script>
</head>
<body class="UTSCF">
	<div id="messageSend" class="div_ul">
		<form id="messageForm">
			<div id="baseDiv" style="width: 100%" class="easyui-panel"
				title="短信发送" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>手机号码：</td>
						<td><input class="easyui-validatebox combo"
							name="phone_number" required="true"  data-options="validType:'maxLength[30]'"></input></td>
					</tr>
					<tr>
						<td>短信类容：</td>
						<td><textarea name="message_content" rows="3" cols="20"></textarea></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
</body>
</html>