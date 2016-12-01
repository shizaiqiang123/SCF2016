<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Batch Add</title>
     <script type="text/javascript" src="js/para/Batch_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
	<div id="mainDiv" style="width: 100%" class="easyui-panel" title="基本信息" data-options="collapsible:true">
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
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo"
					 name = "bu" id = "bu" data-options="validType:'maxLength[35]'"></input>
				</td>
			</tr>
			<tr>
				<td>Type：</td>
				<td>
				<input class="easyui-combobox" id="type" name="type" required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" />
				</td>
			</tr>
			<!-- <tr>
				<td>beforetasks：</td>
				<td><input type="text" name="beforetasks" value="" id  = "beforetasks"/></td>
				<td>aftertasks：</td>
				<td><input type="text" name="aftertasks" value="" id  = "aftertasks"/></td>
			</tr> -->
		</table>
	</div>
	<div id="scheduleDiv" style="width: 100%; height: 200px" class="easyui-panel" title="Schedule信息" data-options="collapsible:true">
		<div id="pageToolbar" style="overflow:hidden;">
			<a href="javascript:void(0)" class="easyui-linkbutton" id="addSchedule"
				iconcls="icon-add" onclick="addSchedule()" plain="true" style="float:right;margin-right:14px;">添加Schedule</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" id="editSchedule"
				iconcls="icon-edit" onclick="editSchedule()" plain="true" style="float:right;">修改Schedule</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" id="delSchedule"
				iconcls="icon-remove" onclick="delSchedule()" plain="true" style="float:right;">删除Schedule</a>
		</div>
		<table class="easyui-datagrid" id="scheduleDg" cellspacing="0"
			cellpadding="0" style="width: 100%; height: auto"
			iconCls="icon-edit">
		</table>
	</div>
	<div id="taskDiv" style="width: 100%; height: 200px" class="easyui-panel" title="Task信息" data-options="collapsible:true">
		<div id="pageToolbar" style="overflow:hidden;">
			<a href="javascript:void(0)" class="easyui-linkbutton" id="addTask"
				iconcls="icon-add" onclick="addTask()" plain="true" style="float:right;margin-right:14px;">添加Task</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" id="editTask"
				iconcls="icon-edit" onclick="editTask()" plain="true" style="float:right;">修改Task</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" id="delTask"
				iconcls="icon-remove" onclick="delTask()" plain="true" style="float:right;">删除Task</a>
		</div>
		<table class="easyui-datagrid" id="taskDg" cellspacing="0"
			cellpadding="0" style="width: 100%; height: auto"
			iconCls="icon-edit">
		</table>
	</div>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "ba" id =  "paraTp">
	</form>
</body>
</html>