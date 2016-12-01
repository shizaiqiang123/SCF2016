<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Function Add</title>
<script type="text/javascript" src="js/para/Page_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="mainDiv" style="width: 100%" class="easyui-panel"
			title="基本信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>Id：</td>
					<td><input class="easyui-validatebox combo" name="id" id="id"
						required="true" data-options="validType:'maxLength[35]'" /> <a
						href="javascript:void(0)" class="easyui-linkbutton" id="newId"
						iconcls="icon-add" onclick="newId()" plain="true">取新编号</a></td>
					<td>Name：</td>
					<td><input class="easyui-validatebox combo" name="name"
						value="" id="name" data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>Description：</td>
					<td><input class="easyui-validatebox combo" name="desc"
						value="" id="desc" data-options="validType:'maxLength[35]'" /></td>
					<td>Business Unit：</td>
					<td><input class="easyui-validatebox combo" name="bu" value=""
						id="bu" data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>Page Type：</td>
					<td><input class="easyui-combobox" id="pagetype"
						name="pagetype"
						data-options="valueField: 'id',textField: 'text',panelHeight: '180px'"
						editable="false" /></td>
					<td>Query Id：</td>
					<td><input class="easyui-validatebox combo" name="queryid"
						value="" id="queryid" /></td>
				</tr>
				<tr>
					<td>Logic Id：</td>
					<td><input class="easyui-validatebox combo" name="logicid"
						value="" id="logicid" /></td>
					<td>Doname：</td>
					<td><input class="easyui-validatebox combo" name="doname"
						value="" id="doname" /></td>
				</tr>

				<tr>
					<td>Cascade Event：</td>
					<td><input class="easyui-combobox" id="cascadeevent"
						name="cascadeevent"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" /></td>
					<td>Lock Check：</td>
					<td><input class="easyui-combobox" id="lockcheck"
						name="lockcheck"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>Holdmaster：</td>
					<td><input class="easyui-combobox" id="holdmaster"
						name="holdmaster"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" /></td>
					<td>Is Transaction：</td>
					<td><input class="easyui-combobox" id="istransaction"
						name="istransaction"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>Main Comp：</td>
					<td><input class="easyui-combobox" id="maincomp"
						name="maincomp"
						data-options="valueField: 'id',textField: 'text',panelHeight: '100px'"
						editable="false" /></td>
					<td>Main Table：</td>
					<td><input class="easyui-validatebox combo" name="maintable"
						value="" id="maintable" /></td>
				</tr>
				<tr>
					<td>Gapi：</td>
					<td><input class="easyui-validatebox combo" name="gapi"
						value="" id="gapi" /></td>
					<td>Catalog：</td>
					<td><input class="easyui-validatebox combo" name="catalog"
						value="" id="catalog" /></td>
				</tr>
				<tr>
					<td>JSP File：</td>
					<td><input class="easyui-validatebox combo" name="jspfile"
						value="" id="jspfile" /></td>
					<td>Page JS：</td>
					<td><input class="easyui-validatebox combo" name="pagejs"
						value="" id="pagejs" /></td>
				</tr>
				<tr>
					<td>JS File：</td>
					<td><input class="easyui-validatebox combo" name="jsfile"
						value="" id="jsfile" /></td>
					<td>Accounting JS：</td>
					<td><input class="easyui-validatebox combo"
						name="accountingjs" value="" id="accountingjs" /></td>
				</tr>
			</table>
		</div>
		<input type="hidden" name="sysRefNo" value="" id="sysRefNo"> <input
			type="hidden" name="paraTp" value="pa" id="paraTp">
	</form>


</body>
</html>