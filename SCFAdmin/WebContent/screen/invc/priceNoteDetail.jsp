<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>价格调整台帐查询信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/priceNoteDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="loanForm">
		<div class="easyui-panel" title="价格调整台帐明细"
			data-options="collapsible:true" style="width: 98%">
			<div id="cntrctDiv">
				<table class="utTab">
					<tr>
						<td>授信客户名称：</td>
						<td><input type="text" name="selNm" id="selNm"></td>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"></td>
					</tr>
					<tr>
						<td>业务类别：</td>
						<td><input name="busiTp" id="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></td>
						<td>监管方名称：</td>
						<td><input type="text" id="regNm" name="regNm"></input></td>

					</tr>
					<tr>
						<td>商品名称：</td>
						<td><input type="text" name="cGoodsNm" id="cGoodsNm"></td>
						<td>商品ID：</td>
						<td><input type="text" name="goodsId" id="goodsId"></td>

					</tr>
					<tr>
						<td>币别：</td>
						<td><input name="ccy" id="ccy" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></td>
						<td>调整前价格：</td>
						<td><input type="text" name="price" id="price"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
					</tr>
					<tr>
						<td>调整后价格：</td>
						<td><input name="priceNew" id="priceNew"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
						<td>计价单位：</td>
						<td><input type="text" name="unit" id="unit"></td>
					</tr>
					<tr>
						<td>仓库：</td>
						<td><input type="text" name="wareNm" id="wareNm"></td>
						<td>调整幅度：</td>
						<td><input name="subPrice" id="subPrice" class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'"></td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>