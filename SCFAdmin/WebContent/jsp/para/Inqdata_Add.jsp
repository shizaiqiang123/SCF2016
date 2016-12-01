<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Inqdata Add</title>
     <script type="text/javascript" src="js/para/Inqdata_Add.js"></script>
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
					 name="name" value="" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Desc：</td>
				<td><input class="easyui-validatebox combo"
					 name="desc" value="" id = "desc" data-options="validType:'maxLength[35]'"/></td>
				<td>Type：</td>
				<td>
				<input class="easyui-combobox" id="type" name="type"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				</td>
			</tr>
			<tr>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo"
					 name="bu" value="" id = "bu" data-options="validType:'maxLength[35]'"/></td>
				<td>Target：</td>
				<td><input class="easyui-validatebox combo" name="target" value="" id  = "target"/></td>
			</tr>
		</table>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "in" id =  "paraTp">
		</div>
	</form>

	
</body>
</html>