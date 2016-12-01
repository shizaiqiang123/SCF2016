<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs_nologin.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>找回密码</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/NewPassword.js"></script>
<script type="text/javascript" src="js/scfjs/password.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="mainForm">
		<div id="userTitle" align="center" style="padding-top: 5px;">
			<h3>重置密码</h3>
		</div>
		<div id="userpass" style="width: 100%" class="easyui-panel"
			title="新密码" data-options="collapsible:true">
			<div class="item">
				<span class="label">新 密 码：</span>
				<div class="fl item-ifo">
					<input type="password" class="easyui-validatebox combo"
						name="newPwd" id="newPwd" required="true"
						data-options="validType:'maxLength[64]',width:'253px',height:'32px'" />
				</div>
			</div>
			<div class="item">
				<span class="label">再 次 输 入：</span>
				<div class="fl item-ifo">
					<input type="password" class="easyui-validatebox combo"
						name="enterPwd" id="enterPwd" required="true"
						data-options="validType:'maxLength[64]',width:'253px',height:'32px'" />
				</div>
			</div>
			<div class="item">
				<input type="hidden" name="pwdEditDt" id="pwdEditDt"/>
				<input type="hidden" name="sysRefNo" id="sysRefNo"/>
				<input type="hidden" name="sysEventTimes" id="sysEventTimes"/>
				<input type="hidden" name="password" id="password"/>
				<input type="hidden" name="busiUnit" id="busiUnit"/>
				<input type="hidden" name="userId" id="userId"/>
			</div>
		</div>
	</form>
	<div id="toolBar" align="right">
		<!-- <button id="Prev_btn" style="margin-left: 10px"
			onclick="prevBtnClick()" class="dsIB mR10 blockAreaBtn white btnRed">上一步</button> -->
		<span id="Prev_btn" onclick="prevBtnClick()" 
			class="dsIB mR10 blockAreaBtn white btnRed">上一步</span>
		<!-- <button id="submit_btn" style="margin-left: 10px"
			onclick="submitBtnClick()"
			class="dsIB mR10 blockAreaBtn white btnRed">提交</button> -->
		<span id="submit_btn" onclick="submitBtnClick()" 
			class="dsIB mR10 blockAreaBtn white btnRed">提交</span>
		<!-- <button id="cancel_btn" style="margin-left: 10px"
			onclick="cancelBtnClick()"
			class="dsIB mR10 blockAreaBtn white disabled">取消</button> -->
		<span id="cancelBtn" onclick="cancelBtnClick()"
			class="dsIB mR10 blockAreaBtn white disabled">取消</span>
	</div>
</body>
</html>