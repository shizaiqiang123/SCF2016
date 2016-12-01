<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>授信客户查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/cntQueryCntrctPageYf.js"></script>
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
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text"
							name="cntrctNo" id="cntrctNo" placeholder="协议编号" maxlength="35" />
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
					</div> <a href="javascript:void(0)" onclick="javascript:aBtnEvent();"
					id="aBtnEvent">
						<div class="moreQuery">更多筛选条件</div>
				</a>
				</li>
				<div
					style="display: none; float: left; width: 1000px; margin-left: -32px; margin-bottom: 10px;"
					id="moreSearchDiv">
					<ul class="condList clearfix" id="moreSearchUl">
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">经销商名称:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="selNm" id="selNm" maxlength="200" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">组织机构代码:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="sellerInstCd" id="sellerInstCd" maxlength="30" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">核心企业名称:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="buyerNm" id="buyerNm" maxlength="50" />
						</span></li>
					</ul>
				</div>
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
			data-options="collapsible:true" style="width: 100%" align="center">
		<form id="searchForm">
				<table>
					<tr>
						<td><label>授信额度编号：</label></td>
						<td><input type="text" class="easyui-validatebox combo" name="cntrctNo" id="cntrctNo" data-option="validType:'maxLength[35]'"></input></td>
						<td><label>组织机构号：</label></td>
						<td><input type="text" class="easyui-validatebox combo" name="sellerInstCd" id="sellerInstCd" data-option="validType:'maxLength[35]'"></input></td>
						<td><label>经销商名称：</label></td>
						<td><input id="selNm"   name="selNm" class="easyui-validatebox combo" 
						data-options="textField:'text',panelHeight: 'auto',validType:'maxLength[35]'"
				 		editable="false"  ></input></td>	
					</tr>
					<tr>
						<td><label>核心企业名称</label></td>
						<td><input type="text" class="easyui-validatebox combo" name="buyerNm" id="buyerNm" data-option="validType:'maxLength[35]'"></input></td>
						<td><label>币种：</label></td>
						<td>
				 		<input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" />
				 		<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCimCust()">查询</a></td>
					</tr>
				</table>
		</form>
		<table id="dg" title="查询信息列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
		</table>
	</div>
</body> -->
</html>





