<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Logic Add</title>
<script type="text/javascript" src="js/para/Logicflow_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="mainDiv" style="width: 100%; height: 200px"
			class="easyui-panel" title="基本信息" data-options="collapsible:true">
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
					<td>Module：</td>
					<td><input class="easyui-validatebox combo" name="module"
						value="" id="module" /></td>
				</tr>
				<tr>
					<td>Business Unit：</td>
					<td><input class="easyui-validatebox combo" name="bu" value=""
						id="bu" data-options="validType:'maxLength[35]'" /></td>
				</tr>
			</table>
		</div>

		<div id="logicNodeDiv" style="width: 100%; height: 200px"
			class="easyui-panel" title="LogicNode信息"
			data-options="collapsible:true">
			<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="addLogicNode" iconcls="icon-add" onclick="addLogicNode()"
					plain="true" style="float:right;margin-right:14px;">添加LogicNode</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="editLogicNode" iconcls="icon-edit"
					onclick="editLogicNode()" plain="true" style="float:right;">修改LogicNode</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					id="delLogicNode" iconcls="icon-remove" onclick="delLogicNode()"
					plain="true" style="float:right;">删除LogicNode</a>
			</div>
			<table class="easyui-datagrid" id="logicNodeDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>

		<div id="transforNodeDiv" style="width: 100%; height: 200px"
			class="easyui-panel" title="TransforNode信息"
			data-options="collapsible:true">
			<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="addTransforNode" iconcls="icon-add" onclick="addTransforNode()"
					plain="true" style="float:right;margin-right:14px;">添加TransforNode</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="editTransforNode" iconcls="icon-edit"
					onclick="editTransforNode()" plain="true" style="float:right;">修改TransforNode</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					id="delTransforNode" iconcls="icon-remove" onclick="delTransforNode()"
					plain="true" style="float:right;">删除TransforNode</a>
			</div>
			<table class="easyui-datagrid" id="transforNodeDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<input type="hidden" name="sysRefNo" value="" id="sysRefNo"> <input
			type="hidden" name="paraTp" value="lf" id="paraTp">
	</form>


</body>
</html>