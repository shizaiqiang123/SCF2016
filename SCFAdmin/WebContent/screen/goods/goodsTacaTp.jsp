<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品信息页面</title>
<script type="text/javascript" src="script/goods/goodsTacaTp.js"></script>
</head>
<body>
	<div id="goodsTacaAdd" class="div_ul">
		<form id="goodsTacaForm">
			<div id="goodsTacaDiv"
				style="width: 100%; height: auto; min-height: 300px"
				class="easyui-panel" title="商品类型信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo"></input></td>
				</tr>
				<tr>
<!-- 					<td>商品大类ID：</td> -->
<!-- 					<td><input class="easyui-combobox" id="goodsCataId" -->
<!-- 						name="goodsCataId" required="true" -->
<!-- 						data-options="onSelect:changeSubCata,valueField: 'goodsCataId',textField: 'goodsNm',panelHeight: 'auto'" -->
<!-- 						editable="false" /></td> -->
<!-- 					<td>商品子类ID：</td> -->
<!-- 					<td><input class="easyui-combobox" id="subCataId" name="subCataId" required="true" -->
<!-- 						data-options="onSelect:changeSubLab,valueField: 'subCataId',textField: 'goodsNm',panelHeight: 'auto'" -->
<!-- 						editable="false" /></td> -->
					<td>商品大类ID：</td>
					<td><input type="text" name="goodsCataId" id="goodsCataId"
						class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[70]'"></input></td>
					<td>商品子类ID：</td>
					<td><input type="text" name="subCataId" id="subCataId"
						class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr>
					<td>商品大类名称：</td>
					<td><input type="text" name="goodsCataNm" id="goodsCataNm"
						class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[70]'"></input></td>
					<td>商品子类名称：</td>
					<td><input type="text" name="subCataNm" id="subCataNm"
						class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[70]'"></input></td>
				</tr>
				<tr>
					<td>货物等级：</td>
					<td><input type="text" name="grade"
						id="grade" class="easyui-validatebox combo"
						required="true" data-options="validType:'maxLength[32]'"></input></td>
				</tr>
			</table>
			</div>
		</form>
	</div>
</body>
</html>