<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户登录历史页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/User_Log.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<div id="userLog" >
		<form id="userLogForm">
			<div id="userDiv" style="width: 100%" class="easyui-panel"
				title="用户登录历史" data-options="collapsible:true">
				<div class="item">
					<span class="label">用户ID：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="userId" id="userId" required="true"
							data-options="validType:'maxLength[35]'"/>
					</div>
				</div>
				<div class="item">
					<span class="label">用户名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="userName" id="userName"
							data-options="validType:'maxLength[40]'"/>
					</div>
				</div>
				<div class="item">
					<span class="label">IP地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="userIp" id="userIp"
							data-options="validType:'maxLength[15]'"/>
					</div>
				</div>
				<div class="item">
					<span class="label">登录时间：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" name="userLoginTime" id="userLoginTime"
							editable="false"/>
					</div>
				</div>
				<div class="item">
					<span class="label">退出时间：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="userLogoutTime" id="userLogoutTime"
							editable="false"/>
					</div>
				</div>
				<div class="item">
					<span class="label">状 态：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox"
							name="logType" id="logType"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto',width:'253px',height:'32px'" editable="false" />
					</div>
				</div>
				<div class="item">
					<span class="label">用户类型：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-combobox"
							name="userTp" id="userTp" 
							data-options="valueField:'id',textField:'text',panelHeight: 'auto',width:'253px',height:'32px'" editable="false" />
					</div>
				</div>
				<div>
					<input type="hidden" name="sysRefNo" id="sysRefNo"></input>
					<input type="hidden" name="sysEventTimes" id="sysEventTimes"></input>
				</div>
			</div>
		</form>
	</div>
</body>
</html>