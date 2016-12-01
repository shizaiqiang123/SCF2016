<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Function Add Service</title>
     <script type="text/javascript" src="js/para/Function_Service_Add.js"></script>
</head>
<body>
	<div style="margin-bottom:20px;">
		<form id="searchForm">
			<!-- <label>Service编号：</label> <input type="text" name="serviceId" id="serviceId"
				title="用户编号" /> <label>Service名称：</label> <input type="text"
				name="serviceNm" id="serviceNm" title="用户名称" /> <a
				class="easyui-linkbutton" icon="icon-search"
				onclick="SearchPageInfo()">查询</a> -->
				<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="serviceId" id="serviceId"
								placeholder="Service编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="serviceNm"
								id="serviceNm" placeholder="Service名称" />
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
	<div id = "searchDiv" class="easyui-panel" title="Service信息" data-options="collapsible:true"
		style="width: 100%;height:200px" align="center">
		<form id='mainForm'>
		<table class="utTab">
			<tr>
				<td>Id：</td>
				<td><input class="easyui-validatebox combo"
				 	 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'">
					<a href="javascript:void(0)" class="easyui-linkbutton" id="newId"
					 iconcls="icon-add" onclick="newId()" plain="true">取新编号</a>
				</td>
				<td>Name：</td>
				<td><input class="easyui-validatebox combo"
					 name="name" value="" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Type：</td>
				<td>
				<input class="easyui-combobox" id="type" name="type" 
				 data-options="valueField: 'id',textField: 'text',panelHeight: '120px'" editable="false" />
				</td>
				<td>Component：</td>
				<td><input class="easyui-validatebox combo" name="component" id = "component" /></td>
			</tr>
			<tr>
				<td>Gapi Id：</td>
				<td><input class="easyui-validatebox combo" name="gapiid" id = "gapiid"/></td>
				<td>Template Id：</td>
				<td><input class="easyui-validatebox combo" name="templateid" id = "templateid"/></td>
			</tr>
			<tr>
				<td>Service JS：</td>
				<td><input class="easyui-validatebox combo" name="servicejs" id = "servicejs"/></td>
			</tr>
		</table>
		</form>
	</div>
</body>
</html>