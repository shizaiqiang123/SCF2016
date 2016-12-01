<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>客户评级申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/custRat/addCustRat.js"></script>
</head>
<body>
<div id="custRatDiv" style="width:100%" class="easyui-panel" title="客户评级申请信息" data-options="collapsible:true" >
<form id="custRatForm">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
    				<td><input type="text"  name="sysRefNo" id="sysRefNo"  /></td>
					<td>评级类别：</td>
					<td><input id="custRatTp" name="custRatTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							 required="true"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="ratDtlSysRefNo" id="ratDtlSysRefNo"></td>
				</tr>
			</table>
		</form>
</div>
	<div id="custratDetailMDiv" class="easyui-panel" title="应收账款列表"
			data-options="collapsible:true" style="width: 100%">
			<table id="custratDetailMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addRow()" plain="true"
					style="float: right; margin-right: 14px;">添加</a> 
					<a href="javascript:void(0)"
					class="easyui-linkbutton" iconcls="icon-remove"
					onclick="deleteRow()" plain="true" style="float: right">删除</a> 
			</div>
		</div>
</body>
</html>