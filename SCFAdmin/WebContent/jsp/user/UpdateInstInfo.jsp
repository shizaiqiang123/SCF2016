<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>机构管理-修改机构</title>
<script type="text/javascript" src="js/user/UpdateInstInfo.js"></script>
</head>
<body>
	<form id="InstForm">
		<div id="userFormDiv" style="width: 100%" class="easyui-panel"
			title="机构信息" data-options="collapsible:true">
			<table align="center" border=0 width=85% height=20%>
				<tr>
					<td><label>机构ID：</label></td>
					<td><input class="easyui-validatebox combo" name="sysRefNo"
						id="sysRefNo" required="true" /></td>
					<td><label>所属保理商ID：</label></td>
					<td><input class="easyui-validatebox combo" name="sysBusiUnit"
						id="sysBusiUnit" value="${sysUserInfo.sysBusiUnit}"
						required="true" /></td>
				</tr>
				<tr>
					<td><label>上层机构：</label></td>
					<td><input type="text" class="easyui-combotree combo"
						name="blgOrgNm" id="blgOrgNm" required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" style="width: 53%" /></td>
					<td><label>机构名称：</label></td>
					<td><input class="easyui-validatebox combo" name="orgNm"
						id="orgNm" required="true"
						data-options="validType:'maxLength[200]'" /></td>
				</tr>
				<tr>
					<td><input type="hidden" id="sysEventTimes"
						name="sysEventTimes" /> <input type="hidden" id="blgOrgid"
						name="blgOrgid" /></td>
					<td><input type="hidden" id="busiUnit" name="busiUnit"
						value="${sysUserInfo.sysBusiUnit}" /></td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>