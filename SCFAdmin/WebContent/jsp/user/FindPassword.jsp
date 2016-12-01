<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs_nologin.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>找回密码</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/FindPassword.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="mainForm">
		<div id="userTitle" align="center" style="padding-top: 5px;">
			<h3>找回密码</h3>
		</div>
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="验证信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">登陆ID：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
						name="userId" id="userId" required="true" onfocus="userIdFocus()" onblur="userIdBlur()"
						data-options="validType:'maxLength[35]',width:'253px',height:'32px'"/>
					</div>
				</div>
				<div class="item">
					<span class="label">验证方式：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="checktype"
						name="checktype" required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
					</div>
				</div>
<!-- 				<div class="item" id='infoDiv'> -->
<!-- 					<span class="label">&nbsp;</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input class="easyui-validatebox combo" id="info" -->
<!-- 						name="info" editable="false" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="item" id="inputtr"> -->
<!-- 					<span class="label">验证码：</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input type="text" class="easyui-validatebox combo easyui-mobPhonecode" -->
<!-- 							required="true" id="identifyingcode" name="identifyingcode" -->
<!-- 							data-options="validType:'maxLength[6]',mobPhoneId:'mobPhone',sysRefNo:'sysRefNo'" style="width:132px"/> -->
<!-- 						</div> -->
<!-- 				</div> -->
				<div class="item">
					<input type="hidden" name="mobPhone" id="mobPhone"/>
					<input type="hidden" name="email" id="email"/>
					<input type="hidden" name="sysRefNo" id="sysRefNo"/>
					<input type="hidden" name="sysEventTimes" id="sysEventTimes"/>
					<input type="hidden" name="busiUnit" id="busiUnit"/>
				</div>
		</div>
	</form>
	<div class="blockAreaFooter clearfix mB20" style="padding:0">
		<div class="fL blockAreaNotice red">
			<p class="blockAreaNoticeTitle fWb">温馨提示：</p>
			<p class="blockAreaNoticeTxt">
				请先输入用户ID，然后选择验证类型。<br>
				再点击获“取短信验证码按钮”。
			</p>
		</div>
		<div id="toolBar" align="right">
		<!-- <button id="next_btn" style="margin-left: 10px"
			onclick="nextBtnClick()" class="dsIB mR10 blockAreaBtn white btnRed">下一步</button> -->
		<span id="next_btn" onclick="nextBtnClick()" style="margin-left: 10px"
			class="dsIB mR10 blockAreaBtn white btnRed">下一步</span>
		<!-- <button id="cancel_btn" style="margin-left: 10px;margin-top:55px;"
			onclick="cancelBtnClick()"
			class="dsIB mR10 blockAreaBtn white disabled">取消</button> -->
		<span id="cancelBtn" onclick="cancelBtnClick()" style="margin-left: 10px;margin-top:40px;"
			class="dsIB mR10 blockAreaBtn white disabled">取消</span>
		</div>
	</div>
</body>
</html>