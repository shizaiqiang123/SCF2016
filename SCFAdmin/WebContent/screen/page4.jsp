<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../jsp/js_cs.jsp"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Page4</title>
     <script type="text/javascript" src="script/page4.js"></script>
</head>
<body>
	<div id="dd">I'm Page4,transaction data fill.</div>
	<!-- <form id='mainForm'>
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
				<td>ttlLoanAmt：</td>
				<td><input type="text" name="ttlLoanAmt" value="" id= "ttlLoanAmt"/></td>
			</tr>
		</table>
	</form> -->

	<form id="mainForm">
		<div id="testDiv">
			<table id="testTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<input type="hidden" name="selId" value="" id  = "selId"/>
			<div id="toolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addRow()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true" style="float:right;">修改</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-remove" onclick="deleteRow()" plain="true" style="float:right;">删除</a>
			</div>
		</div>
	</form>

</body>
</html>