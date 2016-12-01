<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Gapi Add</title>
<script type="text/javascript" src="js/para/Gapi_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="mainDiv" style="width: 100%"
			class="easyui-panel" title="基本信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>Id：</td>
					<td><input class="easyui-validatebox combo"
 						 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'"/>
  						<a href="javascript:void(0)" class="easyui-linkbutton" id="newId"
						 iconcls="icon-add" onclick="newId()" plain="true"  required="true">取新编号</a></td>
					<td>Name：</td>
					<td><input class="easyui-validatebox combo"
						 name="name" id="name" data-options="validType:'maxLength[35]'"/></td>
				</tr>

				<!-- 
	type: 			
	 * F:file system
	 * M:MO
	 * W:webservice
	 * S:socket
	 * E:ESB
	 -->
				<tr>
					<td>Type：</td>
					<td><!-- <select name="type" id="type" class="easyui-combobox"
						style="width: 150px;">
							<option value=""></option>
							<option value="F">File</option>
							<option value="E">ESB</option>
							<option value="M">MO</option>
							<option value="S">Socket</option>
							<option value="W">Webservice</option>
					</select> -->
					<input class="easyui-combobox" id="type" name="type" data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
					<td>Component：</td>
					<!-- 引擎实现类 -->
					<td><input type="text" name="component" value=""
						id="component" /></td>
				</tr>
				<!-- modle : * SYNC：同步    * ASYNC：异步 -->
				<!-- resend: * 是否需要要自动重发   N:不需要  Y:需要 -->
				<tr>
					<td>Modle：</td>
					<td><!-- <select name="modle" id="modle" class="easyui-combobox"
						style="width: 150px;">
							<option value=""></option>
							<option value="SYNC">SYNC</option>
							<option value="ASYNC">ASYNC</option>
					</select> -->
					<input class="easyui-combobox" id="modle" name="modle"
							
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
					<td>Resend：</td>

					<td><!-- <select name="resend" id="resend" class="easyui-combobox"
						style="width: 150px;">
							<option value=""></option>
							<option value="N">No</option>
							<option value="Y">Yes</option>
					</select> -->
					<input class="easyui-combobox" id="resend" name="resend"
							
							data-options="valueField:'id', textField:'text',panelHeight: 'auto'"
							editable="false" />
					</td>
				</tr>
				<tr>
					<td>Send：</td>
					<td><input class="easyui-validatebox combo" name="send" value="" id="send" /></td>
					<td>Receive：</td>
					<td><input class="easyui-validatebox combo" name="reveive" value="" id="reveive" /></td>
				</tr>
				<!-- <tr>
				<td>UserName：</td>
				<td><input type="text" name="username" value="" id="username" /></td>
				<td>Password：</td>
				<td><input type="text" name="password" value="" id="password" /></td>
			</tr>
 -->
				<tr>
					<td>Naming：</td>
					<!-- 命名规则 -->
					<td><input class="easyui-validatebox combo" name="naming" value="" id="naming" /></td>
					<td>Backup：</td>
					<td><input class="easyui-validatebox combo" name="backup" value="" id="backup" /></td>
				</tr>
				<tr>
					<td>ReceiveTime：</td>
					<td>
						<input type="text" class="easyui-numberbox" name="receivetime" value="" id="receivetime" />
					</td>
					<td>Suffix：</td>
					<td><input class="easyui-validatebox combo" name="suffix" value="" id="suffix" /></td>
				</tr>
				<tr>
					<td>Business Unit：</td>
					<td><input  class="easyui-validatebox combo"
						 name="bu" value="" id="bu" data-options="validType:'maxLength[35]'"/></td>
				</tr>
			</table>
		</div>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name="paraTp" value="ga" id="paraTp">
	</form>
</body>
</html>