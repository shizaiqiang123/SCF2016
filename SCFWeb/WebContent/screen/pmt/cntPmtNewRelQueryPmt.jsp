<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="script/pmt/cntPmtNewRelQueryPmt.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div>
		<form id="searchForm">
			<!-- <table>
				<tr>
					<td><label>交易流水号：</label></td>
					<td><input type="text" class="easyui-validatebox combo"
						name="sysRefNo" id="sysRefNo"
						data-option="validType:'maxLength[35]'"></input></td>
					<td></td>
					<td></td>
					<td><label>授信客户名称：</label></td>
					<td><input id="selNm" name="selNm"
						class="easyui-validatebox combo"
						data-options="textField:'text',panelHeight: 'auto',validType:'maxLength[35]'"
						editable="false"></input></td>
				</tr>
				<tr>
					<td><label>间接客户名称</label></td>
					<td><input type="text" class="easyui-validatebox combo"
						name="buyerNm" id="buyerNm"
						data-option="validType:'maxLength[35]'"></input> <a
						class="easyui-linkbutton" icon="icon-search"
						onclick="SearchCimCust()">查询</a></td>
				</tr>
			</table> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text"
							name="sysRefNo" id="sysRefNo" placeholder="交易流水号" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="onSearchBtnClick()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div> <a href="javascript:void(0)" onclick="javascript:aBtnEvent();">
						<div class="moreQuery">更多筛选条件</div>
				</li>

				<div
					style="display: none; float: left; width: 1000px; margin-left: -32px; margin-bottom: 10px;"
					id="moreSearchDiv">
					<ul class="condList clearfix" id="moreSearchUl">
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">授信客户名称:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="selNm" id="selNm" />
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