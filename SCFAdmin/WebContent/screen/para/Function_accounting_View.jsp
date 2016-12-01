<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Function Add Page</title>
<script type="text/javascript" src="script\para\Function_accounting_View.js"></script>
</head>
<body>
	<div>
	
		<div id="searchDiv" class="easyui-panel" title="账务信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id='mainForm'>
				<table class="utTab">
					<tr>
						<td>是否启用：</td>
						<td>
						<input class="easyui-combobox" id="isenable" name="isenable"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
						</td>
						<td>id：</td>
						<td><input type="text" name="id" value="" id="id" /></td>
					</tr>
					<tr>
						<td>maincomp：</td>
						<td><input type="text" name="maincomp" value="" id="maincomp" /></td>
						<td>accountingjs：</td>
						<td><input type="text" name="accountingjs" value="" id="accountingjs" /></td>
					</tr>
				</table>
			</form>
		</div>
		
	</div>


</body>
</html>