<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Function Add Report</title>
     <script type="text/javascript" src="js/para/Function_Report_Add.js"></script>
</head>
<body>
	<div style="margin-bottom:20px;">
		<form id="searchForm">
			<!-- <label>Report编号：</label> <input type="text" name="reportId" id="reportId"
				title="用户编号" /> <label>Report名称：</label> <input type="text"
				name="reportNm" id="reportNm" title="用户名称" /> <a
				class="easyui-linkbutton" icon="icon-search"
				onclick="SearchPageInfo()">查询</a> -->
				<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="reportId" id="reportId"
								placeholder="用户编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="reportNm"
								id="reportNm" placeholder="用户名称" />
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
	<div id = "searchDiv" class="easyui-panel" title="Report信息" data-options="collapsible:true"
		style="width: 100%" align="center">
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
					 name="name" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Description：</td>
				<td><input class="easyui-validatebox combo"
					 name="desc" id = "desc" data-options="validType:'maxLength[35]'"/></td>
				<td>Type：</td>
				<td><input class="easyui-validatebox combo"
					 name="type" value="" id = "type" data-options="validType:'maxLength[10]'"/></td>
			</tr>
			<tr>
				<td>Report Type：</td>
				<td><input class="easyui-validatebox combo" name="reporttype" id = "reporttype"/></td>
				<td>Template：</td>
				<td><input class="easyui-validatebox combo" name="template" id = "template"/></td>
			</tr>
			<tr>
				<td>Output：</td>
				<td><input class="easyui-validatebox combo" name="output" id = "output"/></td>
				<td>Mapping：</td>
				<td><input class="easyui-validatebox combo" name="mapping" id = "mapping"/></td>
			</tr>
			<tr>
				<td>Datasource Type：</td>
				<td><input class="easyui-validatebox combo"
					 name="datasourcetype" id = "datasourcetype" data-options="validType:'maxLength[10]'"/></td>
				<td>Datasource：</td>
				<td><input class="easyui-validatebox combo" name="datasource" id = "datasource"/></td>
			</tr>
		</table>
		</form>
	</div>
	

	
</body>
</html>