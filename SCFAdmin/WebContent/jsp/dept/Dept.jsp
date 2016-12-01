<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>部门信息页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/dept/Dept.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
<div id="dept" class="div_ul">
	<form id="deptForm">
	<div id="deptDiv" style="width: 100%" class="easyui-panel" title="部门信息" data-options="collapsible:true">
		<div class="item">
			<span class="label">部门编号：</span>
			<div class="fl item-ifo"><input type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo"  required="true" data-options="validType:'maxLength[35]'"></input></div>
		</div>
		<div class="item">	
			<span class="label">部门名称：</span>
			<div class="fl item-ifo"><input type="text"  name="deptDesc" id="deptDesc" class="easyui-validatebox combo"  required="true" data-options="validType:'maxLength[35]'"></input></div>
		</div>
	</div>
	</form>
</div>
</body>
</html>