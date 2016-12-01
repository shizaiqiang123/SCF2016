<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Query Add QueryNode</title>
     <script type="text/javascript" src="js/para/Query_QueryNode_Add.js"></script>
</head>
<body>
	<div id = "searchDiv" class="easyui-panel" title="QueryNode信息" data-options="collapsible:true"
		style="width: 100%" align="center">
		<form id='mainForm'>
		<table class="utTab">
			<tr>
				<td>Id：</td>
				<td><input class="easyui-validatebox combo"
 					 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'"/>
				</td>
				<td>Name：</td>
				<td><input class="easyui-validatebox combo"
					 name="name" value="" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Description：</td>
				<td><input class="easyui-validatebox combo"
					 name="desc" value="" id  = "desc" data-options="validType:'maxLength[35]'"/></td>
				<td>Component：</td>
				<td><input class="easyui-validatebox combo" name="component" value="" id  = "component"/></td>
			</tr>
			<tr>
				<td>Do Name：</td>
				<td><input class="easyui-validatebox combo" name="doname" value="" id  = "doname"/></td>
				<td>Type：</td>
				<td> 	
				<input class="easyui-combobox" id="type" name="type"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				</td>
			</tr>
			<tr>
				<td>Cascade Event：</td>
				<td>
				<input class="easyui-combobox" id="cascadeevent" name="cascadeevent"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				</td>
				<td>Fields：</td>
				<td><input class="easyui-validatebox combo" name="fields" value="" id  = "fields"/></td>
			</tr>
			<tr>
				<td>Condition：</td>
				<td><input class="easyui-validatebox combo" name="condition" value="" id  = "condition"/></td>
				<td>Order By：</td>
				<td><input class="easyui-validatebox combo" name="orderby" value="" id  = "orderby"/></td>
			</tr>
			<tr>
				<td>Asc：</td>
				<td>
				<input class="easyui-combobox" id="asc" name="asc"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				</td>
				<td>Sql：</td>
				<td><input class="easyui-validatebox combo" name="sql" value="" id  = "sql"/></td>
			</tr>
			<tr>
			    <td>Bybu：</td>
				<td><input class="easyui-validatebox combo" name="bybu" value="" id  = "bybu"/></td>
				<td>Lock Check：</td>
				<td><input class="easyui-validatebox combo" name="lockcheck" value="" id  = "lockcheck"/></td>
			</tr>
			<tr>
				<td>Params：</td>
				<td><input class="easyui-validatebox combo" name="params" value="" id  = "params"/></td>
				<td>tablename：</td>
				<td><input class="easyui-validatebox combo" name="tablename" value="" id  = "tablename"/></td>
			</tr>
		</table>
		</div>
	</form>
</body>
</html>