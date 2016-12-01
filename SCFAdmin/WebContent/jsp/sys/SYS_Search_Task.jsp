<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>个人任务查询</title>
<script type="text/javascript" src="js/sys/SYS_Search_Task.js"></script>
</head>
<body>
	<div class="window-form">
	<div class="easyui-panel" title="查询条件" data-options="collapsible:true" style="width:100%" align="center">
	<form id="searchForm">
		<table id="screenDiv" class="table_screen">
			<tr>
				<td><label>任务名称：</label></td>
				<td><input type="text" class="easyui-validatebox combo" name ="itemName" id="itemName" title="任务名称"/></td>
				<td><label>任务时间：</label></td>
				<td><input type="text" class="easyui-validatebox combo" name ="startTime" id="startTime" title="任务时间"/></td>
			</tr>
		</table>	
		<table width=100%>
					<tr><td align="right" width="65%">													
						<a class="easyui-linkbutton" icon="icon-filter" style="width:100px"
						onclick="onResetBtnClick();"><label class="words">重置</label></a>
					</td>
					<td align="left">													
						<a class="easyui-linkbutton" icon="icon-search" style="width:100px"
						onclick="searchTaskInfo();"><label class="words">查询</label></a>
					</td></tr>					
		</table>				
	</form>
	</div>
	<table id="todoTable" title="查询任务列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
		
	</div>
</body>
</html>