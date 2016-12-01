<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>筛选页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/SYS_Cust_Catalog.js"></script>
</head>
<body class="UTSCF">
	<div class="divGrid">
		<form id="ScreenMenuForm">
			<div class="easyui-panel" title="查询客户条件"
				data-options="collapsible:true" style="width: 100%">
				<table id="screenDiv" class="table_screen"></table>
				<table width=100%>
					<tr>
						<td width="65%"></td>
						<td align="left"><a class="easyui-linkbutton"
							icon="icon-search" style="width: 100px"
							onclick="onSearchBtnClick();"><label class="words">查询</label></a>
						</td>
					</tr>
				</table>
			</div>
			<p></p>
			<div class="easyui-panel" title="查询客户结果"
				data-options="collapsible:true" style="width: 100%">
				<table id="ScreenMenuTable" cellspacing="0" cellpadding="0"
					width="100%">
				</table>
			</div>
			<p></p>
			<div class="easyui-panel" title="协议信息"
				data-options="collapsible:true" style="width: 100%">
				<table id="ConTable" cellspacing="0" cellpadding="0" width="100%">
					<tr align="center">
						<td><label class="words">选择协议</label></td>
						<td><input class="easyui-combobox" id="consId" name="consId"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" required="true"></td>
					</tr>
					<tr align="center">
						<td><label class="words">选择功能</label></td>
						<td><input class="easyui-combobox" id="functionId"
							name="functionId"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" required="true"></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
</body>
</html>