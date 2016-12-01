<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户信息查询</title>
<script type="text/javascript" src="js/notice/LookUpRole.js"></script>
</head>
<body>
	<div class="window-form">
	<div >
	<form id="searchForm">
		<!-- <label>角色编号：</label>
		<input type="text"  name ="roleId" id="roleId" title="角色编号" class="easyui-validatebox combo" data-options="validType:'maxLength[32]'"/>
		<label>角色名称：</label>
		<input type="text"  name ="roleName" id="roleName" title="角色名称" class="easyui-validatebox combo" data-options="validType:'maxLength[200]'"/>
		
		<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchRoleInfo()">查询</a> -->
			<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="roleId" id="roleId"
								placeholder="角色编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="roleName"
								id="roleName" placeholder="角色名称" />
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
	</div>
	<table id="dg" title="查询信息列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
		
	</div>
</body>
</html>