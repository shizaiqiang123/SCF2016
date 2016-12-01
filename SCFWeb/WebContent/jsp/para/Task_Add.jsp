<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Task Add</title>
     <script type="text/javascript" src="js/para/Task_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
	<div id="mainDiv" style="width: 100%" class="easyui-panel" title="基本信息" data-options="collapsible:true">
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
					 name="desc" value="" id  = "desc" data-options="validType:'maxLength[35]'"/></td>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo"
					 name="bu" value="" id  = "bu" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Type：</td>
				<td><input class="easyui-validatebox combo"
					 name="type" value="" id  = "type" data-options="validType:'maxLength[10]'"/></td>
				<td>component：</td>
				<td><input class="easyui-validatebox combo" name="component" value="" id  = "component"/></td>
			</tr>
			<tr>
				<td>Gapi Id：</td>
				<td><input class="easyui-validatebox combo" name="gapiid" value="" id  = "gapiid"/></td>
				<td>Sql Condition：</td>
				<td><input class="easyui-validatebox combo" name="sqlcondition" value="" id  = "sqlcondition"/></td>
			</tr>
			<tr>
				<td>JS：</td>
				<td><input class="easyui-validatebox combo" name="js" value="" id  = "js"/></td>
				<td>catalog：</td>
				<td><input class="easyui-validatebox combo" name="catalog" value="" id  = "catalog"/></td>
			</tr>
			<tr>
				<td>Single Thread：</td>
				<td><input class="easyui-validatebox combo" name="singlethread" value="" id  = "singlethread"/></td>
				<td>Jsp File：</td>
				<td>
					<input type="text" name="jspfile" value="" id  = "jspfile"/>
					<a href="javascript:void(0)" class="easyui-linkbutton" id="newId"
					iconcls="icon-add" onclick="openFile()" plain="true">浏览文件</a>
				</td>	
			</tr>
		</table>
	</div>
	    <input type=hidden name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "ta" id =  "paraTp">
	</form>
	<form id='trxForm'>
			<div id="trxData"></div>	
	</form>
</body>
</html>