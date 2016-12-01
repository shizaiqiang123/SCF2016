<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>机构管理-查询机构</title>
<script type="text/javascript" src="js/user/SelectInstInfo.js"></script>
</head>
<body>
	<form id="InstForm">
		<div id="userFormDiv" style="width: 100%" class="easyui-panel"
			title="机构信息" data-options="collapsible:true">
			<table align="center" border=0 width=85% height=20%>
				<tr>
					<td><label>机构信息：</label></td>
				</tr>
				<tr>
					<td><ul class="easyui-tree" id="blgOrgNm" required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" style="width: 53%"></ul></td>
				</tr>
				<tr>
					<td><input type="hidden" id="sysRefNo" name="sysRefNo"
						value="${sysUserInfo.userRefNo}" /></td>
					<td><input type="hidden" id="sysBusiUnit" name="sysRefNo"
						value="${sysUserInfo.sysBusiUnit}" /></td>
					<td><input type="hidden" id="sysEventTime" name="sysEventTime" /></td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>