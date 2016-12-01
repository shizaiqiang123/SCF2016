<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>ESB_Root Add</title>
<script type="text/javascript" src="js/para/ESBRoot_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="mainDiv" style="width: 100%; height: auto" class="easyui-panel" title="基本信息" data-options="collapsible:true">
		<table class="utTab">
			<tr>
				<td>Id：</td>
				<td><input class="easyui-validatebox combo"
 					 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'"/>
				</td>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo"
					 name="bu" value="" id = "bu" data-options="validType:'maxLength[35]'"/></td>
			</tr>
		</table>
		</div>
		<div id="esbserviceDiv" style="width: 100%; height: auto" class="easyui-panel" title="batch信息" data-options="collapsible:true">
			<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton" id="addEsbservice"
					iconcls="icon-add" onclick="addEsbservice()" plain="true" style="float:right;margin-right:14px;">添加</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" id="delEsbservice"
					iconcls="icon-del" onclick="delEsbservice()" plain="true" style="float:right;">删除</a>
			</div>
			<table class="easyui-datagrid" id="esbserviceDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">       
			</table>
			
		</div>
		<input type="hidden" name = "sysRefNo" value = "ESB_Root" id = "sysRefNo">
		<input type="hidden" name="paraTp" id="paraTp" value="ESB_Root">
	</form>
</body>
</html>