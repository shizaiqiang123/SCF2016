<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>保理商客户页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/factorCust/factorCust.js"></script>
</head>
<body class="UTSCF">
	<div id="test" class="div_ul">
		<form id="testForm">
			<div id="baseDiv" style="width: 100%" class="easyui-panel"
				title="保理商客户信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>ID：</td>
						<td><input class="easyui-validatebox combo"
							name="test_id" required="true"  data-options="validType:'maxLength[30]'"></input></td>
					</tr>
					<tr>
						<td>测试姓名：</td>
						<td><input class="easyui-validatebox combo"
							name="test_name" required="true"  data-options="validType:'maxLength[30]'"></input></td>
					</tr>
					<tr>
						<td>性别：</td>
						<td><input class="easyui-validatebox combo"
							name="test_sex" required="true"  data-options="validType:'maxLength[30]'"></input></td>
					</tr>
					<tr>
						<td>手机号：</td>
						<td><input class="easyui-validatebox combo"
							name="test_phone" required="true"  data-options="validType:'maxLength[30]'"></input></td>
					</tr>
					<tr>
						<td>地址：</td>
						<td><input class="easyui-validatebox combo"
							name="test_address" required="true"  data-options="validType:'maxLength[30]'"></input></td>
					</tr>
					<tr>
						<td>年龄：</td>
						<td><input class="easyui-validatebox combo"
							name="test_age" required="true"  data-options="validType:'maxLength[30]'"></input></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
</body>
</html>