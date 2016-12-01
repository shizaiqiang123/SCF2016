<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>国内保理-授信客户还款</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/ACCR/sellerRepayment.js"></script>
</head>
<body class="UTSCF">
	<form id="rePaymentForm">
		<div id="rePaymentDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input class="combo" name="sysRefNo" id="sysRefNo" data-options="validType:'maxLength[35]'"/></td>
					<td>放款编号</td>
					<td><input class="combo" name="loanId" id="loanId" data-options="validType:'maxLength[35]'"/></td>
				</tr>
				<tr>
					<td>交易日期：</td>
					<td><input class="easyui-datebox" name="trxDt" id="trxDt" /></td>
					<td>业务类别：</td>
					<td><input class="easyui-combobox" id="busiTp" name="busiTp"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"  /></td>
				</tr>
				<tr>
					<td>授信客户编号：</td>
					<td><input class="combo" name="selId" id="selId" data-options="validType:'maxLength[35]'"/></td>
					<td>授信客户名称：</td>
					<td><input class="combo" name="selNm" id="selNm" data-options="validType:'maxLength[35]'"/></td>
				</tr>
				<tr>
					<td>间接客户编号：</td>
					<td><input class="combo" name="buyerId" id="buyerId" data-options="validType:'maxLength[35]'"/>
					<td>间接客户名称：</td>
					<td><input class="combo" name="buyerNm" id="buyerNm" data-options="validType:'maxLength[35]'"/></td>
				</tr>
				<tr>
					<td>授信模式：</td>
					<td><input class="easyui-combobox" id="serviceReq" name="serviceReq"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" /></td>
					<td>放款币别：</td>
					<td><input class="easyui-combobox" id=ccy name="ccy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>融资余额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBal"
						id="ttlLoanBal"
						data-options="precision:2,groupSeparator:','" /></td>
					<td>放款到期日：</td>
					<td><input class="easyui-datebox" name="loanDueDt"
						id="loanDueDt" /></td>
				</tr>
				<tr>
					<td>还款日期：</td>
					<td><input class="easyui-datebox" name="pmtDt" id="pmtDt"/></td>
					<td>本次还本金：</td>
					<td><input class="easyui-numberbox" name="payPrinAmt"
						id="payPrinAmt" data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
				</tr>
				<tr>
					<td>本次还款金额：</td>
					<td><input class="easyui-numberbox" name="ttlPmtAmt"
						id="ttlPmtAmt" data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
					<td>利息总额：</td>
					<td><input class="easyui-numberbox" name="payIntAmt" 
						id="payIntAmt" data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
						<td><input type="hidden" name="selLmtBal" id="selLmtBal" ></input></td>
					<td><input type="hidden" name="lmtBal" id="lmtBal" ></input></td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo" ></input></td>
					<td><input type="hidden" name="pmtTp" id="pmtTp" value="0"/></td>
					<td><input type="hidden" name="ttlLoanBalHD" id="ttlLoanBalHD"/></td>
				</tr>
			</table>
		</div>

		<div id="invDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="应收账款信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="invTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="searchPmt()"
					plain="true" style="float:right;margin-right:14px;">应收账款查询</a>
			</div>
		</div>
	</form>
</body>
</html>