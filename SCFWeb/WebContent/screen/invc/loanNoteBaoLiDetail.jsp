<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>国内保理融资明细信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/invc/loanNoteBaoLiDetail.js"></script>
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
		<div class="easyui-panel" title="发票明细" data-options="collapsible:true"
			style="width: 98%">
			<div id="billDiv">
				<table class="utTab">
					<tr>
						<td>发票编号：</td>
						<td><input type="text" name="invNo" id="invNo"></td>
						<td>发票金额：</td>
						<td><input id="invAmt" name="invAmt" class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></input></td>
					</tr>
					<tr>
						<td>发票日期：</td>
						<td><input name="invValDt" id="invValDt"
							class="easyui-datebox" editable="false"></td>
						<td>发票到期日：</td>
						<td><input name="invDueDt" id="invDueDt"
							class="easyui-datebox" editable="false"></td>
					</tr>
					<tr>
						<td>发票融资金额：</td>
						<td><input name="invLoanAmt" id="invLoanAmt"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
						<td>发票融资余额：</td>
						<td><input name="invLoanBal" id="invLoanBal"
							class="easyui-numberbox"
							data-options="groupSeparator:',', min:0,precision:2" value="0"></td>
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