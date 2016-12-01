<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品信息页面</title>
<script type="text/javascript" src="script/goods/goodsTaca.js"></script>
</head>
<body>
	<div class="div_ul">
		<form id="goodsTacaForm">
			<div id="goodsTacaDiv"
				style="width: 100%; height: auto; min-height: 380px"
				class="easyui-panel" title="商品信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td><input type="hidden" name="sysRefNo" id="sysRefNo"></input></td>
					</tr>
					<tr>
						<td>商品大类：</td>
						<td><input class="easyui-combobox" id="goodsCata"
							name="goodsCata" required="true"
							data-options="onSelect:changeSubCata,valueField: 'goodsCataId',textField: 'goodsCataNm',panelHeight: 'auto'"
							editable="false" /></td>
						<td>商品子类：</td>
						<td><input class="easyui-combobox" id="subCata"
							name="subCata" required="true"
							data-options="onSelect:changeSubLab,valueField: 'subCataId',textField: 'subCataNm'"
							editable="false" /></td>
					</tr>
					<tr>
						<td>商品名称：</td>
						<td><input type="text" name="goodsNm" id="goodsNm"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[70]'"></input></td>
						<td>商品ID：</td>
						<td><label id="cataLab" style="font-size: 13px">01</label>- <label
							id="subLab" style="font-size: 13px">02</label>- <input
							style="width: 130px" name="goodsNo" id="goodsNo" type="text"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[80]'" /></td>
					</tr>
					<tr>
						<td>规格型号：</td>
						<td><input type="text" name="goodsCharacter"
							id="goodsCharacter" class="easyui-validatebox combo"
							required="true" data-options="validType:'maxLength[32]'"></input></td>
						<td>生产厂家：</td>
						<td><input type="text" name="producer" id="producer"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[32]'"></input></td>
					</tr>
					<tr>
						<td>计价单位：</td>
						<td><input type="text" name="unit" id="unit"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[3]'"></input></td>
						<td>计价币别：</td>
						<td><input class="easyui-combobox" id="ccy" name="ccy"
							required="true"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" /></input></td>
					</tr>
					<tr>
						<td>最新单价：</td>
						<td><input type="text" name="price" id="price"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,groupSeparator:','"></input></input></td>
						<td>使用地区：</td>
						<td><input type="text" name="region" id="region"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[20]'"></input></td>
					</tr>
					<tr>
						<td>更新日期：</td>
						<td><input type="text" name="updateDt" id="updateDt"
							class="easyui-datebox" required="required"></input></td>
					</tr>
					<tr>
						<td><input type="hidden" name="goodsId" id="goodsId"></input></td>
						<td><input type="hidden" name="cataLabHD" id="cataLabHD"></input></td>
						<td><input type="hidden" name="subLabHD" id="subLabHD"></input></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
</body>
</html>