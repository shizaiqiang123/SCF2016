<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="js/user/PermissionInfo.js"></script>
<title>权限管理</title>
</head>
<body>
	<form id="perForm">
		<div class="div_ul">
			<table>
				<tr>
					<td width="30%" align="right"><label>权限编号：</label> <input
						class="easyui-validatebox combo" name="perId" id="perId"
						required="true"></input></td>
					<td width="30%" align="right"><label>权限描述：</label> <input
						class="easyui-validatebox combo" name="perName" id="perName"
						data-options="validType:'maxLength[200]'" required="true"></input></td>
				</tr>
			</table>
			<table>
				<tr>
					<td>
						<ul id="perInfoDiv" class="easyui-tree"></ul> <input id="menuTree"
						name="menuTree" type="hidden" /> <input id="menuSysRefNo"
						name="menuSysRefNo" type="hidden" /> <input id="sysRefNo"
						name="sysRefNo" type="hidden" />
					</td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>