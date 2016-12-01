<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>全部客户查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/user/queryAllCust.js"></script>
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
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span class="dsB fL">
							<input class="inputM1 combo" type="text"
							style="border: 1px solid #fff; width: 108px;" name="custInstCd"
							id="custInstCd" placeholder="组织机构代码" />
					</span></li>
					<li class="condLists fL clearfix">
						<div
							style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
					</li>
					<li class="condLists fL clearfix"><span class="dsB fL">
							<input class="inputM1 combo" type="text"
							style="border: 1px solid #fff; width: 108px" name="custNm"
							id="custNm" placeholder="客户名称" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="onSearchBtnClick()">
							<img class="sysCatalogImg" src="images/style/catalogQuery.png">
						</div>
						<div class="sysCatalogReset sysCatalogBtn" id="querySellerReset"
						onclick="onResetBtnClick()">
							<img class="sysCatalogImg" src="images/style/catalogReset.png">
						</div>
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
</html>