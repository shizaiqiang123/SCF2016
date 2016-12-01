<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>预付类货物出入库台帐查询信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/loanNoteHuoWuDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="loanForm">
		<div class="easyui-panel" title="预付类货物出入库台帐"
			data-options="collapsible:true" style="width: 98%">
			<div id="cntrctDiv">
				<table class="utTab">
					<tr>
						<td>入库数量：</td>
						<td><input type="text" name="poInNum" id="poInNum"></td>
						<td>出库数量：</td>
						<td><input type="text" name="ttlPoOutNum" id="ttlPoOutNum" value="0"></td>
					</tr>
					<tr>
						<td>库存数量：</td>
						<td><input type="text" name="poNum" id="poNum"></td>
						<td>货押协议编号：</td>
						<td><input type="text" id="cntrctNo" name="cntrctNo"></input></td>

					</tr>
					<tr>
						<td>客户名称：</td>
						<td><input type="text" name="selNm" id="selNm"></td>
						<td>业务类别：</td>
						<td><input name="busiTp" id="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></td>

					</tr>
					<tr>
						<td>币种：</td>
						<td><input name="ccy" id="ccy" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></td>
						<td>最新认定价格：</td>
						<td><input name="price" id="price" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>

					</tr>
					<tr>
						<td>库存价值：</td>
						<td><input name="poAmt" id="poAmt" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
						<!-- <td>可覆盖敞口：</td>
						<td><input name="openM" id="openM" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td> -->
						<td>质押率：</td>
						<td><input name="pldPerc" id="pldPerc"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'"></td>

					</tr>
					<tr>
						
						<!-- <td>仓库名称：</td>
						<td><input type="text" name="warehouseNm" id="warehouseNm"></td> -->
						<td>业务日期：</td>
						<td><input name="sysOpTm" id="sysOpTm" class="easyui-datebox"
							editable="false"></td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>