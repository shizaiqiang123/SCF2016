<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>登陆提醒修改密码</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/loginUpdatePwd.js"></script>
<script type="text/javascript" src="js/scfjs/password.js"></script>
</head>
<body class="UTSCF">
	<form id="updatePwdForm">
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="重置密码信息" data-options="collapsible:true">
<!-- 				<div class="item"> -->
<!-- 					<span class="label">验证方式：</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input class="easyui-combobox" id="checktype" -->
<!-- 						name="checktype" required="true" -->
<!-- 						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'" -->
<!-- 						editable="false" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="item" id='infoDiv'> -->
<!-- 					<span class="label">&nbsp;</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input class="easyui-validatebox combo" id="info" -->
<!-- 						name="info" editable="false" /> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 				<div class="item" id='inputtr1'> -->
<!-- 					<span class="label">验证码：</span> -->
<!-- 					<div class="fl item-ifo"> -->
<!-- 						<input type="text" class="easyui-validatebox combo easyui-mobPhonecode" -->
<!-- 							required="true" id="identifyingcode" name="identifyingcode" -->
<!-- 							data-options="validType:'maxLength[6]',mobPhoneId:'mobPhone',sysRefNo:'sysRefNo'" style="width:132px"/> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<div class="item" id='inputtr2'>
					<span class="label">原 密 码：</span>
					<div class="fl item-ifo">
						<input type="password" class="easyui-validatebox combo"
						name="oldPwd" id="oldPwd" required="true" tooltip="false"
						data-options="validType:['noChinese','maxLength[64]']"/>
					</div>
				</div>
				<div class="item" id='inputtr3'>
					<span class="label">新 密 码：</span>
					<div class="fl item-ifo">
						<input type="password" class="easyui-validatebox combo"
						name="newPwd" id="newPwd" required="true" tooltip="false"
						data-options="validType:['noChinese','maxLength[64]']"/>
					</div>
				</div>
				<div class="item" id='inputtr4'>
					<span class="label">再 次 输 入：</span>
					<div class="fl item-ifo">
						<input type="password" class="easyui-validatebox combo"
						name="enterPwd" id="enterPwd" required="true" tooltip="false"
						data-options="validType:['noChinese','maxLength[64]']"/>
					</div>
				</div>
				<div class="item">
					<input type="hidden" name="sysRefNo" id="sysRefNo"
						value="${sysUserInfo.userRefNo}"/>
					<input type="hidden" name="sysEventTimes"
						id="sysEventTimes"/>
					<input type="hidden" name="busiUnit" id="busiUnit"
						value="${sysUserInfo.sysBusiUnit}"/>
					<input type="hidden" name="mobPhone" id="mobPhone"/>
					<input type="hidden" name="email" id="email"/>
				</div>
		</div>
	</form>
</body>
</html>