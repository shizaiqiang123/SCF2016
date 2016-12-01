<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>个人信息业务数据展示页面</title>
<script type="text/javascript" src="js/comBusiMsg/User_ComBusiMsg.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<div>
		<div id="searchDiv" class="easyui-panel" title="查询条件"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id="searchForm">
				<!-- <label>功能编号：</label> <input type="text" class="easyui-validatebox combo" name="searchId" id="searchId" /> 
				<label>功能名称：</label> <input type="text"
					name="searchNm" id="searchNm"  class="easyui-validatebox combo" /> <a
					class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCombInfo()">查询</a> -->
				<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="searchId" id="searchId"
								placeholder="功能编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="searchNm"
								id="searchNm" placeholder="功能名称" />
						</span></li>
					</div>
					<li>
						<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchCombInfo()">
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
		<form id='mainForm' style="margin-top:20px;">
		<div id="InfoDiv" class="easyui-panel" title="Page信息"
			data-options="collapsible:true" style="width: 100%">
			<div class="item">
				<span class="label">功能编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="funId" id="funId" data-options="validType:'maxLength[35]'"/>	
				</div>
			</div>
		
			<div class="item">
				<span class="label">功能名称：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="funNm"  id="funNm" data-options="validType:'maxLength[35]'"/>
				</div>
			</div>
			<div class="item">
				<span class="label">用户查询编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="userQueryId" id="userQueryId" data-options="validType:'maxLength[35]'"/>	
				</div>
			</div>
			<div class="item">
				<span class="label">用户编号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="userId"  id="userId" value="${sysUserInfo.userId }" data-options="validType:'maxLength[35]'"/>	
				</div>
			</div>
			<div class="item">
				<span class="label">功能路径：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="funPath" id="funPath" data-options="validType:'maxLength[200]'"/>
				</div>
			</div>
			<div>
			<input type="hidden" id="userRoleType" name="userRoleType"/>
			<input type="hidden" id="userTp" name="userTp">
			<input type="text" id="userFunType" name="userFunType">
			</div>
		</div>
		</form>
	</div>


</body>
</html>