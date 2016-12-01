<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>机构管理-删除机构</title>
<script type="text/javascript" src="js/user/DeleteInstInfo.js"></script>
</head>
<body>
	<div id="Inst" class="div_ul">
		<form id="InstForm">
			<div id="userFormDiv" style="width: 100%" class="easyui-panel"
				title="机构信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td><label>机构ID：</label></td>
						<td><input class="easyui-validatebox combo" name="sysRefNo"
							id="sysRefNo" required="true" /></td>
						<td><label>所属保理商ID：</label></td>
						<td><input class="easyui-validatebox combo"
							name="sysBusiUnit" id="sysBusiUnit"
							value="${sysUserInfo.sysBusiUnit}" /></td>
					</tr>
					<tr>
						<td><label>上层机构：</label></td>
						<td><input type="text" class="easyui-combotree combo"
							name="blgOrgNm" id="blgOrgNm" required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
						<td><label>机构名称：</label></td>
						<td><input class="easyui-validatebox combo" name="orgNm"
							id="orgNm" required="true"
							data-options="validType:'maxLength[200]'" /></td>
					</tr>
					<tr>
						<td><input type="hidden" id="sysEventTimes"
							name="sysEventTimes" data-options="validType:'maxLength[6]'" />
							<input type="hidden" id="blgOrgid" name="blgOrgid" /></td>
						<td><input type="hidden" id="busiUnit" name="busiUnit"
							value="${sysUserInfo.sysBusiUnit}" /></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
</body>
</html>