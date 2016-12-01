<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>国内保理-授信客户还款</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/ACCR/sellRepayment.js"></script>
</head>
<body class="UTSCF">
	<form id="rePaymentForm">
		<div id="rePaymentDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input class="combo" name="sysRefNo" id="sysRefNo"
						data-options="validType:'maxLength[35]'" /></td>
					<td>放款编号：</td>
					<td><input class="combo" name="loanId" id="loanId"
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
				<!-- 				<tr> -->
				<!-- 					<td>间接客户编号：</td> -->
				<!-- 					<td><input class="combo" name="buyerId" id="buyerId" data-options="validType:'maxLength[35]'"/> -->
				<!-- 					<td>间接客户名称：</td> -->
				<!-- 					<td><input class="combo" name="buyerNm" id="buyerNm" data-options="validType:'maxLength[35]'"/></td> -->
				<!-- 				</tr> -->
				<tr>
					<td>放款币别：</td>
					<td><input class="easyui-combobox" id=ccy name="ccy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" /></td>
					<td>融资余额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBal"
						id="ttlLoanBal"
						data-options="precision:2,min:0,groupSeparator:','" /></td>
				</tr>
				<tr>
					<!-- 					<td>放款到期日：</td> -->
					<!-- 					<td><input class="easyui-datebox" name="loanDueDt" -->
					<!-- 						id="loanDueDt" /></td> -->
					<td>还款日期：</td>
					<td><input class="easyui-datebox" name="pmtDt" id="pmtDt" /></td>
					<td>本次还利息：</td>
					<td><input class="easyui-numberbox" name="payIntAmt"
						id="payIntAmt" data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
				</tr>
				<tr>
					<td>本次还本金：</td>
					<td><input class="easyui-numberbox" name="payPrinAmt"
						id="payPrinAmt"
						data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
					<td>本次还款金额：</td>
					<td><input class="easyui-numberbox" name="ttlPmtAmt"
						id="ttlPmtAmt" data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
				</tr>
				<tr id='Tr1'>
					<td>扣息方式：</td>
					<td><input class="easyui-combobox" id="payIntTp"
						name="payIntTp"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" /></td>
				</tr>
				<tr>
					<td><input type="hidden" name="selLmtBal" id="selLmtBal"></input></td>
					<td><input type="hidden" name="lmtBal" id="lmtBal"></input></td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo"></input></td>
					<td><input type="hidden" name="pmtTp" id="pmtTp" value="0" /></td>
					<td><input type="hidden" name="ttlLoanBalHD" id="ttlLoanBalHD"></input></td>
					<td><input type="hidden" name="theirRef" id="theirRef"></input></td>
					<td><input type="hidden" name="buyerId" id="buyerId"></input></td>
					<td><input type="hidden" name="buyerNm" id="buyerNm"></input></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input id="loanValDt" name="loanValDt" type="hidden"></td>
					<td><input id="intSysRefNo" name="intSysRefNo" type="hidden"></td>
					<!-- 用于生成利息表的流水号 -->
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					
				</tr>
			</table>
		</div>

		<div id="invDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="应收账款信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="invTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="searchPmt()"
					plain="true" style="float: right; margin-right: 14px;">应收账款查询</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()"
					style="float: right;">接受改变</a>
				<!-- <a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-undo',plain:true" onclick="reject()">撤销改变</a> -->
			</div>
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