<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>SysParameter Add</title>
<script type="text/javascript" src="js/para/Syst_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
		 <div id="mainDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="系统属性信息"  data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>属性名称：</td>
					<td><input type="text" class="easyui-validatebox combo" name="fieldName" value="" id="fieldName"></td>
					<td>属性值：</td>
					<td>			
					<input  class="easyui-validatebox combo" name="fieldValue" id="fieldValue"/>
					</td>	
				</tr>
			</table>
		</div> 	
	</form>	
</body>
</html>