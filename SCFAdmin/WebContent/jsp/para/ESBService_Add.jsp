<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>ESBService Add</title>
     <script type="text/javascript" src="js/para/ESBService_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
	<div id="mainDiv" style="width: 100%; height: 200px" class="easyui-panel" title="基本信息" data-options="collapsible:true">
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
					 name="name" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo"
					 name="bu" value="" id  = "bu" data-options="validType:'maxLength[35]'"/></td>
				<td>Type：</td>
				<td>
				<input class="easyui-combobox" id="type" name="type"
				 data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" editable="false" />
				</td>
			</tr>
			<tr>
				<td>Protocol：</td>
				<td><input class="easyui-validatebox combo" name="protocol" id = "protocol"/></td>
				<td>Post Adapter：</td>
				<td><input class="easyui-validatebox combo" name="postadapter" id = "postadapter"/></td>
			</tr>
			<tr>
				<td>Query Adapter：</td>
				<td><input class="easyui-validatebox combo" name="queryadapter" id = "queryadapter"/></td>
				<td>Initlize：</td>
				<td><input class="easyui-validatebox combo" name="initlize" id = "initlize"/></td>
			</tr>
		</table>
		</div>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "es" id =  "paraTp">
	</form>

	
</body>
</html>