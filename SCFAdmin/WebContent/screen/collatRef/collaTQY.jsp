<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>价格变动页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/collatRef/collaTQY.js"></script>
</head>
<body class="UTSCF">
	<form id="collatTqyForm">
		<div id="collatTqyDiv" class="easyui-panel" title="订单信息"
			data-options="collapsible:true" style="width: 100%">
			<table class="utTab">
				<tr>
					<td>业务日期：</td>
					<td><input type="text" name="sysOpTm" id="sysOpTm"
						class="easyui-datebox" readonly="readonly" /></td>
					<td>入库数量：</td>
					<td><input type="text" name="collatQty" id="collatQty"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>出库数量：</td>
					<td><input type="text" name="collatOutQty" id="collatOutQty"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>库存数量：</td>
					<td><input type="text" name="QTY" id="QTY"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>

				<tr>
					<td>货押协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
					<td>客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td>
				</tr>

				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>币种：</td>
					<td><input class="easyui-combobox" id=collatCcy
						name="collatCcy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						style="" false" /></td>
				</tr>

				<tr>
					<td>最新认定价格：</td>
					<td><input type="text" name="collatRdPrice" id="collatRdPrice"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>库存价值：</td>
					<td><input type="text" name="QtyValue" id="QtyValue"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>

				<tr>
					<td>质押率：</td>
					<td><input type="text" name="fundRt" id="fundRt"
						class="easyui-numberspinner"
						data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>

					<!-- <td>仓库名称：</td>
					<td><input type="text" name="wareNm" id="wareNm"
						class="easyui-validatebox combo"
						data-options="validType:'maxLength[35]'"></input></td> -->
				</tr>

			</table>
		</div>
	</form>
</body>
</html>