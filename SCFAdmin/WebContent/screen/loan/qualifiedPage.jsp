<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增合格证页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/qualifiedPage.js"></script>
</head>
<body>
	<div style="margin-bottom: 20px;">
		<form id="searchForm">
			<!-- <label>商品ID：</label> <input type="text" name="queryGoodsId" id="queryGoodsId"
				title="商品ID" /> <label>商品名称：</label><input type="text"
				name="queryGoodsNm" id="queryGoodsNm" title="商品名称" /> <a
				class="easyui-linkbutton" icon="icon-search"
				onclick="SearchPageInfo()">查询</a> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="queryGoodsId" id="queryGoodsId" placeholder="商品ID" />
					</span></li>
					<li class="condLists fL clearfix">
						<div class="inputOfCenterLine"></div>
					</li>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleThree" type="text"
							name="queryGoodsNm" id="queryGoodsNm" placeholder="商品名称" />
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
	<div id="qualiPDiv" class="easyui-panel" title="货物信息"
		data-options="collapsible:true" style="width: 100%;">
		<form id='mainForm'>
			<table class="utTab">
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
					<td><input name="price" id="price" class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2" /></td>
				</tr>
				<tr>
					<td>订单数量</td>
					<td><input name="poNum" id="poNum" class="easyui-numberbox" /></td>
					<td>可入库数量：</td>
					<td><input name="sumPoInNum" id="sumPoInNum"
						class="easyui-numberbox" data-options="min:0" /></td>
				</tr>
				<tr>
					<td>入库金额：</td>
					<td><input name="poInAmt" id="poInAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'" />
						<input type="hidden" id="cntrctNo" name="cntrctNo" /> <input
						type="hidden" id="buyerId" name="buyerId" /> <input type="hidden"
						id="loanId" name="loanId" /> <input type="hidden" id="refNo"
						name="refNo" /> <input type="hidden" id="collateralRefNo"
						name="collateralRefNo" /><input id="poAUsedNum" name="poAUsedNum"
						type="hidden" /></td>
					<td>入库数量：</td>
					<td><input name="poInNum" id="poInNum"
						class="easyui-numberbox" required="true"
						data-options="onChange:checkPoNum,validType:'maxLength[10]'" /></td>
				</tr>
				<tr>
					<td><input id="poRef" name="poRef" type="hidden" /> <input
						id="goodsCharacter" name="goodsCharacter" type="hidden" /></td>
					<td><input id="sysRefNo" name="sysRefNo" type="hidden" /></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>