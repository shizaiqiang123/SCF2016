<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>筛选页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/user/queryUser_Log.js"></script>
<style type="text/css">
input,button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

html,body,div,ul {
	margin: 0 auto;
	padding: 0;
}
</style>
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id="mainform">
			<!-- <div class="easyui-panel blockArea panel-body" title="查询条件"
				data-options="collapsible:true" style="width: 100%">
				<ul class="condList clearfix" id="screenDiv">
					<li class="condLists fL clearfix">
						<label class="dsB fL tR">用户类型：</label>
						<span class="dsB fL">
							<input type="text" class="easyui-combobox" id="userTp" name="userTp" 
							style="width: 135px;height: 32px"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" />
						</span>
					</li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">用户ID：&nbsp&nbsp&nbsp&nbsp</label>
						<span class="dsB fL"> <input type="text" id="userId"
							class="inputM1 combo" name="userId" />
					</span></li>
					<li class="condLists fR catlogBtn tR" style="text-align: right;margin-top: 10%">
						<button class="dsIB mR10 blockAreaBtn white" style="background:#999999;"
							type="button" onclick="onResetBtnClick();">重 置</button>
						<button class="f14 schBtn white" type="button"
							onclick="onSearchBtnClick();">查 询</button>
					</li>
					<li class="condLists fL clearfix">
						<label class="dsB fL tR">登录时间：</label>
						<span class="dsB fL">
							<input type="text" class="combo easyui-datebox" id="userLoginTime" name="userLoginTime"
							 style="width: 135px;height: 32px"/>
							<input type="hidden" name="maxUserLoginTime" id="maxUserLoginTime" />
						</span>
					</li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">退出时间：</label>
						<span class="dsB fL"> 
							<input type="text" class="easyui-datebox" id="userLogoutTime" name="userLogoutTime"
							 style="width: 135px;height: 32px" />
							<input type="hidden" name="maxUserLogoutTime" id="maxUserLogoutTime" />
						</span>
					</li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">状&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp态：</label>
						<span class="dsB fL"> 
							<input type="text" class="easyui-combobox" id="logType" name="logType" 
							style="width: 135px;height: 32px" 
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"/>
						</span>
					</li>
				</ul>
			</div> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv" style="width:710px">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix">
						<label class="dsB fL tR">用户类型：</label>
						<span class="dsB fL">
							<input type="text" class="easyui-combobox" id="userTp" name="userTp" 
							style="width: 135px;height: 32px"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" />
						</span>
					</li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">用户ID：&nbsp&nbsp&nbsp&nbsp</label>
						<span class="dsB fL"> <input type="text" id="userId" style="width: 135px;"
							class="inputM1 combo" name="userId" />
					</span></li>
					<li class="condLists fL clearfix">
						<label class="dsB fL tR">登录时间：</label>
						<span class="dsB fL">
							<input type="text" class="combo easyui-datebox" id="userLoginTime" name="userLoginTime"
							 style="width: 135px;height: 32px"/>
							<input type="hidden" name="maxUserLoginTime" id="maxUserLoginTime" />
						</span>
					</li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">退出时间：</label>
						<span class="dsB fL"> 
							<input type="text" class="easyui-datebox" id="userLogoutTime" name="userLogoutTime"
							 style="width: 135px;height: 32px" />
							<input type="hidden" name="maxUserLogoutTime" id="maxUserLogoutTime" />
						</span>
					</li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">状&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp态：</label>
						<span class="dsB fL"> 
							<input type="text" class="easyui-combobox" id="logType" name="logType" 
							style="width: 135px;height: 32px" 
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"/>
						</span>
					</li>
				</div>
				<li>
					<div class="catalogQuery" id="queryIndustryQuery"
						onclick="onSearchBtnClick()" style="margin-top:28px"></div>
					<div class="catalogReset" id="queryIndustryReset"
						onclick="onResetBtnClick()" style="margin-top:28px"></div>
				</li>
			</ul>
			<div id="logDiv" class="easyui-panel" title="查询结果"
				data-options="collapsible:true" style="width: 100%">
				<table class="easyui-datagrid" id="dg" cellspacing="0"
					cellpadding="0" style="width: 100%; height: auto"
					iconCls="icon-edit">
				</table>
			</div>
		</form>
	</div>
</body>
</html>