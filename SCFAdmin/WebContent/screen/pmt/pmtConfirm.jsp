<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>间接客户还款页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/pmtConfirm.js"></script>
</head>
<body>
	<div id="pmtDiv" style="width: 100%" class="easyui-panel" title="还款信息"
		data-options="collapsible:true">
		<form id="pmtForm">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input class="combo" name="sysRefNo" id="sysRefNo" data-options="validType:'maxLength[35]'"/></td>
					<td>放款币别：</td>
					<td><input class="easyui-combobox" id=lmtCcy name="lmtCcy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
						editable="false" /></td>
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
					<td>融资余额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBal"
						id="ttlLoanBal"
						data-options="precision:2,groupSeparator:','" value=0/></td>
					<td>还款日期：</td>
					<td><input class="easyui-datebox" name="pmtDt" id="pmtDt"/></td>
				</tr>
				<tr>
					<td>利息总额：</td>
					<td><input class="easyui-numberbox" name="payIntAmt" 
						id="payIntAmt" data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
					<td>本次还款金额：</td>
					<td><input class="easyui-numberbox" name="ttlPmtAmt"
						id="ttlPmtAmt" data-options="precision:2,min:0,groupSeparator:','"
						required="true" value=0 /></td>
				</tr>
				<tr id='Tr1'>
					<td>本次还本金：</td>
					<td><input class="easyui-numberbox" name="payPrinAmt"
						id="payPrinAmt" data-options="precision:2,min:0,groupSeparator:','" value=0 /></td>
				</tr>
				<tr>
					<!-- 是否确认 -->
					<td>是否确认：</td>
					<td><input id="isConfirm" name="isConfirm"
						class="easyui-combobox" required="true"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto',onChange:changeConfirm"
						editable="false"></input></td>
				<td>确认意见：</td>
					<td><input class="easyui-textbox"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 178PX; height: 100px" name="confirmOp"
							id="confirmOp" /></td>
				</tr>
				<tr id = 'Tr2'>
					<td>扣款账号：</td>
					<td><input editable="false" id="acNo"
						data-options="valueField:'acNo',textField:'acNo',panelHeight: 'auto'"
						name="acNo" class="easyui-combobox"></input> 
					</td>
				</tr>
				<tr>
					<td><input type="hidden" name="selLmtBal" id="selLmtBal" ></input></td>
					<td><input type="hidden" name="lmtBal" id="lmtBal" ></input></td>
					<td><input type="hidden" name="ttlLoanBalHD" id="ttlLoanBalHD"/></td>
					<td><input type="hidden" id="buyerId" name="buyerId"></td>
					<td><input type="hidden" id="accetpFlag" name="accetpFlag"
						value="false"></td>
					<td><input type="hidden" name="insureNo" id="insureNo"></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input id="payIntTp" name="payIntTp" type="hidden"></td>
					<!-- 从协议表带过来 -->
					<td><input id="intSysRefNo" name="intSysRefNo" type="hidden"></td>
					<!-- 利息信息的流水号 -->
					
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					<td><input type="hidden" name="pmtTp" id="pmtTp"></td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo"></td>
				</tr>
			</table>
		</form>
	</div>
	<div class="easyui-panel" title="买方还款应收账款信息"
		data-options="collapsible:true" style="width: 100%;">
		<div id="cntPmtInvcMDiv">
			<table id="cntPmtInvcMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
		</div>
	</div>
	<div class="easyui-panel" title="卖方还款应收账款信息"
		data-options="collapsible:true" style="width: 100%;">
		<div id="sellerInvcMDiv">
			<table id="sellerInvcMTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
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
</body>
</html>