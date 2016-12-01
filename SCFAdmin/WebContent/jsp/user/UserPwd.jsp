<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>个人密码页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/UserPwd.js"></script>
<!-- <script type="text/javascript">
	/* $(function(){
	 $('#roleId').roleId({    
	 required:true,    
	 multiple:true,
	 disabled:true  
	 }); 
	 });  */
</script> -->
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="userPwdForm">
		<div id="userDiv" style="width: 100%" class="easyui-panel"
			title="我的个人信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">登陆ID：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="userId"
						id="userId" required="true" editable="false" />
							<input type="hidden" name="sysRefNo" id="sysRefNo"/>
							<input type="hidden" name="userTp" id="userTp"/>
							<input type="hidden" name="pwdTP" id="pwdTP"/>
				</div>
			</div>
		</div>
	</form>
</body>
</html>