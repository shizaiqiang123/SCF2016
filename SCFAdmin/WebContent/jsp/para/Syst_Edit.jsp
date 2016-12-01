<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>SysParameter Add</title>
<script type="text/javascript" src="js/para/Syst_Edit.js"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="mainDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="系统参数信息"
			data-options="collapsible:true,singleSelect: true">
			<table class="utTab">
				<tr>
				<td>系统编号：</td>
					<td><input type="text" class="easyui-validatebox combo"  name="id" value="SYSPara" id="id" ></td>

					<td>机构：</td>
					<td><input type="text" class="easyui-validatebox combo" name="bu" value="" id="bu" /></td>				
				</tr>
				<tr>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo"
						value="SYSPara"></input></td>
					<td><input type="hidden" name="paraId" id="paraId" value="SYSPara"></input></td> 
					</td>
				</tr> 
			</table>
		</div>
		<div id="dataDiv" style="width: 100%; height: auto" class="easyui-panel" title="系统信息" data-options="collapsible:true">
			<div id="Toolbar" style="overflow:hidden;">
				<!-- <a href="javascript:void(0)" class="easyui-linkbutton" id="addPage"
					iconcls="icon-add" onclick="addRecord()" plain="true">添加</a>  -->
				<a href="javascript:void(0)" class="easyui-linkbutton" id="editPage"
					iconcls="icon-edit" onclick="editRecord()" plain="true" style="float:right;margin-right:14px;">修改</a> 
				<!-- <a href="javascript:void(0)" class="easyui-linkbutton" id="delPage"
					iconcls="icon-del" onclick="delRecord()" plain="true">删除</a> -->
			</div>
			<table class="easyui-datagrid" id="dg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">       
			</table>
		</div>
	</form>
</body>
</html>