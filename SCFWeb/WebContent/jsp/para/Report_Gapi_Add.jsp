<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Report Add Gapi</title>
     <script type="text/javascript" src="js/para/Report_Gapi_Add.js"></script>
</head>
<body>
	
	<div style="margin-bottom:20px;">	
		<form id="searchForm">	
			<!-- <label>Gapi编号：</label> <input type="text" name="gapiId" id="gapiId"
				title="用户编号" /> <label>Gapi名称：</label> <input type="text"
				name="gapiNm" id="gapiNm" title="用户名称" /> <a
				class="easyui-linkbutton" icon="icon-search"
				onclick="SearchPageInfo()">查询</a> -->
				<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="gapiId" id="gapiId"
								placeholder="用户编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="gapiNm"
								id="gapiNm" placeholder="用户名称" />
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
	<div id = "searchDiv" class="easyui-panel" title="Gapi信息" data-options="collapsible:true"
		style="width: 100%" align="center">
	</div>
	
	<form id='mainForm'>
	
		<table class="utTab">
			<tr>
				<td>Id：</td>
				<td><input class="easyui-validatebox combo"
 					 name = "id" id = "id" required="true" data-options="validType:'maxLength[35]'"/></td>
				<td>Name：</td>
				<td><input class="easyui-validatebox combo"
					 name="name" value="" id= "name" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>type：</td>
				<td><input class="easyui-validatebox combo"
					 name = "type" value = "" id = "type" data-options="validType:'maxLength[10]'"></td>
				<td>Component：</td>
				<td><input class="easyui-validatebox combo" name="component" value="" id  = "component"/></td>
			</tr>
			<tr>
				<td>module：</td>
				<td><input class="easyui-validatebox combo" name="modle" value="" id  = "modle"/></td>
				<td>resend：</td>
				<td><input class="easyui-validatebox combo" name="resend" value="" id  = "resend"/></td>
			</tr>
			<tr>
				<td>send：</td>
				<td><input class="easyui-validatebox combo" name="send" value="" id  = "send"/></td>
				<td>receive：</td>
				<td><input class="easyui-validatebox combo" name="reveive" value="" id  = "reveive"/></td>
			</tr>
			<tr>
				<td>user name：</td>
				<td><input class="easyui-validatebox combo" name="username" value="" id  = "username"/></td>
				<td>password：</td>
				<td><input class="easyui-validatebox combo" name="password" value="" id  = "password"/></td>
			</tr>
			<tr>
				<td>naming：</td>
				<td><input class="easyui-validatebox combo" name="naming" value="" id  = "naming"/></td>
				<td>backup：</td>
				<td><input class="easyui-validatebox combo" name="backup" value="" id  = "backup"/></td>
			</tr>
			<tr>
				<td>receive time：</td>
				<td><input class="easyui-validatebox combo" name="receivetime" value="" id  = "receivetime"/></td>
				<td>suffix：</td>
				<td><input class="easyui-validatebox combo" name="suffix" value="" id  = "suffix"/></td>
			</tr>
		</table>	
	</form>	
</body>
</html>