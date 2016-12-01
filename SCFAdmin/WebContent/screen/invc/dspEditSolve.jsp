<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改应收账款页面</title>
<script type="text/javascript" src="script/invc/dspEditSolve.js"></script>
</head>
<body>
	<form id="invcMChgForm">
		<div id="invcMChgDiv" style="margin: auto; margin-top: 50px">
			<table class="utTab" align="center" height="60%">
				<tr>
					<td>间接客户编号：</td>
					<td><input type="text" name="buyerId"
						class="easyui-validatebox" id="buyerId" required="true"></input></td>
					<td>间接客户名称</td>
					<td><input type="text" name="buyerNm" id="buyerNm"></td>
				</tr>
				<tr>
					<td>应收账款凭证编号：</td>
					<td><input type="text" class="easyui-textbox" name="invNo"
						id="invNo" required="true"></td>
					<td>币别：</td>
					<td><input class="easyui-combobox" id="invCcy" name="invCcy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" required="required"></td>
				</tr>
				<tr>
					<td>应收账款金额：</td>
					<td><input type="text" name="invAmt" id="invAmt"
						required="true"
						data-options="onChange:changeInvAmt,min:0,precision:2,groupSeparator:''"
						class="easyui-numberbox"></td>
					<td>预付款金额：</td>
					<td><input type="text" name="acctAmt" id="acctAmt"
						required="true"
						data-options="onChange:changeAcctAmt,min:0,precision:2,groupSeparator:''"
						class="easyui-numberbox"></td>
				</tr>
				<tr>
					<td>应收账款净额：</td>
					<td><input id="invBal" name="invBal"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></td>
					<td>应收账款起算日：</td>
					<td><input name="invValDt" id="invValDt" required="true"
						class="easyui-datebox" data-options="onSelect:changeinvValDt"
						editable="false"></td>
				</tr>
				<tr>
					<td>应收账款开立日期：</td>
					<td><input name="invDt" id="invDt" required="true"
						class="easyui-datebox" editable="false"
						data-options="onSelect:changeinvDt"></td>
					<td>应收账款到期日：</td>
					<td><input name="invDueDt" id="invDueDt"
						class="easyui-datebox" required="true"
						data-options="onSelect:changeInvDueDt"></td>
				</tr>
				<tr>
					<td>账期:</td>
					<td><input type="text" name="acctPeriod" id="acctPeriod"
						data-options="validType:['number','maxLength[18]']"
						class="easyui-numberbox"></input></td>
					<td>融资比例:</td>
					<td><input type="text" name="loanPerc" id="loanPerc"
						class="easyui-textbox"></input></td>
				</tr>
				<tr>
					<td>可融资金额:</td>
					<td><input type="text" name="invLoanAval" id="invLoanAval"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></input></td>
					<td>已融资金额:</td>
					<td><input type="text" name="invLoanBal" id="invLoanBal"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox"></input></td>
				</tr>
				<tr>
					<td>争议金额:</td>
					<td><input type="text" name="dspAmt" id="dspAmt"
						data-options="min:0,precision:2,groupSeparator:','"
						class="easyui-numberbox" required="true"></input></td>
					<td>争议日期:</td>
					<td><input type="text" name="dspDt" id="dspDt"
						class="easyui-datebox" required="true"
						data-options="onSelect:changeInvDueDt"></input></td>
				</tr>
				<tr>
					<td>发票争议原因:</td>
					<td><input type="text" name="dspRsn" id="dspRsn"
						class="easyui-combobox"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"></input></td>
					<td>其他原因:</td>
					<td><input type="text" name="otherRsn" id="otherRsn"
						class="easyui-textbox"></input></td>
				</tr>
				<tr>
					<td>解决原因:</td>
					<td><input type="text" name="fixRsn" id="fixRsn"
						class="easyui-textbox"></input></td>
					<td>争议标识:</td>
					<td><input name="dspFlag" id="dspFlag" class="easyui-combobox"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" /></td>
				</tr>
				<tr>
					<td><input type="hidden" name="dspRef" id="dspRef" /></td>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo" /></td>
					<td><input type="hidden" name="invLoanAval" id="invLoanAval" /></td>
					<td><input type="hidden" name="batchNo" id="batchNo" /></td>
					<td><input type="hidden" name="selId" id="selId" /></td>
					<td><input type="hidden" name="openactGraceDay"
						id="openactGraceDay" /></td>
					<td><input type="hidden" name="loanPerc" id="loanPerc" /></td>
					<td><input type="hidden" name="buyerLmtAmt" id="buyerLmtAmt" /></td>
					<td><input type="hidden" name="busiTp" id="busiTp" /></td>
					<td><input type="hidden" name="cntSysRefNo" id="cntSysRefNo" /></td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo" /></td>
					<td><input type="hidden" name="loanTranAmt" id="loanTranAmt" /></td>
					<td><input type="hidden" name="loanBillAmt" id="loanBillAmt" /></td>
					<td><input type="hidden" name="payTranAmt" id="payTranAmt" /></td>
					<td><input type="hidden" name="payBillAmt" id="payBillAmt" /></td>
					<td style="display: none"><input type="hidden" name="sysData"
						class="easyui-datebox" id="sysData" value=${sysUserInfo.sysDate } /></td>
					<td style="display: none"><input type="hidden" name="dueDt"
						class="easyui-datebox" id="dueDt" /></td>
					<td><input type="hidden" name="loanBalAmt" id="loanBalAmt"
						value=0></input></td>
					<td><input type="hidden" name="oldInvNo" id="oldInvNo" /></td>
					<!-- 修改应收账款处理应收账款编号的重复 -->
					<!--变更表信息 -->
					<td><input type="hidden" name="custNo" id="custNo" /></td>
					<td><input type="hidden" name="custNm" id="custNm" /></td>
					<td><input type="hidden" name="cutrctNo" id="cutrctNo" /></td>
					<td><input type="hidden" name="trxCcy" id="trxCcy" /></td>
					<td><input type="hidden" name="trxAmt" id="trxAmt" /></td>
					<td><input type="hidden" name="tdType" id="tdType" /></td>
					<td style="display: none"><input type="hidden"
						class="easyui-datebox" name="trxDate" id="trxDate" /></td>

				</tr>
			</table>
		</div>
	</form>
</body>
</html>