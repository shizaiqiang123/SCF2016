<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>订单查询lookup页面</title>
<script type="text/javascript" src="script/PORegist/poLoanLookUp.js"></script>
</head>
<body>
	<div>
		<form id="searchForm">
			<!-- <label>订单编号：</label>
		<input class="combo"  name ="poNo" id="poNo" title="订单编号"/>			
		<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchPo()">查询</a> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text" name="poNo"
							id="poNo" placeholder="订单编号" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchPo()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div>
				</li>
			</ul>
		</form>
		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>
	</div>
</body>
</html>