<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Function Add</title>
     <script type="text/javascript" src="js/para/Function_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
	<div id="mainDiv" style="width: 100%; height: 200px" class="easyui-panel" title="基本信息" data-options="collapsible:true">
		<table class="utTab">
			<tr>
				<td>Id：</td>
				<td><input class="easyui-validatebox combo"
					 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'"></input>
					<a href="javascript:void(0)" class="easyui-linkbutton" id="newId"
					 iconcls="icon-add" onclick="newId()" plain="true">取新编号</a>
				</td>
				<td>Name：</td>
				<td><input class="easyui-validatebox combo"
					 name = "name" id = "name" data-options="validType:'maxLength[35]'"></input>
				</td>
			</tr>
			<tr>
				<td>Description：</td>
				<td><input class="easyui-validatebox combo"
					 name = "desc" id = "desc" data-options="validType:'maxLength[35]'"></input>
				</td>
				<td>Function Type：</td>
				<td>
					<input class="easyui-combobox" id="functype" name="functype"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" />
				</td>
			</tr>
			<tr>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo"
					 name = "bu" id = "bu" data-options="validType:'maxLength[35]'"></input>
				</td>
				<td>Module：</td>
				<td><input class="easyui-validatebox combo" name="module" id  = "module"/></td>
			</tr>
			<tr>
				<td>Template：</td>
				<td><input class="easyui-validatebox combo" name="template" id  = "template"/></td>
				<td>Work Flow：</td>
				<td><input class="easyui-validatebox combo" name="workflow" id  = "workflow"/></td>
			</tr>
		</table>
		</div>
		<div id="pageDiv" style="width: 100%; height: 200px" class="easyui-panel" title="Page信息" data-options="collapsible:true">
			<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton" id="addPage"
					iconcls="icon-add" onclick="addPage()" plain="true" style="float:right;margin-right:14px;">添加Page</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" id="editPage"
					iconcls="icon-edit" onclick="editPage()" plain="true" style="float:right;">修改Page</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" id="delPage"
					iconcls="icon-remove" onclick="delPage()" plain="true" style="float:right;">删除Page</a>
			</div>
			<table class="easyui-datagrid" id="pageDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<div id="serviceDiv" style="width: 100%; height:200px" class="easyui-panel" title="Service信息" data-options="collapsible:true">
			<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton" id="addService"
					iconcls="icon-add" onclick="addService()" plain="true" style="float:right;margin-right:14px;">添加Service</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" id="editService"
					iconcls="icon-edit" onclick="editService()" plain="true" style="float:right;">修改Service</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" id="delService"
					iconcls="icon-remove" onclick="delService()" plain="true" style="float:right;">删除Service</a>
			</div>
			<table class="easyui-datagrid" id="serviceDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "fu" id =  "paraTp">
	</form>

	
</body>
</html>