<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>间接客户查询</title>
<script type="text/javascript" src="script/invc/queryCntrctSbr.js"></script>
</head>
<body>
	<div>
		<form id="searchForm">
			<%-- <label>间接客户编号：</label>
			<input type="text"  name ="sysRefNo" id="sysRefNo" title="间接客户编号"/>
			<input type="text" name="sysBusiUnit" id="sysBusiUnit" value="${sysUserInfo.sysBusiUnit}"></input>
		    <label>间接客户名称：</label>
			<input type="text"  name ="buyerNm" id="buyerNm" title="间接客户名称"/>
			<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCimCust()">查询</a> --%>
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="sysRefNo" id="sysRefNo" placeholder="间接客户编号" />
					</span></li>
					<li class="condLists fL clearfix">
						<div class="inputOfCenterLine"></div>
					</li>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="buyerNm" id="buyerNm" placeholder="间接客户名称" />
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