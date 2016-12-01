<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>产品信息查询</title>
<script type="text/javascript" src="script/product/LookUpProduct.js"></script>
</head>
<body>
	<div class="window-form">
		<div>
			<form id="searchForm">
				<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span
							class="dsB fL height34"> <input
								class="inputM1 combo queryInputStyleThree" type="text"
								name="productId" id="productId" placeholder="产品编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div class="inputOfCenterLine"></div>
						</li>
						<li class="condLists fL clearfix"><span
							class="dsB fL height34"> <input
								class="inputM1 combo queryInputStyleThree" type="text"
								name="productNm" id="productNm" placeholder="产品名称" />
						</span></li>
					</div>
					<li>
						<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
							onclick="SearchProductInfo()">
							<img class="sysCatalogImg" src="images/style/catalogQuery.png">
						</div>
					</li>
				</ul>
			</form>
		</div>
		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>

	</div>
</body>
</html>