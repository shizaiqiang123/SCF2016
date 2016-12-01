<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>货物页面</title>
<script type="text/javascript" src="script/invc/poOutEdit.js"></script>
</head>
<body>
	<form id="poForm">
		<div id="invcMChgDiv" style="margin: auto; margin-top: 50px">
			<table class="utTab" align="center" height="60%">
				<tr>
					<td>商品大类：</td>
					<td><input type="text" name="goodsCata"
						class="easyui-validatebox" id="goodsCata"></input></td>
					<td>商品子类：</td>
					<td><input type="text" name="subCata"
						class="easyui-validatebox" id="subCata"></td>
				</tr>
				<tr>
					<td>商品名称：</td>
					<td><input type="text" name="goodsNm"
						class="easyui-validatebox" id="goodsNm"></td>
					<td>最新单价：</td>
					<td><input type="text" name="poPrice" id="poPrice"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr>
					<td>采购总数量：</td>
					<td><input type="text" name="poNum" id="poNum"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td>总价值：</td>
					<td><input type="text" name="ttlAmt" id="ttlAmt"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr>
					<td>发货到期日：</td>
					<td><input name="poDueDt" id="poDueDt" class="easyui-datebox"></td>
					<td>未发货数量：</td>
					<td><input type="text" name="poNumUseable" id="poNumUseable"
						data-options="onChange:changeNoAmt,min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
				</tr>
				<tr>
					<td>未发货价值：</td>
					<td><input type="text" name="poNumUseableAmt"
						id="poNumUseableAmt"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td>本次发货数量：</td>
					<td><input type="text" name="poOutNum" id="poOutNum"
						required="true"
						data-options="onChange:changePoAmt,min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox" value="0"></td>
				</tr>
				<tr>
					<td>本次发货价值：</td>
					<td><input type="text" name="poOutAmt" id="poOutAmt"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></input></td>
				</tr>
				<tr>
					<td><input type="hidden" name="ttlPoOutNumHD"
						id="ttlPoOutNumHD" /></td>
					<td><input type="hidden" name="ttlPoOutNum" id="ttlPoOutNum" /></td>
					<td><input type="hidden" name="poNumUseableHD" id="poNumUseableHD" /></td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>