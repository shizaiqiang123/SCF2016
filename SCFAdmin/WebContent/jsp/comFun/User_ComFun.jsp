<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>个人信息常用信息页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/comFun/User_ComFun.js"></script>
<style type="text/css">
.schBtn {
	padding-left: 44px;
	width: 90px;
	line-height: 36px;
	height: 36px;
	text-align: left;
	cursor: pointer;
	border-radius: 3px;
}

.f14 {
	font-size: 14px;
}

.white {
	color: #fff;
}
input,button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

html,body,div,ul {
	margin: 0 auto;
	padding: 0;
}
}
</style>
</head>
<body>
	<div>
		<div >
			<form id="searchForm">
				<!-- <div class="item">
					<span class="label">功能编号：</span>
					<div class="fl item-ifo">
						<input type="text" class="combo"
							name="searchId" id="searchId" />
					</div>
				</div>
				<div class="item">
					<span class="label">功能名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="combo"
							name="searchNm" id="searchNm" />
						<a class="easyui-linkbutton" icon="icon-search" onclick="SearchComfInfo()">查询</a>
						<button class="f14 schBtn white" type="button"
							onclick="SearchComfInfo();">查 询</button>
					</div>
				</div> -->
                <ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:108px" name="searchId" id="searchId"
								placeholder="功能编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:108px" name="searchNm"
								id="searchNm" placeholder="功能名称" />
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
		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>
	</div>
	<div id='pageDiv' style="margin-top:20px;">
		<div id="InfoDiv" class="easyui-panel" title="Page信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id='mainForm'>
				<div class="item">
					<span class="label">常用功能编号：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="funId"
							id="funId" data-options="validType:'maxLength[35]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">常用功能名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="funNm"
							id="funNm" data-options="validType:'maxLength[35]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">用户编号：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="userId"
							id="userId" value="${sysUserInfo.userId }"
							data-options="validType:'maxLength[35]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">常用功能路径：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="funPath"
							id="funPath" data-options="validType:'maxLength[35]'" /> <input
							type="hidden" id="userRoleType" name="userRoleType" /> <input
							type="hidden" id="userTp" name="userTp">
							<input type="text" id="userFunType" name="userFunType"/>
					</div>
				</div>
			</form>
		</div>
	</div>
	</div>


</body>
</html>