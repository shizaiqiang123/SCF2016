<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>预付类货物出入库台帐查询信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/loanNoteCunHuoDetail.js"></script>
</head>
<body class="UTSCF">
	<form id="loanForm">
		<div class="easyui-panel" title="融资明细" data-options="collapsible:true"
			style="width: 98%">
			<div id="cntrctDiv">
				<table class="utTab">
					<tr>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"></td>
						<td>卖方客户：</td>
						<td><input type="text" name="selNm" id="selNm"></td>
					</tr>
					<tr>
						<td>融资支付方式：</td>
						<td><input id="loanTp" name="loanTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
						<td>融资币别：</td>
						<td><input name="ccy" id="ccy" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></td>
					</tr>
					<tr>
						<td>融资金额：</td>
						<td><input name="ttlLoanAmt" id="ttlLoanAmt"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
						<td>融资余额：</td>
						<td><input name="ttlLoanBal" id="ttlLoanBal"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
					</tr>
					<tr>
						<td>融资日期：</td>
						<td><input name="loanValDt" id="loanValDt"
							class="easyui-datebox" editable="false"></td>
						<td>融资到期日：</td>
						<td><input name="loanDueDt" id="loanDueDt"
							class="easyui-datebox" editable="false"></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="easyui-panel" title="质物明细" data-options="collapsible:true"
			style="width: 98%">
			<div id="billDiv">
				<table class="utTab">
					<tr>
						<td>商品名称：</td>
						<td><input type="text" name="collatNm" id="collatNm"></td>
						<td>商品ID：</td>
						<td><input type="text" id="collatId" name="collatId"></td>
					</tr>
					<tr>
						<td>商品单位：</td>
						<td><input name="collatUnit" id="collatUnit"></td>
						<td>商品币别：</td>
						<td><input name="ccy" id="ccy" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"></td>
					</tr>
					<tr>
						<td>商品单价：</td>
						<td><input name="collatRdPrice" id="collatRdPrice"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
						<td>质物融资金额：</td>
						<td><input name="collatVal" id="collatVal"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
					</tr>
					<tr>
						<td>质物融资数量：</td>
						<td><input type="text" name="qty" id="qty"></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="easyui-panel" title="票据明细" data-options="collapsible:true"
			style="width: 98%">
			<div id="billDiv">
				<table class="utTab">
					<tr>
						<td>票号：</td>
						<td><input type="text" name="billNo" id="billNo"></td>
						<td>出票金额：</td>
						<td><input id="billAmt" name="billAmt"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>
					</tr>
					<tr>
						<td>发票开始日期：</td>
						<td><input name="billValDt" id="billValDt"
							class="easyui-datebox" editable="false"></td>
						<td>发票到期日：</td>
						<td><input name="billDueDt" id="billDueDt"
							class="easyui-datebox" editable="false"></td>
					</tr>
					<tr>
						<td>收票人：</td>
						<td><input type="text" name="billRecp" id="billRecp"></td>
						<td>收票账号：</td>
						<td><input type="text" name="billRecpAcno" id="billRecpAcno"></td>
					</tr>
				</table>
			</div>
		</div>
		<div id="loanDiv">
			<div class="easyui-panel" title="融资信息"
				data-options="collapsible:true" style="width: 98%">
				<table id="loanTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
		<div id="buyerPmtDiv">
			<div class="easyui-panel" title="买方还款信息"
				data-options="collapsible:true" style="width: 98%">
				<table id="buyerPmtTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
			</div>
		</div>
		<div id="cbkDiv">
			<div class="easyui-panel" title="反转让信息"
				data-options="collapsible:true" style="width: 98%">
				<table id="cbkTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
		<div id="crnDiv">
			<div class="easyui-panel" title="关联贷项清单信息"
				data-options="collapsible:true" style="width: 98%">
				<table id="crnTable" cellspacing="0" cellpadding="0" width="100%"
					iconCls="icon-edit">
				</table>
			</div>
		</div>
	</form>
</body>
</html>