<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>保证金入池页面</title>
<script type="text/javascript" src="script/poPmt/marginAmtInPool.js"></script>
</head>
<body>
	<div id="loanDiv" style="width: 100%" class="easyui-panel" title="基本信息"
		data-options="collapsible:true">
		<form id="loanForm">
			<table class="utTab">
				<tr>
					<td>业务流水号:</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" /></td>
					<td>协议编号:</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" /></td>
				</tr>
				<tr>
					<td>组织机构代码:</td>
					<td><input type="text" name="sellerInstCd" id="sellerInstCd"
						class="easyui-validatebox combo"></input>
					<td>授信客户名称:</td>
					<td><input type="text" name="selNm" id="selNm"></input></td>
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
					<td>池水位：</td>
					<td><input class="easyui-numberbox" name="poolLine"
						id="poolLine" required="required"
						data-options="min:0,precision:2,groupSeparator:','" value=0 /></td>
					<td>已融资金额：</td>
					<td><input class="easyui-numberbox" name="openLoanAmt"
						id="openLoanAmt" required="required"
						data-options="min:0,precision:2,groupSeparator:','" /></td>
				</tr>

				<tr>
					<td>保证金账号:</td>
					<td><input type="text" class="easyui-validatebox combo"
						id="marginAcNo" name="marginAcNo"
						data-options="validType:['number','maxLength[19]']" required="true" /></td>
					<td>本次入池金额：</td>
					<td><input class="easyui-numberbox" name="marginAmt"
						id="marginAmt" required="true"
						data-options="validType:'maxLength[30]',min:0,precision:2,groupSeparator:',',onChange:changeMarginAmt" /></td>
				</tr>

				<tr>
					<td>本次冻结日期:</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" required="true" /></td>
					<td>本次冻结到期日:</td>
					<td><input type="text" name="freezeDueDt" id="freezeDueDt"
						class="easyui-datebox" required="true"
						data-options="onChange:getDueDt,validType:'date'" /></td>
				</tr>

				<tr>
					<td><input type="hidden" id="inoutTp" name="inoutTp" value="0"></td>
					<td><input type="hidden" id="arBal" name="arBal"></td>
					<td><input type="hidden" name="arAvalLoan" id="arAvalLoan"></input></td>
					<td><input type="hidden" name="poolLineOld" id="poolLineOld"></input></td>

					<td><input type="hidden" id="lmtAmt" name="lmtAmt"></td>
					<td><input type="hidden" id="lmtBal" name="lmtBal"></td>
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