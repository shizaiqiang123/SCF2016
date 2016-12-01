<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>供应商信息查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="script/cust/lookUpSupplierMsg.js" type="text/javascript"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="mainForm">
		<div>
			<input type="hidden" name="userOwnerid" id="userOwnerid"
				value="${sysUserInfo.userOwnerId }">
		</div>
		<div id="supplierDiv" class="easyui-panel" title="供应商信息"
			data-options="collapsible:true" style="width: 100%">
			<table class="easyui-datagrid" id="dg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
	</form>
</body>
</html>