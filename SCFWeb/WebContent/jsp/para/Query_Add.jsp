<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Query Add</title>
     <script type="text/javascript" src="js/para/Query_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
	<div id="mainDiv" style="width: 100%; height: 100px" class="easyui-panel" title="基本信息" data-options="collapsible:true">
		<table class="utTab">
			<tr>
				<td>Id：</td>
				<td><input class="easyui-validatebox combo"
 					 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'"/>
				<a href="javascript:void(0)" class="easyui-linkbutton" id="newId"
					iconcls="icon-add" onclick="newId()" plain="true">取新编号</a>
				</td>
				<td>Name：</td>
				<td><input class="easyui-validatebox combo"
					 name="name" value="" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Description：</td>
				<td><input class="easyui-validatebox combo"
					 name = "desc" value = "" id = "desc" data-options="validType:'maxLength[35]'"></td>
			</tr>				
		</table>
		</div>
		<div id="querynodeDiv" style="width: 100%; height: 200px" class="easyui-panel" title="Qnode信息" data-options="collapsible:true">
			<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton" id="addQnode"
					iconcls="icon-add" onclick="addQueryNode()" plain="true" style="float:right;margin-right:14px;">添加QueryNode</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" id="editQnode"
					iconcls="icon-edit" onclick="editQueryNode()" plain="true" style="float:right;">修改QueryNode</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" id="delQnode"
					iconcls="icon-del" onclick="delQueryNode()" plain="true" style="float:right;">删除QueryNode</a>
			</div>
			<table class="easyui-datagrid" id="queryNodeDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "qu" id =  "paraTp">
		</form>

	
</body>
</html>