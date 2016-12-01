<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>个人常用信息删除页面</title>
<script type="text/javascript" src="js/comFun/User_DeleteComFun.js"></script>
</head>
<body>
	<div>
		<div id="searchDiv" class="easyui-panel" title="Page信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id='mainForm'>
				<table class="utTab">
					<tr> 
						<td>常用功能编号：</td>
						<td><input type="text" name="funId" id="funId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/></td>
						<td>常用功能名称：</td>
						<td><input type="text" name="funNm"  id="funNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/></td>
					</tr>
					<tr>
					<td>用户编号：</td>
						<td><input type="text" name="userId" id="userId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'" value="${sysUserInfo.userId }"/></td>
						
						<td>常用功能路径：</td>
						<td><input type="text" name="funPath" id="funPath" /></td>
					</tr>
					<tr><td><input type="hidden" name="userNm"  id="userNm" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'" /></td>
						</tr>
				</table>
			</form>
		</div>
	</div>


</body>
</html>