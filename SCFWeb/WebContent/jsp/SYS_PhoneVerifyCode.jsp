<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>手机验证码页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/SYS_PhoneVerifyCode.js"></script>
<style type="text/css">
</style>
</head>
<body class="UTSCF" style="width: 1000px; margin: 0 auto">
	<form id="phoneForm">
		<div id="userTitle" align="center" style="padding-top: 5px;">
			<h3>手机验证码验证</h3>
		</div>
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="手机验证码验证" data-options="collapsible:true">
			<table align="center">
			<div align="center" style="padding-top: 5px;">
			<h3>为了交易安全性，请输入手机验证码：</h3>
			</div>
				<tr>
				<td>手机号码 ：&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" class="easyui-validatebox" value="15655522357" id="telPhone" name="telPhone"></input></td>
				</tr>
				<tr>
					<td>手机验证码 ：<input type="text" class="easyui-validatebox" id="inputCode" name="inputCode"></input></td>
					<td><input type="button" id="send_btn"
						style="margin-left: 10px; font-size: 4px; line-height: 20px; height: 20px"
						onclick="sendBtn()"
						class="dsIB mR10 blockAreaBtn white btnRed" value="点击发送验证码"/></td>
				</tr>
			</table>
		</div>
	</form>
<!-- 	<div id="toolBar" align="right"> -->
<!-- 		<span id="submit_btn" style="margin-left: 10px" -->
<!-- 			onclick="onNextBtnClick()" -->
<!-- 			class="dsIB mR10 blockAreaBtn white btnRed">提交</span> <span -->
<!-- 			id="cancel_btn" style="margin-left: 10px" -->
<!-- 			onclick="onCancelBtnClick()" -->
<!-- 			class="dsIB mR10 blockAreaBtn white disabled">取消</span> -->
<!-- 	</div> -->
</body>
</html>