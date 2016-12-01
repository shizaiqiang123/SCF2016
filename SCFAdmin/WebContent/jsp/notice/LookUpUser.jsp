<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户信息查询</title>
<script type="text/javascript" src="js/notice/LookUpUser.js"></script>
</head>
<body>
	<div class="window-form">
	<div class="easyui-panel" title="查询条件" data-options="collapsible:true" style="width:100%" align="center">
	<form id="searchForm">
		<!-- <label>用户编号：</label>
		<input type="text"  name ="userId" id="userId" title="用户编号" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>
		<label>用户名称：</label>
		<input type="text"  name ="userNm" id="userNm" title="用户名称" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>
		
		<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchUserInfo()">查询</a> -->
		<ul class="condList clearfix" id="screenDiv">
			<div class="selectDiv" id="selectDiv"  style="width:700px">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span class="dsB fL">
							<input class="inputM1 combo" type="text"
							style="border: 1px solid #fff;width:300px" name="userId" id="userId"
							placeholder="用户编号" />
					</span></li>
					<li class="condLists fL clearfix">
						<div
							style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
					</li>
					<li class="condLists fL clearfix"><span class="dsB fL">
							<input class="inputM1 combo" type="text"
							style="border: 1px solid #fff;width:300px" name="userNm"
							id="userNm" placeholder="用户名称" />
					</span></li>
				</div>
				<li>
					<div class="catalogQuery" id="querySellerQuery" onclick="SearchUserInfo();"></div>
					<div class="catalogReset" id="querySellerReset" onclick="onResetBtnClick();"></div>
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