<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增订单详细</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/PORegist/CollateralRegist.js"></script>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
</head>
<body>


	<div>
		<form id="searchForm">
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
						onclick="searchGoodsCata()">
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

	<form id="CollateralForm" style="margin-top: 20px;">
		<div id="CollateralDiv" class="easyui-panel" title="商品信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<!-- <div id="CollateralDiv" style="margin: auto; margin-top: 50px"> -->
			<table class="utTab" align="center" height="50%">
				<tr>
					<td>商品大类:</td>
					<td><input type="text" name="goodsCata" id="goodsCata"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[5]'"></td>
					<td>商品子类:</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="subCata" id="subCata" required="true"
						data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>
					<td>商品名称:</td>
					<td><input type="text" name="goodsNm" id="goodsNm"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[80]'"></td>
					<td>商品ID:</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="goodsId" id="goodsId" required="true"
						data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>
					<td>规格型号:</td>
					<td><input type="text" name="goodsCharacter"
						id="goodsCharacter" class="easyui-validatebox combo"
						required="true" data-options="validType:'maxLength[32]'"></td>
					<td>生产厂家:</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="producer" id="producer" required="true"
						data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>
					<td>计价单位:</td>
					<td><input type="text" name="unit" id="unit"
						class="easyui-validatebox combo" required="true"
						data-options="validType:'maxLength[3]'"></td>
					<td>计价币别:</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="ccy" id="ccy" required="true"
						data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>
					<td>数量:</td>
					<td><input type="text" name="poNum" id="poNum" value="1"
						data-options="onChange:collatVal,min:1,validType:'maxLength[20]'"
						class="easyui-numberspinner" required="true" /></td>
					<td>单价:</td>
					<td><input type="text" name="poPrice" id="poPrice"
						class="easyui-numberbox"
						data-options="onChange:collatVal,min:0,precision:2,groupSeparator:',',validType:'maxLength[22]'" /></td>
				</tr>
				<tr>
					<td>总价值:</td>
					<td><input name="ttlAmt" id="ttlAmt"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','" /></td>
				</tr>
				<tr>
					<td><input type="hidden" id="cntrctNo" name="cntrctNo" /></td>
					<td><input type="hidden" id="refNo" name="refNo"></input></td>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo" /></td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>