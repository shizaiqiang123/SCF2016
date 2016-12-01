<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>质物置换-质物入库</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/collatRef/collatIn.js"></script>
</head>
<body>
	<form id="collatInForm">
		<div id="collatInDiv" style="width: 98%" class="easyui-panel"
			title="质物信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>质物置换流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/></td>
				</tr>
				<tr>
					<td>换出货物总价值：</td>
					<td><input editable="false" name="ttlOutVal" id="ttlOutVal"
						class="easyui-numberbox"  
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>换入货物总价值：</td>
					<td><input editable="false" name="ttlInVal" id="ttlInVal"
						class="easyui-numberbox"  
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<tr>
					<td>库存价值：</td>
					<td><input type="text" name="ttlRegAmt" id="ttlRegAmt" 
						class="easyui-numberspinner" data-options="min:0,precision:2"></input></td>
					<td>已放款敞口：</td>
					<td><input editable="false" name="openLoanAmt"
						id="openLoanAmt" class="easyui-numberbox" required="true"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo" /></td>
				</tr>
			</table>
		</div>
		<div class="easyui-panel" title="质物入库信息" data-options="collapsible:true"
			style="width: 100%">
			<div id="CollateralDiv">
				<table id="collatIn" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
				<div id="toolbar" style="overflow:hidden;">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addRow()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editRow()" plain="true" style="float:right;">修改</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-remove" onclick="deleteRow()" plain="true" style="float:right;">删除</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-impt" onclick="upload()" plain="true" style="float:right;">导入</a>
				</div>
			</div>
		</div>
	</form>
</body>
</html>