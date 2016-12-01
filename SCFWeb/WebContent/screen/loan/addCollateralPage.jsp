<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加货物页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/addCollateralPage.js"></script>
</head>
<body>
	<div style="margin-bottom: 20px;">
		<form id="searchForm">
			<!-- <label>商品ID：</label><input type="text" name="copyOfGoodsId"
				id="copyOfGoodsId" title="商品ID" /> <label>商品名称：</label> <input
				type="text" name="copyOfGoodsNm" id="copyOfGoodsNm" title="商品名称" />
			<a class="easyui-linkbutton" icon="icon-search"
				onclick="SearchPageInfo()">查询</a> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="copyOfGoodsId" id="copyOfGoodsId" placeholder="商品ID" />
					</span></li>
					<li class="condLists fL clearfix">
						<div class="inputOfCenterLine"></div>
					</li>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="copyOfGoodsNm" id="copyOfGoodsNm" placeholder="商品名称" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchPageInfo()">
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
	<div id="addCollateralDiv">
		<form id="collateralForm">
			<table class="utTab" align="center" height="50%">
				<tr>
					<td>商品大类：</td>
					<td><input class="easyui-validatebox combo" name="goodsCata"
						id="goodsCata" />
					<td>商品子类：</td>
					<td><input class="easyui-validatebox combo" name="subCata"
						id="subCata" />
				</tr>
				<tr>
					<td>生产厂家：</td>
					<td><input class="easyui-validatebox combo" name="producer"
						id="producer" />
					<td>商品名称：</td>
					<td><input class="easyui-validatebox combo" name="goodsNm"
						id="goodsNm" /></td>
				</tr>
				<tr>
					<td>商品ID：</td>
					<td><input class="easyui-validatebox combo" name="goodsId"
						id="goodsId" />
					<td>计价单位：</td>
					<td><input class="easyui-validatebox combo" name="unit"
						id="unit" /></td>
				</tr>
				<tr>
					<td>币别：</td>
					<td><input class="easyui-validatebox combo" name="ccy"
						id="ccy" />
					<td>单价：</td>
					<td><input class="easyui-numberbox" name="price" id="price"
						data-options="min:0,
						precision:2,groupSeparator:','" /></td>
				</tr>
				<tr>
					<td>可融资数量</td>
					<td><input name="poNumUseable" id="poNumUseable"
						class="easyui-numberbox" /></td>
					<td>已融资数量</td>
					<td><input name="poNumUsed" id="poNumUsed" required="true"
						class="easyui-numberbox" /></td>
				</tr>
				<tr>
					<td>融资数量</td>
					<td><input name="poLoanNum" id="poLoanNum" required="true"
						class="easyui-numberbox"
						data-options="onChange:checkPoLoanNum,validType:'maxLength[10]'" /></td>
					<td>融资金额</td>
					<td><input name="poLoanAmt" id="poLoanAmt"
						class="easyui-numberbox"
						data-options="min:0,
						precision:2,groupSeparator:','" /></td>
				</tr>
				<tr>
					<td><input type="hidden" id="sysRefNo" name="sysRefNo" /></td>
					<td><input type="hidden" id="refNo" name="refNo" /></td>
					<td><input id="selId" name="selId" type="hidden"></td>
					<td><input id="loanId" name="loanId" type="hidden"></td>
					<td><input id="cntrctNo" name="cntrctNo" type="hidden"></td>
					<td><input id="buyerId" name="buyerId" type="hidden"></td>
					<td><input id="poAUsedNum" name="poAUsedNum" type="hidden"></td>
					<td><input id="poUsedNum" name="poUsedNum" type="hidden"></td>
				</tr>

				<!-- <td><span>sysRefNo</span><input type="text" id="sysRefNo"
						name="sysRefNo" /></td>
					<td><span>refNo</span><input type="text" id="refNo"
						name="refNo" /></td>
					<td><input id="loanId" name="loanId" type="hidden"></td>
					<td><input id="cntrctNo" name="cntrctNo" type="text"></td>
					<td><input id="buyerId" name="buyerId" type="text"></td>
					<td><input id="selId" name="selId" type="text"></td>
				</tr> -->
			</table>
		</form>
	</div>
</body>
</html>