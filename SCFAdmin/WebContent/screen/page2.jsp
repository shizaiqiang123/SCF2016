<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../jsp/js_cs.jsp"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Page2</title>
     <script type="text/javascript" src="script/page2.js"></script>
</head>
<body>
	<div id="dd">I'm Page2,transaction data fill.</div>
	<form id='mainForm'>
		<table class="utTab">
			<tr>
				<td>sysRefNo：</td>
				<td><input type="text" name = "sysRefNo" value = "" id =  "sysRefNo"></td>
				<td>selId：</td>
				<td><input type="text" name="selId" value="" id= "selId"/></td>
			</tr>
			<tr>
				<td>buyerId：</td>
				<td><input type="text" name="buyerId" value="" id  = "buyerId"/></td>
			</tr>
		</table>
		
<!-- 		<div id="testDiv">
			<table id="testTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<div id="toolbar">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addRow()" plain="true">添加</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true">修改</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-remove" onclick="deleteRow()" plain="true">删除</a>
			</div>
		</div> -->
	</form>

	
</body>
</html>