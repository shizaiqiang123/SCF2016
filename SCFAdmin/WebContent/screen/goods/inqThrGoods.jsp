<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<link href="css/ut.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/goods/inqThrGoods.js"></script>
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
	<div id="searchDiv" class="easyui-panel" title="货物信息"
		data-options="collapsible:true" style="width: 100%" align="center">
		<form id='mainForm'>
			<table class="utTab">
				<tr id="Tr1">
					<td>流水号：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="sysRefNo" id="sysRefNo" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>商品Id：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly" name="goodsId"
						id="goodsId" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>商品名称：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly" name="goodsNm"
						id="goodsNm" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>商品大类：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="goodsCata" id="goodsCata" readonly="readonly"
						data-options="validType:'maxLength[5]'" /></td>
				</tr>
				<tr>
					<td>商品子类：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly" name="subCata"
						id="subCata" readonly="readonly"
						data-options="validType:'maxLength[5]'" /></td>
					<td>规格型号：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="goodsCharacter" id="goodsCharacter" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>计价单位：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly" name="unit"
						id="unit" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>计价币别：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly" name="ccy"
						id="ccy" readonly="readonly"
						data-options="validType:'maxLength[5]'" /></td>
				</tr>
				<tr>
					<td>生产厂家：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="producer" id="producer" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>备注：</td>
					<td><input class="easyui-validatebox combo" name="note"
						id="note" data-options="validType:'maxLength[500]'" /></td>
				</tr>
				<tr id="Tr2">
					<td>最新单价：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly" name="price"
						id="price" readonly="readonly"
						data-options="validType:'maxLength[5]'" /></td>
					<td>是否抵押登记：</td>
					<td><input class="easyui-combobox" id="isMortgage"
						name="isMortgage" style="width: 176px; height: 32px"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>