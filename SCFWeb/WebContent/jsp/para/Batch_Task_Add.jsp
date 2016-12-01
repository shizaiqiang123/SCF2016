<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Batch Add Task</title>
<script type="text/javascript" src="js/para/Batch_Task_Add.js"></script>
</head>
<body>
	<div>
		<div>
			<form id="searchForm">
				<!-- <label>Task编号：</label> <input type="text" name="taskId" id="taskId"
					title="用户编号" /> 
					<label>Task名称：</label> <input type="text"
					name="taskNm" id="taskNm" title="用户名称" />
					 <a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchTaskInfo()">查询</a> -->
		<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="taskId" id="taskId"
								placeholder="Task编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="taskNm"
								id="taskNm" placeholder="Task名称" />
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
			</form>


			<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
				cellpadding="0" width="100%" iconCls="icon-edit">
			</table>
		</div>
		<div id="searchDiv" class="easyui-panel" title="Task信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id='mainForm'>
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
				<td>Description：</td>
				<td><input class="easyui-validatebox combo"
					 name="desc" value="" id = "desc" data-options="validType:'maxLength[35]'"/></td>
				<td>Business Unit：</td>
				<td><input class="easyui-validatebox combo" 
					 name="bu" value="" id = "bu" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Type：</td>
				<td><input class="easyui-validatebox combo"
					 name="type" value="" id = "type" data-options="validType:'maxLength[10]'"/></td>
				<td>Component：</td>
				<td><input class="easyui-validatebox combo" name="component" value="" id = "component"/></td>
			</tr>
			<tr>
				<td>Gapi Id：</td>
				<td><input class="easyui-validatebox combo" name="gapiid" id = "gapiid"/></td>
				<td>Sql Condition：</td>
				<td><input class="easyui-validatebox combo" name="sqlcondition" id = "sqlcondition"/></td>
			</tr>
			<tr>
				<td>JS：</td>
				<td><input class="easyui-validatebox combo" name="js" id = "js"/></td>
				<td>Catalog：</td>
				<td><input class="easyui-validatebox combo" name="catalog" id = "catalog"/></td>
			</tr>
			<tr>
				<td>Single Thread：</td>
				<td><input class="easyui-validatebox combo" name="singlethread" id = "singlethread"/></td>
				<td>Jsp File：</td>
				<td>
					<input class="easyui-validatebox combo" name="jspfile" id = "jspfile"/>
				</td>	
			</tr>
				</table>
			</form>
		</div>
	</div>


</body>
</html>