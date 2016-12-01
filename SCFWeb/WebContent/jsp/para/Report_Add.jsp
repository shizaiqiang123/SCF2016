<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Report Add</title>
     <script type="text/javascript" src="js/para/Report_Add.js"></script>
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
							<option value="P">P</option>  
							<option value="M">M</option> 
				</select>  -->
				<input class="easyui-combobox" id="type" name="type"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" />
				</td>
				<td>ReportType：</td>
				 <td><!-- <select id="reporttype" name="reporttype" style="width:158px;" class ="easyui-combobox">    
							<option value="xml">XML</option>  
							<option value="excel">Excel</option>
							<option value="pdf">Pdf</option>
							<option value="txt">Txt</option> 
							<option value="word">word</option>  
				</select>  -->
				<input class="easyui-combobox" id="reporttype" name="reporttype"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" 
							/>
		        
				</td> 
			
			</tr>
			<tr>
			    <td>Description：</td>
				<td><input class="easyui-validatebox combo"
					 name="desc" value="" id  = "desc" data-options="validType:'maxLength[35]'"/></td>	
				<td>Template：</td>
				<td><input class="easyui-validatebox combo" name="template" value="" id  = "template"/></td>
			</tr>
			<tr>
				<td>Output：</td>
				<td><input class="easyui-validatebox combo" name="output" value="" id  = "output"/></td>
				<td>Mapping：</td>
				<td><input class="easyui-validatebox combo" name="mapping" value="" id  = "mapping"/></td>
			</tr>
			<tr>
				<td>DataSourceType：</td>
				<td><input class="easyui-validatebox combo" name="datasourcetype" value="" id  = "datasourcetype"/></td>
				<td>DataSource：</td>
				<td><input class="easyui-validatebox combo" name="datasource" value="" id  = "datasource"/></td>
			</tr>
		</table>
		</div>
		<input type="hidden" name = "sysRefNo" value = "" id =  "sysRefNo">
		<input type="hidden" name = "paraTp" value = "re" id =  "paraTp">
	</form>
</body>
</html>