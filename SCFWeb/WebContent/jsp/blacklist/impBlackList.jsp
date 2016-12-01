<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>黑名单导入页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/blacklist/impBlackList.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="blackListForm">
		<div id="blacklistMDiv" class="easyui-panel" title="黑名单信息" data-options="collapsible:true" style="width:100%">
			<table id="blacklistMTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow:hidden;">
				<!-- <a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-add" onclick="addRow()" plain="true">添加</a> 
				
				<a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-edit" onclick="editRow()" plain="true">修改</a> --> 
				
				<a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-remove" onclick="deleteRow()" plain="true" style="float:right;margin-right:14px;">删除</a> 
				
				<a href="javascript:void(0)" class="easyui-linkbutton"
				iconcls="icon-batch-upload" onclick="upload()" plain="true" style="float:right;">导入</a>
			</div>
		</div>
	</form>
</body>
</html>