<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>间接客户查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/cntrct/queryBuyer.js"></script>
</head>
<body>
	<div>
		<form id="searchForm">
			<!-- <label>间接客户编号：</label> <input type="text" name="sysRefNo"
				id="sysRefNo" title="间接客户编号" class="easyui-validatebox combo"
				data-options="validType:'maxLength[35]'" /> <label>组织机构代码：</label> <input
				type="text" name="custInstCd" id="custInstCd" title="间接客户编号"
				class="easyui-validatebox combo"
				data-options="validType:'maxLength[35]'" /> <a
				class="easyui-linkbutton" icon="icon-search"
				onclick="SearchCimCust()">查询</a> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text"
							name="sysRefNo" id="sysRefNo" placeholder="间接客户编号" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchCimCust()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div>
					<div class="sysCatalogReset sysCatalogBtn" id="querySellerReset"
						onclick="onResetBtnClick()">
						<img class="sysCatalogImg" src="images/style/catalogReset.png">
					</div> <a href="javascript:void(0)" onclick="javascript:aBtnEvent();">
						<div class="moreQuery">更多筛选条件</div>
				</a>
				</li>
				<div
					style="display: none; float: left; width: 1000px; margin-left: -32px; margin-bottom: 10px;"
					id="moreSearchDiv">
					<ul class="condList clearfix" id="moreSearchUl">
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">组织机构代码:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="custInstCd" id="custInstCd" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">间接客户名称:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="buyerNm" id="buyerNm" />
						</span></li>
					</ul>
				</div>
			</ul>
		</form>

		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>

	</div>
</body>
</html>