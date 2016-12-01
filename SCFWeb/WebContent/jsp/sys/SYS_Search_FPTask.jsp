<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>个人任务查询</title>
<script type="text/javascript" src="js/sys/SYS_Search_FPTask.js"></script>
</head>
<body>
	<div class="window-form">
	<div>
	<form id="searchForm">
		<table id="screenDiv" class="table_screen">
			<!-- <tr>
				<td><label>任务名称：</label></td>
				<td><input type="text" class="easyui-validatebox combo" name ="itemName" id="itemName" title="任务名称"/></td>
				<td><label>任务时间：</label></td>
				<td><input type="text"  class="easyui-validatebox combo" name ="startTime" id="startTime" title="任务时间"/></td>
			</tr>
		</table>	
		<table width=100%>
					<tr><td align="right">													
						<a class="easyui-linkbutton" icon="icon-filter" 
						onclick="onResetBtnClick();"><label class="words">重置</label></a>
					</td>
					<td align="left">													
						<a class="easyui-linkbutton" icon="icon-search" 
						onclick="searchTaskInfo();"><label class="words">查询</label></a>
					</td></tr>	 -->
					<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="itemName" id="itemName"
								placeholder="任务名称" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="startTime"
								id="startTime" placeholder="任务时间" />
						</span></li>
					</div>
					<li>
						<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchComfInfo()">
							<img class="sysCatalogImg" src="images/style/catalogQuery.png">
						</div>
						<div class="sysCatalogReset sysCatalogBtn" id="querySellerReset"
						onclick="onResetBtnClick()">
							<img class="sysCatalogImg" src="images/style/catalogReset.png">
						</div>
					</li>
				</ul>				
		</table>				
	</form>
	</div>
	<table id="todoTable" title="查询任务列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
		
	</div>
</body>
</html>