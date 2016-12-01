<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Batch Add Schedule</title>
     <script type="text/javascript" src="js/para/Batch_Schedule_Add.js"></script>
</head>
<body>
	<div style="margin-top:80px">
	<form id='mainForm'>
	
		<table class="utTab">
			<tr>
				<td>Schedule Type：</td>
				<td>
				<input class="easyui-combobox" id="scheduletype" name="scheduletype" required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" />
				</td>
				<td>Begin From：</td>
				<td>
					<input type="text" class="easyui-datebox " name="beginfrom" id="beginfrom" editable="false">
					</input>  
				</td>
			</tr>
			<tr>
				<td>Check Holiday：</td>
				<td>
				<input class="easyui-combobox" id="checkholiday" name="checkholiday"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" />
				</td>
				<td>Terminative Date：</td>
				<td>
					<input type="text" class="easyui-datebox " name="terminativedate" id="terminativedate" editable="false">
					</input>  
				</td>
			</tr>
			<tr>
				<td>Condition：</td>
				<td><input class="easyui-validatebox combo" name = "condition" id = "condition"></input>
				</td>
				<td>Is By Bu：</td>
				<td>
					<input class="easyui-combobox" id="isbybu" name="isbybu"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" />  
				</td>
			</tr>
			<tr>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo" 
					 name="bu" id  = "bu" data-options="validType:'maxLength[35]'"/></td>
				<td>Month：</td>
				<td>
				<input class="easyui-combobox" id="month" name="month" 
					   data-options="valueField: 'id',textField: 'text',panelHeight: '200px'"
					   editable="false" />
				</td>
			</tr>
			<tr>
				<td>Week：</td>
				<td>
				<input class="easyui-combobox" id="week" name="week"
						data-options="valueField: 'id',textField: 'text',panelHeight: '200px'"
						editable="false" />
				</td>
				<td>Date：</td>
				<td><input type="text" class="easyui-datebox "  name="date" id="date" editable="false"></input></td>
			</tr>
			<tr>
				<td>Hour：</td>
				<td>
				<input class="easyui-combobox" id="hour" name="hour"
						data-options="valueField: 'id',textField: 'text',panelHeight: '200px'"
						editable="false" />
				</td>
				<td>Minute：</td>
				<td><input class="easyui-numberbox" value="0" name="minute" id="minute" data-options="min:0,max:59"></input></td>
			</tr>
			<tr>
				<td>Second：</td>
				<td><input class="easyui-numberbox" value="0" name="second" id="second" data-options="min:0,max:59"></input></td>
				<td>Initialize：</td>
				<td><input class="easyui-validatebox combo" name = "initialize" id = "initialize"></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="text" name="express" value="" id  = "express" style="display: none;"/>
					<!-- <a href="javascript:void(0)" class="easyui-linkbutton" id="addCronExpression"
					iconcls="icon-add" onclick="addCronExpression()" plain="true">生成</a> -->
				</td>
			</tr>
		</table>
		
	</form>
	</div>

	
</body>
</html>