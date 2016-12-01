<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改个人密码页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/UpdateUserPwd.js"></script>
<script type="text/javascript" src="js/scfjs/password.js"></script>
<!-- <script type="text/javascript" src="js/user/pwdStrength.js"></script> -->


</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<div id="userAdd">
		<form id="userAddForm">
			<div id="userDiv" style="width: 100%" class="easyui-panel"
				title="修改个人密码" data-options="collapsible:true">
				<div class="item">
					<span class="label">原 密 码：</span>
					<div class="fl item-ifo">
						<input type="password" class="easyui-validatebox combo"
							name="oldPwd" id="oldPwd" required="true"
							data-options="validType:'maxLength[64]'" tooltip='false'
							onmousedown="showPwd()" onmouseout="hidePwd()" />
					</div>
				</div>
				<!-- 				<div class="item" id='inputtr1'> -->
				<!-- 					<span class="label">验证码：</span> -->
				<!-- 					<div class="fl item-ifo"> -->
				<!-- 						<input type="text" class="easyui-validatebox combo easyui-mobPhonecode" -->
				<!-- 							required="true" id="identifyingcode" name="identifyingcode" -->
				<!-- 							data-options="validType:'maxLength[6]',mobPhoneId:'mobPhone',sysRefNo:'sysRefNo'" style="width:132px"/> -->
				<!-- 					</div> -->
				<!-- 				</div> -->
				<div class="item">
					<span class="label">新 密 码：</span>
					<div class="fl item-ifo">
						<input type="password" class="easyui-validatebox combo"
							name="newPwd" id="newPwd" required="true"
							placeholder="密码必须由6~8位数字、大写和小写字母组成"
							data-options="validType:'maxLength[64]'" tooltip='false'
							onKeyUp="AuthPasswd(this.value)"
							onBlur="AuthPasswd(this.value);checkPassword(this.value);"
							onmousedown="showNPwd()" onmouseout="hideNPwd()" />
					</div>
				</div>
				<div class="item">
					<span class="label">密 码 强 度：</span>
					<div class="fl item-ifo">
						<table width="100%" border="1" cellspacing="0" cellpadding="2"
							bordercolor="#eeeeee" height="24" style='display: inline'>
							<tr align="center" bgcolor="#f5f5f5">
								<td width="78px" id="weak">弱</td>
								<td width="78px" id="middle">中</td>
								<td width="78px" id="strength">强</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="item">
					<span class="label">再 次 输 入：</span>
					<div class="fl item-ifo">
						<input type="password" class="easyui-validatebox combo"
							name="enterPwd" id="enterPwd" required="true"
							data-options="validType:'maxLength[64]'" tooltip='false' />
					</div>
				</div>
				<div class="item">
					<input type="hidden" name="sysRefNo" id="sysRefNo"
						value="${sysUserInfo.userRefNo}" /> <input type="hidden"
						name="sysEventTimes" id="sysEventTimes" /> <input type="hidden"
						name="password" id="password" /> <input type="hidden"
						name="busiUnit" id="busiUnit" value="${sysUserInfo.sysBusiUnit}" />
					<input type="hidden" name="mobPhone" id="mobPhone" />
				</div>
			</div>
		</form>
	</div>
</body>
</html>