<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>客户还款页面</title>
<script type="text/javascript" src="script/poPmt/poThrPmt.js"></script>
</head>
<body>
	<div id="loanDiv" style="width: 100%" class="easyui-panel" title="还款信息"
		data-options="collapsible:true">
		<form id="loanForm">
			<table class="utTab">
				<tr>
					<td>还款编号:</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" /></td>
					<td>协议编号:</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" /></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input class="easyui-combobox" id="busiTp" name="busiTp"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" /></td>
					<td>币种：</td>
					<td><input id="ccy" name="ccy" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField:'sysRefNo',panelHeight: 'auto'"
						editable="false"></input></td>
				</tr>
				<tr>
					<td>商户组织机构代码:</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo"></input>
					<td>商户名称:</td>
					<td><input type="text" name="selNm" id="selNm"></input></td>
				</tr>
				<tr>
					<td>供货商编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="buyerId" id="buyerId"></input><a class="easyui-linkbutton"
						icon="icon-search" id="queryBuyer" onclick="showLookUpWindow()">查询</a></td>
					<td>供货商名称：</td>
					<td><input class="combo" name="buyerNm" id="buyerNm"
						required="required" /></td>
				</tr>
				<tr>
					<td>融资编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="loanId" id="loanId"></input><a class="easyui-linkbutton"
						icon="icon-search" id="poButton" onclick="onSearchPoClick()">查询</a></td>
					<td>融资金额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanAmt"
						id="ttlLoanAmt" required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
				</tr>
				<tr>
					<td>订单编号：</td>
					<td><input type="text" class="easyui-validatebox combo" name="poNo"
						id="poNo" required="true" data-options="validType:'maxLength[35]'"></td>
					<td>订单金额：</td>
					<td><input class="easyui-numberbox" name="poAmt" id="poAmt"
						required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
				</tr>
				<tr>
					<td>融资起始日:</td>
					<td><input type="text" name="loanValDt" id="loanValDt"
						class="easyui-datebox" /></td>

					<td>原融资余额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBalOld"
						id="ttlLoanBalOld" required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
				</tr>
				<tr>
					<td>融资到期日:</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt"
						class="easyui-datebox" /></td>
					<td>还款后融资余额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBal"
						id="ttlLoanBal" required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
				</tr>
				<tr id="Tr1">
					<td>保证金余额：</td>
					<td><input class="easyui-numberbox" name="marginBal"
						id="marginBal" data-options="min:0,precision:2,groupSeparator:','"
						value=0 /></td>
					<td>初始保证金比例:</td>
					<td><input class="easyui-numberspinner" name="initMarginPct"
						id="initMarginPct"
						data-options="min:0,precision:2,max:100,suffix:'%'" value=0 /></td>

				</tr>
				<tr>
					<td>本次还款金额:</td>
					<td><input class="easyui-numberbox" name="payPrinAmt"
						id="payPrinAmt"
						data-options="groupSeparator:',', min:0,precision:2,onChange:checkTtlLoanBal"
						value="0" required="true"></input></td>
					<td>本次还款账号:</td>
					<td><input class="easyui-validatebox combo" id="acNo"
						name="acNo" data-options="validType:'maxLength[30]'" /></td>

				</tr>
				<tr>
					<td id="marginAmtUsedTD">保证金提取金额:</td>
					<td id="marginAmtUsedHD"><input class="easyui-numberbox"
						name="marginAmtUsed" id="marginAmtUsed"
						data-options="min:0,precision:2,groupSeparator:',',onChange:checkPmtAmt"
						value=0 /></td>
				</tr>

				<tr>
					<td><input type="hidden" id="pmtTp" name="pmtTp" value="2"></td>

					<td><input type="hidden" id="lmtAmt" name="lmtAmt"></td>
					<td><input type="hidden" id="lmtBal" name="lmtBal"></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>

					<td><input type="hidden" id="buyerlmtAvl" name="buyerlmtAvl"></td>
					<td><input type="hidden" id="buyerlmtAvlHd"
						name="buyerlmtAvlHd"></td>
					<td><input type="hidden" id="ttlLoanBalHD" name="ttlLoanBalHD"></td>
					<td><input type="hidden" id="marginBalHD" name="marginBalHD"></td>

					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo"
						id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo"
						id="sellerLmtSysRefNo"></td>
					<!-- 买方额度余额 -->
					<td><input type="hidden" name="buyerLmtBal" id="buyerLmtBal"></input></td>
					<td><input type="hidden" name="buyerLmtBalHd"
						id="buyerLmtBalHd"></input></td>
					<!-- 买方已占用额度 -->
					<td><input type="hidden" name="buyerTtlAllocate"
						id="buyerTtlAllocate"></td>
					<td><input type="hidden" name="buyerTtlAllocateHd"
						id="buyerTtlAllocateHd"></td>
					<!-- 供应商额度余额 -->
					<td><input type="hidden" name="sellerLmtBal" id="sellerLmtBal"></input></td>
					<td><input type="hidden" name="sellerLmtBalHd"
						id="sellerLmtBalHd"></input></td>
					<!-- 供应商已占用额度 -->
					<td><input type="hidden" name="sellerTtlAllocate"
						id="sellerTtlAllocate"></td>
					<td><input type="hidden" name="sellerTtlAllocateHd"
						id="sellerTtlAllocateHd"></td>
				</tr>

				<!-- <tr>
					<td>交易日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" readonly="readonly" /></td>
					<td>还款日期:</td>
					<td><input type="text" name="pmtDt" id="pmtDt"
						class="easyui-datebox" readonly="readonly" /></td>
				</tr> -->
			</table>
		</form>
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
</body>
</html>