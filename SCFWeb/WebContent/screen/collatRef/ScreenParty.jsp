<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>流水号管理</title>
<script type="text/javascript" src="script/collatRef/ScreenParty.js"></script>
</head>
<body>
	<div class="window-form">
		<form id="searchForm">
			<!-- <label>合作方编号：</label>
		<input type="text"  name ="sysRefNo" id="sysRefNo" title="授信客户编号" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text"
							name="sysRefNo" id="sysRefNo" placeholder="合作方编号" />
					</span></li>

				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchCimCust()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div>
				</li>
			</ul>

			<!-- 		<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCimCust()">查询</a> -->
		</form>

		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>

	</div>
</body>
</html>