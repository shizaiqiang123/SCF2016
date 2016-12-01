<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Logicflow_transforNode Add</title>
     <script type="text/javascript" src="js/para/Logicflow_TransforNode_Add.js"></script>
</head>
<body>
		<form id='mainForm'>
	
		<table class="utTab">
						<tr>
				<td>Id：</td>
				<td><input class="easyui-validatebox combo"
 					 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'"/></td>
				<td>Name：</td>
				<td><input class="easyui-validatebox combo"
					 name="name" value="" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Desc：</td>
				<td><input class="easyui-validatebox combo"
					 name = "desc" value = "" id = "desc" data-options="validType:'maxLength[35]'"></td>
				<td>Component：</td>
				<td><input class="easyui-validatebox combo" name="component" value="" id  = "component"/></td>
			</tr>
			<tr>
				<td>Tablename：</td>
				<td><input class="easyui-validatebox combo" name="tablename" value="" id  = "tablename"/></td>
				<td>Doname：</td>
				<td><input class="easyui-validatebox combo" name="doname" value="" id  = "doname"/></td>
			</tr>
			<tr>
				<td>Type：</td>
				<td>
				<input class="easyui-combobox" id="type" name="type"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				
				</td>
				<td>Cascade Event：</td>
				<td>
				<input class="easyui-combobox" id="cascadeevent" name="cascadeevent"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				
				</td>
			</tr>
			<tr>
				<td>Event：</td>
				<td>
				<input class="easyui-validatebox combo" name="event" value="" id  = "event"/>
				</td>
				<td>Fields：</td>
				<td><input class="easyui-validatebox combo" name="fields" value="" id  = "fields"/></td>
			</tr>
			<tr>
				<td>Condition：</td>
				<td><input class="easyui-validatebox combo" name="condition" value="" id  = "condition"/></td>
				<td>Orderby：</td>
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
				<td>Module：</td>
				<td><input class="easyui-validatebox combo" name="module" value="" id  = "module"/></td>
			</tr>
			<tr>
				<td>Sql：</td>
				<td><input class="easyui-validatebox combo" name="sql" value="" id  = "sql"/></td>
				<td>Params：</td>
				<td><input class="easyui-validatebox combo" name="params" value="" id  = "params"/></td>
			</tr>
			<tr>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo"
					 name="bu" value="" id = "bu" data-options="validType:'maxLength[35]'"/></td>
				<td>Nodejs：</td>
				<td><input class="easyui-validatebox combo" name="nodejs" value="" id  = "nodejs"/></td>
			</tr>
			
			<tr id="pending" name="pending">
				<td>Pending_fields：</td>
				<td><input class="easyui-validatebox combo" name="fields" value="" id  = "fields"/></td>
				<td>Pending_valuse：</td>
				<td><input class="easyui-validatebox combo" name="valuse" value="" id  = "valuse"/></td>
			</tr>
			<tr id="release" name="release">
				<td>Release_fields：</td>
				<td><input class="easyui-validatebox combo" name="fields" value="" id  = "fields"/></td>
				<td>Release_values：</td>
				<td><input class="easyui-validatebox combo" name="valuse" value="" id  = "valuse"/></td>
			</tr>			
		</table>
	</form>

	
</body>
</html>