<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Service Add</title>
     <script type="text/javascript" src="js/para/Service_Add.js"></script>
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
				<td>Type：</td>
				<td><!-- <select id="type" name="type" style="width:158px;" class ="easyui-combobox">  
							<option value="M">M</option>  
							<option value="P">P</option>
				</select> --> 
				<input class="easyui-combobox" id="type" name="type"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: '120px'"
							editable="false" />
				</td>
				<td>Trigger</td>
				<td>
					<input class="easyui-combobox" id="trigger" name="trigger"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				</td>
			</tr>
			<tr>
				<td>Component：</td>
				<td><!-- <select id="component" name="component" style="width:158px;" class ="easyui-combobox">  
							<option value="TrxAccountingManager">TrxAccountingManager</option>  
							<option value="TrxLimitsManager">TrxLimitsManager</option>
				</select> --> 
				<input class="easyui-combobox" id="component" name="component"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				</td>
				<td>Gapi Id：</td>
				<td><input class="easyui-validatebox combo" name="gapiid" value="" id  = "gapiid"/></td>
			</tr>	
			<tr>
			    <td>Template Id：</td>
				<td><input class="easyui-validatebox combo" name="templateid" value="" id  = "templateid"/></td>
				<td>Service Js：</td>
				<td><input class="easyui-validatebox combo" name="servicejs" value="" id  = "servicejs"/></td>
			</tr>
			<tr>
			    <td>Rules：</td>
				<td><input class="easyui-validatebox combo" name="rules" value="" id  = "rules"/></td>
			</tr>
		</table>
		</div>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "se" id =  "paraTp">
	</form>	
</body>
</html>