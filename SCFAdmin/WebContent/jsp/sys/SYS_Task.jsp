<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Task管理-批处理Task信息页面</title>
<script type="text/javascript" src="js/sys/SYS_Task.js"></script>
</head>
<body>
	<div id="mainDiv">
	<form id="mainForm">
		<div class="easyui-panel" title="Batch 信息" data-options="collapsible:true" style="width:100%">
			<table id="batchTable" cellspacing="0" cellpadding="0" width="100%" class = "utTab"
				iconCls="icon-edit">
			<tr>
				<td>批处理编号：</td>
				<td><input type="text" class="easyui-validatebox combo" name = "batchId" value = "" id =  "batchId"></td>
				<td>批处理描述：</td>
				<td><input type="text" class="easyui-validatebox combo" name="batchName" value="" id= "batchName"/></td>
			</tr>
			<tr>
				<td>批处理类型：</td>
				<td><input type="text" class="easyui-validatebox combo" name="batchType" value="" id  = "batchType"/></td>
				<td>批处理状态：</td>
				<td><input type="text" class="easyui-validatebox combo" name="batchStatus" value="" id= "batchStatus"/></td>
			</tr>
			</table>
		</div>
			
		
		<table id="taskTable" class="utTab" title="任务列表"> </table>
	</form>
	</div>
</body>
</html>