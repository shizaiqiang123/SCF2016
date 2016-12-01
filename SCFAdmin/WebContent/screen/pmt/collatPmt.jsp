<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>动产质押客户还款</title>
<script type="text/javascript" src="script/pmt/collatPmt.js"></script>
</head>
<body>
	<div id="pmtDiv" style="width: 98%" class="easyui-panel" title="还款信息"
		data-options="collapsible:true">
		<form id="pmtForm">
			<table class="utTab">
				<tr>
					<td>还款编号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" /></td>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" /></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>币种：</td>
					<td><input id="lmtCcy" name="lmtCcy" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField:'sysRefNo',panelHeight: 'auto'"
						editable="false"></input></td>
				</tr>
				<tr>
					<td>交易日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" required="required" /></td>
					<td>还款日期：</td>
					<td><input type="text" name="pmtDt" id="pmtDt"
						class="easyui-datebox" required="required" /></td>

				</tr>
				<tr>
					<td>授信人编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"></input>
					<td>授信人名称：</td>
					<td><input type="text" name="selNm" id="selNm"></input></td>
				</tr>
				<tr>
					<td>放款编号：</td>
					<td><input type="text" name="loanId" id="loanId" /></td>
					<td>最低库存价值：</td>
					<td><input type="text" name="numRegLowestVal"
						id="numRegLowestVal" class="easyui-numberspinner"
						data-options="min:0,precision:2" required="required"></input>
				</tr>
				<tr>
					<td>库存价值：</td>
					<td><input type="text" name="ttlRegAmt" id="ttlRegAmt"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input>
					<td>放款金额：</td>
					<td><input type="text" name="ttlLoanAmt" id="ttlLoanAmt"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input></td>
				</tr>
				<tr>

					<td>融资余额：</td>
					<td><input type="text" name="ttlLoanBal" id="ttlLoanBal"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input></td>
					<td>协议内融资余额:</td>
					<td><input type="text" name="openLoanAmt" id="openLoanAmt"
						class="easyui-numberspinner" data-options="min:0,precision:2"></input>
					</td>
				</tr>
				<tr style="display: none;">
					<td>原融资余额：</td>
					<td><input type="hidden" name="ttlLoanBalOld"
						id="ttlLoanBalOld"></input></td>
				</tr>
				<tr>
					<td>还款金额：</td>
					<td><input type="text" name="pmtAmt" id="pmtAmt"
						class="easyui-numberspinner" required="true"
						data-options="onChange:changeTtlPmt,min:0,precision:2,validType:'maxLength[18]'"></input></td>
					<td>质押率：</td>
					<td><input type="text" name="pldPerc" id="pldPerc"
						class="easyui-numberspinner"
						data-options="min:0,max:100,suffix:'%'"></input></td>
				</tr>

				<tr>
					<!-- 此业务中和本次还款金额一样 ，为了添加到PMT_M表中-->
					<td><input type="hidden" name="ttlPmtAmt" id="ttlPmtAmt"></input></td>
					<td><input type="hidden" name="numTtlLoanBal"
						id="numTtlLoanBal"></input></td>
					<!-- 					<td><input type="hidden" name="numRegLoanBal" -->
					<!-- 						id="numRegLoanBal"></input></td> -->
					<td><input type="hidden" name="regLowestVal" id="regLowestVal"></input></td>
					<!-- 	协议额度余额，监管方额度余额 还款的是时候需要归还 -->
					<td><input type="hidden" name="lmtBal" id="lmtBal"></input></td>
					<td><input type="hidden" name="patnerLmtBal" id="patnerLmtBal"></input></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input id="openLoanAmtH" name="openLoanAmtH" type="hidden"></td>
					<td><input id="openLoanAmtHD" name="openLoanAmtHD"
						type="hidden"></td>
					<td><input id="marginAmt" name="marginAmt" type="hidden"></td>
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					
				</tr>
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