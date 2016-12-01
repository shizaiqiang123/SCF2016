<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>网点查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/userInfo/queryOwner.js"></script>
<style type="text/css">
input, button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

html, body, div, ul {
	margin: 0 auto;
	padding: 0;
}
</style>
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id="searchForm">
			<!-- <div class="easyui-panel blockArea panel-body" title="查询条件"
				data-options="collapsible:true" style="width: 100%">
				<ul class="condList clearfix" id="screenDiv">
					<li class="condLists fL clearfix">
						<label class="dsB fL tR">网点编号：</label>
						<span class="dsB fL">
							<input type="text" id="sysRefNo" name="sysRefNo" class="inputM1 combo"/>
						</span>
					</li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">网点名称：</label>
						<span class="dsB fL"> 
							<input type="text" id="brNm" name="brNm" class="inputM1 combo"/>
						</span>
					</li>
					<li class="condLists fR catlogBtn tR">
						<button class="dsIB mR10 blockAreaBtn white" style="background:#999999;"
							type="button" onclick="onResetBtnClick();">重 置</button>
						<button class="f14 schBtn white" type="button"
							onclick="onSearchBtnClick();">查 询</button>
					</li>
				</ul>
			</div> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="sysRefNo" id="sysRefNo" placeholder="网点编号" />
					</span></li>
					<li class="condLists fL clearfix">
						<div class="inputOfCenterLine"></div>
					</li>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="brNm" id="brNm" placeholder="网点名称" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="queryIndustryQuery"
						onclick="onSearchBtnClick()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div>
					<div class="sysCatalogReset sysCatalogBtn" id="queryIndustryReset"
						onclick="onResetBtnClick()">
						<img class="sysCatalogImg" src="images/style/catalogReset.png">
				</li>
			</ul>
			<div id="companyDiv" class="easyui-panel" title="查询结果"
				data-options="collapsible:true" style="width: 100%">
				<table class="easyui-datagrid" id="dg" cellspacing="0"
					cellpadding="0" style="width: 100%; height: auto"
					iconCls="icon-edit">
				</table>
			</div>
		</form>
	</div>
</body>
<!-- <body>
	<div class="easyui-panel" title="查询条件"
			data-options="collapsible:true" style="width: 99%" align="center">
	<form id="searchForm">
		<label>网点编号：</label>
		<input type="text"  name ="sysRefNo" id="sysRefNo" title="网点编号" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>
		<label>网点名称：</label>
		<input type="text"  name ="brNm" id="brNm" title="网点名称" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>		
		<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCimCust()">查询</a>
	</form>

	<table id="dg" title="查询信息列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
		
	</div>
</body> -->
</html>