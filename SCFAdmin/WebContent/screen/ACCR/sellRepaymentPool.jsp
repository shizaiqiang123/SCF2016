<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款池融资-卖方还款</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/ACCR/sellRepaymentPool.js"></script>
</head>
<body class="UTSCF">
	<form id="rePaymentForm">
		<div id="rePaymentDiv" style="width: 100%" class="easyui-panel"
			title="还款信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input class="combo" name="sysRefNo" id="sysRefNo"
						data-options="validType:'maxLength[35]'" /></td>
					<td>协议编号</td>
					<td><input class="combo" name="cntrctNo" id="cntrctNo"
						data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>交易日期：</td>
					<td><input class="easyui-datebox" name="trxDt" id="trxDt" /></td>
					<td>业务类别：</td>
					<td><input class="easyui-combobox" id="busiTp" name="busiTp"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>授信客户编号：</td>
					<td><input class="combo" name="selId" id="selId"
						data-options="validType:'maxLength[35]'" /></td>
					<td>授信客户名称：</td>
					<td><input class="combo" name="selNm" id="selNm"
						data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>扣息方式：</td>
					<td><input class="easyui-combobox" id="payIntTp"
						name="payIntTp"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" /></td>
					<td>融资利率（年化）：</td>
					<td><input name="loanRt" id="loanRt" class="easyui-numberbox"
						data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
				</tr>
				<tr>
					<td>利息总额：</td>
					<td><input class="easyui-numberbox" name="intAmt" id="intAmt"
						data-options="precision:2,min:0,groupSeparator:','" value=0 /></td>
					<td>已融资金额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBal"
						id="ttlLoanBal"
						data-options="precision:2,min:0,groupSeparator:','" /></td>
				</tr>
				<tr>
					<td>可融资金额：</td>
					<td><input class="easyui-numberbox" id="arAvalLoan"
						name="arAvalLoan"
						data-options="precision:2,min:0,groupSeparator:','" /></td>
					<td>本次还利息：</td>
					<td><input name="payIntAmt" id="payIntAmt"
						class="easyui-numberbox"
						data-options="precision:2,min:0,groupSeparator:','" value=0></input></td>
				</tr>
				<tr>
					<!-- 					<td>放款到期日：</td> -->
					<!-- 					<td><input class="easyui-datebox" name="loanDueDt" -->
					<!-- 						id="loanDueDt" /></td> -->
					<td>还款日期：</td>
					<td><input class="easyui-datebox" name="pmtDt" id="pmtDt" /></td>
					<td>放款币别：</td>
					<td><input class="easyui-combobox" id=ccy name="ccy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>本次还本金：</td>
					<td><input class="easyui-numberbox" name="payPrinAmt"
						id="payPrinAmt"
						data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
					<td>本次还款金额：</td>
					<td><input class="easyui-numberbox" name="ttlPmtAmt"
						id="ttlPmtAmt"
						data-options="precision:2,min:0,groupSeparator:',',onChange:changePmtAmt"
						required="true" value=0 /></td>
				</tr>
				<tr>
					<td><input type="hidden" name="lmtBal" id="lmtBal"></input></td>
					<td><input type="hidden" name="pmtTp" id="pmtTp" value="0" /></td>
					<td><input type="hidden" name="ttlLoanBalHD" id="ttlLoanBalHD"></input></td>
					<td><input type="hidden" name="theirRef" id="theirRef"></input></td>
					<td><input type="hidden" name="buyerId" id="buyerId"></input></td>
					<td><input type="hidden" name="buyerNm" id="buyerNm"></input></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="ttlLoanBalOld" name="ttlLoanBalOld"
						type="hidden"></td>
					<td><input id="arAvalLoanOld" name="arAvalLoanOld"
						type="hidden"></td>
					<td><input id="intSysRefNo" name="intSysRefNo" type="hidden"></td>
					<!-- 用于生成利息表的流水号 -->
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					
				</tr>
			</table>
		</div>

		<div id="loanDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="融资列表信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="loanTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<div id="reasonDiv" style="width: 100%" class="easyui-panel form"
			title="处理意见" data-options="collapsible:true">
			<div id="messageListDiv" style="display: block;">
				<div class="item" id="OldMessageDiv" style="display: block;">
					<span id="OldMessageSpan" style="display: block;" class="label">意见说明：</span>
					<div class="fl item-ifo">
						<input class="easyui-textbox" editable="false"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500PX; height: 100px" name="OldSysRelReason"
							id="OldSysRelReason" />
					</div>
				</div>
				<div class="item" id="messageDivFa">
					<span id="messageSpanY" style="display: none;" class="label">意见说明：</span>
					<span id="messageSpanN" style="display: block;" class="label"></span>
					<div id="messageDiv" style="display: block;" class="fl item-ifo">
						<input class="easyui-textbox"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500px; height: 100px" name="sysRelReason"
							id="sysRelReason" />
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>