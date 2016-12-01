<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资信息</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="script/cust/loanInfo.js" type="text/javascript"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="loanInfoDiv" style="margin: auto; margin-top: 50px">
			<table class="utTab" align="center" height="10%">
				<tr>
					<td>融资编号：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="loanId" id="loanId" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
					<td><input type="hidden" id="ttlLoanAmt" name="ttlLoanAmt"></td>
					<td><input type="hidden" id="lmtAmt" name="lmtAmt"></td>
					<td><input type="hidden" id="lmtBal" name="lmtBal"></td>
					<td><input type="hidden" id="openLoanAmt" name="openLoanAmt"></td>
					<td><input type="hidden" id="arAvalLoan" name="arAvalLoan"></td>
					<td><input type="hidden" id="finaSts" name="finaSts"></td>
					<td><input type="hidden" id="pmtSts" name="pmtSts"></td>
				</tr>
				<tr>
					<td>协议编号：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="cntrctNo" id="cntrctNo" required="true"
						data-options="validType:'maxLength[40]',width:'253px',height:'32px'"></input></td>

				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="busiTp" id="busiTp" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>授信客户编号：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="selId" id="selId" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>授信客户名称：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="selNm" id="selNm" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>币种：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="ccy" id="ccy" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>还本金金额：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="payPrinAmt" id="payPrinAmt" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>还利息金额：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="payIntAmt" id="payIntAmt" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>合计还款金额：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="ttlPmtAmt" id="ttlPmtAmt" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>借款余额：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="ttlLoanBal" id="ttlLoanBal" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>融资到期日：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="loanDueDt" id="loanDueDt" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>利息：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="intAmt" id="intAmt" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>本次已收费用：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="currFinPayCost" id="currFinPayCost" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
				<tr>
					<td>放款资金来源：</td>
					<td><input type="text" class="easyui-textbox combo"
						name="advaPayType" id="advaPayType" required="true"
						data-options="validType:'maxLength[70]',width:'253px',height:'32px'"></input></td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>