<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增押品页面</title>
<script type="text/javascript" src="script/collatRef/collateral.js"></script>
</head>
<body>
	<form id="CollateralForm">
		<div id="CollateralDiv" style="margin: auto; margin-top: 50px">
			<table class="utTab" align="center" height="50%">
				<tr>
					<td>商品大类：</td>
					<td><input class="easyui-combobox" id="goodsCata"
						name="goodsCata" required="true"
						data-options="onSelect:changeSubCata,valueField: 'goodsCataId',textField: 'goodsCataNm',panelHeight: 'auto'"
						editable="false" /></td>
					<td>商品子类：</td>
					<td><input class="easyui-combobox" id="subCata"
						name="subCata" required="true"
						data-options="valueField: 'subCataId',textField: 'subCataNm'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>商品名称：</td>
					<td><input type="text" name="collatNm" id="collatNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'"><a
						id="goodsIdLookUp" class="easyui-linkbutton" icon="icon-search"
						onclick="goodsIdLookUp()">查询</a></td>
					<td>生产厂家：</td>
					<td><input type="text" id="collatFact" name="collatFact"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr>
					<td>计价单位：</td>
					<td><input type="text" name="collatUnit" id="collatUnit"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[10]'"></td>
					<td>计价币别：</td>
					<td><input class="easyui-combobox" id="collatCcy" name="collatCcy"
						required="true"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" /></input></td>
				</tr>
				<tr>
					<td>数量：</td>
					<td><input class="easyui-numberspinner" id="collatQty"
						name="collatQty"
						data-options="onChange:collatVal,min:0,validType:'maxLength[20]'"
						required="true" /></td>
					<td>最新价格：</td>
					<td><input class="easyui-numberbox" name="collatRdPrice"
						id="collatRdPrice"
						data-options="onChange:collatVal,groupSeparator:',', min:0,precision:2,validType:'maxLength[18]'"></td>
				</tr>
				<tr>
					<td>价格日期：</td>
					<td><input name="collatAdjDt" id="collatAdjDt"
						class="easyui-datebox" data-options="validType:'date'"></td>
					<td>货物总价值：</td>
					<td><input name="collatVal" id="collatVal"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2,validType:'maxLength[18]'"></td>
				</tr>
				<tr>
					<td><input type="hidden" id="regNo" name="regNo"></input></td><!--仓单号（主页流水号）  -->
					<td><input type="hidden" id="cntrctNo" name="cntrctNo"></input></td><!--协议编号  -->
					<td><input type="hidden" id="sysRefNo" name="sysRefNo"></input></td>
					<td><input type="hidden" id="goodsId" name="goodsId"></input></td>
					<td><input type="hidden" id="goodsCharacter" name="goodsCharacter"></input></td>
				</tr>
				
				<!-- <tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></td>
					<td>商品编号：</td>
					<td><input class="easyui-validatebox combo" name="collatId"
						id="collatId" data-options="validType:'maxLength[35]'" required = "true"> <a
						id="goodsIdLookUp" class="easyui-linkbutton" icon="icon-search"
						onclick="goodsIdLookUp()">查询</a></td>
				</tr>
				<tr>
					<td>质物品种：</td>
					<td><input type="text" name="collatNm" id="collatNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[70]'"></td>
					<td>质物计价单位：</td>
					<td><input type="text" name="collatUnit" id="collatUnit"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[10]'"></td>
				</tr>
				<tr>
					<td>数量：</td>
					<td><input class="easyui-numberspinner" id="collatQty"
						name="collatQty"
						data-options="onChange:collatVal,min:0,validType:'maxLength[20]'"
						required="true" /></td>
					<td>质物当日价值：</td>
					<td><input name="collatVal" id="collatVal"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2,validType:'maxLength[18]'"></td>
				</tr>
				<tr>
					<td>质物认定价格：</td>
					<td><input class="easyui-numberbox" name="collatRdPrice"
						id="collatRdPrice"
						data-options="onChange:collatVal,groupSeparator:',', min:0,precision:2,validType:'maxLength[18]'"></td>
					<td>价格日期：</td>
					<td><input name="collatAdjDt" id="collatAdjDt"
						class="easyui-datebox" data-options="validType:'date'"></td>
				</tr>
				<tr>
					<td>质物规格：</td>
					<td><input type="text" name="collatSpec" id="collatSpec"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></td>
					<td>生产厂家：</td>
					<td><input type="text" id="collatFact" name="collatFact"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>
				<tr id="Tr1">
					<td>质物数量：</td>
					<td><input class="easyui-numberspinner" id="qty" name="qty"
						data-options="min:0,validType:'maxLength[20]'" /></td>
					<td>质物重量：</td>
					<td><input name="weight" id="weight"
						class="easyui-numberspinner"
						data-options="validType:'maxLength[20]'"></td>
				</tr>
				<tr>
					<td>质物入库日期：</td>
					<td><input class="easyui-datebox" required="true"
						name="arrivalDt" id="arrivalDt" editable="false"></td>
					<td><input type="hidden" id="regNo" name="regNo"></input></td>
					<td><input type="hidden" id="cntrctNo" name="cntrctNo"></input></td>
				</tr> -->
			</table>
		</div>
	</form>
</body>
</html>